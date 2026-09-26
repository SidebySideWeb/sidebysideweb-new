import {blockContent} from './objects/blockContent'
import {localeString, localeText, localeRichText} from './objects/locale'
import {aboutComparison} from './objects/aboutComparison'
import {aboutStat} from './objects/aboutStat'
import {aboutStorySection} from './objects/aboutStorySection'
import {aboutTimelineItem} from './objects/aboutTimelineItem'
import {approachPoint} from './objects/approachPoint'
import {cardStat} from './objects/cardStat'
import {
  caseStudyBeforeAfter,
  caseStudyChallenge,
  caseStudyOutcome,
  caseStudyProcessStep,
  caseStudyRoleItem,
  caseStudyStat,
} from './objects/caseStudySections'
import {siteSettings} from './documents/siteSettings'
import {heroSection} from './documents/heroSection'
import {service} from './documents/service'
import {processStep} from './documents/processStep'
import {caseStudy} from './documents/caseStudy'
import {testimonial} from './documents/testimonial'
import {faq} from './documents/faq'
import {blogPost} from './documents/blogPost'
import {credentialsSection} from './documents/credentialsSection'
import {valueProposition} from './documents/valueProposition'
import {aboutPage} from './documents/aboutPage'
import {formSubmission} from './documents/formSubmission'

// --- v2 redesign ---
import {seo} from './objects/v2/seo'
import {cta} from './objects/v2/cta'
import {headingLine, headingLinePart} from './objects/v2/headingLine'
import {fact} from './objects/v2/fact'
import {faqItem} from './objects/v2/faqItem'
import {valueCard} from './objects/v2/valueCard'
import {compareRow} from './objects/v2/compareRow'
import {resultStat} from './objects/v2/resultStat'
import {docCard} from './objects/v2/docCard'
import {bulletItem} from './objects/v2/bulletItem'
import {linkItem} from './objects/v2/linkItem'
import {pageHero} from './objects/v2/pageHero'
import {bigCta} from './objects/v2/bigCta'
import {richTextV2} from './objects/v2/richTextV2'
import {serviceV2} from './documents/v2/serviceV2'
import {processStepV2} from './documents/v2/processStepV2'
import {caseStudyV2} from './documents/v2/caseStudyV2'
import {testimonialV2} from './documents/v2/testimonialV2'
import {siteSettingsV2} from './documents/v2/siteSettingsV2'
import {homePage} from './documents/v2/homePage'
import {servicesPage} from './documents/v2/servicesPage'
import {processPage} from './documents/v2/processPage'
import {workPage} from './documents/v2/workPage'
import {aboutPageV2} from './documents/v2/aboutPageV2'
import {contactPage} from './documents/v2/contactPage'

export const schemaTypes = [
  blockContent,
  localeString,
  localeText,
  localeRichText,
  aboutStorySection,
  aboutTimelineItem,
  aboutStat,
  aboutComparison,
  approachPoint,
  cardStat,
  caseStudyChallenge,
  caseStudyStat,
  caseStudyBeforeAfter,
  caseStudyProcessStep,
  caseStudyRoleItem,
  caseStudyOutcome,
  siteSettings,
  heroSection,
  service,
  processStep,
  caseStudy,
  testimonial,
  faq,
  blogPost,
  credentialsSection,
  valueProposition,
  aboutPage,
  formSubmission,

  // --- v2 redesign ---
  seo,
  cta,
  headingLinePart,
  headingLine,
  fact,
  faqItem,
  valueCard,
  compareRow,
  resultStat,
  docCard,
  bulletItem,
  linkItem,
  pageHero,
  bigCta,
  richTextV2,
  serviceV2,
  processStepV2,
  caseStudyV2,
  testimonialV2,
  siteSettingsV2,
  homePage,
  servicesPage,
  processPage,
  workPage,
  aboutPageV2,
  contactPage,
]
