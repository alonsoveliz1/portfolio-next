import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'
import Hero from '@/components/Hero'
import PostCard from '@/components/PostCard'
import ProjectCard from '@/components/ProjectCard'
import { getBlogPosts, getProjects } from '@/lib/content'
import { Link } from '@/i18n/navigation'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Home')
  const posts = getBlogPosts().slice(0, 3)
  const projects = getProjects().filter((p) => p.featured)

  return (
    <>
      <Hero />

      {posts.length > 0 && (
        <section className="py-10 border-t border-border">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="font-display text-title text-2xl">{t('latestPosts')}</h2>
            <Link
              href="/blog"
              className="font-mono text-accent2 text-sm hover:text-accent3 transition-colors duration-200 no-underline"
            >
              {t('viewAll')}
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} delay={i * 0.05} />
            ))}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="py-10 border-t border-border">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="font-display text-title text-2xl">{t('featuredProjects')}</h2>
            <Link
              href="/projects"
              className="font-mono text-accent2 text-sm hover:text-accent3 transition-colors duration-200 no-underline"
            >
              {t('viewAll')}
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} delay={i * 0.05} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
