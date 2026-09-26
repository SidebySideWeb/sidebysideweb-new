import {defineField, defineType} from 'sanity'

export const fact = defineType({
  name: 'fact',
  title: 'Αριθμός',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Τιμή',
      type: 'string',
      description: 'Π.χ. "1", "6–8", "100". Οι αριθμοί μέσα στην τιμή μετρούν από το μηδέν.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'suffix',
      title: 'Κατάληξη',
      type: 'string',
      description: 'Π.χ. "%".',
    }),
    defineField({
      name: 'highlightSuffix',
      title: 'Κατάληξη σε marigold',
      type: 'boolean',
      initialValue: false,
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
