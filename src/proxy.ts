import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// High-Concurrency In-Memory Sliding-Window Rate Limiter
// Prevents DDoS, brute force scrapers, and bot storms while permitting genuine patient traffic
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const WINDOW_MS = 60 * 1000 // 1 minute window
const MAX_REQUESTS_PER_MINUTE = 240 // Up to 240 requests/min per IP (ample for rapid user browsing)

// Clean up stale rate limit entries every 5 minutes to prevent memory leaks
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

  const response = NextResponse.next()

  // Add edge security headers
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
     * - favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
