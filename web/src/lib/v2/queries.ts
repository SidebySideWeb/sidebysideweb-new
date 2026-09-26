/** GROQ for the v2 (redesign) pages. */

const HEADING_LINES = `headingLines[]{parts[]{text, style}}`
const CTA = `{label, href, variant}`

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
  featuredCases[]->{
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
  },
  testimonialSection{
    eyebrow,
    testimonial->{quote, name, role, company, approved},
    placeholderQuote,
    placeholderAttribution
  },
  faq{eyebrow, heading, items[]{question, answer}},
  bigCta{eyebrow, ${HEADING_LINES}, ctas[]${CTA}, showEmail},
  seo{title, description},
  "email": *[_id == "siteSettingsV2"][0].email
}`
