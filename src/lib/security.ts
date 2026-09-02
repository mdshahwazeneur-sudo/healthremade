/**
 * Security, input sanitization, and anti-spam protection utilities.
 */

/**
 * Sanitizes strings to prevent XSS and HTML injection attacks.
 */
export function sanitizeInput(input: string, maxLength = 1000): string {
  if (!input || typeof input !== 'string') return ''
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Strip angle brackets
    .replace(/javascript:/gi, '') // Strip javascript protocol
    .replace(/on\w+=/gi, '') // Strip inline event handlers like onerror=, onclick=
}

/**
 * Validates international phone number string format.
 */
export function isValidPhoneNumber(phone: string): boolean {
  if (!phone) return false
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  // Must have at least 7 digits and start with + or digits
  return /^\+?[0-9]{7,15}$/.test(cleaned)
}

/**
 * Validates email format.
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

/**
 * Honeypot check: If the hidden honeypot field is filled, it's an automated bot spammer.
 */
export function isSpamBot(honeypotValue?: string): boolean {
  return Boolean(honeypotValue && honeypotValue.trim().length > 0)
}
