import { i18n } from '@/i18n-config'
import paths from '@/lib/utils/paths'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

function localizedPaths(path: string): string[] {
  const cleanPath = path === '/' ? '' : path
  return i18n.locales.map((locale) => `/${locale}${cleanPath}`)
}

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({})) as { type?: string, slug?: string }
  const { type, slug } = body

  const revalidated: string[] = []
  const revalidate = (path: string) => {
    revalidatePath(path)
    revalidated.push(path)
  }
  const revalidateLayouts = () => {
    // Footer renders inside the [lang] layout, so it's shared by every
    // route under that locale — purge the whole subtree, not one path.
    i18n.locales.forEach((locale) => {
      revalidatePath(`/${locale}`, 'layout')
      revalidated.push(`/${locale} (layout)`)
    })
  }

  if (type === 'home') {
    revalidateTag('home', 'max')
    localizedPaths(paths.home()).forEach(revalidate)
  } else if (type === 'project' && slug) {
    revalidateTag('projects', 'max')
    revalidateTag(`project:${slug}`, 'max')
    localizedPaths(paths.projects()).forEach(revalidate)
    localizedPaths(paths.projectSingle(slug)).forEach(revalidate)
    revalidate('/sitemap.xml')
  } else if (type === 'footer') {
    revalidateTag('footer', 'max')
    revalidateLayouts()
  } else {
    // Unknown or generic change — revalidate everything WP-backed to be safe.
    revalidateTag('home', 'max')
    revalidateTag('projects', 'max')
    revalidateTag('footer', 'max')
    localizedPaths(paths.home()).forEach(revalidate)
    localizedPaths(paths.projects()).forEach(revalidate)
    revalidate('/sitemap.xml')
    revalidateLayouts()
  }

  return NextResponse.json({ revalidated: true, paths: revalidated, now: Date.now() })
}
