'use client'

import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { Play, X, Video, Award, CheckCircle2, MessageCircle, FileText, UserCheck, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/primitives'
import { useQuote } from '@/components/ui/QuoteModal'
import { getWhatsAppUrl } from '@/lib/whatsapp'
import type { Doctor } from '@/data/doctors'

export function DoctorCardActions({ doctor }: { doctor: Doctor }) {
  const { openQuoteModal } = useQuote()
  const [videoOpen, setVideoOpen] = useState(false)

  const waUrl = getWhatsAppUrl({
    pageType: 'treatment',
    treatmentName: doctor.department,
    hospitalName: `${doctor.name} (${doctor.hospitalName})`,
    city: doctor.cityLabel,
    customMessage: `Hello healthremade! I would like to get a medical opinion and appointment quote for *${doctor.name}* (${doctor.designation}) at *${doctor.hospitalName}*.`,
  })

  return (
    <>
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
        <Button
          variant="accent"
          size="sm"
          onClick={() =>
            openQuoteModal({
              treatment: `${doctor.department} — Dr. ${doctor.name}`,
              hospital: doctor.hospitalName,
              city: doctor.cityLabel,
            })
          }
          className="w-full sm:w-auto flex-1 font-bold text-xs py-2 shadow-2xs h-9"
        >
          <FileText className="h-3.5 w-3.5 mr-1" />
          Get Free Opinion & Quote
        </Button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-lg border border-brand-300 bg-brand-50/80 hover:bg-brand-100 text-brand-900 px-3 py-2 text-xs font-semibold transition-colors h-9"
          >
            <Play className="h-3.5 w-3.5 fill-brand-700 text-brand-700" />
            Watch Video ({doctor.videoDuration})
          </button>

          <Link
            href={`/doctors/${doctor.slug}`}
            className="inline-flex items-center justify-center gap-1 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 px-3 py-2 text-xs font-bold transition-colors h-9 shadow-2xs"
          >
            Profile <ChevronRight className="h-3.5 w-3.5" />
          </Link>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-[#25D366] text-white hover:bg-[#1EBE5D] px-3 py-2 text-xs font-bold transition-colors shadow-2xs h-9 gap-1"
            title={`Chat on WhatsApp regarding ${doctor.name}`}
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Video Modal Dialog */}
      <Dialog.Root open={videoOpen} onOpenChange={setVideoOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm animate-in fade-in" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-[95vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-2xl bg-slate-950 text-white shadow-2xl border border-slate-800 p-5 sm:p-6 outline-none">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Video className="h-3.5 w-3.5" /> Doctor Video Explanation
                </span>
                <Dialog.Title className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {doctor.videoTitle}
                </Dialog.Title>
                <p className="text-xs text-slate-400">
                  {doctor.name} • {doctor.designation} at {doctor.hospitalName}
                </p>
              </div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            {/* Video Player Preview / Simulation */}
            <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center p-6">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
              
              {/* Background doctor photo watermark */}
              <img
                src={doctor.photoUrl}
                alt={doctor.name}
                className="absolute inset-0 h-full w-full object-cover opacity-25 filter blur-xs"
              />

              <div className="relative z-10 max-w-md space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg animate-pulse">
                  <Play className="h-6 w-6 fill-white ml-0.5" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">{doctor.videoTitle}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {doctor.videoDescription}
                </p>
                <div className="inline-flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full">
                  <CheckCircle2 className="h-3 w-3" /> Recorded Surgeon Overview ({doctor.videoDuration})
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="text-xs text-slate-400">
                ⭐ {doctor.surgeriesCount} Surgeries • {doctor.experienceYears}+ Years Experience
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => {
                    setVideoOpen(false)
                    openQuoteModal({
                      treatment: `${doctor.department} — Dr. ${doctor.name}`,
                      hospital: doctor.hospitalName,
                      city: doctor.cityLabel,
                    })
                  }}
                  className="flex-1 sm:flex-none font-bold text-xs"
                >
                  Book Free Consultation with {doctor.name}
                </Button>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#25D366] text-white px-3.5 py-2 text-xs font-bold hover:bg-[#1EBE5D] transition-colors"
                >
                  <MessageCircle className="h-3.5 w-3.5 fill-white" />
                  WhatsApp
                </a>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
