import type { Locale } from '@/i18n-config'

const WP_BASE_URL = process.env.WP_URL as string
const WP_HOSTNAME = new URL(WP_BASE_URL).hostname
// The site is served over HTTPS, so any WP-sourced media must be too, even
// though WP_URL (the API base, fetched server-to-server) is plain HTTP.
const WP_ORIGIN = `https://${WP_HOSTNAME}`

// Some ACF fields (home page hero video/poster, about image, social icons) still
// carry absolute URLs baked in from local development (MAMP on localhost:8888).
// A public site linking to a visitor's own localhost triggers Chrome's Local
// Network Access permission prompt and simply fails to load for everyone else.
// Rewrite any such stale URL, and any remaining plain-HTTP media URL, to the
// real (secure) WP origin until the WP data itself is fixed.
const STALE_LOCAL_WP_URL = /https?:\/\/localhost:\d+\/artichoke/g
const INSECURE_WP_URL = new RegExp(`http://${WP_HOSTNAME}`, 'g')

function sanitizeWpUrls<T>(value: T): T {
  if (typeof value === 'string') {
    return value
      .replace(STALE_LOCAL_WP_URL, WP_ORIGIN)
      .replace(INSECURE_WP_URL, WP_ORIGIN) as unknown as T
  }
  if (Array.isArray(value)) {
    return value.map(sanitizeWpUrls) as unknown as T
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, sanitizeWpUrls(nested)])
    ) as T
  }
  return value
}

async function wpFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  baseUrl: string = WP_BASE_URL,
  lang?: Locale,
  tags?: string[]
): Promise<T> {
  if (lang) {
    const separator = endpoint.includes('?') ? '&' : '?';
    endpoint += `${separator}lang=${lang}`;
  }

  const url = `${baseUrl}${endpoint}`

  const res = await fetch(url, {
    ...options,
    next: { revalidate: 60, tags },
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    }
  })

  if (!res.ok) {
    console.error(`WP Fetch Error:, ${res.status}, ${url}`)
    throw new Error(`Failed WP fetch: ${res.status} ${res.statusText} - ${url}`)
  }

  const data = await res.json()
  return sanitizeWpUrls(data)
}


export { wpFetch }

