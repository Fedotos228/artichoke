import About from '@/components/pages/home/about'
import Hero from '@/components/pages/home/hero'
import HomeProjects from '@/components/pages/home/projects'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/utils/get-dictionary'

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <div className="">
      <Hero />
      <About />
      <HomeProjects />
    </div>
  );  
}
