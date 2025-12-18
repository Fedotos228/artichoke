import { WProjectsCard } from './projects.type'
import { WPImages, WPLink, WPRendered } from './wp.types'

export interface WPHomePage {
  id: string
  slug: string
  title: WPRendered
  acf: HomeACF
}

export interface HomeACF {
  about_block: AboutHomeACF[]
  socials: SocialsHomeACF[]
  phone: PhoneHomeACF
  email: string
  video: WPImages
  home_projects: WProjectsCard[]
  title: string
}

export interface AboutHomeACF {
  slug: string
  image: WPImages
  content: string
}

export interface SocialsHomeACF {
  icon: WPImages
  link: WPLink
}

export interface PhoneHomeACF {
  number: string
  time: string
}