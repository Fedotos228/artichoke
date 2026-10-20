'use client'

import { WPImages } from '@/types/wp.types'
import gsap from 'gsap'
import { useEffect, useMemo, useRef } from 'react'

// WYSIWYG-ul din WordPress împachetează textul în <p>, care nu e valid în <h1>.
// Păstrăm formatarea inline (<strong>, <em>, <a>, <br>) și transformăm paragrafele în <br>.
function normalizeSloganHtml(html: string) {
  return html
    .replace(/<\/p>\s*<p(\s[^>]*)?>/gi, '<br />')
    .replace(/<\/?p(\s[^>]*)?>/gi, '')
    .trim()
}

// Împachetează fiecare cuvânt din nodurile text în <span class="word">, fără a strica tag-urile HTML.
// &nbsp; nu e considerat separator, astfel cuvintele legate în editor rămân împreună.
function wrapWords(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []
  while (walker.nextNode()) {
    const node = walker.currentNode as Text
    if (!node.parentElement?.classList.contains('word')) textNodes.push(node)
  }

  textNodes.forEach((node) => {
    const fragment = document.createDocumentFragment()
    ;(node.textContent ?? '').split(/([ \t\n\r]+)/).forEach((part) => {
      if (!part) return
      if (/^[ \t\n\r]+$/.test(part)) {
        fragment.appendChild(document.createTextNode(' '))
        return
      }
      const span = document.createElement('span')
      span.className = 'word inline-block'
      span.textContent = part
      fragment.appendChild(span)
    })
    node.replaceWith(fragment)
  })
}

export default function HeroVideo({ video, poster, slogan }: { video: WPImages, poster: WPImages, slogan: string }) {
  const containerRef = useRef<HTMLHeadingElement | null>(null)
  const html = useMemo(() => normalizeSloganHtml(slogan ?? ''), [slogan])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    wrapWords(container)

    const ctx = gsap.context(() => {
      gsap.fromTo(container.querySelectorAll('.word'),
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
    }, container)

    return () => ctx.revert()
  }, [html])

  return (
    <div className='2xl:h-[800px] lg:h-[600px] h-[500px] w-full relative overflow-hidden'>
      <video
        src={video?.source_url}
        loop autoPlay muted playsInline
        poster={poster?.source_url}
        className='w-full h-full object-cover'
      >
        <source type='video/webm' src={video?.source_url} />
      </video>

      <div className='absolute inset-0 w-full h-full bg-foreground/40 z-10' />

      <h1
        ref={containerRef}
        className='absolute !text-3xl sm:!text-4xl md:!text-[48px] xl:!text-[52px] !leading-[130%] md:!leading-[160%] !font-normal !normal-case !tracking-normal z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-background w-full px-3'
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
