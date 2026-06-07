'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import usePortfolio from '@/hooks/usePortfolio'
import PortfolioCard from './PortfolioCard'

const smoothEase: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
]

export default function PortfolioShowcase() {
  const {
    projects,
    techStacks,
    loading,
  } = usePortfolio()

  const [activeTab, setActiveTab] =
    useState('projects')

  const [previewOpen, setPreviewOpen] =
    useState(false)

  const [previewImage, setPreviewImage] =
    useState('')

  const [showAllProjects, setShowAllProjects] =
    useState(false)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, 3)

  return (
    <>
      {/* PREVIEW */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[rgba(var(--c-dark),0.9)] backdrop-blur-md flex items-center justify-center px-6"
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-[rgba(var(--c-light),0.1)] hover:bg-[rgba(var(--c-light),0.2)] flex items-center justify-center transition"
            >
              <X size={18} />
            </button>

            <motion.img
              initial={{
                scale: 0.92,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.92,
                opacity: 0,
              }}
              transition={{ duration: 0.35 }}
              src={previewImage}
              className="max-w-[88vw] max-h-[88vh] rounded-3xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="portfolio"
        className="w-full max-w-[1450px] mx-auto px-8 md:px-12 lg:px-20 pt-24 pb-24 text-[rgb(var(--c-light))]"
      >
        <div className="text-[rgb(var(--c-light))]">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Portfolio Showcase
          </h1>

          <p className="text-[rgba(var(--c-light),0.55)] max-w-xl mx-auto text-sm md:text-base">
            Explore my journey through projects
            and technical expertise.
          </p>
        </motion.div>

        {/* TAB */}
        <div className="flex justify-center mb-10">
          <div className="w-full max-w-xs rounded-full glass-card p-2 flex gap-2">
            {[
              'projects',
              'techstack',
            ].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)

                  if (tab !== 'projects') {
                    setShowAllProjects(false)
                  }
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className={`flex-1 rounded-full py-3 text-sm transition-all duration-300 tab-btn ${
                  activeTab === tab ? 'tab-active' : ''
                }`}
              >
                {tab === 'projects'
                  ? 'Projects'
                  : 'Tech Stack'}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {/* PROJECTS */}
            {activeTab === 'projects' && (
              <div className="space-y-8">
                <div
                  className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 px-1"
                >
                   <AnimatePresence mode={isMobile ? 'wait' : 'popLayout'}>
                    {!loading &&
                      displayedProjects.map(
                        (item, i) => (
                          <motion.div
                            key={item.id}
                            initial={{
                              opacity: 0,
                              y: 10,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              y: -8,
                            }}
                            transition={{
                              duration: 0.12,
                              delay: i * 0.01,
                              ease: smoothEase,
                            }}
                          >
                            <PortfolioCard
                              index={i}
                              title={item.title}
                              description={
                                item.description
                              }
                              image={item.image_url || undefined}
                              live_url={item.live_url || undefined}
                              github_url={item.github_url || undefined}
                              technologies={item.technologies}
                              id={item.id}
                            />
                          </motion.div>
                        )
                      )}
                  </AnimatePresence>
                </div>

                {/* SEE MORE / LESS */}
                {!loading &&
                  projects.length > 3 && (
                    <div
                      className="flex justify-center"
                    >
                      <motion.button
                        whileHover={{
                          scale: 1.04,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        onClick={() =>
                          setShowAllProjects(
                            !showAllProjects
                          )
                        }
                        className="px-6 py-3 rounded-full glass-card text-sm text-[rgba(var(--c-light),0.75)] hover:text-[rgb(var(--c-light))] transition flex items-center gap-2" style={{ border: 'none' }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={
                              showAllProjects
                                ? 'less'
                                : 'more'
                            }
                            initial={{
                              opacity: 0,
                              y: 8,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            exit={{
                              opacity: 0,
                              y: -8,
                            }}
                            transition={{
                              duration: 0.25,
                            }}
                            className="flex items-center gap-2"
                          >
                            {showAllProjects ? (
                              <>
                                <ChevronUp
                                  size={16}
                                />
                                See Less
                              </>
                            ) : (
                              <>
                                <ChevronDown
                                  size={16}
                                />
                                See More
                              </>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  )}
              </div>
            )}

            {/* TECH STACK */}
            {/* TECH STACK */}
{activeTab === 'techstack' && (
  <div className="min-h-[360px] flex justify-center">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 max-w-5xl w-full">
      {!loading &&
        techStacks?.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              y: 8,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.12,
              delay: index * 0.01,
            }}
            whileHover={{
              y: -5,
              scale: 1.04,
            }}
            className="group relative rounded-[24px] glass-card flex flex-col items-center justify-center gap-3 h-[125px] w-[125px] mx-auto overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              style={{
                background: "radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.04), transparent 80%)",
              }}
            />
            <div className="relative flex items-center justify-center">
              {item.logo_url ? (
                <img
                  src={item.logo_url}
                  alt={item.name}
                  className=              {"relative z-10 w-[56px] h-[56px] object-contain grayscale group-hover:grayscale-0 transition-all duration-500" +
                (item.name === "Django" || item.name === "Oracle" ? " dark:brightness-[1.5] dark:group-hover:brightness-100" : "") +
                (item.name === "HTML" || item.name === "CSS" || item.name === "Python" ? " dark:contrast-[1.5] dark:group-hover:contrast-100" : "")}
                />
              ) : (
                <div className="relative z-10 w-[56px] h-[56px] rounded-2xl bg-[rgba(var(--c-light),0.1)]" />
              )}
            </div>

            <p className="text-[11px] text-[rgba(var(--c-light),0.8)] text-center leading-tight px-2 line-clamp-1">
              {item.name}
            </p>
          </motion.div>
        ))}
    </div>
  </div>
)}
          </motion.div>
        </AnimatePresence>

        </div>
      </section>
      <style>{`
        .tab-btn {
          color: rgba(var(--c-light), 0.5);
        }
        .tab-btn:hover {
          color: rgb(var(--c-light));
          background: rgba(var(--c-light), 0.08);
        }
        [data-theme="dark"] .tab-active {
          background: rgba(255, 255, 255, 0.18);
          color: rgb(var(--c-light));
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.15), 0 0 20px rgba(255,255,255,0.06);
        }
        [data-theme="light"] .tab-active {
          background: rgba(0, 0, 0, 0.12);
          color: rgb(var(--c-light));
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1), 0 0 16px rgba(0,0,0,0.04);
        }
      `}</style>
    </>
  )
}