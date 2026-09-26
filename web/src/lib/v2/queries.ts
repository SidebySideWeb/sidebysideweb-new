/** GROQ for the v2 (redesign) pages. */

const HEADING_LINES = `headingLines[]{parts[]{text, style}}`
const CTA = `{label, href, variant}`
const PAGE_HERO = `{eyebrow, ${HEADING_LINES}, lead}`
const SEO = `{title, description}`
const EMAIL = `"email": *[_id == "siteSettingsV2"][0].email`

const SERVICE_CARD = `{
  _id,
  title,
  "slug": slug.current,
  order,
  indexLabel,
  badge,
  shortDescription,
  description,
  bullets,
  metaLabel,
  metaNote,
  variant,
  category
}`

const CASE_CARD = `{
  _id,
  name,
  "slug": slug.current,
  kind,
  tag,
  sector,
  headline,
  short,
  artKey,
  isPlaceholder,
  order
}`

export const HOME_PAGE_QUERY = `*[_id == "homePage"][0]{
  hero{
    eyebrow,
    ${HEADING_LINES},
    swapPrefix,
    swapWords,
    swapSuffix,
    ctas[]${CTA},
    facts[]{value, suffix, highlightSuffix, label}
  },
  marqueeTop,
  marqueeBottom,
  manifesto{eyebrow, text},
  values[]{kicker, title, text, bigGlyph},
  servicesSection{
    eyebrow,
    heading,
    intro,
    services[]->{
      _id,
      title,
      "slug": slug.current,
      order,
      indexLabel,
      shortDescription,
      homeRowTitle,
      homeMetaShort,
      metaLabel,
      showOnHomeRows
    }
  },
  partnerBand{
    eyebrow,
    heading,
    headingHighlight,
    text,
    bullets[]{title, text},
    ctas[]${CTA}
  },
  processSection{eyebrow, heading, cta${CTA}},
  "processSteps": *[_type == "processStepV2"] | order(order asc){
    _id,
    number,
    title,
    durationLabel,
    summary,
    cardColour,
    chips,
    order
  },
  compareSection{
    eyebrow,
    heading,
    intro,
    rowsTitle,
    leftLabel,
    rightLabel,
    rows[]{question, typicalAnswer, ourAnswer}
  },
  featuredCasesSection{eyebrow, heading, intro, ctaLabel},
  featuredCases[]->${CASE_CARD},
  testimonialSection{
    eyebrow,
    testimonial->{quote, name, role, company, approved},
    placeholderQuote,
    placeholderAttribution
  },
  faq{eyebrow, heading, items[]{question, answer}},
  bigCta{eyebrow, ${HEADING_LINES}, ctas[]${CTA}, showEmail},
  seo${SEO},
  ${EMAIL}
}`

/** Services fall back to every `serviceV2` when the page lists none. */
export const SERVICES_PAGE_QUERY = `*[_id == "servicesPage"][0]{
  hero${PAGE_HERO},
  "services": select(
    count(services) > 0 => services[]->${SERVICE_CARD},
    *[_type == "serviceV2"] | order(order asc)${SERVICE_CARD}
  ),
  docsSection{eyebrow, heading, intro, docCards[]{code, title, text, audience}},
  techStack{eyebrow, heading, items},
  bigCta{eyebrow, ${HEADING_LINES}, ctas[]${CTA}, showEmail},
  seo${SEO},
  ${EMAIL}
}`

export const PROCESS_PAGE_QUERY = `*[_id == "processPage"][0]{
  hero${PAGE_HERO},
  "steps": select(
    count(steps) > 0 => steps[]->{
      _id, number, title, durationLabel, summary, description, deliverables, cardColour, chips, order
    },
    *[_type == "processStepV2"] | order(order asc){
      _id, number, title, durationLabel, summary, description, deliverables, cardColour, chips, order
    }
  ),
  rulesSection{eyebrow, heading, rules[]{kicker, title, text, bigGlyph}},
  bigCta{eyebrow, ${HEADING_LINES}, ctas[]${CTA}, showEmail},
  seo${SEO},
  ${EMAIL}
}`

export const WORK_PAGE_QUERY = `*[_id == "workPage"][0]{
  hero${PAGE_HERO},
  filterLabels{all, product, client},
  "cases": *[_type == "caseStudyV2"] | order(order asc)${CASE_CARD},
  seo${SEO}
}`

export const CASE_STUDY_QUERY = `*[_type == "caseStudyV2" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  kind,
  tag,
  sector,
  headline,
  short,
  role,
  duration,
  stack,
  problem,
  approach,
  solution,
  results[]{value, label},
  artKey,
  isPlaceholder,
  reviewNote,
  order,
  seo${SEO},
  "nextCase": coalesce(
    *[_type == "caseStudyV2" && order > ^.order] | order(order asc)[0]{name, "slug": slug.current},
    *[_type == "caseStudyV2"] | order(order asc)[0]{name, "slug": slug.current}
  )
}`

export const CASE_SLUGS_QUERY = `*[_type == "caseStudyV2" && defined(slug.current)] | order(order asc).slug.current`

export const ABOUT_PAGE_QUERY = `*[_id == "aboutPageV2"][0]{
  hero${PAGE_HERO},
  portrait{alt, "url": asset->url},
  portraitPlaceholder,
  bio,
  ctas[]${CTA},
  rolesSection{eyebrow, heading, intro, roles[]{title, text}},
  productsSection{eyebrow, heading, cases[]->${CASE_CARD}},
  seo${SEO}
}`

export const CONTACT_PAGE_QUERY = `*[_id == "contactPage"][0]{
  hero${PAGE_HERO},
  form{
    nameLabel,
    namePlaceholder,
    emailLabel,
    emailPlaceholder,
    companyLabel,
    companyPlaceholder,
    needLegend,
    budgetLegend,
    messageLabel,
    messagePlaceholder,
    submitLabel
  },
  needOptions[]{value, label},
  budgetOptions[]{value, label},
  privacyNote,
  successMessage,
  nextStepsTitle,
  nextSteps[]{title, text},
  directLabel,
  seo${SEO},
  ${EMAIL}
}`

const LINK_ITEM = `{label, href}`

export const SITE_SETTINGS_V2_QUERY = `*[_id == "siteSettingsV2"][0]{
  brandName,
  tagline,
  email,
  linkedInUrl,
  legalLine,
  primaryNav[]${LINK_ITEM},
  headerCta${CTA},
  footerTagline,
  footerSub,
  footerColumns[]{title, links[]${LINK_ITEM}},
  endorsedProducts[]${LINK_ITEM}
}`
