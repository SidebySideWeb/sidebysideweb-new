import {defineField, defineType} from 'sanity'

/** Bilingual single-line text — Greek (primary) + English (secondary). */
export const localeString = defineType({
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fieldsets: [{name: 'translations', title: 'Translations', options: {columns: 1}}],
  fields: [
    defineField({
      name: 'el',
      title: 'Greek (primary)',
      type: 'string',
      fieldset: 'translations',
    }),
    defineField({
      name: 'en',
      title: 'English (secondary)',
      type: 'string',
      fieldset: 'translations',
    }),
  ],
})

/** Bilingual multi-line plain text. */
export const localeText = defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fieldsets: [{name: 'translations', title: 'Translations', options: {columns: 1}}],
  fields: [
    defineField({
      name: 'el',
      title: 'Greek (primary)',
      type: 'text',
      rows: 3,
      fieldset: 'translations',
    }),
    defineField({
      name: 'en',
      title: 'English (secondary)',
      type: 'text',
      rows: 3,
      fieldset: 'translations',
    }),
  ],
})

/** Bilingual rich text (Portable Text blocks). */
export const localeRichText = defineType({
  name: 'localeRichText',
  title: 'Localized rich text',
  type: 'object',
  fieldsets: [{name: 'translations', title: 'Translations', options: {columns: 1}}],
  fields: [
    defineField({
      name: 'el',
      title: 'Greek (primary)',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'translations',
    }),
    defineField({
      name: 'en',
      title: 'English (secondary)',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'translations',
    }),
  ],
})
