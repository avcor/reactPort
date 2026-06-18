import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const LESSONS = [
  {
    id: 1,
    label: 'Performance',
    lesson: 'Users experience outcomes, not implementations.',
  },
  {
    id: 2,
    label: 'Reliability',
    lesson: 'Software is defined by how it behaves during failure.',
  },
  {
    id: 3,
    label: 'Modernization',
    lesson: 'Systems rarely need rewriting, but always need evolution.',
  },
  {
    id: 4,
    label: 'Trust',
    lesson: 'Verification matters more than assumptions.',
  },
  {
    id: 5,
    label: 'Product',
    lesson: 'Technology alone does not create great experiences.',
  },
]

function LessonBlock({ lesson, index }: { lesson: typeof LESSONS[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-25%' })
  const reduced = useReducedMotion()

  return (
    <div
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative"
    >
      {/* Left label */}
      <motion.p
        className="font-mono text-[10px] text-text-dim uppercase tracking-[0.35em] mb-6 text-center"
        initial={reduced ? {} : { opacity: 0 }}
        animate={inView || reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {lesson.label} taught me that
      </motion.p>

      {/* Lesson */}
      <motion.p
        className="font-serif italic text-white text-center leading-tight max-w-2xl"
        style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)' }}
        initial={reduced ? {} : { opacity: 0, y: 24 }}
        animate={inView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {lesson.lesson}
      </motion.p>

      {/* Lesson number */}
      <motion.p
        className="font-mono text-[10px] text-text-dim mt-8"
        initial={reduced ? {} : { opacity: 0 }}
        animate={inView || reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {String(index + 1).padStart(2, '0')} / {String(LESSONS.length).padStart(2, '0')}
      </motion.p>

      {/* Divider line */}
      {index < LESSONS.length - 1 && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      )}
    </div>
  )
}

function FinalScreen() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const reduced = useReducedMotion()

  return (
    <div
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-black relative"
    >
      {/* Ambient glow */}
      {!reduced && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgb(91,138,74,0.08) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2 }}
        />
      )}

      <div className="relative z-10 text-center max-w-xl">
        <motion.p
          className="font-serif italic text-white text-center leading-snug mb-8"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)' }}
          initial={reduced ? {} : { opacity: 0, y: 24 }}
          animate={inView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          I build software that disappears behind the experience.
        </motion.p>

        <motion.div
          className="space-y-1"
          initial={reduced ? {} : { opacity: 0 }}
          animate={inView || reduced ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <p className="font-black text-white uppercase tracking-tight" style={{ fontSize: 'clamp(1.2rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
            Abhishek Verma
          </p>
          <p className="font-mono text-accent uppercase tracking-[0.25em] text-xs">
            Android Engineer
          </p>
        </motion.div>

        {/* Fade to black bar */}
        <motion.div
          className="mt-16 h-px w-20 mx-auto bg-white/10"
          initial={reduced ? {} : { scaleX: 0 }}
          animate={inView || reduced ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        />
      </div>
    </div>
  )
}

export function FinalChapter() {
  return (
    <section id="philosophy" className="bg-black">
      {/* Chapter header */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center">
          <p className="font-mono text-[10px] text-text-dim uppercase tracking-[0.35em] mb-6">
            Final Chapter
          </p>
          <h2
            className="font-black text-white uppercase leading-none"
            style={{ fontSize: 'clamp(2rem, 7vw, 6rem)', letterSpacing: '-0.03em' }}
          >
            Engineering
            <br />
            <span className="text-text-dim">Philosophy</span>
          </h2>
          <div className="mt-8 w-px h-16 mx-auto bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>

      {/* Lessons */}
      {LESSONS.map((lesson, i) => (
        <LessonBlock key={lesson.id} lesson={lesson} index={i} />
      ))}

      {/* Final screen */}
      <FinalScreen />
    </section>
  )
}
