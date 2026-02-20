import { setRequestLocale, getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import Timeline from '@/components/Timeline'
import SkillsGroup from '@/components/SkillsGroup'
import FadeIn from '@/components/FadeIn'
import { siteConfig, skillGroups } from '@/lib/config'
import type { Metadata } from 'next'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'About' })
	return { title: `${t('title')} | ${siteConfig.name}` }
}

export default async function AboutPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	setRequestLocale(locale)

	const t = await getTranslations('About')

	const resolvedSkillGroups = skillGroups.map((group) => ({
		label: t(group.labelKey),
		skills: group.skills,
		featuredSkills: group.featuredSkills,
	}))

	return (
		<div>
			<FadeIn>
				<div className="flex flex-col sm:flex-row gap-10 items-center sm:items-start mb-12">
					<Image
						src={siteConfig.photo}
						alt={siteConfig.name}
						width={180}
						height={180}
						className="rounded-full border-2 border-border flex-shrink-0"
					/>
					<div className="text-center sm:text-left">
						<h1 className="font-display text-title text-3xl mb-4">{t('title')}</h1>
						<p className="text-muted text-lg mb-5 leading-relaxed">{t('bio')}</p>
						<div className="flex gap-3 justify-center sm:justify-start">
							<a href={`/cv-${locale}.pdf`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
								{t('downloadCV')}
							</a>
							<Link href="/contact" className="btn btn-ghost">
								{t('getInTouch')}
							</Link>
						</div>
					</div>
				</div>
			</FadeIn>

			<section className="mb-12 pt-8 border-t border-border">
				<FadeIn>
					<h2 className="font-display text-title text-2xl mb-6">{t('skillsTitle')}</h2>
				</FadeIn>
				{resolvedSkillGroups.map((group, i) => (
					<SkillsGroup
						key={group.label}
						label={group.label}
						skills={group.skills}
						featuredSkills={group.featuredSkills}
						delay={i * 0.08}
					/>
				))}
			</section>

			<section className="pt-8 border-t border-border">
				<FadeIn>
					<h2 className="font-display text-title text-2xl mb-6">{t('experienceTitle')}</h2>
				</FadeIn>
				<Timeline />
			</section>
		</div>
	)
}
