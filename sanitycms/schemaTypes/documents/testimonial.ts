import {defineField, defineType} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Author Role/Title',
      type: 'localeString',
    }),
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Author Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      initialValue: 5,
    }),
  ],
})
