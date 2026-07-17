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
  secondaryCtaLink: '#',
  photoUrl: STITCH_ABOUT_PORTRAIT,
  philosophyHeadline: 'Δεν με ενδιαφέρει να εντυπωσιάσω.',
  philosophyHighlight: 'Με ενδιαφέρει να βοηθήσω.',
  philosophyParagraphs: [
    'Στον κόσμο της τεχνολογίας, είναι εύκολο να χαθεί κανείς στις εντυπωσιακές ορολογίες και τις τελευταίες τάσεις.',
    'Η επιτυχία ενός τεχνικού έργου δεν μετριέται με τις γραμμές κώδικα, αλλά με την αξία που προσφέρει στην επιχείρηση.',
  ],
  storySections: [
    {
      title: 'Πώς ξεκίνησα',
      content:
        'Το ταξίδι μου ξεκίνησε το 2010 ως Full-Stack Developer. Εκεί έμαθα τις βάσεις: πώς να χτίζω συστήματα που αντέχουν στην πίεση.',
    },
  ],
  timeline: [
    {
      period: '2022 - Σήμερα',
      title: 'Independent Consultant',
      description: 'Στρατηγική συμβουλευτική και επίβλεψη high-stakes έργων.',
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
  testimonialsHeadline: 'Τι λένε οι πελάτες',
  ctaHeadline: 'Έτοιμος να Δουλέψουμε Μαζί;',
  ctaDescription:
    'Ας συζητήσουμε τις προκλήσεις του έργου σας σε μια δωρεάν κλήση 30 λεπτών.',
  ctaText: 'Ζητήστε Δωρεάν Κλήση',
  ctaLink: '/#contact',
}

export function sortTimeline<T extends {order?: number}>(items: T[] | undefined): T[] {
  if (!items?.length) return []
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

export function resolveAboutPhotoUrl(photo: SanityImage | undefined, photoUrl?: string): string {
  if (photoUrl) return photoUrl
  return STITCH_ABOUT_PORTRAIT
}
