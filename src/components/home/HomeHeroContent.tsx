'use client'

import React from 'react'
import { Shield, TrendingDown, Star, Sparkles } from 'lucide-react'
import { SearchTriggerButton } from '@/components/search/GlobalSearchBar'
import { InlineQuoteSection } from '@/components/home/InlineQuoteSection'
import { useLanguage } from '@/context/LanguageContext'

export function HomeHeroContent() {
  const { t, locale } = useLanguage()

  const deskBadge =
    locale === 'bn'
      ? '২৪/৭ আন্তর্জাতিক পেশেন্ট ডেস্ক সক্রিয়'
      : locale === 'ar'
      ? 'مكتب المرضى الدوليين متاح 24/7'
      : locale === 'ru'
      ? 'Международный отдел пациентов 24/7'
      : locale === 'fr'
      ? 'Bureau des patients 24/7 en ligne'
      : '24/7 International Patient Desk Online'

  const heroDesc =
    locale === 'bn'
      ? 'দিল্লি এনসিআর এবং ভারত জুড়ে শীর্ষ জেসিআই ও এনএবিএইচ স্বীকৃত হাসপাতাল থেকে প্রতিটি খরচের বিস্তারিত প্যাকেজ তুলনা করুন। বিনামূল্যে বিশেষজ্ঞ ডাক্তারের মতামত, দ্রুত মেডিকেল ভিসা ও সার্বক্ষণিক সহায়তা।'
      : locale === 'ar'
      ? 'قارن باقات العلاج المفصلة من أفضل المستشفيات المعتمدة في دلهي والهند. استشارات مجانية من كبار الأطباء وتأشيرة علاجية سريعة.'
      : locale === 'ru'
      ? 'Сравнивайте прозрачные пакеты лечения в ведущих клиниках Индии с аккредитацией JCI и NABH. Бесплатные консультации врачей и визовая поддержка.'
      : locale === 'fr'
      ? 'Comparez les forfaits de soins détaillés des meilleurs hôpitaux accrédités JCI et NABH en Inde. Avis médicaux gratuits et assistance visa rapide.'
      : 'Compare itemized treatment packages from top JCI & NABH accredited hospitals in Delhi NCR and across India. Free senior doctor opinions, fast medical visas, and continuous care support.'

  const trustBadge1 =
    locale === 'bn' ? 'জেসিআই ও এনএবিএইচ স্বীকৃত হাসপাতাল' : locale === 'ar' ? 'مستشفيات معتمدة دولياً (JCI/NABH)' : 'JCI & NABH Accredited Hospitals'
  const trustBadge2 =
    locale === 'bn' ? 'শূন্য গোপনীয় চার্জ' : locale === 'ar' ? 'أسعار مباشرة بدون أي عمولات خفية' : 'Zero Hidden Markups'
  const trustBadge3 =
    locale === 'bn' ? '১০০% বিনামূল্যে চিকিৎসা সমন্বয়' : locale === 'ar' ? 'تنسيق مجاني 100% للمرضى' : '100% Free Care Coordination'

  return (
    <>
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 border border-emerald-300 px-3.5 py-1 text-xs font-bold text-emerald-800 mb-6 shadow-2xs">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>{deskBadge}</span>
      </div>

      <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.18] sm:leading-[1.15] max-w-4xl mx-auto px-2">
        {t.hero.titlePart1} <span className="text-brand-600">{t.hero.titlePart2}</span>
      </h1>

      <p className="mt-3 sm:mt-4 text-base sm:text-xl md:text-2xl font-bold text-brand-700 tracking-tight">
        {t.hero.subtitle}
      </p>

      <p className="mx-auto mt-2.5 max-w-2xl text-xs sm:text-base text-slate-600 leading-relaxed px-2">
        {heroDesc}
      </p>

      {/* "I'm looking for..." indicator */}
      <div className="mt-6 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold text-brand-700 uppercase tracking-wider">
        <Sparkles className="h-4 w-4 text-brand-600 animate-pulse" />
        <span>{t.hero.searchPrompt}</span>
      </div>

      {/* Instant Global Keyword Search Bar */}
      <SearchTriggerButton
        variant="hero"
        className="mt-2 mb-8"
        placeholder={t.hero.searchPlaceholder}
      />

      {/* ─── Quotation Form Section (Hero Card) ─── */}
      <div className="w-full max-w-6xl mx-auto mt-4 mb-4">
        <InlineQuoteSection isHeroCard={true} />
      </div>

      {/* Key Trust Signals */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-semibold text-slate-600">
        <span className="flex items-center gap-1.5">
          <Shield className="h-4 w-4 text-emerald-600" /> {trustBadge1}
        </span>
        <span className="flex items-center gap-1.5">
          <TrendingDown className="h-4 w-4 text-brand-600" /> {trustBadge2}
        </span>
        <span className="flex items-center gap-1.5">
          <Star className="h-4 w-4 text-amber-500" /> {trustBadge3}
        </span>
      </div>
    </>
  )
}
