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

export interface CaseStudyMetric {
  label?: string
  value?: string
  comparison?: string
}

export interface CardStat {
  value?: string
  label?: string
}

export interface CaseStudyPhase {
  title?: string
  description?: string
  order?: number
}

export type CaseStudyCategory =
  | 'automation-workflows'
  | 'saas-mvp'
  | 'erp-integration'
  | 'crm-integration'
  | 'technical-project'

export interface CaseStudy {
  _id: string
  title?: string
  slug?: {current?: string}
  summary?: string
  category?: CaseStudyCategory
  order?: number
  featured?: boolean
  heroMainResult?: string
  featuredImage?: SanityImage
  featuredImageUrl?: string
  cardStats?: CardStat[]
  problem?: {
    title?: string
    description?: string
    impact?: string
    bullets?: string[]
    visualizationLabel?: string
  }
  solution?: {
    title?: string
    description?: unknown[]
    technologies?: string[]
    phases?: CaseStudyPhase[]
  }
  results?: {
    summary?: string
    metrics?: CaseStudyMetric[]
  }
  investment?: {
    amount?: string
    timeline?: string
    breakdown?: string
    roi?: string
  }
  testimonial?: {
    quote?: string
    author?: string
    role?: string
    company?: string
  }
  fullContent?: unknown[]
  relatedServices?: Service[]
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
