import Image from 'next/image'
import Link from 'next/link'
import RequestCall from '../forms/request-call'

const socials = [
  {
    id: 1,
    src: '/socials/Instagram.svg',
    url: 'https://www.instagram.com/artichoke.studio/',
  },
  {
    id: 2,
    src: '/socials/Whatsapp.svg',
    url: 'https://t.me/artichoke_studio',
  },
  {
    id: 3,
    src: '/socials/Telegram.svg',
    url: 'https://t.me/artichoke_studio',
  }
]

export default function HeroContact() {
  return (
    <div className='py-8 px-8 md:px-[60px] flex items-center justify-between gap-6'>
      <div className='flex items-center lg:gap-12 2xl:gap-[74px] max-w-[890px]'>
        <div className='flex items-center gap-6'>
          {socials.map((social) => (
            <Link key={social.id} href={social.url} target="_blank" rel="noopener noreferrer">
              <Image src={social.src} alt={`Social icon ${social.id}`} width={40} height={40} />
            </Link>
          ))}
        </div>

        <div>
          <Link href="tel:+373068355155" className='block text-xl xl:text-2xl'>+373 068-355-155</Link>
          <span className='text-sm'>Daily from 10:00 AM to 8:00 PM</span>
        </div>
        <Link href='mailto:info@artichoke.studio' className='text-xl lx:wtext-2xl'>info@artichoke.studio</Link>
      </div>
      <RequestCall />
    </div>
  )
}
