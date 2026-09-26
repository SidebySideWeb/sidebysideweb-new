/**
 * Contact form: the prototype's inline validation, then a JSON post to
 * `/api/contact`. The `.sent` panel reports both outcomes.
 */
import {executeRecaptcha} from '../../lib/recaptcha-client'

type Cleanup = () => void

let cleanup: Cleanup | null = null

const EMAIL = /.+@.+\..+/

/** Submissions read better with the visible labels than the option keys. */
function checkedLabels(form: HTMLFormElement, name: string): string[] {
  return [...form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]:checked`)].map(
    (input) => form.querySelector(`label[for="${input.id}"]`)?.textContent?.trim() || input.value,
  )
}

function splitName(value: string): {firstName: string; lastName: string} {
  const parts = value.split(/\s+/).filter(Boolean)
  if (parts.length < 2) return {firstName: value, lastName: '-'}
  return {firstName: parts[0], lastName: parts.slice(1).join(' ')}
}

function initContact() {
  cleanup?.()

  const form = document.getElementById('form') as HTMLFormElement | null
  const sent = document.getElementById('sent')
  if (!form || !sent) return

  const title = sent.querySelector<HTMLElement>('[data-sent-title]')
  const note = sent.querySelector<HTMLElement>('[data-sent-note]')
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')
  const successMessage = title?.textContent ?? ''
  const errorMessage = form.dataset.error ?? ''
  const siteKey = form.dataset.recaptchaKey ?? ''
  const timers = new Set<number>()

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
    sent.classList.toggle('error', failed)
    if (title) title.textContent = message
    if (note) note.textContent = ''
  }

  const onSubmit = async (e: Event) => {
    e.preventDefault()

    const fields = [
      ...form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]'),
    ]
    const invalid = fields.find(
      (field) =>
        !field.value.trim() ||
        ((field as HTMLInputElement).type === 'email' && !EMAIL.test(field.value)),
    )
    if (invalid) {
      flagInvalid(invalid)
      return
    }

    const data = new FormData(form)
    const {firstName, lastName} = splitName(String(data.get('name') ?? '').trim())

    if (submit) submit.disabled = true

    try {
      const recaptchaToken = siteKey ? await executeRecaptcha(siteKey, 'contact') : ''

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          firstName,
          lastName,
          companyName: String(data.get('company') ?? '').trim(),
          email: String(data.get('email') ?? '').trim(),
          message: String(data.get('msg') ?? '').trim(),
          needs: checkedLabels(form, 'need'),
          budget: checkedLabels(form, 'budget')[0] ?? '',
          recaptchaToken,
          privacyAccepted: true,
        }),
      })

      if (!response.ok) throw new Error(`Request failed: ${response.status}`)

      report(successMessage, false)
      form.reset()
    } catch (error) {
      console.error('[contact] submit failed:', error)
      report(errorMessage, true)
    } finally {
      if (submit) submit.disabled = false
    }
  }

  form.addEventListener('submit', onSubmit)

  cleanup = () => {
    form.removeEventListener('submit', onSubmit)
    timers.forEach((id) => window.clearTimeout(id))
    timers.clear()
    cleanup = null
  }
}

document.addEventListener('astro:page-load', initContact)
document.addEventListener('astro:before-swap', () => cleanup?.())

export {}
