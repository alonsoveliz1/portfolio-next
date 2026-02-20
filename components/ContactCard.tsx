'use client'

import { motion } from 'framer-motion'

type ContactCardProps = {
  href: string
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
  external?: boolean
}

export default function ContactCard({
  href,
  icon,
  title,
  description,
  delay = 0,
  external = false,
}: ContactCardProps) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.3, delay }}
      className="comic-card bg-bg-code rounded p-8 text-center no-underline block"
    >
      <div className="flex justify-center mb-4 text-accent2">{icon}</div>
      <h3 className="font-display text-title text-xl mb-1" style={{ letterSpacing: '0.05em' }}>{title}</h3>
      <p className="text-muted text-sm">{description}</p>
    </motion.a>
  )
}
