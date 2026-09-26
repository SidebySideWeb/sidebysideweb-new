import {defineArrayMember, defineField, defineType} from 'sanity'

const STYLES = [
  {title: 'Κανονικό', value: 'normal'},
  {title: 'Thin (weight 200)', value: 'thin'},
  {title: 'Marigold', value: 'marigold'},
]

export const headingLinePart = defineType({
  name: 'headingLinePart',
  title: 'Κομμάτι γραμμής',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Κείμενο',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'style',
      title: 'Στυλ',
      type: 'string',
      initialValue: 'normal',
      options: {list: STYLES, layout: 'radio'},
    }),
  ],
  preview: {
    select: {title: 'text', subtitle: 'style'},
  },
})

/** One animated line of a big headline. Parts let a single line mix styles. */
export const headingLine = defineType({
  name: 'headingLine',
  title: 'Γραμμή τίτλου',
  type: 'object',
  fields: [
    defineField({
      name: 'parts',
      title: 'Κομμάτια',
      type: 'array',
      of: [defineArrayMember({type: 'headingLinePart'})],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {parts: 'parts'},
    prepare({parts}) {
      const items = (parts as {text?: string}[] | undefined) ?? []
      return {title: items.map((p) => p.text).filter(Boolean).join(' ') || 'Κενή γραμμή'}
    },
  },
})
