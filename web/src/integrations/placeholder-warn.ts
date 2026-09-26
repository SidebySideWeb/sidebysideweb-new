/**
 * Astro integration: at build time, fetch v2 CMS strings and warn about
 * unfinished `[...]` placeholders so they are impossible to miss before release.
 */
import {createClient} from '@sanity/client'
import type {AstroIntegration} from 'astro'
import {loadEnv} from 'vite'

const PLACEHOLDER = /\[[^\]]+\]/

const QUERY = `{
  "home": *[_type == "homePage"][0]{
    "t": seo.title, "d": seo.description,
    hero{heading[]{parts[]{text}}, subhead, facts[]{label,value}, manifesto, compare{prompt, leftLabel, rightLabel, rows[]{q, aAgency, aMe}}, cta{heading, body}}
  },
  "services": *[_type == "servicesPage"][0]{seo{title,description}, hero{heading[]{parts[]{text}}, subhead}},
  "svc": *[_type == "serviceV2"]{title, summary, duration, billingModel, bullets},
  "process": *[_type == "processPage"][0]{seo{title,description}, hero{heading[]{parts[]{text}}, subhead}},
  "steps": *[_type == "processStepV2"]{title, summary, chips, deliverables},
  "work": *[_type == "workPage"][0]{seo{title,description}, hero{heading[]{parts[]{text}}, subhead}},
  "cases": *[_type == "caseStudyV2"]{title, client, summary, duration, stack, results[]{value,label}, problem, solution},
  "about": *[_type == "aboutPageV2"][0]{seo{title,description}, hero{heading[]{parts[]{text}}, subhead}},
  "contact": *[_type == "contactPage"][0]{seo{title,description}, hero{heading[]{parts[]{text}}, subhead}, budgetOptions[]{label}, privacyNote, successMessage},
  "settings": *[_type == "siteSettingsV2"][0]{siteName, email, linkedInUrl, legalLine, footerTagline}
}`

function collectStrings(value: unknown, out: string[]): void {
  if (value == null) return
  if (typeof value === 'string') {
    out.push(value)
    return
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, out)
    return
  }
  if (typeof value === 'object') {
    for (const child of Object.values(value as Record<string, unknown>)) {
      collectStrings(child, out)
    }
  }
}

function findPlaceholders(label: string, value: unknown): string[] {
  const strings: string[] = []
  collectStrings(value, strings)
  const hits: string[] = []
  for (const text of strings) {
    const match = text.match(PLACEHOLDER)
    if (match) hits.push(`${label}: ${match[0]} in “${text.slice(0, 80)}${text.length > 80 ? '…' : ''}”`)
  }
  return hits
}

export function placeholderWarn(): AstroIntegration {
  return {
    name: 'sbs-placeholder-warn',
    hooks: {
      'astro:build:start': async ({logger}) => {
        const env = loadEnv('all', process.cwd(), '')
        const projectId =
          env.PUBLIC_SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || 'y6aoacvp'
        const dataset =
          env.PUBLIC_SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production'
        const client = createClient({
          projectId,
          dataset,
          apiVersion: '2025-01-01',
          useCdn: true,
        })

        try {
          const data = await client.fetch<Record<string, unknown>>(QUERY)
          const hits = Object.entries(data ?? {}).flatMap(([key, value]) =>
            findPlaceholders(key, value),
          )

          if (!hits.length) {
            logger.info(`[placeholders] none found in ${dataset}`)
            return
          }

          logger.warn(
            `[placeholders] ${hits.length} unfinished [bracket] string(s) in Sanity dataset “${dataset}”`,
          )
          for (const hit of hits.slice(0, 40)) logger.warn(`  · ${hit}`)
          if (hits.length > 40) logger.warn(`  · …and ${hits.length - 40} more`)
          logger.warn('[placeholders] Fill these in Studio before release (§12).')
        } catch (error) {
          logger.warn(`[placeholders] skip warn (Sanity fetch failed): ${error}`)
        }
      },
    },
  }
}
