'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { getTranslation, type TranslationDictionary } from '@/lib/translations'
import { triggerGoogleTranslate } from '@/components/ui/GoogleTranslateBridge'

interface LanguageContextType {
  locale: string
  t: TranslationDictionary
  setLocale: (newLocale: string) => void
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  t: getTranslation('en'),
  setLocale: () => {},
})

export function useLanguage() {
  return useContext(LanguageContext)
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<string>('en')

  useEffect(() => {
    // 1. Check URL pathname sub-path or query param ?lang= (crucial for SEO crawlers)
    let initialLocale = 'en'
    try {
      const pathname = window.location.pathname
      const subpathMatch = pathname.match(/^\/(bn|ar|ru|fr|sw|uz|ro|pt|es|de|tr)(\/.*)?$/)
      if (subpathMatch) {
        initialLocale = subpathMatch[1].toLowerCase()
        localStorage.setItem('healthremade_lang', initialLocale)
      } else {
        const urlParams = new URLSearchParams(window.location.search)
        const langParam = urlParams.get('lang')
        if (langParam) {
          initialLocale = langParam.toLowerCase()
          localStorage.setItem('healthremade_lang', initialLocale)
        } else {
          const saved = localStorage.getItem('healthremade_lang')
          if (saved) initialLocale = saved.toLowerCase()
        }
      }
    } catch {
      // ignore
    }

    setLocaleState(initialLocale)
    document.documentElement.lang = initialLocale
    document.documentElement.dir = initialLocale === 'ar' ? 'rtl' : 'ltr'

    const handleEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      if (customEvent.detail) {
        const newCode = customEvent.detail.toLowerCase()
        setLocaleState(newCode)
        document.documentElement.lang = newCode
        document.documentElement.dir = newCode === 'ar' ? 'rtl' : 'ltr'
      }
    }

    window.addEventListener('healthremade_lang_changed', handleEvent)
    return () => window.removeEventListener('healthremade_lang_changed', handleEvent)
  }, [])

  const setLocale = (newLocale: string) => {
    const code = newLocale.toLowerCase()
    setLocaleState(code)
    try {
      localStorage.setItem('healthremade_lang', code)
      document.documentElement.lang = code
      document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr'

      // Update URL query param ?lang= for SEO and shareability without page flash
      const url = new URL(window.location.href)
      if (code === 'en') {
        url.searchParams.delete('lang')
      } else {
        url.searchParams.set('lang', code)
      }
      window.history.replaceState({}, '', url.toString())

      // Set cookie for translation compatibility
      if (code === 'en') {
        document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
      } else {
        document.cookie = `googtrans=/en/${code}; path=/; max-age=31536000;`
      }

      triggerGoogleTranslate(code)
      window.dispatchEvent(new CustomEvent('healthremade_lang_changed', { detail: code }))
    } catch (err) {
      console.error('Failed to set locale:', err)
    }
  }

  const dictionary = getTranslation(locale)

  return (
    <LanguageContext.Provider value={{ locale, t: dictionary, setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}
