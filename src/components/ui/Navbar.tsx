'use client'

import { useState, useEffect, Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, User, Briefcase, FileText, Mail, Shield, ExternalLink } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}
function SKLogo({ size = 38 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: '#111',
        overflow: 'hidden',
      }}
    >
      {/* Shiny overlay sweep */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
          animation: 'shimmer 2.5s ease-in-out infinite',
        }}
      />
      {/* Neon ring */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#888" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2} cy={size / 2} r={size / 2 - 2}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * (size / 2 - 2)}
          strokeDashoffset="0"
          style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.5))' }}
        />
      </svg>
      {/* SK text */}
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: Math.round(size * 0.32),
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '0.02em',
          position: 'relative',
          zIndex: 1,
          textShadow: '0 0 6px rgba(255,255,255,0.4)',
        }}
      >
        SK
      </span>
      <style>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%) rotate(0deg); }
          50% { transform: translateX(100%) rotate(0deg); }
        }
      `}</style>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mounted, setMounted] = useState(false)

  // 🔥 navbar muncul sekali aja
  const [showNavbar, setShowNavbar] = useState(false)
  const [showBlur, setShowBlur] = useState(false)
  const pathname = usePathname()
  const handleLogoClick = () => {
    if (pathname === '/admin') {
      window.location.href = '/'
      return
    }
    const home = document.getElementById('home')
    if (home) {
      home.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
  }

  useEffect(() => {
    setMounted(true)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsDesktop(window.innerWidth >= 1024)
    }

    let ticking = false

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ['home', 'about', 'portfolio', 'blog', 'contact']

          for (const sectionId of sections) {
            const section = document.getElementById(sectionId)
            if (!section) continue

            const rect = section.getBoundingClientRect()

            if (rect.top <= 140 && rect.bottom >= 140) {
              setActiveSection(sectionId)
              break
            }
          }

          ticking = false
        })
        ticking = true
      }
    }

    handleResize()
    handleScroll()

    window.addEventListener('resize', handleResize, { passive: true })
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 🔥 navbar animasi cuma pas refresh
  useEffect(() => {
    const navbarPlayed = sessionStorage.getItem('navbarPlayed')

    if (navbarPlayed) {
      setShowNavbar(true)
      setShowBlur(true)
      return
    }

    const timer = setTimeout(() => {
      setShowNavbar(true)
      sessionStorage.setItem('navbarPlayed', 'true')
    }, 3800)

    const blurTimer = setTimeout(() => {
      setShowBlur(true)
    }, 4600) // after entrance animation completes

    return () => {
      clearTimeout(timer)
      clearTimeout(blurTimer)
    }
  }, [])

  if (!mounted) return null

  const smoothScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault()

    const target = document.querySelector(targetId)
    if (!target) return

    const navbarOffset = 3
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - navbarOffset

    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
    setOpen(false)
  }

  const navItems = [
    { label: 'Home', id: 'home', icon: Home },
    { label: 'About', id: 'about', icon: User },
    { label: 'Portfolio', id: 'portfolio', icon: Briefcase },
    { label: 'Blogs', id: 'blog', icon: FileText },
    { label: 'Contact', id: 'contact', icon: Mail },
    { label: 'Admin', id: 'admin', icon: Shield },
  ]

  if (isDesktop) {
    return (
      <>
      <motion.aside
        initial={{ opacity: 0, x: -40 }}
        animate={{
          opacity: showNavbar ? 1 : 0,
          x: showNavbar ? 0 : -40,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="desktop-sidebar"
        style={{
          position: 'fixed',
          left: 12,
          top: 12,
          width: 240,
          height: 'calc(100vh - 24px)',
          zIndex: 50,
          background: 'var(--nav-glass)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 28,
          boxShadow: '8px 8px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo */}
        <div style={{
          position: 'relative',
          padding: '36px 24px 28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 70,
            height: 70,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            <SKLogo size={52} />
          </div>
          <span style={{
            marginTop: 10,
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: 'var(--text-muted)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Portfolio
          </span>
        </div>

        {/* Nav links */}
        <nav style={{ padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '0 12px 10px',
          }}>
            Navigation
          </span>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            const isAdmin = item.id === 'admin'
            if (isAdmin) {
              return (
                <Fragment key={item.id}>
                  <div
                    style={{
                      height: 1,
                      background: 'var(--border)',
                      margin: '4px 14px 6px',
                    }}
                  />
                  <Link
                    href="/admin"
                    prefetch={true}
                    className="nav-link admin-link"
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 13,
                      textDecoration: 'none',
                      letterSpacing: '0.06em',
                      cursor: 'pointer',
                      padding: '11px 14px',
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Icon size={15} strokeWidth={1.5} />
                      {item.label}
                    </span>
                  </Link>
                </Fragment>
              )
            }
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => smoothScrollTo(e, `#${item.id}`)}
                className="nav-link"
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  textDecoration: 'none',
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  padding: '11px 14px',
                  borderRadius: 10,
                  overflow: 'hidden',
                  color: isActive ? 'var(--text-primary)' : undefined,
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 0 20px rgba(255,255,255,0.05)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon size={15} strokeWidth={1.5} />
                  {item.label}
                </span>
              </a>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <a
                href="https://github.com/skadaria?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <GithubIcon size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/srijal-kadariya-4694b629a/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <LinkedinIcon size={16} />
              </a>
              <a
                href="https://www.instagram.com/srijal_k12/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </motion.aside>
      <style>{`
        .desktop-sidebar::after {
          content: '';
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.04) 70%, transparent);
          pointer-events: none;
        }
        [data-theme="light"] .desktop-sidebar {
          background: rgba(10, 10, 10, 0.68) !important;
          backdrop-filter: blur(20px) saturate(160%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(160%) !important;
          border: 1px solid rgba(255,255,255,0.06) !important;
          box-shadow: 8px 12px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04) !important;
        }
        .nav-link {
          color: var(--text-secondary);
          background: transparent;
          transform: translateX(0);
          transition: transform 0.25s ease, color 0.25s ease, background 0.25s ease;
        }
        .nav-link:hover {
          color: var(--text-primary) !important;
          background: rgba(255,255,255,0.05) !important;
          transform: translateX(4px);
        }
        [data-theme="light"] .nav-link {
          color: rgba(255,255,255,0.7);
        }
        [data-theme="light"] .nav-link:hover {
          color: rgba(255,255,255,1) !important;
        }
        [data-theme="light"] .nav-link svg {
          color: rgba(255,255,255,0.65);
        }
        [data-theme="light"] .nav-link:hover svg {
          color: rgba(255,255,255,1);
        }
        .social-link {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: 0.1em;
          transition: color 0.2s ease;
        }
        .social-link:hover {
          color: var(--text-primary);
        }
        [data-theme="light"] .social-link {
          color: rgba(255,255,255,0.6);
        }
        [data-theme="light"] .social-link:hover {
          color: rgba(255,255,255,1);
        }
        [data-theme="light"] .nav-label {
          color: rgba(255,255,255,0.5);
        }

        .nav-link.admin-link {
          background: linear-gradient(#111, #111) padding-box, linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%) border-box !important;
          border: 3px solid transparent !important;
          border-radius: 10px !important;
          box-shadow: 0 0 4px rgba(255,255,255,0.4), 0 0 12px rgba(255,255,255,0.15) !important;
          color: #fff !important;
          text-shadow: 0 0 8px rgba(255,255,255,0.3) !important;
        }
        .nav-link.admin-link svg {
          color: #fff !important;
          filter: drop-shadow(0 0 4px rgba(255,255,255,0.25)) !important;
        }
        .nav-link.admin-link::before,
        .nav-link.admin-link::after {
          display: none !important;
        }
        .nav-link.admin-link:hover {
        }
        [data-theme="light"] .nav-link.admin-link {
          background: linear-gradient(#111, #111) padding-box, linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%) border-box !important;
          border-color: transparent !important;
          box-shadow: 0 0 4px rgba(255,255,255,0.4), 0 0 12px rgba(255,255,255,0.15) !important;
        }
        [data-theme="light"] .nav-link.admin-link:hover {
        }

        .nav-link-h.admin-link-h {
          background: linear-gradient(#111, #111) padding-box, linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%) border-box;
          border: 3px solid transparent;
          border-radius: 8px;
          box-shadow: 0 0 4px rgba(255,255,255,0.4), 0 0 12px rgba(255,255,255,0.15);
          color: #fff;
          text-shadow: 0 0 8px rgba(255,255,255,0.3);
        }
        .nav-link-h.admin-link-h::before,
        .nav-link-h.admin-link-h::after {
          display: none !important;
        }
        .nav-link-h.admin-link-h:hover {
        }
        [data-theme="light"] .nav-link-h.admin-link-h {
          background: linear-gradient(#111, #111) padding-box, linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%) border-box;
          border-color: transparent;
          box-shadow: 0 0 4px rgba(255,255,255,0.4), 0 0 12px rgba(255,255,255,0.15);
        }
        [data-theme="light"] .nav-link-h.admin-link-h:hover {
        }

        .admin-link-m {
          background: linear-gradient(#111, #111) padding-box, linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%) border-box;
          border: 3px solid transparent;
          border-radius: 8px;
          box-shadow: 0 0 4px rgba(255,255,255,0.4), 0 0 12px rgba(255,255,255,0.15);
          color: #fff;
          text-shadow: 0 0 8px rgba(255,255,255,0.3);
        }
        .admin-link-m::before,
        .admin-link-m::after {
          display: none !important;
        }
        .admin-link-m:hover {
        }
        [data-theme="light"] .admin-link-m {
          background: linear-gradient(#111, #111) padding-box, linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%) border-box;
          border-color: transparent;
          box-shadow: 0 0 4px rgba(255,255,255,0.4), 0 0 12px rgba(255,255,255,0.15);
        }
        [data-theme="light"] .admin-link-m:hover {
        }
      `}</style>
      </>
    )
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -40 }}
        animate={{
          opacity: showNavbar ? 1 : 0,
          y: showNavbar ? 0 : -40,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: 'fixed',
          top: 20,
          left: isMobile ? 20 : 60,
          right: isMobile ? 20 : 60,
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 30px',
            width: '100%',
            borderRadius: 999,
            backgroundColor: 'var(--nav-glass)',
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 16px 50px rgba(0,0,0,0.25)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
              <SKLogo />
            </div>

            <ThemeToggle />
          </div>

          {!isMobile && (
            <div style={{ display: 'flex', gap: 40 }}>
              {navItems.map((item) => {
                const isActive = activeSection === item.id
                const isAdmin = item.id === 'admin'

                if (isAdmin) {
                  return (
                    <Fragment key={item.id}>
                      <span
                        style={{
                          width: 1,
                          height: 16,
                          background: 'rgba(255,255,255,0.1)',
                          alignSelf: 'center',
                        }}
                      />
                  <Link
                    href="/admin"
                    prefetch={true}
                    className="nav-link-h admin-link-h"
                      style={{
                        position: 'relative',
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 13,
                        textDecoration: 'none',
                        letterSpacing: '0.08em',
                        cursor: 'pointer',
                        padding: '6px 16px',
                        borderRadius: 8,
                        overflow: 'hidden',
                        transition: '0.25s ease',
                      }}
                      >
                        {item.label}
                      </Link>
                    </Fragment>
                  )
                }

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => smoothScrollTo(e, `#${item.id}`)}
                    style={{
                      position: 'relative',
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 13,
                      color: isActive
                        ? 'var(--text-primary)'
                        : 'var(--text-secondary)',
                      textDecoration: 'none',
                      letterSpacing: '0.08em',
                      cursor: 'pointer',
                      paddingBottom: 4,
                      transition: '0.25s ease',
                    }}
                  >
                    {item.label}

                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: 1,
                        background: 'var(--text-primary)',
                        transform: isActive
                          ? 'scaleX(1)'
                          : 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.25s ease',
                      }}
                    />
                  </a>
                )
              })}
            </div>
          )}

          {isMobile && (
            <div
              onClick={() => setOpen(!open)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                cursor: 'pointer',
              }}
            >
              <span style={{ width: 20, height: 2, background: 'var(--text-primary)' }} />
              <span style={{ width: 20, height: 2, background: 'var(--text-primary)' }} />
              <span style={{ width: 20, height: 2, background: 'var(--text-primary)' }} />
            </div>
          )}
        </div>

        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              marginTop: 10,
              borderRadius: 16,
              background: 'var(--nav-bg-solid)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(12px)',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id
              const isAdmin = item.id === 'admin'

              if (isAdmin) {
                return (
                  <Fragment key={item.id}>
                    <div
                      style={{
                        height: 1,
                        background: 'var(--border)',
                        margin: '2px 0 6px',
                      }}
                    />
                    <Link
                      href="/admin"
                      prefetch={true}
                      className="admin-link-m"
                      style={{
                        position: 'relative',
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 13,
                        textDecoration: 'none',
                        padding: '6px 14px',
                        borderRadius: 8,
                        display: 'inline-block',
                        overflow: 'hidden',
                      }}
                    >
                      {item.label}
                    </Link>
                  </Fragment>
                )
              }

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => smoothScrollTo(e, `#${item.id}`)}
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13,
                    color: isActive
                      ? 'var(--text-primary)'
                      : 'var(--text-secondary)',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </a>
              )
            })}
          </motion.div>
        )}
      </motion.nav>
      <style>{`
        .admin-link-m {
          background: linear-gradient(#111, #111) padding-box, linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%) border-box;
          border: 3px solid transparent;
          border-radius: 8px;
          box-shadow: 0 0 4px rgba(255,255,255,0.4), 0 0 12px rgba(255,255,255,0.15);
          color: #fff;
          text-shadow: 0 0 8px rgba(255,255,255,0.3);
        }
        .admin-link-m::before,
        .admin-link-m::after {
          display: none !important;
        }
        .admin-link-m:hover {
        }
        [data-theme="light"] .admin-link-m {
          background: linear-gradient(#111, #111) padding-box, linear-gradient(135deg, #ffffff 0%, #666666 50%, #ffffff 100%) border-box;
          border-color: transparent;
          box-shadow: 0 0 4px rgba(255,255,255,0.4), 0 0 12px rgba(255,255,255,0.15);
        }
        [data-theme="light"] .admin-link-m:hover {
        }
      `}</style>
    </>
  )
}