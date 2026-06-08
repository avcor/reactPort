import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, MapPin, Layers } from 'lucide-react'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const y       = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, reduced ? 1 : 0])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="w-full flex flex-col items-center text-center px-5 md:px-10 lg:px-16"
      >
        {/* Badge */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="mb-10"
        >
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 hover:border-white/20 text-text-dim hover:text-text-muted text-xs tracking-wider transition-all duration-200 group"
          >
            Say hi on LinkedIn
            <ArrowUpRight size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Giant name — full viewport width */}
        <motion.h1
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="font-black text-text-primary uppercase leading-none w-full max-w-5xl select-none"
          style={{ fontSize: 'clamp(3.5rem, 14vw, 11rem)', letterSpacing: '-0.05em', lineHeight: 1 }}
        >
          Abhishek
        </motion.h1>

        {/* Two-line tagline */}
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="mt-8 text-center space-y-3"
        >
          <p className="text-sm md:text-xl tracking-[0.4em] uppercase text-white/40">
            I build Android systems that perform under pressure —
          </p>
          <p className="font-serif italic text-4xl md:text-7xl text-text-primary lowercase leading-tight">
            half a million users, zero compromises.
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom-left: location */}
      <motion.div
        initial={reduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-8 left-6 md:left-10 flex flex-col gap-1"
      >
        <MapPin size={14} className="text-text-dim" />
        <p className="text-[10px] font-mono uppercase tracking-widest text-text-dim leading-tight">
          Remote · India
        </p>
      </motion.div>

      {/* Bottom-right: role */}
      <motion.div
        initial={reduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-8 right-6 md:right-10 flex flex-col items-end gap-1"
      >
        <Layers size={14} className="text-text-dim" />
        <p className="text-[10px] font-mono uppercase tracking-widest text-text-dim leading-tight text-right">
          Android Eng,<br />& 4+ yrs exp
        </p>
      </motion.div>
    </section>
  )
}
