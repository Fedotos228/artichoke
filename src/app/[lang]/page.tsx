import About from '@/components/pages/home/about'
import Hero from '@/components/pages/home/hero'
import HomeProjects from '@/components/pages/home/projects'
import Loader from '@/components/shared/loader'
import { Locale } from '@/i18n-config'
import paths from '@/lib/utils/paths'
import { buildAlternates, ogLocaleMap, SITE_URL } from '@/lib/utils/seo'
import { getHomePage } from '@/services/home.service'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Script from 'next/script'
import { Suspense } from 'react'

const description = "Artichoke Interiors is an interior design studio creating personalized residential and commercial spaces focused on harmony, functionality, and emotional comfort."

export async function generateMetadata(
  { params }: { params: Promise<{ lang: Locale }> }
): Promise<Metadata> {
  const { lang } = await params

  return {
    title: {
      default: 'Artichoke Interiors',
      template: "%s | Artichoke Interiors"
    },
    description,
    alternates: buildAlternates(lang, paths.home()),
    openGraph: {
      siteName: 'Artichoke',
      url: `${SITE_URL}/${lang}`,
      type: 'website',
      title: 'Artichoke',
      locale: ogLocaleMap[lang],
      description,
      images: [
        {
          url: '/artichoke-logo.svg',
          width: 1200,
          height: 630,
          alt: 'Artichoke',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Artichoke',
      description,
      images: ['/artichoke-logo.svg'],
    },
    keywords: [
      'IR INTERIORS STUDIO',
      'IR INTERIORS ',
      'IR STUDIO',
      'Ivan Railean',
      'IVAN RAILEAN',
      'Artichoke',
      'Artichoke Studio',
      'Artichoke Interiors',
      'interior design',
      'interior design studio',
      'interior design firm',
      'interior design company',
      'interior design agency',
      'interior design services',
      'modern interior design',
      'custom interior design',
      'residential interior design',
      'commercial interior design'
    ],
    robots: {
      index: true,
      follow: true
    }
  }
}

export default async function Home() {
  const cookieLocale = (await cookies()).get('locale')?.value as Locale
  const page = await getHomePage(cookieLocale)

  const acf = page.acf

  return (
    <Suspense fallback={<Loader />}>
      <Hero
        video={acf.video}
        poster={acf.poster}
        phone={acf.phone}
        email={acf.email}
        socials={acf.socials}
        slogan={acf.slogan}
      />
      <About about={acf.about_block} />
      <HomeProjects projects={acf.home_projects} title={acf.title} />
      <Script
        id="local-business-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Artichoke Interiors",
            url: SITE_URL,
            image: `${SITE_URL}/opengraph-image.jpg`,
            description,
            telephone: acf.phone?.numbers?.[0]?.number,
            email: acf.email,
            sameAs: acf.socials?.map((social) => social.link.url) || [],
          })
        }}
      />
    </Suspense>
  )
}
