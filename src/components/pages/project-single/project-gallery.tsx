'use client'

import useFancybox from '@/hooks/useFancybox'
import { cn } from '@/lib/utils'
import { ProjectSingle } from '@/types/projects.type'
import Image from 'next/image'
import Link from 'next/link'
import type { Ref } from 'react'

export default function ProjectGallery({ gallery }: { gallery?: ProjectSingle['gallery'] }) {
  const [fancyboxref] = useFancybox({
    Thumbs: {
      autoStart: false,
    },
  })

  if (!gallery || gallery.length === 0) {
    return null
  }

  return (
    <div ref={fancyboxref as unknown as Ref<HTMLDivElement>} className='grid grid-cols-2 md:grid-cols-2 gap-5'>
      {gallery.map((item, index) => (
        <Link
          key={index}
          href={item.src}
          data-fancybox='gallery'
          data-caption={item.alt || ''}
          className={cn('block w-full cursor-pointer', index === 0 ? 'md:col-span-2' : '', index === gallery?.length -1 ? 'md:col-span-2' : '')}
        >
          <Image
            src={item.src}
            alt={item.alt || `Gallery image ${index + 1}`}
            width={650}
            height={740}
            className='w-full h-auto object-cover'
          />
        </Link>
      ))}
    </div>
  )
}
