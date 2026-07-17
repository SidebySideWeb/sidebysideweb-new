import {defineField, defineType} from 'sanity'

export const aboutStat = defineType({
  name: 'aboutStat',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value (number for animation)',
      type: 'string',
      description: 'e.g. "50", "15", "2", "100"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'suffix',
      title: 'Suffix',
      type: 'string',
      description: 'e.g. "+", "M+", "%"',
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
    prepare({title, subtitle}) {
      return {title: `${title ?? ''}`, subtitle}
    },
  },
})
