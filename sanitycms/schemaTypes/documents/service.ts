import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => (doc.title as {el?: string} | undefined)?.el,
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Material Symbol icon name',
    }),
    defineField({name: 'priceMin', title: 'Price (Min)', type: 'number'}),
    defineField({name: 'priceMax', title: 'Price (Max)', type: 'number'}),
    defineField({
      name: 'priceLabel',
      title: 'Price Label',
      type: 'localeString',
      description: 'e.g., "Από €2.500", "From €2,500"',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'localeString',
      description: 'e.g., "2-3 Εβδομάδες", "2-3 weeks"',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full Description',
      type: 'localeRichText',
    }),
    defineField({
      name: 'whatIncluded',
      title: "What's Included",
      type: 'array',
      of: [{type: 'localeString'}],
    }),
    defineField({
      name: 'order',
      title: 'Order (Display)',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
