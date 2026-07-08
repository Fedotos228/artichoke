import ProjectGrid from '@/components/shared/project-grid'
import { Button } from '@/components/ui/button'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/utils/get-dictionary'
import paths from '@/lib/utils/paths'
import { WProjectsCard } from '@/types/projects.type'
import Link from 'next/link'

export default async function HomeProjects({ projects, title, lang }: { projects?: WProjectsCard[], title: string, lang: Locale }) {
  const dictionary = await getDictionary(lang)

  return (
    <div className='pb-10 xl:pb-[60px]' id='projects'>
      <h2 className='text-center mb-14 py-3' dangerouslySetInnerHTML={{ __html: title}} />

      <ProjectGrid projects={projects} lang={lang} />

      <div className='inline-flex justify-center w-full mt-10 px-4'>
        <Button asChild variant={'outline'}>
          <Link href={`/${lang}${paths.projects()}`}>{dictionary.projects.seeProject}</Link>
        </Button>
      </div>
    </div>
  )
}