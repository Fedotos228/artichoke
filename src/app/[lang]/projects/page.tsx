import ProjectGrid from '@/components/shared/project-grid'
import { Locale } from '@/i18n-config'
import { getAllProjects } from '@/services/projects.service'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Interior design projects',
  description: 'Explore our interior design portfolio featuring residential and commercial projects defined by balance, functionality, and refined aesthetics.'
}


export default async function ProjectsPage() {
  const cookieLocale = (await cookies()).get('locale')?.value as Locale
  const projects = await getAllProjects(cookieLocale)

  return (
    <Suspense fallback={<div>Loading projects...</div>}>
    <div>
      <h2 className='text-center py-16'>Projects</h2>

      <div className='mb-0.5'>
        <ProjectGrid projects={projects} />
      </div>
    </div>
    </Suspense>
  )
}
