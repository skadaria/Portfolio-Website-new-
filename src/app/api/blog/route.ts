import { NextRequest, NextResponse } from 'next/server'
import type { BlogPost } from '@/data/portfolio'

const STORE_NAME = 'portfolio'
const STORE_KEY = 'blog'

let memoryData: BlogPost[] | null = null

async function getBlobStore() {
  try {
    const { getStore } = await import('@netlify/blobs')
    return getStore({ name: STORE_NAME })
  } catch {
    return null
  }
}

async function readBlogPosts(): Promise<BlogPost[]> {
  try {
    const store = await getBlobStore()
    if (store) {
      const raw = await store.get(STORE_KEY, { type: 'json' })
      if (raw) return raw as BlogPost[]
    }
  } catch {}
  if (memoryData) return memoryData
  const { blogPosts } = await import('@/data/portfolio')
  return [...blogPosts]
}

async function writeBlogPosts(posts: BlogPost[]) {
  try {
    const store = await getBlobStore()
    if (store) {
      await store.set(STORE_KEY, JSON.stringify(posts))
    }
  } catch {}
  memoryData = posts
}

export async function GET() {
  const data = await readBlogPosts()
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const data = await readBlogPosts()
  const newPost: BlogPost = {
    ...body,
    id: crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    created_at: body.created_at || new Date().toISOString().split('T')[0],
  }
  data.push(newPost)
  data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  if (data.length > 5) {
    data.splice(5)
  }
  await writeBlogPosts(data)
  return NextResponse.json(newPost, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, ...updates } = body
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const data = await readBlogPosts()
  const idx = data.findIndex(p => p.id === id)
  if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 })
  data[idx] = { ...data[idx], ...updates }
  await writeBlogPosts(data)
  return NextResponse.json(data[idx])
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const data = await readBlogPosts()
  const filtered = data.filter(p => p.id !== id)
  if (filtered.length === data.length) return NextResponse.json({ error: 'not found' }, { status: 404 })
  await writeBlogPosts(filtered)
  return NextResponse.json({ success: true })
}
