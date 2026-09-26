// @ts-check
import {defineConfig} from 'astro/config'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import sanity from '@sanity/astro'
import {SANITY_DATASET, SANITY_PROJECT_ID, SITE_URL} from './src/lib/sanity-config.ts'
import {EN_LOCALE_ENABLED} from './src/lib/i18n.ts'

/** Canonical v2 routes. Prerendering is off, so the sitemap needs them listed. */
const SITEMAP_PAGES = [
  '/',
  '/ypiresies/',
  '/pos-doulevo/',
  '/erga/',
  '/poios-eimai/',
  '/epikoinonia/',
  '/privacy-policy/',
  '/cookies-policy/',
  '/erga/kollekta/',
  '/erga/ftiaxesite/',
  '/erga/audit/',
  '/erga/erp/',
  '/erga/b2b/',
].map((path) => new URL(path, SITE_URL).href)

/**
 * Mirrors the permanent redirects in `vercel.json` so dev and preview behave
 * like production. Vercel handles these before Astro ever sees the request.
 */
const LEGACY_REDIRECTS = {
  '/about': '/poios-eimai/',
  '/automation-nea-attiki-odos-twitter': '/erga/',
  '/case-study-metaixmio': '/erga/',
  '/case-studies': '/erga/',
  '/case-studies/[slug]': '/erga/',
}

export default defineConfig({
  site: SITE_URL,
  output: 'server',
  adapter: vercel(),
  redirects: LEGACY_REDIRECTS,
  i18n: {
    defaultLocale: 'el',
    locales: ['el', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  security: {
    allowedDomains: [
      {hostname: 'www.sidebysideweb.gr', protocol: 'https'},
      {hostname: 'sidebysideweb.gr', protocol: 'https'},
    ],
  },
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap({
      customPages: SITEMAP_PAGES,
      filter: (page) => {
        if (page.includes('/api/')) return false
        if (page.includes('/v2/') || page.endsWith('/v2')) return false
        if (page.includes('/404')) return false
        if (!EN_LOCALE_ENABLED && (page.includes('/en/') || page.endsWith('/en'))) return false
        return true
      },
      i18n: EN_LOCALE_ENABLED
        ? {
            defaultLocale: 'el',
            locales: {
              el: 'el-GR',
              en: 'en-US',
            },
          }
        : undefined,
    }),
    sanity({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      useCdn: true,
    }),
  ],
})
