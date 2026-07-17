export interface ParsedStat {
  target: number | null
  prefix: string
  suffix: string
  display: string
}

/** Parse CMS stat strings like "15+", "98%", "40%" for counter animation. */
export function parseStat(stat: string | undefined): ParsedStat {
  if (!stat) return {target: null, prefix: '', suffix: '', display: ''}

  const match = stat.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return {target: null, prefix: '', suffix: '', display: stat}

  return {
    prefix: match[1] ?? '',
    target: parseFloat(match[2]),
    suffix: match[3] ?? '',
    display: stat,
  }
}
