/** Canonical URLs and the page/fallback title merge every v2 page does. */
import {SITE_URL} from '../sanity-config'

const ORIGIN = SITE_URL.replace(/\/+$/, '')

/** `/erga` -> `/erga/`. Leaves `/`, query strings and file paths alone. */
export function withTrailingSlash(pathname: string): string {
  if (!pathname) return '/'

  const [path, rest = ''] = splitSuffix(pathname)
  if (path.endsWith('/')) return `${path}${rest}`
  if (/\.[a-z0-9]+$/i.test(path)) return `${path}${rest}`
  return `${path}/${rest}`
}

/** Absolute URL on the canonical host. Already-absolute input passes through. */
export function absoluteUrl(pathname: string): string {
  if (!pathname) return `${ORIGIN}/`
  if (/^https?:\/\//i.test(pathname)) return pathname
  return `${ORIGIN}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}

export interface ResolvedSeo {
  title: string
  description: string
}

/** Sanity `seo` wins when it has content, otherwise the page's own defaults. */
export function resolveSeo(
  pageSeo: {title?: string; description?: string} | null | undefined,
  fallbacks: ResolvedSeo,
): ResolvedSeo {
  return {
    title: pageSeo?.title?.trim() || fallbacks.title,
    description: pageSeo?.description?.trim() || fallbacks.description,
  }
}

/** Splits a pathname from its `?query` / `#hash` tail. */
function splitSuffix(value: string): [string, string] {
  const cut = value.search(/[?#]/)
  return cut === -1 ? [value, ''] : [value.slice(0, cut), value.slice(cut)]
}
