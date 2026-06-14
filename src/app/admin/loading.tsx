'use client'

import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

export default function AdminLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
      <div className="flex flex-col items-center gap-5">
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Shield size={28} className="text-white/20" />
        </motion.div>
        <div className="w-5 h-5 border-2 border-white/10 border-t-white/60 rounded-full animate-spin" />
        <p className="text-[11px] text-white/15 font-mono tracking-[0.15em] uppercase">
          Loading
        </p>
      </div>
    </div>
  )
}
