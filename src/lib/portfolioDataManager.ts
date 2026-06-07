import { projects as staticProjects } from '@/data/portfolio'
import type { Project } from '@/data/portfolio'

const STORAGE_KEY = 'portfolio_projects'
const PASSWORD_KEY = 'portfolio_admin_password'

export function getStoredProjects(): Project[] {
  if (typeof window === 'undefined') return staticProjects
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed as Project[]
    }
  } catch {}
  return staticProjects
}

export function saveProjects(projects: Project[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects, null, 2))
}

export function addProject(project: Omit<Project, 'id'>): Project {
  const projects = getStoredProjects()
  const newProject: Project = {
    ...project,
    id: crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
  }
  projects.push(newProject)
  saveProjects(projects)
  return newProject
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const projects = getStoredProjects()
  const index = projects.findIndex(p => p.id === id)
  if (index === -1) return null
  projects[index] = { ...projects[index], ...updates }
  saveProjects(projects)
  return projects[index]
}

export function deleteProject(id: string): boolean {
  const projects = getStoredProjects()
  const filtered = projects.filter(p => p.id !== id)
  if (filtered.length === projects.length) return false
  saveProjects(filtered)
  return true
}

export function resetToStatic(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

export function exportAsTS(): string {
  const projects = getStoredProjects()

  const fmt = (val: unknown, indent = 2): string => {
    const pad = '  '.repeat(indent)
    if (val === null) return 'null'
    if (typeof val === 'string') {
      const escaped = val.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')
      return `\`${escaped}\``
    }
    if (typeof val === 'number') return String(val)
    return `"${String(val)}"`
  }

  const projectEntries = projects.map(p => `  {
    id: ${fmt(p.id)},
    title: ${fmt(p.title)},
    description: ${fmt(p.description)},
    live_url: ${fmt(p.live_url)},
    github_url: ${fmt(p.github_url)},
    technologies: ${fmt(p.technologies)},
    key_features: ${fmt(p.key_features)},
    image_url: ${fmt(p.image_url)},
    image_urls: [${p.image_urls.map(u => fmt(u)).join(', ')}],
    created_at: ${fmt(p.created_at)},
  }`)

  return `import type { Project } from '@/data/portfolio'

export const projects: Project[] = [
${projectEntries.join(',\n')},
]

export const certificates = []

export const techStacks = []`
}

export function hasLocalOverride(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(STORAGE_KEY) !== null
}

export function setAdminPassword(password: string): void {
  localStorage.setItem(PASSWORD_KEY, password)
}

export function getAdminPassword(): string | null {
  return localStorage.getItem(PASSWORD_KEY)
}

export function checkAdminPassword(input: string): boolean {
  return input === 'SK@20620816'
}
