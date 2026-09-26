import {defineArrayMember, defineField, defineType} from 'sanity'

export const caseStudyV2 = defineType({
  name: 'caseStudyV2',
  title: 'Έργο (v2)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Όνομα',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Είδος',
      type: 'string',
      initialValue: 'product',
      options: {
        list: [
          {title: 'Δικό μου προϊόν', value: 'product'},
          {title: 'Έργο πελάτη', value: 'client'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'tag',
      title: 'Ετικέτα',
      type: 'string',
      description: 'Π.χ. "Δικό μου SaaS".',
    }),
    defineField({name: 'sector', title: 'Κλάδος', type: 'string'}),
    defineField({
      name: 'headline',
      title: 'Τίτλος',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'short', title: 'Σύντομη περιγραφή', type: 'text', rows: 2}),
    defineField({name: 'role', title: 'Ρόλος', type: 'string'}),
    defineField({name: 'duration', title: 'Διάρκεια', type: 'string'}),
    defineField({
      name: 'stack',
      title: 'Stack',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'problem', title: 'Το πρόβλημα', type: 'text', rows: 6}),
    defineField({name: 'approach', title: 'Η προσέγγιση', type: 'text', rows: 6}),
    defineField({name: 'solution', title: 'Η λύση', type: 'text', rows: 6}),
    defineField({
      name: 'results',
      title: 'Τι άλλαξε',
      type: 'array',
      of: [defineArrayMember({type: 'resultStat'})],
    }),
    defineField({
      name: 'artKey',
      title: 'Γραφικό',
      type: 'string',
      initialValue: 'kollekta',
      options: {
        list: [
          {title: 'Kollekta', value: 'kollekta'},
          {title: 'Site', value: 'site'},
          {title: 'Audit', value: 'audit'},
          {title: 'ERP', value: 'erp'},
          {title: 'B2B', value: 'b2b'},
        ],
      },
    }),
    defineField({
      name: 'coverImage',
      title: 'Εικόνα εξωφύλλου',
      type: 'image',
      description: 'Αν οριστεί, αντικαθιστά το γραφικό.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'isPlaceholder',
      title: 'Placeholder',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'reviewNote',
      title: 'Σημείωση «Προς έλεγχο»',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: 'Σειρά',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  orderings: [{title: 'Σειρά', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', subtitle: 'sector', media: 'coverImage'},
  },
})
