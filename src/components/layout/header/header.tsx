'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Languages from './languages'

export default function Header() {
  const [currentSection, setCurrentSection] = useState<string>('')

  const handleCurrentSection = (section: string) => {
    setCurrentSection(section)
  }

  useEffect(() => {
    const sectionPosition = document.getElementById(currentSection)?.getBoundingClientRect().top! + window.scrollY

    console.log(sectionPosition)


    if (!sectionPosition || sectionPosition === 0) return

    scrollTo({
      top: sectionPosition - 60,
      behavior: 'smooth',
    })

  }, [currentSection])

  return (
    <header className='bg-background h-full'>
      <div className='hidden md:flex items-center px-8 md:px-[60px] h-full justify-between'>
        <button className='navItem' onClick={() => handleCurrentSection('#philosophy')}>PHILOSOPHY</button>
        <button className='navItem' onClick={() => handleCurrentSection('#services')}>OUR SERVICES</button>
        <Link href="/" className='h-40 w-40 flex items-center justify-center'>
          <Image
            src="../../Logo.svg"
            alt='Artichoke Logo'
            width={120}
            height={100}
          />
        </Link>
        <button className='navItem' onClick={() => handleCurrentSection('#projects')}>
          PROJECTS
        </button>
        <Languages />
      </div>

      <div className='flex items-center md:hidden px-4 py-6 h-full'>
        <div className='flex-1' />
        <Link href="/" className='flex items-center justify-center'>
          <Image
            src="../../Logo.svg"
            alt='Artichoke Logo'
            width={100}
            height={80}
          />
        </Link>
        <div className='flex-1 flex justify-end'>
          <Languages />
        </div>
      </div>
    </header>
  )
}
