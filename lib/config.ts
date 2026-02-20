export const siteConfig = {
	name: 'Alonso Veliz',
	email: 'avelgar@outlook.com',
	photo: '/images/foto_personal.png',
	social: {
		github: 'https://github.com/alonsoveliz1',
		linkedin: 'https://linkedin.com/in/alonso-veliz-garcia-2baa71267/',
	},
}

export type SkillGroup = {
	labelKey: string
	skills: string[]
	featuredSkills: string[]
}

export const skillGroups: SkillGroup[] = [
	{
		labelKey: 'languages',
		skills: ['Rust', 'Python', 'Java', 'TypeScript', 'SQL'],
		featuredSkills: ['Rust', 'Python', 'Java'],
	},
	{
		labelKey: 'backend',
		skills: ['Tauri', 'REST APIs'],
		featuredSkills: ['Tauri'],
	},
	{
		labelKey: 'infrastructure',
		skills: ['Docker', 'PostgreSQL', 'Linux', 'Git', 'CI/CD'],
		featuredSkills: ['Linux', 'Git'],
	},
	{
		labelKey: 'interests',
		skills: ['Cybersecurity', 'AppSec', 'Reverse Engineering', 'Systems Programming', 'Backend development'],
		featuredSkills: ['Cybersecurity', 'Backend development'],
	},
]

export type TimelineEntry = {
	date: string
	title: string
	description: string
	url?: string
}

export const timelineEntries: TimelineEntry[] = [
	{
		date: '2019 — 2025',
		title: 'Computer Science & BBA @ Universitat Politecnica de Valencia',
		description:
			'Studied computer science fundamentals, algorithms, data structures, and software engineering principles.',
		url: 'https://www.upv.es',
	},
]
