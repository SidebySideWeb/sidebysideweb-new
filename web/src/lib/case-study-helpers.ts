import type {SiteLocale} from './i18n'
import type {CaseStudy, CaseStudyCategory, Service} from './types'

const CATEGORY_LABELS: Record<SiteLocale, Record<CaseStudyCategory, string>> = {
  el: {
    'automation-workflows': 'Automation & Workflows',
    'saas-mvp': 'SaaS MVP',
    'erp-integration': 'ERP Integration',
    'crm-integration': 'CRM Integration',
    'technical-project': 'Τεχνικό Έργο',
  },
  en: {
    'automation-workflows': 'Automation & Workflows',
    'saas-mvp': 'SaaS MVP',
    'erp-integration': 'ERP Integration',
    'crm-integration': 'CRM Integration',
    'technical-project': 'Technical Project',
  },
}

export function getCaseStudyCategoryLabel(study: CaseStudy, locale: SiteLocale = 'el'): string {
  if (study.category && CATEGORY_LABELS[locale][study.category]) {
    return CATEGORY_LABELS[locale][study.category]
  }
  return inferCaseStudyCategory(study, locale)
}

function inferCaseStudyCategory(study: CaseStudy, locale: SiteLocale): string {
  const text = [
    study.title ?? '',
    study.solution?.title ?? '',
    study.summary ?? '',
    ...(study.solution?.technologies ?? []),
  ]
    .join(' ')
    .toLowerCase()

  if (text.includes('saas') || text.includes('mvp')) return 'SaaS MVP'
  if (text.includes('erp') || text.includes('e-shop') || text.includes('inventory') || text.includes('woocommerce')) {
    return 'ERP Integration'
  }
  if (text.includes('automation') || text.includes('workflow') || text.includes('crm') || text.includes('real estate')) {
    return 'Automation & Workflows'
  }
  return locale === 'en' ? 'Technical Project' : 'Τεχνικό Έργο'
}

const CARD_STAT_LABELS: Record<SiteLocale, {result: string; investment: string; duration: string}> = {
  el: {result: 'Αποτέλεσμα', investment: 'Επένδυση', duration: 'Διάρκεια'},
  en: {result: 'Result', investment: 'Investment', duration: 'Duration'},
}

export interface CardStat {
  value: string
  label: string
}

export function getCaseStudyCardStats(study: CaseStudy, locale: SiteLocale = 'el'): CardStat[] {
  if (study.cardStats?.length) {
    return study.cardStats.map((stat) => ({
      value: stat.value ?? '—',
      label: stat.label ?? '—',
    }))
  }

  const labels = CARD_STAT_LABELS[locale]
  const primaryMetric = study.results?.metrics?.[0]
  return [
    {
      value: primaryMetric?.value ?? '—',
      label: primaryMetric?.label ?? labels.result,
    },
    {
      value: study.investment?.amount ?? '—',
      label: labels.investment,
    },
    {
      value: study.investment?.timeline ?? '—',
      label: labels.duration,
    },
  ]
}

export function getProblemBullets(study: CaseStudy): string[] {
  if (study.problem?.bullets?.length) {
    return study.problem.bullets.filter(Boolean)
  }

  const impact = study.problem?.impact
  if (!impact) return []

  return impact
    .split(/[.;]\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
}

export function getRoiLabel(study: CaseStudy): string | undefined {
  if (study.investment?.roi) return study.investment.roi

  const roiMetric = study.results?.metrics?.find((metric) =>
    /roi|payback|απόσβεση/i.test(metric.label ?? ''),
  )
  return roiMetric?.value
}

export function pickRelatedServices(services: Service[], limit = 3): Service[] {
  return services.slice(0, limit)
}

export function getMainResult(study: CaseStudy): string | undefined {
  return study.heroMainResult ?? study.results?.metrics?.[0]?.value ?? study.results?.summary
}

export function getSolutionPhases(study: CaseStudy) {
  const phases = study.solution?.phases ?? []
  return [...phases].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}
