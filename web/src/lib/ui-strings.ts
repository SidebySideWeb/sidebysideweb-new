import {localizePath} from './i18n'
import type {SiteLocale} from './i18n'

export interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: Record<SiteLocale, NavLink[]> = {
  el: [
    {label: 'Αρχική', href: '/'},
    {label: 'Υπηρεσίες', href: '#services'},
    {label: 'Μελέτες', href: '#cases'},
    {label: 'Ενημέρωση', href: '#blog'},
    {label: 'Σχετικά', href: '/about'},
    {label: 'Επικοινωνία', href: '#contact'},
  ],
  en: [
    {label: 'Home', href: '/'},
    {label: 'Services', href: '#services'},
    {label: 'Case Studies', href: '#cases'},
    {label: 'Insights', href: '#blog'},
    {label: 'About', href: '/about'},
    {label: 'Contact', href: '#contact'},
  ],
}

export function getNavLinks(locale: SiteLocale): NavLink[] {
  return NAV_LINKS[locale].map((link) => ({
    ...link,
    href: link.href.startsWith('#') ? link.href : localizePath(link.href, locale),
  }))
}

export const FOOTER_COPY: Record<
  SiteLocale,
  {
    tagline: string
    navigationTitle: string
    socialTitle: string
    contactTitle: string
    navLinks: NavLink[]
    legalLinks: NavLink[]
    rights: string
  }
> = {
  el: {
    tagline:
      'Στρατηγικός σχεδιασμός και ανάπτυξη λογισμικού για επιχειρήσεις που απαιτούν το καλύτερο. Γεφυρώνουμε το χάσμα μεταξύ στρατηγικής και κώδικα.',
    navigationTitle: 'Πλοήγηση',
    socialTitle: 'Social',
    contactTitle: 'Επικοινωνία',
    navLinks: [
      {label: 'Υπηρεσίες', href: '#services'},
      {label: 'Μελέτες Περιπτώσεων', href: '#cases'},
      {label: 'Ενημέρωση & Νέα', href: '#blog'},
      {label: 'Σχετικά με εμάς', href: '/about'},
    ],
    legalLinks: [
      {label: 'Πολιτική Απορρήτου', href: '/privacy-policy'},
      {label: 'Πολιτική Cookies', href: '/cookies-policy'},
    ],
    rights: 'Με επιφύλαξη παντός δικαιώματος.',
  },
  en: {
    tagline:
      'Strategic planning and software development for businesses that demand the best. We bridge the gap between strategy and code.',
    navigationTitle: 'Navigation',
    socialTitle: 'Social',
    contactTitle: 'Contact',
    navLinks: [
      {label: 'Services', href: '#services'},
      {label: 'Case Studies', href: '#cases'},
      {label: 'Insights & News', href: '#blog'},
      {label: 'About us', href: '/about'},
    ],
    legalLinks: [
      {label: 'Privacy Policy', href: '/privacy-policy'},
      {label: 'Cookie Policy', href: '/cookies-policy'},
    ],
    rights: 'All rights reserved.',
  },
}

export function getFooterCopy(locale: SiteLocale) {
  const copy = FOOTER_COPY[locale]
  return {
    ...copy,
    navLinks: copy.navLinks.map((link) => ({
      ...link,
      href: link.href.startsWith('#') ? link.href : localizePath(link.href, locale),
    })),
    legalLinks: copy.legalLinks.map((link) => ({
      ...link,
      href: localizePath(link.href, locale),
    })),
  }
}

export const UI_STRINGS: Record<
  SiteLocale,
  {
    navContact: string
    langSwitchTo: string
    navAltSuffix: string
    caseStudyBreadcrumbHome: string
    caseStudyBreadcrumbCases: string
    caseStudyCtaTitle: string
    caseStudyCtaBody: string
    caseStudyCtaButton: string
    contactCtaTitle: string
    contactCtaBody: string
    contactCtaButton: string
    contactCtaConfidentiality: string
    contactCtaResponse: string
    contactCtaExpertise: string
    contactFormOpen: string
    contactFormTitle: string
    contactFormFirstName: string
    contactFormLastName: string
    contactFormCompany: string
    contactFormEmail: string
    contactFormPhone: string
    contactFormMessage: string
    contactFormConsentPrefix: string
    contactFormConsentLink: string
    contactFormConsentSuffix: string
    contactFormSubmit: string
    contactFormSubmitting: string
    contactFormSuccess: string
    contactFormClose: string
    contactFormRequiredError: string
    contactFormConsentError: string
    contactFormRecaptchaError: string
    contactFormGenericError: string
    aboutNavContact: string
    aboutBreadcrumbHome: string
    aboutBreadcrumbAbout: string
    menuAriaLabel: string
    processTitle: string
    processSubtitle: string
    valuePropositionSubtitle: string
    servicesTitle: string
    servicesSubtitle: string
    servicesInvestment: string
    servicesDuration: string
    servicesAvailability: string
    servicesLearnMore: string
    caseStudiesTitle: string
    caseStudiesSubtitle: string
    caseStudyReadMore: string
    faqTitle: string
    problemTitle: string
    problemDefaultLabel: string
    solutionTitle: string
    solutionFallback: string
    resultsTitle: string
    investmentTitle: string
    investmentSubtitle: string
    investmentCost: string
    investmentTimeline: string
    investmentPayback: string
    narrativeTitle: string
    relatedServicesTitle: string
    relatedCaseStudiesTitle: string
    headerInvestment: string
    headerDuration: string
    headerResult: string
    footerRemote: string
    stepLabel: string
    notFoundTitle: string
    notFoundBody: string
    notFoundCta: string
    legalLastUpdated: string
  }
> = {
  el: {
    navContact: 'Επικοινωνία',
    langSwitchTo: 'EN',
    navAltSuffix: 'Σύμβουλος Τεχνικών Έργων',
    caseStudyBreadcrumbHome: 'Αρχική',
    caseStudyBreadcrumbCases: 'Μελέτες Περιπτώσεων',
    caseStudyCtaTitle: 'Έτοιμος για Παρόμοιο Έργο;',
    caseStudyCtaBody:
      'Κλείστε μια δωρεάν συμβουλευτική κλήση 30 λεπτών. Χωρίς δεσμεύσεις, μόνο καθαρές απαντήσεις.',
    caseStudyCtaButton: 'Ζητήστε Ανάλυση Δωρεάν',
    contactCtaTitle: 'Έτοιμος να Λύσεις το Τεχνικό σου Πρόβλημα;',
    contactCtaBody:
      'Κλείστε μια δωρεάν συμβουλευτική κλήση 30 λεπτών. Χωρίς δεσμεύσεις, μόνο καθαρές απαντήσεις και στρατηγική.',
    contactCtaButton: 'Κλείσε Δωρεάν Κλήση',
    contactCtaConfidentiality: '100% Εμπιστευτικότητα',
    contactCtaResponse: 'Απάντηση σε 24 ώρες',
    contactCtaExpertise: 'Verified Expertise',
    contactFormOpen: 'Contact Form',
    contactFormTitle: 'Φόρμα Επικοινωνίας',
    contactFormFirstName: 'Όνομα',
    contactFormLastName: 'Επίθετο',
    contactFormCompany: 'Όνομα εταιρείας',
    contactFormEmail: 'Email',
    contactFormPhone: 'Τηλέφωνο',
    contactFormMessage: 'Κείμενο',
    contactFormConsentPrefix: 'Συμφωνώ με την',
    contactFormConsentLink: 'πολιτική απορρήτου',
    contactFormConsentSuffix: ' και την επεξεργασία των δεδομένων μου.',
    contactFormSubmit: 'Αποστολή',
    contactFormSubmitting: 'Αποστολή…',
    contactFormSuccess: 'Το μήνυμά σας στάλθηκε. Θα επικοινωνήσουμε μαζί σας σύντομα.',
    contactFormClose: 'Κλείσιμο',
    contactFormRequiredError: 'Συμπληρώστε όλα τα υποχρεωτικά πεδία.',
    contactFormConsentError: 'Πρέπει να αποδεχτείτε την πολιτική απορρήτου.',
    contactFormRecaptchaError: 'Επιβεβαιώστε ότι δεν είστε ρομπότ.',
    contactFormGenericError: 'Η αποστολή απέτυχε. Δοκιμάστε ξανά.',
    aboutNavContact: 'Επικοινωνία',
    aboutBreadcrumbHome: 'Αρχική',
    aboutBreadcrumbAbout: 'Σχετικά',
    menuAriaLabel: 'Μενού',
    processTitle: 'Πώς Δουλεύω - Βήμα προς Βήμα',
    processSubtitle: 'Καμία μαγεία. Μια ξεκάθαρη διαδικασία που έχει δουλέψει σε 50+ έργα.',
    valuePropositionSubtitle:
      'Η προσέγγισή μου συνδυάζει την επιχειρηματική λογική με την τεχνική αρτιότητα.',
    servicesTitle: 'Εξειδικευμένες Υπηρεσίες',
    servicesSubtitle:
      'Κάθε έργο είναι διαφορετικό — η υπηρεσία προσαρμόζεται στο πρόβλημά σας, όχι το αντίθετο.',
    servicesInvestment: 'Επένδυση',
    servicesDuration: 'Διάρκεια',
    servicesAvailability: 'Διαθεσιμότητα',
    servicesLearnMore: 'Μάθετε περισσότερα',
    caseStudiesTitle: 'Μελέτες Περιπτώσεων',
    caseStudiesSubtitle: 'Πραγματικά προβλήματα που λύθηκαν με στρατηγική και τεχνολογία.',
    caseStudyReadMore: 'Διαβάστε την Μελέτη',
    faqTitle: 'Συχνές Ερωτήσεις - Απαντήσεις',
    problemTitle: 'Το Πρόβλημα',
    problemDefaultLabel: 'Βασική Γραμμή Απόδοσης',
    solutionTitle: 'Η Λύση',
    solutionFallback: 'Ενσωμάτωση και υλοποίηση στο πλαίσιο της λύσης.',
    resultsTitle: 'Αποτελέσματα',
    investmentTitle: 'Ανάλυση Επένδυσης',
    investmentSubtitle: 'Διαφανείς χρεώσεις και μετρήσιμα αποτελέσματα που δικαιολογούν κάθε ευρώ.',
    investmentCost: 'Κόστος',
    investmentTimeline: 'Διάρκεια',
    investmentPayback: 'Χρόνος απόσβεσης επένδυσης.',
    narrativeTitle: 'Η Ιστορία του Έργου',
    relatedServicesTitle: 'Υπηρεσίες που Χρησιμοποιήθηκαν',
    relatedCaseStudiesTitle: 'Άλλες Μελέτες Περιπτώσεων',
    headerInvestment: 'Επένδυση',
    headerDuration: 'Διάρκεια',
    headerResult: 'Αποτέλεσμα',
    footerRemote: 'Διαθέσιμοι για remote projects παγκοσμίως.',
    stepLabel: 'Βήμα',
    notFoundTitle: 'Η μελέτη δεν βρέθηκε',
    notFoundBody: 'Η σελίδα που ζητήσατε δεν υπάρχει ή έχει μετακινηθεί.',
    notFoundCta: 'Επιστροφή στις μελέτες',
    legalLastUpdated: 'Τελευταία ενημέρωση:',
  },
  en: {
    navContact: 'Contact',
    langSwitchTo: 'EL',
    navAltSuffix: 'Technical Projects Consultant',
    caseStudyBreadcrumbHome: 'Home',
    caseStudyBreadcrumbCases: 'Case Studies',
    caseStudyCtaTitle: 'Ready for a Similar Project?',
    caseStudyCtaBody:
      'Book a free 30-minute consultation. No obligations — just clear answers.',
    caseStudyCtaButton: 'Request a Free Analysis',
    contactCtaTitle: 'Ready to Solve Your Technical Challenge?',
    contactCtaBody:
      'Book a free 30-minute consultation. No obligations — just clear answers and strategy.',
    contactCtaButton: 'Book a Free Call',
    contactCtaConfidentiality: '100% Confidential',
    contactCtaResponse: 'Response within 24 hours',
    contactCtaExpertise: 'Verified Expertise',
    contactFormOpen: 'Contact Form',
    contactFormTitle: 'Contact Form',
    contactFormFirstName: 'First name',
    contactFormLastName: 'Last name',
    contactFormCompany: 'Company name',
    contactFormEmail: 'Email',
    contactFormPhone: 'Phone',
    contactFormMessage: 'Message',
    contactFormConsentPrefix: 'I agree to the',
    contactFormConsentLink: 'privacy policy',
    contactFormConsentSuffix: ' and the processing of my data.',
    contactFormSubmit: 'Submit',
    contactFormSubmitting: 'Sending…',
    contactFormSuccess: 'Your message was sent. We will get back to you soon.',
    contactFormClose: 'Close',
    contactFormRequiredError: 'Please fill in all required fields.',
    contactFormConsentError: 'You must accept the privacy policy.',
    contactFormRecaptchaError: 'Please confirm you are not a robot.',
    contactFormGenericError: 'Submission failed. Please try again.',
    aboutNavContact: 'Contact',
    aboutBreadcrumbHome: 'Home',
    aboutBreadcrumbAbout: 'About',
    menuAriaLabel: 'Menu',
    processTitle: 'How I Work — Step by Step',
    processSubtitle: 'No magic. A clear process that has worked across 50+ projects.',
    valuePropositionSubtitle:
      'My approach combines business logic with technical excellence.',
    servicesTitle: 'Specialized Services',
    servicesSubtitle:
      'Every project is different — the service adapts to your problem, not the other way around.',
    servicesInvestment: 'Investment',
    servicesDuration: 'Duration',
    servicesAvailability: 'Availability',
    servicesLearnMore: 'Learn more',
    caseStudiesTitle: 'Case Studies',
    caseStudiesSubtitle: 'Real problems solved with strategy and technology.',
    caseStudyReadMore: 'Read the Case Study',
    faqTitle: 'Frequently Asked Questions',
    problemTitle: 'The Problem',
    problemDefaultLabel: 'Baseline Performance',
    solutionTitle: 'The Solution',
    solutionFallback: 'Integration and implementation within the solution scope.',
    resultsTitle: 'Results',
    investmentTitle: 'Investment Analysis',
    investmentSubtitle: 'Transparent pricing and measurable outcomes that justify every euro.',
    investmentCost: 'Cost',
    investmentTimeline: 'Timeline',
    investmentPayback: 'Investment payback period.',
    narrativeTitle: 'Project Story',
    relatedServicesTitle: 'Services Used',
    relatedCaseStudiesTitle: 'Other Case Studies',
    headerInvestment: 'Investment',
    headerDuration: 'Duration',
    headerResult: 'Result',
    footerRemote: 'Available for remote projects worldwide.',
    stepLabel: 'Step',
    notFoundTitle: 'Case study not found',
    notFoundBody: 'The page you requested does not exist or has been moved.',
    notFoundCta: 'Back to case studies',
    legalLastUpdated: 'Last updated:',
  },
}

export function getUiStrings(locale: SiteLocale) {
  return UI_STRINGS[locale]
}
