export interface CountryPhoneRule {
  name: string
  code: string
  flag: string
  minDigits: number
  maxDigits: number
  placeholder: string
  example: string
}

export const COUNTRY_PHONE_RULES: CountryPhoneRule[] = [
  {
    name: 'India',
    code: '+91',
    flag: '🇮🇳',
    minDigits: 10,
    maxDigits: 10,
    placeholder: '98765 43210',
    example: '10 digits (e.g. 98765 43210)',
  },
  {
    name: 'United Kingdom',
    code: '+44',
    flag: '🇬🇧',
    minDigits: 10,
    maxDigits: 10,
    placeholder: '7123 456789',
    example: '10 digits (omit leading 0, e.g. 7123 456789)',
  },
  {
    name: 'United States',
    code: '+1',
    flag: '🇺🇸',
    minDigits: 10,
    maxDigits: 10,
    placeholder: '555 123 4567',
    example: '10 digits (e.g. 555 123 4567)',
  },
  {
    name: 'Canada',
    code: '+1',
    flag: '🇨🇦',
    minDigits: 10,
    maxDigits: 10,
    placeholder: '416 123 4567',
    example: '10 digits (e.g. 416 123 4567)',
  },
  {
    name: 'United Arab Emirates',
    code: '+971',
    flag: '🇦🇪',
    minDigits: 9,
    maxDigits: 9,
    placeholder: '50 123 4567',
    example: '9 digits (e.g. 50 123 4567)',
  },
  {
    name: 'Saudi Arabia',
    code: '+966',
    flag: '🇸🇦',
    minDigits: 9,
    maxDigits: 9,
    placeholder: '50 123 4567',
    example: '9 digits (e.g. 50 123 4567)',
  },
  {
    name: 'Oman',
    code: '+968',
    flag: '🇴🇲',
    minDigits: 8,
    maxDigits: 8,
    placeholder: '9123 4567',
    example: '8 digits (e.g. 9123 4567)',
  },
  {
    name: 'Kenya',
    code: '+254',
    flag: '🇰🇪',
    minDigits: 9,
    maxDigits: 9,
    placeholder: '712 345678',
    example: '9 digits (omit leading 0, e.g. 712 345678)',
  },
  {
    name: 'Nigeria',
    code: '+234',
    flag: '🇳🇬',
    minDigits: 10,
    maxDigits: 10,
    placeholder: '802 345 6789',
    example: '10 digits (omit leading 0, e.g. 802 345 6789)',
  },
  {
    name: 'Tanzania',
    code: '+255',
    flag: '🇹🇿',
    minDigits: 9,
    maxDigits: 9,
    placeholder: '712 345678',
    example: '9 digits (omit leading 0, e.g. 712 345678)',
  },
  {
    name: 'Uzbekistan',
    code: '+998',
    flag: '🇺🇿',
    minDigits: 9,
    maxDigits: 9,
    placeholder: '90 123 4567',
    example: '9 digits (e.g. 90 123 4567)',
  },
  {
    name: 'Bangladesh',
    code: '+880',
    flag: '🇧🇩',
    minDigits: 10,
    maxDigits: 10,
    placeholder: '1712 345678',
    example: '10 digits (omit leading 0, e.g. 1712 345678)',
  },
  {
    name: 'Australia',
    code: '+61',
    flag: '🇦🇺',
    minDigits: 9,
    maxDigits: 9,
    placeholder: '412 345 678',
    example: '9 digits (omit leading 0, e.g. 412 345 678)',
  },
  {
    name: 'Iraq',
    code: '+964',
    flag: '🇮🇶',
    minDigits: 10,
    maxDigits: 10,
    placeholder: '790 123 4567',
    example: '10 digits (e.g. 790 123 4567)',
  },
  {
    name: 'Ethiopia',
    code: '+251',
    flag: '🇪🇹',
    minDigits: 9,
    maxDigits: 9,
    placeholder: '91 123 4567',
    example: '9 digits (omit leading 0, e.g. 91 123 4567)',
  },
  {
    name: 'Ghana',
    code: '+233',
    flag: '🇬🇭',
    minDigits: 9,
    maxDigits: 9,
    placeholder: '24 123 4567',
    example: '9 digits (omit leading 0, e.g. 24 123 4567)',
  },
  {
    name: 'Kuwait',
    code: '+965',
    flag: '🇰🇼',
    minDigits: 8,
    maxDigits: 8,
    placeholder: '5123 4567',
    example: '8 digits (e.g. 5123 4567)',
  },
  {
    name: 'Qatar',
    code: '+974',
    flag: '🇶🇦',
    minDigits: 8,
    maxDigits: 8,
    placeholder: '3312 3456',
    example: '8 digits (e.g. 3312 3456)',
  },
  {
    name: 'Russia',
    code: '+7',
    flag: '🇷🇺',
    minDigits: 10,
    maxDigits: 10,
    placeholder: '912 345 6789',
    example: '10 digits (e.g. 912 345 6789)',
  },
  {
    name: 'Romania',
    code: '+40',
    flag: '🇷🇴',
    minDigits: 9,
    maxDigits: 9,
    placeholder: '712 345 678',
    example: '9 digits (e.g. 712 345 678)',
  },
  {
    name: 'France',
    code: '+33',
    flag: '🇫🇷',
    minDigits: 9,
    maxDigits: 9,
    placeholder: '612 34 56 78',
    example: '9 digits (omit leading 0, e.g. 612 34 56 78)',
  },
  {
    name: 'Germany',
    code: '+49',
    flag: '🇩🇪',
    minDigits: 10,
    maxDigits: 11,
    placeholder: '151 23456789',
    example: '10-11 digits (omit leading 0)',
  },
  {
    name: 'Spain',
    code: '+34',
    flag: '🇪🇸',
    minDigits: 9,
    maxDigits: 9,
    placeholder: '612 345 678',
    example: '9 digits (e.g. 612 345 678)',
  },
  {
    name: 'Portugal',
    code: '+351',
    flag: '🇵🇹',
    minDigits: 9,
    maxDigits: 9,
    placeholder: '912 345 678',
    example: '9 digits (e.g. 912 345 678)',
  },
  {
    name: 'Uganda',
    code: '+256',
    flag: '🇺🇬',
    minDigits: 9,
    maxDigits: 9,
    placeholder: '712 345678',
    example: '9 digits (omit leading 0, e.g. 712 345678)',
  },
  {
    name: 'Other',
    code: '+',
    flag: '🌐',
    minDigits: 7,
    maxDigits: 14,
    placeholder: 'Enter full international number',
    example: 'Include country code & 7-14 digits',
  },
]

export function getCountryPhoneRule(countryName: string): CountryPhoneRule {
  const found = COUNTRY_PHONE_RULES.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  )
  return found || COUNTRY_PHONE_RULES[COUNTRY_PHONE_RULES.length - 1] // Fallback to 'Other'
}

export interface PhoneValidationResult {
  isValid: boolean
  error: string | null
  errorMessage: string | null
  subscriberDigits: string
  dialCode: string
  fullFormattedNumber: string
  e164Number: string
  digitsCount: number
  minRequired: number
  maxRequired: number
}

/**
 * Validates and normalizes phone number based on selected country
 */
export function validatePhoneNumber(
  inputNumber: string,
  countryName: string
): PhoneValidationResult {
  const rule = getCountryPhoneRule(countryName)
  const isOther = rule.name === 'Other'

  // Extract pure digits
  let subscriberDigits = inputNumber.replace(/\D/g, '')

  // If user included the country code in their typing (e.g., typed +91 9876543210)
  const dialCodeDigits = rule.code.replace(/\D/g, '')
  if (dialCodeDigits && subscriberDigits.startsWith(dialCodeDigits)) {
    subscriberDigits = subscriberDigits.slice(dialCodeDigits.length)
  }

  // Remove leading 0 for countries where mobile numbers are entered without 0 internationally (UK, Kenya, Nigeria, etc.)
  if (rule.minDigits === rule.maxDigits && subscriberDigits.startsWith('0') && subscriberDigits.length > rule.minDigits) {
    subscriberDigits = subscriberDigits.slice(1)
  }

  const digitsCount = subscriberDigits.length

  let error: string | null = null
  let isValid = false

  if (!subscriberDigits) {
    error = 'Phone number is required.'
  } else if (digitsCount < rule.minDigits) {
    const remaining = rule.minDigits - digitsCount
    error = `Incomplete number: Enter all ${rule.minDigits} digits (${remaining} more ${remaining === 1 ? 'digit' : 'digits'} needed).`
  } else if (digitsCount > rule.maxDigits) {
    const excess = digitsCount - rule.maxDigits
    error = `Too many digits: Maximum is ${rule.maxDigits} digits (${excess} too many).`
  } else {
    // Specific validations
    if (rule.name === 'India' && !/^[6-9]/.test(subscriberDigits)) {
      error = 'Indian mobile numbers must start with 6, 7, 8, or 9.'
    } else {
      isValid = true
    }
  }

  const dialCode = rule.code
  const fullFormattedNumber = isOther
    ? `+${subscriberDigits}`
    : `${dialCode} ${subscriberDigits}`
  const e164Number = isOther
    ? `+${subscriberDigits}`
    : `${dialCode}${subscriberDigits}`

  return {
    isValid,
    error,
    errorMessage: error,
    subscriberDigits,
    dialCode,
    fullFormattedNumber,
    e164Number,
    digitsCount,
    minRequired: rule.minDigits,
    maxRequired: rule.maxDigits,
  }
}
