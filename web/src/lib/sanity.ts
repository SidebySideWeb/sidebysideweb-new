import {createClient} from '@sanity/client'
import {SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID} from './sanity-config'

/**
 * Live reads hit the API directly (not the CDN) so Studio publishes show up
 * on the next request without waiting for CDN invalidation.
 */
export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
})

export const writeClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
  token: import.meta.env.SANITY_WRITE_TOKEN,
})
