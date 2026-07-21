declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: {action: string}) => Promise<string>
    }
  }
}

let scriptPromise: Promise<void> | null = null

function waitForRecaptchaReady(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!window.grecaptcha?.ready) {
      reject(new Error('reCAPTCHA failed to load'))
      return
    }
    window.grecaptcha.ready(() => resolve())
  })
}

export function loadRecaptchaV3(siteKey: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (!siteKey) return Promise.resolve()
  if (window.grecaptcha?.execute) return waitForRecaptchaReady()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-recaptcha-script]')
    if (existing) {
      existing.addEventListener('load', () => {
        waitForRecaptchaReady().then(resolve).catch(reject)
      })
      existing.addEventListener('error', () => reject(new Error('Failed to load reCAPTCHA')))
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`
    script.async = true
    script.defer = true
    script.dataset.recaptchaScript = 'true'
    script.onload = () => {
      waitForRecaptchaReady().then(resolve).catch(reject)
    }
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA'))
    document.head.appendChild(script)
  })

  return scriptPromise
}

/** Execute reCAPTCHA v3 and return a short-lived token for the given action. */
export async function executeRecaptcha(siteKey: string, action = 'contact'): Promise<string> {
  if (!siteKey) return ''
  await loadRecaptchaV3(siteKey)
  if (!window.grecaptcha?.execute) {
    throw new Error('reCAPTCHA is not available')
  }
  return window.grecaptcha.execute(siteKey, {action})
}
