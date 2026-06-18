import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface ChapterTransitionProps {
  statement: string
  followUp?: string
  chapterNumber?: string
  chapterLabel?: string
}

export function ChapterTransition({
  statement,
  followUp,
  chapterNumber,
  chapterLabel,
}: ChapterTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const reduced = useReducedMotion()

  return (
    <div
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center bg-black px-6 py-24 relative overflow-hidden"
    >
      {/* Subtle horizontal rule */}
      <motion.div
        className="w-px bg-gradient-to-b from-transparent via-white/10 to-transparent absolute left-1/2 -translate-x-1/2"
        style={{ height: '30vh', top: 0 }}
        initial={reduced ? {} : { opacity: 0 }}
        animate={inView || reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      />

      <div className="text-center max-w-3xl mx-auto relative z-10">
        {/* Chapter number */}
        {chapterNumber && (
          <motion.p
            className="font-mono text-[11px] text-text-dim uppercase tracking-[0.35em] mb-8"
            initial={reduced ? {} : { opacity: 0 }}
            animate={inView || reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {chapterNumber}
          </motion.p>
        )}

        {/* Bridge statement */}
        <motion.p
          className="font-serif italic text-white/60 leading-snug"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)' }}
          initial={reduced ? {} : { opacity: 0, y: 24 }}
          animate={inView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {statement}
        </motion.p>

        {/* Follow-up line */}
        {followUp && (
          <motion.p
            className="font-serif italic text-white leading-snug mt-3 md:mt-4"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)' }}
            initial={reduced ? {} : { opacity: 0, y: 24 }}
            animate={inView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {followUp}
          </motion.p>
        )}

        {/* Next chapter label */}
        {chapterLabel && (
          <motion.div
            className="mt-12 flex items-center justify-center gap-3"
            initial={reduced ? {} : { opacity: 0 }}
            animate={inView || reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="h-px w-8 bg-accent/40" />
            <p className="font-mono text-[11px] text-accent uppercase tracking-[0.3em]">
              {chapterLabel}
            </p>
            <div className="h-px w-8 bg-accent/40" />
          </motion.div>
        )}
      </div>

      {/* Bottom rule */}
      <motion.div
        className="w-px bg-gradient-to-b from-transparent via-white/10 to-transparent absolute left-1/2 -translate-x-1/2"
        style={{ height: '30vh', bottom: 0 }}
        initial={reduced ? {} : { opacity: 0 }}
        animate={inView || reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </div>
  )
}
