'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'
import { FaGithub } from 'react-icons/fa'

type Props = {
  title: string
  description: string
  index: number
  id?: string
  image?: string
  live_url?: string
  github_url?: string
  technologies?: string
}

const techLogos: Record<string, string> = {
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Laravel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
  'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  'SQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg',
  'Oracle': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg',
  'Apex': 'https://raw.githubusercontent.com/Dani3lSun/awesome-orclapex/master/apex-logo.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
}

export default function PortfolioCard({
  title,
  description,
  index,
  id,
  image,
  live_url,
  github_url,
  technologies,
}: Props) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile ? (
    <div
      className="group relative rounded-[26px] glass-card p-4 flex flex-col min-h-[380px]" style={{ border: 'none' }}
    >
      <div className="w-full h-52 rounded-2xl overflow-hidden border border-[rgba(var(--c-light),0.1)] bg-[rgba(var(--c-light),0.03)] mb-3">
        {image ? (
          <img
            src={image}
            className="w-full h-full object-cover transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full bg-white/[0.03]" />
        )}
      </div>

      <h3 className="text-[17px] font-semibold mb-2 leading-tight">
        {title}
      </h3>

      <p className="text-[13px] text-[rgba(var(--c-light),0.6)] leading-relaxed line-clamp-2 min-h-[38px]">
        {description}
      </p>

      <div className="mt-auto pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {technologies?.split(', ').map((tech) => {
            const logo = techLogos[tech]
            if (!logo) return null
            return (
              <div
                key={tech}
                className="px-2.5 py-2 rounded-full glass-card flex items-center justify-center"
                style={{ border: 'none' }}
                title={tech}
              >
                <img
                  src={logo}
                  alt={tech}
                  className="w-4 h-4"
                />
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
        {live_url ? (
          <a
            href={live_url}
            target="_blank"
            className="flex items-center gap-2 text-[13px] text-[rgba(var(--c-light),0.7)] hover:text-[rgb(var(--c-light))] transition-all"
          >
            Live Demo
            <ArrowUpRight size={14} />
          </a>
        ) : (
          <div />
        )}

        {id && (
          <a
            href={github_url || 'https://github.com/skadaria?tab=repositories'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full glass-card transition-all flex items-center gap-2 text-[13px]"
            style={{ textDecoration: 'none', border: 'none' }}
          >
            <FaGithub size={18} />
            <ArrowRight size={13} />
          </a>
        )}
      </div>
      </div>
    </div>
  ) : (
    <motion.div
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 0.35,
        delay: index * 0.03,
      }}
      whileHover={{
        y: -5,
        scale: 1.02,
        transition: { duration: 0.15 },
      }}
      className="group relative rounded-[26px] glass-card p-4 flex flex-col min-h-[380px]" style={{ border: 'none' }}
    >
      <div className="w-full h-52 rounded-2xl overflow-hidden border border-[rgba(var(--c-light),0.1)] bg-[rgba(var(--c-light),0.03)] mb-3">
        {image ? (
          <img
            src={image}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full bg-white/[0.03]" />
        )}
      </div>

      <h3 className="text-[17px] font-semibold mb-2 leading-tight">
        {title}
      </h3>

      <p className="text-[13px] text-[rgba(var(--c-light),0.6)] leading-relaxed line-clamp-2 min-h-[38px]">
        {description}
      </p>

      <div className="mt-auto pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {technologies?.split(', ').map((tech) => {
            const logo = techLogos[tech]
            if (!logo) return null
            return (
              <div
                key={tech}
                className="px-2.5 py-2 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-all"
                style={{ border: 'none' }}
                title={tech}
              >
                <img
                  src={logo}
                  alt={tech}
                  className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
        {live_url ? (
          <a
            href={live_url}
            target="_blank"
            className="flex items-center gap-2 text-[13px] text-[rgba(var(--c-light),0.7)] hover:text-[rgb(var(--c-light))] transition-all"
          >
            Live Demo
            <ArrowUpRight size={14} />
          </a>
        ) : (
          <div />
        )}

        {id && (
          <a
            href={github_url || 'https://github.com/skadaria?tab=repositories'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full glass-card hover:scale-110 transition-all flex items-center gap-2 text-[13px]"
            style={{ textDecoration: 'none', border: 'none' }}
          >
            <FaGithub size={18} />
            <ArrowRight size={13} />
          </a>
        )}
      </div>
      </div>
    </motion.div>
  )
}