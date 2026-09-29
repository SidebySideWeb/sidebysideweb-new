import {writeClient} from './sanity'

export type ContactPayload = {
  firstName: string
  lastName: string
  companyName: string
  email: string
  /** Optional since the redesign form does not ask for a phone number. */
  phone?: string
  message: string
  privacyAccepted: boolean
  /** `contact` (default) or `audit`. */
  formType?: 'contact' | 'audit'
}

const DEFAULT_FROM = 'Side by Side <notifications@sidebysideweb.gr>'

function studioEditUrl(documentId: string): string {
  const base = (import.meta.env.SANITY_STUDIO_URL ?? 'https://sidebysideweb.sanity.studio').replace(
    /\/$/,
    '',
  )
  return `${base}/intent/edit/id=${documentId};type=formSubmission`
}

function formatAdminEmail(payload: ContactPayload, documentId: string) {
  const fullName = `${payload.firstName} ${payload.lastName}`.trim()
  const formType = payload.formType ?? 'contact'
  const isAudit = formType === 'audit'

  const subject = isAudit
    ? `Αίτημα Agent Readiness Audit από ${fullName}`
    : `Νέο μήνυμα επικοινωνίας από ${fullName}`

  const lines = [
    isAudit ? 'Νέο αίτημα Agent Readiness Audit' : 'Νέα φόρμα επικοινωνίας',
    '',
    `Όνομα: ${fullName}`,
    `Email: ${payload.email}`,
    payload.companyName && payload.companyName !== '-'
      ? `Εταιρεία / URL: ${payload.companyName}`
      : null,
    payload.phone ? `Τηλέφωνο: ${payload.phone}` : null,
    '',
    'Μήνυμα:',
    payload.message,
    '',
    `Προβολή στο Studio: ${studioEditUrl(documentId)}`,
  ].filter((line) => line !== null)

  const text = lines.join('\n')

  const html = `
    <p>${isAudit ? 'Νέο αίτημα Agent Readiness Audit.' : 'Νέα φόρμα επικοινωνίας.'}</p>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;line-height:1.5">
      <tr><td style="padding:6px 12px 6px 0;font-weight:600">Όνομα</td><td style="padding:6px 0">${escapeHtml(fullName)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;font-weight:600">Email</td><td style="padding:6px 0">${escapeHtml(payload.email)}</td></tr>
      ${
        payload.companyName && payload.companyName !== '-'
          ? `<tr><td style="padding:6px 12px 6px 0;font-weight:600">Εταιρεία / URL</td><td style="padding:6px 0">${escapeHtml(payload.companyName)}</td></tr>`
          : ''
      }
      ${
        payload.phone
          ? `<tr><td style="padding:6px 12px 6px 0;font-weight:600">Τηλέφωνο</td><td style="padding:6px 0">${escapeHtml(payload.phone)}</td></tr>`
          : ''
      }
      <tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">Μήνυμα</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(payload.message)}</td></tr>
    </table>
    <p style="margin-top:24px"><a href="${studioEditUrl(documentId)}">Άνοιγμα στο Sanity Studio</a></p>
  `

  return {subject, text, html}
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Best-effort Resend notify. Never throws — save to Sanity already succeeded. */
async function sendAdminNotification(
  payload: ContactPayload,
  documentId: string,
): Promise<void> {
  const apiKey = import.meta.env.RESEND_API_KEY
  const to = import.meta.env.ADMIN_NOTIFICATION_EMAIL
  const from = import.meta.env.RESEND_FROM_EMAIL || DEFAULT_FROM

  if (!apiKey || !to) {
    console.warn(
      '[form-submission] Skipped admin email: RESEND_API_KEY or ADMIN_NOTIFICATION_EMAIL not set',
    )
    return
  }

  const {subject, text, html} = formatAdminEmail(payload, documentId)

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: payload.email,
      subject,
      text,
      html,
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    throw new Error(`Resend API error (${response.status}): ${errorBody}`)
  }
}

export async function saveContactSubmission(payload: ContactPayload) {
  if (!import.meta.env.SANITY_WRITE_TOKEN) {
    throw new Error('SANITY_WRITE_TOKEN is not configured.')
  }

  const fullName = `${payload.firstName} ${payload.lastName}`.trim()
  const formType = payload.formType ?? 'contact'

  const result = await writeClient.create({
    _type: 'formSubmission',
    formType,
    firstName: payload.firstName,
    lastName: payload.lastName,
    fullName,
    companyName: payload.companyName,
    email: payload.email,
    phone: payload.phone ?? '',
    message: payload.message,
    privacyAccepted: payload.privacyAccepted,
    submittedAt: new Date().toISOString(),
    read: false,
    starred: false,
  })

  try {
    await sendAdminNotification(payload, result._id)
  } catch (error) {
    console.error('[form-submission] admin notification failed:', error)
  }

  return result
}
