import { setRequestLocale, getTranslations } from 'next-intl/server'
import ProjectCard from '@/components/ProjectCard'
import { getProjects } from '@/lib/content'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Projects' })
  return {
    title: `${t('title')} | Alonso Veliz`,
    description: t('description'),
  }
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('Projects')
  const projects = getProjects()

  return (
    <>
      <h1 className="font-mono text-title text-3xl mb-2">{t('title')}</h1>
      <p className="text-muted mb-8">{t('description')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} delay={i * 0.05} />
        ))}
      </div>
    </>
  )
}
