import { Locale } from '@/i18n-config'
import { wpFetch } from '@/lib/wpClient'
import { WPHomePage } from '@/types/home.types'

async function getHomePage(lang: Locale): Promise<WPHomePage> {
  const data = await wpFetch<WPHomePage[]>('/pages?slug=home', {}, undefined, lang, ['home'])
  const page = data[0]


  if (!data || data.length === 0) {
    throw new Error('Home page not found')
  }

  return page
}

export { getHomePage }
