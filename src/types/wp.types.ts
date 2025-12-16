export interface WPImages {
  id: number
  source_url: string
  alt: string
}

export interface WPLink {
  title: string
  url: string
  target: string
}

export interface WPRendered {
  rendered: string
}

export interface FeaturedMediaWP {
  id: number
  date: string
  date_gmt: string
  guid: WPRendered
  modified: string
  modified_gmt: string
  slug: string
  type: string
  link: string
  title: WPRendered
  author: number
  featured_media: number
  comment_status: string
  ping_status: string
  template: string
  meta: WPRendered
  class_list: string[]
  acf: string[]
  description: WPRendered
  caption: WPRendered
  alt_text: string
  media_type: string
  mime_type: string
  media_details: {
    width: number
    height: number
    file: string
    sizes: {
      [key: string]: {
        file: string
        width: number
        height: number
        mime_type: string
        source_url: string
      }
    }
    image_meta: {
      aperture: string
      credit: string
      camera: string
      caption: string
      created_timestamp: string
      copyright: string
      focal_length: string
      iso: string
      shutter_speed: string
      title: string
      orientation: string
      keywords: string[]
    }
  }
  source_url: string
}