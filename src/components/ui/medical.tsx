'use client'

import { useState } from 'react'
import { cn, formatPriceRange, type Currency, CURRENCY_LABELS } from '@/lib/utils'
import { Badge } from './primitives'
import { CheckCircle2, AlertTriangle } from 'lucide-react'

// ─── PriceRange ────────────────────────────────────────────────────────
interface PriceRangeProps {
  minInr: number
  maxInr: number
  lastVerifiedAt?: string | null
  className?: string
}

export function PriceRange({ minInr, maxInr, lastVerifiedAt, className }: PriceRangeProps) {
  const [currency, setCurrency] = useState<Currency>('INR')
  const currencies: Currency[] = ['INR', 'USD', 'AED', 'GBP', 'EUR']

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex flex-wrap gap-1">
        {currencies.map((c) => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            className={cn(
              'rounded px-2 py-0.5 text-xs font-medium transition-colors',
              currency === c
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="text-xl font-bold text-foreground">
        {formatPriceRange(minInr, maxInr, currency)}
      </p>
      {lastVerifiedAt ? (
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3 w-3 text-success" />
          Verified {new Date(lastVerifiedAt).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
        </p>
      ) : (
        <p className="flex items-center gap-1 text-xs text-amber-700">
          <AlertTriangle className="h-3 w-3" />
          Price not yet independently verified
        </p>
      )}
    </div>
  )
}

// ─── AccreditationBadge ────────────────────────────────────────────────
interface AccreditationBadgeProps {
  type: 'NABH' | 'JCI' | 'NABL'
  regNumber?: string | null
  className?: string
}

const ACCRED_LINKS: Record<string, string> = {
  NABH: 'https://www.nabh.co/AccreditedHospitals.aspx',
  JCI: 'https://www.jointcommissioninternational.org/who-we-are/accredited-organizations/',
  NABL: 'https://www.nabl-india.org',
}

export function AccreditationBadge({ type, regNumber, className }: AccreditationBadgeProps) {
  return (
    <a
      href={regNumber ? ACCRED_LINKS[type] : '#'}
      target={regNumber ? '_blank' : undefined}
      rel="noopener noreferrer"
      title={regNumber ? `Verify ${type} accreditation` : `${type} registration number not yet confirmed`}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
        regNumber
          ? 'border-brand-600 bg-brand-50 text-brand-700 hover:bg-brand-100'
          : 'border-slate-300 bg-slate-50 text-slate-500 cursor-not-allowed',
        className
      )}
    >
      <span className={cn('h-2 w-2 rounded-full', regNumber ? 'bg-brand-500' : 'bg-slate-400')} />
      {type}
      {regNumber ? ' ✓' : ' (unconfirmed)'}
    </a>
  )
}

// ─── NPSScore ──────────────────────────────────────────────────────────
interface NPSScoreProps {
  score: number | null
  responseCount: number | null
  className?: string
}

export function NPSScore({ score, responseCount, className }: NPSScoreProps) {
  if (score === null) {
    return (
      <span className={cn('text-xs text-muted-foreground', className)}>
        No verified outcomes yet
      </span>
    )
  }

  const color =
    score >= 70 ? 'text-success' : score >= 40 ? 'text-amber-600' : 'text-destructive'

  return (
    <div className={cn('flex items-baseline gap-1', className)}>
      <span className={cn('text-2xl font-bold', color)}>+{score}</span>
      <span className="text-xs text-muted-foreground">NPS</span>
      {responseCount && (
        <span className="text-xs text-muted-foreground">({responseCount.toLocaleString()} verified surveys)</span>
      )}
    </div>
  )
}

// ─── OutcomeStat ───────────────────────────────────────────────────────
interface OutcomeStatProps {
  label: string
  value: string
  subtext?: string
  verified?: boolean
  className?: string
}

export function OutcomeStat({ label, value, subtext, verified = false, className }: OutcomeStatProps) {
  return (
    <div className={cn('text-center', className)}>
      <div className="text-3xl font-bold text-brand-700 md:text-4xl">{value}</div>
      <div className="mt-1 text-sm font-medium text-foreground">{label}</div>
      {subtext && <div className="text-xs text-muted-foreground">{subtext}</div>}
      {verified && (
        <Badge variant="verified" className="mt-1.5">
          Verified
        </Badge>
      )}
    </div>
  )
}
