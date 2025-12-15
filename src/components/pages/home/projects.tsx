import ProjectGrid from '@/components/shared/project-grid'
import { Button } from '@/components/ui/button'
import paths from '@/lib/utils/paths'
import { WProjectsCard } from '@/types/projects.type'
import Link from 'next/link'


export default function HomeProjects({ projects }: { projects?: WProjectsCard[] }) {
  return (
    <div className='pb-10 xl:pb-[60px]' id='#projects'>
      <h2 className='text-center mb-14'>Your space deserves such <span className='italic'>beauty</span> too</h2>

      <ProjectGrid projects={projects} />

      <div className='inline-flex justify-center w-full mt-10 px-4'>
        <Button asChild variant={'outline'}>
          <Link href={paths.projects()}>See all projects</Link>
        </Button>
      </div>
    </div>
  )
}