import {defineField, defineType} from 'sanity'

export const aboutComparison = defineType({
  name: 'aboutComparison',
  title: 'Comparison Block',
  type: 'object',
  fields: [
    defineField({
      name: 'negativeTitle',
      title: 'Alternative Title (left)',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'negativeItems',
      title: 'Alternative Items',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
    defineField({
      name: 'positiveTitle',
      title: 'Your Title (right)',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'positiveItems',
      title: 'Your Items',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
  ],
  preview: {
    select: {title: 'negativeTitle.el', subtitle: 'positiveTitle.el'},
  },
})
