import {defineField, defineType} from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'CTA',
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
      description: 'Εσωτερικό path (π.χ. /epikoinonia) ή πλήρες URL.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Στυλ',
      type: 'string',
      initialValue: 'm',
      options: {
        list: [
          {title: 'Marigold (m)', value: 'm'},
          {title: 'Ghost (g)', value: 'g'},
          {title: 'Paper (p)', value: 'p'},
          {title: 'Ink (i)', value: 'i'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'href'},
  },
})
