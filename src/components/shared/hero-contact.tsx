import { PhoneHomeACF, SocialsHomeACF } from '@/types/home.types'
import Image from 'next/image'
import Link from 'next/link'


export default function HeroContact({
  socials,
  phone,
  email
}: {
  socials: SocialsHomeACF[],
  phone: PhoneHomeACF,
  email: string
}) {
  function clearNumber(string: string) {
    if (!string) return null
    return `+${string.replace(/\D+/g, '').replaceAll('-', '')}`
  }

  return (
    <div className='px-3 py-8 md:px-8 xl:md:px-[60px] flex items-center justify-between flex-col sm:flex-row gap-6 border border-gray-200'>
      <div className='w-full flex items-center justify-center flex-col md:flex-row gap-10 lg:gap-[74px]'>
        <div className='flex items-center gap-3 xl:gap-6'>
          {socials.map((social) => (
            <Link key={social.icon.id} href={social.link.url} target={social.link.target} rel="noopener noreferrer">
              <Image src={social.icon.source_url} alt={`Social icon ${social.link.title}`} width={40} height={40} />
            </Link>
          ))}
        </div>

        <div className='text-center'>
          {phone?.numbers.map((item, i) => {
            const cleared = clearNumber(item.number)
            return (
              <Link key={i} href={cleared ? `tel:${cleared}` : '#'} className='block text-xl xl:text-2xl'>{item.number}</Link>
            )
          })}
          <span className='text-sm'>{phone.time}</span>
        </div>
        <Link href={`mailto:${email}`} className='text-center text-xl xl:text-2xl'>{email}</Link>
      </div>
    </div>
  )
}
