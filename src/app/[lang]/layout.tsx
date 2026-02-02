import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header/header'
import { gilroy } from '@/lib/utils/font'

import Loader from '@/components/shared/loader'
import { i18n, Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/utils/get-dictionary'
import { Suspense } from 'react'
import "../globals.css"

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string } | Promise<{ lang: string }>
}) {
  const resolved = await params
  const lang = resolved.lang as Locale
  const dictionary = await getDictionary(lang)

  return (
    <html lang={lang}>
      <body className={`${gilroy.variable} antialiased`}>
        <Suspense fallback={<Loader />}>
          <div className="wrapper">
            <Header dictionary={dictionary} />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </Suspense>
      </body>
    </html>
  )
}
