'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ToastCard from '@/components/ui/ToastCard'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export type ToastOptions = {
  title: string
  description?: string
  duration?: number
}

export type Toast = {
  id: string
  type: ToastType
  title: string
  description?: string
  duration: number
  createdAt: number
}

type ToastContextType = {
  toasts: Toast[]
  addToast: (type: ToastType, options: ToastOptions) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

let nextId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback((type: ToastType, options: ToastOptions) => {
    const id = String(++nextId)
    const toast: Toast = {
      id,
      type,
      title: options.title,
      description: options.description,
      duration: options.duration ?? 4000,
      createdAt: Date.now(),
    }
    setToasts((prev) => [...prev, toast])
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          top: 24,
          right: 24,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <ToastCard
              key={t.id}
              id={t.id}
              type={t.type}
              title={t.title}
              description={t.description}
              duration={t.duration}
              onDismiss={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  const { addToast, removeToast, toasts } = ctx
  return {
    toasts,
    removeToast,
    success: (options: ToastOptions) => addToast('success', options),
    error: (options: ToastOptions) => addToast('error', options),
    warning: (options: ToastOptions) => addToast('warning', options),
    info: (options: ToastOptions) => addToast('info', options),
  }
}
