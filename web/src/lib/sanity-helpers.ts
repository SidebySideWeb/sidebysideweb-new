import type {SiteLocale} from './i18n'

export type LocaleValue = {el?: string; en?: string} | null | undefined
export type LocaleRichTextValue = {el?: unknown[]; en?: unknown[]} | null | undefined

export function pickLocale(
  value: LocaleValue | string | null | undefined,
  locale: SiteLocale,
): string {
  if (value == null) return ''
  if (typeof value === 'string') return value.trim()
  const primary = locale === 'en' ? value.en : value.el
  const fallback = locale === 'en' ? value.el : value.en
  return (primary || fallback || '').trim()
}

export function pickLocaleLines(
  value: LocaleValue | string | null | undefined,
  locale: SiteLocale,
): readonly string[] {
  return pickLocale(value, locale)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}

export function pickLocaleList(items: unknown, locale: SiteLocale): string[] {
  if (!Array.isArray(items)) return []
  return items
    .map((item) => pickLocale(item as LocaleValue | string, locale))
    .filter(Boolean)
}

export function pickLocaleBlocks(
  value: LocaleRichTextValue | unknown[] | null | undefined,
  locale: SiteLocale,
): unknown[] | undefined {
  if (!value) return undefined
  if (Array.isArray(value)) return value
  const primary = locale === 'en' ? value.en : value.el
  const fallback = locale === 'en' ? value.el : value.en
  const blocks = primary?.length ? primary : fallback
  return blocks?.length ? blocks : undefined
}

export function pickLocaleImageAlt(
  value: LocaleValue | string | null | undefined,
  locale: SiteLocale,
): string | undefined {
  const alt = pickLocale(value, locale)
  return alt || undefined
}
