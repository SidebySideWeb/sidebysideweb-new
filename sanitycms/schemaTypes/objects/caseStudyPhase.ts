import {defineField, defineType} from 'sanity'

export const caseStudyPhase = defineType({
  name: 'caseStudyPhase',
  title: 'Timeline Phase',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Phase Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Phase Description',
      type: 'localeText',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {title: 'title.el', subtitle: 'description.el'},
  },
})
