/**
 * Point About secondary CTA at the hosted CV PDF.
 * Run: npx sanity exec scripts/set-about-cv-link.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

async function main() {
  await client
    .patch('aboutPage')
    .set({secondaryCtaLink: '/files/geronikolos-dimitris-cv.pdf'})
    .commit()
  console.log('Updated aboutPage.secondaryCtaLink')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
