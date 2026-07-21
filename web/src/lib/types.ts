export interface TrustSignal {
  text?: string
  icon?: string
}

export interface SanityImageAsset {
  _id?: string
  url?: string
  metadata?: {
    dimensions?: {width?: number; height?: number}
    lqip?: string
  }
}

export interface SanityImage {
  asset?: SanityImageAsset
  alt?: string
}

export interface SiteSettings {
  siteName?: string
  description?: string
  primaryColor?: string
  accentColor?: string
  contactEmail?: string
  contactPhone?: string
  contactAddress?: string
}

export interface HeroSection {
  headline?: string
  subheading?: string
  ctaText?: string
  ctaLink?: string
  trustSignals?: TrustSignal[]
  heroImage?: SanityImage
  heroImageUrl?: string
}

export interface Service {
  _id: string
  title?: string
  slug?: {current?: string}
  description?: string
  icon?: string
  priceLabel?: string
  duration?: string
  whatIncluded?: string[]
  order?: number
}

export interface ProcessStep {
  _id: string
  stepNumber?: number
  title?: string
  description?: string
  icon?: string
}

export interface CardStat {
  value?: string
  label?: string
}

export type CaseStudyLayout = 'automation' | 'strategy'

export interface CaseStudy {
  _id: string
  layout?: CaseStudyLayout
  title?: string
  slug?: {current?: string}
  tag?: string
  client?: string
  intro?: string
  summary?: string
  chips?: string[]
  chipsLabel?: string
  featured?: boolean
  order?: number
  heroMainResult?: string
  featuredImage?: SanityImage
  featuredImageUrl?: string
  cardStats?: CardStat[]
  challenges?: {title?: string; body?: string; severity?: string}[]
  costSection?: {
    title?: string
    paragraphs?: string[]
    steps?: string[]
    closing?: string
  }
  resultStats?: {value?: string; label?: string; animate?: boolean}[]
  beforeAfter?: {before?: string; after?: string}[]
  whyItMatters?: {title?: string; paragraphs?: string[]}
  relatedServiceLabels?: string[]
  processSteps?: {title?: string; description?: string}[]
  roleItems?: {title?: string; body?: string}[]
  outcomes?: {title?: string; body?: string}[]
  testimonial?: {quote?: string; author?: string; role?: string}
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface Testimonial {
  _id: string
  quote?: string
  author?: string
  role?: string
  company?: string
  rating?: number
}

export interface Faq {
  _id: string
  question?: string
  answer?: unknown[]
  order?: number
  category?: string
}

export interface Credential {
  stat?: string
  label?: string
  description?: string
  icon?: string
}

export interface CredentialsSection {
  headline?: string
  credentials?: Credential[]
}

export interface ValueCard {
  title?: string
  description?: string
  icon?: string
  order?: number
}

export interface ValueProposition {
  headline?: string
  description?: string
  cards?: ValueCard[]
}

export interface HomePageData {
  siteSettings: SiteSettings
  hero: HeroSection
  credentials: CredentialsSection
  valueProposition: ValueProposition
  services: Service[]
  processSteps: ProcessStep[]
  caseStudies: CaseStudy[]
  testimonials: Testimonial[]
  faqs: Faq[]
}

export interface ApproachPoint {
  title?: string
  description?: string
  icon?: string
}

export interface AboutStorySection {
  title?: string
  content?: string
}

export interface AboutTimelineItem {
  period?: string
  title?: string
  description?: string
  order?: number
}

export interface AboutStat {
  value?: string
  suffix?: string
  label?: string
}

export interface AboutComparison {
  negativeTitle?: string
  negativeItems?: string[]
  positiveTitle?: string
  positiveItems?: string[]
}

export interface AboutPage {
  headline?: string
  subheadline?: string
  intro?: string
  heroBadgeValue?: string
  heroBadgeLabel?: string
  primaryCtaText?: string
  primaryCtaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  photo?: SanityImage
  photoUrl?: string
  philosophyHeadline?: string
  philosophyHighlight?: string
  philosophyParagraphs?: string[]
  storyHeadline?: string
  storySections?: AboutStorySection[]
  timeline?: AboutTimelineItem[]
  workStyleHeadline?: string
  workStyleSubheadline?: string
  approach?: ApproachPoint[]
  stats?: AboutStat[]
  comparisonHeadline?: string
  comparisons?: AboutComparison[]
  testimonialsHeadline?: string
  featuredTestimonials?: Testimonial[]
  ctaHeadline?: string
  ctaDescription?: string
  ctaText?: string
  ctaLink?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}
