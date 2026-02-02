import Loader from '@/components/shared/loader'
import ProjectGrid from '@/components/shared/project-grid'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/utils/get-dictionary'
import { getAllProjects } from '@/services/projects.service'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Artichoke Interiors projects',
  description: 'Explore our interior design portfolio featuring residential and commercial projects defined by balance, functionality, and refined aesthetics.',
  openGraph: {
    title: 'Artichoke Interiors projects',
    description: 'Explore our interior design portfolio...',
    url: process.env.SITE_URL,
    siteName: "Artichoke Interiors",
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Interior design showcase',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artichoke Interiors projects',
    description: 'Explore our interior design portfolio...',
    images: ['/project-2.jpg', '/project-1.jpg', '/project-6.jpg'],
  },
}

export default async function ProjectsPage() {
  const cookieLocale = (await cookies()).get('locale')?.value as Locale
  const projects = await getAllProjects(cookieLocale)
  const dictionary = await getDictionary(cookieLocale)

  return (
    <Suspense fallback={<Loader />}>
      <main>
        <h2 className='text-center py-16'>{dictionary.projects.title}</h2>

        <div className='mb-0.5'>
          <ProjectGrid projects={projects} />
        </div>
      </main>
    </Suspense>
  )
}
