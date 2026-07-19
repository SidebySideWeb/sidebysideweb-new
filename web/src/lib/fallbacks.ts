import type {HomePageData} from './types'

export const homePageFallback: HomePageData = {
  siteSettings: {
    siteName: 'Side by Side Web Studio',
    description: 'Σύμβουλος Τεχνικών Έργων & Λύσεων - Ανάλυση, Σχεδίαση, Υλοποίηση',
    primaryColor: '#1A2847',
    accentColor: '#FF6B35',
    contactEmail: 'dgeronikolos@sidebysideweb.gr',
    contactPhone: '+30 694 733 3086',
    contactAddress: 'Αθήνα, Ελλάδα',
  },
  hero: {
    headline: 'Συμβουλός Τεχνικών Έργων: Ανάλυση, Σχεδίαση & Υλοποίηση Λύσεων',
    subheading:
      'Βοηθώ ελληνικές επιχειρήσεις να μετατρέψουν σύνθετα τεχνικά προβλήματα σε ανταγωνιστικά πλεονεκτήματα. Από τη στρατηγική ανάλυση μέχρι την παράδοση κώδικα, είμαι ο συνεργάτης που εγγυάται το αποτέλεσμα.',
    ctaText: 'Ζητήστε Ανάλυση Δωρεάν (30 λεπτά)',
    ctaLink: '#contact',
    trustSignals: [
      {text: '15+ Χρόνια Εμπειρίας', icon: 'check_circle'},
      {text: 'Πάνω από 100 επιτυχημένα projects', icon: 'check_circle'},
      {text: 'Εγγυημένο ROI', icon: 'check_circle'},
    ],
  },
  credentials: {
    headline: 'Γιατί Επιλέγουν Με Ελληνικές Επιχειρήσεις;',
    credentials: [
      {
        stat: '15+',
        label: 'Έτη Εμπειρίας',
        description: 'Βαθιά γνώση της αγοράς και των τεχνικών ιδιαιτεροτήτων.',
        icon: 'history',
      },
      {
        stat: '98%',
        label: 'Client Retention',
        description: 'Μακροχρόνιες συνεργασίες βασισμένες στην εμπιστοσύνη.',
        icon: 'psychology',
      },
      {
        stat: '40%',
        label: 'Μείωση Κόστους',
        description: 'Βελτιστοποίηση διαδικασιών και αποδοτική χρήση πόρων.',
        icon: 'trending_up',
      },
    ],
  },
  valueProposition: {
    headline: 'Τι Κάνω Διαφορετικά;',
    description:
      'Η προσέγγισή μου συνδυάζει την επιχειρηματική λογική με την τεχνική αρτιότητα.',
    cards: [
      {
        title: '1. Σαφή Ανάλυση - Όχι Υποθέσεις',
        description:
          'Ξεκινώ με λεπτομερή ανάλυση. Δεν κάνω υποθέσεις ποτέ. Κατανοώ το πρόβλημα σας πλήρως.',
        icon: 'insights',
        order: 1,
      },
      {
        title: '2. Υλοποίηση που Δουλεύει',
        description:
          'Χτίζω λύσεις που λειτουργούν σε πραγματικό περιβάλλον. Καθαρός κώδικας, δοκιμασμένο.',
        icon: 'build',
        order: 2,
      },
      {
        title: '3. Συνεχής Υποστήριξη',
        description:
          'Δεν εξαφανίζομαι μετά το launch. Μένω δίπλα σας. Support, maintenance, optimization.',
        icon: 'support_agent',
        order: 3,
      },
    ],
  },
  services: [],
  processSteps: [],
  caseStudies: [],
  testimonials: [],
  faqs: [],
}
