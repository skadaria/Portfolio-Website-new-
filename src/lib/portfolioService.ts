import { getStoredProjects } from '@/lib/portfolioDataManager'
import { certificates, techStacks } from '@/data/portfolio'
import type { Project } from '@/data/portfolio'

export const fetchProjects = (): Project[] => {
  return getStoredProjects()
}

export const fetchCertificates = () => {
  return certificates
}

export const fetchTechStacks = () => {
  return techStacks
}