import { projects as staticProjects } from '@/data/portfolio'
import type { Project } from '@/data/portfolio'

const API = '/api/projects'

export async function getStoredProjects(): Promise<Project[]> {
  try {
    const res = await fetch(API)
    if (res.ok) {
      const data: Project[] = await res.json()
      if (Array.isArray(data)) return data
    }
  } catch {}
  return [...staticProjects]
}

export async function addProject(project: Omit<Project, 'id'>): Promise<Project | null> {
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    })
    if (res.ok) return res.json()
  } catch {}
  return null
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  try {
    const res = await fetch(API, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    })
    if (res.ok) return res.json()
  } catch {}
  return null
}

export async function deleteProject(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API}?id=${id}`, { method: 'DELETE' })
    return res.ok
  } catch {
    return false
  }
}

export async function saveProjects(projects: Project[]): Promise<boolean> {
  try {
    const res = await fetch(API, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projects }),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function resetToStatic(): Promise<void> {
  try {
    await fetch(API, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset' }),
    })
  } catch {
    throw new Error('Failed to reset')
  }
}

export function exportAsTS(projects: Project[]): string {
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

export function checkAdminPassword(input: string): boolean {
  return input === 'SK@20620816'
}
