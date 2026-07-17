import {defineField, defineType} from 'sanity'

export const aboutTimelineItem = defineType({
  name: 'aboutTimelineItem',
  title: 'Timeline Item',
  type: 'object',
  fields: [
    defineField({
      name: 'period',
      title: 'Period',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      rows: 2,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {title: 'title.el', subtitle: 'period.el'},
  },
})
