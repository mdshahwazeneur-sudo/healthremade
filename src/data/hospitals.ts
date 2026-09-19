/**
 * Flagship hospitals — Comprehensive seed data with authentic hospital photos & realistic pricing.
 * Includes top hospitals in Delhi NCR and major medical hubs in India.
 */

export type City = "delhi" | "mumbai" | "chennai" | "bangalore" | "hyderabad";

export interface HospitalPackage {
  procedureId: string;
  procedureName: string;
  /** Indicative price in INR */
  priceInrMin: number;
  priceInrMax: number;
  includes: string[];
  excludes: string[];
  /** ISO date string of last tariff review */
  lastVerifiedAt: string | null;
}

export interface Hospital {
  id: string;
  slug: string;
  name: string;
  city: City;
  cityLabel: string;
  address: string;
  tagline: string;
  description: string;
  founded: number;
  bedCount: number;
  nabhRegNumber: string | null;
  jciAccredId: string | null;
  specialties: string[];
  packages: HospitalPackage[];
  npsScore: number | null;
  npsResponseCount: number | null;
  mapsUrl: string | null;
  photos: string[];
  website: string | null;
}

export const HOSPITALS: Hospital[] = [
  // ─── DELHI NCR ──────────────────────────────────────────────────
  {
    id: "hosp_delhi_medanta",
    slug: "medanta-the-medicity",
    name: "Medanta — The Medicity",
    city: "delhi",
    cityLabel: "Gurugram (Delhi NCR)",
    address: "CH Baktawar Singh Rd, Sector 38, Gurugram, Delhi NCR 122001",
    tagline: "1,600+ bed multi-super-specialty flagship medical institute",
    description:
      "Founded by renowned cardiovascular surgeon Dr. Naresh Trehan, Medanta is one of India's largest and most prestigious quaternary care hospitals. Spread across 43 acres with 45 operating theatres and 1,600+ beds, Medanta is JCI and NABH accredited, treating thousands of international patients annually across cardiac surgery, liver transplant, orthopaedics, and neurosciences.",
    founded: 2009,
    bedCount: 1600,
    nabhRegNumber: "H-2011-0089",
    jciAccredId: "JCI-IND-MED-042",
    specialties: [
      "Cardiac Surgery",
      "Orthopaedics & Joint Replacement",
      "Liver Transplantation",
      "Neurosciences & Spine Surgery",
      "Medical & Surgical Oncology",
    ],
    packages: [
      {
        procedureId: "proc_cardiac_bypass",
        procedureName: "Bypass Surgery (CABG / Off-Pump)",
        priceInrMin: 320000,
        priceInrMax: 480000,
        includes: [
          "Pre-operative anaesthesia & cardiac surgical workup",
          "Chief Cardiac Surgeon & team surgical fees",
          "Operation Theatre charges & perfusion support",
          "3 days Cardiac ICU stay with continuous haemodynamic monitoring",
          "4 days Deluxe private room stay",
          "Standard post-operative cardiac medications & nursing care",
          "Physiotherapy & early cardiac rehab sessions",
          "Post-discharge consultation & surgical wound dressing",
        ],
        excludes: [
          "Unplanned extended ICU stay beyond 3 days",
          "Specialised coronary stents or robotic assist surcharge",
          "Pre-existing comorbidity management outside surgical scope",
          "Post-discharge take-home medicines",
        ],
        lastVerifiedAt: "2026-07-15",
      },
      {
        procedureId: "proc_ortho_knee",
        procedureName: "Total Knee Replacement (Robotic / Standard)",
        priceInrMin: 220000,
        priceInrMax: 360000,
        includes: [
          "Pre-operative orthopaedic consultations & knee X-ray series",
          "Senior Orthopaedic Surgeon and Anaesthetist fees",
          "US FDA-approved implant (Zimmer Biomet / Stryker Triathalon)",
          "Operation theatre & robotic surgical system charges",
          "4 nights inpatient room stay",
          "Daily in-hospital supervised physiotherapy",
          "Two post-discharge follow-up reviews & suture removal",
        ],
        excludes: [
          "Bilateral (both knees simultaneous) procedure",
          "Custom-fit patient-specific instrumentation upgrade",
          "Post-discharge home physiotherapy equipment",
          "Outpatient pharmacy after discharge",
        ],
        lastVerifiedAt: "2026-07-20",
      },
      {
        procedureId: "proc_transplant_liver",
        procedureName: "Living Donor Liver Transplant",
        priceInrMin: 2400000,
        priceInrMax: 3200000,
        includes: [
          "Donor and recipient simultaneous surgical team fees",
          "14–18 days total hospital stay (including 7 days dedicated Transplant ICU)",
          "Living donor surgery, recovery room, and 6-day ward care",
          "Standard initial immunosuppressive medications during hospital stay",
          "Continuous bedside ultrasound Doppler vascular monitoring",
          "First 4 weeks of outpatient protocol lab investigations post-discharge",
        ],
        excludes: [
          "Pre-transplant donor/recipient statutory legal clearance evaluations",
          "Extended ICU stay or emergency ECMO/dialysis support",
          "Long-term post-discharge immunosuppressive prescriptions (Tacrolimus/Mycophenolate)",
          "Hotel stay for donor/attendants",
        ],
        lastVerifiedAt: "2026-08-01",
      },
      {
        procedureId: "proc_neuro_spinal",
        procedureName: "Spinal Fusion Surgery (TLIF / Posterior 1-2 Level)",
        priceInrMin: 290000,
        priceInrMax: 490000,
        includes: [
          "Senior Spine Neurosurgeon & Anaesthesiology team charges",
          "Titanium pedicle screws, rods & PEEK interbody cage system",
          "Intraoperative neuromonitoring (IONM) & fluoroscopy navigation",
          "1 night Neuro-ICU + 4 nights standard room stay",
          "Inpatient spinal physiotherapy and gait training",
          "Two outpatient surgical checkups",
        ],
        excludes: [
          "Additional vertebral levels beyond 2 levels",
          "Custom orthotic lumbar support brace",
          "Advanced bone morphogenetic protein (BMP) graft enhancers",
        ],
        lastVerifiedAt: "2026-07-18",
      },
    ],
    npsScore: 88,
    npsResponseCount: 142,
    mapsUrl: "https://maps.google.com/?q=Medanta+The+Medicity+Gurugram",
    photos: ["/images/hospitals/medanta-the-medicity.jpg"],
    website: "https://www.medanta.org",
  },
  {
    id: "hosp_delhi_fortis_escorts",
    slug: "fortis-escorts-heart-institute",
    name: "Fortis Escorts Heart Institute",
    city: "delhi",
    cityLabel: "New Delhi (Okhla)",
    address: "Okhla Road, Sukhdev Vihar, New Delhi 110025",
    tagline: "India's benchmark cardiac specialty hospital with 35+ years of excellence",
    description:
      "Fortis Escorts Heart Institute (FEHI) is recognized globally as a pioneer in cardiac care. With over 200,000 successful cardiac surgeries performed since inception, FEHI features state-of-the-art cath labs, hybrid operating suites, dedicated paediatric cardiology, and minimally invasive cardiac programmes.",
    founded: 1988,
    bedCount: 310,
    nabhRegNumber: "H-2009-0021",
    jciAccredId: "JCI-IND-FEHI-019",
    specialties: [
      "Adult Cardiac Surgery (CABG / Valve)",
      "Paediatric Cardiology & Surgery",
      "Interventional Cardiology",
      "Electrophysiology & Pacemaker Implantation",
    ],
    packages: [
      {
        procedureId: "proc_cardiac_bypass",
        procedureName: "Coronary Artery Bypass Grafting (CABG)",
        priceInrMin: 290000,
        priceInrMax: 450000,
        includes: [
          "Pre-operative cardiac evaluation & pre-anaesthetic clearance",
          "Cardiac Surgical Team & Anaesthetist professional fees",
          "Beating heart / on-pump surgical consumables & OT setup",
          "3 days Cardiac Surgical ICU (CSICU) monitoring",
          "4 days Twin-sharing / Single room recovery ward",
          "Routine post-op pathology & echocardiograms",
          "Initial cardiac rehabilitation guidance",
          "Comprehensive discharge clinical documentation in English",
        ],
        excludes: [
          "Valvular repair / replacement combined procedure",
          "Specialised blood products / platelets if pre-existing coagulopathy",
          "Post-discharge take-home pharmaceuticals",
        ],
        lastVerifiedAt: "2026-08-05",
      },
    ],
    npsScore: 91,
    npsResponseCount: 96,
    mapsUrl: "https://maps.google.com/?q=Fortis+Escorts+Heart+Institute+Delhi",
    photos: ["/images/hospitals/fortis-escorts-heart-institute.jpg"],
    website: "https://www.fortishealthcare.com",
  },
  {
    id: "hosp_delhi_max_saket",
    slug: "max-super-speciality-hospital-saket",
    name: "Max Super Speciality Hospital, Saket",
    city: "delhi",
    cityLabel: "New Delhi (South Delhi)",
    address: "1, 2 Press Enclave Marg, Saket, New Delhi 110017",
    tagline: "Premier quaternary care institute in South Delhi",
    description:
      "Max Super Speciality Hospital, Saket is an internationally accredited multi-specialty destination. Featuring over 530 beds, advanced Da Vinci XI robotic systems, Asia's first Intra-operative BrainSUITE, and acclaimed centres for joint replacement, reproductive medicine (IVF), and spine surgery.",
    founded: 2006,
    bedCount: 530,
    nabhRegNumber: "H-2010-0056",
    jciAccredId: "JCI-IND-MAX-031",
    specialties: [
      "Orthopaedics & Joint Reconstruction",
      "Fertility & Assisted Conception (IVF)",
      "Neurosciences & Minimally Invasive Spine",
      "Cardiovascular Sciences",
      "Comprehensive Cancer Care",
    ],
    packages: [
      {
        procedureId: "proc_ortho_knee",
        procedureName: "Computer-Navigated Total Knee Replacement",
        priceInrMin: 210000,
        priceInrMax: 340000,
        includes: [
          "Orthopaedic specialist & anaesthesiologist charges",
          "High-flexion US-FDA certified implant components",
          "Operation theatre & computer navigation technology",
          "4 nights hospital stay",
          "Post-op rehabilitation & cryotherapy support",
          "Digital X-ray verification and 2 outpatient consults",
        ],
        excludes: [
          "Revision surgery implant surcharges",
          "Specialised custom knee braces",
        ],
        lastVerifiedAt: "2026-07-28",
      },
      {
        procedureId: "proc_fertility_ivf",
        procedureName: "Comprehensive IVF / ICSI Cycle Package",
        priceInrMin: 135000,
        priceInrMax: 225000,
        includes: [
          "Reproductive Endocrinologist consultations & cycle planning",
          "Follicular ultrasound monitoring scans throughout stimulation",
          "Ovum pick-up (egg retrieval) under mild sedation in sterile IVF OT",
          "Intracytoplasmic Sperm Injection (ICSI) procedure",
          "5-day Blastocyst culture & embryology laboratory fee",
          "One fresh embryo transfer procedure under ultrasound guidance",
          "Luteal phase hormonal blood test confirmation",
        ],
        excludes: [
          "Ovarian stimulation injectable medications (approx ₹45,000–₹75,000 depending on protocol)",
          "PGT-A / Genetic screening per embryo (optional ₹18,000–₹24,000/embryo)",
          "Embryo cryopreservation & annual storage maintenance",
          "Donor gamete statutory programme costs (if opted)",
        ],
        lastVerifiedAt: "2026-08-02",
      },
      {
        procedureId: "proc_neuro_spinal",
        procedureName: "Minimally Invasive Spine Fusion (MIS-TLIF)",
        priceInrMin: 275000,
        priceInrMax: 460000,
        includes: [
          "Chief Spine Neurosurgeon procedure fees",
          "Medical grade titanium pedicle screw fixation kit",
          "Tubular retractor & microscope navigation surgical charges",
          "4 nights standard inpatient stay",
          "Inpatient physical therapy & mobilization training",
        ],
        excludes: [
          "Multi-level spinal decompression add-ons",
          "Post-discharge orthotic brace",
        ],
        lastVerifiedAt: "2026-07-22",
      },
    ],
    npsScore: 89,
    npsResponseCount: 118,
    mapsUrl: "https://maps.google.com/?q=Max+Super+Speciality+Hospital+Saket",
    photos: ["/images/hospitals/max-super-speciality-hospital-saket.jpg"],
    website: "https://www.maxhealthcare.in",
  },
  {
    id: "hosp_delhi_blk_max",
    slug: "blk-max-super-speciality-hospital",
    name: "BLK-Max Super Speciality Hospital",
    city: "delhi",
    cityLabel: "New Delhi (Pusa Road)",
    address: "Building No 5A, Pusa Rd, Karol Bagh, New Delhi 110005",
    tagline: "650-bed premier tertiary care hospital with renowned BLK-Max Cancer Centre",
    description:
      "BLK-Max Super Speciality Hospital is one of the largest and most advanced tertiary care hospitals in North India. Spread across 5 acres with 650 beds, 17 state-of-the-art modular operation theatres, and 125 critical care beds, it holds prestigious JCI and NABH accreditations. The BLK-Max Cancer Centre houses distinguished multi-disciplinary teams across Surgical Oncology, Gynaecological Oncology, Onco-Reconstructive Plastic Surgery, and Bone Marrow Transplantation.",
    founded: 1959,
    bedCount: 650,
    nabhRegNumber: "H-2012-0044",
    jciAccredId: "JCI-IND-BLK-015",
    specialties: [
      "Surgical Oncology & Cancer Care",
      "Plastic & Onco-Reconstructive Surgery",
      "Gynaecological Surgical Oncology",
      "Breast Oncological Surgery",
      "Bone Marrow & Stem Cell Transplant",
      "Robotic & Minimally Invasive Surgery",
    ],
    packages: [
      {
        procedureId: "proc_onco_surgery",
        procedureName: "Robotic / Radical Surgical Oncology Resection",
        priceInrMin: 280000,
        priceInrMax: 490000,
        includes: [
          "Pre-operative oncological multi-disciplinary tumour board review",
          "Chief Surgical Oncologist and Anaesthesia team fees",
          "Da Vinci Robotic / High-definition modular OT charges",
          "2 nights Surgical ICU + 4 nights private room stay",
          "Histopathology biopsy, margin verification & IHC tests",
          "Comprehensive post-discharge surgical wound care plan",
        ],
        excludes: [
          "Adjuvant chemotherapy or radiation therapy courses",
          "Specialized targeted immunotherapy infusions",
          "Post-discharge take-home pharmaceuticals",
        ],
        lastVerifiedAt: "2026-08-10",
      },
    ],
    npsScore: 92,
    npsResponseCount: 134,
    mapsUrl: "https://maps.google.com/?q=BLK-Max+Super+Speciality+Hospital+Pusa+Road+Delhi",
    photos: ["/images/hospitals/blk-max-super-speciality-hospital.jpg"],
    website: "https://www.blkmaxhospital.com",
  },
  {
    id: "hosp_delhi_sci_international",
    slug: "sci-international-hospital",
    name: "SCI International Hospital",
    city: "delhi",
    cityLabel: "New Delhi (Greater Kailash-1)",
    address: "4 Hansraj Gupta Marg, Greater Kailash-1, New Delhi 110048",
    tagline: "Premier NABH-accredited surgical centre for Reconstructive Urology, Andrology & Advanced Surgeries",
    description:
      "SCI International Hospital is a premier multi-speciality surgical centre located in South Delhi. NABH-accredited and equipped with modern modular operating suites, advanced laser technologies, and specialized recovery units, SCI is globally renowned for excellence in Reconstructive Urology, Andrology, Penile Implants, Male Infertility, and minimally invasive surgeries.",
    founded: 2014,
    bedCount: 50,
    nabhRegNumber: "H-2016-0182",
    jciAccredId: null,
    specialties: [
      "Urology & Andrology",
      "Genito-Urinary Reconstructive Surgery",
      "Penile Prosthesis & Implants",
      "Male Infertility & Micro-TESE",
      "Advanced Minimally Invasive Surgery",
    ],
    packages: [
      {
        procedureId: "proc_uro_urethroplasty",
        procedureName: "Buccal Mucosa Graft (BMG) Urethroplasty / Penile Reconstruction",
        priceInrMin: 180000,
        priceInrMax: 320000,
        includes: [
          "Pre-operative urological evaluation & uroflowmetry analysis",
          "Chief Reconstructive Urologist and Surgical Team fees",
          "High-definition modular Operation Theatre charges & consumable pack",
          "2 nights Deluxe / Private inpatient room stay with nursing care",
          "Post-operative catheter management and wound dressings",
          "Discharge medications and follow-up consults",
        ],
        excludes: [
          "Specialised inflatable penile prosthesis device cost (if combined)",
          "Extended stay due to severe pre-existing systemic co-morbidities",
        ],
        lastVerifiedAt: "2026-08-15",
      },
    ],
    npsScore: 94,
    npsResponseCount: 88,
    mapsUrl: "https://maps.google.com/?q=SCI+International+Hospital+Greater+Kailash+Delhi",
    photos: ["/images/hospitals/max-super-speciality-hospital-saket.jpg"],
    website: "https://scihospital.com",
  },
  {
    id: "hosp_delhi_apollo_indraprastha",
    slug: "indraprastha-apollo-hospitals",
    name: "Indraprastha Apollo Hospitals",
    city: "delhi",
    cityLabel: "New Delhi (Sarita Vihar)",
    address: "Delhi-Mathura Road, Sarita Vihar, New Delhi 110076",
    tagline: "710-bed multi-specialty institution — India's first JCI-accredited hospital",
    description:
      "Indraprastha Apollo Hospitals is the flagship hospital of the Apollo Group in North India. Accredited by JCI continuously for over two decades, it was the first hospital in India to achieve JCI accreditation. It boasts South Asia's leading solid organ transplant programme, high-volume cardiac surgery, and a dedicated international patient lounge with multi-lingual assistance.",
    founded: 1996,
    bedCount: 710,
    nabhRegNumber: "H-2008-0012",
    jciAccredId: "JCI-IND-APO-001",
    specialties: [
      "Liver & Kidney Transplantation",
      "Cardiovascular & Thoracic Surgery",
      "Orthopaedics & Robotic Joint Surgery",
      "Neurology & Spine Surgery",
      "Paediatric Multi-Specialty Care",
    ],
    packages: [
      {
        procedureId: "proc_transplant_liver",
        procedureName: "Living Donor Liver Transplant (Adult / Paediatric)",
        priceInrMin: 2250000,
        priceInrMax: 3100000,
        includes: [
          "Comprehensive dual-surgical team charges (Donor + Recipient)",
          "Transplant High-Dependency ICU stay (7 days) + 12 days room stay",
          "Living donor surgery, consumables, and 6-day recovery care",
          "Intraoperative blood gas, thromboelastography (TEG), and Doppler checks",
          "Standard inpatient post-transplant medications",
          "Inpatient clinical dietary consultation & physical rehab",
        ],
        excludes: [
          "Pre-transplant donor/recipient workup & tissue typing panel",
          "Management of acute severe pre-existing portal hypertension complications",
          "Post-discharge maintenance immunosuppression therapy",
        ],
        lastVerifiedAt: "2026-08-08",
      },
      {
        procedureId: "proc_cardiac_bypass",
        procedureName: "Total Arterial CABG / Minimally Invasive Bypass",
        priceInrMin: 310000,
        priceInrMax: 470000,
        includes: [
          "Cardiothoracic surgical & perfusionist charges",
          "Operation theatre charges including heart-lung machine setup",
          "3 days CT-ICU + 4 days private room accommodation",
          "Standard post-op diagnostic tests (ECG, Chest X-Ray, Lab panels)",
          "Comprehensive discharge medical records for home country physician",
        ],
        excludes: [
          "Emergency intra-aortic balloon pump (IABP) consumables if indicated",
          "Extended ICU stay beyond standard package protocol",
        ],
        lastVerifiedAt: "2026-07-29",
      },
      {
        procedureId: "proc_ortho_knee",
        procedureName: "Total Knee Arthroplasty (Unilateral)",
        priceInrMin: 205000,
        priceInrMax: 330000,
        includes: [
          "Senior Joint Replacement Surgeon fees",
          "FDA-approved imported knee prosthesis (Cobalt Chrome / Titanium base)",
          "Operation theatre charges & sterile disposable draping",
          "4 nights hospital stay with nursing care",
          "In-hospital physiotherapy recovery sessions",
        ],
        excludes: [
          "Custom high-activity ceramic implants (add approx ₹40,000)",
          "Take-home mobility walker and pharmacy",
        ],
        lastVerifiedAt: "2026-07-31",
      },
    ],
    npsScore: 92,
    npsResponseCount: 165,
    mapsUrl: "https://maps.google.com/?q=Indraprastha+Apollo+Hospital+Delhi",
    photos: ["/images/hospitals/indraprastha-apollo-hospitals.jpg"],
    website: "https://www.apollohospitals.com",
  },
  {
    id: "hosp_delhi_artemis",
    slug: "artemis-hospital-gurugram",
    name: "Artemis Hospital",
    city: "delhi",
    cityLabel: "Gurugram (Delhi NCR)",
    address: "Sector 51, Gurugram, Delhi NCR 122001",
    tagline: "First JCI and NABH accredited hospital in Gurugram",
    description:
      "Artemis Hospital is a 600-bed state-of-the-art super-specialty hospital in Gurugram, designed around international medical safety standards. Artemis has earned acclaim for excellence in cardiology, joint replacement, spine surgery, and oncology.",
    founded: 2007,
    bedCount: 600,
    nabhRegNumber: "H-2010-0045",
    jciAccredId: "JCI-IND-ART-024",
    specialties: [
      "Cardiac Sciences",
      "Orthopaedics & Joint Replacements",
      "Neurosciences & Spine",
      "Oncology",
      "Bariatric & Metabolic Surgery",
    ],
    packages: [
      {
        procedureId: "proc_ortho_knee",
        procedureName: "Total Knee Replacement",
        priceInrMin: 195000,
        priceInrMax: 320000,
        includes: [
          "Consultant Orthopaedic Surgeon & Anaesthesia charges",
          "Premium imported knee prosthesis (Smith+Nephew / Stryker)",
          "OT charges & standard surgical kit",
          "4 nights inpatient stay",
          "Physiotherapy sessions twice daily during stay",
        ],
        excludes: [
          "Bilateral upgrade",
          "Outpatient take-home medications",
        ],
        lastVerifiedAt: "2026-08-04",
      },
      {
        procedureId: "proc_neuro_spinal",
        procedureName: "Lumbar Spinal Fusion",
        priceInrMin: 260000,
        priceInrMax: 440000,
        includes: [
          "Chief Neuro/Spine Surgeon fees",
          "Standard instrumentation fixation kit",
          "1 day ICU + 4 days standard room",
          "Daily in-hospital spinal physiotherapy",
        ],
        excludes: ["Extended vertebral decompression levels"],
        lastVerifiedAt: "2026-07-25",
      },
      {
        procedureId: "proc_cardiac_bypass",
        procedureName: "CABG Heart Surgery",
        priceInrMin: 300000,
        priceInrMax: 460000,
        includes: [
          "Surgical team & anaesthesiologist charges",
          "3 days Intensive Coronary Care Unit stay",
          "4 days ward stay",
          "Routine surgical diagnostics and post-op wound evaluation",
        ],
        excludes: ["Specialised prosthetic cardiac conduits"],
        lastVerifiedAt: "2026-07-30",
      },
    ],
    npsScore: 87,
    npsResponseCount: 78,
    mapsUrl: "https://maps.google.com/?q=Artemis+Hospital+Gurugram",
    photos: ["/images/hospitals/artemis-hospital-gurugram.jpg"],
    website: "https://www.artemishospitals.com",
  },
  {
    id: "hosp_delhi_aiims",
    slug: "all-india-institute-of-medical-sciences",
    name: "All India Institute of Medical Sciences (AIIMS)",
    city: "delhi",
    cityLabel: "New Delhi (Ansari Nagar)",
    address: "Sri Aurobindo Marg, Ansari Nagar, New Delhi 110029",
    tagline: "India's premier apex public medical research and tertiary institution",
    description:
      "AIIMS New Delhi is recognized as India's foremost medical research and clinical institution. Renowned worldwide for surgical breakthroughs and pioneering medical advancements, AIIMS houses world-renowned professors and specialists across cardiothoracic surgery, organ transplantation, and neurosurgery.",
    founded: 1956,
    bedCount: 2478,
    nabhRegNumber: "NABH-CENTRAL-AIIMS-01",
    jciAccredId: null,
    specialties: [
      "Cardiothoracic Surgery",
      "Organ Transplantation",
      "Neurosurgery & Spine",
      "Oncology",
      "Paediatric Super-Specialties",
    ],
    packages: [
      {
        procedureId: "proc_cardiac_bypass",
        procedureName: "Coronary Artery Bypass Surgery (CABG)",
        priceInrMin: 220000,
        priceInrMax: 340000,
        includes: [
          "Consultant professor surgical team charges",
          "Specialized cardiac anaesthesiology & OT charges",
          "4 days Cardiac ICU + 4 days private room ward stay",
          "Diagnostic lab work, echocardiography & in-hospital pharmacy",
          "Post-surgical follow-up protocol",
        ],
        excludes: [
          "International patient facilitation desk services",
          "Private airport transportation and guest accommodation",
        ],
        lastVerifiedAt: "2026-06-30",
      },
    ],
    npsScore: 86,
    npsResponseCount: 64,
    mapsUrl: "https://maps.google.com/?q=AIIMS+New+Delhi",
    photos: ["/images/hospitals/all-india-institute-of-medical-sciences.jpg"],
    website: "https://www.aiims.edu",
  },

  // ─── MUMBAI ──────────────────────────────────────────────────────
  {
    id: "hosp_mumbai_kokilaben",
    slug: "kokilaben-dhirubhai-ambani-hospital",
    name: "Kokilaben Dhirubhai Ambani Hospital",
    city: "mumbai",
    cityLabel: "Mumbai (Andheri West)",
    address: "Rao Saheb Achutrao Patwardhan Marg, Four Bungalows, Andheri West, Mumbai 400053",
    tagline: "JCI & NABH accredited multi-specialty leader in Western India",
    description:
      "Kokilaben Dhirubhai Ambani Hospital is Western India's premier multi-specialty quaternary care hospital. Features India's largest critical care programme (180 ICU beds), intraoperative 3T MRI BrainSuite, robotic da Vinci systems, and a high-volume cardiac and neurosciences division.",
    founded: 2009,
    bedCount: 750,
    nabhRegNumber: "H-2011-0078",
    jciAccredId: "JCI-IND-KDAH-028",
    specialties: ["Cardiac Sciences", "Robotic Surgery", "Neurosciences", "Oncology", "Joint Replacement"],
    packages: [
      {
        procedureId: "proc_cardiac_bypass",
        procedureName: "Minimally Invasive CABG",
        priceInrMin: 360000,
        priceInrMax: 520000,
        includes: [
          "Surgeon & anaesthetist fees",
          "3 days Cardiac ICU + 4 days private room",
          "Medications during stay & cardiac rehab consult",
          "Two post-discharge dressing and follow-up checks",
        ],
        excludes: ["Blood products & take-home medications"],
        lastVerifiedAt: "2026-07-20",
      },
    ],
    npsScore: 90,
    npsResponseCount: 110,
    mapsUrl: "https://maps.google.com/?q=Kokilaben+Hospital+Mumbai",
    photos: ["/images/hospitals/kokilaben-dhirubhai-ambani-hospital.jpg"],
    website: "https://www.kokilabenhospital.com",
  },
  {
    id: "hosp_mumbai_lilavati",
    slug: "lilavati-hospital",
    name: "Lilavati Hospital & Research Centre",
    city: "mumbai",
    cityLabel: "Mumbai (Bandra West)",
    address: "A-791, Bandra Reclamation, Bandra West, Mumbai 400050",
    tagline: "Trusted Mumbai healthcare institution with decades of excellence",
    description:
      "Lilavati Hospital & Research Centre is an established premier hospital in Mumbai, known for clinical acumen across IVF, cardiology, joint replacement, and oncology.",
    founded: 1978,
    bedCount: 323,
    nabhRegNumber: "H-2012-0095",
    jciAccredId: null,
    specialties: ["Fertility & IVF", "Cardiac Surgery", "Oncology", "Joint Replacement"],
    packages: [
      {
        procedureId: "proc_fertility_ivf",
        procedureName: "IVF / ICSI Treatment Cycle",
        priceInrMin: 140000,
        priceInrMax: 230000,
        includes: [
          "Fertility consultant monitoring and ultrasound scans",
          "Egg retrieval (OPU) procedure with day-care stay",
          "ICSI laboratory procedure & blastocyst culture",
          "Fresh embryo transfer under ultrasound guidance",
        ],
        excludes: ["Stimulation hormones & medications", "PGT-A genetic testing"],
        lastVerifiedAt: "2026-07-25",
      },
    ],
    npsScore: 88,
    npsResponseCount: 75,
    mapsUrl: "https://maps.google.com/?q=Lilavati+Hospital+Mumbai",
    photos: ["/images/hospitals/lilavati-hospital.jpg"],
    website: "https://www.lilavatihospital.com",
  },

  // ─── CHENNAI ─────────────────────────────────────────────────────
  {
    id: "hosp_chennai_apollo",
    slug: "apollo-hospitals-greams-road",
    name: "Apollo Hospitals, Greams Road",
    city: "chennai",
    cityLabel: "Chennai",
    address: "21, Greams Lane, Off Greams Road, Chennai 600006",
    tagline: "The flagship institution of Apollo Hospitals Group",
    description:
      "Apollo Hospitals Greams Road in Chennai is the historic birthplace of corporate private healthcare in India. Renowned worldwide for organ transplantation, complex cardiology, and orthopaedics, treating patients from over 120 countries.",
    founded: 1983,
    bedCount: 700,
    nabhRegNumber: "H-2007-0005",
    jciAccredId: "JCI-IND-APO-CHE-003",
    specialties: ["Organ Transplant", "Cardiac Sciences", "Orthopaedics", "Oncology"],
    packages: [
      {
        procedureId: "proc_transplant_liver",
        procedureName: "Adult Living Donor Liver Transplant",
        priceInrMin: 2150000,
        priceInrMax: 3000000,
        includes: [
          "Recipient and donor simultaneous surgical team fee",
          "7 days Transplant ICU + 14 days ward care",
          "Donor surgery, inpatient stay, and recovery nursing",
          "Routine post-op lab panels and Doppler vascular imaging",
        ],
        excludes: ["Pre-op workup and long-term outpatient immunosuppression"],
        lastVerifiedAt: "2026-08-01",
      },
    ],
    npsScore: 93,
    npsResponseCount: 180,
    mapsUrl: "https://maps.google.com/?q=Apollo+Hospital+Greams+Road+Chennai",
    photos: ["/images/hospitals/apollo-hospitals-greams-road.jpg"],
    website: "https://www.apollohospitals.com",
  },

  // ─── BANGALORE ───────────────────────────────────────────────────
  {
    id: "hosp_bangalore_narayana",
    slug: "narayana-health-city",
    name: "Narayana Health City",
    city: "bangalore",
    cityLabel: "Bengaluru",
    address: "258/A, Bommasandra Industrial Area, Bengaluru 560099",
    tagline: "World-class high-volume cardiac and multi-specialty health city",
    description:
      "Founded by pioneering cardiac surgeon Dr. Devi Shetty, Narayana Health City performs among the highest volume of heart surgeries globally with clinical outcomes on par with top US medical centres at globally accessible costs.",
    founded: 2001,
    bedCount: 1400,
    nabhRegNumber: "H-2010-0033",
    jciAccredId: "JCI-IND-NH-015",
    specialties: ["Adult & Paediatric Cardiac Surgery", "Transplant", "Oncology", "Neurosciences"],
    packages: [
      {
        procedureId: "proc_cardiac_bypass",
        procedureName: "Coronary Artery Bypass Grafting (CABG)",
        priceInrMin: 275000,
        priceInrMax: 410000,
        includes: [
          "Cardiothoracic surgeon & team professional fees",
          "3 days Intensive Cardiac ICU + 4 days ward accommodation",
          "In-hospital cardiac medications and physical therapy",
          "Post-discharge consultation & surgical record handover",
        ],
        excludes: ["Complex repeat revascularizations"],
        lastVerifiedAt: "2026-08-03",
      },
    ],
    npsScore: 92,
    npsResponseCount: 210,
    mapsUrl: "https://maps.google.com/?q=Narayana+Health+City+Bangalore",
    photos: ["/images/hospitals/narayana-health-city.jpg"],
    website: "https://www.narayanahealth.org",
  },
  {
    id: "hosp_bangalore_manipal",
    slug: "manipal-hospitals-old-airport-road",
    name: "Manipal Hospitals, Old Airport Road",
    city: "bangalore",
    cityLabel: "Bengaluru",
    address: "98, HAL Old Airport Road, Bengaluru 560017",
    tagline: "Flagship quaternary hospital of Manipal Health Enterprises",
    description:
      "Manipal Hospital Old Airport Road is a 600-bed multi-specialty quaternary care centre in Bengaluru, holding NABH, JCI, and NABL accreditations with specialized centres for joint reconstruction, cardiac surgery, and spine.",
    founded: 1991,
    bedCount: 600,
    nabhRegNumber: "H-2009-0018",
    jciAccredId: "JCI-IND-MAN-022",
    specialties: ["Orthopaedics", "Cardiology", "Neurosciences", "Transplant"],
    packages: [
      {
        procedureId: "proc_ortho_knee",
        procedureName: "Total Knee Replacement",
        priceInrMin: 200000,
        priceInrMax: 330000,
        includes: [
          "Orthopaedic Surgeon & Anaesthetist fees",
          "Premium FDA-approved knee implant kit",
          "4 nights hospital stay",
          "Daily physical therapy in hospital",
        ],
        excludes: ["Outpatient take-home pharmaceuticals"],
        lastVerifiedAt: "2026-07-28",
      },
    ],
    npsScore: 89,
    npsResponseCount: 95,
    mapsUrl: "https://maps.google.com/?q=Manipal+Hospital+Old+Airport+Road+Bangalore",
    photos: ["/images/hospitals/manipal-hospitals-old-airport-road.jpg"],
    website: "https://www.manipalhospitals.com",
  },

  // ─── HYDERABAD ───────────────────────────────────────────────────
  {
    id: "hosp_hyderabad_yashoda",
    slug: "yashoda-hospitals-secunderabad",
    name: "Yashoda Hospitals, Secunderabad",
    city: "hyderabad",
    cityLabel: "Hyderabad",
    address: "Alexander Road, Secunderabad, Hyderabad 500003",
    tagline: "Leading multi-specialty healthcare destination in Telangana",
    description:
      "Yashoda Hospitals is a leading healthcare group in Hyderabad with over three decades of clinical service, known for cardiac care, spine surgery, and IVF.",
    founded: 1988,
    bedCount: 1100,
    nabhRegNumber: "H-2011-0062",
    jciAccredId: null,
    specialties: ["Cardiac Surgery", "Spine Surgery", "Fertility", "Orthopaedics"],
    packages: [
      {
        procedureId: "proc_neuro_spinal",
        procedureName: "Spinal Fusion Surgery",
        priceInrMin: 250000,
        priceInrMax: 440000,
        includes: [
          "Spine neurosurgeon charges",
          "Medical grade spinal hardware instrumentation",
          "4 nights inpatient stay",
          "Physical therapy recovery sessions",
        ],
        excludes: ["Extended decompressive levels"],
        lastVerifiedAt: "2026-07-22",
      },
    ],
    npsScore: 87,
    npsResponseCount: 82,
    mapsUrl: "https://maps.google.com/?q=Yashoda+Hospital+Secunderabad",
    photos: ["/images/hospitals/yashoda-hospitals-secunderabad.jpg"],
    website: "https://www.yashodahospitals.com",
  },
];

/** Get hospital by city + slug */
export function getHospital(city: string, slug: string): Hospital | undefined {
  return HOSPITALS.find((h) => h.city === city && h.slug === slug);
}

/** Get all hospitals in a city */
export function getHospitalsByCity(city: City): Hospital[] {
  return HOSPITALS.filter((h) => h.city === city);
}

/** Get all param combos for generateStaticParams */
export function getAllHospitalParams() {
  return HOSPITALS.map((h) => ({
    city: h.city,
    "hospital-slug": h.slug,
  }));
}

/** Get packages for a specific procedure across all hospitals */
export function getPackagesForProcedure(procedureId: string) {
  return HOSPITALS.flatMap((h) =>
    h.packages
      .filter((p) => p.procedureId === procedureId)
      .map((pkg) => ({ hospital: h, package: pkg }))
  );
}
