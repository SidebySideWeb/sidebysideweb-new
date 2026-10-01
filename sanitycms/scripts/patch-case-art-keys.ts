/**
 * Assign category-specific artKey on the 9 new case studies only.
 *   npx sanity exec scripts/patch-case-art-keys.ts --with-user-token -- --confirm production
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

const ART_BY_ID: Record<string, string> = {
  'caseStudyV2-moutaki': 'fashion',
  'caseStudyV2-baroque-le-bistrot': 'hospitality',
  'caseStudyV2-al-anastasiou': 'construction',
  'caseStudyV2-elaiaskarpos': 'media',
  'caseStudyV2-fresher': 'media',
  'caseStudyV2-kallitechnia': 'sports',
  'caseStudyV2-gas-euniki': 'sports',
  'caseStudyV2-viar-travel': 'travel',
  'caseStudyV2-casa-enastron': 'travel',
}

async function run() {
  const tx = client.transaction()
  for (const [id, artKey] of Object.entries(ART_BY_ID)) {
    tx.patch(id, (p) => p.set({artKey}))
  }
  await tx.commit()
  console.log(`Updated artKey on ${Object.keys(ART_BY_ID).length} case studies`)
}

run().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
