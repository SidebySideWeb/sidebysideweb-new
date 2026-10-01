/**
 * Patch contactPage.successMessage (2 working days).
 *   npx sanity exec scripts/patch-contact-success.ts --with-user-token -- --confirm production
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
const successMessage = 'Το πήρα. Θα σου απαντήσω προσωπικά μέσα σε 2 εργάσιμες.'

async function run() {
  const doc = await client.patch('contactPage').set({successMessage}).commit()
  console.log('Updated contactPage.successMessage:', doc.successMessage)
}

run().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
