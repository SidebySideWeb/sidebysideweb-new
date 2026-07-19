const SANITY_IMAGE = `{
  asset->{
    _id,
    url,
    metadata{
      dimensions,
      lqip
    }
  },
  alt
}`

const CASE_STUDY_FIELDS = `
  _id,
  title,
  slug,
  summary,
  category,
  order,
  featured,
  heroMainResult,
  featuredImageUrl,
  featuredImage ${SANITY_IMAGE},
  cardStats[]{value, label},
  problem{
    title,
    description,
    impact,
    bullets,
    visualizationLabel
  },
  solution{
    title,
    description,
    technologies,
    phases[]{title, description, order}
  },
  results{
    summary,
    metrics[]{label, value, comparison}
  },
  investment{
    amount,
    timeline,
    breakdown,
    roi
  },
  testimonial{
    quote,
    author,
    role,
    company
  },
  fullContent,
  relatedServices[]->{
    _id,
    title,
    slug,
    description,
    icon,
    order
  },
  seo{
    metaTitle,
    metaDescription
  }
`

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  description,
  primaryColor,
  accentColor,
  contactEmail,
  contactPhone,
  contactAddress
}`

export const HERO_SECTION_QUERY = `*[_type == "heroSection"][0]{
  headline,
  subheading,
  ctaText,
  ctaLink,
  trustSignals,
  heroImageUrl,
  heroImage ${SANITY_IMAGE}
}`

export const CREDENTIALS_QUERY = `*[_type == "credentialsSection"][0]{
  headline,
  credentials[]{
    stat,
    label,
    description,
    icon
  }
}`

export const VALUE_PROPOSITION_QUERY = `*[_type == "valueProposition"][0]{
  headline,
  description,
  cards
}`

export const SERVICES_QUERY = `*[_type == "service"] | order(order asc){
  _id,
  title,
  slug,
  description,
  icon,
  priceLabel,
  duration,
  whatIncluded,
  order
}`

export const PROCESS_STEPS_QUERY = `*[_type == "processStep"] | order(stepNumber asc){
  _id,
  stepNumber,
  title,
  description,
  icon
}`

export const FEATURED_CASE_STUDIES_QUERY = `*[_type == "caseStudy" && featured == true] | order(order asc){
  ${CASE_STUDY_FIELDS}
}`

export const ALL_CASE_STUDIES_QUERY = `*[_type == "caseStudy"] | order(order asc){
  ${CASE_STUDY_FIELDS}
}`

export const RELATED_CASE_STUDIES_QUERY = `*[_type == "caseStudy" && slug.current != $slug] | order(order asc)[0...3]{
  ${CASE_STUDY_FIELDS}
}`

export const CASE_STUDY_BY_SLUG_QUERY = `*[_type == "caseStudy" && slug.current == $slug][0]{
  ${CASE_STUDY_FIELDS}
}`

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"]{
  _id,
  quote,
  author,
  role,
  company,
  rating
}`

export const FAQS_QUERY = `*[_type == "faq"] | order(order asc){
  _id,
  question,
  answer,
  order,
  category
}`

export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]{
  headline,
  subheadline,
  intro,
  heroBadgeValue,
  heroBadgeLabel,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  photoUrl,
  photo {
    asset->{
      _id,
      url,
      metadata{
        dimensions,
        lqip
      }
    },
    alt
  },
  philosophyHeadline,
  philosophyHighlight,
  philosophyParagraphs,
  storySections[]{title, content},
  timeline[]{period, title, description, order},
  workStyleHeadline,
  workStyleSubheadline,
  approach[]{title, description, icon},
  stats[]{value, suffix, label},
  comparisonHeadline,
  comparisons[]{
    negativeTitle,
    negativeItems,
    positiveTitle,
    positiveItems
  },
  testimonialsHeadline,
  featuredTestimonials[]->{
    _id,
    quote,
    author,
    role,
    company,
    rating
  },
  ctaHeadline,
  ctaDescription,
  ctaText,
  ctaLink,
  seo{
    metaTitle,
    metaDescription
  }
}`
