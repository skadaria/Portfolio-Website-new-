'use client'

import React, { useEffect, useRef, useState } from 'react'

interface AnimatedBackgroundProps {
  reduced?: boolean;
}

const AnimatedBackground = ({ reduced }: AnimatedBackgroundProps) => {
  const [isMobile, setIsMobile] = useState(false)
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return

    let ticking = false

    const updateBlobs = () => {
      const scroll = window.pageYOffset

      blobRefs.current.forEach((blob, index) => {
        if (!blob) return

        const xOffset =
          Math.sin(scroll / 120 + index * 0.6) * 100

        const yOffset =
          Math.cos(scroll / 120 + index * 0.6) * 35

        blob.style.transform = `translate3d(${xOffset}px, ${yOffset}px, 0)`
      })

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateBlobs)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateBlobs()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isMobile])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0" style={{ opacity: reduced ? 0 : 1, transition: 'opacity 1s ease', display: isMobile ? 'none' : undefined }}>
        {/* kiri atas */}
        <div
          ref={(ref) => {
            blobRefs.current[0] = ref
          }}
          className="absolute top-10 left-10 w-40 h-40 md:w-56 md:h-56 rounded-full blur-[20px] md:blur-[90px] opacity-[0.07]"
          style={{ backgroundColor: 'rgb(var(--blob-1))', willChange: 'transform', transition: 'transform 1.2s ease-out' }}
        />

        {/* kanan atas */}
        <div
          ref={(ref) => {
            blobRefs.current[1] = ref
          }}
          className="absolute top-10 right-10 w-40 h-40 md:w-56 md:h-56 rounded-full blur-[25px] md:blur-[100px] opacity-[0.06]"
          style={{ backgroundColor: 'rgb(var(--blob-2))', willChange: 'transform', transition: 'transform 1.2s ease-out' }}
        />

        {/* kiri bawah */}
        <div
          ref={(ref) => {
            blobRefs.current[2] = ref
          }}
          className="absolute bottom-10 left-10 w-44 h-44 md:w-60 md:h-60 rounded-full blur-[25px] md:blur-[110px] opacity-[0.06]"
          style={{ backgroundColor: 'rgb(var(--blob-3))', willChange: 'transform', transition: 'transform 1.2s ease-out' }}
        />

        {/* kanan bawah */}
        <div
          ref={(ref) => {
            blobRefs.current[3] = ref
          }}
          className="absolute bottom-10 right-10 w-40 h-40 md:w-56 md:h-56 rounded-full blur-[25px] md:blur-[100px] opacity-[0.05]"
          style={{ backgroundColor: 'rgb(var(--blob-4))', willChange: 'transform', transition: 'transform 1.2s ease-out' }}
        />
      </div>

      {/* GRAPH PAPER GRID */}
      <div
        className="absolute inset-0 bg-grid"
        style={{ opacity: 0.1, backgroundImage: 'url("/assets/grid.svg")' }}
      />
      <style>{`
        [data-theme="light"] .bg-grid {
          filter: invert(1);
          opacity: 0.1 !important;
        }
        @media (min-width: 768px) {
          [data-theme="light"] .bg-grid {
            opacity: 0.25 !important;
          }
        }
      `}</style>
    </div>
  )
}

export default AnimatedBackground