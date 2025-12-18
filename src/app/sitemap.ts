import { getProjectsSlug } from '@/services/projects.service'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjectsSlug()

  const siteURL = process.env.SITE_URL as string

  const homePage: MetadataRoute.Sitemap[number] = {
    url: siteURL,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  }

  const projectPage: MetadataRoute.Sitemap[number] = {
    url: `${siteURL}/projects`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }

  const projectsPages = projects.map(
    (item): MetadataRoute.Sitemap[number] => ({
      url: `${siteURL}/projects/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  )

  return [
    homePage,
    projectPage,
    ...projectsPages
  ]
}