import ProjectGrid from '@/components/shared/project-grid'
import { ProjectCardProps } from '@/types/projects.type'

const projects: ProjectCardProps[] = [
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
  {
    id: 7,
    slug: 'proiect-4',
    imageSrc: '/project-1.jpg',
    title: 'Denumire proiect',
  },
  {
    id: 8,
    slug: 'proiect-5',
    imageSrc: '/project-2.jpg',
    title: 'Project 2',

  },
  {
    id: 9,
    slug: 'proiect-6',
    imageSrc: '/project-3.jpg',
    title: 'Project 3',
  },
]

export default function ProjectsPage() {
  return (
    <div>
      <h2 className='text-center py-16'>Projects</h2>

      <div className='mb-0.5'>
        <ProjectGrid projects={projects} />
      </div>
    </div>
  )
}
