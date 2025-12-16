import ProjectDescription from '@/components/pages/project-single/project-description'
import ProjectGallery from '@/components/pages/project-single/project-gallery'
import ProjectHero from '@/components/pages/project-single/project-hero'
import { wpFetch } from '@/lib/wpClient'
import { getSingleProject, getSingleProjectMetadata } from '@/services/projects.service'
import { Metadata } from 'next'
import Script from 'next/script'

type StaticParamsTypes = Array<{ slug: string }>

export async function generateStaticParams(): Promise<StaticParamsTypes> {
  const posts = await wpFetch<StaticParamsTypes>('/projects?_fields=slug')

  return posts.map((post) => ({
    slug: post.slug
  }))
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const { slug } = await params
  const project = await getSingleProjectMetadata(slug)

  return {
    title: project.title.rendered,
    description: project.acf.short_description,
    openGraph: {
      title: project.title.rendered,
      description: project.acf.short_description || '',
      images: [project.featured_media.source_url]
    }
  }
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
      gallery,
      short_description
    }
  } = project

  return (
    <>
      <ProjectHero title={title} thumbnail={thumbnail} />
      <div className='max-w-[1194px] mx-auto px-4 py-20'>
        <ProjectDescription content={content} details={details} />
        <ProjectGallery gallery={gallery} />
      </div>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: title,
            description: short_description,
            image: thumbnail,
            author: {
              "@type": "Person",
              name: "Ivan Railean"
            }
          })
        }}
      />
    </>
  )
}
