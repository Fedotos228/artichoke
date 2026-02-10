import About from '@/components/pages/home/about'
import Hero from '@/components/pages/home/hero'
import HomeProjects from '@/components/pages/home/projects'
import Loader from '@/components/shared/loader'
import { Locale } from '@/i18n-config'
import { getHomePage } from '@/services/home.service'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { Suspense } from 'react'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://artichoke-interiors.com'),
  title: {
    default: 'Artichoke Interiors',
    template: "%s | Artichoke Interiors"
  },
  description: "Artichoke Interiors is an interior design studio creating personalized residential and commercial spaces focused on harmony, functionality, and emotional comfort.",
  openGraph: {
    siteName: 'Artichoke',
    url: process.env.SITE_URL || 'https://artichoke-interiors.com',
    type: 'website',
    title: 'Artichoke',
    locale: 'en_US',
    description: 'Artichoke Interiors is an interior design studio creating personalized residential and commercial spaces focused on harmony, functionality, and emotional comfort.',
    images: [
      {
        url: '/artichoke-logo.svg',
        width: 1200,
        height: 630,
        alt: 'Artichoke',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artichoke',
    description: 'Artichoke Interiors is an interior design studio creating personalized residential and commercial spaces focused on harmony, functionality, and emotional comfort.',
    images: ['/artichoke-logo.svg'],
  },
  keywords: [
    'IR INTERIORS STUDIO',
    'IR INTERIORS ',
    'IR STUDIO',
    'Ivan Railean',
    'IVAN RAILEAN',
    'Artichoke',
    'Artichoke Studio',
    'Artichoke Interiors',
    'interior design',
    'interior design studio',
    'interior design firm',
    'interior design company',
    'interior design agency',
    'interior design services',
    'modern interior design',
    'custom interior design',
    'residential interior design',
    'commercial interior design'
  ],
  robots: {
    index: true,
    follow: true
  }
}

export default async function Home() {
  const cookieLocale = (await cookies()).get('locale')?.value as Locale
  const page = await getHomePage(cookieLocale)

  const acf = page.acf

  return (
    <Suspense fallback={<Loader />}>
      <Hero
        video={acf.video}
        poster={acf.poster}
        phone={acf.phone}
        email={acf.email}
        socials={acf.socials}
        slogan={acf.slogan}
      />
      <About about={acf.about_block} />
      <HomeProjects projects={acf.home_projects} title={acf.title} />
    </Suspense>
  )
}
