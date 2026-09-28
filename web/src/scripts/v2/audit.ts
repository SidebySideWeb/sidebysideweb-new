/**
 * Audit form: validate, then JSON post to `/api/contact` with type=audit.
 * Also handles `[data-jump]` smooth-scroll + focus on the URL field.
 */
import {executeRecaptcha} from '../../lib/recaptcha-client'

type Cleanup = () => void

let cleanup: Cleanup | null = null

const EMAIL = /.+@.+\..+/
const URL_OK = /^(https?:\/\/)?[\w.-]+(\.[\w.-]+)+/i

function initAudit() {
  cleanup?.()

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const form = document.getElementById('auForm') as HTMLFormElement | null
  const sent = document.getElementById('auSent')
  const timers = new Set<number>()

  const onJump = (e: MouseEvent) => {
    const target = (e.target as Element | null)?.closest?.('[data-jump]') as HTMLElement | null
    if (!target) return
    const id = target.dataset.jump
    if (!id) return
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
    window.setTimeout(
      () => document.getElementById('au-url')?.focus({preventScroll: true}),
      reduceMotion ? 0 : 700,
    )
  }

  document.addEventListener('click', onJump)

  if (!form || !sent) {
    cleanup = () => {
      document.removeEventListener('click', onJump)
      cleanup = null
    }
    return
  }

  const title = sent.querySelector<HTMLElement>('[data-sent-title]')
  const note = sent.querySelector<HTMLElement>('[data-sent-note]')
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')
  const successMessage = form.dataset.success ?? title?.textContent ?? 'Το πήρα.'
  const errorMessage = form.dataset.error ?? 'Κάτι πήγε στραβά. Δοκίμασε ξανά ή στείλε μου email.'
  const siteKey = form.dataset.recaptchaKey ?? ''

  const startedAt = form.querySelector<HTMLInputElement>('[data-form-started]')
  if (startedAt) startedAt.value = String(Date.now())

  const flagInvalid = (field: HTMLInputElement | HTMLTextAreaElement) => {
    field.focus()
    field.style.borderColor = '#F08A78'
    const timer = window.setTimeout(() => {
      field.style.borderColor = ''
      timers.delete(timer)
    }, 1800)
    timers.add(timer)
  }

  const report = (message: string, failed: boolean) => {
    sent.hidden = false
    sent.classList.add('is-visible')
    sent.classList.toggle('error', failed)
    if (title) title.textContent = message
    if (note) note.textContent = ''
    sent.scrollIntoView({behavior: 'smooth', block: 'nearest'})
  }

  const onSubmit = async (e: Event) => {
    e.preventDefault()
    e.stopPropagation()

    const urlField = form.querySelector<HTMLInputElement>('#au-url')
    const nameField = form.querySelector<HTMLInputElement>('#au-name')
    const emailField = form.querySelector<HTMLInputElement>('#au-mail')

    if (!urlField?.value.trim() || !URL_OK.test(urlField.value.trim())) {
      if (urlField) flagInvalid(urlField)
      return
    }
    if (!nameField?.value.trim()) {
      if (nameField) flagInvalid(nameField)
      return
    }
    if (!emailField?.value.trim() || !EMAIL.test(emailField.value)) {
      if (emailField) flagInvalid(emailField)
      return
    }

    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const parts = name.split(/\s+/).filter(Boolean)
    const firstName = parts[0] ?? ''
    const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '-'

    if (submit) submit.disabled = true

    try {
      const recaptchaToken = siteKey ? await executeRecaptcha(siteKey, 'audit') : ''

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          type: 'audit',
          firstName,
          lastName,
          name,
          email: String(data.get('email') ?? '').trim(),
          url: String(data.get('url') ?? '').trim(),
          note: String(data.get('note') ?? '').trim(),
          website: String(data.get('website') ?? ''),
          elapsedMs: startedAt?.value ? Date.now() - Number(startedAt.value) : undefined,
          recaptchaToken,
          privacyAccepted: true,
        }),
      })

      let payload: {success?: boolean; error?: string} = {}
      try {
        payload = (await response.json()) as {success?: boolean; error?: string}
      } catch {
        payload = {}
      }

      if (!response.ok || payload.success !== true) {
        throw new Error(payload.error || `Request failed: ${response.status}`)
      }

      report(successMessage, false)
      form.reset()
      if (startedAt) startedAt.value = String(Date.now())
      const typeField = form.querySelector<HTMLInputElement>('input[name="type"]')
      if (typeField) typeField.value = 'audit'
      const privacy = form.querySelector<HTMLInputElement>('input[name="privacyAccepted"]')
      if (privacy) privacy.value = '1'
    } catch (error) {
      console.error('[audit] submit failed:', error)
      report(errorMessage, true)
    } finally {
      if (submit) submit.disabled = false
    }
  }

  form.addEventListener('submit', onSubmit)

  cleanup = () => {
    document.removeEventListener('click', onJump)
    form.removeEventListener('submit', onSubmit)
    timers.forEach((id) => window.clearTimeout(id))
    timers.clear()
    cleanup = null
  }
}

document.addEventListener('astro:page-load', initAudit)
document.addEventListener('astro:before-swap', () => cleanup?.())

export {}
