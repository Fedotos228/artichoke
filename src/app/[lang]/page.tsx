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
  title: 'Artichoke / Interior Design',
  description: 'Artichoke Interiors creates personalized interior design concepts for residential and commercial spaces, balancing functionality, emotion, and identity.'
}

export default async function Home() {
  const cookieLocale = (await cookies()).get('locale')?.value as Locale
  const page = await getHomePage(cookieLocale)

  const acf = page.acf

  return (
    <Suspense fallback={<Loader />}>
      <Hero
        video={acf.video}
        phone={acf.phone}
        email={acf.email}
        socials={acf.socials}
      />
      <About about={acf.about_block} />
      <HomeProjects projects={acf.home_projects} title={acf.title} />
    </Suspense>
  )
}
