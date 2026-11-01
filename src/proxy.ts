import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Supported non-default locales
const LOCALES = ['bn', 'ar', 'ru', 'fr', 'sw', 'uz', 'ro', 'pt', 'es', 'de', 'tr']
const LOCALE_REGEX = new RegExp(`^/(${LOCALES.join('|')})(/.*)?$`)

// High-Concurrency In-Memory Sliding-Window Rate Limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const WINDOW_MS = 60 * 1000 // 1 minute window
const MAX_REQUESTS_PER_MINUTE = 240

// Clean up stale rate limit entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [ip, data] of rateLimitMap.entries()) {
      if (now > data.resetTime) {
        rateLimitMap.delete(ip)
      }
    }
  }, 5 * 60 * 1000)
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // 1. Rate Limiting Check
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'

  const now = Date.now()
  const userRate = rateLimitMap.get(ip)

  if (!userRate || now > userRate.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS })
  } else {
    userRate.count += 1
    if (userRate.count > MAX_REQUESTS_PER_MINUTE) {
      return new NextResponse('Too Many Requests. Please slow down.', {
        status: 429,
        headers: {
          'Retry-After': '60',
          'Content-Type': 'text/plain',
        },
      })
    }
  }

  // 2. Multilingual International SEO Sub-path Rewrite
  const match = pathname.match(LOCALE_REGEX)

  if (match) {
    const locale = match[1]
    const restPath = match[2] || '/'

    const url = request.nextUrl.clone()
    url.pathname = restPath
    url.searchParams.set('lang', locale)

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-locale', locale)
    requestHeaders.set('x-original-pathname', pathname)

    const response = NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    })

    // Edge security headers & cookie
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.cookies.set('healthremade_lang', locale, { path: '/', maxAge: 31536000 })
    return response
  }

  // If URL has ?lang= parameter directly
  const langParam = searchParams.get('lang')
  if (langParam && LOCALES.includes(langParam.toLowerCase())) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-locale', langParam.toLowerCase())
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    return response
  }

  // Default response
  const response = NextResponse.next()
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, icon.png
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon.png).*)',
  ],
}
