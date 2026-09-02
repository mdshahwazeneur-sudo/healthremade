import type { Metadata } from 'next'
import Link from 'next/link'
import { Button, Card, CardContent } from '@/components/ui/primitives'

export const metadata: Metadata = {
  title: 'Create an account | healthremade',
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Link href="/" className="text-xl font-bold">
              health<span className="text-brand-600">remade</span>
            </Link>
            <h1 className="mt-4 text-2xl font-bold text-foreground">Create your account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Free to register. Required only to send enquiries or book — browsing prices and hospital listings is open to all.
            </p>
          </div>

          {/* Supabase auth UI will replace this form */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-1">First name</label>
                <input id="firstName" type="text" className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-1">Last name</label>
                <input id="lastName" type="text" className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600" />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input id="email" type="email" className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-foreground mb-1">Country of residence</label>
              <input id="country" type="text" className="w-full rounded-lg border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600" placeholder="e.g. United Kingdom" />
            </div>
            <Button size="lg" className="w-full" disabled>
              Create account (auth coming soon)
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700">Sign in</Link>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By registering, you agree to our{' '}
            <Link href="/terms" className="underline">Terms</Link> and{' '}
            <Link href="/privacy" className="underline">Privacy Policy</Link>.
            We never share your data with hospitals without your explicit consent.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
