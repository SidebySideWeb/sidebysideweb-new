import {defineArrayMember, defineField, defineType} from 'sanity'

const option = defineArrayMember({
  type: 'object',
  name: 'formOption',
  title: 'Επιλογή',
  fields: [
    defineField({
      name: 'value',
      title: 'Τιμή',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Κείμενο',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'value'}},
})

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Σελίδα Επικοινωνία',
  type: 'document',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero'}),
    defineField({
      name: 'form',
      title: 'Φόρμα',
      type: 'object',
      fields: [
        defineField({name: 'nameLabel', title: 'Όνομα', type: 'string'}),
        defineField({name: 'namePlaceholder', title: 'Όνομα (placeholder)', type: 'string'}),
        defineField({name: 'emailLabel', title: 'Email', type: 'string'}),
        defineField({name: 'emailPlaceholder', title: 'Email (placeholder)', type: 'string'}),
        defineField({name: 'companyLabel', title: 'Εταιρεία', type: 'string'}),
        defineField({name: 'companyPlaceholder', title: 'Εταιρεία (placeholder)', type: 'string'}),
        defineField({name: 'needLegend', title: 'Τι χρειάζεσαι', type: 'string'}),
        defineField({name: 'budgetLegend', title: 'Ενδεικτικό budget', type: 'string'}),
        defineField({name: 'messageLabel', title: 'Μήνυμα', type: 'string'}),
        defineField({name: 'messagePlaceholder', title: 'Μήνυμα (placeholder)', type: 'text', rows: 3}),
        defineField({name: 'submitLabel', title: 'Κουμπί αποστολής', type: 'string'}),
      ],
    }),
    defineField({
      name: 'needOptions',
      title: 'Επιλογές «Τι χρειάζεσαι»',
      type: 'array',
      of: [option],
    }),
    defineField({
      name: 'budgetOptions',
      title: 'Επιλογές budget',
      type: 'array',
      of: [option],
    }),
    defineField({name: 'privacyNote', title: 'Σημείωση ιδιωτικότητας', type: 'string'}),
    defineField({name: 'successMessage', title: 'Μήνυμα επιτυχίας', type: 'text', rows: 3}),
    defineField({
      name: 'nextStepsTitle',
      title: 'Τίτλος «Τι γίνεται μετά»',
      type: 'string',
    }),
    defineField({
      name: 'nextSteps',
      title: 'Τι γίνεται μετά',
      type: 'array',
      of: [defineArrayMember({type: 'bulletItem'})],
    }),
    defineField({name: 'directLabel', title: 'Ετικέτα «Ή κατευθείαν»', type: 'string'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Σελίδα Επικοινωνία'})},
})
