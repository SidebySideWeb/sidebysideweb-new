import {defineField, defineType} from 'sanity'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'Ερώτηση',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Ερώτηση',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Απάντηση',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'question', subtitle: 'answer'},
  },
})
