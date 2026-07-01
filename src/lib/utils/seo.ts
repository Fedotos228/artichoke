import { i18n, Locale } from '@/i18n-config'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://artichoke-interiors.com').replace(/\/$/, '')

export const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  ro: 'ro_RO',
  ru: 'ru_RU',
}

export function buildAlternates(lang: Locale, path: string) {
  const cleanPath = path === '/' ? '' : path

  const languages = Object.fromEntries(
    i18n.locales.map((locale) => [locale, `${SITE_URL}/${locale}${cleanPath}`])
  ) as Record<Locale, string>

  return {
    canonical: `${SITE_URL}/${lang}${cleanPath}`,
    languages: {
      ...languages,
      'x-default': `${SITE_URL}/${i18n.defaultLocale}${cleanPath}`,
    },
  }
}

const namedHtmlEntities: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
}

// WordPress `rendered` fields carry HTML-escaped text (e.g. `&#8217;`, `&amp;`),
// but <title>/meta tag content is plain text, so entities must be decoded first.
export function decodeHtmlEntities(value: string): string {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (/^#x/i.test(entity)) {
      const code = parseInt(entity.slice(2), 16)
      return Number.isNaN(code) ? match : String.fromCodePoint(code)
    }
    if (entity.startsWith('#')) {
      const code = parseInt(entity.slice(1), 10)
      return Number.isNaN(code) ? match : String.fromCodePoint(code)
    }
    return namedHtmlEntities[entity.toLowerCase()] ?? match
  })
}
