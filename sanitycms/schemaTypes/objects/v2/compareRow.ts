import {defineField, defineType} from 'sanity'

export const compareRow = defineType({
  name: 'compareRow',
  title: 'Γραμμή σύγκρισης',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Ερώτηση',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'typicalAnswer',
      title: 'Τυπική προσέγγιση',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ourAnswer',
      title: 'Side by Side',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'question', subtitle: 'ourAnswer'},
  },
})
