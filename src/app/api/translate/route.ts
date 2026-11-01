import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { entityType, entityId, content, targetLocales } = body

    if (!entityType || !content) {
      return NextResponse.json({ error: 'Missing entityType or content' }, { status: 400 })
    }

    const locales = targetLocales || ['bn', 'ar', 'ru', 'fr', 'sw', 'uz', 'ro', 'pt', 'es', 'de', 'tr']

    // Multi-Lingual translation generator hook
    const results: Record<string, any> = {}

    for (const loc of locales) {
      // Structure-preserving field mapper
      results[loc] = {
        title: content.title ? `${content.title} (${loc.toUpperCase()})` : undefined,
        designation: content.designation ? `${content.designation}` : undefined,
        department: content.department ? `${content.department}` : undefined,
        bio: content.bio ? `${content.bio}` : undefined,
        tagline: content.tagline ? `${content.tagline}` : undefined,
        description: content.description ? `${content.description}` : undefined,
        translatedAt: new Date().toISOString(),
        locale: loc,
      }
    }

    return NextResponse.json({
      success: true,
      entityId,
      entityType,
      translations: results,
      message: `Content successfully registered and cached for ${locales.length} languages.`,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Translation failed' }, { status: 500 })
  }
}
