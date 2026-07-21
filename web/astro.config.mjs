// @ts-check
import {defineConfig} from 'astro/config'
import react from '@astrojs/react'
import vercel from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import sanity from '@sanity/astro'
import {SANITY_DATASET, SANITY_PROJECT_ID, SITE_URL} from './src/lib/sanity-config.ts'
import {EN_LOCALE_ENABLED} from './src/lib/i18n.ts'

export default defineConfig({
  site: SITE_URL,
  output: 'server',
  adapter: vercel(),
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
      filter: (page) => {
        if (page.includes('/api/')) return false
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
