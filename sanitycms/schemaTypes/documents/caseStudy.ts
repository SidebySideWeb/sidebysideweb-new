import {defineField, defineType} from 'sanity'

const isAutomation = ({document}: {document?: {layout?: string}}) => document?.layout !== 'automation'
const isStrategy = ({document}: {document?: {layout?: string}}) => document?.layout !== 'strategy'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'sections', title: 'Page Sections'},
    {name: 'media', title: 'Media'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'layout',
      title: 'Page Layout',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Automation (Attiki-style)', value: 'automation'},
          {title: 'Strategy (Metaixmio-style)', value: 'strategy'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'automation',
    }),
    defineField({
      name: 'title',
      title: 'Title (H1)',
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
      name: 'tag',
      title: 'Hero Tag',
      type: 'localeString',
      group: 'content',
      description: 'e.g. Business Automation & Integration',
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'localeString',
      group: 'content',
    }),
    defineField({
      name: 'intro',
      title: 'Hero Intro',
      type: 'localeText',
      group: 'content',
      rows: 4,
    }),
    defineField({
      name: 'summary',
      title: 'Card Summary (Homepage)',
      type: 'localeText',
      group: 'content',
      rows: 3,
      description: 'Short text for homepage cards',
    }),
    defineField({
      name: 'chips',
      title: 'Hero Chips (Tech / Scope)',
      type: 'array',
      group: 'content',
      of: [{type: 'string'}],
      description: 'Tech stack (automation) or project scope labels (strategy)',
    }),
    defineField({
      name: 'chipsLabel',
      title: 'Chips Label',
      type: 'localeString',
      group: 'content',
      description: 'Optional label above chips, e.g. Εύρος έργου',
      hidden: isStrategy,
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
      initialValue: 0,
    }),
    defineField({
      name: 'heroMainResult',
      title: 'Hero Main Result (card fallback)',
      type: 'string',
      group: 'content',
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
        }),
      ],
    }),
    defineField({
      name: 'featuredImageUrl',
      title: 'Featured Image URL (fallback)',
      type: 'url',
      group: 'media',
    }),
    defineField({
      name: 'cardStats',
      title: 'Homepage Card Stats',
      type: 'array',
      group: 'content',
      of: [{type: 'cardStat'}],
      validation: (Rule) => Rule.max(3),
    }),

    // --- Automation layout sections ---
    defineField({
      name: 'challenges',
      title: 'Challenges',
      type: 'array',
      group: 'sections',
      of: [{type: 'caseStudyChallenge'}],
      description: 'Κύριες Προκλήσεις / Βασικές Προκλήσεις',
    }),
    defineField({
      name: 'costSection',
      title: 'Cost Section (Automation)',
      type: 'object',
      group: 'sections',
      hidden: isAutomation,
      fields: [
        defineField({name: 'title', title: 'Title', type: 'localeString'}),
        defineField({
          name: 'paragraphs',
          title: 'Paragraphs',
          type: 'array',
          of: [{type: 'localeText'}],
        }),
        defineField({
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [{type: 'localeString'}],
        }),
        defineField({name: 'closing', title: 'Closing', type: 'localeText', rows: 3}),
      ],
    }),
    defineField({
      name: 'resultStats',
      title: 'Result / Number Stats',
      type: 'array',
      group: 'sections',
      of: [{type: 'caseStudyStat'}],
      description: 'Αποτελέσματα (automation) or Το Έργο σε Αριθμούς (strategy)',
    }),
    defineField({
      name: 'beforeAfter',
      title: 'Before → After',
      type: 'array',
      group: 'sections',
      of: [{type: 'caseStudyBeforeAfter'}],
      hidden: isAutomation,
    }),
    defineField({
      name: 'whyItMatters',
      title: 'Why It Matters',
      type: 'object',
      group: 'sections',
      hidden: isAutomation,
      fields: [
        defineField({name: 'title', title: 'Title', type: 'localeString'}),
        defineField({
          name: 'paragraphs',
          title: 'Paragraphs',
          type: 'array',
          of: [{type: 'localeText'}],
        }),
      ],
    }),
    defineField({
      name: 'relatedServiceLabels',
      title: 'Related Service Labels',
      type: 'array',
      group: 'sections',
      of: [{type: 'localeString'}],
      hidden: isAutomation,
      description: 'Plain labels shown under “Σχετικές υπηρεσίες”',
    }),

    // --- Strategy layout sections ---
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      group: 'sections',
      of: [{type: 'caseStudyProcessStep'}],
      hidden: isStrategy,
    }),
    defineField({
      name: 'roleItems',
      title: 'My Role Items',
      type: 'array',
      group: 'sections',
      of: [{type: 'caseStudyRoleItem'}],
      hidden: isStrategy,
    }),
    defineField({
      name: 'outcomes',
      title: 'Outcomes',
      type: 'array',
      group: 'sections',
      of: [{type: 'caseStudyOutcome'}],
      hidden: isStrategy,
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'object',
      group: 'sections',
      hidden: isStrategy,
      fields: [
        defineField({name: 'quote', title: 'Quote', type: 'localeText', rows: 6}),
        defineField({name: 'author', title: 'Author Name', type: 'string'}),
        defineField({name: 'role', title: 'Author Role / Company line', type: 'localeString'}),
      ],
    }),

    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({name: 'metaTitle', title: 'Meta Title', type: 'localeString'}),
        defineField({name: 'metaDescription', title: 'Meta Description', type: 'localeText', rows: 3}),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.el',
      subtitle: 'layout',
      media: 'featuredImage',
    },
    prepare({title, subtitle, media}) {
      const layoutLabel = subtitle === 'strategy' ? 'Strategy' : 'Automation'
      return {title, subtitle: layoutLabel, media}
    },
  },
})
