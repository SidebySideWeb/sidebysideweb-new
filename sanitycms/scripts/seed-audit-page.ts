/**
 * Seed / replace the auditPage singleton from reference/audit-content.json.
 *
 *   npx sanity exec scripts/seed-audit-page.ts --with-user-token -- --confirm production
 */
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {getCliClient} from 'sanity/cli'

declare const process: {argv: string[]; cwd(): string; exit(code?: number): never}

const argv = process.argv.slice(2)
const confirmed =
  argv.includes('--confirm') && argv[argv.indexOf('--confirm') + 1] === 'production'
if (!confirmed) {
  console.error('Pass: --confirm production')
  process.exit(1)
}

const client = getCliClient({apiVersion: '2025-01-01', dataset: 'production'})

type Style = 'normal' | 'thin' | 'marigold'

function keyer() {
  let n = 0
  return () => `k${(n++).toString(36)}`
}

function withKeys(value: unknown, nextKey: () => string, inArray = false): unknown {
  if (Array.isArray(value)) return value.map((item) => withKeys(item, nextKey, true))
  if (value && typeof value === 'object') {
    const source = value as Record<string, unknown>
    const result: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(source)) result[k] = withKeys(v, nextKey)
    if (inArray && !result._key) result._key = nextKey()
    return result
  }
  return value
}

/** Convert JSON heading line `["text **AI;**", "normal"]` into headingLine parts. */
function headingLineFromTuple([raw, style]: [string, string]) {
  const parts: Array<{_type: string; text: string; style: Style}> = []
  const re = /\*\*([^*]+)\*\*/g
  let last = 0
  let match: RegExpExecArray | null
  const baseStyle = (style === 'thin' ? 'thin' : 'normal') as Style
  while ((match = re.exec(raw))) {
    if (match.index > last) {
      parts.push({_type: 'headingLinePart', text: raw.slice(last, match.index), style: baseStyle})
    }
    parts.push({_type: 'headingLinePart', text: match[1], style: 'marigold'})
    last = match.index + match[0].length
  }
  if (last < raw.length) {
    parts.push({_type: 'headingLinePart', text: raw.slice(last), style: baseStyle})
  }
  if (!parts.length) parts.push({_type: 'headingLinePart', text: raw, style: baseStyle})
  return {_type: 'headingLine', parts}
}

function loadJson() {
  const candidates = [
    join(process.cwd(), '..', 'reference', 'audit-content.json'),
    join(process.cwd(), 'content', 'audit-content.json'),
  ]
  for (const path of candidates) {
    try {
      return JSON.parse(readFileSync(path, 'utf8'))
    } catch {
      /* next */
    }
  }
  throw new Error('audit-content.json not found')
}

async function run() {
  const data = loadJson()
  const form = data.cta?.form ?? {}

  const doc = {
    _id: 'auditPage',
    _type: 'auditPage',
    seo: {_type: 'seo', title: data.seo?.title, description: data.seo?.description},
    hero: {
      eyebrow: data.hero?.eyebrow,
      headingLines: (data.hero?.headingLines ?? []).map(headingLineFromTuple),
      subhead: data.hero?.subhead,
      cta: data.hero?.cta,
      readers: data.hero?.readers ?? [],
    },
    why: {
      eyebrow: data.why?.eyebrow,
      statement: data.why?.statement,
      paragraphs: data.why?.paragraphs ?? [],
    },
    checks: {
      eyebrow: data.checks?.eyebrow,
      heading: data.checks?.heading,
      items: (data.checks?.items ?? []).map((item: any) => ({
        _type: 'auditCheckItem',
        icon: item.icon,
        title: item.title,
        text: item.text,
        highlight: Boolean(item.highlight),
      })),
    },
    how: {
      eyebrow: data.how?.eyebrow,
      heading: data.how?.heading,
      paragraphs: data.how?.paragraphs ?? [],
      visual: data.how?.visual,
    },
    deliverable: {
      eyebrow: data.deliverable?.eyebrow,
      heading: data.deliverable?.heading,
      paragraphs: data.deliverable?.paragraphs ?? [],
      sample: {
        title: data.deliverable?.sample?.title,
        tag: data.deliverable?.sample?.tag,
        summaryLabel: data.deliverable?.sample?.summaryLabel,
        summary: data.deliverable?.sample?.summary,
        rows: (data.deliverable?.sample?.rows ?? []).map(
          ([severity, finding, category, priority]: [string, string, string, string]) => ({
            _type: 'auditSampleRow',
            severity,
            finding,
            category,
            priority,
          }),
        ),
        note: data.deliverable?.sample?.note,
      },
    },
    cta: {
      eyebrow: data.cta?.eyebrow,
      heading: data.cta?.heading,
      body: data.cta?.body,
      button: data.cta?.button,
      form: {
        urlLabel: form.url?.[0],
        urlPlaceholder: form.url?.[1],
        nameLabel: form.name?.[0],
        namePlaceholder: form.name?.[1],
        emailLabel: form.email?.[0],
        emailPlaceholder: form.email?.[1],
        noteLabel: form.note?.[0],
        notePlaceholder: form.note?.[1],
        hint: form.hint,
        success: form.success,
      },
    },
    faq: {
      eyebrow: data.faq?.eyebrow,
      heading: data.faq?.heading,
      items: (data.faq?.items ?? []).map(([question, answer]: [string, string]) => ({
        _type: 'faqItem',
        question,
        answer,
      })),
    },
  }

  const prepared = withKeys(doc, keyer()) as Record<string, unknown> & {_id: string}
  await client.createOrReplace(prepared)
  console.log('Seeded auditPage')
}

run().catch((error) => {
  console.error(error.message ?? error)
  process.exit(1)
})
