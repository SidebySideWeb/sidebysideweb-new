import {defineCliConfig} from 'sanity/cli'

declare const process: {env: Record<string, string | undefined>}

/** Single live dataset. */
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'

export default defineCliConfig({
  api: {
    projectId: 'y6aoacvp',
    dataset,
  },
  deployment: {
    autoUpdates: true,
    appId: 'ypft12wpkt4ul6svgvd8pt56',
  },
  studioHost: 'sidebysideweb',
})
