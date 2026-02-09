'use client'

import { WPImages } from '@/types/wp.types'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export default function HeroVideo({ video, poster }: { video: WPImages, poster: WPImages }) {
  const containerRef = useRef<HTMLHeadingElement | null>(null)
  const text = "Timeless interior architecture"

  useEffect(() => {
    // Selectăm toate span-urile (cuvintele) din interiorul h2
    if (containerRef.current) {
      const words = containerRef.current.querySelectorAll('.word')
      
      gsap.fromTo(words, 
        { 
          opacity: 0, 
          y: 20 
        }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.9,
          ease: 'power3.out',
          delay: 0.5 
        }
      )
    }
  }, [])

  return (
    <div className='2xl:h-[800px] lg:h-[600px] h-[500px] w-full relative overflow-hidden'>
      <video
        src={video.source_url}
        loop autoPlay muted playsInline
        poster={poster.source_url}
        className='w-full h-full object-cover'
      >
        <source type='video/webm' src={video.source_url} />
      </video>
      
      <div className='absolute inset-0 w-full h-full bg-foreground/40 z-10' />
      
      <h2
        ref={containerRef} 
        className='absolute text-2xl md:text-2xl lg:text-4xl z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-background w-full'
      >
        {text.split(' ').map((word, i) => (
          <span key={i} className="word inline-block mr-2">
            {word}
          </span>
        ))}
      </h2>
    </div>
  )
}