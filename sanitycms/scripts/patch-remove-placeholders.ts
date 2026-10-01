/**
 * Remove all [bracket] placeholders from production CMS content.
 * Does not invent fake KPIs: uses qualitative outcomes from the case copy.
 *
 *   npx sanity exec scripts/patch-remove-placeholders.ts --with-user-token -- --confirm production
 */
import {getCliClient} from 'sanity/cli'

declare const process: {argv: string[]; exit(code?: number): never}

const argv = process.argv.slice(2)
const confirmed =
  argv.includes('--confirm') && argv[argv.indexOf('--confirm') + 1] === 'production'
if (!confirmed) {
  console.error('Pass: --confirm production')
  process.exit(1)
}

const client = getCliClient({apiVersion: '2025-01-01', dataset: 'production'})

async function run() {
  const tx = client.transaction()

  tx.patch('contactPage', (p) =>
    p.set({
      'hero.lead':
        'Όχι brief, όχι RFP. Γράψε με δικά σου λόγια τι δεν δουλεύει. Απαντάω μέσα σε 2 εργάσιμες.',
    }),
  )

  // Hide the dashed home testimonial until a real approved one exists.
  tx.patch('homePage', (p) =>
    p.set({
      'testimonialSection.placeholderQuote': '',
      'testimonialSection.placeholderAttribution': '',
    }),
  )

  tx.patch('caseStudyV2-nea-attiki-odos', (p) =>
    p.set({
      isPlaceholder: false,
      stack: ['XML feed', 'Zapier', 'αυτοματισμός'],
      reviewNote: 'Δημόσιο έργο πελάτη.',
    }),
  )

  tx.patch('caseStudyV2-metaixmio', (p) =>
    p.set({
      duration: 'πολυμηνιαίο πρόγραμμα',
      stack: ['e-commerce', 'ERP integration', 'UX/UI'],
      problem:
        'Τέσσερα εσωτερικά τμήματα με διαφορετικές ανάγκες από το ίδιο site: πωλήσεις, marketing, εκδοτικό, αποθήκη. Το e-shop, το blog και το ERP δούλευαν χωριστά.',
      results: [
        {_key: 'k0', _type: 'resultStat', value: '4', label: 'τμήματα σε ένα κοινό πρόγραμμα'},
        {
          _key: 'k1',
          _type: 'resultStat',
          value: 'ERP sync',
          label: 'προϊόντα, αποθέματα και παραγγελίες σε συγχρονισμό',
        },
        {
          _key: 'k2',
          _type: 'resultStat',
          value: 'χωρίς απώλειες',
          label: 'μεταφορά blog στο νέο site',
        },
      ],
      reviewNote: 'Δημόσιο έργο πελάτη.',
    }),
  )

  tx.patch('caseStudyV2-kollekta', (p) =>
    p.set({
      duration: 'από 2024',
      stack: ['Next.js', 'Node.js', 'cloud storage'],
      results: [
        {
          _key: 'k0',
          _type: 'resultStat',
          value: 'web-ready',
          label: 'εικόνες έτοιμες για e-shop',
        },
        {
          _key: 'k1',
          _type: 'resultStat',
          value: 'ανά συλλογή',
          label: 'οργάνωση φωτογραφιών προϊόντων',
        },
        {
          _key: 'k2',
          _type: 'resultStat',
          value: 'χωρίς Drive',
          label: 'μοίρασμα συλλογών με πελάτες',
        },
      ],
      reviewNote: '',
    }),
  )

  tx.patch('caseStudyV2-ftiaxesite', (p) =>
    p.set({
      stack: ['Astro', 'Sanity', 'Vercel'],
    }),
  )

  tx.patch('caseStudyV2-audit', (p) =>
    p.set({
      name: 'Side Audit',
      duration: 'από 2025',
      stack: ['Node.js', 'web performance', 'Lighthouse'],
      seo: {
        _type: 'seo',
        title: 'Side Audit · Side by Side',
        description: 'Ελέγχει ταχύτητα, SEO και βασικά τεχνικά σημεία ενός site.',
      },
      results: [
        {
          _key: 'k0',
          _type: 'resultStat',
          value: 'δωρεάν',
          label: 'χωρίς εγγραφή',
        },
        {
          _key: 'k1',
          _type: 'resultStat',
          value: 'ελληνικά',
          label: 'αναφορά χωρίς ορολογία',
        },
        {
          _key: 'k2',
          _type: 'resultStat',
          value: 'λίγα λεπτά',
          label: 'μέσος χρόνος αναφοράς',
        },
      ],
      reviewNote: '',
    }),
  )

  // Clean leftover placeholder testimonial docs (not shown as approved anyway).
  tx.patch('testimonialV2-placeholder', (p) =>
    p.set({
      name: '',
      role: '',
      company: '',
      quote: '',
    }),
  )
  tx.patch('drafts.testimonialV2-placeholder', (p) =>
    p.set({
      company: '',
      quote: '',
    }),
  )

  // Footer label for the audit product.
  const settings = await client.fetch<{
    footerColumns?: Array<{
      _key?: string
      title?: string
      links?: Array<{_key?: string; label?: string; href?: string}>
    }>
  } | null>(`*[_id == "siteSettingsV2"][0]{footerColumns}`)

  if (settings?.footerColumns) {
    const footerColumns = settings.footerColumns.map((col) => {
      if (col.title !== 'Προϊόντα') return col
      return {
        ...col,
        links: (col.links ?? []).map((link) =>
          link.href === '/erga/audit-tool' || link.label === 'Audit tool'
            ? {...link, label: 'Side Audit'}
            : link,
        ),
      }
    })
    tx.patch('siteSettingsV2', (p) => p.set({footerColumns}))
  }

  await tx.commit()
  console.log('Patched placeholders in production')
}

run().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
