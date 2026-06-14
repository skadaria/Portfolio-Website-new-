import type { BlogPost } from '@/data/portfolio'

const API = '/api/blog'

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(API)
    if (res.ok) {
      const data: BlogPost[] = await res.json()
      if (Array.isArray(data)) return data
    }
  } catch {}
  return []
}

export async function addBlogPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost | null> {
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    })
    if (res.ok) return res.json()
  } catch {}
  return null
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
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

export async function deleteBlogPost(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${API}?id=${id}`, { method: 'DELETE' })
    return res.ok
  } catch {
    return false
  }
}
