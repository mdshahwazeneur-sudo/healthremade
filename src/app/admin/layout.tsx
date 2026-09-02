'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users2,
  Building2,
  Stethoscope,
  DollarSign,
  FileText,
  ShieldCheck,
  AlertTriangle,
  BarChart3,
  Building,
  Receipt,
  UserCheck,
  Menu,
  X,
  ExternalLink,
  Bell,
  Search,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { Badge } from '@/components/ui/primitives'

const ADMIN_NAV = [
  { label: 'Overview Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'AI Landing Pages', href: '/admin/landing-pages', icon: Sparkles, badge: 'AI Pipeline', badgeColor: 'bg-amber-400 text-slate-950 font-bold' },
  { label: 'Case & Lead CRM', href: '/admin/leads', icon: Users2, badge: '48' },
  { label: 'Hospitals & Accreditation', href: '/admin/hospitals', icon: Building2 },
  { label: 'Doctors & Credentials', href: '/admin/doctors', icon: Stethoscope },
  { label: 'Pricing & Version History', href: '/admin/pricing', icon: DollarSign, badge: '5 Pending' },
  { label: 'Blog & Content CMS', href: '/admin/blog', icon: FileText },
  { label: 'Reviews & Outcomes', href: '/admin/outcomes', icon: ShieldCheck, badge: '2' },
  { label: 'Disputes & SLAs', href: '/admin/disputes', icon: AlertTriangle, badge: '2 Urgent', badgeColor: 'bg-rose-500' },
  { label: 'Ads & Campaign ROI', href: '/admin/ads', icon: BarChart3 },
  { label: 'Partner Portal Queue', href: '/admin/partner-portal', icon: Building },
  { label: 'Payments & Invoicing', href: '/admin/billing', icon: Receipt },
  { label: 'Users & Permissions', href: '/admin/users', icon: UserCheck },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* ─── Mobile Header ─────────────────────────────────────── */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <img src="/images/logo.png" alt="healthremade Logo" className="h-9 w-9 object-contain rounded-lg bg-white p-0.5 shadow-2xs" />
          <span className="font-black text-sm tracking-tight text-white">
            healthremade <span className="text-amber-400 font-bold">ADMIN</span>
          </span>
        </div>
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-slate-800 text-slate-300"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ─── Sidebar ───────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:static md:w-64 shrink-0`}
      >
        <div className="p-4 space-y-5">
          {/* Logo & Platform Tag */}
          <div className="px-2">
            <Link href="/admin" className="block">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.png"
                  alt="healthremade Logo"
                  className="h-11 w-11 object-contain rounded-xl bg-white p-1 shadow-xs shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black tracking-tight text-white leading-none">
                      healthremade
                    </span>
                    <Badge variant="accent" className="text-[9px] bg-amber-400 text-slate-950 font-bold px-1 py-0.2">
                      OPS
                    </Badge>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                    Clinical Operations & CRM
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white ${
                        item.badgeColor || 'bg-slate-800 border border-slate-700 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-2.5 px-2">
            <div className="h-7 w-7 rounded-full bg-brand-500/20 border border-brand-400 text-brand-300 flex items-center justify-center text-xs font-bold">
              VS
            </div>
            <div className="text-xs">
              <div className="font-bold text-white leading-tight">Dr. Vikram Seth</div>
              <div className="text-[10px] text-emerald-400">Super Admin (Clinical)</div>
            </div>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <span>View Public Platform</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </aside>

      {/* ─── Main Content Canvas ───────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden bg-slate-900/40">
        {/* Top Header Bar */}
        <header className="hidden md:flex items-center justify-between px-6 py-3.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search patient cases, hospital tariffs, or tickets..."
                className="w-full rounded-lg border border-slate-800 bg-slate-950 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              HIPAA & NABH Audit Trail Active
            </span>

            <button
              type="button"
              className="relative p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
