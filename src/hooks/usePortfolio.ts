import { useState, useEffect } from 'react'
import type { Project } from '@/data/portfolio'
import {
  projects as staticProjects,
  certificates as staticCertificates,
  techStacks as staticTechStacks,
} from '@/data/portfolio'
import {
  fetchProjects,
  fetchCertificates,
  fetchTechStacks,
} from '@/lib/portfolioService'

export default function usePortfolio() {
  const [projects, setProjects] = useState<Project[]>(staticProjects)
  const [certificates] = useState(staticCertificates)
  const [techStacks] = useState(staticTechStacks)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
      .then(data => {
        if (data && data.length > 0) setProjects(data)
      })
      .finally(() => setLoading(false))
  }, [])

  return {
    projects,
    certificates,
    techStacks,
    loading,
  }
}
