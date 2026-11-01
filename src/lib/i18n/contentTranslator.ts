import type { Doctor } from '@/data/doctors'
import type { Hospital } from '@/data/hospitals'
import type { Procedure } from '@/data/procedures'
import type { SeoBlogPost } from '@/data/blogPipelineData'
import {
  DOCTOR_TRANSLATIONS,
  HOSPITAL_TRANSLATIONS,
  PROCEDURE_TRANSLATIONS,
} from '@/data/translations/contentTranslations'

/**
 * Returns a localized copy of a Doctor entity for the given locale.
 * Fallbacks seamlessly to English if a field translation is not present.
 */
export function getLocalizedDoctor(doctor: Doctor, locale: string): Doctor {
  if (!locale || locale === 'en') return doctor

  const langTranslations = DOCTOR_TRANSLATIONS[locale.toLowerCase()]
  const docTranslation = langTranslations?.[doctor.slug]

  if (!docTranslation) return doctor

  return {
    ...doctor,
    designation: docTranslation.designation ?? doctor.designation,
    department: docTranslation.department ?? doctor.department,
    cityLabel: docTranslation.cityLabel ?? doctor.cityLabel,
    bio: docTranslation.bio ?? doctor.bio,
    keyExpertise: docTranslation.keyExpertise ?? doctor.keyExpertise,
  }
}

export function getLocalizedDoctorList(doctors: Doctor[], locale: string): Doctor[] {
  if (!locale || locale === 'en') return doctors
  return doctors.map((doc) => getLocalizedDoctor(doc, locale))
}

/**
 * Returns a localized copy of a Hospital entity for the given locale.
 */
export function getLocalizedHospital(hospital: Hospital, locale: string): Hospital {
  if (!locale || locale === 'en') return hospital

  const langTranslations = HOSPITAL_TRANSLATIONS[locale.toLowerCase()]
  const hospTranslation = langTranslations?.[hospital.slug]

  if (!hospTranslation) return hospital

  return {
    ...hospital,
    tagline: hospTranslation.tagline ?? hospital.tagline,
    description: hospTranslation.description ?? hospital.description,
    cityLabel: hospTranslation.cityLabel ?? hospital.cityLabel,
  }
}

export function getLocalizedHospitalList(hospitals: Hospital[], locale: string): Hospital[] {
  if (!locale || locale === 'en') return hospitals
  return hospitals.map((hosp) => getLocalizedHospital(hosp, locale))
}

/**
 * Returns a localized copy of a Procedure entity for the given locale.
 */
export function getLocalizedProcedure(procedure: Procedure, locale: string): Procedure {
  if (!locale || locale === 'en') return procedure

  const langTranslations = PROCEDURE_TRANSLATIONS[locale.toLowerCase()]
  const procTranslation = langTranslations?.[procedure.slug]

  if (!procTranslation) return procedure

  return {
    ...procedure,
    name: procTranslation.name ?? procedure.name,
    specialtyLabel: procTranslation.specialtyLabel ?? procedure.specialtyLabel,
    tagline: procTranslation.tagline ?? procedure.tagline,
    description: procTranslation.description ?? procedure.description,
  }
}

export function getLocalizedProcedureList(procedures: Procedure[], locale: string): Procedure[] {
  if (!locale || locale === 'en') return procedures
  return procedures.map((proc) => getLocalizedProcedure(proc, locale))
}

/**
 * Localized Blog Entity resolver with fallback support
 */
export function getLocalizedBlog(blog: SeoBlogPost, locale: string): SeoBlogPost {
  if (!locale || locale === 'en') return blog

  // Prefix titles for locale search recognition if exact body translation is queued
  const prefixes: Record<string, string> = {
    bn: '[বাংলা গাইড] ',
    ar: '[الدليل الطبي] ',
    ru: '[Медицинский гид] ',
    fr: '[Guide Médical] ',
  }

  const prefix = prefixes[locale.toLowerCase()] || ''

  return {
    ...blog,
    title: prefix ? `${prefix}${blog.title}` : blog.title,
    metaTitle: prefix ? `${prefix}${blog.metaTitle}` : blog.metaTitle,
  }
}

export function getLocalizedBlogList(blogs: SeoBlogPost[], locale: string): SeoBlogPost[] {
  if (!locale || locale === 'en') return blogs
  return blogs.map((blog) => getLocalizedBlog(blog, locale))
}
