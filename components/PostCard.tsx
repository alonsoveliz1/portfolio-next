'use client'

import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import FadeIn from './FadeIn'
import type { BlogPost } from '@/lib/content'

type Props = {
  post: Omit<BlogPost, 'content'>
  delay?: number
  showDate?: boolean
}

export default function PostCard({ post, delay = 0, showDate = true }: Props) {
  const t = useTranslations('PostCard')
  const locale = useLocale()

  return (
    <FadeIn delay={delay}>
      <motion.article
        whileHover={{ y: -1 }}
        transition={{ duration: 0.2 }}
        className="comic-card bg-bg-code rounded p-5"
      >
        <div className="flex items-center gap-4 flex-wrap mb-2">
          {showDate && (
            <time className="text-muted text-sm">
              {new Date(post.date).toLocaleDateString(locale, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          )}
          <span className="text-muted text-sm">{t('minRead', { count: post.readingTime })}</span>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="font-mono text-xs px-2 py-0.5 bg-bg text-accent border border-accent rounded hover:bg-accent hover:text-bg transition-colors duration-200 no-underline"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
        <h2 className="font-display text-xl" style={{ letterSpacing: '0.05em' }}>
          <Link
            href={`/blog/${post.slug}`}
            className="text-title hover:text-accent2 transition-colors duration-200 no-underline"
          >
            {post.title}
          </Link>
        </h2>
        {post.description && (
          <p className="text-muted text-sm mt-1">{post.description}</p>
        )}
      </motion.article>
    </FadeIn>
  )
}
