import HeroContact from '@/components/shared/hero-contact'
import ProjectGrid from '@/components/shared/project-grid'
import { ProjectCardProps } from '@/types/projects.type'

const heroProjects: ProjectCardProps[] = [
  {
    id: 1,
    slug: 'proiect-1',
    imageSrc: '/hero-img1.png',
    title: 'Project 1',
  },
  {
    id: 2,
    slug: 'proiect-2',
    imageSrc: '/hero-img2.png',
    title: 'Project 2',

  },
  {
    id: 3,
    slug: 'proiect-3',
    imageSrc: '/hero-img3.png',
    title: 'Project 3',
  },
]

export default function Hero() {
  return (
    <section>
      <ProjectGrid projects={heroProjects} />
      <HeroContact />
    </section>
  )
}