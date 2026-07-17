import {defineField, defineType} from 'sanity'

export const approachPoint = defineType({
  name: 'approachPoint',
  title: 'Approach Point',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Material Symbol icon name (e.g., insights)',
    }),
  ],
  preview: {
    select: {title: 'title.el', subtitle: 'description.el'},
  },
})
