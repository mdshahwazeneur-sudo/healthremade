'use client'

import React from 'react'
import { HeartPulse, FileCheck, Languages, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/primitives'
import { useLanguage } from '@/context/LanguageContext'

export function HomeAssistanceSection() {
  const { t, locale } = useLanguage()

  const badgeText =
    locale === 'bn'
      ? 'সম্পূর্ণ রোগী সহায়তা ও সমন্বয়'
      : locale === 'ar'
      ? 'دعم متكامل وشامل للمرضى'
      : locale === 'ru'
      ? 'Полное сопровождение пациентов'
      : locale === 'fr'
      ? 'Accompagnement complet des patients'
      : 'Comprehensive Patient Support'

  const sectionTitle =
    locale === 'bn'
      ? 'Healthremade কীভাবে আন্তর্জাতিক রোগীদের সহায়তা করে'
      : locale === 'ar'
      ? 'كيف تساعد Healthremade المرضى الدوليين'
      : locale === 'ru'
      ? 'Как Healthremade помогает иностранным пациентам'
      : locale === 'fr'
      ? 'Comment Healthremade accompagne les patients internationaux'
      : 'How healthremade Assists International Patients'

  const sectionSubtitle =
    locale === 'bn'
      ? 'প্রাথমিক অনুসন্ধান থেকে শুরু করে সুস্থ হয়ে বাড়ি ফেরা পর্যন্ত, আমাদের কেয়ার টিম সম্পূর্ণ স্বচ্ছতার সাথে প্রতিটি ধাপ পরিচালনা করে।'
      : locale === 'ar'
      ? 'من استفسارك الأول حتى التعافي الكامل والعودة للوطن، يتولى فريق الرعاية لدينا إدارة كل التفاصيل بشفافية تامة.'
      : locale === 'ru'
      ? 'От первого обращения до полного выздоровления и возвращения домой — наша команда заботится о каждой детали.'
      : locale === 'fr'
      ? 'De votre première demande jusqu’au rétablissement chez vous, notre équipe gère chaque étape en toute transparence.'
      : 'From your initial inquiry to full recovery back home, our care team handles every detail with complete transparency.'

  const assistItems = [
    {
      icon: <HeartPulse className="h-6 w-6" />,
      title: t.features.feat1Title,
      description: t.features.feat1Desc,
    },
    {
      icon: <FileCheck className="h-6 w-6" />,
      title: t.features.feat2Title,
      description: t.features.feat2Desc,
    },
    {
      icon: <Languages className="h-6 w-6" />,
      title: t.features.feat3Title,
      description: t.features.feat3Desc,
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t.features.feat4Title,
      description: t.features.feat4Desc,
    },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="default" className="mb-2">{badgeText}</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {sectionTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {assistItems.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 transition-all hover:bg-white hover:shadow-lg hover:border-brand-300"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
