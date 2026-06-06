'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, Variants } from 'framer-motion'
import { ArrowUpRight, Check, Loader2, ChevronDown } from 'lucide-react'
import {
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from 'react-icons/fa'

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: smoothEase } },
}

const socialLinks = [
  { title: 'LinkedIn', icon: FaLinkedinIn, link: 'https://www.linkedin.com/in/srijal-kadariya-4694b629a/' },
  { title: 'Instagram', icon: FaInstagram, link: 'https://www.instagram.com/srijal_k12/' },
  { title: 'Github', icon: FaGithub, link: 'https://github.com/skadaria?tab=repositories' },
]

const projectTypes = [
  { value: '', label: 'Select type' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-app', label: 'Mobile App' },
  { value: 'ui-ux', label: 'UI/UX Design' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' },
]

type FormData = {
  name: string
  email: string
  subject: string
  projectType: string
  message: string
}

type Errors = Partial<Record<keyof FormData, string>>

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', subject: '', projectType: '', message: '',
  })
  const [focused, setFocused] = useState<string | null>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const e: Errors = {}
    if (!formData.name.trim()) e.name = 'Required'
    if (!formData.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email'
    if (!formData.subject.trim()) e.subject = 'Required'
    if (!formData.message.trim()) e.message = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)

    try {
      const emailjs = (await import('@emailjs/browser')).default
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          projectType: formData.projectType,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setSuccess(true)
      setFormData({ name: '', email: '', subject: '', projectType: '', message: '' })
      setTimeout(() => setSuccess(false), 4000)
    } catch (err) {
      console.error(err)
      alert('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const autoResize = useCallback(() => {
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = 'auto'
      ta.style.height = Math.min(ta.scrollHeight, 280) + 'px'
    }
  }, [])

  const inputBase =
    'w-full h-[48px] px-4 rounded-xl text-sm outline-none transition-all duration-200 ' +
    'text-[var(--text-primary)] bg-[rgba(0,0,0,0.25)] border ' +
    'placeholder:text-[var(--text-muted)]'

  const getBorder = (field: string) =>
    errors[field as keyof Errors]
      ? 'border-[rgba(255,80,80,0.4)]'
      : focused === field
        ? 'border-[rgba(255,255,255,0.3)]'
        : 'border-[var(--border)]'

  const inputClasses = (field: string) =>
    `${inputBase} ${getBorder(field)}`

  const labelClasses = 'block text-[11px] text-[var(--text-muted)] tracking-wider uppercase mb-1.5'

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: smoothEase }}
      viewport={{ once: true }}
      className="relative w-full max-w-[620px] mx-auto"
    >
      <div className="glass-card rounded-[24px] overflow-hidden">
        <div className="p-7 md:p-9">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            viewport={{ once: true }}
          >
            <h2 className="text-[22px] md:text-[26px] font-bold tracking-tight text-[var(--text-primary)]">
              Start a Conversation
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">
              Have a project in mind? Fill out the form and I&apos;ll get back within 24 hours.
            </p>
            <div className="h-px mt-5 bg-gradient-to-r from-[var(--border)] to-transparent" />
          </motion.div>

          {/* FORM */}
          <motion.form
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="mt-6 space-y-4"
          >
            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={fadeUp}>
                <label className={labelClasses}>Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  placeholder="John Doe"
                  className={inputClasses('name')}
                />
                {errors.name && <p className="mt-1 text-[10px] text-[rgba(255,80,80,0.7)]">{errors.name}</p>}
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className={labelClasses}>Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="john@example.com"
                  className={inputClasses('email')}
                />
                {errors.email && <p className="mt-1 text-[10px] text-[rgba(255,80,80,0.7)]">{errors.email}</p>}
              </motion.div>
            </div>

            {/* Row 2: Subject + Project Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div variants={fadeUp}>
                <label className={labelClasses}>Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                  placeholder="What is this about?"
                  className={inputClasses('subject')}
                />
                {errors.subject && <p className="mt-1 text-[10px] text-[rgba(255,80,80,0.7)]">{errors.subject}</p>}
              </motion.div>

              <motion.div variants={fadeUp}>
                <label className={labelClasses}>Project Type</label>
                <div className="relative">
                  <select
                    value={formData.projectType}
                    onChange={(e) => handleChange('projectType', e.target.value)}
                    onFocus={() => setFocused('projectType')}
                    onBlur={() => setFocused(null)}
                    className={`${inputBase} ${getBorder('projectType')} appearance-none cursor-pointer`}
                  >
                    {projectTypes.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#141414]">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
                </div>
              </motion.div>
            </div>

            {/* Message */}
            <motion.div variants={fadeUp}>
              <label className={labelClasses}>Message</label>
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    handleChange('message', e.target.value)
                    autoResize()
                  }}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  placeholder="Tell me about your project..."
                  className={`${inputBase} ${getBorder('message')} resize-none min-h-[140px] pt-3 pb-6`}
                />
                <span className="absolute right-3 bottom-2 text-[10px] text-[var(--text-muted)] font-mono opacity-40">
                  {String(formData.message.length).padStart(3, '0')}
                </span>
              </div>
              {errors.message && <p className="mt-1 text-[10px] text-[rgba(255,80,80,0.7)]">{errors.message}</p>}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="contact-btn relative w-full h-[48px] rounded-xl overflow-hidden text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--text-primary)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <><Loader2 size={15} className="animate-spin" /> Sending...</>
                  ) : success ? (
                    <><Check size={15} /> Sent!</>
                  ) : (
                    <>Send Message <ArrowUpRight size={15} /></>
                  )}
                </span>
              </motion.button>
            </motion.div>
          </motion.form>

          {/* SOCIAL */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-6 pt-5 border-t border-[var(--border)]"
          >
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <motion.a
                    key={item.title}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-200"
                  >
                    <Icon size={11} />
                    {item.title}
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        select option {
          background: #141414;
          color: #f0f0f0;
        }
        [data-theme="light"] input,
        [data-theme="light"] select,
        [data-theme="light"] textarea {
          background: rgba(255,255,255,0.5) !important;
        }
        [data-theme="light"] .contact-btn {
          background: rgba(0,0,0,0.06) !important;
          border-color: rgba(0,0,0,0.1) !important;
        }
        [data-theme="light"] .contact-btn:hover {
          background: rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </motion.div>
  )
}
