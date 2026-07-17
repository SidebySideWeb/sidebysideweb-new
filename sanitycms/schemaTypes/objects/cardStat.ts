import {defineField, defineType} from 'sanity'

export const cardStat = defineType({
  name: 'cardStat',
  title: 'Card Stat',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'value', subtitle: 'label.el'},
  },
})
