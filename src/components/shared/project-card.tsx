'use client'

import paths from '@/lib/utils/paths'
import { ProjectCardProps } from '@/types/projects.type'
import Image from 'next/image'
import Link from 'next/link'

export default function ProjectCard({ card }: { card: ProjectCardProps }) {
  return (
    <Link
      href={paths.projectSingle(card.slug)}
      className='block w-full group relative cursor-pointer overflow-hidden'
    >
      <div className='relative w-full h-80 md:h-[520px]'>
        <Image
          src={card.imageSrc}
          alt={card.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 33vw"
          quality={100}
        />
        <div className='absolute inset-0 transition-opacity duration-150 ease-out bg-linear-to-b from-black/0 to-black/60 opacity-0 group-hover:opacity-100' />
        <h4 className='hidden group-hover:block absolute bottom-6 left-6 text-white z-20'>{card.title}</h4>
      </div>
    </Link>
  )
}