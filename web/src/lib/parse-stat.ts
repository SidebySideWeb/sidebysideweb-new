export interface ParsedStat {
  target: number | null
  prefix: string
  suffix: string
  display: string
}

/**
 * Parse CMS/stat strings for counter animation.
 * Keeps European decimals like "$19,99" as non-animatable display-only values.
 * Supports: "4+", "~90%", "100%", "6", "$200".
 */
export function parseStat(stat: string | undefined): ParsedStat {
  if (!stat) return {target: null, prefix: '', suffix: '', display: ''}

  const trimmed = stat.trim()

  // European decimal comma (e.g. $19,99/μήνα) — show exactly, do not animate
  if (/\d,\d/.test(trimmed)) {
    return {target: null, prefix: '', suffix: '', display: trimmed}
  }

  const match = trimmed.match(/^([^\d~]*)(~?)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return {target: null, prefix: '', suffix: '', display: trimmed}

  const [, rawPrefix = '', tilde = '', numberPart, rawSuffix = ''] = match
  return {
    prefix: `${rawPrefix}${tilde}`,
    target: parseFloat(numberPart),
    suffix: rawSuffix,
    display: trimmed,
  }
}

/** Whether a stat should use count-up progressive enhancement. */
export function shouldAnimateStat(value: string | undefined): boolean {
  const parsed = parseStat(value)
  if (parsed.target === null) return false
  // Pure text labels (e.g. "Αυτόματη") already excluded by parseStat
  // Animate plain numbers, %, +, ~%, and simple currency integers
  return true
}
