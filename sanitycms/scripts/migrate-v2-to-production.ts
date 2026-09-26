/**
 * Copy all v2 redesign documents from `redesign` → `production`.
 *
 *   npx sanity exec scripts/migrate-v2-to-production.ts --with-user-token -- --confirm production
 *
 * Does not delete or touch legacy v1 documents. Requires an explicit
 * --confirm production flag so it cannot run by accident.
 *
 * Datasets are hard-coded so a leftover SANITY_STUDIO_DATASET=production
 * env from Studio deploy cannot point the source client at the wrong place.
 */
import {createClient} from '@sanity/client'
import {getCliClient} from 'sanity/cli'

declare const process: {
  argv: string[]
  exit(code?: number): never
}

const V2_TYPES = [
  'siteSettingsV2',
  'homePage',
  'servicesPage',
  'processPage',
  'workPage',
  'aboutPageV2',
  'contactPage',
  'serviceV2',
  'processStepV2',
  'caseStudyV2',
  'testimonialV2',
] as const

const argv = process.argv.slice(2)
const confirmed =
  argv.includes('--confirm') && argv[argv.indexOf('--confirm') + 1] === 'production'

if (!confirmed) {
  console.error('Refusing to write production. Pass: --confirm production')
  process.exit(1)
}

/** Auth from the logged-in CLI; force dataset regardless of env defaults. */
function clientFor(dataset: 'redesign' | 'production') {
  const base = getCliClient({apiVersion: '2025-01-01'})
  const config = base.config()
  return createClient({
    ...config,
    dataset,
    apiVersion: '2025-01-01',
    useCdn: false,
  })
}

async function run() {
  const source = clientFor('redesign')
  const target = clientFor('production')

  console.log(`Source dataset: ${source.config().dataset}`)
  console.log(`Target dataset: ${target.config().dataset}`)

  const docs = await source.fetch<Array<Record<string, unknown> & {_id: string; _type: string}>>(
    '*[_type in $types]',
    {types: [...V2_TYPES]},
  )

  if (!docs.length) {
    console.error('No v2 documents found in redesign. Aborting.')
    process.exit(1)
  }

  console.log(`Copying ${docs.length} v2 document(s) redesign → production…`)

  const tx = target.transaction()
  for (const doc of docs) {
    const {_rev, _createdAt, _updatedAt, ...rest} = doc
    void _rev
    void _createdAt
    void _updatedAt
    tx.createOrReplace(rest)
  }
  await tx.commit({visibility: 'async'})

  const counts = await target.fetch<Record<string, number>>(
    `{
      ${V2_TYPES.map((t) => `"${t}": count(*[_type == "${t}"])`).join(',\n')}
    }`,
  )

  console.log('Done. production counts:')
  for (const [type, count] of Object.entries(counts)) {
    console.log(`  ${type}: ${count}`)
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
