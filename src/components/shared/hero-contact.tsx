import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/utils/get-dictionary'
import { PhoneHomeACF, SocialsHomeACF } from '@/types/home.types'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import RequestCall from '../forms/request-call'


export default async function HeroContact({
  socials,
  phone,
  email
}: {
  socials: SocialsHomeACF[],
  phone: PhoneHomeACF,
  email: string
}) {
  const cookieLocale = (await cookies()).get('locale')?.value as Locale
  const dictionary = await getDictionary(cookieLocale)

  function clearNumber(string: string) {
    if (!string) return null
    return `+${string.replace(/\D+/g, '').replaceAll('-', '')}`
  }

  return (
    <div className='px-3 py-8 md:px-8 xl:md:px-[60px] flex items-center justify-between flex-col sm:flex-row gap-6 border border-gray-200'>
      <div className='flex items-center flex-col lg:flex-row gap-6 2xl:gap-[74px] max-w-[890px]'>
        <div className='flex items-center gap-3 xl:gap-6'>
          {socials.map((social) => (
            <Link key={social.icon.id} href={social.link.url} target={social.link.target} rel="noopener noreferrer">
              <Image src={social.icon.source_url} alt={`Social icon ${social.link.title}`} width={40} height={40} />
            </Link>
          ))}
        </div>

        <div className='text-center'>
          {phone?.numbers.map((item, i) => (
            <Link key={i} href={clearNumber(item.number)} className='block text-xl xl:text-2xl'>{item.number}</Link>
          ))}
          <span className='text-sm'>{phone.time}</span>
        </div>
        <Link href={`mailto:${email}`} className='text-center text-xl xl:text-2xl'>{email}</Link>
      </div>
      <RequestCall submit={dictionary.hero.submit} reqCall={dictionary.reqCall} />
    </div>
  )
}
