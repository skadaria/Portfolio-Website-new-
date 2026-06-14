'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import type { ToastType } from '@/context/ToastContext'

const ICON_MAP: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const COLOR_MAP: Record<ToastType, string> = {
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
}

type Props = {
  id: string
  type: ToastType
  title: string
  description?: string
  duration: number
  onDismiss: (id: string) => void
}

export default function ToastCard({ id, type, title, description, duration, onDismiss }: Props) {
  const Icon = ICON_MAP[type]
  const color = COLOR_MAP[type]
  const startTimeRef = useRef(Date.now())
  const remainingRef = useRef(duration)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const barRef = useRef<HTMLDivElement>(null)

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = undefined
    }
  }

  const startTimer = () => {
    clearTimer()
    timerRef.current = setTimeout(() => onDismiss(id), remainingRef.current)
  }

  const pauseBar = () => {
    const bar = barRef.current
    if (!bar) return
    const parent = bar.parentElement
    if (!parent) return
    const pct = (bar.offsetWidth / parent.offsetWidth) * 100
    bar.style.transition = 'none'
    bar.style.width = `${pct}%`
  }

  const resumeBar = () => {
    const bar = barRef.current
    if (!bar) return
    bar.style.transition = `width ${remainingRef.current}ms linear`
    bar.style.width = '0%'
  }

  const handleMouseEnter = () => {
    const elapsed = Date.now() - startTimeRef.current
    remainingRef.current = Math.max(0, remainingRef.current - elapsed)
    clearTimer()
    pauseBar()
  }

  const handleMouseLeave = () => {
    startTimeRef.current = Date.now()
    startTimer()
    resumeBar()
  }

  useEffect(() => {
    startTimeRef.current = Date.now()
    remainingRef.current = duration
    startTimer()

    const raf = requestAnimationFrame(() => {
      if (barRef.current) {
        barRef.current.style.transition = `width ${duration}ms linear`
        barRef.current.style.width = '0%'
      }
    })

    return () => {
      clearTimer()
      cancelAnimationFrame(raf)
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="toast-card"
      style={{
        pointerEvents: 'auto',
        borderLeft: `3px solid ${color}`,
        background: 'rgba(26,26,26,0.95)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        width: 360,
        padding: '14px 16px',
        paddingBottom: 8,
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'auto',
      }}
    >
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <Icon size={18} style={{ color, flexShrink: 0, marginTop: 2 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>
            {title}
          </p>
          {description && (
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {description}
            </p>
          )}
        </div>
        <button
          onClick={() => onDismiss(id)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 2,
            flexShrink: 0,
            color: 'var(--text-muted)',
            opacity: 0.6,
            transition: 'opacity 0.15s',
          }}
          onMouseEnter={(e) => { (e.currentTarget).style.opacity = '1' }}
          onMouseLeave={(e) => { (e.currentTarget).style.opacity = '0.6' }}
        >
          <X size={14} />
        </button>
      </div>

      <div
        style={{
          marginTop: 10,
          height: 3,
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <div
          ref={barRef}
          style={{
            height: '100%',
            width: '100%',
            background: color,
            borderRadius: 2,
            transition: 'none',
          }}
        />
      </div>

      <style>{`
        [data-theme="light"] .toast-card {
          background: rgba(255,255,255,0.9) !important;
          border-color: rgba(0,0,0,0.1) !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </motion.div>
  )
}
