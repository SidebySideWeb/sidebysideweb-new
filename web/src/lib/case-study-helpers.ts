import type {CaseStudy} from './types'

export interface CardStat {
  value: string
  label: string
}

export function getCaseStudyCategoryLabel(study: CaseStudy): string {
  return study.tag || 'Case Study'
}

export function getCaseStudyCardStats(study: CaseStudy): CardStat[] {
  if (study.cardStats?.length) {
    return study.cardStats.map((stat) => ({
      value: stat.value ?? '—',
      label: stat.label ?? '—',
    }))
  }

  return [
    {value: '—', label: '—'},
    {value: '—', label: '—'},
    {value: '—', label: '—'},
  ]
}

export function getMainResult(study: CaseStudy): string | undefined {
  return study.heroMainResult
}
