import {defineField, defineType} from 'sanity'

export const workPage = defineType({
  name: 'workPage',
  title: 'Σελίδα Έργα',
  type: 'document',
  fields: [
    defineField({name: 'hero', title: 'Hero', type: 'pageHero'}),
    defineField({
      name: 'filterLabels',
      title: 'Φίλτρα',
      type: 'object',
      fields: [
        defineField({name: 'all', title: 'Όλα', type: 'string'}),
        defineField({name: 'product', title: 'Δικά μου προϊόντα', type: 'string'}),
        defineField({name: 'client', title: 'Έργα πελατών', type: 'string'}),
      ],
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {prepare: () => ({title: 'Σελίδα Έργα'})},
})
