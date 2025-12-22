import type { Locale } from '@/i18n-config'

const WP_BASE_URL = process.env.WP_URL as string

async function wpFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  baseUrl: string = WP_BASE_URL,
  lang?: Locale
): Promise<T> {
  if (lang) {
    const separator = endpoint.includes('?') ? '&' : '?';
    endpoint += `${separator}lang=${lang}`;
  }
  
  let url = `${baseUrl}${endpoint}`

  const res = await fetch(url, {
    ...options,
    next: { revalidate: 60 },
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    }
  })

  if (!res.ok) {
    console.error(`WP Fetch Error:, ${res.status}, ${url}`)
    throw new Error(`Failed WP fetch: ${res.status} ${res.statusText} - ${url}`)
  }

  return res.json()
}


export { wpFetch }

