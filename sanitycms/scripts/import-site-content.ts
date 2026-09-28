/**
 * Import site copy from `content/sidebyside-site-content.json` into the
 * production dataset (patching existing v2 documents).
 *
 *   npx sanity exec scripts/import-site-content.ts --with-user-token -- --confirm production
 *
 * Preserves production LinkedIn / legalLine when the JSON still has [placeholders].
 * About fields that the live schema does not support yet (timeline, brands, etc.)
 * are skipped with a warning.
 */
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {getCliClient} from 'sanity/cli'

declare const process: {
  argv: string[]
  cwd(): string
  exit(code?: number): never
}

type Style = 'normal' | 'thin' | 'marigold'
type CtaTuple = [string, string, string]
type LineTuple = [string, string]

const argv = process.argv.slice(2)
const confirmed =
  argv.includes('--confirm') && argv[argv.indexOf('--confirm') + 1] === 'production'

if (!confirmed) {
  console.error('Refusing to write production. Pass: --confirm production')
  process.exit(1)
}

const client = getCliClient({apiVersion: '2025-01-01', dataset: 'production'})

const SERVICE_IDS: Record<string, string> = {
  discovery: 'serviceV2-discovery',
  architektoniki: 'serviceV2-architecture',
  ylopoiisi: 'serviceV2-build',
  'fractional-cto': 'serviceV2-cto',
  symvouleftiki: 'serviceV2-consulting',
  ypostirixi: 'serviceV2-support',
  'analysi-tekmiriosi': 'serviceV2-docs',
  'project-product-management': 'serviceV2-pm',
  agencies: 'serviceV2-agency',
}

/** Stable IDs for case studies. New client cases replace old erp/b2b placeholders. */
const CASE_IDS: Record<string, string> = {
  'nea-attiki-odos': 'caseStudyV2-nea-attiki-odos',
  metaixmio: 'caseStudyV2-metaixmio',
  kollekta: 'caseStudyV2-kollekta',
  ftiaxesite: 'caseStudyV2-ftiaxesite',
  'audit-tool': 'caseStudyV2-audit',
}

const LEGACY_CASE_IDS = ['caseStudyV2-erp', 'caseStudyV2-b2b']

const NAV_HREFS: Record<string, string> = {
  Υπηρεσίες: '/ypiresies',
  'Πώς δουλεύω': '/pos-doulevo',
  Έργα: '/erga',
  'Ποιος είμαι': '/poios-eimai',
  Επικοινωνία: '/epikoinonia',
}

function keyer() {
  let n = 0
  return () => `k${(n++).toString(36)}`
}

function withKeys(value: unknown, nextKey: () => string, inArray = false): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => withKeys(item, nextKey, true))
  }
  if (value && typeof value === 'object') {
    const source = value as Record<string, unknown>
    const result: Record<string, unknown> = {}
    for (const [field, fieldValue] of Object.entries(source)) {
      result[field] = withKeys(fieldValue, nextKey)
    }
    if (inArray && !result._key) result._key = nextKey()
    return result
  }
  return value
}

function isPlaceholder(value: unknown): boolean {
  return typeof value === 'string' && (value.includes('[') || !value.trim())
}

function ref(id: string) {
  return {_type: 'reference', _ref: id}
}

function normalizeStyle(raw?: string): Style {
  if (raw === 'thin') return 'thin'
  if (raw === 'marigold' || raw === 'marigold-last') return 'marigold'
  return 'normal'
}

function headingLinesFromTuples(lines: LineTuple[] | undefined) {
  return (lines ?? []).map(([text, style]) => ({
    _type: 'headingLine',
    parts: [{_type: 'headingLinePart', text, style: normalizeStyle(style)}],
  }))
}

function ctaFromTuple([label, variant, href]: CtaTuple) {
  return {_type: 'cta', label, href, variant: variant === 'g' ? 'g' : 'm'}
}

function seo(data?: {title?: string; description?: string}) {
  if (!data) return undefined
  return {_type: 'seo', title: data.title, description: data.description}
}

function option(label: string) {
  const value = label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return {_type: 'formOption', value: value || label, label}
}

/** Parse `~~struck~~` markers into portable-text spans. */
function richFromMarkdownish(text: string) {
  const children: Array<{_type: 'span'; text: string; marks: string[]}> = []
  const re = /~~([^~]+)~~/g
  let last = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(text))) {
    if (match.index > last) {
      children.push({_type: 'span', text: text.slice(last, match.index), marks: []})
    }
    children.push({_type: 'span', text: match[1], marks: ['strike']})
    last = match.index + match[0].length
  }
  if (last < text.length) {
    children.push({_type: 'span', text: text.slice(last), marks: []})
  }
  if (!children.length) {
    children.push({_type: 'span', text, marks: []})
  }
  return {
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children,
  }
}

function paragraphsToRich(paragraphs: string[]) {
  return paragraphs.map((p) => ({
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', text: p, marks: []}],
  }))
}

function stackToArray(stack: string | undefined) {
  if (!stack) return []
  return stack
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function indexLabel(order: number) {
  return String(order).padStart(2, '0')
}

function loadJson() {
  // Prefer repo reference/ (PROMPT source of truth), fall back to sanitycms/content/.
  const candidates = [
    join(process.cwd(), '..', 'reference', 'site-content.json'),
    join(process.cwd(), 'content', 'sidebyside-site-content.json'),
  ]
  for (const path of candidates) {
    try {
      return JSON.parse(readFileSync(path, 'utf8')) as Record<string, any>
    } catch {
      /* try next */
    }
  }
  throw new Error(`site-content.json not found in:\n${candidates.join('\n')}`)
}

function buildDocuments(data: Record<string, any>, existingSettings: Record<string, any>) {
  const warnings: string[] = []
  const docs: Array<Record<string, unknown> & {_id: string; _type: string}> = []

  // ---- services ----
  for (const service of data.services ?? []) {
    const id = SERVICE_IDS[service.slug]
    if (!id) {
      warnings.push(`Unknown service slug: ${service.slug}`)
      continue
    }
    docs.push({
      _id: id,
      _type: 'serviceV2',
      title: service.title,
      slug: {_type: 'slug', current: service.slug},
      order: service.order,
      indexLabel: indexLabel(service.order),
      badge: service.badge,
      shortDescription: service.short,
      description: service.description,
      homeRowTitle: service.title,
      homeMetaShort: service.meta,
      bullets: service.bullets ?? [],
      metaLabel: service.meta,
      metaNote: service.note,
      variant: service.variant ?? 'default',
      category: service.category ?? 'core',
      showOnHomeRows: service.category !== 'docs' || service.slug === 'analysi-tekmiriosi',
    })
  }

  // Home shows core + docs + pm + agency (not consulting alone as separate row if desired).
  // Match previous: discovery, architecture, build, cto, support, docs, pm, agency
  for (const doc of docs) {
    if (doc._type !== 'serviceV2') continue
    const slug = (doc.slug as {current?: string})?.current
    doc.showOnHomeRows = slug !== 'symvouleftiki'
  }

  // ---- process steps ----
  ;(data.processPage?.steps ?? []).forEach((step: any, i: number) => {
    docs.push({
      _id: `processStepV2-0${i + 1}`,
      _type: 'processStepV2',
      number: step.n,
      title: step.title,
      durationLabel: step.duration,
      summary: step.summary,
      description: step.description,
      deliverables: step.deliverables ?? [],
      cardColour: step.color ?? 'ink',
      chips: step.chips ?? [],
      order: i + 1,
    })
  })

  // ---- case studies ----
  ;(data.caseStudies ?? []).forEach((study: any, i: number) => {
    const id = CASE_IDS[study.slug]
    if (!id) {
      warnings.push(`Unknown case slug: ${study.slug}`)
      return
    }
    docs.push({
      _id: id,
      _type: 'caseStudyV2',
      name: study.name,
      slug: {_type: 'slug', current: study.slug},
      kind: study.kind,
      tag: study.tag,
      sector: study.sector,
      headline: study.headline,
      short: study.short,
      role: study.role,
      duration: study.duration,
      stack: stackToArray(study.stack),
      problem: study.problem,
      approach: study.approach,
      solution: study.solution,
      results: (study.results ?? []).map(([value, label]: [string, string]) => ({
        _type: 'resultStat',
        value,
        label,
      })),
      artKey: study.art ?? 'site',
      isPlaceholder: Boolean(study.reviewNote && String(study.reviewNote).includes('[')),
      reviewNote: study.reviewNote || undefined,
      order: i + 1,
      seo: {
        _type: 'seo',
        title: `${study.name} · Side by Side`,
        description: study.short,
      },
    })
  })

  // ---- testimonial placeholder ----
  const who = data.homePage?.testimonial?.who ?? '[Όνομα] · [Ρόλος] · [Εταιρεία]'
  const whoParts = who.split('·').map((s: string) => s.trim())
  docs.push({
    _id: 'testimonialV2-placeholder',
    _type: 'testimonialV2',
    quote: (data.homePage?.testimonial?.quote ?? '').replace(/^\[|\]$/g, ''),
    name: whoParts[0] || '[Όνομα]',
    role: whoParts[1] || '[Ρόλος]',
    company: whoParts[2] || '[Εταιρεία]',
    approved: false,
  })

  // ---- site settings ----
  const settings = data.siteSettings ?? {}
  const linkedIn = isPlaceholder(settings.linkedin)
    ? existingSettings.linkedInUrl
    : settings.linkedin
  const legalLine = isPlaceholder(settings.legalLine)
    ? existingSettings.legalLine
    : settings.legalLine

  docs.push({
    _id: 'siteSettingsV2',
    _type: 'siteSettingsV2',
    brandName: settings.brandName,
    tagline: settings.tagline,
    email: settings.email,
    linkedInUrl: linkedIn,
    legalLine,
    primaryNav: (settings.nav ?? []).map((label: string) => ({
      _type: 'linkItem',
      label,
      href: NAV_HREFS[label] ?? '/',
    })),
    headerCta: {
      _type: 'cta',
      label: settings.headerCta,
      href: '/epikoinonia',
      variant: 'm',
    },
    footerTagline: settings.footer?.tagline ?? settings.tagline,
    footerSub: settings.footer?.sub,
    footerColumns: [
      {
        _type: 'footerColumn',
        title: 'Σελίδες',
        links: (settings.nav ?? []).map((label: string) => ({
          _type: 'linkItem',
          label,
          href: NAV_HREFS[label] ?? '/',
        })),
      },
      {
        _type: 'footerColumn',
        title: 'Προϊόντα',
        links: [
          {_type: 'linkItem', label: 'kollekta.gr', href: '/erga/kollekta'},
          {_type: 'linkItem', label: 'ftiaxesite.gr', href: '/erga/ftiaxesite'},
          {_type: 'linkItem', label: 'Audit tool', href: '/erga/audit-tool'},
        ],
      },
      {
        _type: 'footerColumn',
        title: 'Επαφή',
        links: [
          {_type: 'linkItem', label: settings.email, href: `mailto:${settings.email}`},
          {_type: 'linkItem', label: 'LinkedIn', href: linkedIn},
        ],
      },
    ],
    endorsedProducts: [
      {_type: 'linkItem', label: 'kollekta.gr', href: '/erga/kollekta'},
      {_type: 'linkItem', label: 'ftiaxesite.gr', href: '/erga/ftiaxesite'},
      {_type: 'linkItem', label: 'Audit tool', href: '/erga/audit-tool'},
    ],
    defaultSeo: seo(settings.defaultSeo),
  })

  // ---- home page ----
  const home = data.homePage ?? {}
  const homeServiceIds = [
    'serviceV2-discovery',
    'serviceV2-architecture',
    'serviceV2-build',
    'serviceV2-cto',
    'serviceV2-support',
    'serviceV2-docs',
    'serviceV2-pm',
    'serviceV2-agency',
  ]
  const featuredCaseIds = (home.casesSection?.featured ?? []).map(
    (slug: string) => CASE_IDS[slug] ?? `caseStudyV2-${slug}`,
  )

  docs.push({
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      eyebrow: home.hero?.eyebrow,
      headingLines: headingLinesFromTuples(home.hero?.headingLines),
      swapPrefix: home.hero?.swapPrefix,
      swapWords: home.hero?.swapWords,
      swapSuffix: home.hero?.swapSuffix,
      ctas: (home.hero?.ctas ?? []).map(ctaFromTuple),
      facts: (home.hero?.facts ?? []).map((f: any) => ({
        _type: 'fact',
        value: String(f.value),
        suffix: f.suffix || undefined,
        highlightSuffix: Boolean(f.suffix),
        label: f.label,
      })),
    },
    marqueeTop: home.marqueeTop,
    marqueeBottom: home.marqueeBottom,
    manifesto: {
      eyebrow: home.manifesto?.eyebrow,
      text: [richFromMarkdownish(home.manifesto?.text ?? '')],
    },
    values: (home.values ?? []).map((v: any) => ({
      _type: 'valueCard',
      kicker: v.kicker,
      title: v.title,
      text: v.text,
      bigGlyph: v.glyph,
    })),
    servicesSection: {
      eyebrow: home.servicesSection?.eyebrow,
      heading: home.servicesSection?.heading,
      intro: home.servicesSection?.intro,
      services: homeServiceIds.map(ref),
    },
    partnerBand: {
      eyebrow: home.partnerBand?.eyebrow,
      heading: home.partnerBand?.heading,
      headingHighlight: home.partnerBand?.headingHighlight,
      text: home.partnerBand?.text,
      bullets: (home.partnerBand?.bullets ?? []).map(([title, text]: [string, string]) => ({
        _type: 'bulletItem',
        title,
        text,
      })),
      ctas: (home.partnerBand?.ctas ?? []).map(ctaFromTuple),
    },
    processSection: {
      eyebrow: home.processSection?.eyebrow,
      heading: home.processSection?.heading,
      cta: {
        _type: 'cta',
        label: home.processSection?.cta ?? 'Όλη η διαδικασία',
        href: '/pos-doulevo',
        variant: 'g',
      },
    },
    compareSection: {
      eyebrow: home.compareSection?.eyebrow,
      heading: home.compareSection?.heading,
      intro: home.compareSection?.intro,
      rowsTitle: home.compareSection?.title,
      leftLabel: home.compareSection?.leftLabel,
      rightLabel: home.compareSection?.rightLabel,
      rows: (home.compareSection?.rows ?? []).map(
        ([question, typicalAnswer, ourAnswer]: [string, string, string]) => ({
          _type: 'compareRow',
          question,
          typicalAnswer,
          ourAnswer,
        }),
      ),
    },
    featuredCasesSection: {
      eyebrow: home.casesSection?.eyebrow,
      heading: home.casesSection?.heading,
      intro: home.casesSection?.intro,
      ctaLabel: home.casesSection?.cta,
    },
    featuredCases: featuredCaseIds.map(ref),
    testimonialSection: {
      eyebrow: home.testimonial?.eyebrow,
      testimonial: ref('testimonialV2-placeholder'),
      placeholderQuote: home.testimonial?.quote,
      placeholderAttribution: home.testimonial?.who,
    },
    faq: {
      eyebrow: home.faq?.eyebrow,
      heading: home.faq?.heading,
      items: (home.faq?.items ?? []).map(([question, answer]: [string, string]) => ({
        _type: 'faqItem',
        question,
        answer,
      })),
    },
    bigCta: {
      _type: 'bigCta',
      eyebrow: home.bigCta?.eyebrow,
      headingLines: headingLinesFromTuples([
        [home.bigCta?.line1 ?? '', 'normal'],
        [home.bigCta?.line2 ?? '', 'marigold'],
      ]),
      ctas: [
        {
          _type: 'cta',
          label: home.bigCta?.cta ?? 'Κλείσε discovery call',
          href: '/epikoinonia',
          variant: 'm',
        },
      ],
      showEmail: true,
    },
    seo: seo(home.seo),
  })

  // ---- services page ----
  const sp = data.servicesPage ?? {}
  docs.push({
    _id: 'servicesPage',
    _type: 'servicesPage',
    hero: {
      _type: 'pageHero',
      eyebrow: sp.hero?.eyebrow,
      headingLines: headingLinesFromTuples(sp.hero?.headingLines),
      lead: sp.hero?.lead,
    },
    services: Object.values(SERVICE_IDS).map(ref),
    docsSection: {
      eyebrow: sp.docsSection?.eyebrow,
      heading: sp.docsSection?.heading,
      intro: sp.docsSection?.intro,
      docCards: (sp.docsSection?.cards ?? []).map(
        ([code, title, text, audience]: [string, string, string, string]) => ({
          _type: 'docCard',
          code,
          title,
          text,
          audience,
        }),
      ),
    },
    techStack: {
      eyebrow: sp.techStack?.eyebrow,
      heading: sp.techStack?.heading,
      items: sp.techStack?.items ?? [],
    },
    bigCta: {
      _type: 'bigCta',
      headingLines: headingLinesFromTuples([
        [sp.bigCta?.line1 ?? '', 'normal'],
        [sp.bigCta?.line2 ?? '', 'marigold'],
      ]),
      ctas: [
        {
          _type: 'cta',
          label: sp.bigCta?.cta ?? 'Πες μου το πρόβλημα',
          href: '/epikoinonia',
          variant: 'm',
        },
      ],
      showEmail: false,
    },
    seo: seo(sp.seo),
  })

  // ---- process page ----
  const pp = data.processPage ?? {}
  docs.push({
    _id: 'processPage',
    _type: 'processPage',
    hero: {
      _type: 'pageHero',
      eyebrow: pp.hero?.eyebrow,
      headingLines: headingLinesFromTuples(pp.hero?.headingLines),
      lead: pp.hero?.lead,
    },
    steps: [
      ref('processStepV2-01'),
      ref('processStepV2-02'),
      ref('processStepV2-03'),
      ref('processStepV2-04'),
    ],
    rulesSection: {
      eyebrow: pp.rules?.eyebrow,
      heading: pp.rules?.heading,
      rules: (pp.rules?.items ?? []).map(([kicker, title, text]: [string, string, string]) => ({
        _type: 'valueCard',
        kicker,
        title,
        text,
        bigGlyph: '✕',
      })),
    },
    bigCta: {
      _type: 'bigCta',
      headingLines: headingLinesFromTuples([
        [pp.bigCta?.line1 ?? '', 'normal'],
        [pp.bigCta?.line2 ?? '', 'marigold'],
      ]),
      ctas: [
        {
          _type: 'cta',
          label: pp.bigCta?.cta ?? 'Κλείσε discovery call',
          href: '/epikoinonia',
          variant: 'm',
        },
      ],
      showEmail: false,
    },
    seo: seo(pp.seo),
  })

  // ---- work page ----
  const wp = data.workPage ?? {}
  const filters: string[] = wp.filters ?? []
  docs.push({
    _id: 'workPage',
    _type: 'workPage',
    hero: {
      _type: 'pageHero',
      eyebrow: wp.hero?.eyebrow,
      headingLines: headingLinesFromTuples(wp.hero?.headingLines),
      lead: wp.hero?.lead,
    },
    filterLabels: {
      all: filters[0] ?? 'Όλα',
      client: filters[1] ?? 'Έργα πελατών',
      product: filters[2] ?? 'Δικά μου προϊόντα',
    },
    seo: seo(wp.seo),
  })

  // ---- about page ----
  const about = data.aboutPage ?? {}
  const bioBlocks = paragraphsToRich(about.bio ?? [])
  // First bio paragraph: bold the opening sentence (matches prototype).
  if (bioBlocks[0]?.children?.[0]?.text) {
    const text = bioBlocks[0].children[0].text as string
    const dot = text.indexOf('. ')
    if (dot > 0) {
      bioBlocks[0].children = [
        {_type: 'span', text: text.slice(0, dot + 1), marks: ['strong']},
        {_type: 'span', text: text.slice(dot + 1), marks: []},
      ]
    }
  }

  docs.push({
    _id: 'aboutPageV2',
    _type: 'aboutPageV2',
    hero: {
      _type: 'pageHero',
      eyebrow: about.hero?.eyebrow,
      headingLines: headingLinesFromTuples(about.hero?.headingLines),
      lead: about.hero?.lead,
    },
    personName: about.name,
    personRole: about.role,
    portraitPlaceholder: about.portraitNote,
    bio: bioBlocks,
    ctas: (about.ctas ?? []).map(ctaFromTuple),
    numbers: (about.numbers ?? []).map(([value, label]: [string, string]) => ({
      _type: 'aboutNumberV2',
      value,
      label,
    })),
    rolesSection: {
      eyebrow: about.pillars?.eyebrow,
      heading: about.pillars?.heading,
      intro: about.pillars?.intro,
      roles: (about.pillars?.items ?? []).map((item: any, i: number) => ({
        _type: 'aboutPillar',
        indexLabel: String(i + 1).padStart(2, '0'),
        title: item.title,
        text: item.text,
        proof: item.proof,
      })),
    },
    sectorsSection: {
      eyebrow: about.sectors?.eyebrow,
      heading: about.sectors?.heading,
      items: about.sectors?.items ?? [],
    },
    brandsSection: {
      eyebrow: about.brands?.eyebrow,
      heading: about.brands?.heading,
      note: about.brands?.note,
      items: about.brands?.items ?? [],
    },
    timelineSection: {
      eyebrow: about.timeline?.eyebrow,
      heading: about.timeline?.heading,
      items: (about.timeline?.items ?? []).map(
        ([period, title, text]: [string, string, string]) => ({
          _type: 'aboutCareerItem',
          period,
          title,
          text,
        }),
      ),
    },
    education: (about.education ?? []).map(([label, text]: [string, string]) => ({
      _type: 'aboutEduItem',
      label,
      text,
    })),
    tools: about.tools ?? [],
    languages: about.languages ?? [],
    productsSection: {
      eyebrow: about.productsSection?.eyebrow,
      heading: about.productsSection?.heading,
      cases: (about.productsSection?.items ?? [])
        .map((slug: string) => CASE_IDS[slug])
        .filter(Boolean)
        .map(ref),
    },
    seo: seo(about.seo),
  })

  // ---- contact page ----
  const contact = data.contactPage ?? {}
  docs.push({
    _id: 'contactPage',
    _type: 'contactPage',
    hero: {
      _type: 'pageHero',
      eyebrow: contact.hero?.eyebrow,
      headingLines: headingLinesFromTuples(contact.hero?.headingLines),
      lead: contact.hero?.lead,
    },
    form: {
      nameLabel: contact.form?.name?.[0],
      namePlaceholder: contact.form?.name?.[1],
      emailLabel: contact.form?.email?.[0],
      emailPlaceholder: contact.form?.email?.[1],
      companyLabel: contact.form?.company?.[0],
      companyPlaceholder: contact.form?.company?.[1],
      needLegend: contact.form?.needsLabel,
      budgetLegend: contact.form?.budgetLabel,
      messageLabel: contact.form?.message?.[0],
      messagePlaceholder: contact.form?.message?.[1],
      submitLabel: contact.form?.submit,
    },
    needOptions: (contact.needOptions ?? []).map(option),
    budgetOptions: (contact.budgetOptions ?? []).map(option),
    privacyNote: contact.form?.privacy,
    successMessage: contact.form?.success,
    nextStepsTitle: contact.nextSteps?.title,
    nextSteps: (contact.nextSteps?.items ?? []).map(([title, text]: [string, string]) => ({
      _type: 'bulletItem',
      title,
      text,
    })),
    directLabel: contact.direct,
    seo: seo(contact.seo),
  })

  return {docs, warnings}
}

async function run() {
  const data = loadJson()
  const existingSettings =
    (await client.fetch('*[_id == "siteSettingsV2"][0]{linkedInUrl,legalLine}')) ?? {}

  const {docs, warnings} = buildDocuments(data, existingSettings)
  const prepared = docs.map(
    (doc) => withKeys(doc, keyer()) as Record<string, unknown> & {_id: string; _type: string},
  )

  console.log(`Importing ${prepared.length} documents into production…`)
  for (const w of warnings) console.warn(`  ! ${w}`)

  const tx = client.transaction()
  for (const doc of prepared) {
    tx.createOrReplace(doc)
  }
  for (const id of LEGACY_CASE_IDS) {
    tx.delete(id)
  }

  await tx.commit({visibility: 'async'})

  console.log(`Done. Replaced ${prepared.length} docs, deleted legacy: ${LEGACY_CASE_IDS.join(', ')}`)
  for (const doc of prepared) console.log(`  ~ ${doc._id}`)
}

run().catch((error) => {
  console.error('Import failed:', error.message ?? error)
  process.exit(1)
})
