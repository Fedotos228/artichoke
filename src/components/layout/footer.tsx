import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/utils/get-dictionary'
import { getFooterSettings } from '@/services/footer.service'
import { cookies } from 'next/headers'
import ContactForm from '../forms/contact-form'

export default async function Footer() {
  const lang = (await cookies()).get('locale')?.value as Locale
  const footer = await getFooterSettings(lang)

  const dictionary = await getDictionary(lang)

  return (
    <footer className=''>
      <div className='grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_639px] gap-0.5'>
        <video loop autoPlay muted controls={false} className='h-full w-full object-cover'>
          <source src={footer.video.url} type={footer.video.mime_type} />
        </video>

        <div className='bg-foreground px-10 lg:px-24 py-16 place-items-center'>
          <h3 className='text-background text-center mb-6'>{dictionary['contactForm'].title}</h3>
          <ContactForm dictionary={dictionary['contactForm']} />
        </div>
      </div>

      <div className='bg-foreground mt-0.5'>
        <div className='container mx-auto  px-4 py-6'>
          <p className='text-center text-background'>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
