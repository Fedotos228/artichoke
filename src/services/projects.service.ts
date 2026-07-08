import { Locale } from '@/i18n-config'
import { wpFetch } from '@/lib/wpClient'
import { ProjectSlugTypes, WPProjectSEOPromise, WProjectsCard, WProjectSingle } from '@/types/projects.type'
import { FeaturedMediaWP } from '@/types/wp.types'

type WithMediaId<T> = Omit<T, 'featured_media'> & { featured_media: number }

const MEDIA_FIELDS = 'id,source_url,alt_text,media_details.width,media_details.height'

// The WP `projects` endpoint only ever returns the featured image as a bare
// attachment ID (WP core default) — fetch the actual image data separately
// via the standard /media endpoint rather than relying on any custom field
// expansion that may or may not be active on the WP install.
async function getFeaturedMedia(id: number, lang?: Locale): Promise<FeaturedMediaWP> {
  return wpFetch<FeaturedMediaWP>(`/media/${id}?_fields=${MEDIA_FIELDS}`, {}, undefined, lang, ['projects'])
}

async function getFeaturedMediaMap(ids: number[], lang?: Locale): Promise<Record<number, FeaturedMediaWP>> {
  const uniqueIds = Array.from(new Set(ids))
  if (uniqueIds.length === 0) return {}

  const media = await wpFetch<FeaturedMediaWP[]>(`/media?include=${uniqueIds.join(',')}&_fields=${MEDIA_FIELDS}`, {}, undefined, lang, ['projects'])

  return Object.fromEntries(media.map((item) => [item.id, item]))
}

async function getAllProjects(lang: Locale): Promise<WProjectsCard[]> {
  const res = await wpFetch<WithMediaId<WProjectsCard>[]>('/projects?_fields=id,slug,title,featured_media&orderby=date&order=desc', {}, undefined, lang, ['projects'])

  if (!res || res.length === 0) throw new Error('No projects found')

  const mediaMap = await getFeaturedMediaMap(res.map((project) => project.featured_media), lang)

  return res.map((project) => ({ ...project, featured_media: mediaMap[project.featured_media] }))
}

async function getSingleProject(slug: string, lang: Locale): Promise<WProjectSingle> {
  const res = await wpFetch<WithMediaId<WProjectSingle>[]>(`/projects?slug=${slug}&_fields=id,slug,title,content,featured_media,acf`, {}, undefined, lang, ['projects', `project:${slug}`])
  const project = res[0]

  if (!res || res.length === 0) throw new Error('No projects found')

  const featured_media = await getFeaturedMedia(project.featured_media, lang)

  return { ...project, featured_media }
}

async function getSingleProjectMetadata(slug: string, lang?: Locale): Promise<WPProjectSEOPromise> {
  const res = await wpFetch<WithMediaId<WPProjectSEOPromise>[]>(`/projects?slug=${slug}&_fields=title,featured_media,acf.short_description`, {}, undefined, lang, ['projects', `project:${slug}`])
  const project = res[0]

  if (!project) throw new Error('Project metadata not found')

  const featured_media = await getFeaturedMedia(project.featured_media, lang)

  return { ...project, featured_media }
}

async function getProjectsSlug(lang?: Locale): Promise<ProjectSlugTypes> {
  const res = await wpFetch<ProjectSlugTypes>(`/projects?_fields=slug&orderby=date&order=desc`, {}, undefined, lang, ['projects'])

  if (!res || res.length === 0) throw new Error('Project slug not found')

  return res
}

export { getAllProjects, getProjectsSlug, getSingleProject, getSingleProjectMetadata }
