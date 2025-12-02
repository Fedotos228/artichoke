import ProjectDescription from '@/components/pages/project-single/project-description'
import ProjectGallery from '@/components/pages/project-single/project-gallery'
import ProjectHero from '@/components/pages/project-single/project-hero'
import { ProjectSingle } from '@/types/projects.type'

const projectSingle: ProjectSingle = {
  id: 1,
  slug: 'proiect-1',
  title: 'Denumire proiect',
  thumbnail: '/project-single.jpg',
  description: {
    paragraph: [
      'A contemporary interior design project for a private residence, created as a balanced blend of modern elegance, warm minimalism, and functional sophistication.',
      'Soft geometry, muted earthy tones, and carefully layered textures form the foundation of this space. The open-plan layout unites the living room, dining area, and kitchen into a seamless environment filled with natural light. The modular sofa, sculptural lighting, and refined furniture pieces create a calm yet expressive atmosphere, emphasizing comfort without sacrificing aesthetics.',
      'This project reflects a thoughtful approach to modern living—every detail serves both visual and practical purposes. Built-in systems, hidden storage, and clean architectural lines reinforce the sense of order and spaciousness. Special attention is given to materials: natural wood, soft textiles, and matte finishes bring warmth and depth to the interior, while metal accents subtly highlight its contemporary character.',
      'The kitchen area stands out with its elegant vertical paneling, illuminated glass cabinetry, and a carefully curated palette of greys and warm neutrals. The staircase with integrated lighting becomes a key architectural feature, visually connecting the zones and adding a dynamic rhythm to the space.',
      'Overall, the interior conveys a quiet luxury—a place where clarity, comfort, and modern design coexist in perfect harmony.'
    ],
    details: [
      {
        label: 'Object',
        value: 'Three-room apartment',
      },
      {
        label: 'Location',
        value: 'Chisinau, Moldova',
      },
      {
        label: 'Year',
        value: '2023',
      },
      {
        label: 'Area',
        value: '120 sqm',
      },
    ],
  },
  gallery: [
    {
      id: 1,
      src: '/project-single-1.jpg',
      alt: 'Project image 1',
    },
    {
      id: 2,
      src: '/project-single-2.jpg',
      alt: 'Project image 2',
    },
    {
      id: 3,
      src: '/project-single-3.jpg',
      alt: 'Project image 3',
    },
    {
      id: 4,
      src: '/project-single-4.jpg',
      alt: 'Project image 4',
    },
    {
      id: 5,
      src: '/project-single-5.jpg',
      alt: 'Project image 5',
    },
    {
      id: 6,
      src: '/project-single-6.jpg',
      alt: 'Project image 6',
    },
  ]
}

export default async function page({
  params,
}: {
  params: { slug: string }

}) {
  const { slug } = await params
  const { title, thumbnail, description, gallery } = projectSingle


  return (
    <>
      <ProjectHero title={title} thumbnail={thumbnail} />
      <div className='max-w-[1194px] mx-auto px-4 py-20'>
        <ProjectDescription description={description} />
        <ProjectGallery gallery={gallery} />
      </div>
    </>
  )
}
