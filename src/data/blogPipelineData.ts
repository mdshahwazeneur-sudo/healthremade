export type BlogPipelineStatus = 'queued' | 'drafted' | 'pending_review' | 'approved' | 'published'

export type TopicPriority = 'top_of_funnel_educational' | 'bottom_of_funnel_cost_comparison'

export interface FaqItem {
  question: string
  answer: string
}

export interface MedicalReviewer {
  doctorId: string
  name: string
  designation: string
  qualifications: string[]
  hospitalName: string
  photoUrl?: string
}

export interface BlogTopic {
  id: string
  targetKeyword: string
  workingTitle: string
  category: string
  relatedProcedureTags: string[]
  priority: TopicPriority
  status: BlogPipelineStatus
  createdAt: string
  updatedAt: string
}

export interface SeoBlogPost {
  id: string
  topicId: string
  title: string
  targetKeyword: string
  category: string
  priority: TopicPriority
  relatedProcedureTags: string[]
  bodyContent: string // Markdown / rich text containing headers & potential [NEEDS SOURCE] flags
  metaTitle: string
  metaDescription: string
  faqItems: FaqItem[]
  author: string
  medicalReviewer: MedicalReviewer | null
  lastReviewedDate: string | null
  slug: string
  status: BlogPipelineStatus
  generatedAt: string
  approvedAt: string | null
  publishedAt: string | null
  needsSourceCount: number
  isNeedsSourceResolved: boolean
  auditLog: Array<{
    action: string
    user: string
    timestamp: string
    note?: string
  }>
  indexingStatus: 'pending' | 'submitted' | 'indexed'
  indexingLog: string | null
  viewCount: number
}

export const INITIAL_BLOG_TOPICS: BlogTopic[] = [
  {
    id: 'topic_cabg_cost',
    targetKeyword: 'heart bypass surgery cost in india',
    workingTitle: 'Heart Bypass Surgery (CABG) Cost in India: Hospital Comparison Guide',
    category: 'Cardiac Surgery',
    relatedProcedureTags: ['CABG', 'Heart Bypass', 'Cardiac Surgery'],
    priority: 'bottom_of_funnel_cost_comparison',
    status: 'published',
    createdAt: '2026-08-20T08:00:00.000Z',
    updatedAt: '2026-08-22T10:00:00.000Z',
  },
  {
    id: 'topic_knee_recovery',
    targetKeyword: 'knee replacement surgery recovery timeline india',
    workingTitle: 'Total Knee Replacement Surgery: Day-by-Day Recovery Timeline & Hospital Packages',
    category: 'Orthopaedics',
    relatedProcedureTags: ['Total Knee Replacement', 'Robotic Knee Replacement'],
    priority: 'top_of_funnel_educational',
    status: 'pending_review',
    createdAt: '2026-08-29T11:00:00.000Z',
    updatedAt: '2026-08-29T11:05:00.000Z',
  },
  {
    id: 'topic_liver_transplant_donor',
    targetKeyword: 'living donor liver transplant success rate criteria',
    workingTitle: 'Living Donor Liver Transplant in India: Donor Eligibility, Success Rates & ICU Stay',
    category: 'Organ Transplant',
    relatedProcedureTags: ['Liver Transplant', 'Living Donor'],
    priority: 'top_of_funnel_educational',
    status: 'pending_review',
    createdAt: '2026-08-30T14:30:00.000Z',
    updatedAt: '2026-08-30T14:32:00.000Z',
  },
  {
    id: 'topic_old_ivf_refresh',
    targetKeyword: 'ivf cost in india for international couples',
    workingTitle: 'Complete Guide to IVF & ICSI Fertility Treatment in India: Success Rates & Tariffs',
    category: 'Fertility & IVF',
    relatedProcedureTags: ['IVF', 'ICSI', 'Fertility'],
    priority: 'bottom_of_funnel_cost_comparison',
    status: 'published',
    createdAt: '2025-11-10T09:00:00.000Z',
    updatedAt: '2025-11-12T10:00:00.000Z',
  },
]

export const INITIAL_SEO_BLOG_POSTS: SeoBlogPost[] = [
  {
    id: 'post_cabg_cost',
    topicId: 'topic_cabg_cost',
    title: 'Heart Bypass Surgery (CABG) Cost in India: Delhi NCR Hospital Comparison Guide',
    targetKeyword: 'heart bypass surgery cost in india',
    category: 'Cardiac Surgery',
    priority: 'bottom_of_funnel_cost_comparison',
    relatedProcedureTags: ['CABG', 'Heart Bypass', 'Cardiac Surgery'],
    bodyContent: `## Overview of Coronary Artery Bypass Graft (CABG) in India

Coronary Artery Bypass Graft (CABG) is one of the most frequently performed cardiac surgeries for patients with severe multi-vessel coronary artery disease. In India, top JCI and NABH accredited hospitals perform thousands of bypass surgeries each year with a clinical success rate exceeding 98.5%.

For international patients traveling from the UK, USA, Middle East, and Africa, cardiac care in India provides world-class clinical expertise at **70% to 80% lower cost** than Western private healthcare facilities.

---

## Indicative CABG Package Breakdown in Delhi NCR

| Service Component | Standard Private Hospital (India) | Average Private Clinic (UK/US) |
| :--- | :--- | :--- |
| **Surgeon & Anaesthetist Fee** | Included in package ($1,500 - $2,200) | $18,000 - $30,000 |
| **Cardiac ICU (3-4 Days)** | Included in package | $12,000 - $25,000 |
| **Hospital Stay (6-8 Days)** | Included in package (Private Room) | $15,000 - $35,000 |
| **Pre-Op Diagnostic Workup** | $350 - $600 | $3,500 - $6,000 |
| **Total Estimated Cost** | **$4,200 – $6,800 USD** | **$55,000 – $120,000 USD** |

---

## Key Clinical Factors Influencing Bypass Surgery Cost

1. **Number of Grafts Needed**: Single, double, triple, or quadruple bypass grafting.
2. **Surgical Technique**: Traditional on-pump surgery vs. Beating Heart (Off-Pump) CABG or Minimally Invasive Direct CABG (MIDCAB).
3. **Pre-existing Comorbidities**: Diabetes, renal dysfunction, or prior stenting require additional intensive ICU monitoring.
4. **Implant & Consumables Quality**: Use of FDA-approved arterial grafts (Internal Mammary Artery) ensuring superior 10-year patency rates.

---

## Why Patients Choose Accredited Hospitals in Delhi NCR

Top institutes such as Medanta — The Medicity, Fortis Escorts Heart Institute, and Max Super Speciality Hospital feature dedicated international patient lounges, English and Arabic interpreters, fast-track medical visa letters, and direct hospital billing with zero intermediary broker markups.`,
    metaTitle: 'Heart Bypass Surgery Cost in India | CABG Packages & Hospital Guide',
    metaDescription: 'Detailed breakdown of heart bypass surgery (CABG) cost in India. Compare hospital tariffs ($4,200 - $6,800), ICU days, surgeon credentials, and recovery timelines.',
    faqItems: [
      {
        question: 'How much does heart bypass surgery cost in India on average?',
        answer: 'The average cost of CABG in top accredited hospitals in India ranges between $4,200 and $6,800 USD, including surgeon fees, 3-4 days in cardiac ICU, 4-5 days in a private room, and standard diagnostics.',
      },
      {
        question: 'What is the recovery time after CABG surgery before flying home?',
        answer: 'Most international patients stay in the hospital for 7-8 days and remain in local hotel accommodation for an additional 7-10 days for post-op checkups before receiving a Fit-to-Fly certificate.',
      },
      {
        question: 'Are cardiac surgeons in India internationally accredited?',
        answer: 'Yes, department directors and chief cardiac surgeons in top Indian hospitals are commonly trained in the UK, USA, or Australia with FRCS or FACS certifications.',
      },
    ],
    author: 'healthremade Clinical Editorial Team',
    medicalReviewer: {
      doctorId: 'doc_naresh_trehan',
      name: 'Dr. Naresh Trehan',
      designation: 'Chairman & Managing Director, Chief Cardiac Surgeon',
      qualifications: ['MBBS', 'MD', 'Diplomate American Board of Surgery', 'Diplomate American Board of Cardiothoracic Surgery'],
      hospitalName: 'Medanta — The Medicity',
    },
    lastReviewedDate: '2026-08-22',
    slug: 'heart-bypass-surgery-cost-india-delhi-guide',
    status: 'published',
    generatedAt: '2026-08-20T08:05:00.000Z',
    approvedAt: '2026-08-22T10:00:00.000Z',
    publishedAt: '2026-08-22T10:00:00.000Z',
    needsSourceCount: 0,
    isNeedsSourceResolved: true,
    auditLog: [
      { action: 'AI Generated Draft', user: 'Claude Sonnet Engine', timestamp: '2026-08-20T08:05:00.000Z' },
      { action: 'Medical Review Assigned', user: 'Admin Editor', timestamp: '2026-08-21T11:00:00.000Z', note: 'Assigned to Dr. Naresh Trehan for tariff verification.' },
      { action: 'Approved & Published', user: 'Dr. Naresh Trehan', timestamp: '2026-08-22T10:00:00.000Z', note: 'All cost figures verified against current Medanta & Fortis tariffs.' },
    ],
    indexingStatus: 'indexed',
    indexingLog: 'Google Search Console notified. Indexed on 2026-08-23.',
    viewCount: 2840,
  },
  {
    id: 'post_knee_recovery',
    topicId: 'topic_knee_recovery',
    title: 'Total Knee Replacement Surgery: Day-by-Day Recovery Timeline & Rehabilitation Guide',
    targetKeyword: 'knee replacement surgery recovery timeline india',
    category: 'Orthopaedics',
    priority: 'top_of_funnel_educational',
    relatedProcedureTags: ['Total Knee Replacement', 'Robotic Knee Replacement'],
    bodyContent: `## Understanding Knee Replacement Recovery Stages

Total Knee Replacement (TKR) is a highly reliable surgical procedure to eliminate chronic joint pain and restore mobility. Modern robotic-assisted techniques allow for sub-millimeter precision, reduced soft tissue trauma, and significantly faster rehabilitation.

[NEEDS SOURCE] A recent clinical cohort study reported that 94.8% of robotic knee replacement patients in India achieve independent unassisted walking by day 14 post-surgery.

---

## Day-by-Day Recovery Milestones

### Days 1–3: Hospital Stay & Initial Mobilization
- **Day 1**: Surgery completed under regional spinal anaesthesia. Continuous passive motion exercises and bedside standing with a walker under physiotherapist guidance within 12-24 hours.
- **Day 2**: Walking short hospital corridor distances and practicing gentle knee flexion (target: 70–80 degrees).
- **Day 3**: Stair climbing simulation, dressing inspection, and discharge preparation.

### Weeks 2–4: At-Home / Guest House Rehabilitation
- Active quadriceps strengthening and gait training without knee brace.
- Suture/staple removal on Day 14.
- [NEEDS SOURCE] Over 88% of patients discontinue prescription opioid pain relievers within 10 days of robotic joint replacement.

### Weeks 6–12: Return to Normal Daily Activities
- Driving, light swimming, and stationary cycling resumed.
- Knee flexion reaching 115–125 degrees with minimal discomfort.`,
    metaTitle: 'Knee Replacement Recovery Timeline: Day-by-Day Guide | healthremade',
    metaDescription: 'Complete day-by-day recovery timeline for total knee replacement surgery in India. Learn about hospital stay, physiotherapy milestones, and fit-to-fly timeline.',
    faqItems: [
      {
        question: 'How soon can I walk after knee replacement surgery?',
        answer: 'With modern minimally invasive and robotic techniques, patients are guided to stand and take initial steps with a walker within 12 to 24 hours after surgery.',
      },
      {
        question: 'When can international patients fly back home after knee surgery?',
        answer: 'Most surgeons recommend staying in India for 12 to 14 days post-surgery to complete initial physiotherapy, remove staples, and receive deep vein thrombosis (DVT) travel clearance.',
      },
    ],
    author: 'healthremade Clinical Editorial Team',
    medicalReviewer: null, // Intentionally unassigned to test Step 3 & 4 review blocking!
    lastReviewedDate: null,
    slug: 'knee-replacement-surgery-recovery-timeline-india',
    status: 'pending_review',
    generatedAt: '2026-08-29T11:05:00.000Z',
    approvedAt: null,
    publishedAt: null,
    needsSourceCount: 2, // 2 [NEEDS SOURCE] flags present
    isNeedsSourceResolved: false,
    auditLog: [
      { action: 'AI Generated Draft', user: 'Claude Sonnet Engine', timestamp: '2026-08-29T11:05:00.000Z', note: '2 [NEEDS SOURCE] flags inserted for unverified percentage statistics.' },
    ],
    indexingStatus: 'pending',
    indexingLog: null,
    viewCount: 0,
  },
  {
    id: 'post_old_ivf_refresh',
    topicId: 'topic_old_ivf_refresh',
    title: 'Complete Guide to IVF & ICSI Fertility Treatment in India: Success Rates & Tariffs',
    targetKeyword: 'ivf cost in india for international couples',
    category: 'Fertility & IVF',
    priority: 'bottom_of_funnel_cost_comparison',
    relatedProcedureTags: ['IVF', 'ICSI', 'Fertility'],
    bodyContent: `## Overview of IVF and Assisted Reproductive Technology in India

In-Vitro Fertilization (IVF) in India attracts couples from across the globe due to advanced embryology laboratories, high cumulative clinical success rates, and affordable packages starting from $2,500 to $4,200 per cycle including ICSI and embryo freezing.

---

## What is Included in Standard IVF Packages

- Specialist reproductive endocrinologist consultations & ultrasound follicle scans.
- Ovum pickup (egg retrieval) under mild sedation in sterile IVF operating theatre.
- Intracytoplasmic Sperm Injection (ICSI) laboratory procedure.
- Blastocyst culture (Day 5 embryo development) and laser-assisted hatching.
- Fresh or frozen embryo transfer.`,
    metaTitle: 'IVF Cost in India: Success Rates & Package Guide | healthremade',
    metaDescription: 'Complete breakdown of IVF and ICSI treatment cost in India for international couples. Transparent tariffs from $2,500, top fertility doctors, and visa help.',
    faqItems: [
      {
        question: 'How much does an IVF cycle cost in India?',
        answer: 'A standard IVF / ICSI cycle typically costs between $2,500 and $4,200 USD, compared to $15,000 - $25,000 in the USA or UK.',
      },
    ],
    author: 'healthremade Clinical Editorial Team',
    medicalReviewer: {
      doctorId: 'doc_ashok_seth',
      name: 'Dr. Ashok Seth',
      designation: 'Senior Medical Director',
      qualifications: ['MBBS', 'MD', 'FRCP (London)', 'FRCP (Edinburgh)'],
      hospitalName: 'Fortis Escorts Heart Institute',
    },
    lastReviewedDate: '2025-11-12', // > 180 days ago! Will trigger Step 6 "Needs Refresh" alert!
    slug: 'complete-guide-ivf-icsi-fertility-treatment-india-cost',
    status: 'published',
    generatedAt: '2025-11-10T09:05:00.000Z',
    approvedAt: '2025-11-12T10:00:00.000Z',
    publishedAt: '2025-11-12T10:00:00.000Z',
    needsSourceCount: 0,
    isNeedsSourceResolved: true,
    auditLog: [
      { action: 'AI Generated Draft', user: 'Claude Sonnet Engine', timestamp: '2025-11-10T09:05:00.000Z' },
      { action: 'Approved & Published', user: 'Dr. Ashok Seth', timestamp: '2025-11-12T10:00:00.000Z' },
    ],
    indexingStatus: 'indexed',
    indexingLog: 'Google Search Console notified.',
    viewCount: 1920,
  },
]
