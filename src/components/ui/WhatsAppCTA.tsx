'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'
import { getWhatsAppUrl, WhatsAppContext } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

interface WhatsAppCTAProps extends WhatsAppContext {
  className?: string
  label?: string
  variant?: 'primary' | 'outline' | 'pill' | 'subtle'
  size?: 'sm' | 'md' | 'lg'
}

export function WhatsAppCTA({
  className,
  label = 'Chat on WhatsApp',
  variant = 'primary',
  size = 'md',
  ...context
}: WhatsAppCTAProps) {
  const waUrl = getWhatsAppUrl(context)

  const sizeClasses = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-12 px-6 text-base gap-2.5',
  }[size]

  const variantClasses = {
    primary:
      'bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-xs active:scale-95 font-semibold',
    outline:
      'border-2 border-[#25D366] text-[#15803d] hover:bg-[#25D366]/10 font-semibold',
    pill:
      'rounded-full bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-sm font-semibold',
    subtle:
      'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-medium',
  }[variant]

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-all duration-150',
        sizeClasses,
        variantClasses,
        className
      )}
    >
      <MessageCircle className={cn('fill-current', size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4')} />
      <span>{label}</span>
    </a>
  )
}
