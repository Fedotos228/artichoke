import { wpFetch } from '@/lib/wpClient'
import { WPProjectSEOPromise, WProjectsCard, WProjectSingle } from '@/types/projects.type'

async function getAllProjects(): Promise<WProjectsCard[]> {
  const res = await wpFetch<WProjectsCard[]>('/projects?_fields=id,slug,title,featured_media')

  if (!res || res.length === 0) throw new Error('No projects found')

  return res
}

async function getSingleProject(slug: string): Promise<WProjectSingle> {
  const res = await wpFetch<WProjectSingle[]>(`/projects?slug=${slug}&_fields=id,slug,title,content,featured_media,acf`)
  const project = res[0]

  if (!res || res.length === 0) throw new Error('No projects found')

  return project
}

async function getSingleProjectMetadata(slug: string): Promise<WPProjectSEOPromise> {
  const res = await wpFetch<WPProjectSEOPromise[]>(`/projects?slug=${slug}&_fields=title,featured_media.source_url,acf.short_description`)
  const project = res[0]

  if (!project) throw new Error('Project metadata not found')

  return project
}

export { getAllProjects, getSingleProject, getSingleProjectMetadata }
