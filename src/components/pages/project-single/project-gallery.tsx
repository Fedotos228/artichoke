'use client'

import useFancybox from '@/hooks/useFancybox'
import { cn } from '@/lib/utils'
import { ProjectGallery as ProjectGalleryType } from '@/types/projects.type'
import Image from 'next/image'
import Link from 'next/link'
import type { Ref } from 'react'

export default function ProjectGallery({ gallery }: { gallery?: ProjectGalleryType[] }) {
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
      {gallery.map(({ image }, index) => (
        <Link
          key={index}
          href={image.source_url}
          data-fancybox='gallery'
          data-caption={image.alt_text || ''}
          className={cn('block w-full cursor-pointer', index === 0 ? 'md:col-span-2' : '', index === gallery?.length -1 ? 'md:col-span-2' : '')}
        >
          <Image
            src={image.source_url}
            alt={image.alt_text || `Gallery image ${index + 1}`}
            width={650}
            height={740}
            className='w-full h-full object-cover'
          />
        </Link>
      ))}
    </div>
  )
}
