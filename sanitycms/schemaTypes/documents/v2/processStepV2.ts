import {defineArrayMember, defineField, defineType} from 'sanity'

export const processStepV2 = defineType({
  name: 'processStepV2',
  title: 'Βήμα διαδικασίας (v2)',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Αριθμός',
      type: 'string',
      description: 'Π.χ. "01".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Τίτλος',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'durationLabel',
      title: 'Διάρκεια',
      type: 'string',
      description: 'Π.χ. "6–8 εβδομάδες", "ανά scope".',
    }),
    defineField({
      name: 'summary',
      title: 'Σύνοψη',
      type: 'text',
      rows: 3,
      description: 'Το κείμενο στο οριζόντιο scroller της αρχικής.',
    }),
    defineField({
      name: 'description',
      title: 'Περιγραφή',
      type: 'text',
      rows: 4,
      description: 'Το κείμενο στη σελίδα Πώς δουλεύω.',
    }),
    defineField({
      name: 'deliverables',
      title: 'Παραδοτέα',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'cardColour',
      title: 'Χρώμα κάρτας',
      type: 'string',
      initialValue: 'ink',
      options: {
        list: [
          {title: 'Ink', value: 'ink'},
          {title: 'Paper', value: 'paper'},
          {title: 'Marigold', value: 'marigold'},
          {title: 'Ink 2', value: 'ink2'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'chips',
      title: 'Chips',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'order',
      title: 'Σειρά',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [{title: 'Σειρά', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', subtitle: 'durationLabel', number: 'number'},
    prepare({title, subtitle, number}) {
      return {title: [number, title].filter(Boolean).join(' · '), subtitle}
    },
  },
})
