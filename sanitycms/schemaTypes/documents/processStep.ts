import {defineField, defineType} from 'sanity'

export const processStep = defineType({
  name: 'processStep',
  title: 'Process Step',
  type: 'document',
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Step Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Step Description',
      type: 'localeText',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
    }),
  ],
  orderings: [
    {
      title: 'Step Number',
      name: 'stepNumberAsc',
      by: [{field: 'stepNumber', direction: 'asc'}],
    },
  ],
})
