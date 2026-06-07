'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="glass-card"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: 'none',
        color: 'rgba(var(--c-light), 0.7)',
        cursor: 'pointer',
        transition: '0.25s ease',
        boxShadow: '0 0 30px 8px rgba(var(--c-light), 0.25)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'rgb(var(--c-light))'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'rgba(var(--c-light), 0.7)'
      }}
    >
      {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
    </motion.button>
  )
}
