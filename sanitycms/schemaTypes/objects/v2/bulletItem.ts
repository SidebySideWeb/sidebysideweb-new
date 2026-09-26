import {defineField, defineType} from 'sanity'

export const bulletItem = defineType({
  name: 'bulletItem',
  title: 'Στοιχείο λίστας',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Τίτλος',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'text', title: 'Κείμενο', type: 'text', rows: 2}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'text'},
  },
})
