"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Code,
  Award,
  Globe,
  FileText,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

const skills = ["HTML/CSS/JS", "Python", "SQL", "PHP/Laravel", "Oracle"];

const stagger = 0.04;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: stagger },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.15, ease: "easeOut" },
  },
};

export default function About() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollToPortfolio = () => {
    const el = document.getElementById("portfolio");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (isMobile === null) return null;

  const stats = [
    {
      icon: <Code size={14} />,
      value: "4",
      title: "PROJECTS",
    },
    {
      icon: <Award size={14} />,
      value: "1",
      title: "CERTIFICATES",
    },
    {
      icon: <Globe size={14} />,
      value: "4",
      title: "COMPLETED WORKS",
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-start justify-center overflow-hidden"
      style={{
        padding: isMobile ? "40px 16px" : "60px",
      }}
    >
      {/* Glass container */}
      <div className="glass-card about-glass-text rounded-[32px] w-full relative z-[1] max-w-[1300px] mx-auto overflow-hidden" style={{ padding: isMobile ? "32px 20px" : "48px 52px" }}>

        <div
          className={isMobile ? "flex flex-col gap-8" : "flex flex-row items-center justify-between gap-10"}
        >
          {/* LEFT */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-[580px] w-full"
          >
            {/* Section label */}
            <motion.div variants={fadeUp} className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(var(--c-light),0.1)] bg-[rgba(var(--c-light),0.05)] font-['DM_Mono'] text-[11px] text-[var(--text-muted)] tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                About Me
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={fadeUp}>
              <h2 className="font-extrabold leading-[1.03] text-[var(--text-primary)]"
                style={{ fontSize: isMobile ? 32 : "clamp(32px,5vw,46px)" }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-primary)] to-[var(--accent)]">
                  Web
                </span>
                <br />
                <span className="text-[var(--accent)]">Developer</span>
              </h2>
            </motion.div>

            {/* Bio */}
            <motion.div variants={fadeUp} className="mt-5 pl-4 border-l-2 border-[var(--accent)]">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-[490px]">
                I'm Srijal Kadariya, an enthusiastic learner on a quest for education and discovery. My academic journey began at Monastic Public English School, followed by my pursuit of Science in +2 at Trinity International SS and College. Currently, I'm deeply engaged in the tech and computing sphere, pursuing a Bachelor's in BSc (Hons) Computing at The British College, affiliated with the University of West of England and Leeds Beckett University. Through my blog, I'm sharing my experiences, insights, and findings as I navigate the diverse realms of academia.
              </p>
            </motion.div>

            {/* Quote */}
            <motion.div
              variants={fadeUp}
              className="mt-5 inline-flex items-center gap-3 rounded-xl border border-[rgba(var(--c-light),0.08)] bg-[rgba(var(--c-light),0.04)] px-5 py-3 w-auto"
            >
              <span className="text-[var(--accent)] text-lg leading-none">"</span>
              <span className="text-xs italic text-[var(--text-secondary)]">
                Turning ideas into clean, modern, and meaningful digital
                experiences.
              </span>
              <span className="text-[var(--accent)] text-lg leading-none self-end">"</span>
            </motion.div>

            {/* Skills tags */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-2 mt-5"
            >
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-tag px-3 py-1 rounded-full border border-[rgba(var(--c-light),0.1)] bg-[rgba(var(--c-light),0.04)] font-['DM_Mono'] text-[10px] text-[var(--text-secondary)] tracking-wider uppercase"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex gap-3 mt-6 flex-wrap"
            >
              <a
                href="https://drive.google.com/file/d/1B29j43onUHFPezPAyN8okMfG1fZ6BoVK/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline"
              >
                <button className="about-btn-primary flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--bg-white)] bg-[var(--bg-white)] text-[var(--bg-black)] text-sm font-semibold cursor-pointer">
                  <FileText size={14} />
                  Download CV
                  <ExternalLink size={12} />
                </button>
              </a>

              <button
                onClick={scrollToPortfolio}
                className="about-btn-secondary flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] bg-transparent text-[var(--text-primary)] text-sm font-semibold cursor-pointer"
              >
                <ArrowUpRight size={14} />
                View Projects
              </button>
            </motion.div>
          </motion.div>

          {/* IMAGE */}
          {!isMobile && (
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex-shrink-0"
            >
              <div className="profile-image-wrapper relative">
                {/* Animated glow ring */}
                <div className="profile-ring" />
                <div className="relative p-[3px] rounded-full">
                  <img
                    src="/assets/sk.png"
                    alt="Profile"
                    className="profile-img w-[220px] h-[220px] rounded-full object-cover block"
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* STATS CARDS */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 mt-9"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          }}
        >
          {stats.map((item, i) => (
            <motion.div
              key={i}
              variants={pop}
              className="stat-card relative rounded-2xl border border-[rgba(var(--c-light),0.08)] bg-[rgba(var(--c-light),0.03)] p-5 cursor-pointer overflow-hidden"
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Hover glow overlay */}
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                  opacity: hoveredCard === i ? 1 : 0,
                  background:
                    "radial-gradient(600px circle at 50% 50%, rgba(255,255,255,0.04), transparent 80%)",
                }}
              />

              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full border border-[rgba(var(--c-light),0.1)] flex items-center justify-center text-[var(--text-muted)]">
                  {item.icon}
                </div>
                <span className="text-lg font-bold text-[var(--text-primary)]">
                  {item.value}
                </span>
              </div>

              <div className="font-['DM_Mono'] text-[10px] tracking-[0.12em] text-[var(--text-muted)]">
                {item.title}
              </div>

              <button
                onClick={scrollToPortfolio}
                className="absolute bottom-3 right-3 w-7 h-7 rounded-full border border-[rgba(var(--c-light),0.08)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[rgba(var(--c-light),0.06)] transition-all cursor-pointer"
              >
                <ArrowUpRight size={13} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .profile-image-wrapper {
          position: relative;
        }
        .profile-ring {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          animation: ringPulse 3s ease-in-out infinite;
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); box-shadow: 0 0 40px rgba(255,255,255,0.08); }
        }
        @keyframes ringPulseLight {
          0%, 100% { opacity: 0.5; transform: scale(1); box-shadow: 0 0 20px rgba(0,0,0,0.05); }
          50% { opacity: 1; transform: scale(1.04); box-shadow: 0 0 50px rgba(0,0,0,0.12); }
        }
        .profile-img {
          border-radius: 50%;
        }
        .about-btn-primary {
          transition: all 0.25s ease;
        }
        .about-btn-primary:hover {
          transform: translateY(-2px) scale(1.03);
          opacity: 0.92;
        }
        .about-btn-secondary {
          transition: all 0.25s ease;
        }
        .about-btn-secondary:hover {
          transform: translateY(-2px) scale(1.03);
          opacity: 0.85;
          background: rgba(255,255,255,0.04);
        }
        .skill-tag {
          transition: all 0.25s ease;
        }
        .skill-tag:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-1px);
        }
        .stat-card {
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }
        [data-theme="light"] .profile-ring {
          border-color: rgba(0,0,0,0.18);
          animation: ringPulseLight 3s ease-in-out infinite;
        }
        [data-theme="light"] .skill-tag {
          color: var(--text-muted);
          border-color: rgba(0,0,0,0.08);
          background: rgba(0,0,0,0.03);
        }
        [data-theme="light"] .skill-tag:hover {
          color: var(--text-primary);
          background: rgba(0,0,0,0.06);
          border-color: rgba(0,0,0,0.15);
        }
        [data-theme="light"] .stat-card {
          border-color: rgba(0,0,0,0.06);
          background: rgba(255,255,255,0.5);
        }
        [data-theme="light"] .stat-card:hover {
          border-color: rgba(0,0,0,0.15);
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }
        [data-theme="light"] .about-btn-primary {
          border-color: #1a1a1a;
          background: #1a1a1a;
          color: #ffffff;
        }
        [data-theme="light"] .about-btn-secondary {
          border-color: rgba(0,0,0,0.15);
          color: var(--text-primary);
        }
        [data-theme="light"] .about-btn-secondary:hover {
          background: rgba(0,0,0,0.04);
        }
        [data-theme="light"] .about-glass-text {
          --text-primary: #1a1a1a;
          --text-secondary: #555555;
          --text-muted: #888888;
          --border: rgba(0,0,0,0.08);
          --accent: #333333;
        }
      `}</style>
    </section>
  );
}
