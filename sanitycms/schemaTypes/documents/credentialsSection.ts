import {defineField, defineType} from 'sanity'

export const credentialsSection = defineType({
  name: 'credentialsSection',
  title: 'Credentials Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'localeString',
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      of: [
        defineField({
          name: 'credential',
          title: 'Credential',
          type: 'object',
          fields: [
            defineField({name: 'stat', title: 'Statistic', type: 'string'}),
            defineField({name: 'label', title: 'Label', type: 'localeString'}),
            defineField({name: 'description', title: 'Description', type: 'localeText'}),
            defineField({name: 'icon', title: 'Icon Name', type: 'string'}),
          ],
          preview: {
            select: {title: 'stat', subtitle: 'label.el'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'headline.el'},
    prepare({title}) {
      return {title: title || 'Credentials Section'}
    },
  },
})
