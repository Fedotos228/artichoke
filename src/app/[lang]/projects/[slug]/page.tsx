import ProjectDescription from '@/components/pages/project-single/project-description'
import ProjectGallery from '@/components/pages/project-single/project-gallery'
import ProjectHero from '@/components/pages/project-single/project-hero'
import Loader from '@/components/shared/loader'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/utils/get-dictionary'
import paths from '@/lib/utils/paths'
import { buildAlternates, ogLocaleMap } from '@/lib/utils/seo'
import { getSingleProject, getSingleProjectMetadata } from '@/services/projects.service'
import { ProjectSlugTypes } from '@/types/projects.type'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Script from 'next/script'
import { Suspense } from 'react'


export async function generateStaticParams() {
  const projects = await fetch(`${process.env.WP_URL}/projects?_fields=slug&lang=en`).then(res => res.json()) as ProjectSlugTypes

  return projects.map((post) => ({
    slug: post.slug
  }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: Locale, slug: string }> }
): Promise<Metadata> {
  const { lang, slug } = await params
  const project = await getSingleProjectMetadata(slug, lang)

  return {
    title: project.title.rendered,
    description: project.acf.short_description,
    alternates: buildAlternates(lang, paths.projectSingle(slug)),
    openGraph: {
      title: project.title.rendered,
      description: project.acf.short_description || '',
      locale: ogLocaleMap[lang],
      type: 'article',
      images: [project.featured_media.source_url]
    }
  }
}

export default async function ProjectSinglePage({
  params,
}: {
  params: Promise<{ lang: Locale, slug: string }>
}) {
  const { slug } = await params
  const cookieLocale = (await cookies()).get('locale')?.value as Locale
  const project = await getSingleProject(slug, cookieLocale)
  const dictionary = await getDictionary(cookieLocale)

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
    <Suspense fallback={<Loader />}>
      <main>
        <ProjectHero title={title} thumbnail={thumbnail} back={dictionary.projects.back} />
        <div className='max-w-[1194px] mx-auto px-4 py-20'>
          <ProjectDescription content={content} details={details} text={dictionary.projects.about} />
          <ProjectGallery gallery={gallery} />
        </div>
        <Script
          id="creative-work-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: title,
              description: short_description,
              image: thumbnail.source_url,
              author: {
                "@type": "Person",
                name: "Ivan Railean"
              }
            })
          }}
        />
      </main>
    </Suspense>
  )
}
