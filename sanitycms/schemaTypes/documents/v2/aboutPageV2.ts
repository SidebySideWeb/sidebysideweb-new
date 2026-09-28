import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutPageV2 = defineType({
  name: 'aboutPageV2',
  title: 'Σελίδα Ποιος είμαι (v2)',
  type: 'document',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero'}),
    defineField({name: 'personName', title: 'Όνομα', type: 'string'}),
    defineField({name: 'personRole', title: 'Ρόλος', type: 'string'}),
    defineField({
      name: 'portrait',
      title: 'Φωτογραφία',
      type: 'image',
      options: {hotspot: true},
      description: 'Αν λείπει, εμφανίζεται το placeholder με τις διακεκομμένες γραμμές.',
      fields: [defineField({name: 'alt', title: 'Alt', type: 'string'})],
    }),
    defineField({
      name: 'portraitPlaceholder',
      title: 'Κείμενο placeholder φωτογραφίας',
      type: 'text',
      rows: 2,
    }),
    defineField({name: 'bio', title: 'Βιογραφικό', type: 'richTextV2'}),
    defineField({
      name: 'ctas',
      title: 'Κουμπιά',
      type: 'array',
      of: [defineArrayMember({type: 'cta'})],
    }),
    defineField({
      name: 'numbers',
      title: 'Ζώνη αριθμών',
      type: 'array',
      of: [defineArrayMember({type: 'aboutNumberV2'})],
    }),
    defineField({
      name: 'rolesSection',
      title: 'Τι φέρνω στο τραπέζι',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'heading', title: 'Τίτλος', type: 'string'}),
        defineField({name: 'intro', title: 'Εισαγωγή', type: 'text', rows: 3}),
        defineField({
          name: 'roles',
          title: 'Ρόλοι',
          type: 'array',
          of: [defineArrayMember({type: 'aboutPillar'})],
        }),
      ],
    }),
    defineField({
      name: 'sectorsSection',
      title: 'Κλάδοι',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'heading', title: 'Τίτλος', type: 'string'}),
        defineField({
          name: 'items',
          title: 'Κλάδοι',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'brandsSection',
      title: 'Brands',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'heading', title: 'Τίτλος', type: 'string'}),
        defineField({name: 'note', title: 'Σημείωση', type: 'string'}),
        defineField({
          name: 'items',
          title: 'Brands',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'timelineSection',
      title: 'Διαδρομή',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'heading', title: 'Τίτλος', type: 'string'}),
        defineField({
          name: 'items',
          title: 'Σταθμοί',
          type: 'array',
          of: [defineArrayMember({type: 'aboutCareerItem'})],
        }),
      ],
    }),
    defineField({
      name: 'education',
      title: 'Σπουδές',
      type: 'array',
      of: [defineArrayMember({type: 'aboutEduItem'})],
    }),
    defineField({
      name: 'tools',
      title: 'Εργαλεία',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'languages',
      title: 'Γλώσσες',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'productsSection',
      title: 'Δικά μου προϊόντα',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'heading', title: 'Τίτλος', type: 'string'}),
        defineField({
          name: 'cases',
          title: 'Έργα',
          type: 'array',
          of: [defineArrayMember({type: 'reference', to: [{type: 'caseStudyV2'}]})],
        }),
      ],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Σελίδα Ποιος είμαι (v2)'})},
})
