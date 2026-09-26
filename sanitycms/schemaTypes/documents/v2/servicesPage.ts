import {defineArrayMember, defineField, defineType} from 'sanity'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Σελίδα Υπηρεσίες',
  type: 'document',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero'}),
    defineField({
      name: 'services',
      title: 'Υπηρεσίες',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'serviceV2'}]})],
    }),
    defineField({
      name: 'docsSection',
      title: 'Έγγραφα που γράφω',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'heading', title: 'Τίτλος', type: 'string'}),
        defineField({name: 'intro', title: 'Εισαγωγή', type: 'text', rows: 3}),
        defineField({
          name: 'docCards',
          title: 'Έγγραφα',
          type: 'array',
          of: [defineArrayMember({type: 'docCard'})],
        }),
      ],
    }),
    defineField({
      name: 'techStack',
      title: 'Τεχνολογίες',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'heading', title: 'Τίτλος', type: 'text', rows: 2}),
        defineField({
          name: 'items',
          title: 'Εργαλεία',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
        }),
      ],
    }),
    defineField({name: 'bigCta', title: 'Μεγάλο CTA', type: 'bigCta'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Σελίδα Υπηρεσίες'})},
})
