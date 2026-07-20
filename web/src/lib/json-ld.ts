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
      name: 'Side by Side Web Studio',
    },
    ...(options.datePublished ? {datePublished: options.datePublished} : {}),
    ...(options.dateModified ? {dateModified: options.dateModified} : {}),
  }
}
