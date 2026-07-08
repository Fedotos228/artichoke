import Loader from '@/components/shared/loader'
import ProjectGrid from '@/components/shared/project-grid'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/utils/get-dictionary'
import paths from '@/lib/utils/paths'
import { buildAlternates, ogLocaleMap, SITE_URL } from '@/lib/utils/seo'
import { getAllProjects } from '@/services/projects.service'
import { Metadata } from 'next'
import { Suspense } from 'react'

const description = 'Explore our interior design portfolio featuring residential and commercial projects defined by balance, functionality, and refined aesthetics.'

export async function generateMetadata(
  { params }: { params: Promise<{ lang: Locale }> }
): Promise<Metadata> {
  const { lang } = await params

  return {
    title: 'Artichoke Interiors projects',
    description,
    alternates: buildAlternates(lang, paths.projects()),
    openGraph: {
      title: 'Artichoke Interiors projects',
      description,
      url: `${SITE_URL}/${lang}${paths.projects()}`,
      siteName: "Artichoke Interiors",
      images: [
        {
          url: '/opengraph-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Interior design showcase',
        },
      ],
      locale: ogLocaleMap[lang],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Artichoke Interiors projects',
      description,
      images: ['/project-2.jpg', '/project-1.jpg', '/project-6.jpg'],
    },
  }
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>
}) {
  const { lang } = await params
  const projects = await getAllProjects(lang)
  const dictionary = await getDictionary(lang)

  return (
    <Suspense fallback={<Loader />}>
      <main>
        <h1 className='text-center py-16 !font-normal !text-[48px] !leading-[160%] !tracking-normal !normal-case'>{dictionary.projects.title}</h1>

        <div className='mb-0.5'>
          <ProjectGrid projects={projects} lang={lang} />
        </div>
      </main>
    </Suspense>
  )
}
