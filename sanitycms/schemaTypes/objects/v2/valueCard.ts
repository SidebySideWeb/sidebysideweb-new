import {defineField, defineType} from 'sanity'

export const valueCard = defineType({
  name: 'valueCard',
  title: 'Κάρτα αξίας',
  type: 'object',
  fields: [
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Το μικρό mono label πάνω αριστερά.',
    }),
    defineField({
      name: 'title',
      title: 'Τίτλος',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'text', title: 'Κείμενο', type: 'text', rows: 3}),
    defineField({
      name: 'bigGlyph',
      title: 'Μεγάλο σύμβολο',
      type: 'string',
      description: 'Το διακοσμητικό σύμβολο στο φόντο, π.χ. "01" ή "✕".',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'kicker'},
  },
})
