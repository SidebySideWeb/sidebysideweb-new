import {defineField, defineType} from 'sanity'

export const aboutNumberV2 = defineType({
  name: 'aboutNumberV2',
  title: 'Αριθμός (About)',
  type: 'object',
  fields: [
    defineField({name: 'value', title: 'Τιμή', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'label', title: 'Λεζάντα', type: 'string', validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}},
})

export const aboutPillar = defineType({
  name: 'aboutPillar',
  title: 'Ρόλος / δεξιότητα',
  type: 'object',
  fields: [
    defineField({name: 'indexLabel', title: 'Αριθμός', type: 'string'}),
    defineField({name: 'title', title: 'Τίτλος', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'text', title: 'Κείμενο', type: 'text', rows: 3}),
    defineField({name: 'proof', title: 'Απόδειξη', type: 'string'}),
  ],
  preview: {select: {title: 'title', subtitle: 'proof'}},
})

/** Named apart from legacy `aboutTimelineItem` (v1 about page). */
export const aboutCareerItem = defineType({
  name: 'aboutCareerItem',
  title: 'Σταθμός διαδρομής',
  type: 'object',
  fields: [
    defineField({name: 'period', title: 'Περίοδος', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'title', title: 'Τίτλος', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'text', title: 'Κείμενο', type: 'text', rows: 3}),
  ],
  preview: {select: {title: 'title', subtitle: 'period'}},
})

export const aboutEduItem = defineType({
  name: 'aboutEduItem',
  title: 'Σπουδές',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Τίτλος', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'text', title: 'Λεπτομέρεια', type: 'string'}),
  ],
  preview: {select: {title: 'label', subtitle: 'text'}},
})
