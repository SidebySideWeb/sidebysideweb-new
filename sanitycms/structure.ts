import type {StructureResolver} from 'sanity/structure'

const V2_SINGLETONS = [
  {id: 'siteSettingsV2', title: 'Site Settings V2', schemaType: 'siteSettingsV2'},
  {id: 'homePage', title: 'Αρχική', schemaType: 'homePage'},
  {id: 'servicesPage', title: 'Υπηρεσίες', schemaType: 'servicesPage'},
  {id: 'processPage', title: 'Πώς δουλεύω', schemaType: 'processPage'},
  {id: 'workPage', title: 'Έργα', schemaType: 'workPage'},
  {id: 'aboutPageV2', title: 'Ποιος είμαι', schemaType: 'aboutPageV2'},
  {id: 'contactPage', title: 'Επικοινωνία', schemaType: 'contactPage'},
]

const LEGACY_SINGLETONS = [
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
      ...V2_SINGLETONS.map((item) =>
        S.listItem()
          .id(item.id)
          .title(item.title)
          .child(S.document().schemaType(item.schemaType).documentId(item.id)),
      ),

      S.divider(),

      S.listItem()
        .id('serviceV2List')
        .title('Υπηρεσίες (v2)')
        .child(
          S.documentTypeList('serviceV2')
            .title('Υπηρεσίες (v2)')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),

      S.listItem()
        .id('processStepV2List')
        .title('Βήματα διαδικασίας (v2)')
        .child(
          S.documentTypeList('processStepV2')
            .title('Βήματα διαδικασίας (v2)')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),

      S.listItem()
        .id('caseStudyV2List')
        .title('Έργα (v2)')
        .child(
          S.documentTypeList('caseStudyV2')
            .title('Έργα (v2)')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),

      S.listItem()
        .id('testimonialV2List')
        .title('Κριτικές (v2)')
        .child(S.documentTypeList('testimonialV2').title('Κριτικές (v2)')),

      S.divider(),

      S.listItem()
        .id('formSubmissions')
        .title('Form Submissions')
        .child(
          S.documentTypeList('formSubmission')
            .title('Form Submissions')
            .defaultOrdering([{field: 'submittedAt', direction: 'desc'}]),
        ),

      S.divider(),

      S.listItem()
        .id('legacyV1')
        .title('Legacy (v1)')
        .child(
          S.list()
            .title('Legacy (v1)')
            .items([
              ...LEGACY_SINGLETONS.map((item) =>
                S.listItem()
                  .id(`legacy-${item.id}`)
                  .title(item.title)
                  .child(S.document().schemaType(item.schemaType).documentId(item.id)),
              ),

              S.divider(),

              S.listItem()
                .id('legacy-services')
                .title('Services')
                .child(
                  S.documentTypeList('service')
                    .title('Services')
                    .defaultOrdering([{field: 'order', direction: 'asc'}]),
                ),

              S.listItem()
                .id('legacy-processSteps')
                .title('Process Steps')
                .child(
                  S.documentTypeList('processStep')
                    .title('Process Steps')
                    .defaultOrdering([{field: 'stepNumber', direction: 'asc'}]),
                ),

              S.listItem()
                .id('legacy-caseStudies')
                .title('Case Studies')
                .child(
                  S.documentTypeList('caseStudy')
                    .title('Case Studies')
                    .defaultOrdering([{field: 'order', direction: 'asc'}]),
                ),

              S.listItem()
                .id('legacy-testimonials')
                .title('Testimonials')
                .child(S.documentTypeList('testimonial').title('Testimonials')),

              S.listItem()
                .id('legacy-faqs')
                .title('FAQs')
                .child(
                  S.documentTypeList('faq')
                    .title('FAQs')
                    .defaultOrdering([{field: 'order', direction: 'asc'}]),
                ),

              S.listItem()
                .id('legacy-blogPosts')
                .title('Blog Posts')
                .child(S.documentTypeList('blogPost').title('Blog Posts')),
            ]),
        ),
    ])
