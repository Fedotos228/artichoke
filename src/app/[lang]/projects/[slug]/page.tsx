import ProjectDescription from '@/components/pages/project-single/project-description'
import ProjectGallery from '@/components/pages/project-single/project-gallery'
import ProjectHero from '@/components/pages/project-single/project-hero'
import { wpFetch } from '@/lib/wpClient'
import { getSingleProject } from '@/services/projects.service'

type StaticParamsTypes = Array<{ slug: string }>

export async function generateStaticParams(): Promise<StaticParamsTypes> {
  const posts = await wpFetch<StaticParamsTypes>('/projects?_fields=slug')

  return posts.map((post) => ({
    slug: post.slug
  }))
}

export default async function ProjectSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getSingleProject(slug)

  const {
    title: {
      rendered: title
    },
    featured_media: thumbnail,
    content: content,
    acf: {
      details,
      gallery
    }
  } = project

  return (
    <>
      <ProjectHero title={title} thumbnail={thumbnail} />
      <div className='max-w-[1194px] mx-auto px-4 py-20'>
        <ProjectDescription content={content} details={details} />
        <ProjectGallery gallery={gallery} />
      </div>
    </>
  )
}
