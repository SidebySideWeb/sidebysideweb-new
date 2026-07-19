import {useEffect, useId, useState, type FormEvent} from 'react'
import {getRecaptchaResponse, resetRecaptcha} from '../../lib/recaptcha-client'
import RecaptchaField from './RecaptchaField'

export type ContactFormCopy = {
  openButton: string
  modalTitle: string
  firstName: string
  lastName: string
  companyName: string
  email: string
  phone: string
  message: string
  consentPrefix: string
  consentLink: string
  consentSuffix: string
  submit: string
  submitting: string
  success: string
  close: string
  requiredError: string
  consentError: string
  recaptchaError: string
  genericError: string
}

interface Props {
  copy: ContactFormCopy
  privacyHref: string
  recaptchaSiteKey: string
  locale: 'el' | 'en'
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const inputClass =
  'w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-secondary focus:ring-1 focus:ring-secondary'

export default function ContactFormModal({copy, privacyHref, recaptchaSiteKey, locale}: Props) {
  const titleId = useId()
  const [open, setOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function resetForm() {
    setFirstName('')
    setLastName('')
    setCompanyName('')
    setEmail('')
    setPhone('')
    setMessage('')
    setPrivacyAccepted(false)
    setStatus('idle')
    setErrorMessage('')
    resetRecaptcha('contact')
  }

  function closeModal() {
    setOpen(false)
    if (status === 'success') resetForm()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !companyName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !message.trim()
    ) {
      setErrorMessage(copy.requiredError)
      return
    }

    if (!privacyAccepted) {
      setErrorMessage(copy.consentError)
      return
    }

    const recaptchaToken = getRecaptchaResponse('contact')
    if (recaptchaSiteKey && !recaptchaToken) {
      setErrorMessage(copy.recaptchaError)
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          companyName: companyName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          privacyAccepted,
          recaptchaToken,
        }),
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {error?: string} | null
        throw new Error(data?.error ?? copy.genericError)
      }

      setStatus('success')
      resetRecaptcha('contact')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : copy.genericError)
      resetRecaptcha('contact')
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn-primary-orange h-[60px] rounded-lg px-10 shadow-xl"
        onClick={() => {
          setOpen(true)
          setStatus((current) => (current === 'success' ? 'idle' : current))
        }}
      >
        {copy.openButton}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <button
            type="button"
            aria-label={copy.close}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl bg-primary text-white shadow-2xl sm:rounded-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <h3 id={titleId} className="text-lg font-semibold sm:text-xl">
                {copy.modalTitle}
              </h3>
              <button
                type="button"
                className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                onClick={closeModal}
                aria-label={copy.close}
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              {status === 'success' ? (
                <div className="space-y-6 py-6 text-center" role="status">
                  <span className="material-symbols-outlined text-5xl text-secondary">check_circle</span>
                  <p className="text-body-md text-on-primary-container">{copy.success}</p>
                  <button
                    type="button"
                    className="btn-primary-orange rounded-lg px-8 py-3"
                    onClick={closeModal}
                  >
                    {copy.close}
                  </button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block space-y-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                        {copy.firstName}
                      </span>
                      <input
                        className={inputClass}
                        name="firstName"
                        autoComplete="given-name"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                      />
                    </label>
                    <label className="block space-y-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                        {copy.lastName}
                      </span>
                      <input
                        className={inputClass}
                        name="lastName"
                        autoComplete="family-name"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                      />
                    </label>
                  </div>

                  <label className="block space-y-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      {copy.companyName}
                    </span>
                    <input
                      className={inputClass}
                      name="companyName"
                      autoComplete="organization"
                      value={companyName}
                      onChange={(event) => setCompanyName(event.target.value)}
                      required
                    />
                  </label>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="block space-y-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                        {copy.email}
                      </span>
                      <input
                        className={inputClass}
                        type="email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </label>
                    <label className="block space-y-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                        {copy.phone}
                      </span>
                      <input
                        className={inputClass}
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        required
                      />
                    </label>
                  </div>

                  <label className="block space-y-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      {copy.message}
                    </span>
                    <textarea
                      className={`${inputClass} min-h-[120px] resize-y`}
                      name="message"
                      rows={4}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      required
                    />
                  </label>

                  <label className="flex items-start gap-3 text-sm text-white/80">
                    <input
                      type="checkbox"
                      className="mt-1 size-4 rounded border-white/30 bg-white/5 text-secondary focus:ring-secondary"
                      checked={privacyAccepted}
                      onChange={(event) => setPrivacyAccepted(event.target.checked)}
                    />
                    <span>
                      {copy.consentPrefix}{' '}
                      <a
                        className="underline decoration-white/40 underline-offset-2 transition hover:text-secondary"
                        href={privacyHref}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {copy.consentLink}
                      </a>
                      {copy.consentSuffix}
                    </span>
                  </label>

                  <RecaptchaField siteKey={recaptchaSiteKey} widgetKey="contact" hl={locale} />

                  {errorMessage ? (
                    <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200" role="alert">
                      {errorMessage}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    className="btn-primary-orange w-full rounded-lg px-8 py-3.5 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? copy.submitting : copy.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
