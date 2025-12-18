'use client'

import { IDictionary } from '@/lib/utils/get-dictionary'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Languages from './languages'

export default function Header({
  dictionary,
}: {
  dictionary: IDictionary
}) {
  const [currentSection, setCurrentSection] = useState<string>('')
  const pathname = usePathname()

  const isHomePage = pathname.split('/').length <= 2

  const handleCurrentSection = (section: string) => {
    setCurrentSection(section)
  }

  useEffect(() => {
    const sectionPosition = document.getElementById(currentSection)?.getBoundingClientRect().top! + window.scrollY

    if (!sectionPosition || sectionPosition === 0) return

    scrollTo({
      top: sectionPosition - 60,
      behavior: 'smooth',
    })

  }, [currentSection])

  return (
    <header className='bg-background h-full'>

      {
        isHomePage ? (
          <div className='hidden md:flex items-center px-8 md:px-[60px] h-full justify-between'>
            <button
              className='navItem'
              onClick={() => handleCurrentSection('#philosophy')}
            >
              {dictionary['header'].philosophy}
            </button>
            <button
              className='navItem'
              onClick={() => handleCurrentSection('#services')}
            >
              {dictionary['header'].ourServices}
            </button>
            <Link href="/" className='h-40 w-40 flex items-center justify-center'>
              <Image
                src="../../Logo.svg"
                alt='Artichoke Logo'
                width={120}
                height={100}
              />
            </Link>
            <button className='navItem' onClick={() => handleCurrentSection('#projects')}>
              {dictionary['header'].projects}
            </button>
            <Languages />
          </div>
        ) : (
          <div className='hidden md:flex items-center px-8 md:px-[60px] h-full justify-between'>
            <div className='flex flex-1' />
            <Link href="/" className='h-40 w-40 flex items-center justify-center'>
              <Image
                src="../../artichoke-logo.svg"
                alt='Artichoke Logo'
                width={120}
                height={100}
              />
            </Link>
            <div className='flex flex-1 justify-end'>
              <Languages />
            </div>
          </div>
        )
      }

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
