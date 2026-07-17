import {defineField, defineType} from 'sanity'

export const aboutStorySection = defineType({
  name: 'aboutStorySection',
  title: 'Story Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localeText',
      rows: 4,
    }),
  ],
  preview: {
    select: {title: 'title.el', subtitle: 'content.el'},
  },
})
