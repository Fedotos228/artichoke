import { wpFetch } from '@/lib/wpClient'
import { WPHomePage } from '@/types/home.types'

async function getHomePage(): Promise<WPHomePage> {
  const data = await wpFetch<WPHomePage[]>('/pages?slug=home')
  const page = data[0];


  if(!data || data.length === 0) {
    throw new Error('Home page not found')
  }

  return page
}

export { getHomePage }
