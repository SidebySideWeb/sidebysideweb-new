import {defineField, defineType} from 'sanity'

export const docCard = defineType({
  name: 'docCard',
  title: 'Έγγραφο',
  type: 'object',
  fields: [
    defineField({
      name: 'code',
      title: 'Κωδικός',
      type: 'string',
      description: 'Π.χ. BRD, FSD, RFP.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Τίτλος',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'text', title: 'Κείμενο', type: 'text', rows: 3}),
    defineField({name: 'audience', title: 'Για ποιον', type: 'string'}),
  ],
  preview: {
    select: {title: 'code', subtitle: 'title'},
  },
})
