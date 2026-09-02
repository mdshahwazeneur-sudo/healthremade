/**
 * Flagship procedures — Phase 1 seed data.
 *
 * IMPORTANT: Price ranges are indicative placeholders only.
 * ⚠️  SOURCE REQUIRED before publishing:
 *     - Verify actual package prices with each hospital partner
 *     - Get written confirmation of what's included/excluded
 *     - Record "last verified" date for each hospital package
 */

export type Specialty =
  | "cardiac"
  | "orthopaedics"
  | "oncology"
  | "fertility"
  | "neurology"
  | "transplant"
  | "cosmetic";

export interface Procedure {
  id: string;
  slug: string;
  name: string;
  specialty: Specialty;
  specialtyLabel: string;
  tagline: string;
  description: string;
  /** Typical surgery duration in hours */
  surgeryDurationHours: number;
  /** Hospital stay in days */
  hospitalStayDays: number;
  /** Total India stay recommended (days) */
  totalStayDays: number;
  recoveryWeeks: number;
  /** Indicative price in INR — SOURCE REQUIRED */
  priceInrMin: number;
  priceInrMax: number;
  /** What drives price variation */
  priceFactors: string[];
  /** Top cities for this procedure */
  topCities: string[];
  faqs: Array<{ question: string; answer: string }>;
  seoTitle: string;
  seoDescription: string;
  schemaOrgName: string;
}

export const PROCEDURES: Procedure[] = [
  {
    id: "proc_cardiac_bypass",
    slug: "bypass-surgery",
    name: "Coronary Artery Bypass Graft (CABG)",
    specialty: "cardiac",
    specialtyLabel: "Cardiac Surgery",
    tagline: "World-class cardiac care at a fraction of Western costs",
    description:
      "Coronary artery bypass grafting (CABG) is open-heart surgery that reroutes blood around blocked arteries to restore normal blood flow to the heart muscle. India's cardiac centres achieve outcomes comparable to the UK and US at significantly lower cost, with no waitlist.",
    surgeryDurationHours: 4,
    hospitalStayDays: 7,
    totalStayDays: 21,
    recoveryWeeks: 8,
    // ⚠️ SOURCE REQUIRED — placeholder range
    priceInrMin: 280000,
    priceInrMax: 550000,
    priceFactors: [
      "Number of vessels bypassed (single, double, triple)",
      "Use of arterial vs venous grafts",
      "Hospital tier and room type",
      "Anaesthesiologist fees",
      "Post-operative ICU duration",
    ],
    topCities: ["Delhi", "Chennai", "Bangalore", "Mumbai"],
    faqs: [
      {
        question: "How does CABG cost in India compare to the UK or US?",
        answer:
          "CABG in India typically costs ₹2,80,000–₹5,50,000 (roughly \$3,300–\$6,500 USD), compared to \$80,000–\$150,000 in the US and £30,000–£80,000 in the UK for privately funded surgery. The cost difference is driven by lower operating costs and medical professional fees in India, not a compromise in care quality.",
      },
      {
        question: "What accreditation should I look for in a cardiac hospital?",
        answer:
          "Look for NABH (National Accreditation Board for Hospitals) accreditation at minimum — this is India's equivalent of JCI (Joint Commission International). Several top cardiac centres also hold JCI accreditation directly. We link to the public NABH and JCI registries on every hospital listing so you can verify independently.",
      },
      {
        question: "How long do I need to stay in India after CABG?",
        answer:
          "Most patients spend 7 days in hospital and then 14 additional days in India for outpatient follow-up before their surgeon clears them to fly. Total recommended stay: 21 days minimum. Long-haul flights increase DVT risk, so your care team will provide compression stockings and anticoagulation guidance.",
      },
      {
        question: "Will my home country insurance cover treatment in India?",
        answer:
          "Some international health plans cover medical treatment abroad, especially in accredited facilities. Check your policy's 'medical evacuation' and 'overseas treatment' clauses. We can provide itemized invoices and clinical documentation in English for insurance claims.",
      },
    ],
    seoTitle: "Bypass Surgery Cost in India | CABG — healthremade",
    seoDescription:
      "Compare bypass surgery (CABG) costs across top accredited hospitals in India. Real itemized prices, verified outcomes, and no hidden fees. From ₹2.8L.",
    schemaOrgName: "Coronary Artery Bypass Graft",
  },
  {
    id: "proc_ortho_knee",
    slug: "knee-replacement",
    name: "Total Knee Replacement",
    specialty: "orthopaedics",
    specialtyLabel: "Orthopaedic Surgery",
    tagline: "Walk pain-free — industry-leading implants at transparent prices",
    description:
      "Total knee replacement (TKR) removes damaged cartilage and bone from the knee joint and replaces it with artificial components. India uses the same implant brands (Zimmer Biomet, Stryker, Johnson & Johnson) as Western hospitals, with significantly shorter wait times and lower total costs.",
    surgeryDurationHours: 2,
    hospitalStayDays: 4,
    totalStayDays: 21,
    recoveryWeeks: 12,
    // ⚠️ SOURCE REQUIRED — placeholder range
    priceInrMin: 180000,
    priceInrMax: 380000,
    priceFactors: [
      "Implant brand and type (standard vs high-flex vs gender-specific)",
      "Bilateral (both knees) vs unilateral",
      "Hospital tier",
      "Physiotherapy package inclusion",
    ],
    topCities: ["Delhi", "Mumbai", "Bangalore", "Hyderabad"],
    faqs: [
      {
        question: "Which implant brands are used in India?",
        answer:
          "The same globally recognised brands used in NHS and US hospitals — Zimmer Biomet, Stryker, DePuy Synthes (J&J), and Smith+Nephew. You can request a specific brand, though this may affect pricing. All implants are CE-marked or FDA-cleared. We disclose the implant brand on each hospital's package listing.",
      },
      {
        question: "Can I have both knees done at once?",
        answer:
          "Simultaneous bilateral knee replacement is offered at many Indian hospitals and can reduce your total India stay and recovery time. It carries slightly higher anaesthetic risk and requires longer ICU observation. Discuss with your surgeon whether simultaneous or staged bilateral replacement is appropriate for your health profile.",
      },
      {
        question: "How long does a knee replacement last?",
        answer:
          "Modern implants are designed to last 15–25 years. Factors affecting longevity include your activity level, weight, and the implant type. Your surgeon will recommend the appropriate implant based on your age and lifestyle.",
      },
    ],
    seoTitle: "Knee Replacement Cost in India | Total Knee Replacement — healthremade",
    seoDescription:
      "Real costs for total knee replacement in India. Zimmer, Stryker & DePuy implants. Verified hospital prices from ₹1.8L, no form-fill required.",
    schemaOrgName: "Total Knee Replacement",
  },
  {
    id: "proc_transplant_liver",
    slug: "liver-transplant",
    name: "Liver Transplant",
    specialty: "transplant",
    specialtyLabel: "Organ Transplant",
    tagline: "India's transplant centres — global-class outcomes, no years-long waitlists",
    description:
      "Liver transplantation replaces a diseased liver with a healthy liver from a deceased donor or a portion from a living donor. India has some of the world's most experienced liver transplant teams, performing thousands of transplants annually with survival rates comparable to UNOS-listed US centres.",
    surgeryDurationHours: 10,
    hospitalStayDays: 21,
    totalStayDays: 90,
    recoveryWeeks: 26,
    // ⚠️ SOURCE REQUIRED — placeholder range (highly variable)
    priceInrMin: 2000000,
    priceInrMax: 3500000,
    priceFactors: [
      "Living donor vs deceased donor",
      "Complexity of recipient's liver disease (MELD score)",
      "Donor surgery costs (living donor programmes)",
      "Post-operative immunosuppression therapy",
      "Hospital stay length and ICU requirements",
    ],
    topCities: ["Chennai", "Delhi", "Mumbai", "Bangalore"],
    faqs: [
      {
        question: "How does India's liver transplant survival rate compare globally?",
        answer:
          "Leading Indian transplant centres report 1-year patient survival rates of 85–92%, in line with UNOS-reported US outcomes (87–92%). These figures are published by the hospitals and should be verified with the transplant team. We display verified outcome data only — we don't display figures we cannot source.",
      },
      {
        question: "How long is the wait for a deceased donor liver in India?",
        answer:
          "Deceased donor organ availability in India is lower than in Western countries. Most international patients pursue living donor liver transplant (LDLT), where a healthy family member or compatible donor donates a portion of their liver. Living donor assessment and surgery is included in the package at most centres.",
      },
      {
        question: "What is the minimum stay required in India for liver transplant?",
        answer:
          "Plan for a minimum of 90 days in India — typically 21 days in hospital and 60+ days of intensive outpatient follow-up before your transplant team will clear you to travel. Immunosuppression levels need close monitoring in the early months. We include post-op telemedicine follow-up with your Indian transplant team after you return home.",
      },
    ],
    seoTitle: "Liver Transplant Cost in India — healthremade",
    seoDescription:
      "India's top liver transplant hospitals with transparent pricing and verified outcomes. Living donor and deceased donor options explained. No form-fill required.",
    schemaOrgName: "Liver Transplantation",
  },
  {
    id: "proc_fertility_ivf",
    slug: "ivf",
    name: "In Vitro Fertilisation (IVF)",
    specialty: "fertility",
    specialtyLabel: "Fertility Treatment",
    tagline: "Transparent IVF pricing — no hidden cycle add-ons",
    description:
      "IVF involves stimulating the ovaries to produce eggs, retrieving and fertilising them in a laboratory, and transferring one or more embryos to the uterus. India's fertility clinics use the same medications, protocols, and lab technology as clinics in the UK, US, and Europe at materially lower cost.",
    surgeryDurationHours: 0.5,
    hospitalStayDays: 0,
    totalStayDays: 28,
    recoveryWeeks: 2,
    // ⚠️ SOURCE REQUIRED — placeholder range (per cycle)
    priceInrMin: 100000,
    priceInrMax: 250000,
    priceFactors: [
      "Stimulation medications (largest variable cost)",
      "ICSI (intracytoplasmic sperm injection) requirement",
      "PGT-A (preimplantation genetic testing) addition",
      "Number of embryo transfers",
      "Donor egg or sperm vs own gametes",
      "Blastocyst culture vs day-3 transfer",
    ],
    topCities: ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai"],
    faqs: [
      {
        question: "What does the quoted IVF price include?",
        answer:
          "Our hospital listings break down exactly what's included and excluded. A standard package typically includes: consultation, ovarian stimulation monitoring, egg retrieval, embryo culture (5 days), and one fresh embryo transfer. Medications, genetic testing, and frozen embryo storage are usually excluded and itemised separately.",
      },
      {
        question: "Can I use donor eggs or sperm in India?",
        answer:
          "Yes. India permits egg donation under the Assisted Reproductive Technology (Regulation) Act 2021. Donors are screened for genetic diseases, infectious diseases, and are anonymous by law. Donor egg cycles typically cost more than own-egg cycles due to donor compensation and additional monitoring.",
      },
      {
        question: "What is the success rate for IVF in India?",
        answer:
          "Success rates vary significantly by age, diagnosis, and clinic. For women under 35 using own eggs, live birth rates of 40–55% per fresh transfer are achievable at top clinics. For women over 40 using own eggs, rates fall to 10–20%. Donor egg cycles typically achieve 50–65% live birth rates regardless of recipient age. Always ask for a clinic's own published, audited success data — not industry averages.",
      },
    ],
    seoTitle: "IVF Cost in India | Transparent Pricing — healthremade",
    seoDescription:
      "Real, itemized IVF pricing in India. No hidden add-ons. Compare success rates and costs across top fertility clinics. From ₹1L per cycle.",
    schemaOrgName: "In Vitro Fertilization",
  },
  {
    id: "proc_neuro_spinal",
    slug: "spinal-fusion",
    name: "Spinal Fusion Surgery",
    specialty: "neurology",
    specialtyLabel: "Spine Surgery",
    tagline: "Expert spinal fusion with real implant pricing disclosed upfront",
    description:
      "Spinal fusion permanently connects two or more vertebrae to eliminate painful motion and stabilise the spine. Indian neurosurgeons and orthopaedic spine surgeons perform both minimally invasive and open fusion procedures, with modern neuronavigation and intraoperative imaging.",
    surgeryDurationHours: 3,
    hospitalStayDays: 5,
    totalStayDays: 21,
    recoveryWeeks: 16,
    // ⚠️ SOURCE REQUIRED — placeholder range
    priceInrMin: 250000,
    priceInrMax: 550000,
    priceFactors: [
      "Number of levels fused (single vs multi-level)",
      "Approach (anterior, posterior, TLIF, ALIF, XLIF)",
      "Implant type (titanium cage, rods, pedicle screws)",
      "Minimally invasive vs open surgery",
      "Neuromonitoring requirements",
    ],
    topCities: ["Delhi", "Mumbai", "Bangalore", "Hyderabad"],
    faqs: [
      {
        question: "Is minimally invasive spinal fusion available in India?",
        answer:
          "Yes. MIS (minimally invasive spine) fusion is offered at most major spine centres using tubular retractors, intraoperative navigation, and fluoroscopic guidance. MIS typically means smaller incisions, less blood loss, and faster recovery, though it is not appropriate for all presentations. Your surgeon will advise on the best approach after reviewing your imaging.",
      },
      {
        question: "What imaging should I bring for my consultation?",
        answer:
          "Bring the most recent MRI of the relevant spine segment (within 6 months), any CT scans, and standing X-rays if available. Digital copies on a USB or via cloud link are preferred. Your Indian neurosurgeon will review these before your in-person consultation.",
      },
      {
        question: "How long before I can return to desk work after spinal fusion?",
        answer:
          "Most patients can return to sedentary/desk work within 4–6 weeks, depending on the levels fused and the approach used. Physical jobs may require 3–6 months. Physiotherapy is critical — we recommend starting guided physiotherapy within 24–48 hours of surgery and continuing for at least 12 weeks.",
      },
    ],
    seoTitle: "Spinal Fusion Surgery Cost in India — healthremade",
    seoDescription:
      "Compare spinal fusion costs at India's top hospitals. MIS and open fusion. Real itemized prices, no form-fill. From ₹2.5L.",
    schemaOrgName: "Spinal Fusion Surgery",
  },
];

/** Look up a procedure by specialty + slug */
export function getProcedure(specialty: string, slug: string): Procedure | undefined {
  return PROCEDURES.find((p) => p.specialty === specialty && p.slug === slug);
}

/** Get all procedure combos for generateStaticParams */
export function getAllProcedureParams() {
  return PROCEDURES.map((p) => ({
    specialty: p.specialty,
    procedure: p.slug,
  }));
}

/** Group procedures by specialty */
export function getProceduresBySpecialty(): Map<Specialty, Procedure[]> {
  const map = new Map<Specialty, Procedure[]>();
  for (const proc of PROCEDURES) {
    const existing = map.get(proc.specialty) ?? [];
    map.set(proc.specialty, [...existing, proc]);
  }
  return map;
}
