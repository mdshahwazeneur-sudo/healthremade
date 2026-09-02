import type { Metadata } from 'next'
import Link from 'next/link'
import { Button, Card, CardContent } from '@/components/ui/primitives'

export const metadata: Metadata = {
  title: 'Sign in | healthremade',
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Link href="/" className="text-xl font-bold">
              health<span className="text-brand-600">remade</span>
            </Link>
            <h1 className="mt-4 text-2xl font-bold text-foreground">Sign in to your account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your enquiries, bookings, and post-op dashboard.
            </p>
          </div>

          {/* Supabase auth UI will replace this form */}
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                placeholder="••••••••"
              />
            </div>
            <Button size="lg" className="w-full" disabled>
              Sign in (auth coming soon)
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold text-brand-600 hover:text-brand-700">
              Register
            </Link>
          </div>

          <div className="mt-4 rounded-lg bg-brand-50 border border-brand-100 p-3 text-xs text-brand-700 text-center">
            Browse prices and hospital listings freely — account required only to send an enquiry or book.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
