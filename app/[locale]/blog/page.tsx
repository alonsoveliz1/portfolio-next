import { setRequestLocale, getTranslations } from 'next-intl/server'
import PostCard from '@/components/PostCard'
import { getBlogPosts } from '@/lib/content'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Blog' })
  return {
    title: `${t('title')} | Alonso Veliz`,
    description: t('description'),
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Blog')
  const posts = getBlogPosts()

  return (
    <>
      <h1 className="font-mono text-title text-3xl mb-2">{t('title')}</h1>
      <p className="text-muted mb-8">{t('description')}</p>
      <div>
        {posts.length === 0 ? (
          <p className="text-muted">{t('noPosts')}</p>
        ) : (
          posts.map((post, i) => (
            <PostCard key={post.slug} post={post} delay={i * 0.05} />
          ))
        )}
      </div>
    </>
  )
}
