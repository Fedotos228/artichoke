export interface ProjectCardProps {
  id: number
  slug: string
  imageSrc: string
  title: string
}

export interface ProjectSingle {
  id: number
  slug: string
  title: string
  thumbnail: string
  description: {
    paragraph: string[],
    details: {
      label: string
      value: string
    }[]
  }
  gallery: {
    id: number
    src: string
    alt: string
  }[]
}