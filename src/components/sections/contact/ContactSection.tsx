'use client'

import { motion } from 'framer-motion'
import ContactForm from './ContactForm'

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full max-w-[1500px] mx-auto
      px-5 sm:px-6 md:px-10 lg:px-20
      pt-16 sm:pt-20 lg:pt-24
      pb-20 sm:pb-24 lg:pb-32
      text-[rgb(var(--c-light))]"
    >
      {/* Decorative gradient orbs */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 400,
          height: 400,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)',
          top: '-10%',
          right: '-5%',
        }}
      />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
          Contact Me
        </h1>
        <p className="text-[rgba(var(--c-light),0.55)] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Have a project in mind? Let&apos;s build something great together.
        </p>
      </motion.div>

      {/* FORM */}
      <div className="flex justify-center">
        <ContactForm />
      </div>

      {/* COPYRIGHT */}
      <div className="mt-16 sm:mt-20 text-center text-xs text-[rgba(var(--c-light),0.3)]">
        © 2026 Srijal Kadariya — All rights reserved.
      </div>
    </section>
  )
}
