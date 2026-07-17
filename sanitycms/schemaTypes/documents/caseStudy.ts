import {defineField, defineType} from 'sanity'

const CATEGORY_OPTIONS = [
  {title: 'Automation & Workflows', value: 'automation-workflows'},
  {title: 'SaaS MVP', value: 'saas-mvp'},
  {title: 'ERP Integration', value: 'erp-integration'},
  {title: 'CRM Integration', value: 'crm-integration'},
  {title: 'Technical Project', value: 'technical-project'},
]

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'relations', title: 'Relations'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: (doc) => (doc.title as {el?: string} | undefined)?.el,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary (for card & hero)',
      type: 'localeText',
      group: 'content',
      description: 'Short 2-3 line summary for cards and hero subheading',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      options: {list: CATEGORY_OPTIONS, layout: 'radio'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured (Show on Homepage)',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      group: 'content',
      description: 'Lower numbers appear first on listings',
      initialValue: 0,
    }),
    defineField({
      name: 'heroMainResult',
      title: 'Hero Main Result',
      type: 'string',
      group: 'content',
      description: 'Primary result shown in the hero stats row (e.g. "40%", "250+ users")',
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'localeString',
          description: 'Describe the image for accessibility',
        }),
      ],
    }),
    defineField({
      name: 'featuredImageUrl',
      title: 'Featured Image URL (fallback)',
      type: 'url',
      group: 'media',
      description: 'External image URL used when no uploaded image is set',
    }),
    defineField({
      name: 'cardStats',
      title: 'Card Stats (Homepage)',
      type: 'array',
      group: 'content',
      of: [{type: 'cardStat'}],
      description:
        'Optional override for the 3 stats on homepage cards. Leave empty to auto-fill from results/investment.',
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'object',
      group: 'content',
      fields: [
        defineField({name: 'title', title: 'Problem Title', type: 'localeString'}),
        defineField({
          name: 'description',
          title: 'Problem Description',
          type: 'localeText',
          rows: 4,
        }),
        defineField({
          name: 'impact',
          title: 'Business Impact (summary)',
          type: 'localeText',
          rows: 3,
        }),
        defineField({
          name: 'bullets',
          title: 'Problem Bullets',
          type: 'array',
          of: [{type: 'localeString'}],
          description: 'Bullet points shown in the problem section',
        }),
        defineField({
          name: 'visualizationLabel',
          title: 'Visualization Label',
          type: 'localeString',
          description: 'Label under the problem chart',
        }),
      ],
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'object',
      group: 'content',
      fields: [
        defineField({name: 'title', title: 'Solution Title', type: 'localeString'}),
        defineField({
          name: 'description',
          title: 'Solution Description',
          type: 'localeRichText',
        }),
        defineField({
          name: 'technologies',
          title: 'Technologies Used',
          type: 'array',
          of: [{type: 'string'}],
        }),
        defineField({
          name: 'phases',
          title: 'Implementation Timeline',
          type: 'array',
          of: [{type: 'caseStudyPhase'}],
          description: 'Phases shown in the solution section timeline',
        }),
      ],
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'object',
      group: 'content',
      fields: [
        defineField({name: 'summary', title: 'Results Summary', type: 'localeText', rows: 3}),
        defineField({
          name: 'metrics',
          title: 'Key Metrics',
          type: 'array',
          of: [
            defineField({
              name: 'metric',
              type: 'object',
              fields: [
                defineField({name: 'label', title: 'Metric Label', type: 'localeString'}),
                defineField({name: 'value', title: 'Metric Value', type: 'string'}),
                defineField({
                  name: 'comparison',
                  title: 'Comparison / Before',
                  type: 'localeString',
                  description: 'e.g. "was 5-10/week", "vs €80-120k typical"',
                }),
              ],
              preview: {
                select: {title: 'value', subtitle: 'label.el'},
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'investment',
      title: 'Investment',
      type: 'object',
      group: 'content',
      fields: [
        defineField({name: 'amount', title: 'Amount', type: 'localeString'}),
        defineField({name: 'timeline', title: 'Timeline', type: 'localeString'}),
        defineField({name: 'breakdown', title: 'Cost Breakdown', type: 'localeText', rows: 3}),
        defineField({
          name: 'roi',
          title: 'ROI / Payback',
          type: 'localeString',
          description: 'e.g. "5 months", "300% ROI"',
        }),
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      group: 'content',
      fields: [
        defineField({name: 'quote', title: 'Quote', type: 'localeText', rows: 4}),
        defineField({name: 'author', title: 'Author Name', type: 'string'}),
        defineField({name: 'role', title: 'Author Role', type: 'localeString'}),
        defineField({name: 'company', title: 'Company', type: 'string'}),
      ],
    }),
    defineField({
      name: 'fullContent',
      title: 'Full Case Study Content',
      type: 'localeRichText',
      group: 'content',
      description: 'Optional long-form narrative section',
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      group: 'relations',
      of: [{type: 'reference', to: [{type: 'service'}]}],
      description: 'Services used in this project (shown on detail page)',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'localeString',
          description: 'Overrides page title for search engines',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'localeText',
          rows: 3,
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Newest First',
      name: 'createdDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.el',
      subtitle: 'category',
      media: 'featuredImage',
    },
    prepare({title, subtitle, media}) {
      const categoryLabel =
        CATEGORY_OPTIONS.find((option) => option.value === subtitle)?.title ?? subtitle
      return {
        title,
        subtitle: categoryLabel,
        media,
      }
    },
  },
})
