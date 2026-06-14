'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { BlogPost } from '@/data/portfolio'

export default function BlogCard({
  post,
}: {
  post: BlogPost
}) {
  const [expanded, setExpanded] = useState(false)

  const date = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const tags = post.tags
    ? post.tags.split(',').map(t => t.trim()).filter(Boolean)
    : []

  return (
    <motion.div
      onTap={() => setExpanded(!expanded)}
      layout
      className={`glass-card rounded-2xl overflow-hidden cursor-pointer select-none flex flex-col ${expanded ? '' : 'h-[200px]'}`}
    >
      {post.image_url && (
        <div className="w-full h-48 overflow-hidden">
          <img src={post.image_url} alt={post.title} loading="lazy" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="px-6 pt-6">
        <p className="text-xs text-[rgba(var(--c-light),0.4)] mb-2">{date}</p>
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-sm text-[rgba(var(--c-light),0.6)]">{post.excerpt}</p>
        <AnimatePresence>
          {expanded && (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-[rgba(var(--c-light),0.6)] mt-3 whitespace-pre-wrap">{post.content}</p>
            </motion.div>
          )}
        </AnimatePresence>
        {tags.length > 0 && (
          <div className={`flex flex-wrap gap-1.5 ${expanded ? 'mt-3' : 'mt-4'}`}>
            {tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-[rgba(var(--c-light),0.6)]">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {!expanded && <div className="flex-1" />}
      <p className="text-xs text-[rgba(var(--c-light),0.3)] text-center px-6 pb-6">{expanded ? 'Tap to collapse' : 'Tap to read more'} &middot; Swipe to navigate</p>
    </motion.div>
  )
}
