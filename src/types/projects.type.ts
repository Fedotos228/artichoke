import { FeaturedMediaWP, WPRendered } from './wp.types'

export interface WProjectsCard {
  id: number
  slug: string
  title: WPRendered
  featured_media: FeaturedMediaWP
}

export interface WProjectSingle extends WProjectsCard {
  content: WPRendered,
  acf: {
    details: ProjectDetails[]
    gallery: ProjectGallery[]
  }
}

export interface ProjectDetails {
  value: string
  label: string
}

export interface ProjectGallery {
  image: FeaturedMediaWP
}
