/**
 * Seed the 9 new client case studies from reference/new-case-studies.json.
 * createIfNotExists only — never overwrites existing documents.
 *
 *   npx sanity exec scripts/seed-new-case-studies.ts --with-user-token -- --confirm production
 *   npx sanity exec scripts/seed-new-case-studies.ts --with-user-token -- --confirm production --dry-run
 */
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {getCliClient} from 'sanity/cli'

declare const process: {argv: string[]; cwd(): string; exit(code?: number): never}

const argv = process.argv.slice(2)
const confirmed =
  argv.includes('--confirm') && argv[argv.indexOf('--confirm') + 1] === 'production'
const dryRun = argv.includes('--dry-run')
if (!confirmed) {
  console.error('Pass: --confirm production')
  process.exit(1)
}

const client = getCliClient({apiVersion: '2025-01-01', dataset: 'production'})

type JsonCase = {
  slug: string
  name: string
  liveUrl?: string
  sector?: string
  category?: string
  platform?: string
  cms?: string
  stack?: string[]
  art?: string
  order?: number
  featured?: boolean
  deliveredVia?: string
  headline: string
  short?: string
  role?: string
  duration?: string
  problem?: string
  approach?: string
  solution?: string
  results?: [string, string][]
  highlights?: string[]
  kind?: string
  tag?: string
  isPlaceholder?: boolean
  reviewNote?: string
}

function keyer() {
  let n = 0
  return () => `k${(n++).toString(36)}`
}

function loadJson(): {caseStudies: JsonCase[]} {
  const path = join(process.cwd(), '..', 'reference', 'new-case-studies.json')
  return JSON.parse(readFileSync(path, 'utf8'))
}

async function run() {
  const data = loadJson()
  const existingMax =
    (await client.fetch<number | null>(
      `math::max(*[_type == "caseStudyV2" && !(slug.current in $slugs)].order)`,
      {slugs: data.caseStudies.map((c) => c.slug)},
    )) ?? 0

  let created = 0
  let skipped = 0
  const nextKey = keyer()

  for (const study of data.caseStudies) {
    const id = `caseStudyV2-${study.slug}`
    const exists = await client.fetch<string | null>(`*[_id == $id][0]._id`, {id})
    if (exists) {
      console.log(`skip ${id} (exists)`)
      skipped += 1
      continue
    }

    const order = existingMax + (study.order ?? 1)
    const doc = {
      _id: id,
      _type: 'caseStudyV2',
      name: study.name,
      slug: {_type: 'slug', current: study.slug},
      kind: study.kind ?? 'client',
      asProjectManager: false,
      tag: study.tag ?? 'Έργο πελάτη',
      sector: study.sector,
      category: study.category,
      liveUrl: study.liveUrl,
      platform: study.platform,
      cms: study.cms,
      stack: study.stack ?? [],
      highlights: study.highlights ?? [],
      deliveredVia: study.deliveredVia,
      headline: study.headline,
      short: study.short,
      role: study.role,
      duration: study.duration,
      problem: study.problem,
      approach: study.approach,
      solution: study.solution,
      results: (study.results ?? []).map(([value, label]) => ({
        _type: 'resultStat',
        _key: nextKey(),
        value,
        label,
      })),
      artKey: study.art ?? 'site',
      featured: Boolean(study.featured),
      isPlaceholder: Boolean(study.isPlaceholder),
      reviewNote: study.reviewNote,
      order,
      seo: {
        _type: 'seo',
        title: `${study.name} · Case study · Side by Side`,
        description: study.short ?? study.headline,
      },
    }

    if (dryRun) {
      console.log(`dry-run create ${id} order=${order}`)
    } else {
      await client.createIfNotExists(doc)
      console.log(`created ${id} order=${order}`)
    }
    created += 1
  }

  // Append brand names on about page without removing existing ones.
  const brandNames = data.caseStudies.map((c) => c.name)
  const about = await client.fetch<{
    brandsSection?: {items?: string[]}
  } | null>(`*[_id == "aboutPageV2"][0]{brandsSection}`)
  const current = about?.brandsSection?.items ?? []
  const toAdd = brandNames.filter((name) => !current.includes(name))
  if (toAdd.length) {
    const nextItems = [...current, ...toAdd]
    if (dryRun) {
      console.log(`dry-run append ${toAdd.length} brands to aboutPageV2`)
    } else {
      await client
        .patch('aboutPageV2')
        .set({'brandsSection.items': nextItems})
        .commit()
      console.log(`appended brands: ${toAdd.join(', ')}`)
    }
  } else {
    console.log('brands already present, skip about patch')
  }

  console.log(`Done. created=${created} skipped=${skipped} dryRun=${dryRun}`)
}

run().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
