import {createClient} from '@sanity/client'
import {SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID} from './sanity-config'

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: import.meta.env.PROD,
})
