import { setRequestLocale } from 'next-intl/server'
import { getPostsByTag, getTagsWithCounts } from '@/lib/content'
import PostCard from '@/components/PostCard'
import FadeIn from '@/components/FadeIn'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getTagsWithCounts().map(({ tag }) => ({ locale, tag }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>
}): Promise<Metadata> {
  const { tag } = await params
  return { title: `#${tag} | Alonso Veliz` }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ locale: string; tag: string }>
}) {
  const { locale, tag } = await params
  setRequestLocale(locale)

  const posts = getPostsByTag(tag)
  if (posts.length === 0) notFound()

  return (
    <>
      <FadeIn>
        <h1 className="font-mono text-title text-3xl mb-6">#{tag}</h1>
      </FadeIn>
      <div>
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} delay={i * 0.05} />
        ))}
      </div>
    </>
  )
}
