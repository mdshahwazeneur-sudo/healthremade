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
  const featuredDoctors = DOCTORS.slice(0, 4)

  return (
    <section className="bg-slate-50 py-16 px-4 sm:px-6 border-t border-slate-200/80">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Badge variant="default" className="mb-2">Senior Medical Leadership</Badge>
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Top Doctors & Senior Surgeons in India
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Department chairmen, Padma awardees, and US/UK board-certified surgeons with 30,000+ complex procedures.
            </p>
          </div>
          <Link
            href="/doctors"
            className="inline-flex items-center gap-1 text-sm font-bold text-brand-600 hover:text-brand-700"
          >
            View All {DOCTORS.length} Senior Doctors <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                <CardContent className="p-5 flex flex-col justify-between h-full">
                  <div>
                    {/* Doctor Photo & Badges */}
                    <div className="relative mb-4 h-48 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img
                        src={doc.photoUrl}
                        alt={doc.name}
                        className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Video className="h-3 w-3 text-emerald-400" />
                        <span>Video Consult</span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-emerald-700/90 backdrop-blur-xs text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                        {doc.surgeriesCount} Surgeries
                      </div>
                    </div>

                    {/* Name and Designation */}
                    <Link href={`/doctors#${doc.slug}`} className="block group">
                      <h3 className="font-bold text-base text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">
                        {doc.name}
                      </h3>
                      <p className="text-xs font-semibold text-brand-700 mt-0.5 line-clamp-1">
                        {doc.designation}
                      </p>
                    </Link>

                    {/* Hospital affiliation */}
                    <div className="mt-2 text-xs text-slate-600 flex items-center gap-1 font-medium">
                      <Stethoscope className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                      <span className="line-clamp-1">{doc.hospitalName}</span>
                    </div>

                    {/* Experience & Awards */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{doc.experienceYears}+ Yrs Exp</span>
                      {doc.awards.length > 0 && (
                        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md line-clamp-1">
                          {doc.awards[0]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={() =>
                        openQuoteModal({
                          treatment: `${doc.name} — ${doc.department}`,
                          hospital: doc.hospitalName,
                        })
                      }
                      className="flex-1 h-9 text-xs font-bold inline-flex items-center justify-center gap-1 shadow-2xs"
                    >
                      <span>Book Opinion</span>
                    </Button>
                    <a
                      href={docWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-9 inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-3 text-xs font-bold transition-colors shadow-2xs"
                      title="Chat regarding doctor opinion"
                    >
                      <MessageCircle className="h-3.5 w-3.5 fill-[#25D366] text-[#25D366]" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
