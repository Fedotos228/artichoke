"use client"

import gsap from 'gsap'
import Image from 'next/image'
import { useEffect, useRef } from 'react'

type AboutContentType = {
  slug: string
  heading: string
  paragraphs: string[]
  image: {
    src: string
    alt: string
  }
}

const aboutContent: AboutContentType[] = [
  {
    slug: '#philosophy',
    heading: 'Our Philosophy',
    paragraphs: [
      'At Artichoke Interiors, we believe that interior design is a balance between functionality, emotion, and identity. Our philosophy is inspired by the beauty of natural forms and complex structures that reveal their essence through harmony and proportion. Each space has its own depth—subtle layers of light, texture, and emotion that, when carefully combined, create an authentic atmosphere.',
      'Artichoke Interiors symbolizes the subtle complexity of design: harmonious layers, attention to detail, and depth, values that we bring to every project. We are guided by principles of visual clarity, functional simplicity, and emotional comfort, creating interiors that inspire, calm, and reflect the personality of those who live in them.'
    ],
    image: {
      src: '/Ivan.jpg',
      alt: 'Ivan Railean',
    }
  },
  {
    slug: '#services',
    heading: 'About our services',
    paragraphs: [
      'At Artichoke Interiors, we offer comprehensive interior design services tailored to your needs.',
      'We create customized concepts for homes and commercial spaces, emphasizing the aesthetics, functionality, and personality of each project.',
      'We take care of the implementation of the project from A to Z, ensuring a coherent and harmonious design of each space, whether residential or commercial.',
      'We also offer personalized advice, solutions, and recommendations for every detail, so that each element has a purpose and contributes to the balance and harmony of the entire space.'
    ],
    image: {
      src: '/about.jpg',
      alt: 'About',
    }
  }
]

export default function About() {
  const rootRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    const blocks = Array.from(rootRef.current.querySelectorAll('.about-block')) as HTMLElement[]

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
    }, { threshold: 0.8 })

    // Prepare blocks and observe
    blocks.forEach((b) => {
      gsap.set(b, { opacity: 0, y: 24 })
      observer.observe(b)
    })

    return () => {
      observer.disconnect()
      gsap.killTweensOf(blocks)
    }
  }, [])

  return (
    <section ref={rootRef} className="mx-auto px-6 py-12 max-w-7xl">
      {aboutContent.map((section, index) => (
        <div id={section.slug} key={index} className="about-block grid gap-8 md:grid-cols-2 items-center mb-12">
          <div className="w-full order-class">
            <div className="relative w-full image-height">
              <Image
                src={section.image.src}
                alt={section.image.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="text-container">
              <h5 className="uppercase mb-6 text-sm tracking-widest">{section.heading}</h5>
              {section.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="mb-4 leading-relaxed text-gray-700">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
