import {getCliClient} from 'sanity/cli'
import seedData from './seed-data.json'

const client = getCliClient({apiVersion: '2025-01-01'})

function key() {
  return Math.random().toString(36).slice(2, 10)
}

function textToBlocks(text: string) {
  return [
    {
      _type: 'block',
      _key: key(),
      style: 'normal',
      markDefs: [],
      children: [{_type: 'span', _key: key(), text, marks: []}],
    },
  ]
}

function refsFromIds(ids: string[]) {
  return ids.map((id) => ({
    _type: 'reference',
    _ref: id,
    _key: key(),
  }))
}

/** Sanity requires `_key` on every array item; named object types also need `_type`. */
const NAMED_ARRAY_ITEMS: Record<string, string> = {
  cards: 'card',
  trustSignals: 'signal',
  credentials: 'credential',
  storySections: 'aboutStorySection',
  timeline: 'aboutTimelineItem',
  approach: 'approachPoint',
  stats: 'aboutStat',
  comparisons: 'aboutComparison',
  phases: 'caseStudyPhase',
  metrics: 'metric',
  cardStats: 'cardStat',
}

function ensureArrayKeys(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => {
      const normalized = ensureArrayKeys(item)
      if (normalized && typeof normalized === 'object' && !Array.isArray(normalized)) {
        const obj = normalized as Record<string, unknown>
        if (!obj._key) obj._key = key()
      }
      return normalized
    })
  }

  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>
    const result: Record<string, unknown> = {...obj}

    for (const [field, fieldValue] of Object.entries(result)) {
      if (field.startsWith('_')) continue

      if (Array.isArray(fieldValue)) {
        const itemType = NAMED_ARRAY_ITEMS[field]
        result[field] = fieldValue.map((item) => {
          let normalized = ensureArrayKeys(item)
          if (normalized && typeof normalized === 'object' && !Array.isArray(normalized)) {
            const entry = {...(normalized as Record<string, unknown>)}
            if (itemType && !entry._type) entry._type = itemType
            if (!entry._key) entry._key = key()
            normalized = entry
          }
          return normalized
        })
      } else if (fieldValue && typeof fieldValue === 'object') {
        result[field] = ensureArrayKeys(fieldValue)
      }
    }

    return result
  }

  return value
}

function loc(value: unknown): {el: string; en: string} | unknown {
  if (value && typeof value === 'object' && ('el' in value || 'en' in value)) return value
  if (typeof value === 'string') return {el: value, en: ''}
  return value
}

function locRich(value: unknown): {el: unknown[]; en: unknown[]} | unknown {
  if (value && typeof value === 'object' && !Array.isArray(value) && ('el' in value || 'en' in value)) {
    return value
  }
  if (typeof value === 'string') return {el: textToBlocks(value), en: []}
  if (Array.isArray(value)) return {el: value, en: []}
  return value
}

function locArray(items: unknown): unknown {
  if (!Array.isArray(items)) return items
  return items.map((item) => (typeof item === 'string' ? loc(item) : item))
}

function setLocalized(obj: Record<string, unknown>, field: string) {
  if (field in obj) obj[field] = loc(obj[field])
}

function setLocalizedRich(obj: Record<string, unknown>, field: string) {
  if (field in obj) obj[field] = locRich(obj[field])
}

function migrateLocaleFields(doc: Record<string, unknown>) {
  switch (doc._type) {
    case 'siteSettings':
      setLocalized(doc, 'description')
      setLocalized(doc, 'contactAddress')
      break
    case 'heroSection':
      setLocalized(doc, 'headline')
      setLocalized(doc, 'subheading')
      setLocalized(doc, 'ctaText')
      if (Array.isArray(doc.trustSignals)) {
        doc.trustSignals = (doc.trustSignals as Record<string, unknown>[]).map((signal) => ({
          ...signal,
          text: loc(signal.text),
        }))
      }
      break
    case 'credentialsSection':
      setLocalized(doc, 'headline')
      if (Array.isArray(doc.credentials)) {
        doc.credentials = (doc.credentials as Record<string, unknown>[]).map((item) => ({
          ...item,
          label: loc(item.label),
          description: loc(item.description),
        }))
      }
      break
    case 'valueProposition':
      setLocalized(doc, 'headline')
      if (Array.isArray(doc.cards)) {
        doc.cards = (doc.cards as Record<string, unknown>[]).map((card) => ({
          ...card,
          title: loc(card.title),
          description: loc(card.description),
        }))
      }
      break
    case 'service':
      setLocalized(doc, 'title')
      setLocalized(doc, 'description')
      setLocalized(doc, 'priceLabel')
      setLocalized(doc, 'duration')
      setLocalizedRich(doc, 'fullDescription')
      if (Array.isArray(doc.whatIncluded)) doc.whatIncluded = locArray(doc.whatIncluded)
      break
    case 'processStep':
      setLocalized(doc, 'title')
      setLocalized(doc, 'description')
      break
    case 'faq':
      setLocalized(doc, 'question')
      setLocalizedRich(doc, 'answer')
      break
    case 'testimonial':
      setLocalized(doc, 'quote')
      setLocalized(doc, 'role')
      break
    case 'blogPost':
      setLocalized(doc, 'title')
      setLocalized(doc, 'excerpt')
      setLocalizedRich(doc, 'content')
      break
    case 'aboutPage':
      setLocalized(doc, 'subheadline')
      setLocalized(doc, 'intro')
      setLocalized(doc, 'heroBadgeLabel')
      setLocalized(doc, 'primaryCtaText')
      setLocalized(doc, 'secondaryCtaText')
      setLocalized(doc, 'philosophyHeadline')
      setLocalized(doc, 'philosophyHighlight')
      setLocalized(doc, 'workStyleHeadline')
      setLocalized(doc, 'workStyleSubheadline')
      setLocalized(doc, 'comparisonHeadline')
      setLocalized(doc, 'testimonialsHeadline')
      setLocalized(doc, 'ctaHeadline')
      setLocalized(doc, 'ctaDescription')
      setLocalized(doc, 'ctaText')
      if (Array.isArray(doc.philosophyParagraphs)) {
        doc.philosophyParagraphs = locArray(doc.philosophyParagraphs)
      }
      if (Array.isArray(doc.storySections)) {
        doc.storySections = (doc.storySections as Record<string, unknown>[]).map((section) => ({
          ...section,
          title: loc(section.title),
          content: loc(section.content),
        }))
      }
      if (Array.isArray(doc.timeline)) {
        doc.timeline = (doc.timeline as Record<string, unknown>[]).map((item) => ({
          ...item,
          period: loc(item.period),
          title: loc(item.title),
          description: loc(item.description),
        }))
      }
      if (Array.isArray(doc.approach)) {
        doc.approach = (doc.approach as Record<string, unknown>[]).map((point) => ({
          ...point,
          title: loc(point.title),
          description: loc(point.description),
        }))
      }
      if (Array.isArray(doc.stats)) {
        doc.stats = (doc.stats as Record<string, unknown>[]).map((stat) => ({
          ...stat,
          label: loc(stat.label),
        }))
      }
      if (Array.isArray(doc.comparisons)) {
        doc.comparisons = (doc.comparisons as Record<string, unknown>[]).map((block) => ({
          ...block,
          negativeTitle: loc(block.negativeTitle),
          positiveTitle: loc(block.positiveTitle),
          negativeItems: locArray(block.negativeItems),
          positiveItems: locArray(block.positiveItems),
        }))
      }
      if (doc.seo && typeof doc.seo === 'object') {
        const seo = doc.seo as Record<string, unknown>
        setLocalized(seo, 'metaTitle')
        setLocalized(seo, 'metaDescription')
      }
      break
    case 'caseStudy':
      setLocalized(doc, 'title')
      setLocalized(doc, 'summary')
      setLocalizedRich(doc, 'fullContent')
      if (doc.problem && typeof doc.problem === 'object') {
        const problem = doc.problem as Record<string, unknown>
        setLocalized(problem, 'title')
        setLocalized(problem, 'description')
        setLocalized(problem, 'impact')
        setLocalized(problem, 'visualizationLabel')
        if (Array.isArray(problem.bullets)) problem.bullets = locArray(problem.bullets)
      }
      if (doc.solution && typeof doc.solution === 'object') {
        const solution = doc.solution as Record<string, unknown>
        setLocalized(solution, 'title')
        setLocalizedRich(solution, 'description')
        if (Array.isArray(solution.phases)) {
          solution.phases = (solution.phases as Record<string, unknown>[]).map((phase) => ({
            ...phase,
            title: loc(phase.title),
            description: loc(phase.description),
          }))
        }
      }
      if (doc.results && typeof doc.results === 'object') {
        const results = doc.results as Record<string, unknown>
        setLocalized(results, 'summary')
        if (Array.isArray(results.metrics)) {
          results.metrics = (results.metrics as Record<string, unknown>[]).map((metric) => ({
            ...metric,
            label: loc(metric.label),
            comparison: loc(metric.comparison),
          }))
        }
      }
      if (doc.investment && typeof doc.investment === 'object') {
        const investment = doc.investment as Record<string, unknown>
        setLocalized(investment, 'amount')
        setLocalized(investment, 'timeline')
        setLocalized(investment, 'breakdown')
        setLocalized(investment, 'roi')
      }
      if (doc.testimonial && typeof doc.testimonial === 'object') {
        const testimonial = doc.testimonial as Record<string, unknown>
        setLocalized(testimonial, 'quote')
        setLocalized(testimonial, 'role')
      }
      if (Array.isArray(doc.cardStats)) {
        doc.cardStats = (doc.cardStats as Record<string, unknown>[]).map((stat) => ({
          ...stat,
          label: loc(stat.label),
        }))
      }
      if (doc.seo && typeof doc.seo === 'object') {
        const seo = doc.seo as Record<string, unknown>
        setLocalized(seo, 'metaTitle')
        setLocalized(seo, 'metaDescription')
      }
      break
    default:
      break
  }
}

function normalizeDoc(doc: Record<string, unknown>): Record<string, unknown> {
  const normalized = {...doc}

  if (normalized._type === 'faq' && typeof normalized.answer === 'string') {
    normalized.answer = textToBlocks(normalized.answer)
  }

  if (normalized._type === 'caseStudy') {
    if (normalized.solution) {
      const solution = normalized.solution as Record<string, unknown>
      if (typeof solution.description === 'string') {
        solution.description = textToBlocks(solution.description)
      }
    }

    if (typeof normalized.fullContent === 'string') {
      normalized.fullContent = textToBlocks(normalized.fullContent)
    }

    if (Array.isArray(normalized.relatedServices)) {
      const services = normalized.relatedServices as unknown[]
      if (services.every((item) => typeof item === 'string')) {
        normalized.relatedServices = refsFromIds(services as string[])
      }
    }
  }

  if (normalized._type === 'aboutPage') {
    if (Array.isArray(normalized.featuredTestimonials)) {
      const items = normalized.featuredTestimonials as unknown[]
      if (items.every((item) => typeof item === 'string')) {
        normalized.featuredTestimonials = refsFromIds(items as string[])
      }
    }
  }

  if (normalized.slug && typeof normalized.slug === 'object') {
    const slug = normalized.slug as Record<string, unknown>
    if (slug.current && !slug._type) {
      normalized.slug = {_type: 'slug', current: slug.current}
    }
  }

  migrateLocaleFields(normalized)

  return ensureArrayKeys(normalized) as Record<string, unknown>
}

function collectDocuments(data: Record<string, unknown>): Record<string, unknown>[] {
  const docs: Record<string, unknown>[] = []

  for (const value of Object.values(data)) {
    if (Array.isArray(value)) {
      docs.push(...value.map((item) => normalizeDoc(item as Record<string, unknown>)))
    } else if (value && typeof value === 'object') {
      docs.push(normalizeDoc(value as Record<string, unknown>))
    }
  }

  return docs
}

async function seed() {
  const documents = collectDocuments(seedData as Record<string, unknown>)

  for (const doc of documents) {
    await client.createOrReplace(doc)
    console.log(`Seeded: ${doc._id}`)
  }

  console.log(`Done — ${documents.length} documents seeded.`)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
