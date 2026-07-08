import { Locale } from '@/i18n-config'
import paths from '@/lib/utils/paths'
import Image from 'next/image'
import Link from 'next/link'

type LogoVersion = 'desktop' | 'mobile'

export default function Logo({
  version = 'desktop',
  lang
}: {
  version?: LogoVersion
  lang: Locale
}) {
  const logoPath = '/artichoke-logo.svg'
  const href = `/${lang}${paths.home()}`

  return (
    <>
      {version === 'desktop' && (
        <Link href={href} className='h-35 w-35 2xl:h-40 2xl:w-40 flex items-center justify-center'>
          <Image
            src={logoPath}
            alt='Artichoke Logo'
            width={120}
            height={100}
            className='w-auto h-auto'
          />
        </Link>
      )}

      {version === 'mobile' && (
        <Link href={href} className='flex items-center justify-center'>
          <Image
            src={logoPath}
            alt='Artichoke Logo'
            width={100}
            height={80}
          />
        </Link>
      )}
    </>
  )
}
