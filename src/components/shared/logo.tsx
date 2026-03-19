import Image from 'next/image'
import Link from 'next/link'

type LogoVersion = 'desktop' | 'mobile'

export default function Logo({
  version = 'desktop'
}: {
  version?: LogoVersion
}) {
  let logoPath = '/artichoke-logo.svg'

  return (
    <>
      {version === 'desktop' && (
        <Link href="/" className='h-35 w-35 2xl:h-40 2xl:w-40 flex items-center justify-center'>
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
        <Link href="/" className='flex items-center justify-center'>
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
