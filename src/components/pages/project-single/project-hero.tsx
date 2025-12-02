import paths from '@/lib/utils/paths'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function ProjectHero({
  title,
  thumbnail,
}: {
  title: string,
  thumbnail: string
}) {
  return (
    <div
      style={{
        background: `url(${thumbnail}) center center / cover no-repeat`,
      }}
      className='w-full'
    >
      <div className='flex justify-center h-dvh flex-col max-w-[1194px] 2xl:max-w-[1360px] mx-auto'>
        <h1 className='text-background'>{title}</h1>

        <Link href={paths.projects()} className='inline-flex items-center gap-3 text-background uppercase font-medium mt-6 group hover:underline'>
          <ChevronLeft size={24} className='inline-block group-hover:-translate-x-1 transition duration-75' />
          Back to Projects
        </Link>
      </div>
    </div>
  )
}
