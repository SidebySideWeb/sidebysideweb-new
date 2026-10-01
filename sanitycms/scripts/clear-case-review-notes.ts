/**
 * Clear reviewNote / placeholder flags on all case studies.
 *   npx sanity exec scripts/clear-case-review-notes.ts --with-user-token -- --confirm production
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
  const ids = await client.fetch<string[]>(`*[_type == "caseStudyV2"]._id`)
  const tx = client.transaction()
  for (const id of ids) {
    tx.patch(id, (p) => p.unset(['reviewNote']).set({isPlaceholder: false}))
  }
  await tx.commit()
  console.log(`Cleared reviewNote on ${ids.length} cases`)
}

run().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
