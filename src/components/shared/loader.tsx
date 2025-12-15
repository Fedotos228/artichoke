'use client'

import Image from 'next/image'
import { useEffect } from 'react'

export default function Loader() {
  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <div className='absolute inset-0 w-full h-full bg-background flex items-center justify-center z-50'>
      <Image
        src="/Logo.svg"
        alt="Loading logo"
        width={160}
        height={160}
        className='animate-pulse'
      />
    </div>
  )
}