'use client'

import { useState, useEffect, useCallback } from 'react'
import { getStoredProjects, addProject, updateProject, deleteProject, resetToStatic, checkAdminPassword } from '@/lib/portfolioDataManager'
import { getStats, updateStats } from '@/lib/statsDataManager'
import type { Project, SiteStats } from '@/data/portfolio'

const emptyForm = {
  title: '',
  description: '',
  live_url: '',
  github_url: '',
  technologies: '',
  key_features: '',
  image_url: '',
  image_urls: '',
  created_at: new Date().toISOString().split('T')[0],
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [showForm, setShowForm] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [stats, setStats] = useState<SiteStats | null>(null)
  const [editStats, setEditStats] = useState(false)
  const [statsForm, setStatsForm] = useState<SiteStats>({ projects: 4, certificates: 1, completedWorks: 4, cvUrl: '' })

  const refreshStats = useCallback(async () => {
    const s = await getStats()
    setStats(s)
    setStatsForm(s)
  }, [])

  const refresh = useCallback(async () => {
    const p = await getStoredProjects()
    setProjects(p)
  }, [])

  useEffect(() => {
    if (authed) {
      refresh()
      refreshStats()
    }
  }, [authed, refresh, refreshStats])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const handleLogin = () => {
    if (checkAdminPassword(password)) {
      setAuthed(true)
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }

  const handleAdd = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }

  const handleEdit = (p: Project) => {
    setForm({
      title: p.title,
      description: p.description,
      live_url: p.live_url ?? '',
      github_url: p.github_url ?? '',
      technologies: p.technologies,
      key_features: p.key_features,
      image_url: p.image_url ?? '',
      image_urls: p.image_urls.join(', '),
      created_at: p.created_at,
    })
    setEditingId(p.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project permanently?')) return
    const ok = await deleteProject(id)
    if (ok) {
      await refresh()
      showToast('Project deleted')
    } else {
      showToast('Failed to delete')
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) {
      showToast('Title is required')
      return
    }

    const projectData = {
      title: form.title.trim(),
      description: form.description.trim(),
      live_url: form.live_url.trim() || null,
      github_url: form.github_url.trim() || null,
      technologies: form.technologies.trim(),
      key_features: form.key_features.trim(),
      image_url: form.image_url.trim() || null,
      image_urls: form.image_urls.split(',').map(s => s.trim()).filter(Boolean),
      created_at: form.created_at || new Date().toISOString().split('T')[0],
    }

    if (editingId) {
      const result = await updateProject(editingId, projectData)
      if (result) {
        showToast('Project updated')
      } else {
        showToast('Failed to update')
        return
      }
    } else {
      const result = await addProject(projectData)
      if (result) {
        showToast('Project added')
      } else {
        showToast('Failed to add')
        return
      }
    }

    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
    await refresh()
  }

  const handleReset = async () => {
    if (!confirm('Reset all projects to the static defaults? This cannot be undone.')) return
    try {
      await resetToStatic()
      await refresh()
      showToast('Reset to static defaults')
    } catch {
      showToast('Failed to reset')
    }
  }

  const handleSaveStats = async () => {
    const ok = await updateStats(statsForm)
    if (ok) {
      showToast('Stats updated')
      setEditStats(false)
      await refreshStats()
    } else {
      showToast('Failed to update stats')
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm glass-card rounded-2xl p-8">
          <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
          <p className="text-sm text-[rgba(var(--c-light),0.5)] mb-6">Enter password to access the dashboard</p>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setPasswordError(false) }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white placeholder-[rgba(255,255,255,0.3)] outline-none focus:border-[rgba(255,255,255,0.3)] transition mb-4"
          />
          {passwordError && <p className="text-red-400 text-sm mb-4">Incorrect password</p>}
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition"
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl glass-card text-sm">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-[rgba(var(--c-light),0.5)] mt-1">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm transition"
          >
            Reset to Static
          </button>
          <button
            onClick={handleAdd}
            className="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition"
          >
            + Add Project
          </button>
        </div>
      </div>

      {/* Stats editor */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">About Section Stats</h2>
          <button
            onClick={() => { setEditStats(!editStats); if (!editStats) setStatsForm(stats ?? { projects: 4, certificates: 1, completedWorks: 4, cvUrl: '' }) }}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm transition"
          >
            {editStats ? 'Cancel' : 'Edit'}
          </button>
        </div>
        {editStats ? (
          <div className="flex gap-4 items-end flex-wrap">
            {(['projects', 'certificates', 'completedWorks'] as const).map((key) => (
              <div key={key}>
                <label className="text-xs text-[rgba(var(--c-light),0.5)] block mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  type="number"
                  value={statsForm[key]}
                  onChange={(e) => setStatsForm(s => ({ ...s, [key]: Number(e.target.value) }))}
                  className="w-24 px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white outline-none focus:border-[rgba(255,255,255,0.3)] transition"
                />
              </div>
            ))}
            <div className="w-full">
              <label className="text-xs text-[rgba(var(--c-light),0.5)] block mb-1">CV URL</label>
              <input
                type="text"
                value={statsForm.cvUrl}
                onChange={(e) => setStatsForm(s => ({ ...s, cvUrl: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white outline-none focus:border-[rgba(255,255,255,0.3)] transition"
              />
            </div>
            <button onClick={handleSaveStats} className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-sm font-medium transition">
              Save
            </button>
          </div>
        ) : (
          <div className="flex gap-6 flex-wrap items-center">
            <span className="text-sm">Projects: <strong>{stats?.projects ?? '-'}</strong></span>
            <span className="text-sm">Certificates: <strong>{stats?.certificates ?? '-'}</strong></span>
            <span className="text-sm">Completed Works: <strong>{stats?.completedWorks ?? '-'}</strong></span>
            {stats?.cvUrl && (
              <a href={stats.cvUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 underline truncate max-w-[200px]">
                CV Link
              </a>
            )}
          </div>
        )}
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Project' : 'Add Project'}
          </h2>
          <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs text-[rgba(var(--c-light),0.5)] block mb-1">Title *</label>
              <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white outline-none focus:border-[rgba(255,255,255,0.3)] transition" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-[rgba(var(--c-light),0.5)] block mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full px-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white outline-none focus:border-[rgba(255,255,255,0.3)] transition resize-none" />
            </div>
            <div>
              <label className="text-xs text-[rgba(var(--c-light),0.5)] block mb-1">Technologies (comma-separated)</label>
              <input value={form.technologies} onChange={e => setForm(p => ({ ...p, technologies: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white outline-none focus:border-[rgba(255,255,255,0.3)] transition" />
            </div>
            <div>
              <label className="text-xs text-[rgba(var(--c-light),0.5)] block mb-1">Key Features (comma-separated)</label>
              <input value={form.key_features} onChange={e => setForm(p => ({ ...p, key_features: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white outline-none focus:border-[rgba(255,255,255,0.3)] transition" />
            </div>
            <div>
              <label className="text-xs text-[rgba(var(--c-light),0.5)] block mb-1">Image URL</label>
              <input value={form.image_url} onChange={e => setForm(p => ({ ...p, image_url: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white outline-none focus:border-[rgba(255,255,255,0.3)] transition" />
            </div>
            <div>
              <label className="text-xs text-[rgba(var(--c-light),0.5)] block mb-1">Image URLs (comma-separated)</label>
              <input value={form.image_urls} onChange={e => setForm(p => ({ ...p, image_urls: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white outline-none focus:border-[rgba(255,255,255,0.3)] transition" />
            </div>
            <div>
              <label className="text-xs text-[rgba(var(--c-light),0.5)] block mb-1">Live URL</label>
              <input value={form.live_url} onChange={e => setForm(p => ({ ...p, live_url: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white outline-none focus:border-[rgba(255,255,255,0.3)] transition" />
            </div>
            <div>
              <label className="text-xs text-[rgba(var(--c-light),0.5)] block mb-1">GitHub URL</label>
              <input value={form.github_url} onChange={e => setForm(p => ({ ...p, github_url: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white outline-none focus:border-[rgba(255,255,255,0.3)] transition" />
            </div>
            <div>
              <label className="text-xs text-[rgba(var(--c-light),0.5)] block mb-1">Created At</label>
              <input type="date" value={form.created_at} onChange={e => setForm(p => ({ ...p, created_at: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white outline-none focus:border-[rgba(255,255,255,0.3)] transition" />
            </div>
            <div className="md:col-span-2 flex gap-3 pt-2">
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-medium transition">
                {editingId ? 'Update' : 'Add'} Project
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm) }} className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 transition">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-20 text-[rgba(var(--c-light),0.3)]">
          <p className="text-lg">No projects yet</p>
          <p className="text-sm mt-1">Click &quot;+ Add Project&quot; to get started</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map(p => (
            <div key={p.id} className="glass-card rounded-2xl p-5 flex flex-col">
              {p.image_url && (
                <div className="w-full h-36 rounded-xl overflow-hidden mb-3 bg-[rgba(255,255,255,0.03)]">
                  <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                </div>
              )}
              <h3 className="font-semibold text-base mb-1 truncate">{p.title}</h3>
              <p className="text-xs text-[rgba(var(--c-light),0.5)] line-clamp-2 mb-3">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.technologies.split(', ').map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-[rgba(var(--c-light),0.6)]">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto pt-2 flex gap-2 border-t border-[rgba(255,255,255,0.06)]">
                <button onClick={() => handleEdit(p)} className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(p.id)} className="flex-1 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
