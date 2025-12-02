"use client"

import { ProjectCardProps } from '@/types/projects.type'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import ProjectCard from './project-card'

export default function ProjectGrid({ projects }: { projects?: ProjectCardProps[] }) {
  const gridRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const cards = Array.from(gridRef.current.querySelectorAll(':scope > *')) as HTMLElement[]
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      cards.forEach((c) => gsap.set(c, { opacity: 1, y: 0 }))
      return
    }

      const observer = new IntersectionObserver((entries, obs) => {
        const visible = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement)
        if (visible.length === 0) return

        gsap.fromTo(
          visible,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08 }
        )

        visible.forEach((t) => obs.unobserve(t))
      }, { threshold: 0, rootMargin: '0px 0px -10% 0px' })

    cards.forEach((c) => {
      gsap.set(c, { opacity: 0, y: 24 })
      observer.observe(c)
    })

    return () => {
      observer.disconnect()
      gsap.killTweensOf(cards)
    }
  }, [projects])

  return (
    <div ref={gridRef} className='grid grid-cols-1 md:grid-cols-3 gap-0.5'>
      {projects?.map((project) => (
        <ProjectCard
          key={project.id}
          card={project}
        />
      ))}
    </div>
  )
}
