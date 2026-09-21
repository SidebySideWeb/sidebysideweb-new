import {blocksToPlainText} from './cms'
import type {Faq, SiteSettings} from './types'
import {SITE_NAME, SITE_URL} from './sanity-config'

export function buildArticleJsonLd(options: {
  headline: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.headline,
    description: options.description,
    url: options.url,
    inLanguage: 'el',
    author: {
      '@type': 'Person',
      name: 'Dimitris Geronikolos',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(options.datePublished ? {datePublished: options.datePublished} : {}),
    ...(options.dateModified ? {dateModified: options.dateModified} : {}),
  }
}

export function buildOrganizationJsonLd(siteSettings: SiteSettings) {
  const origin = SITE_URL.replace(/\/$/, '')
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${origin}/#business`,
    name: siteSettings.siteName ?? SITE_NAME,
    description: siteSettings.description,
    url: `${origin}/`,
    email: siteSettings.contactEmail,
    telephone: siteSettings.contactPhone,
    areaServed: {
      '@type': 'Country',
      name: 'Greece',
    },
    address: siteSettings.contactAddress
      ? {
          '@type': 'PostalAddress',
          addressLocality: siteSettings.contactAddress,
          addressCountry: 'GR',
        }
      : undefined,
  }
}

export function buildHomeJsonLd(options: {
  siteSettings: SiteSettings
  faqs: Faq[]
}) {
  const origin = SITE_URL.replace(/\/$/, '')
  const {['@context']: _ctx, ...business} = buildOrganizationJsonLd(options.siteSettings)

  const faqEntities = options.faqs.flatMap((faq) => {
    const question = faq.question?.trim()
    const answer = blocksToPlainText(faq.answer).trim()
    if (!question || !answer) return []
    return [
      {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      },
    ]
  })

  const graph = [
    business,
    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      url: `${origin}/`,
      name: options.siteSettings.siteName ?? SITE_NAME,
      description: options.siteSettings.description,
      inLanguage: 'el',
      publisher: {'@id': `${origin}/#business`},
    },
    faqEntities.length
      ? {
          '@type': 'FAQPage',
          '@id': `${origin}/#faq`,
          mainEntity: faqEntities,
        }
      : null,
  ].filter(Boolean)

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}
