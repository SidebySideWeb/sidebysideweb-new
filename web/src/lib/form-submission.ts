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

export async function saveContactSubmission(payload: ContactPayload) {
  if (!import.meta.env.SANITY_WRITE_TOKEN) {
    throw new Error('SANITY_WRITE_TOKEN is not configured.')
  }

  const fullName = `${payload.firstName} ${payload.lastName}`.trim()
  const formType = payload.formType ?? 'contact'

  return writeClient.create({
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
}
