/**
 * List all [bracket] placeholders in production v2 content.
 *   npx sanity exec scripts/list-placeholders.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'
import {writeFileSync} from 'node:fs'
import {join} from 'node:path'

declare const process: {cwd(): string; exit(code?: number): never}

const client = getCliClient({apiVersion: '2025-01-01', dataset: 'production'})
const PLACEHOLDER = /\[[^\]]+\]/g

type Hit = {id: string; type: string; path: string; placeholder: string; text: string}

function walk(value: unknown, path: string, doc: {_id: string; _type: string}, hits: Hit[]) {
  if (value == null) return
  if (typeof value === 'string') {
    for (const match of value.matchAll(PLACEHOLDER)) {
      hits.push({
        id: doc._id,
        type: doc._type,
        path,
        placeholder: match[0],
        text: value,
      })
    }
    return
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}[${index}]`, doc, hits))
    return
  }
  if (typeof value === 'object') {
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      if (key.startsWith('_')) continue
      walk(child, path ? `${path}.${key}` : key, doc, hits)
    }
  }
}

async function run() {
  const docs = await client.fetch<Array<{_id: string; _type: string}>>(
    `*[_type in [
      "homePage","servicesPage","processPage","workPage","aboutPageV2","contactPage",
      "siteSettingsV2","serviceV2","processStepV2","caseStudyV2","testimonialV2","auditPage"
    ]]`,
  )
  const hits: Hit[] = []
  for (const doc of docs) walk(doc, '', doc, hits)

  const out = join(process.cwd(), '..', 'tmp-placeholders.json')
  writeFileSync(out, JSON.stringify(hits, null, 2), 'utf8')
  console.log(`Found ${hits.length} placeholder hits → ${out}`)
  for (const hit of hits) {
    console.log(`${hit.id} | ${hit.path} | ${hit.placeholder}`)
  }
}

run().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
