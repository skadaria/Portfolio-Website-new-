'use client'

import { useState, useEffect, useCallback } from 'react'
import { getStoredProjects, saveProjects, deleteProject, exportAsTS, resetToStatic, hasLocalOverride, checkAdminPassword } from '@/lib/portfolioDataManager'
import type { Project } from '@/data/portfolio'

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
  const [exportCode, setExportCode] = useState<string | null>(null)
  const [hasOverride, setHasOverride] = useState(false)

  const refresh = useCallback(() => {
    const p = getStoredProjects()
    setProjects(p)
    setHasOverride(hasLocalOverride())
  }, [])

  useEffect(() => {
    if (authed) refresh()
  }, [authed, refresh])

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

  const handleDelete = (id: string) => {
    if (!confirm('Delete this project permanently?')) return
    deleteProject(id)
    refresh()
    showToast('Project deleted')
  }

  const handleSave = (e: React.FormEvent) => {
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
      const current = getStoredProjects()
      const updated = current.map(p => p.id === editingId ? { ...p, ...projectData } : p)
      saveProjects(updated)
      showToast('Project updated')
    } else {
      const newProject: Project = {
        ...projectData,
        id: crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      }
      const current = getStoredProjects()
      saveProjects([...current, newProject])
      showToast('Project added')
    }

    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm)
    refresh()
  }

  const handleReset = () => {
    if (!confirm('Reset all projects to the static defaults? This cannot be undone.')) return
    resetToStatic()
    refresh()
    showToast('Reset to static defaults')
  }

  const handleExport = () => {
    setExportCode(exportAsTS())
  }

  const copyExport = () => {
    if (!exportCode) return
    navigator.clipboard.writeText(exportCode)
    showToast('Copied to clipboard')
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
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl glass-card text-sm">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-[rgba(var(--c-light),0.5)] mt-1">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
            {hasOverride && ' (local override active)'}
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {hasOverride && (
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm transition"
            >
              Reset to Static
            </button>
          )}
          <button
            onClick={handleExport}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm transition"
          >
            Export TS
          </button>
          <button
            onClick={handleAdd}
            className="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition"
          >
            + Add Project
          </button>
        </div>
      </div>

      {/* Project Form */}
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

      {/* Export Modal */}
      {exportCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm" onClick={() => setExportCode(null)}>
          <div className="w-full max-w-3xl max-h-[80vh] glass-card rounded-2xl p-6 overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Export TypeScript</h2>
              <div className="flex gap-2">
                <button onClick={copyExport} className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm transition">
                  Copy
                </button>
                <button onClick={() => setExportCode(null)} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm transition">
                  Close
                </button>
              </div>
            </div>
            <pre className="flex-1 overflow-auto text-xs leading-relaxed text-[rgba(var(--c-light),0.8)] bg-[rgba(0,0,0,0.3)] rounded-xl p-4 custom-scroll whitespace-pre-wrap break-all">
              {exportCode}
            </pre>
            <p className="text-xs text-[rgba(var(--c-light),0.4)] mt-3">
              Copy this into <code className="text-white/60">src/data/portfolio.ts</code> and rebuild.
            </p>
          </div>
        </div>
      )}

      {/* Project Cards */}
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
