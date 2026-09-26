import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettingsV2 = defineType({
  name: 'siteSettingsV2',
  title: 'Site Settings (v2)',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'Όνομα',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'linkedInUrl', title: 'LinkedIn', type: 'url'}),
    defineField({
      name: 'legalLine',
      title: 'Νομικά στοιχεία',
      type: 'string',
      description: 'Η γραμμή στο footer, π.χ. ΑΦΜ.',
    }),
    defineField({
      name: 'primaryNav',
      title: 'Κύριο μενού',
      type: 'array',
      of: [defineArrayMember({type: 'linkItem'})],
    }),
    defineField({name: 'headerCta', title: 'CTA κεφαλίδας', type: 'cta'}),
    defineField({name: 'footerTagline', title: 'Footer tagline', type: 'string'}),
    defineField({name: 'footerSub', title: 'Footer υπότιτλος', type: 'string'}),
    defineField({
      name: 'footerColumns',
      title: 'Στήλες footer',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          title: 'Στήλη',
          fields: [
            defineField({
              name: 'title',
              title: 'Τίτλος',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Σύνδεσμοι',
              type: 'array',
              of: [defineArrayMember({type: 'linkItem'})],
            }),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),
    defineField({
      name: 'endorsedProducts',
      title: 'Δικά μου προϊόντα',
      type: 'array',
      of: [defineArrayMember({type: 'linkItem'})],
    }),
    defineField({name: 'defaultSeo', title: 'Προεπιλεγμένο SEO', type: 'seo'}),
  ],
  preview: {
    prepare: () => ({title: 'Site Settings (v2)'}),
  },
})
