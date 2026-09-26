import {defineField, defineType} from 'sanity'

export const testimonialV2 = defineType({
  name: 'testimonialV2',
  title: 'Κριτική (v2)',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Κριτική',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'name', title: 'Όνομα', type: 'string'}),
    defineField({name: 'role', title: 'Ρόλος', type: 'string'}),
    defineField({name: 'company', title: 'Εταιρεία', type: 'string'}),
    defineField({
      name: 'approved',
      title: 'Εγκεκριμένη',
      type: 'boolean',
      description: 'Μόνο οι εγκεκριμένες εμφανίζονται στο site.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'company', approved: 'approved', quote: 'quote'},
    prepare({title, subtitle, approved, quote}) {
      return {
        title: title || (quote as string | undefined)?.slice(0, 48) || 'Κριτική',
        subtitle: [subtitle, approved ? 'εγκεκριμένη' : 'σε αναμονή'].filter(Boolean).join(' · '),
      }
    },
  },
})
