import type {APIRoute} from 'astro'
import {saveContactSubmission} from '../../lib/form-submission'
import {isRecaptchaConfigured, RecaptchaError, verifyRecaptchaToken} from '../../lib/recaptcha'
import {checkRateLimit} from '../../lib/rate-limit'
import {isValidEmail, isValidPhone} from '../../lib/validation'

export const prerender = false

/** Nobody reads and fills the form in under two seconds. */
const MIN_FILL_MS = 2000

export const POST: APIRoute = async ({request}) => {
  let body: {
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
    recaptchaToken?: string
    privacyAccepted?: boolean
  }

  try {
    body = await request.json()
  } catch {
    return jsonError('Invalid request.', 400)
  }

  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(`contact:${clientIp}`, 5, 60_000)) {
    return jsonError('Too many attempts. Please try again shortly.', 429)
  }

  if (body.website?.trim()) {
    console.warn('[api/contact] honeypot filled, dropping submission.')
    return jsonError('Invalid request.', 400)
  }

  if (typeof body.elapsedMs === 'number' && body.elapsedMs >= 0 && body.elapsedMs < MIN_FILL_MS) {
    console.warn('[api/contact] submitted too fast, dropping submission.')
    return jsonError('Invalid request.', 400)
  }

  if (isRecaptchaConfigured()) {
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
      return jsonError(messageText, status)
    }
  } else {
    console.warn('[api/contact] reCAPTCHA keys are not configured, skipping verification.')
  }

  const {firstName, lastName} = resolveName(body)
  const companyName = body.companyName?.trim()
  const email = body.email?.trim()
  const phone = body.phone?.trim()
  const message = body.message?.trim()

  if (!firstName || !email || !message) {
    return jsonError('Please fill in all required fields.', 400)
  }

  if (!isValidEmail(email)) {
    return jsonError('Invalid email address.', 400)
  }

  if (phone && !isValidPhone(phone)) {
    return jsonError('Invalid phone number.', 400)
  }

  if (body.privacyAccepted !== true) {
    return jsonError('You must accept the privacy policy.', 400)
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
    return jsonError('Submission failed. Please try again.', 500)
  }

  return new Response(JSON.stringify({success: true}), {
    status: 200,
    headers: {'Content-Type': 'application/json'},
  })
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
  if (budget?.trim()) lines.push(`Ενδεικτικό budget: ${budget.trim()}`)
  return lines.join('\n\n')
}

function jsonError(error: string, status: number) {
  return new Response(JSON.stringify({success: false, error}), {
    status,
    headers: {'Content-Type': 'application/json'},
  })
}
