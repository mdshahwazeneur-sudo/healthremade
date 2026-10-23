'use client'

import React from 'react'
import Link from 'next/link'
import { Stethoscope, Award, GraduationCap, Video, CheckCircle2, ChevronRight, ArrowRight, MessageCircle } from 'lucide-react'
import { DOCTORS } from '@/data/doctors'
import { Badge, Card, CardContent, Button } from '@/components/ui/primitives'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'

export function HomeTopDoctors() {
  const { openQuoteModal } = useQuote()

  // Curate 5 flagship specialists representing major medical travel departments
  const FEATURED_DOCTOR_IDS = [
    'doc_himanshu_gupta',       // Plastic & Reconstructive / BLK-Max
    'doc_ritwick_raj_bhuyan',   // Cardiac Surgery (CABG / Valve) / Fortis Escorts
    'doc_aman_dua',             // Robotic Joint Replacement & Orthopaedics / Fortis Escorts
    'doc_vivek_vij',            // Liver Transplant & HPB / Fortis Escorts
    'doc_shruti_bhatia',        // IVF & Fertility / BLK-Max
  ]
  const featuredDoctors = DOCTORS.filter((d) => FEATURED_DOCTOR_IDS.includes(d.id)).slice(0, 5)

  return (
    <section className="bg-slate-50 py-16 px-4 sm:px-6 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Badge variant="default" className="mb-2">Senior Medical Leadership</Badge>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Top Doctors & Senior Specialists in India
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Senior consultants, department directors, and UK/France/Australia fellowship-trained specialists.
            </p>
          </div>
          <Link
            href="/doctors"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700 bg-white border border-brand-200 px-4 py-2 rounded-xl shadow-2xs transition-colors"
          >
            <span>View All Specialists & Department Directors</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {featuredDoctors.map((doc) => {
            const docWaUrl = getWhatsAppUrl({
              pageType: 'doctors',
              customMessage: `Hello healthremade! I would like to request an opinion from ${doc.name} (${doc.designation}).`,
            })

            return (
              <Card
                key={doc.id}
                className="h-full flex flex-col justify-between hover:shadow-lg transition-all border border-slate-200/90 group"
              >
                <CardContent className="p-4 sm:p-5 flex flex-col justify-between h-full">
                  <div>
                    {/* Doctor Photo & Badges — Balanced medium size on phone (~210px-224px), full on desktop */}
                    <div className="relative mb-3 h-52 w-52 xs:h-56 xs:w-56 sm:h-52 sm:w-full mx-auto rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/90 flex items-center justify-center">
                      <img
                        src={doc.photoUrl}
                        alt={doc.name}
                        className="h-full w-full object-contain sm:object-cover sm:object-top transition-transform duration-300 sm:group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 z-10 shadow-xs">
                        <Video className="h-3 w-3 text-emerald-400" />
                        <span className="hidden sm:inline">Consult</span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-emerald-700/90 backdrop-blur-xs text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md z-10 shadow-xs">
                        {doc.surgeriesCount}
                      </div>
                    </div>

                    {/* Name and Designation */}
                    <Link href={`/doctors/${doc.slug}`} className="block group text-center sm:text-left">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-brand-600 transition-colors leading-snug line-clamp-1">
                        {doc.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs font-semibold text-brand-700 mt-0.5 line-clamp-1">
                        {doc.designation}
                      </p>
                    </Link>

                    {/* Hospital affiliation */}
                    <div className="mt-2 text-xs text-slate-600 flex items-center justify-center sm:justify-start gap-1 font-medium">
                      <Stethoscope className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                      <span className="line-clamp-1">{doc.hospitalName}</span>
                    </div>

                    {/* Experience & Awards */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{doc.experienceYears}+ Yrs Exp</span>
                      {doc.awards.length > 0 && (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-md line-clamp-1 max-w-[110px]">
                          {doc.awards[0]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions — stacked vertically so they never overflow card bounds on desktop or mobile */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col gap-2 w-full">
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={() =>
                        openQuoteModal({
                          treatment: `${doc.name} — ${doc.department}`,
                          hospital: doc.hospitalName,
                        })
                      }
                      className="w-full h-8.5 text-xs font-bold inline-flex items-center justify-center gap-1 shadow-2xs"
                    >
                      <span>Book Free Opinion</span>
                    </Button>
                    <a
                      href={docWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-8.5 inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-3 text-xs font-bold transition-colors shadow-2xs"
                      title="Chat regarding doctor opinion"
                    >
                      <MessageCircle className="h-3.5 w-3.5 fill-[#25D366] text-[#25D366]" />
                      <span>WhatsApp Consultation</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA to View All Doctors — especially prominent on phone mode */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm sm:text-base px-7 py-3.5 shadow-md hover:shadow-lg transition-all"
          >
            <span>View All Senior Specialists & Department Directors</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-xs text-slate-500 font-medium">
            Cardiac, Orthopaedics, Oncology, Transplant, Fertility, Spine & Dental
          </span>
        </div>
      </div>
    </section>
  )
}
