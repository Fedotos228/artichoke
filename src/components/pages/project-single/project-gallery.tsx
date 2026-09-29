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

  // ACF returns `image: ""` for repeater rows added without picking an image —
  // skip them, otherwise the Link below gets an undefined href and crashes the page.
  const images = (gallery ?? []).filter(({ image }) => image?.source_url)

  if (images.length === 0) {
    return null
  }

  return (
    <div ref={fancyboxref as unknown as Ref<HTMLDivElement>} className='grid grid-cols-2 gap-5'>
      {images.map(({ image }, index) => {
        // With an odd count the last image would sit alone in its row — let it span both columns.
        const isWide = images.length % 2 === 1 && index === images.length - 1

        return (
          <Link
            key={index}
            href={image.source_url}
            data-fancybox='gallery'
            data-caption={image.alt_text || ''}
            // Fixed aspect ratios keep every tile the same size regardless of the source image;
            // the wide tile (2 columns + gap) uses 16:9 so it matches the height of the others.
            className={cn(
              'relative block w-full cursor-pointer overflow-hidden aspect-[65/74]',
              isWide && 'md:col-span-2 md:aspect-video'
            )}
          >
            <Image
              src={image.source_url}
              alt={image.alt_text || `Gallery image ${index + 1}`}
              fill
              sizes={isWide ? '(max-width: 1194px) 100vw, 1194px' : '(max-width: 1194px) 50vw, 597px'}
              className='object-cover'
            />
          </Link>
        )
      })}
    </div>
  )
}
