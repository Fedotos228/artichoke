'use client'

import { Locale } from '@/i18n-config'
import paths from '@/lib/utils/paths'
import { WProjectsCard } from '@/types/projects.type'
import Image from 'next/image'
import Link from 'next/link'

export default function ProjectCard({ card, lang }: { card: WProjectsCard, lang: Locale }) {
  return (
    <Link
      href={`/${lang}${paths.projectSingle(card.slug)}`}
      className='block w-full group relative cursor-pointer overflow-hidden'
    >
      <div className='relative w-full h-80 md:h-[520px]'>
        {card.featured_media?.source_url && (
        <Image
            src={card.featured_media.source_url}
            alt={card.title.rendered}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 33vw"
          quality={100}
        />
        )}

        <div className='absolute inset-0 transition-opacity duration-150 ease-out bg-linear-to-b from-black/0 to-black/60 md:opacity-0 group-hover:opacity-100' />
        <h4 className='block md:hidden group-hover:block absolute bottom-6 left-6 text-white z-20'>{card.title.rendered}</h4>
      </div>
    </Link>
  )
}