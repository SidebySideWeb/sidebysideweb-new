import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

declare const process: {env: Record<string, string | undefined>}

const singletonTypes = [
  // v2
  'siteSettingsV2',
  'homePage',
  'servicesPage',
  'processPage',
  'workPage',
  'aboutPageV2',
  'contactPage',
  // v1
  'siteSettings',
  'heroSection',
  'credentialsSection',
  'valueProposition',
  'aboutPage',
]
const hiddenCreateTypes = [...singletonTypes, 'formSubmission']

/** Single live dataset. Override with SANITY_STUDIO_DATASET only for rare ops. */
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'

export default defineConfig({
  name: 'default',
  title: 'Side by Side Web Studio',

  projectId: 'y6aoacvp',
  dataset,

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({schemaType}) => !hiddenCreateTypes.includes(schemaType)),
  },
})
