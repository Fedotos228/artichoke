import { PhoneHomeACF, SocialsHomeACF } from '@/types/home.types'
import Image from 'next/image'
import Link from 'next/link'
import RequestCall from '../forms/request-call'
import { getDictionary } from '@/lib/utils/get-dictionary'
import { cookies } from 'next/headers'
import { Locale } from '@/i18n-config'


export default async function HeroContact(
  {
    socials,
    phone,
    email
  }:
    {
      socials: SocialsHomeACF[],
      phone: PhoneHomeACF,
      email: string
    }
) {
  const cookieLocale = (await cookies()).get('locale')?.value as Locale
  const dictionary = await getDictionary(cookieLocale)

  function clearNumber(string: string) {
    return `+${string.replace(/\D+/g, '').replaceAll('-', '')}`
  }

  return (
    <div className='py-8 px-8 xl:md:px-[60px] flex items-center justify-between flex-col sm:flex-row gap-6 border border-gray-200'>
      <div className='flex items-center flex-col lg:flex-row gap-6 2xl:gap-[74px] max-w-[890px]'>
        <div className='flex items-center gap-3 xl:gap-6'>
          {socials.map((social) => (
            <Link key={social.icon.id} href={social.link.url} target={social.link.target} rel="noopener noreferrer">
              <Image src={social.icon.source_url} alt={`Social icon ${social.link.title}`} width={40} height={40} />
            </Link>
          ))}
        </div>

        <div className='text-center'>
          <Link href={clearNumber(phone.number)} className='block text-xl xl:text-2xl'>{phone.number}</Link>
          <span className='text-sm'>{phone.time}</span>
        </div>
        <Link href={`mailto:${email}`} className='text-xl xl:text-2xl'>{email}</Link>
      </div>
      <RequestCall submit={dictionary.hero.submit} />
    </div>
  )
}
