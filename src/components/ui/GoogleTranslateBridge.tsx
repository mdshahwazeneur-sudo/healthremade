'use client'

import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    google: any
    googleTranslateElementInit: () => void
  }
}

/**
 * Trigger translation in Google's internal DOM select combo box
 */
export function triggerGoogleTranslate(targetLang: string) {
  if (typeof window === 'undefined') return
  try {
    const code = targetLang.toLowerCase()
    
    // 1. Set Google Translate Cookies (for both current host and wildcard domain)
    const host = window.location.hostname
    if (code === 'en') {
      document.cookie = 'googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
      document.cookie = `googtrans=; domain=.${host}; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
    } else {
      document.cookie = `googtrans=/en/${code}; path=/; max-age=31536000;`
      document.cookie = `googtrans=/en/${code}; domain=.${host}; path=/; max-age=31536000;`
    }

    // 2. Query Google combo box
    const select = document.querySelector<HTMLSelectElement>('.goog-te-combo')
    if (select) {
      if (select.value !== code) {
        select.value = code
        select.dispatchEvent(new Event('change', { bubbles: true }))
      }
      return true
    }
  } catch (err) {
    console.warn('Google Translate trigger error:', err)
  }
  return false
}

export function GoogleTranslateBridge() {
  const pathname = usePathname()

  useEffect(() => {
    // 1. Sync html lang & direction on load based on stored preference or URL param
    let currentLang = 'en'
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const langParam = urlParams.get('lang')
      currentLang = (langParam || localStorage.getItem('healthremade_lang') || 'en').toLowerCase()
      document.documentElement.lang = currentLang
      document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr'
    } catch {
      // ignore
    }

    // 2. Define global Google Translate initialization callback
    window.googleTranslateElementInit = function () {
      try {
        if (window.google?.translate?.TranslateElement) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: 'en,ar,ru,fr,bn,ro,pt,es,sw,uz,de,tr',
              autoDisplay: false,
            },
            'google_translate_element'
          )

          // Once initialized, attempt to sync active language
          setTimeout(() => {
            if (currentLang && currentLang !== 'en') {
              triggerGoogleTranslate(currentLang)
            }
          }, 300)
        }
      } catch (err) {
        console.warn('Google Translate initialization:', err)
      }
    }

    // 3. Load script if not already added
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script')
      script.id = 'google-translate-script'
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)
    }

    // 4. Listen for language changes dispatched anywhere in the app
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      const newLang = customEvent.detail?.toLowerCase() || 'en'
      currentLang = newLang
      
      // Attempt immediate trigger
      const triggered = triggerGoogleTranslate(newLang)
      
      // If combo wasn't loaded yet, retry a few times
      if (!triggered && newLang !== 'en') {
        let attempts = 0
        const interval = setInterval(() => {
          attempts++
          if (triggerGoogleTranslate(newLang) || attempts > 10) {
            clearInterval(interval)
          }
        }, 500)
      }
    }

    window.addEventListener('healthremade_lang_changed', handleLangChange)
    return () => window.removeEventListener('healthremade_lang_changed', handleLangChange)
  }, [])

  // Re-sync on route navigation
  useEffect(() => {
    try {
      const saved = localStorage.getItem('healthremade_lang')
      if (saved && saved !== 'en') {
        setTimeout(() => triggerGoogleTranslate(saved), 200)
      }
    } catch {
      // ignore
    }
  }, [pathname])

  return (
    <div id="google_translate_element" aria-hidden="true" />
  )
}
