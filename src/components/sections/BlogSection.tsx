'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ChevronLeft, ChevronRight } from 'lucide-react'
import useBlog from '@/hooks/useBlog'
import BlogCard from './BlogCard'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function BlogSection() {
  const { posts, loading } = useBlog()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const paginate = (dir: number) => {
    setDirection(dir)
    setCurrentIndex(prev => {
      const next = prev + dir
      if (next < 0) return posts.length - 1
      if (next >= posts.length) return 0
      return next
    })
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir * 300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: -dir * 300, opacity: 0 }),
  }

  if (loading) return null

  return (
    <section id="blog">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Blogs</h2>
            <p className="text-sm text-[rgba(var(--c-light),0.5)]">Recent thoughts &amp; updates</p>
          </motion.div>

          <motion.div variants={fadeUp} className="max-w-3xl mx-auto">
            {posts.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center">
                <FileText size={40} className="mx-auto mb-4 text-[rgba(var(--c-light),0.3)]" />
                <h3 className="text-lg font-semibold mb-2">No Recent Posts</h3>
                <p className="text-sm text-[rgba(var(--c-light),0.5)]">Check back soon for new content</p>
              </div>
            ) : (
              <>
                <motion.div layout className="flex items-center gap-4">
                  {posts.length > 1 && (
                    <button
                      onClick={() => paginate(-1)}
                      className="shrink-0 p-2 rounded-full bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.08)] backdrop-blur-sm transition"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}
                  <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={posts[currentIndex]?.id ?? 'empty'}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.3}
                        onDragEnd={(_: unknown, info: { offset: { x: number } }) => {
                          if (info.offset.x < -100) paginate(1)
                          else if (info.offset.x > 100) paginate(-1)
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {posts[currentIndex] && (
                          <BlogCard post={posts[currentIndex]} />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  {posts.length > 1 && (
                    <button
                      onClick={() => paginate(1)}
                      className="shrink-0 p-2 rounded-full bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.08)] backdrop-blur-sm transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  )}
                </motion.div>

                {posts.length > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {posts.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDirection(i > currentIndex ? 1 : -1)
                          setCurrentIndex(i)
                        }}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === currentIndex
                            ? 'w-6 bg-white'
                            : 'w-2 bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
