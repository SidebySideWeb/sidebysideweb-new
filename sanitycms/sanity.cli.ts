import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'y6aoacvp',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: true,
  },
  studioHost: 'sidebysideweb',
})
