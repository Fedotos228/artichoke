import ProjectDescription from '@/components/pages/project-single/project-description'
import ProjectGallery from '@/components/pages/project-single/project-gallery'
import ProjectHero from '@/components/pages/project-single/project-hero'
import Loader from '@/components/shared/loader'
import { Locale } from '@/i18n-config'
import { getDictionary } from '@/lib/utils/get-dictionary'
import paths from '@/lib/utils/paths'
import { buildAlternates, decodeHtmlEntities, ogLocaleMap, SITE_URL } from '@/lib/utils/seo'
import { getProjectsSlug, getSingleProject, getSingleProjectMetadata } from '@/services/projects.service'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import Script from 'next/script'
import { Suspense } from 'react'


export async function generateStaticParams() {
  try {
    const projects = await getProjectsSlug('en')

    return projects.map((post) => ({
      slug: post.slug
    }))
  } catch (error) {
    // WP being unreachable at build time shouldn't fail the whole deploy —
    // pages still render on demand since this route is dynamic.
    console.error('generateStaticParams: failed to fetch project slugs', error)
    return []
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: Locale, slug: string }> }
): Promise<Metadata> {
  const { lang, slug } = await params
  const [project, dictionary] = await Promise.all([
    getSingleProjectMetadata(slug, lang),
    getDictionary(lang),
  ])

  const title = decodeHtmlEntities(project.title.rendered)
  const shortDescription = decodeHtmlEntities(project.acf.short_description?.trim() || '')
  const description = shortDescription || dictionary.projects.metaFallbackDescription.replace('{title}', title)

  const { source_url: imageUrl, alt_text: imageAlt, media_details: imageDetails } = project.featured_media

  return {
    title,
    description,
    alternates: buildAlternates(lang, paths.projectSingle(slug)),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}${paths.projectSingle(slug)}`,
      siteName: 'Artichoke Interiors',
      locale: ogLocaleMap[lang],
      type: 'article',
      images: [{
        url: imageUrl,
        width: imageDetails?.width,
        height: imageDetails?.height,
        alt: imageAlt || title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function ProjectSinglePage({
  params,
}: {
  params: Promise<{ lang: Locale, slug: string }>
}) {
  const { slug } = await params
  const cookieLocale = (await cookies()).get('locale')?.value as Locale
  const project = await getSingleProject(slug, cookieLocale)
  const dictionary = await getDictionary(cookieLocale)

  const {
    title: {
      rendered: rawTitle
    },
    featured_media: thumbnail,
    content: content,
    acf: {
      details,
      gallery,
      short_description
    }
  } = project

  const title = decodeHtmlEntities(rawTitle)
  const description = decodeHtmlEntities(short_description?.trim() || '')
    || dictionary.projects.metaFallbackDescription.replace('{title}', title)

  return (
    <Suspense fallback={<Loader />}>
      <main>
        <ProjectHero title={title} thumbnail={thumbnail} back={dictionary.projects.back} />
        <div className='max-w-[1194px] mx-auto px-4 py-20'>
          <ProjectDescription content={content} details={details} text={dictionary.projects.about} />
          <ProjectGallery gallery={gallery} />
        </div>
        <Script
          id="creative-work-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: title,
              description,
              image: thumbnail.source_url,
              author: {
                "@type": "Person",
                name: "Ivan Railean"
              }
            })
          }}
        />
      </main>
    </Suspense>
  )
}
