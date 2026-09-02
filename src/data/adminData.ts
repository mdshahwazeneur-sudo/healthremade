/**
 * Operational Data and Mock Database for the /admin core system.
 */

export interface LeadCase {
  id: string;
  patientName: string;
  country: string;
  countryCode: string;
  phone: string;
  procedure: string;
  preferredHospital: string;
  preferredCity: string;
  caseManager: string;
  stage: 'inquiry' | 'quote_sent' | 'doctor_review' | 'booking_confirmed' | 'visa_travel' | 'in_hospital' | 'post_op';
  quoteAmountInr: number;
  source: 'Google Ads' | 'Meta Ads' | 'Organic Search' | 'Direct WhatsApp' | 'Referral';
  campaignId?: string;
  adGroup?: string;
  inquiryDate: string;
  lastActivity: string;
  notesCount: number;
  priority: 'high' | 'medium' | 'low';
  activityHistory: {
    date: string;
    action: string;
    user: string;
    details: string;
  }[];
}

export interface PricingChangeRequest {
  id: string;
  hospitalName: string;
  procedureName: string;
  currentMinInr: number;
  currentMaxInr: number;
  proposedMinInr: number;
  proposedMaxInr: number;
  submittedBy: string;
  submittedAt: string;
  reason: string;
  status: 'pending_review' | 'approved' | 'rejected';
  version: number;
  itemizedChanges: string[];
}

export interface DisputeTicket {
  id: string;
  patientName: string;
  hospitalName: string;
  procedure: string;
  bookingId: string;
  severity: 'critical' | 'high' | 'medium';
  status: 'open' | 'under_clinical_review' | 'hospital_escalation' | 'resolved';
  issueType: 'Billing Discrepancy' | 'Clinical Complication' | 'Service Quality' | 'Second Opinion Request';
  assignedManager: string;
  openedAt: string;
  slaDeadline: string;
  slaHoursLeft: number;
  description: string;
}

export interface OutcomeModerationItem {
  id: string;
  bookingId: string;
  patientName: string;
  hospitalName: string;
  procedure: string;
  surveyStage: '4_weeks' | '12_weeks' | '26_weeks';
  npsScore: number;
  rating: number;
  submittedAt: string;
  status: 'pending_verification' | 'published' | 'rejected_flagged';
  patientFeedback: string;
  bookingVerified: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  targetKeyword: string;
  category: 'Cardiac Surgery' | 'Orthopaedics' | 'Organ Transplant' | 'Medical Tourism Guide' | 'Pricing & Visas';
  author: string;
  medicalReviewer: string;
  reviewerDesignation: string;
  reviewerHospital: string;
  reviewerDate: string;
  seoScore: number;
  status: 'draft' | 'medical_review' | 'seo_check' | 'published';
  relatedProcedures: string[];
  faqs: { question: string; answer: string }[];
  lastUpdated: string;
}

export interface AdCampaign {
  id: string;
  channel: 'Google Ads' | 'Meta Ads' | 'Direct WhatsApp Ads';
  campaignName: string;
  targetKeyword: string;
  targetRegion: string;
  spendInr: number;
  impressions: number;
  clicks: number;
  leadsGenerated: number;
  costPerLeadInr: number;
  confirmedBookings: number;
  costPerBookingInr: number;
  pipelineRevenueInr: number;
  roiMultiplier: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'case_manager' | 'hospital_partner' | 'medical_reviewer' | 'content_editor';
  assignedDepartment: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

export const ADMIN_KPIS = {
  activeLeadsCount: 48,
  pendingQuotesCount: 14,
  confirmedBookingsMonth: 29,
  pipelineValueInr: 14850000,
  adSpendMonthInr: 320000,
  blendedCplInr: 1850,
  activeDisputesCount: 2,
  pendingPricingApprovalsCount: 5,
  partnerHospitalsCount: 12,
  publishedArticlesCount: 18,
};

export const MOCK_LEADS: LeadCase[] = [
  {
    id: "CASE-8842",
    patientName: "Tariq Al-Mansoor",
    country: "United Arab Emirates",
    countryCode: "+971",
    phone: "+971 50 123 4567",
    procedure: "Bypass Surgery (CABG / Off-Pump)",
    preferredHospital: "Medanta — The Medicity",
    preferredCity: "Delhi NCR",
    caseManager: "Rohan Varma",
    stage: "doctor_review",
    quoteAmountInr: 360000,
    source: "Google Ads",
    campaignId: "GA-UAE-CARDIAC-01",
    adGroup: "Heart Bypass Surgery Cost India",
    inquiryDate: "2026-08-29",
    lastActivity: "12 mins ago",
    notesCount: 4,
    priority: "high",
    activityHistory: [
      {
        date: "2026-08-29 10:15",
        action: "Inquiry Received via WhatsApp",
        user: "System",
        details: "Angiography CD and echo reports uploaded by patient.",
      },
      {
        date: "2026-08-29 14:30",
        action: "Case Assigned to Rohan Varma",
        user: "Rohan Varma",
        details: "Sent to Dr. Naresh Trehan's surgical team for evaluation.",
      },
      {
        date: "2026-08-30 11:00",
        action: "Surgical Opinion Handover",
        user: "Dr. Naresh Trehan Team",
        details: "Patient is suitable for off-pump keyhole CABG. 3 vessel disease.",
      },
    ],
  },
  {
    id: "CASE-8841",
    patientName: "Emmanuel Okafor",
    country: "Nigeria",
    countryCode: "+234",
    phone: "+234 803 555 7890",
    procedure: "Living Donor Liver Transplant",
    preferredHospital: "Medanta — The Medicity",
    preferredCity: "Delhi NCR",
    caseManager: "Priya Sharma",
    stage: "visa_travel",
    quoteAmountInr: 2650000,
    source: "Direct WhatsApp",
    campaignId: "WA-NGA-TRANSPLANT-02",
    adGroup: "Liver Transplant Hospitals India",
    inquiryDate: "2026-08-26",
    lastActivity: "2 hours ago",
    notesCount: 8,
    priority: "high",
    activityHistory: [
      {
        date: "2026-08-26 09:00",
        action: "Inquiry Created",
        user: "Priya Sharma",
        details: "Donor and recipient initial LFT & viral markers verified.",
      },
      {
        date: "2026-08-28 16:20",
        action: "Visa Letter Issued",
        user: "Medanta International Desk",
        details: "Official embassy MED visa invitation letter sent to Abuja Embassy.",
      },
    ],
  },
  {
    id: "CASE-8839",
    patientName: "Margaret Jenkins",
    country: "United Kingdom",
    countryCode: "+44",
    phone: "+44 7911 123456",
    procedure: "Computer-Navigated Total Knee Replacement",
    preferredHospital: "Max Super Speciality Hospital, Saket",
    preferredCity: "Delhi NCR",
    caseManager: "Amit Saxena",
    stage: "in_hospital",
    quoteAmountInr: 240000,
    source: "Organic Search",
    campaignId: "SEO-UK-KNEE-REPLACE",
    adGroup: "Private Knee Surgery Abroad",
    inquiryDate: "2026-08-20",
    lastActivity: "4 hours ago",
    notesCount: 11,
    priority: "medium",
    activityHistory: [
      {
        date: "2026-08-29 08:30",
        action: "Hospital Admission Completed",
        user: "Max Saket Desk",
        details: "Admitted to Deluxe Room 412. Pre-op anaesthesia clearance done.",
      },
      {
        date: "2026-08-30 09:00",
        action: "Surgery Successful",
        user: "Dr. S.K.S. Marya Team",
        details: "Bilateral robotic knee replacement completed without complication.",
      },
    ],
  },
  {
    id: "CASE-8835",
    patientName: "Gholamreza Hosseini",
    country: "Oman",
    countryCode: "+968",
    phone: "+968 9123 4567",
    procedure: "Coronary Artery Bypass Grafting (CABG)",
    preferredHospital: "Fortis Escorts Heart Institute",
    preferredCity: "Delhi NCR",
    caseManager: "Rohan Varma",
    stage: "post_op",
    quoteAmountInr: 320000,
    source: "Google Ads",
    campaignId: "GA-GCC-CARDIAC-03",
    adGroup: "Best Heart Hospitals Delhi",
    inquiryDate: "2026-08-10",
    lastActivity: "1 day ago",
    notesCount: 15,
    priority: "low",
    activityHistory: [
      {
        date: "2026-08-22",
        action: "Discharged to Hotel",
        user: "Fortis Escorts Care Team",
        details: "Stable recovery. Telehealth check scheduled at 4 weeks.",
      },
    ],
  },
];

export const MOCK_PRICING_REQUESTS: PricingChangeRequest[] = [
  {
    id: "PR-2026-042",
    hospitalName: "Medanta — The Medicity",
    procedureName: "Bypass Surgery (CABG / Off-Pump)",
    currentMinInr: 320000,
    currentMaxInr: 480000,
    proposedMinInr: 340000,
    proposedMaxInr: 495000,
    submittedBy: "Dr. Ankit (Medanta Tariff Desk)",
    submittedAt: "2026-08-29 14:00",
    reason: "Revision in imported oxygenator consumables tariff and upgraded Deluxe Room tariff.",
    status: "pending_review",
    version: 4,
    itemizedChanges: [
      "+ ₹20,000 baseline OT and consumable component",
      "+ ₹15,000 private deluxe accommodation tariff adjustment",
    ],
  },
  {
    id: "PR-2026-041",
    hospitalName: "Max Super Speciality Hospital, Saket",
    procedureName: "Comprehensive IVF / ICSI Cycle Package",
    currentMinInr: 135000,
    currentMaxInr: 225000,
    proposedMinInr: 140000,
    proposedMaxInr: 230000,
    submittedBy: "Kavita Nair (Max Corporate Relations)",
    submittedAt: "2026-08-28 11:30",
    reason: "Updated embryology culture media and laser-assisted hatching inclusion.",
    status: "pending_review",
    version: 3,
    itemizedChanges: [
      "Now includes Laser-Assisted Hatching (LAH) in standard package without add-on surcharge",
    ],
  },
];

export const MOCK_DISPUTES: DisputeTicket[] = [
  {
    id: "DISP-104",
    patientName: "Mohammed Al-Kaabi",
    hospitalName: "Indraprastha Apollo Hospitals",
    procedure: "Total Knee Replacement",
    bookingId: "BKG-7721",
    severity: "high",
    status: "hospital_escalation",
    issueType: "Billing Discrepancy",
    assignedManager: "Suresh Menon",
    openedAt: "2026-08-29 09:30",
    slaDeadline: "2026-08-31 17:00",
    slaHoursLeft: 18,
    description:
      "Hospital billing desk added an unplanned physiotherapy session charge of ₹18,500 that was documented as included in the pre-travel guaranteed package quote.",
  },
  {
    id: "DISP-103",
    patientName: "Sarah Jenkins",
    hospitalName: "Fortis Escorts Heart Institute",
    procedure: "TAVR Heart Valve",
    bookingId: "BKG-7690",
    severity: "critical",
    status: "under_clinical_review",
    issueType: "Clinical Complication",
    assignedManager: "Dr. Vikram Seth (Medical Director)",
    openedAt: "2026-08-28 14:00",
    slaDeadline: "2026-08-30 18:00",
    slaHoursLeft: 4,
    description:
      "Patient requested emergency clinical review after mild groin hematoma. Telemedicine second opinion scheduled with lead interventionalist.",
  },
];

export const MOCK_MODERATION: OutcomeModerationItem[] = [
  {
    id: "REV-901",
    bookingId: "BKG-7550",
    patientName: "Amina Yusuf",
    hospitalName: "Medanta — The Medicity",
    procedure: "Living Donor Liver Transplant",
    surveyStage: "12_weeks",
    npsScore: 10,
    rating: 5,
    submittedAt: "2026-08-29",
    status: "pending_verification",
    patientFeedback:
      "Dr. Soin and the transplant ICU staff saved my brother's life. The care coordination from airport arrival to post-discharge medication schedule was flawlessly organized.",
    bookingVerified: true,
  },
  {
    id: "REV-900",
    bookingId: "BKG-7489",
    patientName: "David O'Connor",
    hospitalName: "Max Super Speciality Hospital, Saket",
    procedure: "Total Knee Replacement",
    surveyStage: "4_weeks",
    npsScore: 9,
    rating: 5,
    submittedAt: "2026-08-28",
    status: "pending_verification",
    patientFeedback:
      "Walking completely pain-free within 3 weeks. Saved more than £12,000 compared to private treatment in the UK.",
    bookingVerified: true,
  },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "post_1",
    slug: "heart-bypass-surgery-cost-india-delhi-guide",
    title: "Heart Bypass Surgery (CABG) in India: Costs, Top Hospitals & Surgeon Guide (2026)",
    excerpt:
      "An itemized clinical and cost breakdown of Coronary Artery Bypass Surgery in top JCI/NABH hospitals in Delhi NCR compared to US, UK, and GCC pricing.",
    content: `
## Why International Patients Choose India for Heart Bypass Surgery

Coronary Artery Bypass Grafting (CABG) in accredited Indian medical centres provides clinical success rates matching top US/European benchmarks (>98.5%) at approximately 15% to 20% of Western costs.

### Itemized Package Costs (Delhi NCR Top Hospitals)
- **Standard On-Pump CABG**: ₹2,75,000 – ₹4,20,000 ($3,300 – $5,000 USD)
- **Minimally Invasive Off-Pump (Beating Heart) CABG**: ₹3,20,000 – ₹4,80,000 ($3,850 – $5,750 USD)
- **Robotic-Assisted Bypass (da Vinci)**: ₹4,50,000 – ₹6,20,000 ($5,400 – $7,450 USD)

### What Is Included in Hospital Packages
- 3 days Cardiac Surgical ICU monitoring
- 4 to 5 days Deluxe private room recovery
- Senior cardiothoracic surgical and perfusion team fees
- Initial in-hospital cardiac rehabilitation and physiotherapy

### Verified Clinical Review Note
*All cardiac surgery packages must include pre-anaesthetic coronary CT/angiography review and 4-week post-op telemedicine continuity.*
    `,
    targetKeyword: "heart bypass surgery cost india",
    category: "Cardiac Surgery",
    author: "Elena Rostova (Medical Research Editor)",
    medicalReviewer: "Dr. Naresh Trehan",
    reviewerDesignation: "Chairman & Chief Cardiac Surgeon",
    reviewerHospital: "Medanta — The Medicity",
    reviewerDate: "2026-08-20",
    seoScore: 94,
    status: "published",
    relatedProcedures: ["proc_cardiac_bypass"],
    faqs: [
      {
        question: "How long do I need to stay in India after heart bypass surgery?",
        answer: "Patients typically stay in the hospital for 7 to 8 days, followed by 5 to 7 days in a nearby hotel for outpatient suture checks and fit-to-fly airline medical clearance.",
      },
      {
        question: "Can I get an official Medical Visa (MED) letter from the hospital?",
        answer: "Yes, once your angiography reports are reviewed by our chief cardiac surgeon, an official embassy invitation letter is generated within 24 hours.",
      },
    ],
    lastUpdated: "2026-08-25",
  },
  {
    id: "post_2",
    slug: "knee-replacement-surgery-cost-india-recovery",
    title: "Robotic Total Knee Replacement in India: Hospital Packages, Recovery & Surgeon Expertise",
    excerpt:
      "Complete guide to computer-navigated and robotic knee arthroplasty in Delhi NCR: implant options, rehab timelines, and itemized inclusions.",
    content: `
## Next-Generation Robotic Knee Surgery in India

Robotic-assisted Total Knee Arthroplasty (TKA) allows sub-millimeter bone preparation, preserving collateral ligaments and ensuring exact implant alignment.

### Average Costs
- **Single Knee Replacement**: ₹1,95,000 – ₹3,40,000 ($2,350 – $4,100 USD)
- **Bilateral Simultaneous (Both Knees)**: ₹3,60,000 – ₹5,80,000 ($4,350 – $6,950 USD)
    `,
    targetKeyword: "knee replacement surgery cost india",
    category: "Orthopaedics",
    author: "Elena Rostova",
    medicalReviewer: "Dr. (Prof.) S. K. S. Marya",
    reviewerDesignation: "Group Chairman, Orthopaedics",
    reviewerHospital: "Max Super Speciality Hospital, Saket",
    reviewerDate: "2026-08-22",
    seoScore: 92,
    status: "published",
    relatedProcedures: ["proc_ortho_knee"],
    faqs: [
      {
        question: "Which implants are used in Indian accredited hospitals?",
        answer: "Hospitals use US-FDA certified implants from Zimmer Biomet, Stryker, and Smith & Nephew.",
      },
    ],
    lastUpdated: "2026-08-28",
  },
];

export const MOCK_AD_CAMPAIGNS: AdCampaign[] = [
  {
    id: "GA-UAE-CARDIAC-01",
    channel: "Google Ads",
    campaignName: "GCC — Cardiac Surgery & Bypass",
    targetKeyword: "heart bypass surgery cost india",
    targetRegion: "UAE, Saudi Arabia, Oman, Qatar",
    spendInr: 120000,
    impressions: 48000,
    clicks: 2150,
    leadsGenerated: 78,
    costPerLeadInr: 1538,
    confirmedBookings: 11,
    costPerBookingInr: 10909,
    pipelineRevenueInr: 4180000,
    roiMultiplier: 34.8,
  },
  {
    id: "GA-NGA-TRANSPLANT-02",
    channel: "Google Ads",
    campaignName: "Africa — Liver & Kidney Transplant",
    targetKeyword: "liver transplant hospital india",
    targetRegion: "Nigeria, Kenya, Tanzania, Ghana",
    spendInr: 95000,
    impressions: 34000,
    clicks: 1420,
    leadsGenerated: 42,
    costPerLeadInr: 2261,
    confirmedBookings: 6,
    costPerBookingInr: 15833,
    pipelineRevenueInr: 15900000,
    roiMultiplier: 167.3,
  },
  {
    id: "META-UK-ORTHO-01",
    channel: "Meta Ads",
    campaignName: "UK / Europe — Private Joint Replacement",
    targetKeyword: "private knee surgery cost",
    targetRegion: "United Kingdom, Ireland",
    spendInr: 65000,
    impressions: 62000,
    clicks: 1890,
    leadsGenerated: 34,
    costPerLeadInr: 1911,
    confirmedBookings: 5,
    costPerBookingInr: 13000,
    pipelineRevenueInr: 1350000,
    roiMultiplier: 20.7,
  },
  {
    id: "WA-DIRECT-GCC",
    channel: "Direct WhatsApp Ads",
    campaignName: "Direct Click-to-WhatsApp Medical Desk",
    targetKeyword: "whatsapp medical opinion india",
    targetRegion: "Middle East & South Asia",
    spendInr: 40000,
    impressions: 29000,
    clicks: 1100,
    leadsGenerated: 58,
    costPerLeadInr: 689,
    confirmedBookings: 7,
    costPerBookingInr: 5714,
    pipelineRevenueInr: 2850000,
    roiMultiplier: 71.2,
  },
];

export const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: "USR-01",
    name: "Dr. Vikram Seth",
    email: "vikram.seth@healthremade.com",
    role: "super_admin",
    assignedDepartment: "Executive & Clinical Governance",
    status: "active",
    lastActive: "Now",
  },
  {
    id: "USR-02",
    name: "Rohan Varma",
    email: "rohan.varma@healthremade.com",
    role: "case_manager",
    assignedDepartment: "GCC & Middle East Patient Desk",
    status: "active",
    lastActive: "10 mins ago",
  },
  {
    id: "USR-03",
    name: "Priya Sharma",
    email: "priya.sharma@healthremade.com",
    role: "case_manager",
    assignedDepartment: "Africa & CIS Organ Transplant Desk",
    status: "active",
    lastActive: "25 mins ago",
  },
  {
    id: "USR-04",
    name: "Dr. Ankit Trehan",
    email: "ankit@medanta.org",
    role: "hospital_partner",
    assignedDepartment: "Medanta International Coordinator",
    status: "active",
    lastActive: "3 hours ago",
  },
  {
    id: "USR-05",
    name: "Elena Rostova",
    email: "elena@healthremade.com",
    role: "content_editor",
    assignedDepartment: "Medical SEO & Content Review",
    status: "active",
    lastActive: "1 hour ago",
  },
];
