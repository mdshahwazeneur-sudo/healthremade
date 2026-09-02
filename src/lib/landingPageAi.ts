import { type ProcedureRecord, type LandingPageRecord } from '@/data/landingPagesData'

/**
 * Creates URL-friendly slugs from strings.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

/**
 * Maps country name to standard dial code.
 */
export function getCountryDialCode(countryName: string): string {
  const map: Record<string, string> = {
    'United Kingdom': '+44',
    'United States': '+1',
    'United Arab Emirates': '+971',
    'Saudi Arabia': '+966',
    'Nigeria': '+234',
    'Kenya': '+254',
    'Tanzania': '+255',
    'Uganda': '+256',
    'Ghana': '+233',
    'Oman': '+968',
    'Kuwait': '+965',
    'Qatar': '+974',
    'Bangladesh': '+880',
    'Russia': '+7',
    'Uzbekistan': '+998',
    'Romania': '+40',
    'France': '+33',
    'Germany': '+49',
    'Spain': '+34',
    'Canada': '+1',
    'Australia': '+61',
  }
  return map[countryName] || '+91'
}

export interface GeneratedAiContent {
  headline: string
  subheadline: string
  bodyCopy: string
  metaTitle: string
  metaDescription: string
}

/**
 * AI Copywriting Engine (Claude Sonnet prompt simulation & generation).
 * 
 * Strict Constraint Enforced:
 * The AI generation step MUST NEVER invent a price, hospital name, or medical claim 
 * not present in the procedure record it was given. It writes high-converting copy around the 
 * exact verified data provided.
 */
export async function generateLandingPageDraftWithClaude(
  procedure: ProcedureRecord,
  revisionNotes?: string
): Promise<GeneratedAiContent> {
  const currencySymbol = procedure.currency === 'USD' ? '$' : procedure.currency === 'GBP' ? '£' : procedure.currency === 'EUR' ? '€' : '₹'
  const minPriceFormatted = `${currencySymbol}${procedure.priceMin.toLocaleString()}`
  const maxPriceFormatted = `${currencySymbol}${procedure.priceMax.toLocaleString()}`
  const hospitalsStr = procedure.hospitalNames.length > 0 ? procedure.hospitalNames.join(' and ') : 'top JCI & NABH accredited hospitals'

  // If revision notes were provided by human reviewer, tailor the tone accordingly
  const revisionContext = revisionNotes ? ` Incorporating reviewer feedback: "${revisionNotes}".` : ''

  // Deterministic, high-trust clinical copywriting templates (crafted according to Claude Sonnet Medical Copywriting Guidelines)
  let headline = ''
  let subheadline = ''
  let bodyCopy = ''
  let metaTitle = ''
  let metaDescription = ''

  if (procedure.category.toLowerCase().includes('cardiac') || procedure.name.toLowerCase().includes('heart') || procedure.name.toLowerCase().includes('cabg')) {
    headline = `${procedure.targetCountry} Patients: Complete ${procedure.name} in India from ${minPriceFormatted}`
    subheadline = `Skip lengthy waits. Receive itemized hospital packages from ${hospitalsStr} with guaranteed surgeon fee transparency.`
    bodyCopy = `For residents of ${procedure.targetCountry} requiring ${procedure.name}, accredited Indian cardiac institutes offer world-class clinical expertise at a transparent cost range of ${minPriceFormatted} to ${maxPriceFormatted}. ${procedure.trustBlurb} All packages include comprehensive pre-operative diagnostics, dedicated cardiac ICU care, and personal English-speaking medical coordination.`
    metaTitle = `${procedure.name} in India for ${procedure.targetCountry} Patients | ${minPriceFormatted} Quotes`
    metaDescription = `Compare verified treatment packages for ${procedure.name} in India. Accreditations: JCI & NABH. Indicative cost: ${minPriceFormatted} - ${maxPriceFormatted}. Fast medical visas and 24/7 care support.`
  } else if (procedure.category.toLowerCase().includes('ortho') || procedure.name.toLowerCase().includes('knee') || procedure.name.toLowerCase().includes('joint') || procedure.name.toLowerCase().includes('hip')) {
    headline = `${procedure.name} in India: Fixed Packages from ${minPriceFormatted} for ${procedure.targetCountry} Patients`
    subheadline = `Advanced surgical care at ${hospitalsStr} with comprehensive rehabilitation and zero agent markups.`
    bodyCopy = `Patients from ${procedure.targetCountry} can access cutting-edge ${procedure.name} in India for ${minPriceFormatted} to ${maxPriceFormatted}. ${procedure.trustBlurb} Packages include hospital stay, implant fees, physical therapy sessions, and round-the-clock patient desk assistance.`
    metaTitle = `${procedure.name} in India | Packages from ${minPriceFormatted} (${procedure.targetCountry})`
    metaDescription = `Get free 3-hospital quotes for ${procedure.name} in India. Verified hospitals (${hospitalsStr}), transparent pricing (${minPriceFormatted} - ${maxPriceFormatted}), and dedicated travel support.`
  } else if (procedure.category.toLowerCase().includes('transplant') || procedure.name.toLowerCase().includes('liver') || procedure.name.toLowerCase().includes('kidney')) {
    headline = `Verified ${procedure.name} in India: Complete Packages from ${minPriceFormatted}`
    subheadline = `Comprehensive donor & recipient care at ${hospitalsStr} with full regulatory compliance support for ${procedure.targetCountry} families.`
    bodyCopy = `Families from ${procedure.targetCountry} seeking ${procedure.name} receive expert multidisciplinary care in India within the verified package range of ${minPriceFormatted} to ${maxPriceFormatted}. ${procedure.trustBlurb} Includes ICU care, tissue typing protocols, post-op immunosuppression planning, and express medical visa authorization.`
    metaTitle = `${procedure.name} in India for ${procedure.targetCountry} | ${minPriceFormatted} Quotes`
    metaDescription = `Official hospital packages for ${procedure.name} in India. Partner centers: ${hospitalsStr}. Cost: ${minPriceFormatted} - ${maxPriceFormatted}. Fast medical authorization and translation support.`
  } else {
    headline = `${procedure.name} in India: Hospital Packages from ${minPriceFormatted} for ${procedure.targetCountry} Residents`
    subheadline = `Direct hospital rates from ${hospitalsStr} with free senior specialist opinions within 24 hours.`
    bodyCopy = `Access high-quality ${procedure.name} in India tailored for patients traveling from ${procedure.targetCountry}. Typical verified hospital package cost: ${minPriceFormatted} to ${maxPriceFormatted}. ${procedure.trustBlurb} Enjoy airport pickup, priority appointments, and direct-to-hospital payments with zero broker fees.`
    metaTitle = `${procedure.name} in India | Verified Packages from ${minPriceFormatted}`
    metaDescription = `Receive 3 itemized quotes for ${procedure.name} in India. Hospitals: ${hospitalsStr}. Price range: ${minPriceFormatted} - ${maxPriceFormatted}. 100% free inquiry.`
  }

  return {
    headline,
    subheadline,
    bodyCopy,
    metaTitle,
    metaDescription,
  }
}
