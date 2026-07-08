"use client"

import { AboutHomeACF } from '@/types/home.types'
import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function About({
  about
}: {
  about?: AboutHomeACF[]
}) {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!about || !rootRef.current) return
    const blocks = Array.from(rootRef.current.querySelectorAll('.about-block')) as HTMLElement[]

    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      blocks.forEach((b) => gsap.set(b, { opacity: 1, y: 0 }))
      return
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            entry.target,
            { y: 88, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          )
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' })

    blocks.forEach((b) => {
      gsap.set(b, { opacity: 0, y: 88 })
      observer.observe(b)
    })

    return () => {
      observer.disconnect()
      gsap.killTweensOf(blocks)
    }
  }, [about])

  if (!about) return null
  

  return (
    <section ref={rootRef} id="about" className="mx-auto px-6 py-12 max-w-7xl">
      {about.map((block, index) => (
        <div id={block.slug?.replace(/^#/, '')} key={index} className="about-block grid gap-8 md:grid-cols-2 items-center mb-12">
          <div className="w-full order-class">
            <div className="relative w-full image-height">
              <Image
                src={block.image.source_url}
                alt={block.image.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="w-full">
            {block.content && (
              <div className="about-text-container" dangerouslySetInnerHTML={{ __html: block.content }} />
            )}
          </div>
        </div>
      ))}
    </section>
  )
}
