'use client'

import Logo from '@/components/shared/logo'
import { i18n, Locale } from '@/i18n-config'
import { IDictionary } from '@/lib/utils/get-dictionary'
import { usePathname } from 'next/navigation'
import Languages from './languages'

export default function Header({
  dictionary,
}: {
  dictionary: IDictionary
}) {
  const pathname = usePathname()

  const isHomePage = pathname.split('/').length <= 2

  const currentLocale: Locale = (() => {
    const seg = pathname.split('/').filter(Boolean)[0] || ''
    return i18n.locales.includes(seg as Locale) ? (seg as Locale) : i18n.defaultLocale
  })()

  const handleCurrentSection = (section: string) => {
    const target = document.getElementById(section)
    if (!target) return

    scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 60,
      behavior: 'smooth',
    })
  }

  return (
    <header className='bg-background h-full'>
      {isHomePage ? (
        <div className='hidden md:flex items-center px-8 md:px-[60px] h-full justify-between'>
          <button
            className='navItem'
            onClick={() => handleCurrentSection('philosophy')}
          >
            {dictionary['header'].philosophy}
          </button>
          <button
            className='navItem'
            onClick={() => handleCurrentSection('services')}
          >
            {dictionary['header'].ourServices}
          </button>
          <Logo lang={currentLocale} />
          <button className='navItem' onClick={() => handleCurrentSection('projects')}>
            {dictionary['header'].projects}
          </button>
          <Languages />
        </div>
      ) : (
        <div className='hidden md:flex items-center px-8 md:px-[60px] h-full justify-between'>
          <div className='flex flex-1' />
          <Logo lang={currentLocale} />
          <div className='flex flex-1 justify-end'>
            <Languages />
          </div>
        </div>
      )}

      <div className='flex items-center md:hidden px-4 py-6 h-full'>
        <div className='flex-1' />
        <Logo version='mobile' lang={currentLocale} />
        <div className='flex-1 flex justify-end'>
          <Languages />
        </div>
      </div>
    </header>
  )
}
