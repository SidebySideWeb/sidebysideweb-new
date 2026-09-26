import {defineCliConfig} from 'sanity/cli'

declare const process: {env: Record<string, string | undefined>}

/** CLI defaults to `redesign`. Set SANITY_STUDIO_DATASET=production for production work. */
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'redesign'

export default defineCliConfig({
  api: {
    projectId: 'y6aoacvp',
    dataset,
  },
  deployment: {
    autoUpdates: true,
  },
  studioHost: 'sidebysideweb',
})
