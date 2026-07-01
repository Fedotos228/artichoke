import { Locale } from '@/i18n-config'
import { wpFetch } from '@/lib/wpClient'
import { ProjectSlugTypes, WPProjectSEOPromise, WProjectsCard, WProjectSingle } from '@/types/projects.type'

async function getAllProjects(lang: Locale): Promise<WProjectsCard[]> {
  const res = await wpFetch<WProjectsCard[]>('/projects?_fields=id,slug,title,featured_media', {}, undefined, lang)

  if (!res || res.length === 0) throw new Error('No projects found')

  return res
}

async function getSingleProject(slug: string, lang: Locale): Promise<WProjectSingle> {
  const res = await wpFetch<WProjectSingle[]>(`/projects?slug=${slug}&_fields=id,slug,title,content,featured_media,acf`, {}, undefined, lang)
  const project = res[0]

  if (!res || res.length === 0) throw new Error('No projects found')

  return project
}

async function getSingleProjectMetadata(slug: string, lang?: Locale): Promise<WPProjectSEOPromise> {
  const res = await wpFetch<WPProjectSEOPromise[]>(`/projects?slug=${slug}&_fields=title,featured_media.source_url,acf.short_description`, {}, undefined, lang)
  const project = res[0]

  if (!project) throw new Error('Project metadata not found')

  return project
}

async function getProjectsSlug(lang?: Locale): Promise<ProjectSlugTypes> {
  const res = await wpFetch<ProjectSlugTypes>(`/projects?_fields=slug`, {}, undefined, lang)

  if (!res || res.length === 0) throw new Error('Project slug not found')

  return res
}

export { getAllProjects, getProjectsSlug, getSingleProject, getSingleProjectMetadata }

