import {defineField, defineType} from 'sanity'

export const resultStat = defineType({
  name: 'resultStat',
  title: 'Αποτέλεσμα',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Τιμή',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Λεζάντα',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'value', subtitle: 'label'},
  },
})
