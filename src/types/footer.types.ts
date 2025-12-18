export interface FooterVideo {
  ID: number
  id: number
  title: string
  filename: string
  filesize: number
  url: string
  link: string
  alt: string
  author: string
  description: string
  caption: string
  name: string
  status: string
  uploaded_to: number
  data: string
  modified: string
  menu_order: number
  mime_type: string
  type: string
  subType: string
  icon: string
  width: number
  height: number
}

export interface FooterSettings {
  video: FooterVideo
  copyright: string
}