import type {StructureResolver} from 'sanity/structure'

const SINGLETONS = [
  {id: 'siteSettings', title: 'Site Settings', schemaType: 'siteSettings'},
  {id: 'heroSection', title: 'Hero Section', schemaType: 'heroSection'},
  {id: 'credentialsSection', title: 'Credentials', schemaType: 'credentialsSection'},
  {id: 'valueProposition', title: 'Value Proposition', schemaType: 'valueProposition'},
  {id: 'aboutPage', title: 'About Page', schemaType: 'aboutPage'},
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map((item) =>
        S.listItem()
          .title(item.title)
          .child(S.document().schemaType(item.schemaType).documentId(item.id)),
      ),

      S.divider(),

      S.listItem()
        .title('Services')
        .child(
          S.documentTypeList('service')
            .title('Services')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Process Steps')
        .child(
          S.documentTypeList('processStep')
            .title('Process Steps')
            .defaultOrdering([{field: 'stepNumber', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Case Studies')
        .child(
          S.documentTypeList('caseStudy')
            .title('Case Studies')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Testimonials')
        .child(S.documentTypeList('testimonial').title('Testimonials')),

      S.listItem()
        .title('FAQs')
        .child(
          S.documentTypeList('faq')
            .title('FAQs')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),

      S.listItem()
        .title('Blog Posts')
        .child(S.documentTypeList('blogPost').title('Blog Posts')),
    ])
