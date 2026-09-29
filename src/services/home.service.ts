import { Locale } from '@/i18n-config'
import { wpFetch } from '@/lib/wpClient'
import { WPHomePage } from '@/types/home.types'

async function getHomePage(lang: Locale): Promise<WPHomePage | null> {
  const data = await wpFetch<WPHomePage[]>('/pages?slug=home', {}, undefined, lang, ['home'])

  return data?.[0] ?? null
}

export { getHomePage }
