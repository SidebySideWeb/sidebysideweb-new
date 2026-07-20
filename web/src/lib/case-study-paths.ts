/** Case studies that live at site-root paths (legacy URLs), not under /case-studies/. */
export const ROOT_CASE_STUDY_SLUGS = new Set([
  'automation-nea-attiki-odos-twitter',
  'case-study-metaixmio',
])

/** Old Sanity/CMS slugs → canonical public paths. */
export const CASE_STUDY_SLUG_REDIRECTS: Record<string, string> = {
  'nea-attiki-odos-tweets-sto-site': '/automation-nea-attiki-odos-twitter',
  'automation-nea-attiki-odos-twitter': '/automation-nea-attiki-odos-twitter',
  'ekdoseis-metaixmio-digital-strategy-and-requirements-analysis': '/case-study-metaixmio',
  'case-study-metaixmio': '/case-study-metaixmio',
}

export function caseStudyHref(slug: string, localize: (path: string) => string): string {
  const redirected = CASE_STUDY_SLUG_REDIRECTS[slug]
  if (redirected) return localize(redirected)

  if (ROOT_CASE_STUDY_SLUGS.has(slug)) {
    return localize(`/${slug}`)
  }

  return localize(`/case-studies/${slug}`)
}
