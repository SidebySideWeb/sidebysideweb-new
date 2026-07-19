export class RecaptchaError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RecaptchaError'
  }
}

export function getRecaptchaSiteKey(): string {
  return (import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY ?? '').trim()
}

export async function verifyRecaptchaToken(token: string | undefined): Promise<void> {
  const secret = (import.meta.env.RECAPTCHA_SECRET_KEY ?? '').trim()
  if (!secret) {
    throw new Error('RECAPTCHA_SECRET_KEY is not configured.')
  }

  if (!token?.trim()) {
    throw new RecaptchaError('Please confirm you are not a robot.')
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

  const result = (await response.json()) as {success?: boolean}
  if (!result.success) {
    throw new RecaptchaError('reCAPTCHA verification failed. Please try again.')
  }
}
