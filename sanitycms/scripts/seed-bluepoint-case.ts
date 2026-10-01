/**
 * Create Bluepoint Shops case study (ERP art) and give Νέα Αττική Οδός the feed art.
 *
 *   npx sanity exec scripts/seed-bluepoint-case.ts --with-user-token -- --confirm production
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

const bluepoint = {
  _id: 'caseStudyV2-bluepoint-shops',
  _type: 'caseStudyV2',
  name: 'Bluepoint Shops',
  slug: {_type: 'slug', current: 'bluepoint-shops'},
  kind: 'client',
  tag: 'Έργο πελάτη',
  sector: 'Retail / B2B & B2C',
  headline: 'Νέο e-shop και ERP σε συγχρονισμό, για B2B και B2C.',
  short:
    'E-commerce και σύνδεση ERP για προϊόντα, πελάτες και παραγγελίες, σε B2B και B2C.',
  role: 'Ανάλυση, αρχιτεκτονική, υλοποίηση',
  duration: 'πολυμηνιαίο πρόγραμμα',
  stack: ['e-commerce', 'ERP integration', 'APIs'],
  problem:
    'Χρειαζόταν νέο e-commerce και ταυτόχρονα τα προϊόντα, οι πελάτες και οι παραγγελίες να συγχρονίζονται με το ERP. Και για B2B και για B2C, χωρίς διπλή πληκτρολόγηση και χωρίς λάθη αποθέματος.',
  approach:
    'Ξεκίνησα από τις ροές παραγγελίας και αποθεμάτων, όχι από το design του καταστήματος. Αυτό καθόρισε τι γράφει το ERP, τι κρατάει το e-shop και πού συναντιούνται οι δύο κόσμοι.',
  solution:
    'Χτίστηκε νέο e-shop και το έδεσα με το ERP: sync προϊόντων, πελατών και παραγγελιών και στις δύο πλευρές. Η ομάδα δουλεύει σε ένα σύστημα, όχι σε δύο παράλληλα.',
  results: [
    {_key: 'k0', _type: 'resultStat', value: 'B2B + B2C', label: 'ένα e-shop, δύο κανάλια'},
    {
      _key: 'k1',
      _type: 'resultStat',
      value: 'ERP sync',
      label: 'προϊόντα, πελάτες, παραγγελίες',
    },
    {
      _key: 'k2',
      _type: 'resultStat',
      value: 'χωρίς διπλή είσοδο',
      label: 'μία πηγή αλήθειας για αποθέματα',
    },
  ],
  artKey: 'erp',
  isPlaceholder: false,
  reviewNote: '',
  order: 2,
  seo: {
    _type: 'seo',
    title: 'Bluepoint Shops · E-shop και ERP Integration · Side by Side',
    description:
      'Νέο e-commerce και σύνδεση ERP για προϊόντα, πελάτες και παραγγελίες, σε B2B και B2C.',
  },
}

async function run() {
  // Make room in the order for Bluepoint between Attiki (1) and Metaixmio.
  const others = await client.fetch<Array<{_id: string; order?: number}>>(
    `*[_type == "caseStudyV2" && _id != "caseStudyV2-nea-attiki-odos" && _id != $id]{_id, order} | order(order asc)`,
    {id: bluepoint._id},
  )

  const tx = client.transaction()
  tx.createOrReplace(bluepoint)
  tx.patch('caseStudyV2-nea-attiki-odos', (p) => p.set({artKey: 'feed', order: 1}))

  let next = 3
  for (const doc of others) {
    if (doc._id === bluepoint._id) continue
    tx.patch(doc._id, (p) => p.set({order: next}))
    next += 1
  }

  await tx.commit()
  console.log('Seeded Bluepoint Shops (erp art) and set Attiki artKey=feed')
}

run().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
