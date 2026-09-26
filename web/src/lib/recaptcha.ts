export class RecaptchaError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RecaptchaError'
  }
}

const MIN_SCORE = 0.5
const EXPECTED_ACTION = 'contact'

export function getRecaptchaSiteKey(): string {
  return (import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY ?? '').trim()
}

export function getRecaptchaSecretKey(): string {
  return (import.meta.env.RECAPTCHA_SECRET_KEY ?? '').trim()
}

/**
 * Whether reCAPTCHA can run at all. Previews without the keys skip
 * verification rather than reject every submission.
 */
export function isRecaptchaConfigured(): boolean {
  return Boolean(getRecaptchaSiteKey() && getRecaptchaSecretKey())
}

export async function verifyRecaptchaToken(token: string | undefined): Promise<void> {
  const secret = getRecaptchaSecretKey()
  if (!secret) {
    throw new Error('RECAPTCHA_SECRET_KEY is not configured.')
  }

  if (!token?.trim()) {
    throw new RecaptchaError('reCAPTCHA verification failed. Please try again.')
  }

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      secret,
      response: token.trim(),
    }),
  })

  if (!response.ok) {
    throw new RecaptchaError('reCAPTCHA verification failed. Please try again.')
  }

  const result = (await response.json()) as {
    success?: boolean
    score?: number
    action?: string
    'error-codes'?: string[]
  }

  if (!result.success) {
    throw new RecaptchaError('reCAPTCHA verification failed. Please try again.')
  }

  if (result.action && result.action !== EXPECTED_ACTION) {
    throw new RecaptchaError('reCAPTCHA verification failed. Please try again.')
  }

  if (typeof result.score === 'number' && result.score < MIN_SCORE) {
    throw new RecaptchaError('reCAPTCHA verification failed. Please try again.')
  }
}
