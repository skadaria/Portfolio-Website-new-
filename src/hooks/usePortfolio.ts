import {
  fetchProjects,
  fetchCertificates,
  fetchTechStacks,
} from '@/lib/portfolioService'

export default function usePortfolio() {
  const projects = fetchProjects()
  const certificates = fetchCertificates()
  const techStacks = fetchTechStacks()

  return {
    projects,
    certificates,
    techStacks,
    loading: false,
  }
}