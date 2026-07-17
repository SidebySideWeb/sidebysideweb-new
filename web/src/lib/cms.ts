import {client} from './sanity'
import {fetchWithFallback} from './fetch-with-fallback'
import {homePageFallback} from './fallbacks'
import {DEFAULT_LOCALE, type SiteLocale} from './i18n'
import {
  mapAboutPageData,
  mapCaseStudyPage,
  mapHomePageData,
} from './locale-mapper'
import {
  ABOUT_PAGE_QUERY,
  CASE_STUDY_BY_SLUG_QUERY,
  CREDENTIALS_QUERY,
  FAQS_QUERY,
  FEATURED_CASE_STUDIES_QUERY,
  HERO_SECTION_QUERY,
  PROCESS_STEPS_QUERY,
  RELATED_CASE_STUDIES_QUERY,
  SERVICES_QUERY,
  SITE_SETTINGS_QUERY,
  TESTIMONIALS_QUERY,
  VALUE_PROPOSITION_QUERY,
} from './queries'
import type {AboutPage, CaseStudy, HomePageData, Service, Testimonial} from './types'
import {aboutPageFallback} from './about-fallbacks'

export async function getHomePageData(locale: SiteLocale = DEFAULT_LOCALE): Promise<HomePageData> {
  return fetchWithFallback(
    async () => {
      const [
        siteSettings,
        hero,
        credentials,
        valueProposition,
        services,
        processSteps,
        caseStudies,
        testimonials,
        faqs,
      ] = await Promise.all([
        client.fetch(SITE_SETTINGS_QUERY),
        client.fetch(HERO_SECTION_QUERY),
        client.fetch(CREDENTIALS_QUERY),
        client.fetch(VALUE_PROPOSITION_QUERY),
        client.fetch(SERVICES_QUERY),
        client.fetch(PROCESS_STEPS_QUERY),
        client.fetch(FEATURED_CASE_STUDIES_QUERY),
        client.fetch(TESTIMONIALS_QUERY),
        client.fetch(FAQS_QUERY),
      ])

      return mapHomePageData(
        {
          siteSettings: siteSettings ?? homePageFallback.siteSettings,
          hero: hero ?? homePageFallback.hero,
          credentials: credentials ?? homePageFallback.credentials,
          valueProposition: valueProposition ?? homePageFallback.valueProposition,
          services: services ?? [],
          processSteps: processSteps ?? [],
          caseStudies: caseStudies ?? [],
          testimonials: testimonials ?? [],
          faqs: faqs ?? [],
        },
        locale,
      )
    },
    mapHomePageData(homePageFallback, locale),
    'home page',
  )
}

export function blocksToPlainText(blocks: unknown[] | undefined): string {
  if (!blocks?.length) return ''

  return blocks
    .filter((block): block is {_type?: string; children?: {_type?: string; text?: string}[]} =>
      Boolean(block && typeof block === 'object'),
    )
    .flatMap((block) =>
      block._type === 'block' && block.children
        ? block.children
            .filter((child) => child._type === 'span' && child.text)
            .map((child) => child.text ?? '')
        : [],
    )
    .join(' ')
}

export function initials(name: string | undefined): string {
  if (!name) return '?'
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export async function getCaseStudyPageData(slug: string, locale: SiteLocale = DEFAULT_LOCALE) {
  const [caseStudy, relatedCaseStudies, services, siteSettings] = await Promise.all([
    client.fetch<CaseStudy | null>(CASE_STUDY_BY_SLUG_QUERY, {slug}),
    client.fetch<CaseStudy[]>(RELATED_CASE_STUDIES_QUERY, {slug}),
    client.fetch<Service[]>(SERVICES_QUERY),
    client.fetch(SITE_SETTINGS_QUERY),
  ])

  return mapCaseStudyPage(
    {
      caseStudy,
      relatedCaseStudies: relatedCaseStudies ?? [],
      services: services ?? [],
      siteSettings: siteSettings ?? homePageFallback.siteSettings,
    },
    locale,
  )
}

export function blocksToParagraphs(blocks: unknown[] | undefined): string[] {
  if (!blocks?.length) return []

  return blocks
    .filter((block): block is {_type?: string; children?: {_type?: string; text?: string}[]} =>
      Boolean(block && typeof block === 'object'),
    )
    .flatMap((block) => {
      if (block._type !== 'block' || !block.children) return []
      const text = block.children
        .filter((child) => child._type === 'span' && child.text)
        .map((child) => child.text ?? '')
        .join('')
      return text ? [text] : []
    })
}

export async function getAboutPageData(locale: SiteLocale = DEFAULT_LOCALE) {
  const [aboutPage, siteSettings, allTestimonials] = await Promise.all([
    client.fetch<AboutPage | null>(ABOUT_PAGE_QUERY),
    client.fetch(SITE_SETTINGS_QUERY),
    client.fetch<Testimonial[]>(TESTIMONIALS_QUERY),
  ])

  return mapAboutPageData(
    {
      aboutPage: aboutPage ?? aboutPageFallback,
      siteSettings: siteSettings ?? homePageFallback.siteSettings,
      allTestimonials: allTestimonials ?? [],
    },
    locale,
  )
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  const studies = await client.fetch<string[]>(
    `*[_type == "caseStudy" && defined(slug.current)].slug.current`,
  )
  return studies.filter(Boolean)
}
