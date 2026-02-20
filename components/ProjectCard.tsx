'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import FadeIn from './FadeIn'
import type { Project } from '@/lib/content'

type Props = {
  project: Omit<Project, 'content'>
  delay?: number
}

export default function ProjectCard({ project, delay = 0 }: Props) {
  const t = useTranslations('ProjectCard')

  return (
    <FadeIn delay={delay}>
      <motion.article
        whileHover={{ y: -1 }}
        transition={{ duration: 0.2 }}
        className="comic-card bg-bg-code rounded overflow-hidden"
      >
        {project.image && (
          <div className="relative w-full h-40">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-5">
          <h2 className="font-display text-xl" style={{ letterSpacing: '0.05em' }}>
            <Link
              href={`/projects/${project.slug}`}
              className="text-title hover:text-accent2 transition-colors duration-200 no-underline"
            >
              {project.title}
            </Link>
          </h2>
          {project.description && (
            <p className="text-muted text-sm mt-2 mb-3 leading-relaxed">
              {project.description}
            </p>
          )}
          {project.tech && project.tech.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-2 py-0.5 bg-bg text-accent border border-accent rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-ghost">
                GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">
                {t('liveDemo')}
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </FadeIn>
  )
}
