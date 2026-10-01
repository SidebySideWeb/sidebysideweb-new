/** Category labels for work-page filters (Greek). */
export const CASE_CATEGORY_LABELS: Record<string, string> = {
  fashion: 'Μόδα',
  hospitality: 'Εστίαση',
  construction: 'Κατασκευές',
  media: 'Μέσα ενημέρωσης',
  sports: 'Αθλητισμός',
  travel: 'Τουρισμός',
}

export function categoryLabel(key?: string | null): string {
  if (!key) return ''
  return CASE_CATEGORY_LABELS[key] ?? key
}
