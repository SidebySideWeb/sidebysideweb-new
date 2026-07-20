/**
 * Populate Attiki + Metaixmio case studies with approved CMS content.
 * Run: npx sanity exec scripts/populate-case-studies.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

function loc(el: string) {
  return {el, en: ''}
}

function key(prefix: string, index: number) {
  return `${prefix}${index}`
}

const attiki = {
  _id: 'case-study-2',
  _type: 'caseStudy',
  layout: 'automation',
  title: loc('Αυτοματισμός Ενημέρωσης Συμβάντων — με το 1/10 του Κόστους'),
  slug: {_type: 'slug', current: 'automation-nea-attiki-odos-twitter'},
  tag: loc('Business Automation & Integration'),
  client: loc('Νέα Αττική Οδός'),
  intro: loc(
    'Η Νέα Αττική Οδός χρησιμοποιούσε το Twitter ως βασικό κανάλι άμεσης ενημέρωσης των οδηγών για συμβάντα στον δρόμο. Ο στόχος: οι πληροφορίες αυτές να εμφανίζονται άμεσα και αξιόπιστα και στην επίσημη ιστοσελίδα.',
  ),
  summary: loc(
    'Η Νέα Αττική Οδός χρησιμοποιούσε το Twitter ως βασικό κανάλι άμεσης ενημέρωσης. Ξανασχεδίασα τη ροή με Zapier και XML feed — $19,99/μήνα αντί για $200+.',
  ),
  chips: ['Twitter API', 'Zapier', 'Google Sheets', 'XML/RSS Feed', 'Custom Logic'],
  featured: true,
  order: 1,
  heroMainResult: '~90%',
  cardStats: [
    {_key: 'a1', _type: 'cardStat', value: '$19,99', label: loc('Κόστος/μήνα')},
    {_key: 'a2', _type: 'cardStat', value: '~90%', label: loc('Χαμηλότερο κόστος')},
    {_key: 'a3', _type: 'cardStat', value: '0', label: loc('Downtime')},
  ],
  challenges: [
    {
      _key: key('ch', 1),
      _type: 'caseStudyChallenge',
      title: loc('Μοναδική πηγή'),
      body: loc(
        'Το Twitter ήταν το μοναδικό αξιόπιστο σημείο ενημέρωσης. Καμία εναλλακτική πηγή δεδομένων· η εξάρτηση ήταν πλήρης.',
      ),
    },
    {
      _key: key('ch', 2),
      _type: 'caseStudyChallenge',
      title: loc('Έλλειψη feed'),
      body: loc(
        'Δεν υπήρχε επίσημο API feed για εύκολη ενσωμάτωση στο site. Χρειαζόταν custom λύση για μεταφορά δεδομένων σε πραγματικό χρόνο.',
      ),
    },
    {
      _key: key('ch', 3),
      _type: 'caseStudyChallenge',
      title: loc('Real-time ενημέρωση'),
      body: loc(
        'Καθυστέρηση λίγων λεπτών θα μπορούσε να επηρεάσει χιλιάδες οδηγούς στο οδικό δίκτυο.',
      ),
    },
    {
      _key: key('ch', 4),
      _type: 'caseStudyChallenge',
      title: loc('Platform risk'),
      body: loc(
        'Η αλλαγή πολιτικής του Twitter κατάργησε τη δωρεάν πρόσβαση στο API, απαιτώντας πλήρη ανασχεδιασμό.',
      ),
    },
  ],
  costSection: {
    title: loc('Το Κόστος — Εκεί που Φάνηκε η Διαφορά'),
    paragraphs: [
      {
        _key: 'cp1',
        ...loc(
          'Μετά την αλλαγή τιμολόγησης του Twitter, η πρόσβαση στο API έγινε συνδρομητική. Το Basic πακέτο κόστιζε $200/μήνα — και τον πρώτο μήνα χρήσης, τα credits εξαντλήθηκαν στις πρώτες 10 ημέρες. Η «προφανής» λύση ήταν αναβάθμιση σε ακριβότερο tier, με πολλαπλάσιο κόστος για μια απλή ανάγκη: την εμφάνιση των τελευταίων tweets στο site.',
        ),
      },
      {
        _key: 'cp2',
        ...loc('Αντί να αγοράσουμε περισσότερο API, ξανασχεδίασα τη ροή:'),
      },
    ],
    steps: [
      loc('Το Zapier καταγράφει τα τελευταία tweets του λογαριασμού σε Google Sheets.'),
      loc('Δημιουργείται αυτόματα XML feed από τα δεδομένα.'),
      loc('Το site διαβάζει το feed και εμφανίζει πάντα φρέσκα tweets (headline carousel).'),
    ].map((item, i) => ({_key: key('cs', i), ...item})),
    closing: loc(
      'Συνολικό κόστος λειτουργίας: $19,99/μήνα — ξεκινώντας μάλιστα από το free tier του Zapier. Χωρίς όρια credits, χωρίς εξάρτηση από τις τιμολογήσεις της πλατφόρμας.',
    ),
  },
  resultStats: [
    {
      _key: 'rs1',
      _type: 'caseStudyStat',
      value: '$19,99/μήνα',
      label: loc('συνολικό κόστος (αντί $200+ που δεν επαρκούσαν)'),
      animate: false,
    },
    {
      _key: 'rs2',
      _type: 'caseStudyStat',
      value: '~90%',
      label: loc('χαμηλότερο μηνιαίο κόστος (χωρίς όριο credits)'),
      animate: true,
    },
    {
      _key: 'rs3',
      _type: 'caseStudyStat',
      value: 'Αυτόματη',
      label: loc('ενημέρωση site (από χειροκίνητη)'),
      animate: false,
    },
    {
      _key: 'rs4',
      _type: 'caseStudyStat',
      value: '0',
      label: loc('downtime (πλήρης εποπτεία δεδομένων)'),
      animate: false,
    },
  ],
  beforeAfter: [
    {
      _key: 'ba1',
      _type: 'caseStudyBeforeAfter',
      before: loc('Χειροκίνητη ενημέρωση'),
      after: loc('Αυτόματη ενημέρωση'),
    },
    {
      _key: 'ba2',
      _type: 'caseStudyBeforeAfter',
      before: loc('Πλήρης εξάρτηση από Twitter'),
      after: loc('Ανεξαρτησία πλατφόρμας'),
    },
    {
      _key: 'ba3',
      _type: 'caseStudyBeforeAfter',
      before: loc('Αδυναμία ελέγχου'),
      after: loc('Πλήρης εποπτεία'),
    },
    {
      _key: 'ba4',
      _type: 'caseStudyBeforeAfter',
      before: loc('Κίνδυνος downtime'),
      after: loc('Μηδέν downtime'),
    },
  ],
  whyItMatters: {
    title: loc('Γιατί Έχει Σημασία'),
    paragraphs: [
      {
        _key: 'wp1',
        ...loc(
          'Η προφανής λύση ήταν «πλήρωσε το επόμενο tier». Η σωστή λύση ήταν να ρωτήσουμε τι πραγματικά χρειαζόμαστε — και να το χτίσουμε με το 1/10 του κόστους.',
        ),
      },
      {
        _key: 'wp2',
        ...loc(
          'Αυτό το έργο δείχνει πώς η ουσιαστική αυτοματοποίηση διαδικασιών δεν απαιτεί ακριβά εργαλεία, αλλά σωστή αρχιτεκτονική σκέψη.',
        ),
      },
    ],
  },
  relatedServiceLabels: [
    {_key: 'rl1', ...loc('Business Automation & Digital Transformation')},
    {_key: 'rl2', ...loc('Technical Consulting')},
  ],
  seo: {
    metaTitle: loc('Case Study: Νέα Αττική Οδός | Αυτοματοποίηση & Twitter Feed'),
    metaDescription: loc(
      'Πώς η Νέα Αττική Οδός μείωσε το κόστος προβολής tweets στο site κατά 90%. Αυτοματοποίηση διαδικασιών με Zapier & XML feed αντί για ακριβό API.',
    ),
  },
}

const metaixmio = {
  _id: 'case-study-3',
  _type: 'caseStudy',
  layout: 'strategy',
  title: loc('Digital Project Strategy & Delivery — Εκδόσεις Μεταίχμιο'),
  slug: {_type: 'slug', current: 'case-study-metaixmio'},
  tag: loc('Project Strategy & Delivery'),
  client: loc('Εκδόσεις Μεταίχμιο'),
  intro: loc(
    'Το έργο των Εκδόσεων Μεταίχμιο ήταν ένα σύνθετο digital project με πολλαπλές επιχειρησιακές και τεχνικές προεκτάσεις.',
  ),
  summary: loc(
    'Σύνθετο digital project με UX/UI redesign, e-commerce, blog migration και ERP integration. Καθαρό scope χωρίς εκπλήξεις.',
  ),
  chips: ['UX/UI Redesign', 'E-commerce', 'Blog Migration', 'ERP Integration'],
  chipsLabel: loc('Εύρος έργου'),
  featured: true,
  order: 2,
  heroMainResult: '100%',
  cardStats: [
    {_key: 'm1', _type: 'cardStat', value: '4+', label: loc('Τμήματα')},
    {_key: 'm2', _type: 'cardStat', value: '6', label: loc('Modules')},
    {_key: 'm3', _type: 'cardStat', value: '100%', label: loc('Requirements')},
  ],
  processSteps: [
    {_key: 'p1', _type: 'caseStudyProcessStep', title: loc('Discovery'), description: loc('Κατανόηση αναγκών & στόχων')},
    {_key: 'p2', _type: 'caseStudyProcessStep', title: loc('Analysis'), description: loc('Καταγραφή requirements')},
    {_key: 'p3', _type: 'caseStudyProcessStep', title: loc('Planning'), description: loc('Roadmap & sprints')},
    {_key: 'p4', _type: 'caseStudyProcessStep', title: loc('Delivery'), description: loc('Υλοποίηση & συντονισμός')},
  ],
  roleItems: [
    {
      _key: 'r1',
      _type: 'caseStudyRoleItem',
      title: loc('Workshops & discovery'),
      body: loc('Διοργάνωση εργαστηρίων με stakeholders για κατανόηση αναγκών και στόχων.'),
    },
    {
      _key: 'r2',
      _type: 'caseStudyRoleItem',
      title: loc('User stories & acceptance criteria'),
      body: loc('Δημιουργία αναλυτικού εγγράφου requirements με user stories και κριτήρια αποδοχής.'),
    },
    {
      _key: 'r3',
      _type: 'caseStudyRoleItem',
      title: loc('Requirements documentation'),
      body: loc(
        'Δομημένη τεκμηρίωση για κάθε module: e-shop, blog, CRM, marketing integrations (π.χ. ContactPigeon).',
      ),
    },
    {
      _key: 'r4',
      _type: 'caseStudyRoleItem',
      title: loc('Project management'),
      body: loc('Συντονισμός ομάδων, sprints, deliverables και timeline.'),
    },
    {
      _key: 'r5',
      _type: 'caseStudyRoleItem',
      title: loc('Προτάσεις business automation'),
      body: loc('Εντοπισμός επαναλαμβανόμενων tasks και σχεδιασμός αυτοματισμών.'),
    },
    {
      _key: 'r6',
      _type: 'caseStudyRoleItem',
      title: loc('Υποστήριξη σε τεχνικές & εμπορικές αποφάσεις'),
      body: loc('Αξιολόγηση τεχνολογιών, vendor selection, cost-benefit analysis.'),
    },
  ],
  challenges: [
    {
      _key: 'mch1',
      _type: 'caseStudyChallenge',
      title: loc('Data Migration'),
      severity: loc('Υψηλή'),
      body: loc(
        'Migration δεδομένων blog με μεγάλο όγκο αδόμητης πληροφορίας: χιλιάδες posts με ασυνεπή δομή, ελλιπή metadata, ανεπαρκείς κατηγοριοποιήσεις και broken media links.',
      ),
    },
    {
      _key: 'mch2',
      _type: 'caseStudyChallenge',
      title: loc('Cross-Department Dependencies'),
      severity: loc('Υψηλή'),
      body: loc(
        'Μεγάλο έργο με εξαρτήσεις σε πολλαπλά τμήματα (εμπορικό, IT, ERP integration, marketing tools). Κάθε τμήμα είχε διαφορετικές προτεραιότητες και timelines.',
      ),
    },
  ],
  resultStats: [
    {_key: 'ms1', _type: 'caseStudyStat', value: '4+', label: loc('Τμήματα συντονίστηκαν'), animate: true},
    {_key: 'ms2', _type: 'caseStudyStat', value: '6', label: loc('Modules στο scope'), animate: true},
    {_key: 'ms3', _type: 'caseStudyStat', value: '100%', label: loc('Requirements documented'), animate: true},
    {_key: 'ms4', _type: 'caseStudyStat', value: '3', label: loc('Φάσεις delivery'), animate: true},
  ],
  outcomes: [
    {
      _key: 'o1',
      _type: 'caseStudyOutcome',
      title: loc('Καθαρό scope έργου'),
      body: loc('Πλήρης τεκμηρίωση κάθε module με σαφείς προδιαγραφές.'),
    },
    {
      _key: 'o2',
      _type: 'caseStudyOutcome',
      title: loc('Μειωμένο ρίσκο υλοποίησης'),
      body: loc('Ξεκάθαρο τι, πότε και πώς — πριν ξεκινήσει ο κώδικας.'),
    },
    {
      _key: 'o3',
      _type: 'caseStudyOutcome',
      title: loc('Καλύτερος συντονισμός ομάδων'),
      body: loc('Κοινή γλώσσα μεταξύ business και development teams.'),
    },
    {
      _key: 'o4',
      _type: 'caseStudyOutcome',
      title: loc('Ρεαλιστικός σχεδιασμός επόμενων φάσεων'),
      body: loc('Roadmap βασισμένο σε πραγματικά δεδομένα.'),
    },
  ],
  testimonial: {
    quote: loc(
      'Είχα την χαρά να συνεργαστώ με τον Δημήτρη Γερονικόλο στον επανασχεδιασμό της ιστοσελίδας των Εκδόσεων Μεταίχμιο, με εστίαση τόσο στο UX όσο και στο UI. Ως τεχνικός project manager, ήταν προδραστικός, πολύ διαθέσιμος και προσεκτικός στη λεπτομέρεια, εξασφαλίζοντας ομαλή εκτέλεση. Αν και οι λύσεις του μερικές φορές διέφεραν από τις προσδοκίες, το συνεργατικό του πνεύμα και η αισιόδοξη νοοτροπία του βοήθησαν να λυθούν πολλές προκλήσεις.',
    ),
    author: 'Christina Litsardopoulou',
    role: loc('Ecommerce & Ebooks Specialist, Metaichmio Publications'),
  },
  seo: {
    metaTitle: loc('Case Study: Εκδόσεις Μεταίχμιο | E-commerce & Requirements Analysis'),
    metaDescription: loc(
      'Digital Strategy & Delivery για τις Εκδόσεις Μεταίχμιο: UX/UI redesign, e-commerce, blog migration και ERP integration. Καθαρό scope χωρίς εκπλήξεις.',
    ),
  },
}

const OLD_FIELDS = [
  'category',
  'problem',
  'solution',
  'results',
  'investment',
  'fullContent',
  'relatedServices',
  'cta',
]

async function upsert(doc: Record<string, unknown>) {
  const id = doc._id as string
  await client.createOrReplace(doc)
  await client.patch(id).unset(OLD_FIELDS).commit({autoGenerateArrayKeys: false})
  console.log(`Updated ${id}`)
}

async function main() {
  await upsert(attiki as unknown as Record<string, unknown>)
  await upsert(metaixmio as unknown as Record<string, unknown>)
  await client.patch('case-study-1').set({featured: false}).unset(OLD_FIELDS).commit()
  console.log('Unfeatured case-study-1 and cleared old fields')
  console.log('Done. Publish drafts in Studio if needed, or documents are already published via createOrReplace.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
