import type {APIRoute} from 'astro'
import {saveContactSubmission} from '../../lib/form-submission'
import {isRecaptchaConfigured, RecaptchaError, verifyRecaptchaToken} from '../../lib/recaptcha'
import {checkRateLimit} from '../../lib/rate-limit'
import {isValidEmail, isValidPhone} from '../../lib/validation'

export const prerender = false

/** Nobody reads and fills the form in under two seconds. */
const MIN_FILL_MS = 2000

type ContactBody = {
  /** The redesign form has a single name field; v1 sends the two parts. */
  name?: string
  firstName?: string
  lastName?: string
  companyName?: string
  email?: string
  phone?: string
  message?: string
  needs?: string[]
  budget?: string
  /** Honeypot: only a bot fills the hidden `website` field. */
  website?: string
  /** How long the form was on screen before it was submitted. */
  elapsedMs?: number
  formStartedAt?: string
  recaptchaToken?: string
  privacyAccepted?: boolean
}

export const POST: APIRoute = async ({request}) => {
  const wantsJson = prefersJson(request)
  const body = await parseBody(request)

  if (!body) {
    return respond(wantsJson, {ok: false, error: 'Invalid request.'}, 400)
  }

  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(`contact:${clientIp}`, 5, 60_000)) {
    return respond(wantsJson, {ok: false, error: 'Too many attempts. Please try again shortly.'}, 429)
  }

  if (body.website?.trim()) {
    console.warn('[api/contact] honeypot filled, dropping submission.')
    return respond(wantsJson, {ok: false, error: 'Invalid request.'}, 400)
  }

  const elapsedMs = resolveElapsedMs(body)
  if (typeof elapsedMs === 'number' && elapsedMs >= 0 && elapsedMs < MIN_FILL_MS) {
    console.warn('[api/contact] submitted too fast, dropping submission.')
    return respond(wantsJson, {ok: false, error: 'Invalid request.'}, 400)
  }

  // Native (no-JS) posts have no recaptcha token; honeypot + rate limit cover them.
  const isNativeForm = !wantsJson
  if (!isNativeForm && isRecaptchaConfigured()) {
    try {
      await verifyRecaptchaToken(body.recaptchaToken)
    } catch (error) {
      const messageText =
        error instanceof RecaptchaError
          ? error.message
          : error instanceof Error
            ? error.message
            : 'reCAPTCHA verification failed.'
      const status = error instanceof RecaptchaError ? 400 : 500
      return respond(wantsJson, {ok: false, error: messageText}, status)
    }
  } else if (!isRecaptchaConfigured()) {
    console.warn('[api/contact] reCAPTCHA keys are not configured, skipping verification.')
  }

  const {firstName, lastName} = resolveName(body)
  const companyName = body.companyName?.trim()
  const email = body.email?.trim()
  const phone = body.phone?.trim()
  const message = body.message?.trim()

  if (!firstName || !email || !message) {
    return respond(wantsJson, {ok: false, error: 'Please fill in all required fields.'}, 400)
  }

  if (!isValidEmail(email)) {
    return respond(wantsJson, {ok: false, error: 'Invalid email address.'}, 400)
  }

  if (phone && !isValidPhone(phone)) {
    return respond(wantsJson, {ok: false, error: 'Invalid phone number.'}, 400)
  }

  if (body.privacyAccepted !== true) {
    return respond(wantsJson, {ok: false, error: 'You must accept the privacy policy.'}, 400)
  }

  try {
    await saveContactSubmission({
      firstName,
      lastName,
      companyName: companyName || '-',
      email,
      phone,
      message: withFormContext(message, body.needs, body.budget),
      privacyAccepted: true,
    })
  } catch (error) {
    console.error('[api/contact] saveContactSubmission failed:', error)
    return respond(wantsJson, {ok: false, error: 'Submission failed. Please try again.'}, 500)
  }

  return respond(wantsJson, {ok: true}, 200)
}

function prefersJson(request: Request): boolean {
  const accept = request.headers.get('accept') ?? ''
  const contentType = request.headers.get('content-type') ?? ''
  return contentType.includes('application/json') || accept.includes('application/json')
}

async function parseBody(request: Request): Promise<ContactBody | null> {
  const contentType = request.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    try {
      return (await request.json()) as ContactBody
    } catch {
      return null
    }
  }

  try {
    const form = await request.formData()
    const needs = form
      .getAll('need')
      .map((value) => String(value).trim())
      .filter(Boolean)
    const privacyRaw = String(form.get('privacyAccepted') ?? '')
    return {
      name: String(form.get('name') ?? ''),
      companyName: String(form.get('company') ?? ''),
      email: String(form.get('email') ?? ''),
      message: String(form.get('msg') ?? form.get('message') ?? ''),
      needs,
      budget: String(form.get('budget') ?? ''),
      website: String(form.get('website') ?? ''),
      formStartedAt: String(form.get('formStartedAt') ?? ''),
      privacyAccepted: privacyRaw === '1' || privacyRaw === 'true',
    }
  } catch {
    return null
  }
}

function resolveElapsedMs(body: ContactBody): number | undefined {
  if (typeof body.elapsedMs === 'number') return body.elapsedMs
  const started = Number(body.formStartedAt)
  if (!Number.isFinite(started) || started <= 0) return undefined
  return Date.now() - started
}

/** The redesign form has one name input, so split it into the stored parts. */
function resolveName(body: {name?: string; firstName?: string; lastName?: string}) {
  const firstName = body.firstName?.trim()
  const lastName = body.lastName?.trim()
  if (firstName) return {firstName, lastName: lastName || '-'}

  const parts = body.name?.trim().split(/\s+/).filter(Boolean) ?? []
  if (!parts.length) return {firstName: '', lastName: '-'}
  if (parts.length === 1) return {firstName: parts[0], lastName: '-'}
  return {firstName: parts[0], lastName: parts.slice(1).join(' ')}
}

/** `formSubmission` has no fields for these, so they ride along in the message. */
function withFormContext(message: string, needs?: string[], budget?: string): string {
  const lines = [message]
  const wanted = needs?.filter(Boolean) ?? []
  if (wanted.length) lines.push(`Τι χρειάζεται: ${wanted.join(', ')}`)
  if (budget?.trim()) lines.push(`Κλίμακα: ${budget.trim()}`)
  return lines.join('\n\n')
}

function respond(
  wantsJson: boolean,
  result: {ok: boolean; error?: string},
  status: number,
): Response {
  if (wantsJson) {
    return new Response(JSON.stringify({success: result.ok, error: result.error}), {
      status,
      headers: {'Content-Type': 'application/json'},
    })
  }

  const dest = result.ok
    ? '/epikoinonia/?sent=1'
    : `/epikoinonia/?error=${encodeURIComponent(result.error ?? 'error')}`
  return new Response(null, {
    status: 303,
    headers: {Location: dest},
  })
}
