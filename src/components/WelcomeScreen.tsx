'use client'

import { motion } from 'framer-motion'
import { Code2, User, Globe } from 'lucide-react'

export default function WelcomeScreen() {
  const icons = [Code2, User, Globe]

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          textAlign: 'center',
          color: 'var(--text-primary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          width: '100%',
          maxWidth: '320px',
          willChange: 'opacity',
        }}
      >
        {/* ICONS */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.35,
              },
            },
          }}
          style={{
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.3,
                  rotate: -140,
                  y: 60,
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  y: 0,
                  transition: {
                    duration: 1.8,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '999px',
                border: '1px solid rgba(var(--c-light),0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(var(--c-light),0.03)',
                willChange: 'transform, opacity',
              }}
            >
              <Icon size={18} color="currentColor" strokeWidth={1.5} />
            </motion.div>
          ))}
        </motion.div>

        {/* TEXT */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              flexWrap: 'wrap',
            }}
          >
            {/* Welcome */}
            <motion.span
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 1.2,
                duration: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                fontSize: 'clamp(18px, 3vw, 30px)',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                willChange: 'transform, opacity',
              }}
            >
              Welcome
            </motion.span>

            {/* to my */}
            <motion.span
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 1.5,
                duration: 1.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                fontSize: 'clamp(18px, 3vw, 30px)',
                fontWeight: 800,
                letterSpacing: '-0.05em',
                willChange: 'transform, opacity',
              }}
            >
              to my
            </motion.span>
          </div>

          {/* Portfolio */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.8,
              duration: 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontSize: 'clamp(18px, 3vw, 30px)',
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: 1.15,
              margin: 0,
              textAlign: 'center',
              whiteSpace: 'nowrap',
              willChange: 'transform, opacity',
            }}
          >
            Portfolio Website
          </motion.h1>
        </div>

        {/* DOMAIN CAPSULE */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 2.1,
            duration: 1.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            padding: '6px 14px',
            borderRadius: '999px',
            border: '1px solid rgba(var(--c-light),0.12)',
            background: 'rgba(var(--c-light),0.04)',
            fontSize: '12px',
            letterSpacing: '0.12em',
            color: 'rgba(var(--c-light),0.7)',
            willChange: 'transform, opacity',
          }}
        >
          www.srijalkadariya.com.np
        </motion.div>
      </motion.div>
    </div>
  )
}