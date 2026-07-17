/** Design tokens and assets from Google Stitch export (stitch_side_by_side_web_studio/) */

export const SITE_LOGO = '/images/sidebyside-logo.png'

export const STITCH_PLACEHOLDER_IMAGE =
  'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg'

/** Hero image from Stitch homepage export */
export const STITCH_HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCmAjd_HTFGnVbptZv59W3VrktQrT9LWnTBPhYtrNXNSUrPx03hIQ1WMckJKmjPcP7xB72lT377AjjqtREkqffwwzJXTx8ERX_1vjH2ch5dtCu30DZt6-bLGo96g1WH1leXqAZUYgLk8n1xa6l3pj6ivPx7b78riDGDkU5MTcN8ZpiCj-NtHvh31DBbxTlKW2-FITYtHT1WkMc-I7uF5Z3rBQAUYzJEQLaqXEnTr0C0Hh7JCJw-TBpv'

/** Case study card images from Stitch homepage export, keyed by slug */
export const STITCH_CASE_STUDY_IMAGES: Record<string, string> = {
  'workflow-automation-real-estate':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBqHiyi06DDfwLc2WQeNIOYdoFMHExFBCeQLwZbuMC4V9BW6eWttaYdP_232Jyd6m5__Kl5-hCnelZlf5onmFEhLnqXRY6V48kkVcD4OlrJlE6Thim507p2fKKF1K4TKYdR9mENyxOisXPGYxB3YvbbonmPzVQ4Ie5STyhnklHCVGB-zfHTXBCOC341I18iFkRAMFbdJt3gI5XTQpziVw9gE_dHy-bi-s-eSYeeR3Gkii4p_JCUyN53',
  'saas-mvp-launch':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAxhm8CyU_TNtqfmm3qV0qk6aYHQP42VULh0p9V7Fcs3LrDgFkEvndZCpFKnUTEUlPHC55cptum-fARZVx105OT-vfnbG0AxhyVd2qHOzWYghlOzVtTIIDFMYwwAgq4VaoFeAU-Ycg49IgOIL7OQSuJd1KzOfcajitegSSjElDVtJ1mkAR36LTtNhJVMvMKfB3XCooY0Ap5PmTf4t3kytTBHScNgivwmJ9F4aqEmuIG77QbOfnmJRR2',
  'inventory-chaos-ecommerce':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBYnV74UIxW0TXfOPdIuNxDYuDspvtBiQlhDfsQQfEt6QRg-BE7tvnbjmNvO3NK2SRRWgX-Xw88j016xy5ug4KBgWNIUrODnkBVAdwtuuK8RgIucFe-j_U3eVDJqyZK-ni1lKXGh4uNxI_von_SIM9JBE5b5L2dUQWoM_m0XsQtVZ3QB5CTaROBjLHTyPTr-vPwQA6Z3vr65csxZGOZd3d1Gt3jwDNnarua8DtC5poo3-OmtlRsXgu2',
}

export function getCaseStudyImage(slug: string): string {
  return STITCH_CASE_STUDY_IMAGES[slug] ?? STITCH_PLACEHOLDER_IMAGE
}

/** Portrait from Stitch about page export */
export const STITCH_ABOUT_PORTRAIT =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCsGyv9rt7_-77ttDYV6yvFSSpet91FaNhGu8Gf95MThWTu218vR3RJnlMe-kX1W8zfK34_53TijPrWpj1Ozr_M6ljIBB7Uu9TI40Ee6LQvl6yh0LHX02s1enLA0ryYRtuph_UoFkmN3UTbVKTFReRJFztJEdH9mUsz0sDiihdR1td55O9KW-PKxIpg7C4q9mOHKE-wyU4ezeTBriAn1enBWh6xdXx6MtvpPzI9AxpLXjNhppWiXYVz'

export const STITCH_FOOTER_TAGLINE =
  'Στρατηγικός σχεδιασμός και ανάπτυξη λογισμικού για επιχειρήσεις που απαιτούν το καλύτερο. Γεφυρώνουμε το χάσμα μεταξύ στρατηγικής και κώδικα.'

export const STITCH_NAV_LINKS = [
  {label: 'Αρχική', href: '/', active: false},
  {label: 'Υπηρεσίες', href: '#services'},
  {label: 'Μελέτες', href: '#cases'},
  {label: 'Ενημέρωση', href: '#blog'},
  {label: 'Σχετικά', href: '/about'},
  {label: 'Επικοινωνία', href: '#contact'},
] as const

export const STITCH_SOCIAL_LINKS = [
  {label: 'LinkedIn', href: 'https://www.linkedin.com/in/dimitriosgeronikolos/'},
  {label: 'Twitter (X)', href: '#'},
  {label: 'Github', href: '#'},
] as const
