import {defineArrayMember, defineField, defineType} from 'sanity'

const checkItem = defineArrayMember({
  type: 'object',
  name: 'auditCheckItem',
  title: 'Έλεγχος',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon key',
      type: 'string',
      options: {
        list: [
          {title: 'Προσβασιμότητα', value: 'i-a11y'},
          {title: 'Ταχύτητα', value: 'i-perf'},
          {title: 'AI', value: 'i-geo'},
          {title: 'Ασφάλεια', value: 'i-sec'},
          {title: 'Τεχνική', value: 'i-qa'},
        ],
      },
    }),
    defineField({name: 'title', title: 'Τίτλος', type: 'string'}),
    defineField({name: 'text', title: 'Κείμενο', type: 'text', rows: 3}),
    defineField({name: 'highlight', title: 'Τονισμένη κάρτα', type: 'boolean'}),
  ],
  preview: {select: {title: 'title', subtitle: 'icon'}},
})

const sampleRow = defineArrayMember({
  type: 'object',
  name: 'auditSampleRow',
  title: 'Εύρημα',
  fields: [
    defineField({name: 'severity', title: 'Σοβαρότητα', type: 'string'}),
    defineField({name: 'finding', title: 'Εύρημα', type: 'string'}),
    defineField({name: 'category', title: 'Κατηγορία', type: 'string'}),
    defineField({name: 'priority', title: 'Προτεραιότητα', type: 'string'}),
  ],
  preview: {select: {title: 'finding', subtitle: 'severity'}},
})

export const auditPage = defineType({
  name: 'auditPage',
  title: 'Σελίδα Audit',
  type: 'document',
  fields: [
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({
          name: 'headingLines',
          title: 'Γραμμές τίτλου',
          type: 'array',
          of: [defineArrayMember({type: 'headingLine'})],
        }),
        defineField({name: 'subhead', title: 'Υπότιτλος', type: 'text', rows: 3}),
        defineField({name: 'cta', title: 'CTA', type: 'string'}),
        defineField({
          name: 'readers',
          title: 'Ετικέτες readers',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
        }),
      ],
    }),
    defineField({
      name: 'why',
      title: 'Γιατί τώρα',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({
          name: 'statement',
          title: 'Μεγάλη δήλωση',
          type: 'text',
          rows: 3,
          description: 'Χρησιμοποίησε **λέξη** για marigold.',
        }),
        defineField({
          name: 'paragraphs',
          title: 'Παράγραφοι',
          type: 'array',
          of: [defineArrayMember({type: 'text'})],
        }),
      ],
    }),
    defineField({
      name: 'checks',
      title: 'Τι ελέγχεται',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({
          name: 'heading',
          title: 'Τίτλος',
          type: 'string',
          description: 'Χρησιμοποίησε **λέξη** για marigold.',
        }),
        defineField({name: 'items', title: 'Κάρτες', type: 'array', of: [checkItem]}),
      ],
    }),
    defineField({
      name: 'how',
      title: 'Πώς δουλεύει',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'heading', title: 'Τίτλος', type: 'string'}),
        defineField({
          name: 'paragraphs',
          title: 'Παράγραφοι',
          type: 'array',
          of: [defineArrayMember({type: 'text'})],
        }),
        defineField({
          name: 'visual',
          title: 'Visual αριθμοί',
          type: 'object',
          fields: [
            defineField({name: 'pages', title: 'Σελίδες', type: 'string'}),
            defineField({name: 'pagesLabel', title: 'Ετικέτα σελίδων', type: 'string'}),
            defineField({name: 'templates', title: 'Τύποι', type: 'string'}),
            defineField({name: 'templatesLabel', title: 'Ετικέτα τύπων', type: 'string'}),
            defineField({name: 'checks', title: 'Έλεγχοι', type: 'string'}),
            defineField({name: 'checksLabel', title: 'Ετικέτα ελέγχων', type: 'string'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'deliverable',
      title: 'Τι παίρνεις',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'heading', title: 'Τίτλος', type: 'string'}),
        defineField({
          name: 'paragraphs',
          title: 'Παράγραφοι',
          type: 'array',
          of: [defineArrayMember({type: 'text'})],
        }),
        defineField({
          name: 'sample',
          title: 'Παράδειγμα αναφοράς',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Τίτλος', type: 'string'}),
            defineField({name: 'tag', title: 'Tag', type: 'string'}),
            defineField({name: 'summaryLabel', title: 'Ετικέτα σύνοψης', type: 'string'}),
            defineField({name: 'summary', title: 'Σύνοψη', type: 'text', rows: 3}),
            defineField({name: 'rows', title: 'Ευρήματα', type: 'array', of: [sampleRow]}),
            defineField({name: 'note', title: 'Σημείωση', type: 'string'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'CTA + φόρμα',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'heading', title: 'Τίτλος', type: 'string'}),
        defineField({name: 'body', title: 'Κείμενο', type: 'text', rows: 2}),
        defineField({name: 'button', title: 'Κουμπί', type: 'string'}),
        defineField({
          name: 'form',
          title: 'Φόρμα',
          type: 'object',
          fields: [
            defineField({name: 'urlLabel', title: 'URL label', type: 'string'}),
            defineField({name: 'urlPlaceholder', title: 'URL placeholder', type: 'string'}),
            defineField({name: 'nameLabel', title: 'Όνομα', type: 'string'}),
            defineField({name: 'namePlaceholder', title: 'Όνομα placeholder', type: 'string'}),
            defineField({name: 'emailLabel', title: 'Email', type: 'string'}),
            defineField({name: 'emailPlaceholder', title: 'Email placeholder', type: 'string'}),
            defineField({name: 'noteLabel', title: 'Σημείωση', type: 'string'}),
            defineField({name: 'notePlaceholder', title: 'Σημείωση placeholder', type: 'string'}),
            defineField({name: 'hint', title: 'Hint', type: 'string'}),
            defineField({name: 'success', title: 'Επιτυχία', type: 'text', rows: 2}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'object',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'heading', title: 'Τίτλος', type: 'string'}),
        defineField({
          name: 'items',
          title: 'Ερωτήσεις',
          type: 'array',
          of: [defineArrayMember({type: 'faqItem'})],
        }),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Σελίδα Audit'})},
})
