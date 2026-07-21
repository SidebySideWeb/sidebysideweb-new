/**
 * Replace About page story + timeline with approved copy.
 * Run: npx sanity exec scripts/populate-about-story.ts --with-user-token
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

function loc(el: string) {
  return {el, en: ''}
}

function key(prefix: string, index: number) {
  return `${prefix}${index}`
}

const storyHeadline = loc('Η Διαδρομή μου')

const storySections = [
  {
    _key: key('story', 1),
    _type: 'aboutStorySection',
    title: loc('Πώς Ξεκίνησα'),
    content: loc(
      'Ξεκίνησα φτιάχνοντας ιστοσελίδες — WordPress, CMS platforms, στήσιμο από το μηδέν. Δεν ήμουν ο κλασικός «hardcore developer», αλλά ήξερα από βάσεις δεδομένων και front-end, και είχα ένα χαρακτηριστικό που αποδείχθηκε πιο πολύτιμο από κάθε τίτλο: μάθαινα γρήγορα και σε βάθος οποιοδήποτε εργαλείο χρειαζόταν. Με σπουδές Μηχανικού Σχεδίασης Προϊόντων & Συστημάτων, έβλεπα πάντα το σύστημα ολόκληρο — όχι μόνο τον κώδικα.',
    ),
  },
  {
    _key: key('story', 2),
    _type: 'aboutStorySection',
    title: loc('Η Αλλαγή'),
    content: loc(
      'Σύντομα κατάλαβα κάτι που άλλαξε τον τρόπο που δουλεύω: οι καλύτερες λύσεις δεν βγαίνουν από την οθόνη, βγαίνουν από τη συζήτηση. Πέρασα σε ρόλους Technical Project Management και Delivery — διαχείριση cross-functional ομάδων (PM, design, development), requirement workshops, budgets, P&L, deadlines. Έχω ηγηθεί της παράδοσης σύνθετων e-commerce και portal έργων για μεγάλους οργανισμούς — Eurobank, Τράπεζα Πειραιώς, Lacoste, Εκδόσεις Μεταίχμιο, Politeianet, Minoan Lines. Εκεί ο άνθρωπος που έφτιαχνε sites έγινε ο άνθρωπος που γεφυρώνει την επιχειρηματική στρατηγική με την τεχνική εκτέλεση.',
    ),
  },
  {
    _key: key('story', 3),
    _type: 'aboutStorySection',
    title: loc('Σήμερα'),
    content: loc(
      'Σήμερα βοηθώ επιχειρήσεις και οργανισμούς να πλοηγηθούν στο σύνθετο ψηφιακό τοπίο — με τη Side by Side Web Studio ως τον τρόπο που δουλεύω: μικρό σχήμα, καθαρή ευθύνη, άμεση επικοινωνία. Είτε πρόκειται για έναν έξυπνο αυτοματισμό που γλιτώνει κόστος, είτε για την επίβλεψη μιας κρίσιμης υλοποίησης, φέρνω μαζί μου την εμπειρία 50+ έργων σε e-commerce, banking και retail — και μια απλή αρχή: να λύνω το πραγματικό πρόβλημα, στο σωστό κόστος.',
    ),
  },
]

const timeline = [
  {
    _key: key('tl', 1),
    _type: 'aboutTimelineItem',
    title: loc('Web & Foundations'),
    description: loc(
      'Ιστοσελίδες, CMS, βάσεις, front-end. Γρήγορη, βαθιά εκμάθηση κάθε εργαλείου.',
    ),
    order: 1,
  },
  {
    _key: key('tl', 2),
    _type: 'aboutTimelineItem',
    title: loc('Technical PM & Delivery'),
    description: loc(
      'Cross-functional ομάδες, requirements, P&L, e-commerce & portals για corporate, banking και retail πελάτες.',
    ),
    order: 2,
  },
  {
    _key: key('tl', 3),
    _type: 'aboutTimelineItem',
    title: loc('Independent Consultant'),
    description: loc('Στρατηγική, αυτοματισμοί, επίβλεψη κρίσιμων έργων.'),
    order: 3,
  },
]

async function main() {
  const id = 'aboutPage'
  const existing = await client.getDocument(id)
  if (!existing) {
    throw new Error(`Document ${id} not found`)
  }

  await client.patch(id).set({storyHeadline, storySections, timeline}).commit()
  console.log('Updated aboutPage storyHeadline, storySections, and timeline.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
