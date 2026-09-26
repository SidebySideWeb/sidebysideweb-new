/**
 * Seeds the v2 redesign content.
 *
 *   npx sanity exec scripts/seed-v2.ts --with-user-token -- --dataset redesign
 *   npx sanity exec scripts/seed-v2.ts --with-user-token -- --force --dataset redesign
 *
 * Idempotent: existing documents are skipped unless --force is passed, in which
 * case they are replaced. Refuses to touch `production` unless the dataset is
 * named explicitly with `--dataset production`.
 */
import {getCliClient} from 'sanity/cli'
import {documents} from './seed-v2-data'

declare const process: {
  argv: string[]
  env: Record<string, string | undefined>
  exit(code?: number): never
}

const argv = process.argv.slice(2)
const force = argv.includes('--force')

const datasetFlagIndex = argv.indexOf('--dataset')
const datasetFromFlag = datasetFlagIndex === -1 ? undefined : argv[datasetFlagIndex + 1]
const dataset = datasetFromFlag ?? process.env.SANITY_STUDIO_DATASET ?? 'redesign'

if (dataset === 'production' && datasetFromFlag !== 'production') {
  console.error(
    'Refusing to seed `production`. Pass --dataset production explicitly if that is really what you want.',
  )
  process.exit(1)
}

const client = getCliClient({apiVersion: '2025-01-01', dataset})

/** Deterministic keys, so re-running with --force does not churn array items. */
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

async function run() {
  const prepared = documents.map(
    (doc) => withKeys(doc, keyer()) as Record<string, unknown> & {_id: string; _type: string},
  )
  const ids = prepared.map((doc) => doc._id)

  const existing: string[] = await client.fetch('*[_id in $ids]._id', {ids})
  const existingSet = new Set(existing)

  const created: string[] = []
  const replaced: string[] = []
  const skipped: string[] = []

  const tx = client.transaction()
  for (const doc of prepared) {
    if (!existingSet.has(doc._id)) {
      tx.create(doc)
      created.push(doc._id)
    } else if (force) {
      tx.createOrReplace(doc)
      replaced.push(doc._id)
    } else {
      skipped.push(doc._id)
    }
  }

  if (created.length === 0 && replaced.length === 0) {
    console.log(`Dataset \`${dataset}\`: nothing to do, all ${skipped.length} documents exist.`)
    console.log('Run with --force to overwrite them.')
    return
  }

  await tx.commit({visibility: 'async'})

  console.log(`Dataset \`${dataset}\`${force ? ' (force)' : ''}`)
  console.log(`  created:  ${created.length}`)
  if (replaced.length) console.log(`  replaced: ${replaced.length}`)
  if (skipped.length) console.log(`  skipped:  ${skipped.length} (already existed)`)
  for (const id of created) console.log(`  + ${id}`)
  for (const id of replaced) console.log(`  ~ ${id}`)
}

run().catch((error) => {
  console.error(`Seed failed on dataset \`${dataset}\`:`, error.message ?? error)
  process.exit(1)
})
