export type PipelineStatus = 'draft' | 'pending_review' | 'approved' | 'published'

export interface AuditEntry {
  action: string
  user: string
  timestamp: string
  note?: string
}

export interface ProcedureRecord {
  id: string
  name: string
  category: string
  priceMin: number
  priceMax: number
  currency: string
  targetCountry: string
  hospitalNames: string[]
  trustBlurb: string
  status: PipelineStatus
  createdAt: string
  updatedAt: string
}

export interface LandingPageRecord {
  id: string
  procedureId: string
  procedureName: string
  category: string
  targetCountry: string
  priceMin: number
  priceMax: number
  currency: string
  hospitalNames: string[]
  trustBlurb: string
  headline: string
  subheadline: string
  bodyCopy: string
  metaTitle: string
  metaDescription: string
  formConfig: {
    defaultTreatment: string
    countryCode: string
    disclaimer: string
  }
  slug: string // e.g. /get-quote/cardiac-bypass-surgery/united-kingdom
  procedureSlug: string // e.g. cardiac-bypass-surgery
  countrySlug: string // e.g. united-kingdom
  status: PipelineStatus
  generatedAt: string
  reviewedBy: string | null
  approvedAt: string | null
  publishedAt: string | null
  auditLog: AuditEntry[]
  feedbackNote: string | null
  analytics: {
    views: number
    submissions: number
    conversionRate: number
  }
}

export const INITIAL_PROCEDURES: ProcedureRecord[] = [
  {
    id: 'proc_cabg_uk',
    name: 'Coronary Artery Bypass Graft (CABG)',
    category: 'Cardiac Surgery',
    priceMin: 4200,
    priceMax: 6800,
    currency: 'USD',
    targetCountry: 'United Kingdom',
    hospitalNames: ['Medanta — The Medicity', 'Fortis Escorts Heart Institute'],
    trustBlurb: 'Senior cardiac surgeons with 30+ years experience, 99.2% clinical success, and zero broker markups.',
    status: 'published',
    createdAt: '2026-08-28T10:00:00.000Z',
    updatedAt: '2026-08-28T14:30:00.000Z',
  },
  {
    id: 'proc_knee_uae',
    name: 'Total Knee Replacement (Robotic / Minimally Invasive)',
    category: 'Orthopaedics',
    priceMin: 3800,
    priceMax: 5400,
    currency: 'USD',
    targetCountry: 'United Arab Emirates',
    hospitalNames: ['Max Super Speciality Hospital, Saket', 'Artemis Hospital'],
    trustBlurb: 'FDA-approved US implants, Stryker robotic precision, and dedicated 1-on-1 physiotherapy recovery package.',
    status: 'pending_review',
    createdAt: '2026-08-30T09:15:00.000Z',
    updatedAt: '2026-08-30T09:15:00.000Z',
  },
  {
    id: 'proc_liver_nga',
    name: 'Living Donor Liver Transplantation',
    category: 'Organ Transplant',
    priceMin: 22000,
    priceMax: 29000,
    currency: 'USD',
    targetCountry: 'Nigeria',
    hospitalNames: ['Medanta — The Medicity', 'Indraprastha Apollo Hospitals'],
    trustBlurb: 'World-renowned transplant teams performing 500+ successful donor transplants annually with state-of-the-art ICUs.',
    status: 'pending_review',
    createdAt: '2026-08-31T08:00:00.000Z',
    updatedAt: '2026-08-31T08:00:00.000Z',
  },
]

export const INITIAL_LANDING_PAGES: LandingPageRecord[] = [
  {
    id: 'lp_cabg_uk',
    procedureId: 'proc_cabg_uk',
    procedureName: 'Coronary Artery Bypass Graft (CABG)',
    category: 'Cardiac Surgery',
    targetCountry: 'United Kingdom',
    priceMin: 4200,
    priceMax: 6800,
    currency: 'USD',
    hospitalNames: ['Medanta — The Medicity', 'Fortis Escorts Heart Institute'],
    trustBlurb: 'Senior cardiac surgeons with 30+ years experience, 99.2% clinical success, and zero broker markups.',
    headline: 'UK Patients: Get World-Class Cardiac Bypass Surgery in India from $4,200',
    subheadline: 'Skip NHS waiting lists. Receive itemized hospital package comparisons from JCI-accredited cardiac institutes within 24 hours.',
    bodyCopy: 'For UK residents seeking prompt, world-class cardiac care without lengthy delays, top-tier Indian hospitals offer CABG surgery performed by internationally renowned surgeons at 70-80% lower cost than private UK clinics. All packages include pre-op diagnostics, surgeon fees, ICU stay, and continuous English-speaking care coordination.',
    metaTitle: 'Cardiac Bypass Surgery in India for UK Patients | $4,200 Package Quotes',
    metaDescription: 'Compare top JCI accredited hospitals in India for CABG heart surgery. Fast medical visa, senior surgeon opinions, and transparent package pricing.',
    formConfig: {
      defaultTreatment: 'Coronary Artery Bypass Graft (CABG)',
      countryCode: '+44',
      disclaimer: '100% Confidential. Free senior surgeon review within 24 hours.',
    },
    slug: '/get-quote/cardiac-bypass-surgery/united-kingdom',
    procedureSlug: 'cardiac-bypass-surgery',
    countrySlug: 'united-kingdom',
    status: 'published',
    generatedAt: '2026-08-28T10:01:00.000Z',
    reviewedBy: 'Dr. Admin (Chief Medical Officer)',
    approvedAt: '2026-08-28T14:30:00.000Z',
    publishedAt: '2026-08-28T14:30:00.000Z',
    auditLog: [
      { action: 'AI Generated Draft', user: 'Claude Sonnet Engine', timestamp: '2026-08-28T10:01:00.000Z' },
      { action: 'Approved & Published', user: 'Dr. Admin (Chief Medical Officer)', timestamp: '2026-08-28T14:30:00.000Z', note: 'Verified pricing matches Medanta & Fortis standard packages.' },
    ],
    feedbackNote: null,
    analytics: {
      views: 1420,
      submissions: 86,
      conversionRate: 6.05,
    },
  },
  {
    id: 'lp_knee_uae',
    procedureId: 'proc_knee_uae',
    procedureName: 'Total Knee Replacement (Robotic / Minimally Invasive)',
    category: 'Orthopaedics',
    targetCountry: 'United Arab Emirates',
    priceMin: 3800,
    priceMax: 5400,
    currency: 'USD',
    hospitalNames: ['Max Super Speciality Hospital, Saket', 'Artemis Hospital'],
    trustBlurb: 'FDA-approved US implants, Stryker robotic precision, and dedicated 1-on-1 physiotherapy recovery package.',
    headline: 'Robotic Total Knee Replacement in India: Transparent Packages from $3,800',
    subheadline: 'Sub-millimeter surgical accuracy with Stryker Mako robotic systems at JCI-accredited hospitals in Delhi NCR.',
    bodyCopy: 'UAE residents can access premium robotic knee joint replacement with US-manufactured implants and comprehensive rehabilitation. Enjoy dedicated Arabic interpreter assistance, airport transfers, and itemized billing with zero hidden agency surcharges.',
    metaTitle: 'Robotic Knee Replacement in India for UAE Patients | $3,800 Complete Package',
    metaDescription: 'Get 3 hospital quotes for robotic knee replacement in Delhi NCR. JCI accredited hospitals, FDA implants, and fast medical travel coordination.',
    formConfig: {
      defaultTreatment: 'Total Knee Replacement',
      countryCode: '+971',
      disclaimer: 'Direct hospital package rates with no agent markup.',
    },
    slug: '/get-quote/robotic-knee-replacement/united-arab-emirates',
    procedureSlug: 'robotic-knee-replacement',
    countrySlug: 'united-arab-emirates',
    status: 'pending_review',
    generatedAt: '2026-08-30T09:16:00.000Z',
    reviewedBy: null,
    approvedAt: null,
    publishedAt: null,
    auditLog: [
      { action: 'AI Generated Draft', user: 'Claude Sonnet Engine', timestamp: '2026-08-30T09:16:00.000Z' },
    ],
    feedbackNote: null,
    analytics: {
      views: 0,
      submissions: 0,
      conversionRate: 0,
    },
  },
  {
    id: 'lp_liver_nga',
    procedureId: 'proc_liver_nga',
    procedureName: 'Living Donor Liver Transplantation',
    category: 'Organ Transplant',
    targetCountry: 'Nigeria',
    priceMin: 22000,
    priceMax: 29000,
    currency: 'USD',
    hospitalNames: ['Medanta — The Medicity', 'Indraprastha Apollo Hospitals'],
    trustBlurb: 'World-renowned transplant teams performing 500+ successful donor transplants annually with state-of-the-art ICUs.',
    headline: 'Living Donor Liver Transplant in India: Complete Packages from $22,000',
    subheadline: 'Accredited transplant centers with 95%+ success rates, full government authorization assistance, and dedicated patient support.',
    bodyCopy: 'Patients from Nigeria traveling to India for living donor liver transplantation receive end-to-end guidance through state authorization committees, donor evaluations, ICU post-operative monitoring, and long-term immunosuppression planning.',
    metaTitle: 'Liver Transplant in India for Nigerian Patients | Verified Hospital Quotes',
    metaDescription: 'Complete liver transplant packages at JCI accredited hospitals in India. Fast visa approval support and transparent itemized hospital pricing.',
    formConfig: {
      defaultTreatment: 'Living Donor Liver Transplant',
      countryCode: '+234',
      disclaimer: 'Strict adherence to international organ transplant protocols.',
    },
    slug: '/get-quote/liver-transplant/nigeria',
    procedureSlug: 'liver-transplant',
    countrySlug: 'nigeria',
    status: 'pending_review',
    generatedAt: '2026-08-31T08:01:00.000Z',
    reviewedBy: null,
    approvedAt: null,
    publishedAt: null,
    auditLog: [
      { action: 'AI Generated Draft', user: 'Claude Sonnet Engine', timestamp: '2026-08-31T08:01:00.000Z' },
    ],
    feedbackNote: null,
    analytics: {
      views: 0,
      submissions: 0,
      conversionRate: 0,
    },
  },
]
