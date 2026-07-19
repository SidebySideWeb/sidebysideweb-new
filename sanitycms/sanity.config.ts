import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const singletonTypes = ['siteSettings', 'heroSection', 'credentialsSection', 'valueProposition', 'aboutPage']
const hiddenCreateTypes = [...singletonTypes, 'formSubmission']

export default defineConfig({
  name: 'default',
  title: 'Side by Side Web Studio',

  projectId: 'y6aoacvp',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({schemaType}) => !hiddenCreateTypes.includes(schemaType)),
  },
})
