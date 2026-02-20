'use client'

import FadeIn from './FadeIn'

type SkillsGroupProps = {
  label: string
  skills: string[]
  featuredSkills?: string[]
  delay?: number
}

export default function SkillsGroup({ label, skills, featuredSkills = [], delay = 0 }: SkillsGroupProps) {
  return (
    <FadeIn delay={delay} className="mb-6">
      <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-2">
        {label}
      </h3>
      <div className="flex flex-wrap gap-3 items-center">
        {skills.map((skill) =>
          featuredSkills.includes(skill) ? (
            <span key={skill} className="skill-burst">
              {skill}
            </span>
          ) : (
            <span
              key={skill}
              className="font-mono text-sm px-3 py-1 bg-bg-code text-accent border border-accent rounded"
            >
              {skill}
            </span>
          )
        )}
      </div>
    </FadeIn>
  )
}
