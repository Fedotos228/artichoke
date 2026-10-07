import { FeaturedMediaWP, WPRendered } from './wp.types'

export interface WProjectsCard {
  id: number
  slug: string
  title: WPRendered
  featured_media: FeaturedMediaWP | null
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
  } | null
  acf: {
    short_description: string
  }
}

export interface WProjectSingle extends WProjectsCard {
  content: WPRendered,
  acf: {
    details: ProjectDetails[]
    gallery: ProjectGallery[]
    // `null` when the project has no albums yet — the page falls back to `gallery`.
    albums?: ProjectAlbum[] | null
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

export interface ProjectAlbum {
  title: string
  images: FeaturedMediaWP[]
}

export type ProjectSlugTypes = Array<{ slug: string }>
