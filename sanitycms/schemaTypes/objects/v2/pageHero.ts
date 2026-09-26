import {defineArrayMember, defineField, defineType} from 'sanity'

export const pageHero = defineType({
  name: 'pageHero',
  title: 'Hero σελίδας',
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
    defineField({name: 'lead', title: 'Εισαγωγή', type: 'text', rows: 3}),
  ],
})
