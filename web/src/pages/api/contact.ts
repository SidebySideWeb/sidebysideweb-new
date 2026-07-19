import type {APIRoute} from 'astro'
import {saveContactSubmission} from '../../lib/form-submission'
import {RecaptchaError, verifyRecaptchaToken} from '../../lib/recaptcha'
import {checkRateLimit} from '../../lib/rate-limit'
import {isValidEmail, isValidPhone} from '../../lib/validation'

export const prerender = false

export const POST: APIRoute = async ({request}) => {
  let body: {
    firstName?: string
    lastName?: string
    companyName?: string
    email?: string
    phone?: string
    message?: string
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

  const firstName = body.firstName?.trim()
  const lastName = body.lastName?.trim()
  const companyName = body.companyName?.trim()
  const email = body.email?.trim()
  const phone = body.phone?.trim()
  const message = body.message?.trim()

  if (!firstName || !lastName || !companyName || !email || !phone || !message) {
    return jsonError('Please fill in all required fields.', 400)
  }

  if (!isValidEmail(email)) {
    return jsonError('Invalid email address.', 400)
  }

  if (!isValidPhone(phone)) {
    return jsonError('Invalid phone number.', 400)
  }

  if (body.privacyAccepted !== true) {
    return jsonError('You must accept the privacy policy.', 400)
  }

  try {
    await saveContactSubmission({
      firstName,
      lastName,
      companyName,
      email,
      phone,
      message,
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

function jsonError(error: string, status: number) {
  return new Response(JSON.stringify({success: false, error}), {
    status,
    headers: {'Content-Type': 'application/json'},
  })
}
