/**
 * Schema.org JSON-LD builders for medical pages.
 * All builders return plain objects — serialize with JSON.stringify.
 */

export interface MedicalProcedureSchema {
  name: string;
  description: string;
  url: string;
  procedureType?: string;
  followUp?: string;
  howPerformed?: string;
}

export function buildMedicalProcedureSchema(data: MedicalProcedureSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: data.name,
    description: data.description,
    url: data.url,
    ...(data.procedureType && { procedureType: data.procedureType }),
    ...(data.followUp && { followUp: data.followUp }),
    ...(data.howPerformed && { howPerformed: data.howPerformed }),
  };
}

export interface HospitalSchema {
  name: string;
  url: string;
  telephone?: string;
  address: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: "IN";
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
  };
  sameAs?: string[];
}

export function buildHospitalSchema(data: HospitalSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: data.name,
    url: data.url,
    ...(data.telephone && { telephone: data.telephone }),
    address: {
      "@type": "PostalAddress",
      ...data.address,
    },
    ...(data.aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: data.aggregateRating.ratingValue,
        reviewCount: data.aggregateRating.reviewCount,
        bestRating: data.aggregateRating.bestRating ?? 5,
      },
    }),
    ...(data.sameAs && { sameAs: data.sameAs }),
  };
}

export interface PhysicianSchema {
  name: string;
  url: string;
  description?: string;
  medicalSpecialty: string;
  worksFor?: { name: string; url?: string };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

export function buildPhysicianSchema(data: PhysicianSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: data.name,
    url: data.url,
    ...(data.description && { description: data.description }),
    medicalSpecialty: data.medicalSpecialty,
    ...(data.worksFor && {
      worksFor: {
        "@type": "Hospital",
        name: data.worksFor.name,
        ...(data.worksFor.url && { url: data.worksFor.url }),
      },
    }),
    ...(data.aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: data.aggregateRating.ratingValue,
        reviewCount: data.aggregateRating.reviewCount,
        bestRating: 5,
      },
    }),
  };
}

export interface FAQSchema {
  questions: Array<{ question: string; answer: string }>;
}

export function buildFAQSchema(data: FAQSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildOrganizationSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "healthremade",
    url: siteUrl,
    description:
      "India's most transparent medical tourism platform. Real itemized prices, disclosed fees, and verified patient outcomes.",
    areaServed: "Worldwide",
    serviceType: "Medical Tourism Facilitation",
  };
}

export function buildWebSiteSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "healthremade",
    url: siteUrl,
    description:
      "Compare transparent medical treatment packages across JCI & NABH accredited hospitals in India.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/pricing?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}
