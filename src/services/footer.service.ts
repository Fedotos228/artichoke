import { wpFetch } from '@/lib/wpClient'
import { FooterVideo } from '@/types/footer.types'

export async function getFooterVideo(): Promise<FooterVideo> {
  const { video } = await wpFetch<{ video: FooterVideo }>('/general-settings', {}, process.env.WP_OPTION_URL as string)

  if (!video) {
    throw new Error('Footer video not found')
  }

  return video
}