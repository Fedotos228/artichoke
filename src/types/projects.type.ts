import { FeaturedMediaWP, WPRendered } from './wp.types'

export interface WProjectsCard {
  id: number
  slug: string
  title: WPRendered
  featured_media: FeaturedMediaWP
}

export interface WPProjectSEOPromise {
  title: WPRendered
  featured_media: {
    source_url: string
    alt_text?: string
    media_details?: {
      width: number
      height: number
    }
  }
  acf: {
    short_description: string
  }
}

export interface WProjectSingle extends WProjectsCard {
  content: WPRendered,
  acf: {
    details: ProjectDetails[]
    gallery: ProjectGallery[]
    short_description: string
  }
}

export interface ProjectDetails {
  value: string
  label: string
}

export interface ProjectGallery {
  image: FeaturedMediaWP
}

export type ProjectSlugTypes = Array<{ slug: string }>
