import {defineField, defineType} from 'sanity'

/** Plain label + href pair used by nav, footer columns and endorsed products. */
export const linkItem = defineType({
  name: 'linkItem',
  title: 'Σύνδεσμος',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Κείμενο',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Σύνδεσμος',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'href'},
  },
})
