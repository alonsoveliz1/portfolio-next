'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import ThemeToggle from './ThemeToggle'
import LocaleSwitcher from './LocaleSwitcher'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const t = useTranslations('Nav')

  const links = [
    { href: '/blog' as const, label: t('blog') },
    { href: '/projects' as const, label: t('projects') },
    { href: '/about' as const, label: t('about') },
    { href: '/contact' as const, label: t('contact') },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' as const }}
      className="relative flex items-center justify-between py-8 border-b border-border"
    >
      <Link
        href="/"
        className="font-display text-2xl text-title hover:text-accent2 transition-colors duration-200 no-underline"
      >
        Alonso Veliz
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-text hover:text-accent2 transition-colors duration-200 text-sm no-underline"
          >
            {link.label}
          </Link>
        ))}
        <LocaleSwitcher />
        <ThemeToggle />
      </div>

      {/* Mobile: locale switcher + theme toggle + hamburger */}
      <div className="md:hidden flex items-center gap-2">
        <LocaleSwitcher />
        <ThemeToggle />
        <button
          className="flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span
            className="block w-6 h-0.5 bg-text"
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-text"
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-text"
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-bg border-b border-border flex flex-col gap-3 px-6 py-4 z-50 md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text hover:text-accent2 transition-colors duration-200 text-sm no-underline"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
