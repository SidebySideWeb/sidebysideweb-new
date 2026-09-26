/**
 * Unfinished copy is written as `[κείμενο]` in Sanity. The prototype renders
 * those brackets in a marigold mono chip so they are impossible to miss.
 */

const PLACEHOLDER = /\[[^\]]+\]/g

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Escaped HTML with every `[...]` run wrapped in the placeholder chip. */
export function ph(text?: string | null): string {
  if (!text) return ''
  return escapeHtml(text).replace(PLACEHOLDER, (match) => `<span class="ph">${match}</span>`)
}

export interface PlaceholderPart {
  text: string
  placeholder: boolean
}

/** Same split as `ph`, as data, so Astro can render it without `set:html`. */
export function phParts(text?: string | null): PlaceholderPart[] {
  if (!text) return []

  const parts: PlaceholderPart[] = []
  let cursor = 0

  for (const match of text.matchAll(PLACEHOLDER)) {
    const start = match.index ?? 0
    if (start > cursor) parts.push({text: text.slice(cursor, start), placeholder: false})
    parts.push({text: match[0], placeholder: true})
    cursor = start + match[0].length
  }

  if (cursor < text.length) parts.push({text: text.slice(cursor), placeholder: false})
  return parts
}

export function hasPlaceholder(text?: string | null): boolean {
  return Boolean(text) && /\[[^\]]+\]/.test(text as string)
}

/** Brackets removed, for attributes such as `aria-label` and `<title>`. */
export function stripPlaceholders(text?: string | null): string {
  return text ? text.replace(/[[\]]/g, '') : ''
}
