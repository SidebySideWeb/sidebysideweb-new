export const DEFAULT_LOCALE = 'el'

export const SUPPORTED_LOCALES = ['el', 'en'] as const

export type SiteLocale = (typeof SUPPORTED_LOCALES)[number]

export function isSiteLocale(value: string | undefined): value is SiteLocale {
  return value !== undefined && (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

export function resolveLocale(langParam: string | undefined): SiteLocale {
  if (isSiteLocale(langParam)) return langParam
  return DEFAULT_LOCALE
}

export function resolvePageLocale(currentLocale: string | undefined): SiteLocale {
  return resolveLocale(currentLocale)
}

export function localeHtmlLang(locale: SiteLocale): string {
  return locale === 'en' ? 'en' : 'el'
}

export function stripLocaleFromPath(pathname: string): string {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`
  for (const locale of SUPPORTED_LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    const prefix = `/${locale}/`
    if (normalized === `/${locale}/`) return '/'
    if (normalized.startsWith(prefix)) {
      const stripped = `/${normalized.slice(prefix.length)}`
      return stripped.endsWith('/') ? stripped : `${stripped}/`
    }
  }
  return normalized
}

export function localizePath(path: string, locale: SiteLocale): string {
  const base = path.startsWith('/') ? path : `/${path}`
  const withSlash = base.endsWith('/') ? base : `${base}/`
  if (locale === DEFAULT_LOCALE) return withSlash
  if (withSlash === '/') return `/${locale}/`
  return `/${locale}${withSlash}`
}

export function switchLocaleInPath(pathname: string, targetLocale: SiteLocale): string {
  return localizePath(stripLocaleFromPath(pathname), targetLocale)
}

export function localeFromPath(pathname: string): SiteLocale {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`
  for (const locale of SUPPORTED_LOCALES) {
    if (locale === DEFAULT_LOCALE) continue
    if (normalized === `/${locale}/` || normalized.startsWith(`/${locale}/`)) {
      return locale
    }
  }
  return DEFAULT_LOCALE
}
