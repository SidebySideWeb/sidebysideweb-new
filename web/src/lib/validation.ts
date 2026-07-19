const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value)
}

function normalizePhoneDigits(value: string): string {
  let normalized = value.replace(/[\s\-().]/g, '')

  if (normalized.startsWith('+30')) {
    normalized = normalized.slice(3)
  } else if (normalized.startsWith('0030')) {
    normalized = normalized.slice(4)
  } else if (normalized.startsWith('30') && normalized.length === 12) {
    normalized = normalized.slice(2)
  }

  return normalized.replace(/\D/g, '')
}

/** Accepts Greek landline/mobile or international numbers (8–15 digits). */
export function isValidPhone(value: string): boolean {
  const digits = normalizePhoneDigits(value)
  if (digits.length < 8 || digits.length > 15) return false
  if (digits.length === 10) {
    return /^2\d{9}$/.test(digits) || /^69\d{8}$/.test(digits)
  }
  return true
}
