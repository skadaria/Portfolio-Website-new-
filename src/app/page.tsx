'use client'

import { useLayoutEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import AnimatedBackground from '@/components/AnimatedBackground'
import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import PortfolioShowcase from '@/components/sections/PortfolioShowcase'
import ContactSection from '@/components/sections/contact/ContactSection'
import WelcomeScreen from '@/components/WelcomeScreen'

import { hasPlayedIntro, setIntroPlayed } from '@/lib/introState'

const LAST_WELCOME_ANIMATION_END = 3700

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showApp, setShowApp] = useState(false)
  const [bgBlobsReady, setBgBlobsReady] = useState(false)
  const [exitDuration, setExitDuration] = useState(1)

useLayoutEffect(() => {
  const currentHash = window.location.hash
  const pathname = window.location.pathname

  if (currentHash === '#portfolio') {
      setExitDuration(0)
      setShowWelcome(false)
      setShowApp(true)
      return
    }

  const navEntries = performance.getEntriesByType('navigation')
  const navigationType =
    navEntries.length > 0
      ? (navEntries[0] as PerformanceNavigationTiming).type
      : null

  const isReload = navigationType === 'reload'

  if (isReload && pathname === '/') {
    sessionStorage.removeItem('introPlayed')
    sessionStorage.removeItem('heroPlayed')

    if (window.location.hash) {
      history.replaceState(null, '', '/')
    }

    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })
  }

  if (!hasPlayedIntro()) {
      setShowWelcome(true)
      setShowApp(true)

      const exitTimer = setTimeout(() => {
        setShowWelcome(false)
        setIntroPlayed()
      }, LAST_WELCOME_ANIMATION_END)

      const bgTimer = setTimeout(() => {
        setBgBlobsReady(true)
      }, LAST_WELCOME_ANIMATION_END - 500)

      return () => {
        clearTimeout(exitTimer)
        clearTimeout(bgTimer)
      }
    } else {
      setExitDuration(0)
      setShowWelcome(false)
      setShowApp(true)
    }
}, [])

  return (
    <main className="lg:ml-[240px]" style={{ position: 'relative', overflow: 'hidden' }}>
      <AnimatedBackground reduced={showWelcome && !bgBlobsReady} />

      {useMemo(() => (
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />
        <Hero showApp={showApp} />
        <About />
        <PortfolioShowcase />
        <ContactSection />
      </div>
      ), [showApp])}

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            key="welcome"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{
              duration: exitDuration,
              ease: [0.45, 0, 0.55, 1],
            }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              willChange: 'transform',
            }}
          >
            <WelcomeScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
