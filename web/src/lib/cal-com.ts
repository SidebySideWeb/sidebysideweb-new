/** Shared Cal.com booking config. */
export const CAL_COM_BOOKING_URL =
  'https://cal.com/dimitris-geronikolos-z3h6en/sidevysideweb'

/** Footer contact / CTA section anchor (merged into SiteFooter). */
export const CONTACT_SECTION_HREF = '#contact'

/** Returns true when a CMS CTA should open Cal.com (explicit booking URLs only). */
export function isBookingCta(href?: string | null): boolean {
  if (!href) return false
  const normalized = href.trim().toLowerCase()
  return (
    normalized === CAL_COM_BOOKING_URL ||
    normalized.includes('cal.com/dimitris-geronikolos')
  )
}

/** Normalize legacy contact links to the footer section hash. */
export function resolveContactHref(href?: string | null): string {
  if (!href) return CONTACT_SECTION_HREF
  const normalized = href.trim().toLowerCase()
  if (
    normalized === '#contact' ||
    normalized === '/#contact' ||
    normalized.endsWith('#contact') ||
    normalized === '/contact' ||
    normalized === '/en/contact'
  ) {
    return CONTACT_SECTION_HREF
  }
  return href
}
