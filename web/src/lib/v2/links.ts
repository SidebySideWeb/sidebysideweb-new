/**
 * The prototype is a single file routed by hash. Content seeded from it can
 * still carry those hashes, so map them onto the real routes.
 */

const HASH_ROUTES: Record<string, string> = {
  home: '/',
  services: '/ypiresies',
  process: '/pos-doulevo',
  work: '/erga',
  about: '/poios-eimai',
  contact: '/epikoinonia',
}

const FALLBACK = '/'

export function resolveHref(href?: string | null): string {
  const value = href?.trim()
  if (!value) return FALLBACK

  if (/^(https?:|mailto:|tel:)/i.test(value)) return value
  if (value.startsWith('/')) return value
  if (!value.startsWith('#')) return `/${value}`

  const key = value.slice(1)
  if (key.startsWith('case-')) {
    const slug = key.slice('case-'.length)
    return slug ? `/erga/${slug}` : '/erga'
  }

  return HASH_ROUTES[key] ?? FALLBACK
}

export function servicesHref(slug?: string | null): string {
  return slug ? `/ypiresies#${slug}` : '/ypiresies'
}

export function caseHref(slug?: string | null): string {
  return slug ? `/erga/${slug}` : '/erga'
}

/** Normalised pathname, so `/erga/` and `/erga` compare equal. */
export function normalisePath(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/'
}

export function isActivePath(pathname: string, href: string): boolean {
  const path = normalisePath(pathname)
  if (href === '/') return path === '/'
  return path === href || path.startsWith(`${href}/`)
}
