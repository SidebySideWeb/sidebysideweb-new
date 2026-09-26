/** Types for the v2 (redesign) content model. Mirrors the `v2` Sanity schema types. */

export type HeadingStyle = 'normal' | 'thin' | 'marigold'

export interface HeadingLinePart {
  text: string
  style?: HeadingStyle
}

export interface HeadingLine {
  parts: HeadingLinePart[]
}

export type CtaVariant = 'm' | 'g' | 'p' | 'i'

export interface Cta {
  label: string
  href: string
  variant?: CtaVariant
}

export interface Fact {
  value: string
  suffix?: string
  highlightSuffix?: boolean
  label: string
}

export interface ValueCard {
  kicker?: string
  title: string
  text?: string
  bigGlyph?: string
}

export interface BulletItem {
  title: string
  text?: string
}

export interface CompareRow {
  question: string
  typicalAnswer: string
  ourAnswer: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ResultStat {
  value: string
  label: string
}

export interface BigCtaBlock {
  eyebrow?: string
  headingLines: HeadingLine[]
  ctas?: Cta[]
  showEmail?: boolean
}

export interface SeoBlock {
  title?: string
  description?: string
}

export interface PageHeroBlock {
  eyebrow?: string
  headingLines?: HeadingLine[]
  lead?: string
}

export interface DocCard {
  code: string
  title: string
  text?: string
  audience?: string
}

export interface FormOption {
  value: string
  label: string
}

/* ---------------------------------------------------------------- rich text */

export interface PortableTextSpan {
  _type: 'span'
  _key?: string
  text: string
  marks?: string[]
}

export interface PortableTextMarkDef {
  _key: string
  _type: string
  href?: string
  blank?: boolean
}

export interface PortableTextBlock {
  _type: 'block'
  _key?: string
  style?: string
  listItem?: 'bullet'
  level?: number
  markDefs?: PortableTextMarkDef[]
  children?: PortableTextSpan[]
}

export type RichText = PortableTextBlock[]

/* ---------------------------------------------------------------- documents */

export type ServiceCardVariant = 'default' | 'featured' | 'wide'
export type ServiceCategory = 'core' | 'docs' | 'pm' | 'agency'

export interface ServiceV2 {
  _id: string
  title: string
  slug?: string
  order?: number
  indexLabel?: string
  badge?: string
  shortDescription?: string
  description?: string
  homeRowTitle?: string
  homeMetaShort?: string
  bullets?: string[]
  metaLabel?: string
  metaNote?: string
  variant?: ServiceCardVariant
  category?: ServiceCategory
  showOnHomeRows?: boolean
}

export type StepColour = 'ink' | 'paper' | 'marigold' | 'ink2'

export interface ProcessStepV2 {
  _id: string
  number: string
  title: string
  durationLabel?: string
  summary?: string
  description?: string
  deliverables?: string[]
  cardColour?: StepColour
  chips?: string[]
  order?: number
}

export type CaseArtKey = 'kollekta' | 'site' | 'audit' | 'erp' | 'b2b'

export interface CaseStudyV2 {
  _id: string
  name: string
  slug?: string
  kind?: 'product' | 'client'
  tag?: string
  sector?: string
  headline: string
  short?: string
  role?: string
  duration?: string
  stack?: string[]
  problem?: string
  approach?: string
  solution?: string
  results?: ResultStat[]
  artKey?: CaseArtKey
  isPlaceholder?: boolean
  reviewNote?: string
  order?: number
}

export interface TestimonialV2 {
  quote: string
  name?: string
  role?: string
  company?: string
  approved?: boolean
}

/* ---------------------------------------------------------------- home page */

export interface HomeHero {
  eyebrow?: string
  headingLines?: HeadingLine[]
  swapPrefix?: string
  swapWords?: string[]
  swapSuffix?: string
  ctas?: Cta[]
  facts?: Fact[]
}

export interface HomeManifesto {
  eyebrow?: string
  text?: RichText
}

export interface HomeServicesSection {
  eyebrow?: string
  heading?: string
  intro?: string
  services?: ServiceV2[]
}

export interface HomePartnerBand {
  eyebrow?: string
  heading?: string
  headingHighlight?: string
  text?: string
  bullets?: BulletItem[]
  ctas?: Cta[]
}

export interface HomeProcessSection {
  eyebrow?: string
  heading?: string
  cta?: Cta
}

export interface HomeCompareSection {
  eyebrow?: string
  heading?: string
  intro?: string
  rowsTitle?: string
  leftLabel?: string
  rightLabel?: string
  rows?: CompareRow[]
}

export interface HomeFeaturedCasesSection {
  eyebrow?: string
  heading?: string
  intro?: string
  ctaLabel?: string
}

export interface HomeTestimonialSection {
  eyebrow?: string
  testimonial?: TestimonialV2 | null
  placeholderQuote?: string
  placeholderAttribution?: string
}

export interface HomeFaq {
  eyebrow?: string
  heading?: string
  items?: FaqItem[]
}

export interface HomePage {
  hero?: HomeHero
  marqueeTop?: string[]
  marqueeBottom?: string[]
  manifesto?: HomeManifesto
  values?: ValueCard[]
  servicesSection?: HomeServicesSection
  partnerBand?: HomePartnerBand
  processSection?: HomeProcessSection
  processSteps?: ProcessStepV2[]
  compareSection?: HomeCompareSection
  featuredCasesSection?: HomeFeaturedCasesSection
  featuredCases?: CaseStudyV2[]
  testimonialSection?: HomeTestimonialSection
  faq?: HomeFaq
  bigCta?: BigCtaBlock
  seo?: SeoBlock
  email?: string
}

/* --------------------------------------------------------- services page */

export interface ServicesDocsSection {
  eyebrow?: string
  heading?: string
  intro?: string
  docCards?: DocCard[]
}

export interface ServicesTechStack {
  eyebrow?: string
  heading?: string
  items?: string[]
}

export interface ServicesPage {
  hero?: PageHeroBlock
  services?: ServiceV2[]
  docsSection?: ServicesDocsSection
  techStack?: ServicesTechStack
  bigCta?: BigCtaBlock
  seo?: SeoBlock
  email?: string
}

/* ---------------------------------------------------------- process page */

export interface ProcessRulesSection {
  eyebrow?: string
  heading?: string
  rules?: ValueCard[]
}

export interface ProcessPage {
  hero?: PageHeroBlock
  steps?: ProcessStepV2[]
  rulesSection?: ProcessRulesSection
  bigCta?: BigCtaBlock
  seo?: SeoBlock
  email?: string
}

/* ------------------------------------------------------------- work page */

export interface WorkFilterLabels {
  all?: string
  product?: string
  client?: string
}

export interface WorkPage {
  hero?: PageHeroBlock
  filterLabels?: WorkFilterLabels
  cases?: CaseStudyV2[]
  seo?: SeoBlock
}

/** A case study with the neighbour the detail page links on to. */
export interface CaseStudyPage extends CaseStudyV2 {
  seo?: SeoBlock
  nextCase?: Pick<CaseStudyV2, 'name' | 'slug'> | null
}

/* ------------------------------------------------------------ about page */

export interface AboutPortrait {
  url?: string
  alt?: string
}

export interface AboutRolesSection {
  eyebrow?: string
  heading?: string
  intro?: string
  roles?: BulletItem[]
}

export interface AboutProductsSection {
  eyebrow?: string
  heading?: string
  cases?: CaseStudyV2[]
}

export interface AboutPage {
  hero?: PageHeroBlock
  portrait?: AboutPortrait | null
  portraitPlaceholder?: string
  bio?: RichText
  ctas?: Cta[]
  rolesSection?: AboutRolesSection
  productsSection?: AboutProductsSection
  seo?: SeoBlock
}

/* ---------------------------------------------------------- contact page */

export interface ContactFormLabels {
  nameLabel?: string
  namePlaceholder?: string
  emailLabel?: string
  emailPlaceholder?: string
  companyLabel?: string
  companyPlaceholder?: string
  needLegend?: string
  budgetLegend?: string
  messageLabel?: string
  messagePlaceholder?: string
  submitLabel?: string
}

export interface ContactPage {
  hero?: PageHeroBlock
  form?: ContactFormLabels
  needOptions?: FormOption[]
  budgetOptions?: FormOption[]
  privacyNote?: string
  successMessage?: string
  nextStepsTitle?: string
  nextSteps?: BulletItem[]
  directLabel?: string
  seo?: SeoBlock
  email?: string
}

/* ---------------------------------------------------------- site settings */

export interface LinkItem {
  label: string
  href: string
}

export interface FooterColumn {
  title: string
  links?: LinkItem[]
}

export interface SiteSettingsV2 {
  brandName?: string
  tagline?: string
  email?: string
  linkedInUrl?: string
  legalLine?: string
  primaryNav?: LinkItem[]
  headerCta?: Cta
  footerTagline?: string
  footerSub?: string
  footerColumns?: FooterColumn[]
  endorsedProducts?: LinkItem[]
}
