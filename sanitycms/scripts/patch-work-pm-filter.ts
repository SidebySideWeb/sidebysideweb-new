/**
 * Add PM filter label + flag Metaixmio as Project Manager work.
 *   npx sanity exec scripts/patch-work-pm-filter.ts --with-user-token -- --confirm production
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
  const current = await client.fetch<{
    filterLabels?: Record<string, string>
  } | null>(`*[_id == "workPage"][0]{filterLabels}`)

  const filterLabels = {
    all: current?.filterLabels?.all ?? 'Όλα',
    product: current?.filterLabels?.product ?? 'Δικά μου προϊόντα',
    client: current?.filterLabels?.client ?? 'Έργα πελατών',
    pm: 'Έργα πελατών που συμμετείχα ως Project Manager',
  }

  await client
    .transaction()
    .patch('workPage', (p) => p.set({filterLabels}))
    .patch('caseStudyV2-metaixmio', (p) => p.set({asProjectManager: true}))
    .commit()

  console.log('Updated workPage filterLabels.pm and flagged Metaixmio as PM')
}

run().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
