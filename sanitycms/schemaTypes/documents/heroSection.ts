import {defineField, defineType} from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline (H1)',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'localeString',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      initialValue: '#contact',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text', type: 'localeString'})],
    }),
    defineField({
      name: 'heroImageUrl',
      title: 'Hero Image URL (fallback)',
      type: 'url',
      description: 'External image URL used when no uploaded hero image is set',
    }),
    defineField({
      name: 'trustSignals',
      title: 'Trust Signals',
      type: 'array',
      of: [
        defineField({
          name: 'signal',
          title: 'Trust signal',
          type: 'object',
          fields: [
            defineField({name: 'text', title: 'Signal Text', type: 'localeString'}),
            defineField({
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Material Symbol icon name (e.g., check_circle)',
            }),
          ],
          preview: {
            select: {title: 'text.el', subtitle: 'icon'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'headline.el', subtitle: 'subheading.el'},
    prepare({title, subtitle}) {
      return {
        title: title || 'Hero Section',
        subtitle: subtitle ? subtitle.slice(0, 80) : undefined,
      }
    },
  },
})
