'use client'

import React, { useState, useEffect } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export interface Language {
  code: string
  name: string // English label
  nativeName: string // Word in its own native script
  flag: string
  direction?: 'ltr' | 'rtl'
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', direction: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', direction: 'rtl' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', direction: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', direction: 'ltr' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', direction: 'ltr' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', direction: 'ltr' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', direction: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', direction: 'ltr' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', direction: 'ltr' },
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbekcha', flag: '🇺🇿', direction: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', direction: 'ltr' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', direction: 'ltr' },
]

export function useActiveLanguage() {
  const [currentLang, setCurrentLang] = useState<string>('en')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('healthremade_lang')
      if (saved) setCurrentLang(saved)
    } catch (e) {
      // ignore SSR
    }

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      if (customEvent.detail) {
        setCurrentLang(customEvent.detail)
      }
    }

    window.addEventListener('healthremade_lang_changed', handler)
    return () => window.removeEventListener('healthremade_lang_changed', handler)
  }, [])

  return currentLang
}

export function LanguageSelector({ className = '' }: { className?: string }) {
  const [selectedLang, setSelectedLang] = useState<Language>(SUPPORTED_LANGUAGES[0])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('healthremade_lang')
      if (saved) {
        const found = SUPPORTED_LANGUAGES.find((l) => l.code === saved)
        if (found) {
          setSelectedLang(found)
          window.dispatchEvent(new CustomEvent('healthremade_lang_changed', { detail: found.code }))
        }
      }
    } catch (e) {
      // ignore SSR
    }
  }, [])

  const handleSelect = (lang: Language) => {
    setSelectedLang(lang)
    try {
      localStorage.setItem('healthremade_lang', lang.code)
      if (lang.direction === 'rtl') {
        document.documentElement.dir = 'rtl'
      } else {
        document.documentElement.dir = 'ltr'
      }
      window.dispatchEvent(new CustomEvent('healthremade_lang_changed', { detail: lang.code }))
    } catch (e) {
      // ignore
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={`inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${className}`}
          title="Select Language"
        >
          <Globe className="h-3.5 w-3.5 text-brand-600 shrink-0" />
          <span className="text-xs font-bold font-sans">
            {selectedLang.nativeName}
          </span>
          <ChevronDown className="h-3 w-3 text-slate-400 shrink-0" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          className="z-50 min-w-[200px] rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl text-slate-800 animate-in fade-in zoom-in-95"
        >
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1 flex items-center justify-between">
            <span>Select Language</span>
            <span className="text-[10px] text-brand-600 font-bold">12 Languages</span>
          </div>

          <div className="max-h-[300px] overflow-y-auto space-y-0.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = selectedLang.code === lang.code
              return (
                <DropdownMenu.Item
                  key={lang.code}
                  onClick={() => handleSelect(lang)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer outline-none transition-colors ${
                    isSelected
                      ? 'bg-brand-50 text-brand-900 font-bold'
                      : 'hover:bg-slate-50 text-slate-700 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base leading-none">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold leading-none">
                        {lang.nativeName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                        {lang.name}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="h-4 w-4 text-brand-600 shrink-0" />
                  )}
                </DropdownMenu.Item>
              )
            })}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
