import { useState, useEffect } from 'react'
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
  const [projects, setProjects] = useState(staticProjects)
  const [certificates, setCertificates] = useState(staticCertificates)
  const [techStacks, setTechStacks] = useState(staticTechStacks)

  useEffect(() => {
    setProjects(fetchProjects())
    setCertificates(fetchCertificates())
    setTechStacks(fetchTechStacks())
  }, [])

  return {
    projects,
    certificates,
    techStacks,
    loading: false,
  }
}
