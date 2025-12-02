'use client'

import { i18n, type Locale } from '@/i18n-config'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Languages = () => {
  const pathname = usePathname()

  const currentLocale: Locale = (() => {
    const defaultLocale = i18n.defaultLocale
    if (!pathname) return defaultLocale
    const seg = pathname.split('/').filter(Boolean)[0] || ''
    return i18n.locales.includes(seg as Locale) ? (seg as Locale) : defaultLocale
  })()

  const redirectedPathname = (locale: Locale) => {
    const defaultLocale = i18n.defaultLocale
    if (!pathname || pathname === '/') return `/${locale}/`

    const segments = pathname.split('/').filter(Boolean)
    // If first segment is a known locale, replace it, otherwise prepend locale
    if (segments.length === 0) return `/${locale}/`

    if (i18n.locales.includes(segments[0] as Locale)) {
      segments[0] = locale
    } else {
      segments.unshift(locale)
    }

    return '/' + segments.join('/')
  }

  return (
    <div className="flex items-center md:gap-9 md:flex-row flex-col md:flex-nowrap gap-0.5">
      {i18n.locales.map((locale) => (
        <Link
          key={locale}
          href={redirectedPathname(locale)}
          className={`navItem ${locale === currentLocale ? 'active' : ''}`}
        >
          {locale}
        </Link>
      ))}
    </div>
  )
}

export default Languages