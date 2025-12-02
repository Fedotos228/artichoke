import ProjectGrid from '@/components/shared/project-grid'
import { Button } from '@/components/ui/button'
import paths from '@/lib/utils/paths'
import { ProjectCardProps } from '@/types/projects.type'
import Link from 'next/link'

const homeProjects: ProjectCardProps[] = [
  {
    id: 4,
    slug: 'proiect-4',
    imageSrc: '/project-1.jpg',
    title: 'Denumire proiect',
  },
  {
    id: 5,
    slug: 'proiect-5',
    imageSrc: '/project-2.jpg',
    title: 'Project 2',

  },
  {
    id: 6,
    slug: 'proiect-6',
    imageSrc: '/project-3.jpg',
    title: 'Project 3',
  },
]

export default function HomeProjects() {
  return (
    <div className='lg:pb-10 xl:pb-[60px]' id='#projects'>
      <h2 className='text-center mb-14'>Your space deserves such <span className='italic'>beauty</span> too</h2>

      <ProjectGrid projects={homeProjects} />

      <div className='inline-flex justify-center w-full mt-10'>
        <Button asChild variant={'outline'}>
          <Link href={paths.projects()}>See all projects</Link>
        </Button>
      </div>
    </div>
  )
}