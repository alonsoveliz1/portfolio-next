import { setRequestLocale, getTranslations } from 'next-intl/server'
import { getProject, getProjects } from '@/lib/content'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProjects().map((p) => ({ locale, slug: p.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const project = getProject(slug)
  if (!project) return {}
  return { title: `${project.title} | Alonso Veliz`, description: project.description }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const t = await getTranslations('ProjectPage')
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <article>
      <Link
        href="/projects"
        className="inline-block text-muted text-sm mb-8 hover:text-accent2 transition-colors duration-200 no-underline"
      >
        {t('backToProjects')}
      </Link>

      {project.image && (
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-8">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
        </div>
      )}

      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="font-mono text-title text-3xl mb-2">{project.title}</h1>
        {project.description && (
          <p className="text-muted text-lg mb-4">{project.description}</p>
        )}
        {project.tech && project.tech.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs px-2 py-0.5 bg-bg-code text-accent rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-1.5 rounded border border-accent2 text-accent2 hover:bg-accent2 hover:text-bg transition-all duration-200 no-underline font-semibold"
            >
              GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-1.5 rounded bg-accent2 text-bg hover:bg-[#d99560] transition-colors duration-200 no-underline font-semibold"
            >
              {t('liveDemo')}
            </a>
          )}
        </div>
      </header>

      <div className="prose prose-lg max-w-none">
        <MDXRemote source={project.content} />
      </div>
    </article>
  )
}
