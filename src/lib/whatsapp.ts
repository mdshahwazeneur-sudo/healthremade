/**
 * WhatsApp integration utility for healthremade.
 * Generates curated, pre-filled WhatsApp links based on page context.
 */

export const WHATSAPP_NUMBER = "919990045006"; // Dedicated WhatsApp Care Coordinator number

export interface WhatsAppContext {
  pageType?: 'home' | 'treatment' | 'hospital' | 'pricing' | 'doctors' | 'visa' | 'how-we-work' | 'outcomes' | 'general';
  treatmentName?: string;
  hospitalName?: string;
  city?: string;
  sourceUrl?: string;
  customMessage?: string;
}

/**
 * Generate a pre-filled WhatsApp message based on context.
 */
export function getWhatsAppMessage(context?: WhatsAppContext): string {
  if (context?.customMessage) {
    return context.customMessage;
  }

  if (context?.treatmentName && context?.hospitalName) {
    return `Hello healthremade! I would like to get a cost estimate and doctor consultation for *${context.treatmentName}* at *${context.hospitalName}*.`;
  }

  if (context?.treatmentName) {
    return `Hello healthremade! I am looking for hospital options, doctors, and package price estimates for *${context.treatmentName}* in India.`;
  }

  if (context?.hospitalName) {
    const citySuffix = context.city ? ` in ${context.city}` : '';
    return `Hello healthremade! I would like to enquire about treatments and doctor appointments at *${context.hospitalName}*${citySuffix}.`;
  }

  switch (context?.pageType) {
    case 'doctors':
      return `Hello healthremade! I am looking for consultations and second opinions from top accredited doctors and surgeons in India.`;
    case 'pricing':
      return `Hello healthremade! I am browsing the Pricing Explorer and would like to get an itemized cost estimate from 3+ top accredited Indian hospitals.`;
    case 'visa':
      return `Hello healthremade! I need assistance with the Indian Medical Visa (MED), embassy invitation letter, and travel arrangements.`;
    case 'how-we-work':
      return `Hello healthremade! I'd like to understand the patient pathway and speak with a care coordinator about medical treatment in India.`;
    case 'outcomes':
      return `Hello healthremade! I would like to see verified patient outcomes and hospital recommendations for my medical condition.`;
    case 'home':
    default:
      return `Hello healthremade! I am seeking medical treatment in India. Please help me with hospital recommendations and a free medical opinion.`;
  }
}

/**
 * Generate a direct WhatsApp click-to-chat URL.
 */
export function getWhatsAppUrl(context?: WhatsAppContext): string {
  const message = getWhatsAppMessage(context);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
