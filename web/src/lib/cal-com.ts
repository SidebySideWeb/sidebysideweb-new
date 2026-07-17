/** Shared Cal.com booking config. */
export const CAL_COM_BOOKING_URL =
  'https://cal.com/dimitris-geronikolos-z3h6en/sidevysideweb'

/** Returns true when a CMS CTA should open Cal.com instead of navigating internally. */
export function isBookingCta(href?: string | null): boolean {
  if (!href) return true
  const normalized = href.trim().toLowerCase()
  return (
    normalized === '#contact' ||
    normalized === '/#contact' ||
    normalized.endsWith('#contact') ||
    normalized === CAL_COM_BOOKING_URL ||
    normalized.includes('cal.com/dimitris-geronikolos')
  )
}
