import type { Hospital } from '@/data/hospitals'
import type { Doctor } from '@/data/doctors'
import type { Procedure } from '@/data/procedures'

export interface FAQ {
  question: string
  answer: string
}

/**
 * 10 Comprehensive FAQs for Hospital Detail Pages (AEO & GEO Optimized)
 */
export function getHospitalFaqs(hospital: Hospital): FAQ[] {
  const accreds = [
    hospital.jciAccredId ? 'JCI (Joint Commission International)' : null,
    hospital.nabhRegNumber ? 'NABH (National Accreditation Board for Hospitals)' : null,
  ]
    .filter(Boolean)
    .join(' and ') || 'NABH and international healthcare quality protocols'

  return [
    {
      question: `Is ${hospital.name} in ${hospital.cityLabel} internationally accredited for overseas patients?`,
      answer: `${hospital.name} holds prestigious clinical accreditations including ${accreds}. These accreditations enforce the world's most stringent standards for infection control, surgical safety, patient rights, and clinical outcomes, equivalent to leading teaching hospitals in the US and Europe.`,
    },
    {
      question: `How much do medical treatments at ${hospital.name} cost compared to Western healthcare?`,
      answer: `Patients traveling to ${hospital.name} save between 70% and 85% compared to the United States, United Kingdom, Canada, and Australia. For instance, major cardiac bypass surgery or robotic joint replacement costs approximately $4,000–$7,000 USD at ${hospital.name}, whereas identical procedures in the US or UK exceed $40,000–$120,000 without insurance.`,
    },
    {
      question: `How quickly can I get an official Medical Visa (MED) invitation letter from ${hospital.name}?`,
      answer: `Once our clinical coordinators submit your passport details and latest medical reports to ${hospital.name}'s International Patient Lounge, the official hospital visa invitation letter for you and your attendant is stamped and emailed within 24 to 48 hours for immediate submission to your nearest Indian Embassy or e-Medical Visa portal.`,
    },
    {
      question: `Does ${hospital.name} offer airport transfers and multi-lingual language interpretation?`,
      answer: `Yes. All international patients receiving treatment at ${hospital.name} through healthremade receive complimentary private airport pickup from Indira Gandhi International Airport (DEL) directly to the hospital or partner guest suites. Dedicated native language translators (Arabic, Russian, French, Bengali, and Swahili) assist you continuously from admission to discharge.`,
    },
    {
      question: `What are the primary clinical centers of excellence and technologies at ${hospital.name}?`,
      answer: `${hospital.name} operates ${hospital.bedCount} beds with specialized centers of excellence including ${hospital.specialties.join(', ')}. The facility is equipped with state-of-the-art diagnostic and surgical equipment such as 3T MRI, 128-slice dual-source CT, robotic da Vinci Xi surgical systems, digital cardiac catheterization labs, and dedicated modular HEPA-filtered laminar airflow operating suites.`,
    },
    {
      question: `Where will my travel companion or family stay during my inpatient recovery at ${hospital.name}?`,
      answer: `Standard international inpatient rooms at ${hospital.name} include a dedicated attendant bed/couch, private bathroom, and meals for your companion. Furthermore, our patient logistics team coordinates furnished service apartments and 3-to-5 star partner hotels within a 5-to-10 minute radius in ${hospital.cityLabel} with kitchenettes and 24/7 security.`,
    },
    {
      question: `What payment options and foreign currencies are accepted at ${hospital.name}?`,
      answer: `${hospital.name} accepts international wire transfers (SWIFT), major credit/debit cards (Visa, MasterCard, Amex), and cash with legal foreign currency exchange receipts. All itemized hospital invoices are provided in both Indian Rupees (INR) and USD for transparent reimbursement with overseas insurance providers.`,
    },
    {
      question: `Does healthremade charge any agency fees or markup on hospital bills at ${hospital.name}?`,
      answer: `No. healthremade guarantees a strict Zero Markup Policy. All medical consultations, investigations, surgical procedures, and inpatient stays are billed directly by ${hospital.name} at their standard hospital tariff. healthremade's care coordination, doctor opinions, and visa letter facilitation are 100% free for patients.`,
    },
    {
      question: `How long must I remain in India after discharge before being cleared fit-to-fly?`,
      answer: `Depending on the procedure, patients generally spend 3 to 7 days inpatient at ${hospital.name}, followed by 5 to 10 days in local hotel accommodation for surgical wound inspection, suture removal, and mobility checks. Before your departure, your chief surgeon conducts a comprehensive discharge assessment and issues an official Fit-to-Fly medical clearance certificate for the airlines.`,
    },
    {
      question: `How does post-operative follow-up work once I return to my home country?`,
      answer: `Care does not conclude when you board your return flight. healthremade schedules complimentary video telemedicine consultations with your primary operating surgeon and care team at ${hospital.name} at 2 weeks, 6 weeks, and 3 months post-op, ensuring steady recovery and coordination with your local general practitioner.`,
    },
  ]
}

/**
 * 10 Comprehensive FAQs for Doctor Detail Pages (AEO & GEO Optimized)
 */
export function getDoctorFaqs(doctor: Doctor): FAQ[] {
  return [
    {
      question: `How can I consult with ${doctor.name} before traveling to India?`,
      answer: `You can receive a preliminary clinical evaluation from ${doctor.name} by submitting your medical reports, imaging scans (MRI/CT/X-ray), and history through healthremade. ${doctor.name}'s clinical team reviews your file to provide a provisional diagnosis, recommended surgical technique, and itemized cost estimate within 24 to 48 hours.`,
    },
    {
      question: `What is the clinical experience and surgical background of ${doctor.name}?`,
      answer: `${doctor.name} holds ${doctor.experienceYears}+ years of clinical experience specializing in ${doctor.department}. Having completed rigorous training and advanced international fellowships, ${doctor.name} has performed thousands of complex procedures with clinical outcome metrics matching top global benchmarks.`,
    },
    {
      question: `Which accredited hospitals does ${doctor.name} perform surgeries at?`,
      answer: `${doctor.name} practices and operates at premier JCI & NABH accredited hospitals including ${doctor.hospitalName} in ${doctor.cityLabel}. These centers feature world-class surgical intensive care units (ICUs) and dedicated subspecialty surgical theatres.`,
    },
    {
      question: `What are the estimated treatment and surgery costs with ${doctor.name}?`,
      answer: `Surgical procedures led by ${doctor.name} generally cost between 70% and 85% less than equivalent care in North America or Western Europe. An itemized package quote includes surgeon and anaesthetist fees, operating room charges, ICU monitoring, standard implants, nursing, and private room stay with zero hidden markups.`,
    },
    {
      question: `Can international patients get a free medical second opinion from ${doctor.name}?`,
      answer: `Yes. Through healthremade, international patients can request a 100% free preliminary medical second opinion from ${doctor.name}. Simply upload your recent diagnostics or share them via WhatsApp, and our medical coordinator will deliver ${doctor.name}'s surgical recommendations.`,
    },
    {
      question: `What is ${doctor.name}'s surgical success rate and complication track record?`,
      answer: `${doctor.name} maintains an exceptional clinical success record exceeding 98% for routine and complex procedures. All operations are conducted in ultra-clean laminar flow operating theaters adhering to strict international infection control and patient safety protocols.`,
    },
    {
      question: `What diagnostic scans and medical records should I prepare before meeting ${doctor.name}?`,
      answer: `Please provide your latest blood panels, diagnostic imaging in DICOM format (MRI, CT, PET, or X-rays), pathology biopsy reports (if applicable), current medication list, and a summary letter from your local physician describing your symptoms and diagnosis.`,
    },
    {
      question: `How many days should I plan to stay in India under ${doctor.name}'s care?`,
      answer: `Depending on whether your treatment is minimally invasive or open surgery, most patients require an overall stay of 10 to 21 days in India. This encompasses pre-operative clearance (1–2 days), surgical hospital stay (3–7 days), and local recuperation before ${doctor.name} signs your Fit-to-Fly certificate.`,
    },
    {
      question: `Will ${doctor.name} provide follow-up consultations after I return home?`,
      answer: `Yes. ${doctor.name} and the clinical team provide structured follow-up telemedicine sessions via secure video conference at regular intervals post-discharge to review blood work, rehabilitation progress, and medication tapering.`,
    },
    {
      question: `How do I book an expedited appointment with ${doctor.name}?`,
      answer: `healthremade directly coordinates with ${doctor.name}'s administrative desk to reserve priority consultation slots, eliminating local waitlists. You can click 'Book Consultation' or connect with our international patient desk on WhatsApp for immediate scheduling.`,
    },
  ]
}

/**
 * 10 Comprehensive FAQs for Specialty Treatment Pages (AEO & GEO Optimized)
 */
export function getSpecialtyFaqs(specialtyKey: string, specialtyLabel: string): FAQ[] {
  return [
    {
      question: `Why is India a top global destination for ${specialtyLabel.toLowerCase()} treatments?`,
      answer: `India is recognized globally for ${specialtyLabel.toLowerCase()} due to its combination of world-class JCI/NABH accredited hospitals, senior surgeons with decades of Western training, zero waitlists, and treatment costs that are 70% to 85% lower than North America, the UK, and Europe.`,
    },
    {
      question: `What are the typical cost savings for ${specialtyLabel.toLowerCase()} in India?`,
      answer: `Overseas patients generally save $30,000 to $100,000+ USD on complex ${specialtyLabel.toLowerCase()} interventions in India compared to private rates in Western nations, even when including round-trip flights, companion accommodation, and local transport.`,
    },
    {
      question: `What advanced technologies and equipment are used for ${specialtyLabel.toLowerCase()} in Delhi NCR?`,
      answer: `Delhi NCR hospitals feature the latest medical technologies including robotic surgery systems (da Vinci Xi, Mako, Hugo RAS), 3T intraoperative MRI, biplane neuro-interventional cath labs, TrueBeam STx radiosurgery, and modular laminar airflow operating suites.`,
    },
    {
      question: `How do I know if I am eligible for ${specialtyLabel.toLowerCase()} in India?`,
      answer: `You can find out by sharing your medical reports with healthremade. Our medical directors share your case with chief department chairmen across 3+ accredited hospitals who evaluate your clinical eligibility and deliver comparative opinions within 24–48 hours.`,
    },
    {
      question: `How long is the average hospital stay and recovery in India for ${specialtyLabel.toLowerCase()}?`,
      answer: `Most ${specialtyLabel.toLowerCase()} procedures require 3 to 7 days of inpatient hospital care followed by 7 to 14 days of local hotel recuperation for clinical monitoring, wound healing, and physiotherapy before international air travel is cleared.`,
    },
    {
      question: `Are the implants and prosthetics used in India approved by the US FDA?`,
      answer: `Yes. Indian accredited hospitals exclusively utilize US FDA-approved and CE-marked implants, prosthetics, and consumables from top global manufacturers like Zimmer Biomet, Stryker, Johnson & Johnson / DePuy Synthes, Medtronic, and Boston Scientific.`,
    },
    {
      question: `How does the Indian Medical Visa (MED Visa) process work for ${specialtyLabel.toLowerCase()}?`,
      answer: `After you select your preferred hospital and surgeon, the hospital issues an official Medical Visa Invitation Letter on hospital letterhead. This allows you and up to two attendants to obtain an Indian e-Medical Visa online within 48 to 72 hours without visiting an embassy.`,
    },
    {
      question: `Can I have a virtual consultation with a senior ${specialtyLabel.toLowerCase()} specialist before flying?`,
      answer: `Yes. healthremade organizes direct video conference appointments with department chairmen and senior consultants so you can review your treatment plan, ask questions about techniques, and meet your surgical team beforehand.`,
    },
    {
      question: `Will language be a barrier during my ${specialtyLabel.toLowerCase()} stay in India?`,
      answer: `Not at all. English is the official working language of all medical teams, nurses, and hospital staff across our partner facilities. In addition, healthremade provides dedicated multi-lingual interpreters for Arabic, Russian, French, and other languages free of charge.`,
    },
    {
      question: `How does healthremade ensure transparent pricing for ${specialtyLabel.toLowerCase()}?`,
      answer: `We provide itemized, written package estimates that clearly list inclusions (surgeon fees, ICU days, standard room, diagnostic tests, medications) and any potential contingencies. Patients pay the hospital directly upon arrival with zero agency fees or markups.`,
    },
  ]
}

/**
 * 10 Comprehensive FAQs for Procedure Detail Pages (AEO & GEO Optimized)
 */
export function getProcedureFaqs(procedure: Procedure): FAQ[] {
  // Use existing procedure FAQs as baseline and complement up to at least 10 high-value clinical items
  const baseFaqs = procedure.faqs || []
  const additionalFaqs: FAQ[] = [
    {
      question: `What is the estimated cost range for ${procedure.name} in India?`,
      answer: `The estimated package cost for ${procedure.name} in Delhi NCR top hospitals ranges from approximately ₹${procedure.priceInrMin.toLocaleString('en-IN')} to ₹${procedure.priceInrMax.toLocaleString('en-IN')} (approx. $${Math.round(procedure.priceInrMin / 84).toLocaleString()} to $${Math.round(procedure.priceInrMax / 84).toLocaleString()} USD), representing a 75%–85% cost saving compared to the United States or United Kingdom.`,
    },
    {
      question: `How many days do I need to plan in India for ${procedure.name}?`,
      answer: `We recommend planning a total stay of approximately ${procedure.totalStayDays} days in India. This includes ${procedure.hospitalStayDays} days of inpatient hospital care for surgery and immediate stabilization, plus out-of-hospital stay in Delhi NCR for outpatient reviews and fit-to-fly airline clearance.`,
    },
    {
      question: `What are the key factors that influence the final cost of ${procedure.name}?`,
      answer: `Cost variations depend on: 1) Choice of implant brand or surgical technology (standard vs robotic/minimally invasive), 2) Hospital tier and room preference (single deluxe vs executive suite), 3) Patient age and pre-existing comorbidities requiring extended ICU monitoring, and 4) Number of days of post-op in-hospital rehabilitation.`,
    },
    {
      question: `What is the clinical success rate for ${procedure.name} in accredited Indian hospitals?`,
      answer: `In premier JCI and NABH accredited facilities, ${procedure.name} achieves documented clinical success rates matching or exceeding top Western centers, typically ranging between 98% and 99.5%, supported by board-certified surgical teams and advanced infection-controlled operating theaters.`,
    },
    {
      question: `What pre-operative medical tests are required before undergoing ${procedure.name}?`,
      answer: `Before surgery, you will complete pre-anaesthetic clearance including full blood count, coagulation profile, kidney/liver function tests, ECG, chest X-ray, and procedure-specific imaging (such as echocardiogram, MRI, or CT angiography) to confirm surgical safety.`,
    },
    {
      question: `When can I resume normal physical activities and work after ${procedure.name}?`,
      answer: `Full clinical recovery spans approximately ${procedure.recoveryWeeks} weeks. However, most patients are able to walk comfortably within days after discharge, resume light desk work within 3 to 4 weeks, and progress to normal daily routines as advised by their surgeon.`,
    },
    {
      question: `Are high-quality international implants and medications used for ${procedure.name}?`,
      answer: `Yes. All implants, prosthetics, and surgical hardware are sourced from globally recognized manufacturers (such as Zimmer Biomet, Stryker, Medtronic, Johnson & Johnson) with US FDA approvals and international serial numbers registered directly in your discharge summary.`,
    },
    {
      question: `How do I obtain the Medical Visa Invitation Letter for ${procedure.name}?`,
      answer: `Once you confirm your hospital preference, healthremade coordinates with the hospital's international desk to dispatch your official Medical Visa Invitation Letter within 24 to 48 hours for expedited Indian e-Medical Visa approval.`,
    },
    {
      question: `Can I get a detailed itemized cost breakdown for ${procedure.name} before traveling?`,
      answer: `Yes. healthremade provides a 100% free, line-item treatment package estimate outlining the surgeon fee, anaesthesia, operating theater, bed category, medications, and consumable charges so there are no surprises upon admission.`,
    },
    {
      question: `How is post-op follow-up handled once I fly back home after ${procedure.name}?`,
      answer: `Your dedicated healthremade care manager schedules follow-up video telemedicine consultations with your operating surgical team at 2 weeks, 6 weeks, and 3 months to monitor healing, review follow-up scans, and guide continuous recovery.`,
    },
  ]

  // Deduplicate and combine to deliver 10+ robust questions
  const combined: FAQ[] = [...baseFaqs]
  for (const item of additionalFaqs) {
    if (!combined.some((c) => c.question.toLowerCase() === item.question.toLowerCase())) {
      combined.push(item)
    }
    if (combined.length >= 10) break
  }
  return combined
}

/**
 * 10 Comprehensive FAQs for Blog Detail Pages (AEO & GEO Optimized)
 */
export function getBlogFaqs(
  title: string,
  category: string,
  existingFaqs: FAQ[] = []
): FAQ[] {
  const defaults: FAQ[] = [
    {
      question: `Why is India a preferred destination for ${category}?`,
      answer: `India combines globally accredited JCI/NABH hospitals, Western-trained department chairmen, cutting-edge surgical robotics, and zero waiting periods at 70% to 85% lower costs than the US, UK, and European private healthcare sectors.`,
    },
    {
      question: `How accurate are the cost estimates published in this guide?`,
      answer: `The figures in this guide reflect current tariff benchmarks from leading JCI/NABH accredited hospitals in Delhi NCR. For your individual case, healthremade provides a free itemized quote verified by senior specialists based on your actual medical reports.`,
    },
    {
      question: `How can overseas patients obtain an Indian Medical Visa (MED Visa)?`,
      answer: `Our care team secures an official hospital invitation letter within 24 to 48 hours of medical review. You can then apply for the Indian e-Medical Visa online, which is typically approved within 3 business days for you and up to two attendants.`,
    },
    {
      question: `What is included in international hospital packages in India?`,
      answer: `Standard packages include surgeon and anaesthetist fees, operating room charges, ICU stay, private room inpatient stay, pre-op basic diagnostics, in-hospital routine medications, and airport transfers. healthremade adds free translation and dedicated coordinator support.`,
    },
    {
      question: `Are surgical outcomes in India comparable to Western hospitals?`,
      answer: `Yes. Premier Indian hospitals consistently report clinical success and infection control rates matching or surpassing international averages (>98% for cardiac and joint surgeries), supported by modern modular operating suites and HEPA filtration systems.`,
    },
    {
      question: `How long must an international patient stay in India for treatment?`,
      answer: `Depending on the invasiveness of the procedure, patients typically spend 3 to 7 days in the hospital followed by 7 to 14 days in nearby serviced accommodation for outpatient follow-up and formal Fit-to-Fly medical clearance.`,
    },
    {
      question: `Does healthremade charge patients any fee for coordination or quotes?`,
      answer: `healthremade provides 100% free care coordination, doctor opinions, and visa facilitation. Patients pay the hospital directly at standard published tariffs with zero middleman markups.`,
    },
    {
      question: `What languages are spoken by doctors and nursing staff in India?`,
      answer: `English is the primary working language across all major private hospitals. For patients speaking Arabic, Russian, French, or other languages, healthremade provides full-time dedicated interpreters throughout your hospital stay.`,
    },
    {
      question: `What happens if there are complications or questions after returning home?`,
      answer: `Every patient receives continuous digital post-op follow-up. healthremade schedules telemedicine video appointments with your treating surgeon to review your progress, adjust medications, and consult with your home doctor.`,
    },
    {
      question: `How do I start my medical journey or get a free second opinion?`,
      answer: `Simply click 'Get Free Quote' or reach out via WhatsApp with your medical summary and scans. Our international patient desk will deliver multi-hospital treatment plans and pricing within 24 to 48 hours.`,
    },
  ]

  const result: FAQ[] = [...existingFaqs]
  for (const item of defaults) {
    if (!result.some((r) => r.question.toLowerCase() === item.question.toLowerCase())) {
      result.push(item)
    }
    if (result.length >= 10) break
  }
  return result
}

/**
 * 10 Comprehensive FAQs for Patient Testimonials Page (AEO & GEO Optimized)
 */
export function getTestimonialFaqs(): FAQ[] {
  return [
    {
      question: 'Are all patient video testimonials and clinical stories authentic and verified?',
      answer:
        'Yes. Every video interview and case story featured on healthremade is filmed on location inside our partner accredited hospitals or post-discharge with verified patient consent. Clinical records, hospital admission IDs, and surgeon approvals are independently validated before publication.',
    },
    {
      question: 'Can I connect with former international patients from my home country?',
      answer:
        'Yes. Many of our former international patients from the UK, US, Nigeria, Kenya, UAE, Oman, and Uzbekistan have volunteered to share their personal experiences with prospective patients. Upon request, our coordinator can facilitate a private conversation with an alumnus who underwent the same treatment.',
    },
    {
      question: 'Which medical specialties have the highest volume of international patient reviews?',
      answer:
        'Our largest volume of verified outcomes is in Cardiac Surgery (CABG, valve replacement), Robotic Orthopaedics (knee and hip replacements), Organ Transplantation (liver and kidney transplants), Advanced Oncology, Neurosurgery/Spine, and Comprehensive Dental Rehabilitation.',
    },
    {
      question: 'How much money did these patients actually save on their hospital bills in India?',
      answer:
        'On average, our international patients saved between 70% and 85% compared to the United States and United Kingdom. Patients traveling for joint replacements saved $30,000–$50,000, while cardiac and transplant patients saved $100,000–$250,000 compared to Western private facilities.',
    },
    {
      question: 'How do international patients handle travel, medical visas, and family companions?',
      answer:
        'healthremade coordinates the entire medical journey: from issuing official hospital visa invitation letters within 24 hours to arranging complimentary airport pickup, local SIM cards, currency exchange assistance, and family-friendly accommodation near the hospital.',
    },
    {
      question: 'Were any of these patients surprised by hidden hospital fees or agency charges?',
      answer:
        'No. Under healthremade’s Zero Hidden Markup Guarantee, patients receive transparent itemized quotes before departing their home country. All payments are made directly to the accredited hospital cashier with full itemized billing receipts.',
    },
    {
      question: 'How do surgeons monitor patients once they return to their home countries?',
      answer:
        'Prior to departure, every patient receives an official Fit-to-Fly certificate and comprehensive discharge summary in English. healthremade schedules follow-up video telemedicine consultations with the treating surgeon at 2 weeks, 6 weeks, and 3 months to ensure smooth recovery.',
    },
    {
      question: 'What quality accreditations do the hospitals shown in these video stories hold?',
      answer:
        'All surgeries and treatments shown took place exclusively at JCI (Joint Commission International) and NABH (National Accreditation Board for Hospitals & Healthcare Providers) accredited hospitals in Delhi NCR and India, which follow the same sterile protocols and surgical checklists as Mayo Clinic or Cleveland Clinic.',
    },
    {
      question: 'From which countries do most international patients travel to India?',
      answer:
        'Patients frequently travel to our partner hospitals from the United Kingdom, United States, Canada, Australia, the Middle East (UAE, Oman, Iraq, Saudi Arabia), Central Asia (Uzbekistan, Kazakhstan), and across Africa (Kenya, Nigeria, Ghana, Tanzania, Ethiopia).',
    },
    {
      question: 'How can I submit my medical reports to find out if I am eligible for treatment?',
      answer:
        'Simply click "Request Free Quote" or message our patient desk on WhatsApp. Share your recent diagnosis and imaging scans, and our medical team will provide recommendations from 3 top hospital department chairmen within 24 to 48 hours free of charge.',
    },
  ]
}
