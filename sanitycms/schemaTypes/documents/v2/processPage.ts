import {defineArrayMember, defineField, defineType} from 'sanity'

export const processPage = defineType({
  name: 'processPage',
  title: 'Σελίδα Πώς δουλεύω',
  type: 'document',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero'}),
    defineField({
      name: 'steps',
      title: 'Βήματα',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'processStepV2'}]})],
    }),
    defineField({
      name: 'rulesSection',
      title: 'Κανόνες',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'heading', title: 'Τίτλος', type: 'string'}),
        defineField({
          name: 'rules',
          title: 'Κανόνες',
          type: 'array',
          of: [defineArrayMember({type: 'valueCard'})],
        }),
      ],
    }),
    defineField({name: 'bigCta', title: 'Μεγάλο CTA', type: 'bigCta'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Σελίδα Πώς δουλεύω'})},
})
