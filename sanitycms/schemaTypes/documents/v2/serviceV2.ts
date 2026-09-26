import {defineArrayMember, defineField, defineType} from 'sanity'

/** v2 service. No price fields: prices are never shown on the public site. */
export const serviceV2 = defineType({
  name: 'serviceV2',
  title: 'Υπηρεσία (v2)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Τίτλος',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Σειρά',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'indexLabel',
      title: 'Αριθμός καρτέλας',
      type: 'string',
      description: 'Π.χ. "01".',
    }),
    defineField({
      name: 'badge',
      title: 'Σήμανση',
      type: 'string',
      description: 'Π.χ. "Εδώ ξεκινούν οι περισσότεροι".',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Σύντομη περιγραφή',
      type: 'text',
      rows: 2,
      description: 'Η γραμμή στη λίστα υπηρεσιών της αρχικής.',
    }),
    defineField({
      name: 'description',
      title: 'Περιγραφή',
      type: 'text',
      rows: 3,
      description: 'Το κείμενο της κάρτας στη σελίδα Υπηρεσίες.',
    }),
    defineField({name: 'homeRowTitle', title: 'Τίτλος στην αρχική', type: 'string'}),
    defineField({
      name: 'homeMetaShort',
      title: 'Meta στην αρχική',
      type: 'string',
      description: 'Π.χ. "6–8 εβδ.", "ανά scope".',
    }),
    defineField({
      name: 'bullets',
      title: 'Τι περιλαμβάνει',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'metaLabel',
      title: 'Meta label',
      type: 'string',
      description: 'Διάρκεια ή τρόπος χρέωσης, π.χ. "6–8 εβδομάδες", "ανά έργο".',
    }),
    defineField({
      name: 'metaNote',
      title: 'Meta σημείωση',
      type: 'string',
      description: 'Π.χ. "σταθερό scope, γραπτή προσφορά".',
    }),
    defineField({
      name: 'variant',
      title: 'Μορφή κάρτας',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Featured', value: 'featured'},
          {title: 'Wide', value: 'wide'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'category',
      title: 'Κατηγορία',
      type: 'string',
      initialValue: 'core',
      options: {
        list: [
          {title: 'Core', value: 'core'},
          {title: 'Docs', value: 'docs'},
          {title: 'PM', value: 'pm'},
          {title: 'Agency', value: 'agency'},
        ],
      },
    }),
    defineField({
      name: 'showOnHomeRows',
      title: 'Εμφάνιση στη λίστα της αρχικής',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {title: 'Σειρά', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'metaLabel', index: 'indexLabel'},
    prepare({title, subtitle, index}) {
      return {title: [index, title].filter(Boolean).join(' · '), subtitle}
    },
  },
})
