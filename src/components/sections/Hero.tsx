"use client";

import { useEffect, useState, useRef, startTransition } from "react";
import { motion } from "framer-motion";
import App from "@/components/band/App";
import TextType from "@/components/band/TextType";

const skills = ["Python/Django", "HTML/CSS/JS", "laravel/PHP", "SQL/Oracle"];

type HeroProps = {
  showApp: boolean;
};

const CARD_REVEAL_DURATION = 1.5;
const CARD_REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const CARD_REVEAL_DELAY = 4000;
const CANVAS_READY_DELAY = 3500;

export default function Hero({ showApp }: HeroProps) {
  const [startAnim, setStartAnim] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cardReveal, setCardReveal] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const lastResetRef = useRef(0);
  const lastInTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const cardRevealRef = useRef(false);
  const isMobileRef = useRef(false);

  useEffect(() => {
    cardRevealRef.current = cardReveal;
  }, [cardReveal]);

  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const heroPlayed = sessionStorage.getItem("heroPlayed");

    if (heroPlayed === "true") {
      startTransition(() => {
        setStartAnim(true);
        setCardReveal(true);
        setCanvasReady(true);
      });
      return;
    }

    const delay = 3700;

    const textTimer = setTimeout(() => {
      setStartAnim(true);
    }, delay);

    const appTimer = setTimeout(() => {
      sessionStorage.setItem("heroPlayed", "true");
    }, delay + 1500);

    const canvasTimer = setTimeout(() => {
      setCanvasReady(true);
    }, CANVAS_READY_DELAY);

    const cardTimer = setTimeout(() => {
      setCardReveal(true);
    }, CARD_REVEAL_DELAY);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(appTimer);
      clearTimeout(canvasTimer);
      clearTimeout(cardTimer);
    };
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          lastInTimerRef.current = setTimeout(() => {
            const now = Date.now();
            if (now - lastResetRef.current > 1500) {
              lastResetRef.current = now;
              window.dispatchEvent(new CustomEvent('band-reset'));
            }
          }, 150);
        } else {
          clearTimeout(lastInTimerRef.current);
          if (cardRevealRef.current) {
            window.dispatchEvent(new CustomEvent('band-hook'));
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="px-6 md:pl-[120px] md:pr-[60px]"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* APP LAYER */}
      <motion.div
        initial={false}
        animate={{
          opacity: cardReveal ? 1 : 0,
        }}
        transition={{
          duration: CARD_REVEAL_DURATION,
          ease: CARD_REVEAL_EASE,
        }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 40,
          pointerEvents: showApp && cardReveal ? "auto" : "none",
          willChange: "transform, opacity",
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        }}
      >
        {showApp && canvasReady && <App cardReveal={cardReveal} visible={visible} />}

        {cardReveal && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              bottom: isMobile ? '28%' : '14%',
              left: isMobile ? 0 : '50%',
              right: 0,
              width: '100%',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: isMobile ? 'center' : 'flex-start',
                paddingLeft: isMobile ? 0 : 'calc(26% + 1px)',
                transform: isMobile ? 'translateX(-2px)' : 'none',
              }}
            >
              <motion.span
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                }}
              >
                drag the card
              </motion.span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* TEXT */}
        <div
          className="md:max-w-[600px]"
          style={{
            width: '100%',
            position: 'relative',
            zIndex: 45,
            pointerEvents: 'none',
          }}
        >
          {!isMobile && (
            <motion.span
              initial={false}
              className="inline-block px-4 py-2 rounded-full glass-card"
              style={{
                fontSize: 12,
                color: 'var(--text-primary)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              <span>{"\u2726"}</span> Available for work
            </motion.span>
          )}

        {/* HEADING */}
        <div style={{ marginTop: 32 }}>
          <motion.h1
            initial={false}
            animate={
              startAnim
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.85, y: 50 }
            }
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontSize: "clamp(32px, 6vw, 62px)",
              fontWeight: 800,
              lineHeight: 1.05,
              color: "var(--text-primary)",
              letterSpacing: "calc(-0.03em + 2px)",
              marginBottom: 0,
            }}
          >
            Srijal
          </motion.h1>

          <motion.h1
            initial={false}
            animate={
              startAnim
                ? { opacity: 1, x: 0, rotate: 0 }
                : { opacity: 0, x: -80, rotate: -4 }
            }
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontSize: "clamp(32px, 6vw, 62px)",
              fontWeight: 800,
              lineHeight: 1.05,
              color: "var(--text-secondary)",
              letterSpacing: "-0.03em",
              marginBottom: 8,
            }}
          >
            Kadariya
          </motion.h1>
        </div>


        <motion.div
          initial={false}
          animate={startAnim ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{ marginBottom: 12 }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 15,
              color: "var(--text-secondary)",
              letterSpacing: "0.1em",
            }}
          >
            <TextType
              text={["IT Student", "Web Developer", "Happy coding!"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              deletingSpeed={50}
              cursorBlinkDuration={0.5}
            />
          </span>
        </motion.div>

        {!isMobile && (
          <motion.div
            initial={false}
            animate={
              startAnim
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 50, scale: 0.96 }
            }
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              marginBottom: 28,
              width: "100%",
              maxWidth: 460,
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.9,
                letterSpacing: "0.01em",
                textWrap: "pretty",
              }}
            >
              I create scalable web applications and modern websites with a focus on performance, usability, and clean development practices.
            </p>
          </motion.div>
        )}

        {!isMobile && (
          <motion.div
            initial="hidden"
            animate={startAnim ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.7,
                },
              },
            }}
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginBottom: 28,
            }}
          >
            {skills.map((skill) => (
              <motion.span
                key={skill}
                variants={{
                  hidden: { opacity: 0, y: 25, scale: 0.85 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.5 }}
                className="bg-[var(--bg-card)]"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: 999,
                  padding: "5px 12px",
                }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        )}

        {!isMobile && (
          <motion.div
            initial={false}
            animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
                color: "var(--text-muted)",
              }}
            >
              ↓ explore my work below
            </span>

            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 13,
                color: "var(--text-muted)",
              }}
            >
              ↗ open to full-time & freelance opportunities
            </span>
          </motion.div>
        )}
      </div>
      <motion.div
        initial={false}
        animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: 0.9,
          delay: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          position: "absolute",
          bottom: isMobile ? 80 : 38,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <motion.div
          initial={false}
          animate={
            startAnim
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 40 }
          }
          transition={{
            duration: 0.9,
            delay: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-full flex justify-center"
        >
          <motion.div
            animate={{
              y: [0, 6, 0],
              opacity: [1, 0.65, 1],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex items-center justify-center gap-2"
          >
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}
            >
              Scroll
            </span>

            <span
              style={{
                fontSize: 16,
                color: 'var(--text-secondary)',
                lineHeight: 1,
              }}
            >
              ↓
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
