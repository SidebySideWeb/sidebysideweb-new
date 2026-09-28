/**
 * Add Agent Readiness Audit to footer Προϊόντα column.
 *   npx sanity exec scripts/patch-footer-audit.ts --with-user-token -- --confirm production
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
  const settings = await client.fetch<{
    footerColumns?: Array<{title?: string; links?: Array<{label?: string; href?: string}>}>
  } | null>(`*[_id == "siteSettingsV2"][0]{footerColumns}`)

  const columns = settings?.footerColumns ?? []
  const products = columns.find((col) => col.title === 'Προϊόντα')
  if (!products) {
    console.error('Προϊόντα column not found')
    process.exit(1)
  }

  const links = products.links ?? []
  const already = links.some(
    (link) => link.href === '/audit' || link.label === 'Agent Readiness Audit',
  )
  if (already) {
    console.log('Footer already has /audit link')
    return
  }

  // Replace "Audit tool" product link destination if it pointed at the case study only,
  // and append the landing page as its own entry.
  const nextLinks = [
    ...links.filter((link) => link.label !== 'Agent Readiness Audit'),
    {_type: 'linkItem', _key: 'auditLanding', label: 'Agent Readiness Audit', href: '/audit'},
  ]

  const nextColumns = columns.map((col) =>
    col.title === 'Προϊόντα' ? {...col, links: nextLinks} : col,
  )

  await client.patch('siteSettingsV2').set({footerColumns: nextColumns}).commit()
  console.log('Updated siteSettingsV2 footer with /audit')
}

run().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
