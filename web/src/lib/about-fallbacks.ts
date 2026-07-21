import type {AboutPage, ApproachPoint, SanityImage, Testimonial} from './types'
import {STITCH_ABOUT_PORTRAIT} from './stitch-design'

export const aboutPageFallback: AboutPage = {
  headline: 'Dimitris Geronikolos',
  subheadline: 'Σύμβουλος Τεχνικών Έργων',
  intro:
    '15+ χρόνια εμπειρίας. 50+ επιτυχημένα projects. Ειδικός σε σύνθετα προβλήματα που απαιτούν συνδυασμό στρατηγικής και τεχνικής αρτιότητας.',
  heroBadgeValue: '15+',
  heroBadgeLabel: 'Χρόνια Εμπειρίας',
  primaryCtaText: 'Δείτε το Portfolio',
  primaryCtaLink: '/#cases',
  secondaryCtaText: 'Βιογραφικό',
  secondaryCtaLink: '/files/geronikolos-dimitris-cv.pdf',
  photoUrl: STITCH_ABOUT_PORTRAIT,
  philosophyHeadline: 'Δεν με ενδιαφέρει να εντυπωσιάσω.',
  philosophyHighlight: 'Με ενδιαφέρει να βοηθήσω.',
  philosophyParagraphs: [
    'Στον κόσμο της τεχνολογίας, είναι εύκολο να χαθεί κανείς στις εντυπωσιακές ορολογίες και τις τελευταίες τάσεις.',
    'Η επιτυχία ενός τεχνικού έργου δεν μετριέται με τις γραμμές κώδικα, αλλά με την αξία που προσφέρει στην επιχείρηση.',
  ],
  storyHeadline: 'Η Διαδρομή μου',
  storySections: [
    {
      title: 'Πώς Ξεκίνησα',
      content:
        'Ξεκίνησα φτιάχνοντας ιστοσελίδες — WordPress, CMS platforms, στήσιμο από το μηδέν. Δεν ήμουν ο κλασικός «hardcore developer», αλλά ήξερα από βάσεις δεδομένων και front-end, και είχα ένα χαρακτηριστικό που αποδείχθηκε πιο πολύτιμο από κάθε τίτλο: μάθαινα γρήγορα και σε βάθος οποιοδήποτε εργαλείο χρειαζόταν. Με σπουδές Μηχανικού Σχεδίασης Προϊόντων & Συστημάτων, έβλεπα πάντα το σύστημα ολόκληρο — όχι μόνο τον κώδικα.',
    },
    {
      title: 'Η Αλλαγή',
      content:
        'Σύντομα κατάλαβα κάτι που άλλαξε τον τρόπο που δουλεύω: οι καλύτερες λύσεις δεν βγαίνουν από την οθόνη, βγαίνουν από τη συζήτηση. Πέρασα σε ρόλους Technical Project Management και Delivery — διαχείριση cross-functional ομάδων (PM, design, development), requirement workshops, budgets, P&L, deadlines. Έχω ηγηθεί της παράδοσης σύνθετων e-commerce και portal έργων για μεγάλους οργανισμούς — Eurobank, Τράπεζα Πειραιώς, Lacoste, Εκδόσεις Μεταίχμιο, Politeianet, Minoan Lines. Εκεί ο άνθρωπος που έφτιαχνε sites έγινε ο άνθρωπος που γεφυρώνει την επιχειρηματική στρατηγική με την τεχνική εκτέλεση.',
    },
    {
      title: 'Σήμερα',
      content:
        'Σήμερα βοηθώ επιχειρήσεις και οργανισμούς να πλοηγηθούν στο σύνθετο ψηφιακό τοπίο — με τη Side by Side Web Studio ως τον τρόπο που δουλεύω: μικρό σχήμα, καθαρή ευθύνη, άμεση επικοινωνία. Είτε πρόκειται για έναν έξυπνο αυτοματισμό που γλιτώνει κόστος, είτε για την επίβλεψη μιας κρίσιμης υλοποίησης, φέρνω μαζί μου την εμπειρία 50+ έργων σε e-commerce, banking και retail — και μια απλή αρχή: να λύνω το πραγματικό πρόβλημα, στο σωστό κόστος.',
    },
  ],
  timeline: [
    {
      title: 'Web & Foundations',
      description:
        'Ιστοσελίδες, CMS, βάσεις, front-end. Γρήγορη, βαθιά εκμάθηση κάθε εργαλείου.',
      order: 1,
    },
    {
      title: 'Technical PM & Delivery',
      description:
        'Cross-functional ομάδες, requirements, P&L, e-commerce & portals για corporate, banking και retail πελάτες.',
      order: 2,
    },
    {
      title: 'Independent Consultant',
      description: 'Στρατηγική, αυτοματισμοί, επίβλεψη κρίσιμων έργων.',
      order: 3,
    },
  ],
  workStyleHeadline: 'Πώς Δουλεύω',
  workStyleSubheadline:
    'Μια δοκιμασμένη μεθοδολογία που εξασφαλίζει την επιτυχία κάθε project, από τη σύλληψη μέχρι την παράδοση.',
  approach: [
    {
      title: 'Ανάλυση Πρώτα',
      description: 'Βαθιά κατάδυση στις ανάγκες σας πριν αποφασίσουμε το πώς.',
      icon: 'search',
    },
    {
      title: 'Υλοποίηση Σωστά',
      description: 'Λύσεις ασφαλείς και επεκτάσιμες με σύγχρονες τεχνολογίες.',
      icon: 'rocket_launch',
    },
    {
      title: 'Υποστήριξη Μακροχρόνια',
      description: 'Δεν εξαφανιζόμαστε μετά το launch.',
      icon: 'handshake',
    },
  ] satisfies ApproachPoint[],
  stats: [
    {value: '50', suffix: '+', label: 'Projects'},
    {value: '15', suffix: '+', label: 'Χρόνια Εμπειρίας'},
    {value: '2', suffix: 'M+', label: 'Αξία Delivered'},
    {value: '100', suffix: '%', label: 'Παραδόθηκαν'},
  ],
  comparisonHeadline: 'Γιατί να Επιλέξετε Εμένα;',
  comparisons: [],
  testimonialsHeadline: 'Τι Λένε Όσοι Συνεργάστηκαν Μαζί μου',
  ctaHeadline: 'Έτοιμος να Δουλέψουμε Μαζί;',
  ctaDescription:
    'Ας συζητήσουμε τις προκλήσεις του έργου σας σε μια δωρεάν κλήση 30 λεπτών.',
  ctaText: 'Ζητήστε Δωρεάν Κλήση',
  ctaLink: '#contact',
}

export function sortTimeline<T extends {order?: number}>(items: T[] | undefined): T[] {
  if (!items?.length) return []
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

export function resolveAboutPhotoUrl(photo: SanityImage | undefined, photoUrl?: string): string {
  if (photoUrl) return photoUrl
  return STITCH_ABOUT_PORTRAIT
}
