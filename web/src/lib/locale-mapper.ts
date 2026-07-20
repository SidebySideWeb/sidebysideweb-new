import {pickLocale, pickLocaleBlocks, pickLocaleList} from './sanity-helpers'
import type {SiteLocale} from './i18n'
import type {
  AboutPage,
  CaseStudy,
  CredentialsSection,
  Faq,
  HeroSection,
  HomePageData,
  ProcessStep,
  Service,
  SiteSettings,
  Testimonial,
  ValueProposition,
} from './types'

function mapSiteSettings(raw: Record<string, unknown> | null | undefined, locale: SiteLocale): SiteSettings {
  if (!raw) return {}
  return {
    siteName: raw.siteName as string | undefined,
    description: pickLocale(raw.description as never, locale) || undefined,
    primaryColor: raw.primaryColor as string | undefined,
    accentColor: raw.accentColor as string | undefined,
    contactEmail: raw.contactEmail as string | undefined,
    contactPhone: raw.contactPhone as string | undefined,
    contactAddress: pickLocale(raw.contactAddress as never, locale) || undefined,
  }
}

function mapHero(raw: Record<string, unknown> | null | undefined, locale: SiteLocale): HeroSection {
  if (!raw) return {}
  const heroImage = raw.heroImage as Record<string, unknown> | undefined
  return {
    headline: pickLocale(raw.headline as never, locale) || undefined,
    subheading: pickLocale(raw.subheading as never, locale) || undefined,
    ctaText: pickLocale(raw.ctaText as never, locale) || undefined,
    ctaLink: raw.ctaLink as string | undefined,
    heroImageUrl: raw.heroImageUrl as string | undefined,
    heroImage: heroImage
      ? {
          ...(heroImage as HeroSection['heroImage']),
          alt: pickLocale(heroImage.alt as never, locale) || undefined,
        }
      : undefined,
    trustSignals: Array.isArray(raw.trustSignals)
      ? (raw.trustSignals as Record<string, unknown>[]).map((signal) => ({
          icon: signal.icon as string | undefined,
          text: pickLocale(signal.text as never, locale) || undefined,
        }))
      : undefined,
  }
}

function mapCredentials(
  raw: Record<string, unknown> | null | undefined,
  locale: SiteLocale,
): CredentialsSection {
  if (!raw) return {}
  return {
    headline: pickLocale(raw.headline as never, locale) || undefined,
    credentials: Array.isArray(raw.credentials)
      ? (raw.credentials as Record<string, unknown>[]).map((item) => ({
          stat: item.stat as string | undefined,
          icon: item.icon as string | undefined,
          label: pickLocale(item.label as never, locale) || undefined,
          description: pickLocale(item.description as never, locale) || undefined,
        }))
      : undefined,
  }
}

function mapValueProposition(
  raw: Record<string, unknown> | null | undefined,
  locale: SiteLocale,
): ValueProposition {
  if (!raw) return {}
  return {
    headline: pickLocale(raw.headline as never, locale) || undefined,
    description: pickLocale(raw.description as never, locale) || undefined,
    cards: Array.isArray(raw.cards)
      ? (raw.cards as Record<string, unknown>[]).map((card) => ({
          icon: card.icon as string | undefined,
          order: card.order as number | undefined,
          title: pickLocale(card.title as never, locale) || undefined,
          description: pickLocale(card.description as never, locale) || undefined,
        }))
      : undefined,
  }
}

function mapService(raw: Record<string, unknown>, locale: SiteLocale): Service {
  return {
    _id: raw._id as string,
    slug: raw.slug as Service['slug'],
    icon: raw.icon as string | undefined,
    order: raw.order as number | undefined,
    priceLabel: pickLocale(raw.priceLabel as never, locale) || undefined,
    duration: pickLocale(raw.duration as never, locale) || undefined,
    title: pickLocale(raw.title as never, locale) || undefined,
    description: pickLocale(raw.description as never, locale) || undefined,
    whatIncluded: pickLocaleList(raw.whatIncluded, locale),
  }
}

function mapProcessStep(raw: Record<string, unknown>, locale: SiteLocale): ProcessStep {
  return {
    _id: raw._id as string,
    stepNumber: raw.stepNumber as number | undefined,
    icon: raw.icon as string | undefined,
    title: pickLocale(raw.title as never, locale) || undefined,
    description: pickLocale(raw.description as never, locale) || undefined,
  }
}

function mapTestimonial(raw: Record<string, unknown>, locale: SiteLocale): Testimonial {
  return {
    _id: raw._id as string,
    author: raw.author as string | undefined,
    company: raw.company as string | undefined,
    rating: raw.rating as number | undefined,
    quote: pickLocale(raw.quote as never, locale) || undefined,
    role: pickLocale(raw.role as never, locale) || undefined,
  }
}

function mapFaq(raw: Record<string, unknown>, locale: SiteLocale): Faq {
  return {
    _id: raw._id as string,
    order: raw.order as number | undefined,
    category: raw.category as Faq['category'],
    question: pickLocale(raw.question as never, locale) || undefined,
    answer: pickLocaleBlocks(raw.answer as never, locale),
  }
}

function mapSeo(raw: Record<string, unknown> | null | undefined, locale: SiteLocale) {
  if (!raw) return undefined
  return {
    metaTitle: pickLocale(raw.metaTitle as never, locale) || undefined,
    metaDescription: pickLocale(raw.metaDescription as never, locale) || undefined,
  }
}

function mapCaseStudy(raw: Record<string, unknown>, locale: SiteLocale): CaseStudy {
  const costSection = raw.costSection as Record<string, unknown> | undefined
  const whyItMatters = raw.whyItMatters as Record<string, unknown> | undefined
  const testimonialRaw = raw.testimonial as Record<string, unknown> | undefined
  const featuredImage = raw.featuredImage as Record<string, unknown> | undefined

  return {
    _id: raw._id as string,
    layout: raw.layout as CaseStudy['layout'],
    slug: raw.slug as CaseStudy['slug'],
    order: raw.order as number | undefined,
    featured: raw.featured as boolean | undefined,
    heroMainResult: raw.heroMainResult as string | undefined,
    featuredImageUrl: raw.featuredImageUrl as string | undefined,
    chips: Array.isArray(raw.chips) ? (raw.chips as string[]) : undefined,
    featuredImage: featuredImage
      ? {
          ...(featuredImage as CaseStudy['featuredImage']),
          alt: pickLocale(featuredImage.alt as never, locale) || undefined,
        }
      : undefined,
    title: pickLocale(raw.title as never, locale) || undefined,
    tag: pickLocale(raw.tag as never, locale) || undefined,
    client: pickLocale(raw.client as never, locale) || undefined,
    intro: pickLocale(raw.intro as never, locale) || undefined,
    summary: pickLocale(raw.summary as never, locale) || undefined,
    chipsLabel: pickLocale(raw.chipsLabel as never, locale) || undefined,
    cardStats: Array.isArray(raw.cardStats)
      ? (raw.cardStats as Record<string, unknown>[]).map((stat) => ({
          value: stat.value as string | undefined,
          label: pickLocale(stat.label as never, locale) || undefined,
        }))
      : undefined,
    challenges: Array.isArray(raw.challenges)
      ? (raw.challenges as Record<string, unknown>[]).map((item) => ({
          title: pickLocale(item.title as never, locale) || undefined,
          body: pickLocale(item.body as never, locale) || undefined,
          severity: pickLocale(item.severity as never, locale) || undefined,
        }))
      : undefined,
    costSection: costSection
      ? {
          title: pickLocale(costSection.title as never, locale) || undefined,
          paragraphs: pickLocaleList(costSection.paragraphs, locale),
          steps: pickLocaleList(costSection.steps, locale),
          closing: pickLocale(costSection.closing as never, locale) || undefined,
        }
      : undefined,
    resultStats: Array.isArray(raw.resultStats)
      ? (raw.resultStats as Record<string, unknown>[]).map((stat) => ({
          value: stat.value as string | undefined,
          label: pickLocale(stat.label as never, locale) || undefined,
          animate: stat.animate as boolean | undefined,
        }))
      : undefined,
    beforeAfter: Array.isArray(raw.beforeAfter)
      ? (raw.beforeAfter as Record<string, unknown>[]).map((row) => ({
          before: pickLocale(row.before as never, locale) || undefined,
          after: pickLocale(row.after as never, locale) || undefined,
        }))
      : undefined,
    whyItMatters: whyItMatters
      ? {
          title: pickLocale(whyItMatters.title as never, locale) || undefined,
          paragraphs: pickLocaleList(whyItMatters.paragraphs, locale),
        }
      : undefined,
    relatedServiceLabels: pickLocaleList(raw.relatedServiceLabels, locale),
    processSteps: Array.isArray(raw.processSteps)
      ? (raw.processSteps as Record<string, unknown>[]).map((step) => ({
          title: pickLocale(step.title as never, locale) || undefined,
          description: pickLocale(step.description as never, locale) || undefined,
        }))
      : undefined,
    roleItems: Array.isArray(raw.roleItems)
      ? (raw.roleItems as Record<string, unknown>[]).map((item) => ({
          title: pickLocale(item.title as never, locale) || undefined,
          body: pickLocale(item.body as never, locale) || undefined,
        }))
      : undefined,
    outcomes: Array.isArray(raw.outcomes)
      ? (raw.outcomes as Record<string, unknown>[]).map((item) => ({
          title: pickLocale(item.title as never, locale) || undefined,
          body: pickLocale(item.body as never, locale) || undefined,
        }))
      : undefined,
    testimonial: testimonialRaw
      ? {
          author: testimonialRaw.author as string | undefined,
          quote: pickLocale(testimonialRaw.quote as never, locale) || undefined,
          role: pickLocale(testimonialRaw.role as never, locale) || undefined,
        }
      : undefined,
    seo: mapSeo(raw.seo as Record<string, unknown> | undefined, locale),
  }
}

function mapAboutPage(raw: Record<string, unknown> | null | undefined, locale: SiteLocale): AboutPage {
  if (!raw) return {}
  const photo = raw.photo as Record<string, unknown> | undefined

  return {
    headline: raw.headline as string | undefined,
    heroBadgeValue: raw.heroBadgeValue as string | undefined,
    primaryCtaLink: raw.primaryCtaLink as string | undefined,
    secondaryCtaLink: raw.secondaryCtaLink as string | undefined,
    photoUrl: raw.photoUrl as string | undefined,
    ctaLink: raw.ctaLink as string | undefined,
    subheadline: pickLocale(raw.subheadline as never, locale) || undefined,
    intro: pickLocale(raw.intro as never, locale) || undefined,
    heroBadgeLabel: pickLocale(raw.heroBadgeLabel as never, locale) || undefined,
    primaryCtaText: pickLocale(raw.primaryCtaText as never, locale) || undefined,
    secondaryCtaText: pickLocale(raw.secondaryCtaText as never, locale) || undefined,
    philosophyHeadline: pickLocale(raw.philosophyHeadline as never, locale) || undefined,
    philosophyHighlight: pickLocale(raw.philosophyHighlight as never, locale) || undefined,
    philosophyParagraphs: pickLocaleList(raw.philosophyParagraphs, locale),
    workStyleHeadline: pickLocale(raw.workStyleHeadline as never, locale) || undefined,
    workStyleSubheadline: pickLocale(raw.workStyleSubheadline as never, locale) || undefined,
    comparisonHeadline: pickLocale(raw.comparisonHeadline as never, locale) || undefined,
    testimonialsHeadline: pickLocale(raw.testimonialsHeadline as never, locale) || undefined,
    ctaHeadline: pickLocale(raw.ctaHeadline as never, locale) || undefined,
    ctaDescription: pickLocale(raw.ctaDescription as never, locale) || undefined,
    ctaText: pickLocale(raw.ctaText as never, locale) || undefined,
    photo: photo
      ? {
          ...(photo as AboutPage['photo']),
          alt: pickLocale(photo.alt as never, locale) || undefined,
        }
      : undefined,
    storySections: Array.isArray(raw.storySections)
      ? (raw.storySections as Record<string, unknown>[]).map((section) => ({
          title: pickLocale(section.title as never, locale) || undefined,
          content: pickLocale(section.content as never, locale) || undefined,
        }))
      : undefined,
    timeline: Array.isArray(raw.timeline)
      ? (raw.timeline as Record<string, unknown>[]).map((item) => ({
          order: item.order as number | undefined,
          period: pickLocale(item.period as never, locale) || undefined,
          title: pickLocale(item.title as never, locale) || undefined,
          description: pickLocale(item.description as never, locale) || undefined,
        }))
      : undefined,
    approach: Array.isArray(raw.approach)
      ? (raw.approach as Record<string, unknown>[]).map((point) => ({
          icon: point.icon as string | undefined,
          title: pickLocale(point.title as never, locale) || undefined,
          description: pickLocale(point.description as never, locale) || undefined,
        }))
      : undefined,
    stats: Array.isArray(raw.stats)
      ? (raw.stats as Record<string, unknown>[]).map((stat) => ({
          value: stat.value as string | undefined,
          suffix: stat.suffix as string | undefined,
          label: pickLocale(stat.label as never, locale) || undefined,
        }))
      : undefined,
    comparisons: Array.isArray(raw.comparisons)
      ? (raw.comparisons as Record<string, unknown>[]).map((block) => ({
          negativeTitle: pickLocale(block.negativeTitle as never, locale) || undefined,
          positiveTitle: pickLocale(block.positiveTitle as never, locale) || undefined,
          negativeItems: pickLocaleList(block.negativeItems, locale),
          positiveItems: pickLocaleList(block.positiveItems, locale),
        }))
      : undefined,
    featuredTestimonials: Array.isArray(raw.featuredTestimonials)
      ? (raw.featuredTestimonials as Record<string, unknown>[]).map((item) => mapTestimonial(item, locale))
      : undefined,
    seo: mapSeo(raw.seo as Record<string, unknown> | undefined, locale),
  }
}

export function mapHomePageData(raw: Record<string, unknown>, locale: SiteLocale): HomePageData {
  return {
    siteSettings: mapSiteSettings(raw.siteSettings as Record<string, unknown>, locale),
    hero: mapHero(raw.hero as Record<string, unknown>, locale),
    credentials: mapCredentials(raw.credentials as Record<string, unknown>, locale),
    valueProposition: mapValueProposition(raw.valueProposition as Record<string, unknown>, locale),
    services: Array.isArray(raw.services)
      ? (raw.services as Record<string, unknown>[]).map((item) => mapService(item, locale))
      : [],
    processSteps: Array.isArray(raw.processSteps)
      ? (raw.processSteps as Record<string, unknown>[]).map((item) => mapProcessStep(item, locale))
      : [],
    caseStudies: Array.isArray(raw.caseStudies)
      ? (raw.caseStudies as Record<string, unknown>[]).map((item) => mapCaseStudy(item, locale))
      : [],
    testimonials: Array.isArray(raw.testimonials)
      ? (raw.testimonials as Record<string, unknown>[]).map((item) => mapTestimonial(item, locale))
      : [],
    faqs: Array.isArray(raw.faqs)
      ? (raw.faqs as Record<string, unknown>[]).map((item) => mapFaq(item, locale))
      : [],
  }
}

export function mapCaseStudyPage(raw: Record<string, unknown>, locale: SiteLocale) {
  return {
    caseStudy: raw.caseStudy
      ? mapCaseStudy(raw.caseStudy as Record<string, unknown>, locale)
      : null,
    relatedCaseStudies: Array.isArray(raw.relatedCaseStudies)
      ? (raw.relatedCaseStudies as Record<string, unknown>[]).map((item) => mapCaseStudy(item, locale))
      : [],
    services: Array.isArray(raw.services)
      ? (raw.services as Record<string, unknown>[]).map((item) => mapService(item, locale))
      : [],
    siteSettings: mapSiteSettings(raw.siteSettings as Record<string, unknown>, locale),
  }
}

export function mapAboutPageData(raw: Record<string, unknown>, locale: SiteLocale) {
  const aboutPage = mapAboutPage(raw.aboutPage as Record<string, unknown>, locale)
  const allTestimonials = Array.isArray(raw.allTestimonials)
    ? (raw.allTestimonials as Record<string, unknown>[]).map((item) => mapTestimonial(item, locale))
    : []
  const testimonials = aboutPage.featuredTestimonials?.length
    ? aboutPage.featuredTestimonials
    : allTestimonials.slice(0, 3)

  return {
    aboutPage: {...aboutPage, featuredTestimonials: testimonials},
    siteSettings: mapSiteSettings(raw.siteSettings as Record<string, unknown>, locale),
  }
}

export {mapSiteSettings, mapCaseStudy, mapAboutPage}
