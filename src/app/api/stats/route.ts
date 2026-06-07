import { NextRequest, NextResponse } from 'next/server'
import type { SiteStats } from '@/data/portfolio'
import { defaultStats } from '@/data/portfolio'

const STORE_NAME = 'portfolio'
const STORE_KEY = 'stats'

let memoryStats: SiteStats | null = null

async function getBlobStore() {
  try {
    const { getStore } = await import('@netlify/blobs')
    return getStore({ name: STORE_NAME })
  } catch {
    return null
  }
}

async function readStats(): Promise<SiteStats> {
  const store = await getBlobStore()
  if (store) {
    const raw = await store.get(STORE_KEY, { type: 'json' })
    if (raw) return raw as SiteStats
  }
  if (memoryStats) return memoryStats
  return { ...defaultStats }
}

async function writeStats(stats: SiteStats) {
  const store = await getBlobStore()
  if (store) {
    await store.set(STORE_KEY, JSON.stringify(stats))
  }
  memoryStats = stats
}

export async function GET() {
  const data = await readStats()
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const stats: SiteStats = {
    ...defaultStats,
    ...body,
  }
  await writeStats(stats)
  return NextResponse.json(stats)
}
