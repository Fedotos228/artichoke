import Image from 'next/image'
import ContactForm from '../forms/contact-form'

export default function Footer() {
  return (
    <footer className=''>
      <div className='grid md:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_639px] gap-0.5'>
        <div className='relative w-full h-auto'>
          <Image
            src='/footer-gif.gif'
            alt='Footer Animation'
            fill
            className='w-full h-auto object-cover'
            unoptimized
          />
        </div>

        <div className='bg-foreground px-10 lg:px-24 py-16 place-items-center'>
          <h3 className='text-background text-center mb-6'>Let’s create together</h3>
          <ContactForm />
        </div>
      </div>

      <div className='bg-foreground mt-0.5'>
        <div className='container mx-auto  px-4 py-6'>
          <p className='text-center text-background'>© Artichoke interiors, 2025. All rights reserved. No part of these images & video may be copied, reproduced, or distributed without written permission.</p>
        </div>
      </div>
    </footer>
  )
}
