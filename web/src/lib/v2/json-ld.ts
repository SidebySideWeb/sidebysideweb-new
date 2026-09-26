/**
 * schema.org builders for the v2 pages. Every builder returns a plain object
 * that `Base.astro` stringifies into an `application/ld+json` tag.
 */
import {absoluteUrl, withTrailingSlash} from './seo'
import {stripPlaceholders} from './placeholder'

export type JsonLd = Record<string, unknown>

/** Stable node ids so the graph cross-references instead of repeating itself. */
export const BUSINESS_ID = absoluteUrl('/#business')
export const WEBSITE_ID = absoluteUrl('/#website')

const BRAND_NAME = 'Side by Side'
const TAGLINE = 'Τεχνικός συνεργάτης για ελληνικές επιχειρήσεις.'
const LOGO_PATH = '/brand/sbs-mark-paper.svg'

export interface SiteSettingsSeo {
  brandName?: string
  email?: string
  tagline?: string
}

export function buildProfessionalServiceJsonLd(settings?: SiteSettingsSeo): JsonLd {
  const name = settings?.brandName?.trim() || BRAND_NAME
  const description = settings?.tagline?.trim() || TAGLINE
  const email = settings?.email?.trim()

  const node: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': BUSINESS_ID,
    name,
    legalName: 'Side by Side Web Studio',
    description,
    url: absoluteUrl('/'),
    logo: absoluteUrl(LOGO_PATH),
    image: absoluteUrl(LOGO_PATH),
    inLanguage: 'el-GR',
    knowsLanguage: ['el', 'en'],
    areaServed: {'@type': 'Country', name: 'Greece'},
    serviceType: [
      'Ανάπτυξη ιστοσελίδων',
      'Ανάλυση απαιτήσεων',
      'Τεχνική διαχείριση έργων',
      'Αυτοματισμοί',
    ],
  }

  if (email) {
    node.email = email
    node.contactPoint = {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email,
      availableLanguage: ['el', 'en'],
      url: absoluteUrl('/epikoinonia/'),
    }
  }

  return node
}

export function buildWebSiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: BRAND_NAME,
    url: absoluteUrl('/'),
    inLanguage: 'el-GR',
    publisher: {'@id': BUSINESS_ID},
  }
}

export function buildServiceJsonLd(service: {
  title: string
  description?: string
  slug?: string
}): JsonLd {
  const node: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: stripPlaceholders(service.title),
    url: service.slug
      ? absoluteUrl(`/ypiresies/#${service.slug}`)
      : absoluteUrl('/ypiresies/'),
    provider: {'@id': BUSINESS_ID},
    areaServed: {'@type': 'Country', name: 'Greece'},
    inLanguage: 'el-GR',
  }

  const description = stripPlaceholders(service.description)
  if (description) node.description = description

  return node
}

export function buildFaqPageJsonLd(items: {question: string; answer: string}[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'el-GR',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: stripPlaceholders(item.question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripPlaceholders(item.answer),
      },
    })),
  }
}

export function buildBreadcrumbJsonLd(items: {name: string; path: string}[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: stripPlaceholders(item.name),
      item: absoluteUrl(withTrailingSlash(item.path)),
    })),
  }
}

export function buildCaseStudyJsonLd(study: {
  name: string
  headline: string
  short?: string
  slug: string
}): JsonLd {
  const url = absoluteUrl(withTrailingSlash(`/erga/${study.slug}`))

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${url}#case`,
    name: stripPlaceholders(study.name),
    headline: stripPlaceholders(study.headline),
    description: stripPlaceholders(study.short ?? study.headline),
    url,
    inLanguage: 'el-GR',
    author: {'@id': BUSINESS_ID},
    creator: {'@id': BUSINESS_ID},
    isPartOf: {'@id': WEBSITE_ID},
  }
}
