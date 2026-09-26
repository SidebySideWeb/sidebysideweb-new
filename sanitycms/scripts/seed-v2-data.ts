/**
 * Seed content for the v2 redesign. All Greek copy is taken verbatim from
 * `reference/prototype.html` (the approved design).
 *
 * Documents are listed in dependency order: referenced documents first.
 * `_key` values are added by the seed script, so they are omitted here.
 */

type Style = 'normal' | 'thin' | 'marigold'
type Part = [text: string, style?: Style]

/** One animated headline line, built from styled parts. */
function line(...parts: Part[]) {
  return {
    _type: 'headingLine',
    parts: parts.map(([text, style = 'normal']) => ({_type: 'headingLinePart', text, style})),
  }
}

function ref(id: string) {
  return {_type: 'reference', _ref: id}
}

type Span = [text: string, marks?: string[]]

function block(...spans: Span[]) {
  return {
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: spans.map(([text, marks = []]) => ({_type: 'span', text, marks})),
  }
}

const EMAIL = 'dgeronikolos@sidebysideweb.gr'

// ---------------------------------------------------------------- services

export const services = [
  {
    _id: 'serviceV2-discovery',
    _type: 'serviceV2',
    title: 'Technical Discovery & Ανάλυση',
    slug: {_type: 'slug', current: 'technical-discovery'},
    order: 1,
    indexLabel: '01',
    badge: 'Εδώ ξεκινούν οι περισσότεροι',
    shortDescription: 'Χαρτογράφηση διαδικασιών και συστημάτων, γραπτό πλάνο.',
    description:
      'Χαρτογραφούμε μαζί διαδικασίες, συστήματα και ανθρώπους. Βρίσκουμε πού χάνεται χρόνος και χρήμα.',
    homeRowTitle: 'Technical Discovery',
    homeMetaShort: '6–8 εβδ.',
    bullets: [
      'Συνεντεύξεις με την ομάδα σου',
      'Χάρτης συστημάτων και ροών δεδομένων',
      'Γραπτό πλάνο με προτεραιότητες, κόστος, χρονοδιάγραμμα',
    ],
    metaLabel: '6–8 εβδομάδες',
    metaNote: 'σταθερό scope, γραπτή προσφορά',
    variant: 'featured',
    category: 'core',
    showOnHomeRows: true,
  },
  {
    _id: 'serviceV2-architecture',
    _type: 'serviceV2',
    title: 'Solution Design & Αρχιτεκτονική',
    slug: {_type: 'slug', current: 'arxitektoniki-lysis'},
    order: 2,
    indexLabel: '02',
    shortDescription: 'Σχέδιο συστήματος πριν γραφτεί κώδικας.',
    description: 'Σχεδιάζω το σύστημα πριν γραφτεί κώδικας, ώστε να μη χτίσουμε δύο φορές.',
    homeRowTitle: 'Αρχιτεκτονική λύσης',
    homeMetaShort: '2–3 εβδ.',
    bullets: [
      'Αρχιτεκτονική και επιλογή τεχνολογιών',
      'Integrations με ERP, CRM, αποθήκη',
      'Τεχνικό έγγραφο που μπορεί να υλοποιήσει οποιοσδήποτε',
    ],
    metaLabel: '2–3 εβδομάδες',
    metaNote: 'γραπτή προσφορά μετά το πρώτο call',
    variant: 'default',
    category: 'core',
    showOnHomeRows: true,
  },
  {
    _id: 'serviceV2-build',
    _type: 'serviceV2',
    title: 'Custom υλοποίηση',
    slug: {_type: 'slug', current: 'custom-ylopoiisi'},
    order: 3,
    indexLabel: '03',
    shortDescription: 'Next.js, Node, Astro, ERP integrations, custom e-shops.',
    description:
      'Χτίζω αυτό που σχεδιάσαμε, σε μικρά κομμάτια που βλέπεις να δουλεύουν κάθε εβδομάδα.',
    homeRowTitle: 'Custom υλοποίηση',
    homeMetaShort: 'ανά scope',
    bullets: [
      'Web εφαρμογές και custom e-shops',
      'ERP integrations και αυτοματισμοί',
      'Next.js, Node, Astro, Cloud',
    ],
    metaLabel: 'ανά scope',
    metaNote: 'τιμή γραπτή πριν ξεκινήσουμε',
    variant: 'default',
    category: 'core',
    showOnHomeRows: true,
  },
  {
    _id: 'serviceV2-cto',
    _type: 'serviceV2',
    title: 'Strategic Retainer / Fractional CTO',
    slug: {_type: 'slug', current: 'fractional-cto'},
    order: 4,
    indexLabel: '04',
    shortDescription: 'Στρατηγικός τεχνικός συνεργάτης σε μηνιαία βάση.',
    description: 'Ένας senior τεχνικός δίπλα στη διοίκηση, χωρίς το κόστος πλήρους απασχόλησης.',
    homeRowTitle: 'Fractional CTO',
    homeMetaShort: 'μηνιαία',
    bullets: [
      'Τεχνικές αποφάσεις και roadmap',
      'Αξιολόγηση προμηθευτών και προσφορών',
      'Επίβλεψη ομάδων και έργων',
    ],
    metaLabel: 'μηνιαία συνεργασία',
    metaNote: 'ελάχιστο 6 μήνες',
    variant: 'default',
    category: 'core',
    showOnHomeRows: true,
  },
  {
    _id: 'serviceV2-consulting',
    _type: 'serviceV2',
    title: 'Τεχνική συμβουλευτική',
    slug: {_type: 'slug', current: 'texniki-symvouleftiki'},
    order: 5,
    indexLabel: '05',
    shortDescription:
      'Μια δεύτερη γνώμη όταν τη χρειάζεσαι: σε προσφορά, σε έργο που κόλλησε, σε απόφαση.',
    description:
      'Μια δεύτερη γνώμη όταν τη χρειάζεσαι: σε προσφορά, σε έργο που κόλλησε, σε απόφαση.',
    homeRowTitle: 'Τεχνική συμβουλευτική',
    homeMetaShort: 'με την ώρα',
    bullets: ['Code και architecture review', 'Έλεγχος προσφορών τρίτων', 'Χωρίς δέσμευση'],
    metaLabel: 'με την ώρα',
    metaNote: 'κατά παραγγελία',
    variant: 'default',
    category: 'core',
    showOnHomeRows: false,
  },
  {
    _id: 'serviceV2-support',
    _type: 'serviceV2',
    title: 'Υποστήριξη μετά την υλοποίηση',
    slug: {_type: 'slug', current: 'ypostirixi'},
    order: 6,
    indexLabel: '06',
    shortDescription: 'Συντήρηση και βελτιώσεις μετά το launch.',
    description: 'Το σύστημά σου μένει ζωντανό, ασφαλές και βελτιώνεται με τον χρόνο.',
    homeRowTitle: 'Υποστήριξη',
    homeMetaShort: 'μηνιαία',
    bullets: [
      'Updates, monitoring, backups',
      'Μικρές βελτιώσεις κάθε μήνα',
      'Άμεση επικοινωνία με αυτόν που το έχτισε',
    ],
    metaLabel: 'μηνιαία',
    metaNote: 'ανάλογα με το σύστημα',
    variant: 'default',
    category: 'core',
    showOnHomeRows: true,
  },
  {
    _id: 'serviceV2-docs',
    _type: 'serviceV2',
    title: 'Ανάλυση απαιτήσεων & τεκμηρίωση',
    slug: {_type: 'slug', current: 'analysi-apaitiseon-tekmiriosi'},
    order: 7,
    indexLabel: '07',
    shortDescription: 'Ανάλυση απαιτήσεων, BRD, FSD και RFP.',
    description:
      'Γράφω αυτό που πρέπει να χτιστεί, με τρόπο που καταλαβαίνουν και η διοίκηση και οι developers.',
    homeRowTitle: 'Ανάλυση & τεκμηρίωση',
    homeMetaShort: 'ανά έργο',
    bullets: [
      'Ανάλυση απαιτήσεων με όλους τους εμπλεκόμενους',
      'BRD (Business Requirements Document)',
      'FSD (Functional Specification Document)',
      'RFP για να πάρεις συγκρίσιμες προσφορές από προμηθευτές',
    ],
    metaLabel: 'ανά έργο',
    metaNote: 'τιμή γραπτή πριν ξεκινήσουμε',
    variant: 'default',
    category: 'docs',
    showOnHomeRows: true,
  },
  {
    _id: 'serviceV2-pm',
    _type: 'serviceV2',
    title: 'Project & product management',
    slug: {_type: 'slug', current: 'project-product-management'},
    order: 8,
    indexLabel: '08',
    shortDescription: 'Διαχείριση έργου ή προϊόντος, από το πλάνο ως την παράδοση.',
    description:
      'Κρατάω το έργο ή το προϊόν σε τροχιά: πλάνο, προτεραιότητες, ομάδες και προμηθευτές.',
    homeRowTitle: 'Project & product management',
    homeMetaShort: 'ανά έργο ή μήνα',
    bullets: [
      'Project management από το kick-off ως την παράδοση',
      'Product management, roadmap και backlog',
      'Συντονισμός developers, designers και τρίτων',
      'Αναφορές προόδου που διαβάζονται σε δύο λεπτά',
    ],
    metaLabel: 'ανά έργο ή μήνα',
    metaNote: 'ανάλογα με τη διάρκεια',
    variant: 'default',
    category: 'pm',
    showOnHomeRows: true,
  },
  {
    _id: 'serviceV2-agency',
    _type: 'serviceV2',
    title: 'Τεχνικός συνεργάτης για agencies',
    slug: {_type: 'slug', current: 'gia-agencies'},
    order: 9,
    indexLabel: '09',
    badge: 'Για agencies',
    shortDescription: 'Τεχνικός συνεργάτης για web, marketing και διαφημιστικά γραφεία.',
    description:
      'Για web, marketing και διαφημιστικά γραφεία που έχουν τον πελάτη και τη δημιουργική ιδέα, και χρειάζονται κάποιον να τη χτίσει σωστά. Συνεργασία ανά έργο, χωρίς μόνιμη δέσμευση.',
    homeRowTitle: 'Για agencies',
    homeMetaShort: 'ανά έργο',
    bullets: [
      'Τεχνική εκτίμηση και scope πριν δώσεις προσφορά στον πελάτη σου',
      'Ανάπτυξη sites, landing pages και campaign microsites',
      'Integrations, φόρμες, tracking και συνδέσεις με CRM',
      'Custom εφαρμογές και εργαλεία για πελάτες σου',
      'Ανάλυση απαιτήσεων, BRD και FSD για έργα πελατών σου',
      'Project ή product management στο τεχνικό κομμάτι',
      'White-label ή co-branded, όπως συμφωνήσουμε',
      'Ένα σημείο επαφής για όλο το τεχνικό κομμάτι',
    ],
    metaLabel: 'ανά έργο',
    metaNote: 'τιμή γραπτή πριν ξεκινήσουμε',
    variant: 'wide',
    category: 'agency',
    showOnHomeRows: true,
  },
]

// ----------------------------------------------------------- process steps

export const processSteps = [
  {
    _id: 'processStepV2-01',
    _type: 'processStepV2',
    number: '01',
    title: 'Discovery',
    durationLabel: '6–8 εβδομάδες',
    summary:
      'Καθόμαστε μαζί και χαρτογραφούμε τι γίνεται σήμερα: διαδικασίες, συστήματα, άνθρωποι, πού χάνεται χρόνος.',
    description:
      'Μιλάω με τους ανθρώπους που κάνουν τη δουλειά κάθε μέρα, όχι μόνο με τη διοίκηση. Χαρτογραφώ τα συστήματα, τα δεδομένα και τα σημεία όπου κάτι γίνεται με το χέρι.',
    deliverables: [
      'Χάρτης διαδικασιών και συστημάτων',
      'Λίστα προβλημάτων με προτεραιότητα',
      'Γραπτό πλάνο, κόστος, χρονοδιάγραμμα',
    ],
    cardColour: 'ink',
    chips: ['6–8 εβδομάδες'],
    order: 1,
  },
  {
    _id: 'processStepV2-02',
    _type: 'processStepV2',
    number: '02',
    title: 'Αρχιτεκτονική',
    durationLabel: '2–3 εβδομάδες',
    summary:
      'Σχεδιάζω τη λύση και την περνάμε γραμμή γραμμή. Ξέρεις τι θα χτιστεί, με ποια σειρά και πόσο κοστίζει.',
    description:
      'Σχεδιάζω τη λύση: τι χτίζουμε, τι αγοράζουμε έτοιμο, πώς μιλάνε τα συστήματα μεταξύ τους. Το περνάμε μαζί μέχρι να είναι ξεκάθαρο.',
    deliverables: [
      'Αρχιτεκτονικό διάγραμμα',
      'Επιλογή τεχνολογιών με αιτιολόγηση',
      'Πλάνο υλοποίησης σε φάσεις',
    ],
    cardColour: 'paper',
    chips: ['2–3 εβδομάδες'],
    order: 2,
  },
  {
    _id: 'processStepV2-03',
    _type: 'processStepV2',
    number: '03',
    title: 'Υλοποίηση',
    durationLabel: 'ανά scope',
    summary:
      'Χτίζω σε μικρά, ορατά κομμάτια. Βλέπεις πρόοδο κάθε εβδομάδα, όχι ένα μεγάλο «ta-da» στο τέλος.',
    description:
      'Χτίζω σε σύντομους κύκλους. Κάθε εβδομάδα βλέπεις κάτι που δουλεύει και μπορείς να αλλάξεις κατεύθυνση νωρίς, όταν κοστίζει λίγο.',
    deliverables: [
      'Εβδομαδιαίο demo',
      'Staging environment για δοκιμές',
      'Τεκμηρίωση και παράδοση',
    ],
    cardColour: 'marigold',
    chips: ['ανά scope', 'εβδομαδιαία demos'],
    order: 3,
  },
  {
    _id: 'processStepV2-04',
    _type: 'processStepV2',
    number: '04',
    title: 'Υποστήριξη',
    durationLabel: 'μηνιαία ή retainer',
    summary:
      "Μένω μετά το launch. Διορθώσεις, βελτιώσεις και τεχνικές αποφάσεις με κάποιον που ξέρει το σύστημα απ' έξω.",
    description:
      'Μετά το launch δεν εξαφανίζομαι. Παρακολουθώ, διορθώνω και βελτιώνω, και είμαι εκεί όταν πρέπει να πάρεις την επόμενη τεχνική απόφαση.',
    deliverables: ['Monitoring και backups', 'Μηνιαίες βελτιώσεις', 'Απευθείας επικοινωνία'],
    cardColour: 'ink2',
    chips: ['μηνιαία', 'ή retainer'],
    order: 4,
  },
]

// ------------------------------------------------------------- case studies

const REVIEW_NOTE =
  'Τα κείμενα είναι πρώτο draft από όσα ξέρω για το προϊόν. Τα [Χ] είναι θέσεις για πραγματικούς αριθμούς.'

export const caseStudies = [
  {
    _id: 'caseStudyV2-kollekta',
    _type: 'caseStudyV2',
    name: 'kollekta.gr',
    slug: {_type: 'slug', current: 'kollekta'},
    kind: 'product',
    tag: 'Δικό μου SaaS',
    sector: 'Fashion B2B',
    headline: 'Οι φωτογραφίες προϊόντων φτάνουν στον πελάτη έτοιμες για web.',
    short: 'Πλατφόρμα όπου οι εταιρείες μόδας μοιράζονται συλλογές με τους πελάτες τους.',
    role: 'Product, UX, full-stack',
    duration: '[διάρκεια]',
    stack: ['[stack]'],
    problem:
      'Κάθε σεζόν οι εταιρείες μόδας στέλνουν εκατοντάδες φωτογραφίες προϊόντων σε καταστήματα και συνεργάτες. Συνήθως με links σε Drive ή WeTransfer, σε πλήρη ανάλυση και χωρίς οργάνωση ανά συλλογή. Ο παραλήπτης κατεβάζει gigabytes και μετά ψάχνει ποιος θα τις μικρύνει για το e-shop του.',
    approach:
      'Ξεκίνησα από τη ροή μιας πραγματικής εταιρείας μόδας, που έγινε και ο πρώτος test user. Κατέγραψα πώς ανεβαίνουν οι φωτογραφίες, πώς οργανώνονται σε συλλογές και τι ακριβώς χρειάζεται ο παραλήπτης στο τέλος.',
    solution:
      'Μια πλατφόρμα όπου η εταιρεία ανεβάζει τις συλλογές της και τις μοιράζεται με τους πελάτες της. Η μετατροπή σε web μέγεθος γίνεται αυτόματα, οπότε ο πελάτης παίρνει αρχεία έτοιμα για το e-shop του.',
    results: [
      {_type: 'resultStat', value: '[Χ]', label: 'εταιρείες μόδας στην πλατφόρμα'},
      {_type: 'resultStat', value: '[Χ]%', label: 'μικρότερα αρχεία για web'},
      {_type: 'resultStat', value: '[Χ] ώρες', label: 'λιγότερη χειροκίνητη δουλειά τον μήνα'},
    ],
    artKey: 'kollekta',
    isPlaceholder: false,
    reviewNote: REVIEW_NOTE,
    order: 1,
    seo: {
      _type: 'seo',
      title: 'kollekta.gr · Side by Side',
      description: 'Πλατφόρμα όπου οι εταιρείες μόδας μοιράζονται συλλογές με τους πελάτες τους.',
    },
  },
  {
    _id: 'caseStudyV2-ftiaxesite',
    _type: 'caseStudyV2',
    name: 'ftiaxesite.gr',
    slug: {_type: 'slug', current: 'ftiaxesite'},
    kind: 'product',
    tag: 'Δικό μου προϊόν',
    sector: 'Μικρές επιχειρήσεις',
    headline: 'Επαγγελματικό site για μικρές επιχειρήσεις, χωρίς ατελείωτα meetings.',
    short: 'Τυποποιημένη διαδικασία για γρήγορα, καθαρά websites μικρών επιχειρήσεων.',
    role: 'Ιδιοκτήτης, διαδικασία, ανάπτυξη',
    duration: '[από πότε τρέχει]',
    stack: ['[stack]'],
    problem:
      'Πολλές μικρές επιχειρήσεις χρειάζονται ένα καθαρό, γρήγορο site αλλά δεν έχουν budget για custom έργο ούτε χρόνο για μήνες συναντήσεων.',
    approach:
      'Τυποποίησα τη δουλειά: συγκεκριμένα βήματα, συγκεκριμένο περιεχόμενο που ζητάω από την αρχή και σταθερή τεχνική βάση που δεν ξαναχτίζεται κάθε φορά.',
    solution:
      'Μια γραμμή παραγωγής για sites μικρών επιχειρήσεων που κρατά χαμηλό το κόστος χωρίς να ρίχνει την ποιότητα. Είναι και η πρώτη επαφή για πελάτες που αργότερα χρειάζονται κάτι πιο σύνθετο.',
    results: [
      {_type: 'resultStat', value: '[Χ]', label: 'sites σε λειτουργία'},
      {_type: 'resultStat', value: '[Χ] μέρες', label: 'μέσος χρόνος παράδοσης'},
      {_type: 'resultStat', value: '[Χ]', label: 'Lighthouse score'},
    ],
    artKey: 'site',
    isPlaceholder: false,
    reviewNote: REVIEW_NOTE,
    order: 2,
    seo: {
      _type: 'seo',
      title: 'ftiaxesite.gr · Side by Side',
      description: 'Τυποποιημένη διαδικασία για γρήγορα, καθαρά websites μικρών επιχειρήσεων.',
    },
  },
  {
    _id: 'caseStudyV2-audit',
    _type: 'caseStudyV2',
    name: 'Audit tool',
    slug: {_type: 'slug', current: 'audit'},
    kind: 'product',
    tag: 'Δικό μου εργαλείο',
    sector: 'Web performance',
    headline: 'Δωρεάν τεχνικός έλεγχος site σε λίγα λεπτά, σε απλά ελληνικά.',
    short: 'Ελέγχει ταχύτητα, SEO και βασικά τεχνικά σημεία ενός site.',
    role: 'Product, ανάπτυξη',
    duration: '[διάρκεια]',
    stack: ['[stack]'],
    problem:
      'Οι περισσότεροι ιδιοκτήτες δεν ξέρουν αν το site τους είναι αργό, αν έχει προβλήματα SEO ή τεχνικά κενά, μέχρι να αρχίσουν να χάνουν πελάτες.',
    approach:
      'Ήθελα ένα εργαλείο που δίνει αποτέλεσμα αμέσως, χωρίς εγγραφή και χωρίς ορολογία. Κάθε εύρημα έχει εξήγηση για το τι σημαίνει για την επιχείρηση.',
    solution:
      'Ένα εργαλείο που τρέχει έλεγχο και δίνει αναφορά με προτεραιότητες. Για πολλούς είναι η αρχή της κουβέντας για ένα Discovery.',
    results: [
      {_type: 'resultStat', value: '[Χ]', label: 'έλεγχοι που έχουν τρέξει'},
      {_type: 'resultStat', value: '[Χ]%', label: 'μετατροπή σε call'},
      {_type: 'resultStat', value: '[Χ] λεπτά', label: 'μέσος χρόνος αναφοράς'},
    ],
    artKey: 'audit',
    isPlaceholder: false,
    reviewNote: REVIEW_NOTE,
    order: 3,
    seo: {
      _type: 'seo',
      title: 'Audit tool · Side by Side',
      description: 'Ελέγχει ταχύτητα, SEO και βασικά τεχνικά σημεία ενός site.',
    },
  },
  {
    _id: 'caseStudyV2-erp',
    _type: 'caseStudyV2',
    name: '[Πελάτης Α]',
    slug: {_type: 'slug', current: 'erp'},
    kind: 'client',
    tag: 'Placeholder έργου',
    sector: '[Χονδρεμπόριο]',
    headline: 'ERP και e-shop που επιτέλους μιλάνε μεταξύ τους.',
    short: 'Παράδειγμα δομής: αντικατέστησε με πραγματικό έργο integration.',
    role: 'Discovery, αρχιτεκτονική, υλοποίηση',
    duration: '[διάρκεια]',
    stack: ['[stack]'],
    problem:
      '[Περιέγραψε το πρόβλημα με τα λόγια του πελάτη. Π.χ. οι παραγγελίες του e-shop περνούσαν με το χέρι στο ERP, με λάθη στα αποθέματα.]',
    approach: '[Τι έκανες στο Discovery, τι ανακάλυψες που δεν ήταν προφανές.]',
    solution:
      '[Τι χτίστηκε, πώς συνδέθηκαν τα συστήματα, τι άλλαξε στην καθημερινότητα της ομάδας.]',
    results: [
      {_type: 'resultStat', value: '[Χ] ώρες', label: 'λιγότερη πληκτρολόγηση την εβδομάδα'},
      {_type: 'resultStat', value: '[Χ]%', label: 'λιγότερα λάθη αποθέματος'},
      {_type: 'resultStat', value: '[Χ]', label: 'παραγγελίες τη μέρα αυτόματα'},
    ],
    artKey: 'erp',
    isPlaceholder: true,
    order: 4,
    seo: {
      _type: 'seo',
      title: '[Πελάτης Α] · Side by Side',
      description: 'ERP και e-shop που επιτέλους μιλάνε μεταξύ τους.',
    },
  },
  {
    _id: 'caseStudyV2-b2b',
    _type: 'caseStudyV2',
    name: '[Πελάτης Β]',
    slug: {_type: 'slug', current: 'b2b'},
    kind: 'client',
    tag: 'Placeholder έργου',
    sector: '[Κλάδος]',
    headline: 'B2B παραγγελίες χωρίς τηλέφωνα και Excel.',
    short: 'Παράδειγμα δομής: αντικατέστησε με πραγματικό έργο αυτοματοποίησης.',
    role: 'Αρχιτεκτονική, υλοποίηση, υποστήριξη',
    duration: '[διάρκεια]',
    stack: ['[stack]'],
    problem: '[Το πρόβλημα όπως το ζούσε ο πελάτης.]',
    approach: '[Πώς το προσέγγισες και γιατί.]',
    solution: '[Η λύση και πώς τη χρησιμοποιεί σήμερα η ομάδα.]',
    results: [
      {_type: 'resultStat', value: '[Χ]', label: 'πελάτες παραγγέλνουν online'},
      {_type: 'resultStat', value: '[Χ]%', label: 'λιγότερα τηλέφωνα'},
      {_type: 'resultStat', value: '[Χ] €', label: 'μηνιαία εξοικονόμηση'},
    ],
    artKey: 'b2b',
    isPlaceholder: true,
    order: 5,
    seo: {
      _type: 'seo',
      title: '[Πελάτης Β] · Side by Side',
      description: 'B2B παραγγελίες χωρίς τηλέφωνα και Excel.',
    },
  },
]

// -------------------------------------------------------------- testimonial

export const testimonials = [
  {
    _id: 'testimonialV2-placeholder',
    _type: 'testimonialV2',
    quote:
      'Εδώ μπαίνει πραγματική κριτική πελάτη, με άδειά του. Μία πρόταση για το πρόβλημα, μία για το αποτέλεσμα.',
    name: '[Όνομα]',
    role: '[Ρόλος]',
    company: '[Εταιρεία]',
    approved: false,
  },
]

// ------------------------------------------------------------ site settings

export const siteSettings = {
  _id: 'siteSettingsV2',
  _type: 'siteSettingsV2',
  brandName: 'Side by Side',
  tagline: 'Δίπλα σου, από την ανάλυση ως τον κώδικα.',
  email: EMAIL,
  linkedInUrl: 'https://www.linkedin.com/',
  legalLine: '© 2026 Side by Side · [ΑΦΜ / στοιχεία]',
  primaryNav: [
    {_type: 'linkItem', label: 'Υπηρεσίες', href: '/ypiresies'},
    {_type: 'linkItem', label: 'Πώς δουλεύω', href: '/pos-doulevo'},
    {_type: 'linkItem', label: 'Έργα', href: '/erga'},
    {_type: 'linkItem', label: 'Ποιος είμαι', href: '/poios-eimai'},
    {_type: 'linkItem', label: 'Επικοινωνία', href: '/epikoinonia'},
  ],
  headerCta: {_type: 'cta', label: 'Κλείσε call', href: '/epikoinonia', variant: 'm'},
  footerTagline: 'Δίπλα σου, από την ανάλυση ως τον κώδικα.',
  footerSub: 'Τεχνικός συνεργάτης για ελληνικές επιχειρήσεις.',
  footerColumns: [
    {
      _type: 'footerColumn',
      title: 'Σελίδες',
      links: [
        {_type: 'linkItem', label: 'Υπηρεσίες', href: '/ypiresies'},
        {_type: 'linkItem', label: 'Πώς δουλεύω', href: '/pos-doulevo'},
        {_type: 'linkItem', label: 'Έργα', href: '/erga'},
        {_type: 'linkItem', label: 'Ποιος είμαι', href: '/poios-eimai'},
        {_type: 'linkItem', label: 'Επικοινωνία', href: '/epikoinonia'},
      ],
    },
    {
      _type: 'footerColumn',
      title: 'Προϊόντα',
      links: [
        {_type: 'linkItem', label: 'kollekta.gr', href: '/erga/kollekta'},
        {_type: 'linkItem', label: 'ftiaxesite.gr', href: '/erga/ftiaxesite'},
        {_type: 'linkItem', label: 'Audit tool', href: '/erga/audit'},
      ],
    },
    {
      _type: 'footerColumn',
      title: 'Επαφή',
      links: [
        {_type: 'linkItem', label: EMAIL, href: `mailto:${EMAIL}`},
        {_type: 'linkItem', label: 'LinkedIn [link]', href: 'https://www.linkedin.com/'},
      ],
    },
  ],
  endorsedProducts: [
    {_type: 'linkItem', label: 'kollekta.gr', href: '/erga/kollekta'},
    {_type: 'linkItem', label: 'ftiaxesite.gr', href: '/erga/ftiaxesite'},
    {_type: 'linkItem', label: 'Audit tool', href: '/erga/audit'},
  ],
  defaultSeo: {
    _type: 'seo',
    title: 'Side by Side · Τεχνικός συνεργάτης',
    description:
      'Τεχνικός συνεργάτης για ελληνικές επιχειρήσεις. Ανάλυση, αρχιτεκτονική και κώδικας από τον ίδιο άνθρωπο.',
  },
}

// ----------------------------------------------------------------- homePage

export const homePage = {
  _id: 'homePage',
  _type: 'homePage',
  hero: {
    eyebrow: 'Τεχνικός συνεργάτης για επιχειρήσεις',
    headingLines: [
      line(['Λύνω τα τεχνικά']),
      line(['προβλήματα'], ['που οι', 'thin']),
      line(['άλλοι αφήνουν', 'thin']),
      line(['στη μέση.', 'marigold']),
    ],
    swapPrefix: 'Το',
    swapWords: ['ERP', 'CRM', 'e-shop', 'Excel', 'WMS', 'λογισμικό'],
    swapSuffix:
      'σου δεν μιλάει με τίποτα άλλο; Εκεί ξεκινάω. Ανάλυση, αρχιτεκτονική και κώδικας από τον ίδιο άνθρωπο.',
    ctas: [
      {_type: 'cta', label: 'Κλείσε discovery call', href: '/epikoinonia', variant: 'm'},
      {_type: 'cta', label: 'Δες τα έργα', href: '/erga', variant: 'g'},
    ],
    facts: [
      {_type: 'fact', value: '1', label: 'υπεύθυνος, από την αρχή ως το τέλος'},
      {_type: 'fact', value: '6–8', label: 'εβδομάδες Discovery με γραπτό πλάνο'},
      {
        _type: 'fact',
        value: '100',
        suffix: '%',
        highlightSuffix: true,
        label: 'γραπτό scope πριν ξεκινήσουμε',
      },
      {_type: 'fact', value: '4', label: 'φάσεις, η καθεμία με γραπτό παραδοτέο'},
    ],
  },
  marqueeTop: [
    'Excel με 40 καρτέλες',
    'Διπλοπληκτρολόγηση παραγγελιών',
    'ERP που δεν συγχρονίζει',
    'Προμηθευτής που εξαφανίστηκε',
    'Legacy σύστημα που φοβάσαι να αγγίξεις',
  ],
  marqueeBottom: [
    'ERP integrations',
    'Next.js',
    'Node',
    'Astro',
    'Custom e-shop',
    'Αυτοματισμοί',
    'Cloud',
  ],
  manifesto: {
    eyebrow: 'Γιατί δουλεύω αλλιώς',
    text: [
      block(
        ['Δεν πουλάω '],
        ['πακέτα.', ['strike']],
        [
          ' Δεν εξαφανίζομαι μόλις υπογράψεις. Δεν γράφω ούτε μια γραμμή κώδικα πριν καταλάβω τι πρέπει να λύσει. Κάθομαι δίπλα σου, λέω τα πράγματα με το όνομά τους και μένω μέχρι να δουλέψει.',
        ],
      ),
    ],
  },
  values: [
    {
      _type: 'valueCard',
      kicker: 'Trust',
      title: 'Ένας υπεύθυνος. Όλα γραπτά.',
      text: 'Scope, κόστος και χρονοδιάγραμμα τα έχεις στο χαρτί πριν ξεκινήσουμε. Αυτός που αναλύει είναι αυτός που χτίζει.',
      bigGlyph: '01',
    },
    {
      _type: 'valueCard',
      kicker: 'Helpful',
      title: 'Εξηγώ, δεν εντυπωσιάζω.',
      text: 'Καταλαβαίνεις κάθε απόφαση και γιατί την παίρνουμε. Χωρίς ορολογία για να φανεί ότι κάτι είναι δύσκολο.',
      bigGlyph: '02',
    },
    {
      _type: 'valueCard',
      kicker: 'Renegade',
      title: 'Σπάω το template.',
      text: 'Αν το έτοιμο εργαλείο σε περιορίζει, το λέω. Αν δεν χρειάζεσαι custom λύση, το λέω κι αυτό.',
      bigGlyph: '03',
    },
  ],
  servicesSection: {
    eyebrow: 'Υπηρεσίες',
    heading: 'Από την πρώτη ερώτηση ως το τελευταίο deploy.',
    intro:
      'Ξεκινάς από όπου βρίσκεσαι. Με ένα Discovery, με μια αρχιτεκτονική που χρειάζεται δεύτερη ματιά, ή με ένα έργο που κόλλησε.',
    services: [
      ref('serviceV2-discovery'),
      ref('serviceV2-architecture'),
      ref('serviceV2-build'),
      ref('serviceV2-cto'),
      ref('serviceV2-support'),
      ref('serviceV2-docs'),
      ref('serviceV2-pm'),
      ref('serviceV2-agency'),
    ],
  },
  partnerBand: {
    eyebrow: 'Για agencies',
    heading: 'Έχεις τον πελάτη και την ιδέα.',
    headingHighlight: 'Εγώ τη χτίζω.',
    text: 'Συνεργάζομαι ανά έργο με web, marketing και διαφημιστικά γραφεία. Μπαίνω στην ομάδα σου όταν το έργο χρειάζεται senior τεχνική δουλειά και φεύγω όταν παραδοθεί.',
    bullets: [
      {
        _type: 'bulletItem',
        title: 'Εκτίμηση πριν την προσφορά',
        text: 'Scope και κόστος, για να δώσεις τιμή με σιγουριά.',
      },
      {
        _type: 'bulletItem',
        title: 'Υλοποίηση',
        text: 'Sites, landing pages, campaign microsites, custom εφαρμογές.',
      },
      {
        _type: 'bulletItem',
        title: 'Ανάλυση και διαχείριση',
        text: 'BRD, FSD και project management για έργα πελατών σου.',
      },
      {
        _type: 'bulletItem',
        title: 'Τεχνικό setup καμπανιών',
        text: 'Integrations, φόρμες, tracking, συνδέσεις με CRM.',
      },
      {
        _type: 'bulletItem',
        title: 'Με τους δικούς σου όρους',
        text: 'White-label ή co-branded, όπως συμφωνήσουμε.',
      },
    ],
    ctas: [
      {_type: 'cta', label: 'Πώς συνεργαζόμαστε', href: '/ypiresies', variant: 'm'},
      {_type: 'cta', label: 'Έχω έργο', href: '/epikoinonia', variant: 'g'},
    ],
  },
  processSection: {
    eyebrow: 'Πώς δουλεύω',
    heading: 'Τέσσερα βήματα.\nΚανένα άλμα στο κενό.',
    cta: {_type: 'cta', label: 'Όλη η διαδικασία', href: '/pos-doulevo', variant: 'g'},
  },
  compareSection: {
    eyebrow: 'Η διαφορά',
    heading: 'Πακέτο ή κάποιος δίπλα σου;',
    intro: 'Πάτα τον διακόπτη. Οι ερωτήσεις είναι ίδιες, οι απαντήσεις όχι.',
    rowsTitle: 'Ποιον θα έχεις απέναντι',
    leftLabel: 'Τυπική προσέγγιση',
    rightLabel: 'Side by Side',
    rows: [
      {
        _type: 'compareRow',
        question: 'Ποιος σου μιλάει',
        typicalAnswer: 'Ένας ενδιάμεσος που μεταφέρει μηνύματα',
        ourAnswer: 'Αυτός που θα γράψει τον κώδικα',
      },
      {
        _type: 'compareRow',
        question: 'Το πρώτο βήμα',
        typicalAnswer: 'Μια προσφορά σε δύο μέρες',
        ourAnswer: 'Discovery με γραπτό πλάνο',
      },
      {
        _type: 'compareRow',
        question: 'Η τιμή',
        typicalAnswer: 'Πακέτο «Basic, Pro, Premium»',
        ourAnswer: 'Ανά scope, γραμμένη πριν ξεκινήσουμε',
      },
      {
        _type: 'compareRow',
        question: 'Μετά το launch',
        typicalAnswer: 'Νέα προσφορά για κάθε αλλαγή',
        ourAnswer: 'Υποστήριξη ή retainer με τον ίδιο άνθρωπο',
      },
    ],
  },
  featuredCasesSection: {
    eyebrow: 'Επιλεγμένα έργα',
    heading: 'Πράγματα που έχτισα και τρέχουν.',
    intro:
      'Τα δικά μου προϊόντα είναι η καλύτερη απόδειξη: τα σχεδίασα, τα έχτισα και τα συντηρώ.',
    ctaLabel: 'Όλα τα έργα',
  },
  featuredCases: [
    ref('caseStudyV2-kollekta'),
    ref('caseStudyV2-ftiaxesite'),
    ref('caseStudyV2-audit'),
  ],
  testimonialSection: {
    eyebrow: 'Τι λένε οι πελάτες',
    testimonial: ref('testimonialV2-placeholder'),
    placeholderQuote:
      'Εδώ μπαίνει πραγματική κριτική πελάτη, με άδειά του. Μία πρόταση για το πρόβλημα, μία για το αποτέλεσμα.',
    placeholderAttribution: '[Όνομα] · [Ρόλος] · [Εταιρεία]',
  },
  faq: {
    eyebrow: 'Συχνές ερωτήσεις',
    heading: 'Πριν μου στείλεις.',
    items: [
      {
        _type: 'faqItem',
        question: 'Γιατί να πληρώσω Discovery πριν την υλοποίηση;',
        answer:
          'Γιατί τα περισσότερα έργα που αποτυγχάνουν δεν αποτυγχάνουν στον κώδικα, αλλά στο τι αποφασίστηκε να χτιστεί. Στο Discovery φεύγεις με γραπτό πλάνο, κόστος και χρονοδιάγραμμα. Είναι δικό σου, ακόμα κι αν δεν συνεχίσουμε μαζί.',
      },
      {
        _type: 'faqItem',
        question: 'Δουλεύεις μόνος σου;',
        answer:
          'Ναι, και αυτό είναι το πλεονέκτημα. Αν ένα έργο χρειαστεί επιπλέον ανθρώπους, το ξέρεις από την αρχή και η ευθύνη μένει σε μένα.',
      },
      {
        _type: 'faqItem',
        question: 'Φτιάχνεις και απλά websites;',
        answer:
          'Για απλά sites μικρών επιχειρήσεων υπάρχει το ftiaxesite.gr. Εδώ αναλαμβάνω έργα όπου το site είναι μέρος ενός μεγαλύτερου συστήματος: ERP, αποθήκη, B2B παραγγελίες, αυτοματισμοί.',
      },
      {
        _type: 'faqItem',
        question: 'Τι είναι BRD, FSD και RFP και ποιο χρειάζομαι;',
        answer:
          'Το BRD περιγράφει τι χρειάζεται η επιχείρηση και γιατί. Το FSD περιγράφει πώς θα δουλεύει το σύστημα, ώστε ο developer να ξέρει ακριβώς τι χτίζει. Το RFP είναι το έγγραφο που στέλνεις σε προμηθευτές για να πάρεις προσφορές που συγκρίνονται μεταξύ τους. Αν δεν ξέρεις ποιο χρειάζεσαι, το βρίσκουμε μαζί σε ένα call.',
      },
      {
        _type: 'faqItem',
        question: 'Συνεργάζεσαι με agencies;',
        answer:
          'Ναι. Με web, marketing και διαφημιστικά γραφεία, ανά έργο. Εσείς έχετε τον πελάτη και τη δημιουργική ιδέα, εγώ αναλαμβάνω το τεχνικό κομμάτι, από την εκτίμηση πριν την προσφορά μέχρι την παράδοση.',
      },
      {
        _type: 'faqItem',
        question: 'Τι γίνεται αν έχω ήδη έργο που κόλλησε;',
        answer:
          'Ξεκινάμε με τεχνική συμβουλευτική με την ώρα. Κοιτάω τι υπάρχει, σου λέω ειλικρινά αν σώζεται και τι θα κοστίσει.',
      },
    ],
  },
  bigCta: {
    _type: 'bigCta',
    eyebrow: 'Επόμενο βήμα',
    headingLines: [line(['Ας το λύσουμε']), line(['μαζί.', 'marigold'])],
    ctas: [{_type: 'cta', label: 'Κλείσε discovery call', href: '/epikoinonia', variant: 'm'}],
    showEmail: true,
  },
  seo: {
    _type: 'seo',
    title: 'Side by Side · Τεχνικός συνεργάτης',
    description:
      'Λύνω τα τεχνικά προβλήματα που οι άλλοι αφήνουν στη μέση. Ανάλυση, αρχιτεκτονική και κώδικας από τον ίδιο άνθρωπο.',
  },
}

// ------------------------------------------------------------- servicesPage

export const servicesPage = {
  _id: 'servicesPage',
  _type: 'servicesPage',
  hero: {
    _type: 'pageHero',
    eyebrow: 'Υπηρεσίες',
    headingLines: [line(['Ό,τι χρειάζεται']), line(['για να'], ['δουλέψει.', 'marigold'])],
    lead: 'Πολλοί τρόποι να δουλέψουμε μαζί. Όλοι ξεκινούν από το ίδιο σημείο: να καταλάβω πρώτα το πρόβλημα.',
  },
  services: [
    ref('serviceV2-discovery'),
    ref('serviceV2-architecture'),
    ref('serviceV2-build'),
    ref('serviceV2-cto'),
    ref('serviceV2-consulting'),
    ref('serviceV2-support'),
    ref('serviceV2-docs'),
    ref('serviceV2-pm'),
    ref('serviceV2-agency'),
  ],
  docsSection: {
    eyebrow: 'Έγγραφα που γράφω',
    heading: 'Πριν από τον κώδικα, το χαρτί.',
    intro:
      'Τα περισσότερα έργα κολλάνε επειδή κανείς δεν έγραψε καθαρά τι πρέπει να γίνει. Αυτά τα τρία έγγραφα το λύνουν.',
    docCards: [
      {
        _type: 'docCard',
        code: 'BRD',
        title: 'Business Requirements',
        text: 'Τι χρειάζεται η επιχείρηση και γιατί. Στόχοι, διαδικασίες, χρήστες και πώς θα μετρήσουμε αν πέτυχε.',
        audience: 'Για: διοίκηση, stakeholders',
      },
      {
        _type: 'docCard',
        code: 'FSD',
        title: 'Functional Specification',
        text: 'Πώς θα δουλεύει το σύστημα. Λειτουργίες, ροές, κανόνες, οθόνες και integrations, ώστε κάθε developer να ξέρει τι χτίζει.',
        audience: 'Για: developers, agencies',
      },
      {
        _type: 'docCard',
        code: 'RFP',
        title: 'Request for Proposal',
        text: 'Το έγγραφο που στέλνεις σε προμηθευτές. Scope, απαιτήσεις και κριτήρια αξιολόγησης, για προσφορές που συγκρίνονται μεταξύ τους.',
        audience: 'Για: εταιρείες που ψάχνουν προμηθευτή',
      },
    ],
  },
  techStack: {
    eyebrow: 'Τεχνολογίες',
    heading: 'Εργαλεία που διαλέγω για τον σκοπό, όχι από συνήθεια.',
    items: [
      'Next.js',
      'React',
      'Node.js',
      'Astro',
      'TypeScript',
      'REST & GraphQL APIs',
      'ERP integrations',
      'Headless CMS',
      'Cloud hosting',
      'Αυτοματισμοί ροών',
      'Custom e-shops',
      '[+ δικά σου]',
    ],
  },
  bigCta: {
    _type: 'bigCta',
    headingLines: [line(['Δεν ξέρεις']), line(['από πού να ξεκινήσεις;', 'marigold'])],
    ctas: [{_type: 'cta', label: 'Πες μου το πρόβλημα', href: '/epikoinonia', variant: 'm'}],
    showEmail: false,
  },
  seo: {
    _type: 'seo',
    title: 'Υπηρεσίες · Side by Side',
    description:
      'Πολλοί τρόποι να δουλέψουμε μαζί. Όλοι ξεκινούν από το ίδιο σημείο: να καταλάβω πρώτα το πρόβλημα.',
  },
}

// -------------------------------------------------------------- processPage

export const processPage = {
  _id: 'processPage',
  _type: 'processPage',
  hero: {
    _type: 'pageHero',
    eyebrow: 'Πώς δουλεύω',
    headingLines: [line(['Πρώτα καταλαβαίνω.']), line(['Μετά χτίζω.', 'marigold'])],
    lead: 'Μια διαδικασία σε τέσσερις φάσεις, όπου σε κάθε βήμα ξέρεις τι παίρνεις, πόσο κοστίζει και τι ακολουθεί.',
  },
  steps: [
    ref('processStepV2-01'),
    ref('processStepV2-02'),
    ref('processStepV2-03'),
    ref('processStepV2-04'),
  ],
  rulesSection: {
    eyebrow: 'Κανόνες',
    heading: 'Τρία πράγματα που δεν κάνω ποτέ.',
    rules: [
      {
        _type: 'valueCard',
        kicker: 'Κανόνας 1',
        title: 'Δεν ξεκινάω χωρίς γραπτό scope.',
        text: 'Αν δεν μπορούμε να το γράψουμε, δεν μπορούμε να το κοστολογήσουμε σωστά.',
        bigGlyph: '✕',
      },
      {
        _type: 'valueCard',
        kicker: 'Κανόνας 2',
        title: 'Δεν κρύβω κακά νέα.',
        text: 'Αν κάτι καθυστερεί ή κοστίζει περισσότερο, το μαθαίνεις την ίδια μέρα που το μαθαίνω.',
        bigGlyph: '✕',
      },
      {
        _type: 'valueCard',
        kicker: 'Κανόνας 3',
        title: 'Δεν πουλάω ό,τι δεν χρειάζεσαι.',
        text: 'Αν ένα έτοιμο εργαλείο κάνει τη δουλειά, θα το ακούσεις από μένα πρώτα.',
        bigGlyph: '✕',
      },
    ],
  },
  bigCta: {
    _type: 'bigCta',
    headingLines: [line(['Ξεκίνα με']), line(['ένα call.', 'marigold'])],
    ctas: [{_type: 'cta', label: 'Κλείσε discovery call', href: '/epikoinonia', variant: 'm'}],
    showEmail: false,
  },
  seo: {
    _type: 'seo',
    title: 'Πώς δουλεύω · Side by Side',
    description:
      'Μια διαδικασία σε τέσσερις φάσεις, όπου σε κάθε βήμα ξέρεις τι παίρνεις, πόσο κοστίζει και τι ακολουθεί.',
  },
}

// ----------------------------------------------------------------- workPage

export const workPage = {
  _id: 'workPage',
  _type: 'workPage',
  hero: {
    _type: 'pageHero',
    eyebrow: 'Έργα',
    headingLines: [line(['Όχι mockups.']), line(['Συστήματα που τρέχουν.', 'marigold'])],
    lead: 'Δικά μου προϊόντα και έργα πελατών. Για το καθένα: το πρόβλημα, τι αποφασίσαμε και τι άλλαξε.',
  },
  filterLabels: {
    all: 'Όλα',
    product: 'Δικά μου προϊόντα',
    client: 'Έργα πελατών',
  },
  seo: {
    _type: 'seo',
    title: 'Έργα · Side by Side',
    description:
      'Δικά μου προϊόντα και έργα πελατών. Για το καθένα: το πρόβλημα, τι αποφασίσαμε και τι άλλαξε.',
  },
}

// -------------------------------------------------------------- aboutPageV2

export const aboutPage = {
  _id: 'aboutPageV2',
  _type: 'aboutPageV2',
  hero: {
    _type: 'pageHero',
    eyebrow: 'Ποιος είμαι',
    headingLines: [line(['Ένας άνθρωπος.']), line(['Ξεκάθαρη ευθύνη.', 'marigold'])],
  },
  portraitPlaceholder: '[Φωτογραφία σου εδώ]\n4:5, φυσικό φως, όχι stock',
  bio: [
    block(
      ['Είμαι ο [Όνομα Επώνυμο].', ['strong']],
      [
        ' Δουλεύω με επιχειρήσεις που έχουν ξεπεράσει τα έτοιμα εργαλεία και χρειάζονται κάποιον να δει την εικόνα ολόκληρη: τις διαδικασίες, τα συστήματα και τον κώδικα.',
      ],
    ),
    block(
      ['Ξεκινάω πάντα από την ανάλυση. Έχω δουλέψει ως '],
      ['business analyst, project και product manager', ['strong']],
      [
        ' και ως developer, οπότε μπορώ να μιλήσω με τη διοίκηση το πρωί και να γράψω τον κώδικα το απόγευμα.',
      ],
    ),
    block([
      'Το Side by Side το έστησα για να δουλεύω όπως θα ήθελα να δουλεύουν μαζί μου: δίπλα στον πελάτη, με γραπτές δεσμεύσεις και χωρίς μεσάζοντες. [1–2 προτάσεις για την πορεία σου, χρόνια εμπειρίας, κλάδους]',
    ]),
  ],
  ctas: [
    {_type: 'cta', label: 'Ας γνωριστούμε', href: '/epikoinonia', variant: 'm'},
    {_type: 'cta', label: 'Δες τι έχω χτίσει', href: '/erga', variant: 'g'},
  ],
  rolesSection: {
    eyebrow: 'Τι φέρνω στο τραπέζι',
    heading: 'Τέσσερις ρόλοι, ένας άνθρωπος.',
    intro:
      'Συνήθως είναι τέσσερις διαφορετικοί άνθρωποι. Εδώ είναι ένας, οπότε τίποτα δεν χάνεται στη μετάφραση.',
    roles: [
      {
        _type: 'bulletItem',
        title: 'Business analysis',
        text: 'Καταλαβαίνω πώς δουλεύει η επιχείρησή σου και πού πονάει.',
      },
      {
        _type: 'bulletItem',
        title: 'Requirements',
        text: 'Γράφω τι πρέπει να χτιστεί, ώστε να μην υπάρχουν παρεξηγήσεις.',
      },
      {
        _type: 'bulletItem',
        title: 'Project & product management',
        text: 'Κρατάω το έργο σε χρόνο και budget, και το προϊόν στον σωστό δρόμο.',
      },
      {
        _type: 'bulletItem',
        title: 'Development',
        text: 'Χτίζω και συντηρώ τη λύση, από το front-end ως τα integrations.',
      },
    ],
  },
  productsSection: {
    eyebrow: 'Δικά μου προϊόντα',
    heading: 'Δεν συμβουλεύω μόνο. Χτίζω και τρέχω τα δικά μου.',
    cases: [
      ref('caseStudyV2-kollekta'),
      ref('caseStudyV2-ftiaxesite'),
      ref('caseStudyV2-audit'),
    ],
  },
  seo: {
    _type: 'seo',
    title: 'Ποιος είμαι · Side by Side',
    description:
      'Ένας άνθρωπος, ξεκάθαρη ευθύνη. Business analysis, requirements, project management και development από τον ίδιο άνθρωπο.',
  },
}

// -------------------------------------------------------------- contactPage

export const contactPage = {
  _id: 'contactPage',
  _type: 'contactPage',
  hero: {
    _type: 'pageHero',
    eyebrow: 'Επικοινωνία',
    headingLines: [line(['Πες μου τι']), line(['σε δυσκολεύει.', 'marigold'])],
    lead: 'Όχι brief, όχι RFP. Γράψε με δικά σου λόγια τι δεν δουλεύει. Απαντάω μέσα σε [Χ] εργάσιμες.',
  },
  form: {
    nameLabel: 'Όνομα',
    namePlaceholder: 'Μαρία Παπαδοπούλου',
    emailLabel: 'Email',
    emailPlaceholder: 'maria@etairia.gr',
    companyLabel: 'Εταιρεία',
    companyPlaceholder: 'Όνομα εταιρείας και τι κάνει',
    needLegend: 'Τι χρειάζεσαι',
    budgetLegend: 'Ενδεικτικό budget',
    messageLabel: 'Τι δεν δουλεύει σήμερα;',
    messagePlaceholder:
      'Π.χ. οι παραγγελίες από το e-shop περνάνε με το χέρι στο ERP και χάνουμε 2 ώρες τη μέρα.',
    submitLabel: 'Στείλε μήνυμα',
  },
  needOptions: [
    {_type: 'formOption', value: 'discovery', label: 'Discovery'},
    {_type: 'formOption', value: 'arch', label: 'Αρχιτεκτονική'},
    {_type: 'formOption', value: 'build', label: 'Υλοποίηση'},
    {_type: 'formOption', value: 'cto', label: 'Fractional CTO'},
    {_type: 'formOption', value: 'rescue', label: 'Έργο που κόλλησε'},
    {_type: 'formOption', value: 'docs', label: 'BRD / FSD / RFP'},
    {_type: 'formOption', value: 'pm', label: 'Project / product management'},
    {_type: 'formOption', value: 'agency', label: 'Συνεργασία ως agency'},
    {_type: 'formOption', value: 'unsure', label: 'Δεν ξέρω ακόμα'},
  ],
  budgetOptions: [
    {_type: 'formOption', value: '1', label: 'έως €5.000'},
    {_type: 'formOption', value: '2', label: '€5–15.000'},
    {_type: 'formOption', value: '3', label: '€15–40.000'},
    {_type: 'formOption', value: '4', label: '€40.000+'},
  ],
  privacyNote: 'Χωρίς newsletter. Χωρίς follow-up spam.',
  successMessage: 'Το μήνυμα στάλθηκε. Το διαβάζω προσωπικά και απαντάω σύντομα.',
  nextStepsTitle: 'Τι γίνεται μετά',
  nextSteps: [
    {_type: 'bulletItem', title: 'Διαβάζω το μήνυμά σου', text: 'Προσωπικά, όχι bot.'},
    {
      _type: 'bulletItem',
      title: 'Call 30 λεπτών',
      text: 'Χωρίς κόστος. Καταλαβαίνω το πρόβλημα και σου λέω αν μπορώ να βοηθήσω.',
    },
    {
      _type: 'bulletItem',
      title: 'Γραπτή πρόταση',
      text: 'Συνήθως για Discovery, με σαφές scope και τιμή.',
    },
  ],
  directLabel: 'Ή κατευθείαν',
  seo: {
    _type: 'seo',
    title: 'Επικοινωνία · Side by Side',
    description:
      'Όχι brief, όχι RFP. Γράψε με δικά σου λόγια τι δεν δουλεύει. Απαντάω μέσα σε [Χ] εργάσιμες.',
  },
}

/** Referenced documents come first so references always resolve. */
export const documents = [
  ...services,
  ...processSteps,
  ...caseStudies,
  ...testimonials,
  siteSettings,
  homePage,
  servicesPage,
  processPage,
  workPage,
  aboutPage,
  contactPage,
]
