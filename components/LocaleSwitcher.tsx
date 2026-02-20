'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'

export default function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => switchLocale('en')}
        className={`font-mono text-xs px-2 py-1 rounded transition-colors duration-200 ${
          locale === 'en'
            ? 'bg-accent2 text-bg'
            : 'text-muted hover:text-accent2'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('es')}
        className={`font-mono text-xs px-2 py-1 rounded transition-colors duration-200 ${
          locale === 'es'
            ? 'bg-accent2 text-bg'
            : 'text-muted hover:text-accent2'
        }`}
      >
        ES
      </button>
    </div>
  )
}
