import { wpFetch } from '@/lib/wpClient'
import { FooterSettings } from '@/types/footer.types'

export async function getFooterSettings(): Promise<FooterSettings> {
  const res = await wpFetch<FooterSettings>('/general-settings', {}, process.env.WP_OPTION_URL as string)

  if (!res) {
    throw new Error('Footer settings not found')
  }

  return res
}