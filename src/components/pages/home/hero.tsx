import HeroContact from '@/components/shared/hero-contact'
import HeroVideo from '@/components/shared/hero-video'
import { PhoneHomeACF, SocialsHomeACF } from '@/types/home.types'
import { WPImages } from '@/types/wp.types'

export default function Hero(
  {
    video,
    phone,
    email,
    socials
  }: {
    video: WPImages,
    phone: PhoneHomeACF,
    email: string,
    socials: SocialsHomeACF[]
  }
) {
  return (
    <section>
      <HeroVideo
        video={video}
      />
      <HeroContact
        socials={socials}
        phone={phone}
        email={email}
      />
    </section>
  )
}