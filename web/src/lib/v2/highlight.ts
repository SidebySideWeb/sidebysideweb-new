/**
 * Split `**marigold**` markers into plain + highlighted fragments.
 * Used by the audit landing page (one marigold phrase per section).
 */
export type HighlightPart = {text: string; highlight?: boolean}

export function splitHighlights(input: string | undefined | null): HighlightPart[] {
  if (!input) return []
  const parts: HighlightPart[] = []
  const re = /\*\*([^*]+)\*\*/g
  let last = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(input))) {
    if (match.index > last) {
      parts.push({text: input.slice(last, match.index)})
    }
    parts.push({text: match[1], highlight: true})
    last = match.index + match[0].length
  }
  if (last < input.length) parts.push({text: input.slice(last)})
  if (!parts.length) parts.push({text: input})
  return parts
}

/** Strip `**` markers for plain-text contexts (meta, JSON-LD). */
export function stripHighlights(input: string | undefined | null): string {
  return (input ?? '').replace(/\*\*/g, '')
}
