import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Stethoscope,
  Award,
  GraduationCap,
  Languages,
  Video,
  Play,
  Building2,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  MessageCircle,
  FileText,
  Clock,
  UserCheck,
  ChevronRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react'
import { DOCTORS, getDoctor } from '@/data/doctors'
import { Badge, Button, Card, CardContent } from '@/components/ui/primitives'
import { DoctorDetailActions } from '@/components/doctors/DoctorDetailActions'
import { JsonLd } from '@/components/ui/primitives'
import { buildBreadcrumbSchema } from '@/lib/schema'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://healthremade.com'

interface DoctorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return DOCTORS.map((doc) => ({
    slug: doc.slug,
  }))
}

export async function generateMetadata({ params }: DoctorPageProps): Promise<Metadata> {
  const { slug } = await params
  const doctor = getDoctor(slug)
  if (!doctor) {
    return { title: 'Doctor Not Found | healthremade' }
  }

  return {
    title: `${doctor.name} — ${doctor.designation} in India | healthremade`,
    description: `Consult ${doctor.name}, ${doctor.designation} at ${doctor.hospitalName}, ${doctor.cityLabel}. ${doctor.experienceYears}+ years experience, ${doctor.surgeriesCount} surgeries performed. Watch video explanations and request a free opinion.`,
    openGraph: {
      title: `${doctor.name} — ${doctor.designation} | healthremade`,
      description: doctor.bio.slice(0, 160),
    },
  }
}

export default async function DoctorProfilePage({ params }: DoctorPageProps) {
  const { slug } = await params
  const doctor = getDoctor(slug)

  if (!doctor) {
    notFound()
  }

  const breadcrumbs = buildBreadcrumbSchema([
    { name: 'Home', url: SITE_URL },
    { name: 'Doctors & Surgeons', url: `${SITE_URL}/doctors` },
    { name: doctor.name, url: `${SITE_URL}/doctors/${doctor.slug}` },
  ])

  // Related specialists
  const relatedDoctors = DOCTORS.filter((d) => d.slug !== doctor.slug).slice(0, 3)

  return (
    <>
      <JsonLd data={breadcrumbs} />

      {/* ─── 1. TOP BREADCRUMB BAR ─────────────────────────────────── */}
      <div className="bg-slate-900 text-slate-400 py-3 px-4 sm:px-6 border-b border-slate-800 text-xs">
        <div className="mx-auto max-w-7xl flex items-center gap-2">
          <Link href="/doctors" className="hover:text-white flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to All Doctors
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200 truncate">{doctor.name}</span>
        </div>
      </div>

      {/* ─── 2. HERO / PROFILE HEADER ─────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-950 via-slate-900 to-slate-950 text-white py-12 px-4 sm:px-6 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Doctor Photo & Core Metrics */}
            <div className="lg:col-span-4 space-y-4">
              <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-slate-800 border-2 border-slate-700 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
                <img
                  src={doctor.photoUrl}
                  alt={doctor.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 bg-emerald-950/90 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                    Verified Lead Surgeon
                  </span>
                  <span className="bg-slate-900/90 border border-slate-700 text-slate-300 text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs">
                    {doctor.cityLabel}
                  </span>
                </div>
              </div>

              {/* Surgeries & Experience Highlight Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 text-center">
                  <div className="text-2xl font-black text-brand-400">{doctor.experienceYears}+ Yrs</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">Clinical Practice</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 text-center">
                  <div className="text-2xl font-black text-emerald-400">{doctor.surgeriesCount}</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">Successful Surgeries</div>
                </div>
              </div>
            </div>

            {/* Right: Doctor Information & Quick CTA */}
            <div className="lg:col-span-8 space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 px-3 py-1 text-xs font-bold text-brand-300 mb-2">
                  <Stethoscope className="h-3.5 w-3.5" />
                  <span>{doctor.department}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {doctor.name}
                </h1>
                <p className="text-base sm:text-lg text-brand-200 font-medium mt-1">
                  {doctor.designation}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs sm:text-sm text-slate-300">
                  <Link
                    href={`/hospitals/${doctor.hospitalSlug}`}
                    className="inline-flex items-center gap-1 text-brand-300 hover:text-white font-semibold underline underline-offset-4"
                  >
                    <Building2 className="h-4 w-4" /> {doctor.hospitalName}
                  </Link>
                  <span className="text-slate-600">•</span>
                  <span className="inline-flex items-center gap-1 text-slate-300">
                    <MapPin className="h-4 w-4 text-slate-400" /> {doctor.cityLabel}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="inline-flex items-center gap-1 text-slate-300">
                    <Languages className="h-4 w-4 text-slate-400" /> Speaks: {doctor.languages.join(', ')}
                  </span>
                </div>
              </div>

              {/* Biography */}
              <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800">
                <h2 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                  Professional Biography & Leadership
                </h2>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {doctor.bio}
                </p>
              </div>

              {/* Action Buttons (Equal Size) */}
              <DoctorDetailActions
                doctorName={doctor.name}
                hospitalName={doctor.hospitalName}
                department={doctor.department}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ─── 3. VIDEO EXPLANATION & SURGICAL APPROACH ──────────────── */}
      <section className="bg-white py-12 px-4 sm:px-6 border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Video Embed Preview */}
            <div className="lg:col-span-6">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl group">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${doctor.videoYoutubeId}?rel=0&modestbranding=1`}
                  title={doctor.videoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Right: Video Description & Key Clinical Insights */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-200 px-3 py-0.5 text-xs font-bold text-brand-800">
                <Video className="h-3.5 w-3.5 text-brand-600" />
                <span>Doctor Video Consultation</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {doctor.videoTitle}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {doctor.videoDescription}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" /> {doctor.videoDuration}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> High Definition Surgical Guidance
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 4. CLINICAL EXPERTISE, QUALIFICATIONS & AWARDS ─────────── */}
      <section className="bg-slate-50 py-14 px-4 sm:px-6 border-b border-slate-200">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Key Clinical Expertise */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-brand-50 text-brand-700">
                <Stethoscope className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Key Clinical Expertise</h3>
            </div>
            <ul className="space-y-2.5">
              {doctor.keyExpertise.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Qualifications & Fellowships */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Qualifications & Fellowships</h3>
            </div>
            <ul className="space-y-2.5">
              {doctor.qualifications.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Awards & Recognitions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Honours & National Awards</h3>
            </div>
            <ul className="space-y-2.5">
              {doctor.awards.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Award className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* ─── 5. RELATED DOCTORS IN SPECIALTY ───────────────────────── */}
      {relatedDoctors.length > 0 && (
        <section className="bg-white py-14 px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Other Recommended Senior Specialists
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Explore peer department directors and senior surgeons for second opinions.
                </p>
              </div>
              <Link
                href="/doctors"
                className="text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 inline-flex items-center gap-1"
              >
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedDoctors.map((relDoc) => (
                <Card key={relDoc.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={relDoc.photoUrl}
                        alt={relDoc.name}
                        className="h-14 w-14 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <Link
                          href={`/doctors/${relDoc.slug}`}
                          className="text-sm font-bold text-slate-900 hover:text-brand-600 line-clamp-1"
                        >
                          {relDoc.name}
                        </Link>
                        <p className="text-xs text-slate-500 line-clamp-1">{relDoc.designation}</p>
                        <p className="text-xs text-brand-600 font-medium mt-0.5">{relDoc.hospitalName}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>{relDoc.experienceYears}+ Yrs Exp</span>
                      <Link
                        href={`/doctors/${relDoc.slug}`}
                        className="font-bold text-brand-600 hover:text-brand-700 flex items-center gap-0.5"
                      >
                        Profile <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
