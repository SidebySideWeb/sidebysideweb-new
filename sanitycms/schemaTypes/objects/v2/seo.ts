import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'title',
      title: 'Τίτλος',
      type: 'string',
      validation: (Rule) => Rule.max(70).warning('Πάνω από 70 χαρακτήρες κόβεται στα αποτελέσματα.'),
    }),
    defineField({
      name: 'description',
      title: 'Περιγραφή',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.max(180).warning('Πάνω από 180 χαρακτήρες κόβεται στα αποτελέσματα.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
