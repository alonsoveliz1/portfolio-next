import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')
const PROJECTS_DIR = path.join(process.cwd(), 'content/projects')

export type BlogPost = {
  slug: string
  title: string
  date: string
  description?: string
  tags?: string[]
  readingTime: number
  content: string
}

export type Project = {
  slug: string
  title: string
  description?: string
  date: string
  weight: number
  tech?: string[]
  github?: string
  live?: string
  image?: string
  featured?: boolean
  content: string
}

function calcReadingTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200))
}

function readMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
}

export function getBlogPosts(): Omit<BlogPost, 'content'>[] {
  const files = readMdxFiles(BLOG_DIR)
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
    const { data, content } = matter(raw)
    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      description: data.description as string | undefined,
      tags: data.tags as string[] | undefined,
      readingTime: calcReadingTime(content),
    }
  })
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string | undefined,
    tags: data.tags as string[] | undefined,
    readingTime: calcReadingTime(content),
    content,
  }
}

export function getProjects(): Omit<Project, 'content'>[] {
  const files = readMdxFiles(PROJECTS_DIR)
  const projects = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf8')
    const { data, content } = matter(raw)
    return {
      slug,
      title: data.title as string,
      description: data.description as string | undefined,
      date: data.date as string,
      weight: (data.weight as number) ?? 99,
      tech: data.tech as string[] | undefined,
      github: data.github as string | undefined,
      live: data.live as string | undefined,
      image: data.image as string | undefined,
      featured: data.featured as boolean | undefined,
      readingTime: calcReadingTime(content),
    }
  })
  return projects.sort((a, b) => a.weight - b.weight)
}

export function getProject(slug: string): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    title: data.title as string,
    description: data.description as string | undefined,
    date: data.date as string,
    weight: (data.weight as number) ?? 99,
    tech: data.tech as string[] | undefined,
    github: data.github as string | undefined,
    live: data.live as string | undefined,
    image: data.image as string | undefined,
    featured: data.featured as boolean | undefined,
    content,
  }
}

export function getTagsWithCounts(): { tag: string; count: number }[] {
  const posts = getBlogPosts()
  const counts: Record<string, number> = {}
  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      counts[tag] = (counts[tag] ?? 0) + 1
    }
  }
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

export function getPostsByTag(tag: string): Omit<BlogPost, 'content'>[] {
  return getBlogPosts().filter((p) => p.tags?.includes(tag))
}
