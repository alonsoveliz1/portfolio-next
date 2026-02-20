import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getBlogPost, getBlogPosts } from '@/lib/content'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Link } from '@/i18n/navigation'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getBlogPosts().map((p) => ({ locale, slug: p.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const post = getBlogPost(slug)
  if (!post) return {}
  return { title: `${post.title} | Alonso Veliz`, description: post.description }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const t = await getTranslations('BlogPost')
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <article>
      <Link
        href="/blog"
        className="inline-block text-muted text-sm mb-8 hover:text-accent2 transition-colors duration-200 no-underline"
      >
        {t('backToBlog')}
      </Link>

      <header className="mb-10 pb-6 border-b border-border">
        <h1 className="font-mono text-title text-3xl mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 flex-wrap">
          <time className="text-muted text-sm">
            {new Date(post.date).toLocaleDateString(locale, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
          <span className="text-muted text-sm">{t('minRead', { count: post.readingTime })}</span>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="font-mono text-xs px-2 py-0.5 bg-bg-code text-accent rounded hover:bg-accent hover:text-bg transition-colors duration-200 no-underline"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  )
}
