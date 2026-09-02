import Link from 'next/link'
import { Search, Home, Stethoscope, Building2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/primitives'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-slate-50">
      <div className="max-w-lg w-full text-center bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/80">
        <div className="text-4xl sm:text-5xl font-black text-brand-600 mb-2">404</div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          The treatment, hospital, or page you were looking for could not be located. Explore our top medical categories below:
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 text-left">
          <Link
            href="/treatments"
            className="flex items-center gap-2.5 p-3 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-brand-50 hover:border-brand-300 transition-colors group"
          >
            <Stethoscope className="h-4 w-4 text-brand-600" />
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-brand-700">Treatments</div>
              <div className="text-[10px] text-slate-500">CABG, Knee, Liver</div>
            </div>
          </Link>

          <Link
            href="/hospitals"
            className="flex items-center gap-2.5 p-3 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-brand-50 hover:border-brand-300 transition-colors group"
          >
            <Building2 className="h-4 w-4 text-brand-600" />
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-brand-700">Hospitals</div>
              <div className="text-[10px] text-slate-500">JCI & NABH</div>
            </div>
          </Link>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-3">
          <Button variant="accent" size="sm" asChild className="font-bold">
            <Link href="/">
              <Home className="h-3.5 w-3.5 mr-1.5" /> Return to Homepage
            </Link>
          </Button>

          <Button variant="outline" size="sm" asChild className="font-semibold">
            <Link href="/pricing">
              Browse Pricing <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
