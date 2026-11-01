'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  type Currency,
  getCurrencyForLanguage,
  formatPrice,
  formatPriceRange,
} from '@/lib/utils'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  format: (amountInr: number) => string
  formatRange: (minInr: number, maxInr: number) => string
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  setCurrency: () => {},
  format: (amountInr: number) => formatPrice(amountInr, 'USD'),
  formatRange: (minInr: number, maxInr: number) => formatPriceRange(minInr, maxInr, 'USD'),
})

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USD')

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('healthremade_lang')
      const savedCurrency = localStorage.getItem('healthremade_currency') as Currency | null

      if (savedCurrency) {
        setCurrencyState(savedCurrency)
      } else if (savedLang) {
        setCurrencyState(getCurrencyForLanguage(savedLang))
      } else {
        setCurrencyState('USD')
      }
    } catch {
      // ignore
    }

    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      if (customEvent.detail) {
        const mappedCurrency = getCurrencyForLanguage(customEvent.detail)
        setCurrencyState(mappedCurrency)
        try {
          localStorage.setItem('healthremade_currency', mappedCurrency)
        } catch {
          // ignore
        }
      }
    }

    window.addEventListener('healthremade_lang_changed', handleLangChange)
    return () => window.removeEventListener('healthremade_lang_changed', handleLangChange)
  }, [])

  const setCurrency = (c: Currency) => {
    setCurrencyState(c)
    try {
      localStorage.setItem('healthremade_currency', c)
    } catch {
      // ignore
    }
  }

  const format = (amountInr: number) => formatPrice(amountInr, currency)
  const formatRange = (minInr: number, maxInr: number) => formatPriceRange(minInr, maxInr, currency)

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, formatRange }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}

/**
 * Client component to display a single price reactive to the current currency/language.
 */
export function PriceText({
  amountInr,
  className = '',
}: {
  amountInr: number
  className?: string
}) {
  const { format } = useCurrency()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // SSR default is USD ($)
  const display = isClient ? format(amountInr) : formatPrice(amountInr, 'USD')

  return <span className={className}>{display}</span>
}

/**
 * Client component to display a price range reactive to the current currency/language.
 */
export function PriceRangeText({
  minInr,
  maxInr,
  className = '',
}: {
  minInr: number
  maxInr: number
  className?: string
}) {
  const { formatRange } = useCurrency()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // SSR default is USD ($)
  const display = isClient ? formatRange(minInr, maxInr) : formatPriceRange(minInr, maxInr, 'USD')

  return <span className={className}>{display}</span>
}
