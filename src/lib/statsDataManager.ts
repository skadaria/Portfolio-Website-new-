import type { SiteStats } from '@/data/portfolio'
import { defaultStats } from '@/data/portfolio'

const API = '/api/stats'

export async function getStats(): Promise<SiteStats> {
  try {
    const res = await fetch(API)
    if (res.ok) {
      const data: SiteStats = await res.json()
      if (data && typeof data.projects === 'number') return data
    }
  } catch {}
  return { ...defaultStats }
}

export async function updateStats(stats: SiteStats): Promise<boolean> {
  try {
    const res = await fetch(API, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stats),
    })
    return res.ok
  } catch {
    return false
  }
}
