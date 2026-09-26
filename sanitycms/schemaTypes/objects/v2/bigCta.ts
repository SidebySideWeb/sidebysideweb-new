import {defineArrayMember, defineField, defineType} from 'sanity'

export const bigCta = defineType({
  name: 'bigCta',
  title: 'Μεγάλο CTA',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'headingLines',
      title: 'Γραμμές τίτλου',
      type: 'array',
      of: [defineArrayMember({type: 'headingLine'})],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'ctas',
      title: 'Κουμπιά',
      type: 'array',
      of: [defineArrayMember({type: 'cta'})],
    }),
    defineField({
      name: 'showEmail',
      title: 'Εμφάνιση email με κουμπί αντιγραφής',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
