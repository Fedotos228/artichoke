import { i18n } from '@/i18n-config'
import { SITE_URL } from '@/lib/utils/seo'
import { getProjectsSlug } from '@/services/projects.service'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of i18n.locales) {
    let projects: Awaited<ReturnType<typeof getProjectsSlug>> = []
    try {
      projects = await getProjectsSlug(locale)
    } catch (error) {
      // A temporary WP outage shouldn't fail the whole build/deploy —
      // ship the sitemap with what we have (home + projects listing).
      console.error(`sitemap: failed to fetch project slugs for "${locale}"`, error)
    }

    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: locale === i18n.defaultLocale ? 1 : 0.9,
    })

    entries.push({
      url: `${SITE_URL}/${locale}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    })

    projects.forEach((project) => {
      entries.push({
        url: `${SITE_URL}/${locale}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    })
  }

  return entries
}
