/**
 * Dump case studies + related fields that still have placeholders.
 *   npx sanity exec scripts/dump-placeholder-docs.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'
import {writeFileSync} from 'node:fs'
import {join} from 'node:path'

declare const process: {cwd(): string; exit(code?: number): never}

const client = getCliClient({apiVersion: '2025-01-01', dataset: 'production'})

async function run() {
  const data = await client.fetch(`{
    "cases": *[_type == "caseStudyV2"] | order(order asc){
      _id, name, "slug": slug.current, duration, stack, problem, approach, solution,
      results, seo, reviewNote, isPlaceholder, headline, short, tag, role
    },
    "contact": *[_id == "contactPage"][0]{hero, successMessage},
    "home": *[_id == "homePage"][0]{
      testimonialSection{eyebrow, heading, placeholderQuote, placeholderAttribution, items}
    },
    "settings": *[_id == "siteSettingsV2"][0]{legalLine, linkedInUrl, email, footerColumns},
    "testimonials": *[_type == "testimonialV2"]{_id, name, role, company, quote, isPlaceholder}
  }`)
  const out = join(process.cwd(), '..', 'tmp-placeholder-docs.json')
  writeFileSync(out, JSON.stringify(data, null, 2), 'utf8')
  console.log('Wrote', out)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
