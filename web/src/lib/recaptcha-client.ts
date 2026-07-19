declare global {
  interface Window {
    grecaptcha?: {
      render: (container: HTMLElement, params: {sitekey: string; hl?: string}) => number
      getResponse: (widgetId?: number) => string
      reset: (widgetId?: number) => void
      ready: (callback: () => void) => void
    }
  }
}

const widgetIds = new Map<string, number>()
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

export function loadRecaptchaScript(hl = 'el'): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.grecaptcha?.ready) return waitForRecaptchaReady()
  if (scriptPromise) return scriptPromise

  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-recaptcha-script]')
    if (existing) {
      existing.addEventListener('load', () => {
        waitForRecaptchaReady().then(resolve).catch(reject)
      })
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&hl=${hl}`
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

export async function initRecaptchaWidget(
  container: HTMLElement,
  siteKey: string,
  key = 'default',
  hl = 'el',
): Promise<void> {
  if (!siteKey) return

  await loadRecaptchaScript(hl)
  if (!window.grecaptcha) return

  container.innerHTML = ''
  const widgetId = window.grecaptcha.render(container, {
    sitekey: siteKey,
    hl,
  })
  widgetIds.set(key, widgetId)
}

export function getRecaptchaResponse(key = 'default'): string {
  const widgetId = widgetIds.get(key)
  return window.grecaptcha?.getResponse(widgetId) ?? ''
}

export function resetRecaptcha(key = 'default'): void {
  const widgetId = widgetIds.get(key)
  if (widgetId !== undefined) {
    window.grecaptcha?.reset(widgetId)
  }
}
