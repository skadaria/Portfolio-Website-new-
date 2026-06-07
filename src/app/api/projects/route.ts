import { NextRequest, NextResponse } from 'next/server'
import type { Project } from '@/data/portfolio'

const STORE_NAME = 'portfolio'
const STORE_KEY = 'projects'

let memoryData: Project[] | null = null

async function getBlobStore() {
  try {
    const { getStore } = await import('@netlify/blobs')
    return getStore({ name: STORE_NAME })
  } catch {
    return null
  }
}

async function readProjects(): Promise<Project[]> {
  const store = await getBlobStore()
  if (store) {
    const raw = await store.get(STORE_KEY, { type: 'json' })
    if (raw) return raw as Project[]
  }
  if (memoryData) return memoryData
  const { projects } = await import('@/data/portfolio')
  return [...projects]
}

async function writeProjects(projects: Project[]) {
  const store = await getBlobStore()
  if (store) {
    await store.set(STORE_KEY, JSON.stringify(projects))
  }
  memoryData = projects
}

export async function GET() {
  const data = await readProjects()
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const data = await readProjects()
  const newProject: Project = {
    ...body,
    id: crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    created_at: body.created_at || new Date().toISOString().split('T')[0],
  }
  data.push(newProject)
  await writeProjects(data)
  return NextResponse.json(newProject, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, ...updates } = body
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const data = await readProjects()
  const idx = data.findIndex(p => p.id === id)
  if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 })
  data[idx] = { ...data[idx], ...updates }
  await writeProjects(data)
  return NextResponse.json(data[idx])
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const data = await readProjects()
  const filtered = data.filter(p => p.id !== id)
  if (filtered.length === data.length) return NextResponse.json({ error: 'not found' }, { status: 404 })
  await writeProjects(filtered)
  return NextResponse.json({ success: true })
}

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  if (body.action === 'reset') {
    const { projects: staticProjects } = await import('@/data/portfolio')
    await writeProjects([...staticProjects])
    return NextResponse.json({ success: true })
  }
  if (body.projects) {
    await writeProjects(body.projects)
    return NextResponse.json({ success: true })
  }
  return NextResponse.json({ error: 'invalid' }, { status: 400 })
}
