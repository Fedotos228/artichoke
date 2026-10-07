'use client'

import useFancybox from '@/hooks/useFancybox'
import { cn } from '@/lib/utils'
import { ProjectAlbum, ProjectGallery as ProjectGalleryType } from '@/types/projects.type'
import { FeaturedMediaWP } from '@/types/wp.types'
import Image from 'next/image'
import Link from 'next/link'
import { useState, type Ref } from 'react'

// ACF returns `image: ""` for repeater rows added without picking an image —
// skip them, otherwise the Link below gets an undefined href and crashes the page.
const hasSource = (image: FeaturedMediaWP | null | undefined): image is FeaturedMediaWP => !!image?.source_url

export default function ProjectGallery({
  gallery,
  albums,
}: {
  gallery?: ProjectGalleryType[]
  albums?: ProjectAlbum[] | null
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [fancyboxref] = useFancybox({
    Thumbs: {
      autoStart: false,
    },
  })

  // Albums win when the project has any (with images); otherwise fall back to the
  // older single `gallery` repeater, shown without tabs.
  const filledAlbums = (albums ?? [])
    .map((album) => ({ title: album.title, images: (album.images ?? []).filter(hasSource) }))
    .filter((album) => album.images.length > 0)
  const sets = filledAlbums.length > 0
    ? filledAlbums
    : [{ title: '', images: (gallery ?? []).map(({ image }) => image).filter(hasSource) }]

  const current = Math.min(activeIndex, sets.length - 1)
  const images = sets[current].images

  if (images.length === 0) {
    return null
  }

  return (
    <div>
      {sets.length > 1 && (
        <div className='flex flex-wrap gap-x-8 gap-y-3 mb-8'>
          {sets.map((album, index) => (
            <button
              key={index}
              type='button'
              aria-pressed={index === current}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'cursor-pointer border-b-2 border-transparent pb-1 opacity-60 transition hover:opacity-100',
                index === current && 'border-current opacity-100'
              )}
            >
              {album.title || `${index + 1}`}
            </button>
          ))}
        </div>
      )}

      <div ref={fancyboxref as unknown as Ref<HTMLDivElement>} className='grid grid-cols-2 gap-5'>
        {images.map((image, index) => {
          // With an odd count the last image would sit alone in its row — let it span both columns.
          const isWide = images.length % 2 === 1 && index === images.length - 1

          return (
            <Link
              key={`${current}-${image.id}-${index}`}
              href={image.source_url}
              // One Fancybox group per album, so the lightbox only pages through the open album.
              data-fancybox={`gallery-${current}`}
              data-caption={image.alt_text || ''}
              // Fixed aspect ratios keep every tile the same size regardless of the source image;
              // the wide tile (2 columns + gap) uses 16:9 so it matches the height of the others.
              className={cn(
                'relative block w-full cursor-pointer overflow-hidden aspect-65/74',
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
    </div>
  )
}
