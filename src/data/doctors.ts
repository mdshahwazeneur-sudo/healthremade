/**
 * Top Doctors & Senior Specialists — Official Verified Hospital Medical Leadership.
 */

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  designation: string;
  department: string;
  specialtySlug: string;
  hospitalName: string;
  hospitalSlug: string;
  city: string;
  cityLabel: string;
  experienceYears: number;
  surgeriesCount: string;
  qualifications: string[];
  awards: string[];
  languages: string[];
  photoUrl: string;
  bio: string;
  keyExpertise: string[];
  videoTitle: string;
  videoYoutubeId: string;
  videoDuration: string;
  videoDescription: string;
}

export const DOCTORS: Doctor[] = [
  {
    id: "doc_himanshu_gupta",
    slug: "dr-himanshu-gupta",
    name: "Dr. Himanshu Gupta",
    designation: "Senior Consultant — Plastic & Onco Reconstructive Surgery",
    department: "Plastic & Onco Reconstructive Surgery",
    specialtySlug: "oncology",
    hospitalName: "BLK-Max Super Speciality Hospital",
    hospitalSlug: "blk-max-super-speciality-hospital",
    city: "delhi",
    cityLabel: "New Delhi (Pusa Road)",
    experienceYears: 14,
    surgeriesCount: "3,500+",
    qualifications: [
      "MBBS — Motilal Nehru Medical College, Prayagraj (2012)",
      "MS (General Surgery) — Government Medical College & Hospital, Chandigarh (2017)",
      "MCh (Plastic & Reconstructive Surgery) — Tata Memorial Hospital, Mumbai (2021)",
      "Fellow (Cosmetic Surgery) — University Hospital Moncloa, Madrid, Spain (2022)",
      "Observer (Lymphatic Microsurgery) — ICLAS, Rapallo, Italy (2022)",
    ],
    awards: [
      "Former Assistant Professor — Tata Memorial Hospital, Mumbai",
      "Member — Association of Plastic Surgeons of India",
      "Member — Indian Society for Reconstructive Microsurgery",
      "Member — Breast Reconstructive and Aesthetic Surgeon's Association",
    ],
    languages: ["English", "Hindi"],
    photoUrl: "/images/doctors/dr-himanshu-gupta.jpg",
    bio: "Dr. Himanshu Gupta is a highly skilled plastic and reconstructive surgeon with advanced expertise in cancer-related reconstruction. Driven by a patient-centred approach, Dr. Himanshu integrates innovation, precision, and empathy to deliver personalised treatment and care. His focus areas include breast reconstruction, head and neck restoration, and post-oncologic bone and soft tissue reconstruction.",
    keyExpertise: [
      "Head & Neck Cancer Reconstruction",
      "Immediate & Delayed Breast Reconstruction",
      "Bone & Soft Tissue Cancer Reconstruction / Limb Salvage Surgery",
      "Pre-emptive & Corrective Lymphedema Surgery",
      "Aesthetic Correction After Head & Neck Cancer Surgery",
      "Breast Symmetrising Surgery",
    ],
    videoTitle: "Dr. Himanshu Gupta on Advanced Onco-Reconstructive & Lymphedema Surgery",
    videoYoutubeId: "dQw4w9WgXcQ",
    videoDuration: "4:20 min",
    videoDescription: "Dr. Himanshu Gupta explains how microvascular free tissue transfer and lymphatic surgery restore function and aesthetics following oncologic resections.",
  },
  {
    id: "doc_shruti_bhatia",
    slug: "dr-shruti-bhatia",
    name: "Dr. Shruti Bhatia",
    designation: "Director — Gynaecological Surgical Oncology",
    department: "Gynaecological Surgical Oncology",
    specialtySlug: "oncology",
    hospitalName: "BLK-Max Super Speciality Hospital",
    hospitalSlug: "blk-max-super-speciality-hospital",
    city: "delhi",
    cityLabel: "New Delhi (Pusa Road)",
    experienceYears: 25,
    surgeriesCount: "8,000+",
    qualifications: [
      "MBBS — Maulana Azad Medical College, University of Delhi (1996)",
      "MD (Obstetrics & Gynaecology) — Kasturba Hospital, University of Delhi (2000)",
      "DNB (Obstetrics & Gynaecology) — National Board of Examination, New Delhi (2001)",
      "MNAMS — National Board of Examination (2002)",
      "Training (Gynae Oncology) — Aichi Cancer Center, Japan (2005)",
      "Training (Gynae Oncology) — Tata Memorial Hospital, Mumbai (2008)",
    ],
    awards: [
      "Recognised Teacher by NBEMS for DrNB in Gynaecological Oncology",
      "Member — International Gynecologic Cancer Society",
      "Oncology Sub-committee — Association of Obstetricians & Gynaecologists of Delhi (AOGD)",
      "Member — Indian Society of Colposcopy & Cervical Pathology",
      "Member — Asia-Oceania Research Organisation in Genital Infection and Neoplasia",
    ],
    languages: ["English", "Hindi"],
    photoUrl: "/images/doctors/dr-shruti-bhatia.jpg",
    bio: "Dr. Shruti Bhatia is a compassionate and highly skilled Gynaecological Oncologist with over 25 years of clinical experience. With a focus on personalised treatment plans and the latest surgical advancements, she specializes in managing cancers of the cervix, uterus, ovaries, vulva, and vagina using both radical open and minimally invasive robotic techniques.",
    keyExpertise: [
      "Radical Surgeries for Cervical, Ovarian, Uterine, Vulvar & Vaginal Cancers",
      "Robotic & Laparoscopic Gynaecological Oncological Surgeries",
      "Colposcopy, Conization & Cervical Cancer Prevention",
      "Fertility-Sparing Surgical Approaches in Young Gynae-Oncology Patients",
      "Hysteroscopic Diagnostic & Operative Procedures",
    ],
    videoTitle: "Dr. Shruti Bhatia on Robotic Gynaecological Oncology & Preventive Care",
    videoYoutubeId: "dQw4w9WgXcQ",
    videoDuration: "5:05 min",
    videoDescription: "Dr. Bhatia discusses robotic surgery advantages, early screening protocols for cervical and ovarian cancers, and personalized fertility preservation.",
  },
  {
    id: "doc_rajesh_kumar_jain",
    slug: "dr-rajesh-kumar-jain",
    name: "Dr. Rajesh Kumar Jain",
    designation: "Principal Director — Surgical Oncology",
    department: "Surgical Oncology",
    specialtySlug: "oncology",
    hospitalName: "BLK-Max Super Speciality Hospital",
    hospitalSlug: "blk-max-super-speciality-hospital",
    city: "delhi",
    cityLabel: "New Delhi (Pusa Road)",
    experienceYears: 26,
    surgeriesCount: "14,000+",
    qualifications: [
      "MBBS — Silchar Medical College, Assam, Gauhati University (1993)",
      "MS (General Surgery) — Silchar Medical College, Assam University (1999)",
      "DNB (Surgical Oncology) — National Board of Examination, New Delhi (2009)",
      "Former Registrar — Indraprastha Apollo Hospital, New Delhi (1999)",
      "Former Consultant — Rajiv Gandhi Cancer Institute, New Delhi",
    ],
    awards: [
      "Founding Head of Surgical Oncology — Action Cancer Hospital & BLK Super Speciality",
      "Life Member — Indian Society of Oncology",
      "Distinguished Leadership in Surgical Oncology Award",
    ],
    languages: ["English", "Hindi", "Assamese", "Bengali"],
    photoUrl: "/images/doctors/dr-rajesh-kumar-jain.jpg",
    bio: "Dr. Rajesh Kumar Jain is a distinguished surgical oncologist with over 26 years of experience. He is renowned for his pioneering surgical techniques and unwavering commitment to delivering the highest standard of care across head and neck, breast, thoracic, gastrointestinal, gynecological, and urological oncology. He played an instrumental role in establishing modern surgical oncology departments in Delhi.",
    keyExpertise: [
      "Robotic Cancer Surgeries (da Vinci)",
      "Head & Neck Cancer Surgeries & Resections",
      "Breast Cancer Surgeries & Oncoplastic Conservation",
      "Gynecological Cancer Surgeries",
      "Thoracic & Gastrointestinal (GI) Cancer Surgeries",
      "Uro-Cancer Radical Resections",
    ],
    videoTitle: "Dr. Rajesh Kumar Jain on Multi-Disciplinary Robotic Cancer Surgery",
    videoYoutubeId: "dQw4w9WgXcQ",
    videoDuration: "4:40 min",
    videoDescription: "Dr. Jain shares his clinical approach to complex multi-organ cancer resections, robotic precision, and post-operative quality of life.",
  },
  {
    id: "doc_pranjal_kulshreshtha",
    slug: "dr-pranjal-kulshreshtha",
    name: "Dr. Pranjal Kulshreshtha",
    designation: "Director — Breast Oncological Surgery",
    department: "Breast Oncological Surgery",
    specialtySlug: "oncology",
    hospitalName: "BLK-Max Super Speciality Hospital",
    hospitalSlug: "blk-max-super-speciality-hospital",
    city: "delhi",
    cityLabel: "New Delhi (Pusa Road)",
    experienceYears: 15,
    surgeriesCount: "5,000+",
    qualifications: [
      "MBBS — University College of Medical Sciences (UCMS), Delhi (2003)",
      "MS (General Surgery) — VMMC & Safdarjung Hospital, New Delhi (2007)",
      "MRCS — Royal College of Surgeons of Glasgow (UK) (2009)",
      "DNB (Surgical Oncology) — Army Hospital (Research & Referral), Delhi (2012)",
    ],
    awards: [
      "Founding Member — Young Oncology Group",
      "Member — Indian Association of Surgical Oncologists (IASO)",
      "Member — Association of Surgeons of India (ASI)",
      "Member — Indian Medical Association (DNZ)",
    ],
    languages: ["English", "Hindi"],
    photoUrl: "/images/doctors/dr-pranjal-kulshreshtha.jpg",
    bio: "Dr. Pranjal Kulshreshtha is a highly dedicated and experienced breast oncological surgeon with over 15 years of expertise. Specialising in the comprehensive diagnosis, treatment, and management of breast cancer, he has successfully treated patients at every stage of the disease with a focus on breast conservation, oncoplastic techniques, and genetic risk counselling.",
    keyExpertise: [
      "Breast Cancer Surgery (Early & Advanced Stages)",
      "Breast Conserving Surgery & Oncoplastic Techniques",
      "Sentinel Lymph Node Biopsy (SLNB) & Axillary Clearance",
      "Benign Breast Diseases & Breast Pain Management",
      "Hereditary Breast Cancer & BRCA Genetic Risk Assessment",
      "Breast Cancer Screening & Stereotactic Core Biopsies",
    ],
    videoTitle: "Dr. Pranjal Kulshreshtha on Breast Conservation & Oncoplastic Techniques",
    videoYoutubeId: "dQw4w9WgXcQ",
    videoDuration: "4:30 min",
    videoDescription: "Dr. Kulshreshtha explains how oncoplastic techniques achieve complete cancer clearance while preserving natural breast aesthetics.",
  },
  {
    id: "doc_praveer_aggarwal",
    slug: "dr-praveer-aggarwal",
    name: "Dr. Praveer Aggarwal",
    designation: "Executive Director — Interventional Cardiology",
    department: "Interventional Cardiology",
    specialtySlug: "cardiac",
    hospitalName: "Fortis Escorts Heart Institute",
    hospitalSlug: "fortis-escorts-heart-institute",
    city: "delhi",
    cityLabel: "New Delhi (Okhla)",
    experienceYears: 28,
    surgeriesCount: "30,000+ Interventions",
    qualifications: [
      "MBBS — King George's Medical College, Lucknow",
      "MD (Medicine) — King George's Medical College, Lucknow",
      "DM (Cardiology) — L.P.S. Institute of Cardiology, Kanpur",
      "Intervention Fellowship — Royal Perth Hospital, Perth, Australia",
      "Intervention Fellowship — Hospital Charles Nicolle, University of Rouen, France",
    ],
    awards: [
      "28+ Years Interventional Cardiology Leadership at Fortis Escorts Heart Institute",
      "Published ~100 Articles, Reviews, and Abstracts in International Cardiology Journals",
      "Course Director: Basics and Beyond Interventional Cardiology Platform",
      "Distinguished Faculty in National & International Cardiovascular Summits",
    ],
    languages: ["English", "Hindi"],
    photoUrl: "/images/doctors/dr-praveer-aggarwal.jpg",
    bio: "Dr. Praveer Aggarwal, Executive Director at Fortis Escorts Heart Institute, New Delhi, is a nationally renowned cardiologist who has contributed extensively to the growth of interventional cardiology in India for over 28 years. Having trained at Royal Perth Hospital in Australia and with Prof. Alain Cribier in France, he performs approximately 2,500 angiographies and 1,200 interventions annually, specializing in complex coronary angioplasty, TAVR, and peripheral vascular interventions.",
    keyExpertise: [
      "Complex Angioplasty with Rotational Atherectomy (Rotablation), IVL, Laser, and Cutting Balloon",
      "Intravascular Imaging & Optimization (IVUS, OCT, FFR)",
      "Structural Heart Interventions: TAVR / TAVI & LAAA Closure",
      "Carotid, Renal, and Superficial Femoral Artery (SFA) Interventions",
      "Abdominal Aortic Aneurysm (AAA) Endograft Repair",
    ],
    videoTitle: "Dr. Praveer Aggarwal on Advanced Interventional Cardiology & TAVR",
    videoYoutubeId: "dQw4w9WgXcQ",
    videoDuration: "5:20 min",
    videoDescription: "Dr. Aggarwal explains advanced techniques for calcified coronary arteries using rotablation and intravascular lithotripsy (IVL), as well as non-surgical TAVR.",
  },
];

export function getDoctor(slug: string): Doctor | undefined {
  return DOCTORS.find((d) => d.slug === slug);
}

export function getDoctorsBySpecialty(specialty: string): Doctor[] {
  if (specialty === "all") return DOCTORS;
  return DOCTORS.filter((d) => d.specialtySlug === specialty);
}

export function getDoctorsByHospital(hospitalSlug: string): Doctor[] {
  return DOCTORS.filter((d) => d.hospitalSlug === hospitalSlug);
}
