import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getTagsWithCounts } from '@/lib/content'
import { Link } from '@/i18n/navigation'
import FadeIn from '@/components/FadeIn'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Tags' })
  return { title: `${t('title')} | Alonso Veliz` }
}

export default async function TagsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Tags')
  const tags = getTagsWithCounts()

  return (
    <>
      <FadeIn>
        <h1 className="font-mono text-title text-3xl mb-6">{t('title')}</h1>
      </FadeIn>
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="font-mono text-base px-3 py-1.5 bg-bg-code text-accent rounded hover:bg-accent hover:text-bg transition-colors duration-200 no-underline"
            >
              {tag}{' '}
              <span className="text-muted text-sm">({count})</span>
            </Link>
          ))}
        </div>
      </FadeIn>
    </>
  )
}
