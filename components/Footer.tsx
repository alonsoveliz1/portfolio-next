import { getTranslations } from 'next-intl/server'

export default async function Footer() {
  const t = await getTranslations('Footer')

  return (
    <footer className="border-t border-border mt-16 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display text-title text-xl tracking-wide">Alonso Veliz</span>
        <p className="text-muted text-sm font-mono">
          {t.rich('builtWith', {
            nextjsLink: (chunks) => (
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent2 transition-colors duration-200"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>
    </footer>
  )
}
