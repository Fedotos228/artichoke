import About from '@/components/pages/home/about'
import Hero from '@/components/pages/home/hero'
import HomeProjects from '@/components/pages/home/projects'
import Loader from '@/components/shared/loader'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/utils/get-dictionary'
import { getHomePage } from '@/services/home.service'
import { Suspense } from 'react'

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: Locale }>
}>) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const page = await getHomePage()

  const acf = page.acf

  return (
    <Suspense fallback={<Loader />}>
    <div className="">
        <Hero
          video={acf.video}
          phone={acf.phone}
          email={acf.email}
          socials={acf.socials}
        />
        <About about={acf.about_block} />
        <HomeProjects projects={acf.home_projects} />
    </div>
    </Suspense>
  )
}
