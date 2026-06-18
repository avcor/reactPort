import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import { PhoneReveal } from '@/components/ui/PhoneReveal'

function usePin(height = '280vh') {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return { ref, p: scrollYProgress, height }
}

const LEGACY_DEPS = [
  { label: 'ButterKnife',      reason: '100+ files affected',         danger: true },
  { label: 'Java 8',           reason: 'no coroutines, no flows',      danger: true },
  { label: 'Gradle 4.x',       reason: 'blocks modern SDK support',    danger: true },
  { label: 'Deprecated Libs',  reason: 'not on Maven/JitPack/JFrog',   danger: true },
  { label: 'Kotlin 1.5',       reason: 'no 2.x features',              danger: false },
  { label: 'Old Retrofit',     reason: 'no coroutine support',          danger: false },
]

const MODERN_STACK = [
  { label: 'Jetpack Compose',  note: 'UI dev time −20%' },
  { label: 'Kotlin 2+',        note: 'annotations, K2 compiler' },
  { label: 'Coroutines + Flow', note: 'lifecycle-safe async' },
  { label: 'Retrofit + Suspend', note: 'clean coroutine API calls' },
  { label: 'ViewBinding',      note: 'replaced ButterKnife' },
  { label: 'Gradle 8.x',       note: 'modern build pipeline' },
]

export function Ch3Modernizing() {
  const { ref, p, height } = usePin('320vh')
  const endRef = useRef<HTMLDivElement>(null)
  const endInView = useInView(endRef, { once: true, margin: '-20%' })
  const reduced = useReducedMotion()

  // Phases
  const legacyOp   = useTransform(p, [0, 0.06, 0.28, 0.38], [0, 1, 1, 0])
  const legacyScale= useTransform(p, [0.28, 0.38], [1, 0.85])

  const strikeOp   = useTransform(p, [0.32, 0.44, 0.58, 0.68], [0, 1, 1, 0])

  const modernOp   = useTransform(p, [0.64, 0.76], [0, 1])
  const modernY    = useTransform(p, [0.64, 0.76], [40, 0])

  const transformOp = useTransform(p, [0.80, 0.92], [0, 1])

  return (
    <section id="ch3-modernizing">
      {/* Chapter label */}
      <div className="bg-black py-16 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-[10px] text-text-dim uppercase tracking-[0.35em] mb-3">Chapter 03</p>
          <h2
            className="font-black text-white uppercase leading-none"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
          >
            Modernizing Platforms
          </h2>
        </div>
      </div>

      {/* Scroll-pinned transformation */}
      <div ref={ref} style={{ height }}>
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black">

          {/* Legacy dependency grid */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={reduced ? {} : { opacity: legacyOp, scale: legacyScale }}
          >
            <p className="font-mono text-[11px] text-text-dim uppercase tracking-[0.25em] text-center mb-8">
              Legacy codebase — untouchable for years
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl w-full">
              {LEGACY_DEPS.map((dep, i) => (
                <motion.div
                  key={dep.label}
                  className={`px-4 py-3 rounded-lg border ${
                    dep.danger
                      ? 'border-red-500/30 bg-red-500/5'
                      : 'border-white/[0.08] bg-white/[0.02]'
                  }`}
                  initial={reduced ? {} : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className={`font-mono text-xs font-semibold ${dep.danger ? 'text-red-400' : 'text-white/50'}`}>
                    {dep.label}
                  </p>
                  <p className="font-mono text-[10px] text-white/25 mt-0.5">{dep.reason}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Striking out legacy */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={reduced ? {} : { opacity: strikeOp }}
          >
            <p className="font-mono text-[11px] text-text-dim uppercase tracking-[0.25em] text-center mb-6">
              Removing one dependency at a time
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl w-full">
              {LEGACY_DEPS.map((dep, i) => (
                <motion.div
                  key={dep.label}
                  className="px-4 py-3 rounded-lg border border-white/[0.05] bg-white/[0.015] relative overflow-hidden"
                  initial={reduced ? {} : { opacity: 1 }}
                  animate={{ opacity: [1, 0.4] }}
                  transition={{ delay: i * 0.3 + 0.5, duration: 0.3 }}
                >
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-red-500/60 w-0"
                    animate={{ width: '100%' }}
                    transition={{ delay: i * 0.3 + 0.5, duration: 0.3 }}
                  />
                  <p className="font-mono text-xs text-white/30">{dep.label}</p>
                  <p className="font-mono text-[10px] text-white/15 mt-0.5">{dep.reason}</p>
                </motion.div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-white/20 mt-6 max-w-xs text-center">
              Some unavailable on any registry — built internally from source
            </p>
          </motion.div>

          {/* Modern stack emerges */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={reduced ? {} : { opacity: modernOp, y: modernY }}
          >
            <p className="font-mono text-[11px] text-accent uppercase tracking-[0.25em] text-center mb-8">
              Modern stack — unlocked
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl w-full">
              {MODERN_STACK.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="px-4 py-3 rounded-lg border border-accent/20 bg-accent/5"
                  initial={reduced ? {} : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-mono text-xs font-semibold text-accent">{item.label}</p>
                  <p className="font-mono text-[10px] text-accent/40 mt-0.5">{item.note}</p>
                </motion.div>
              ))}
            </div>

            {/* Transformation label */}
            <motion.div
              className="mt-10 text-center"
              style={reduced ? {} : { opacity: transformOp }}
            >
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <p className="font-mono text-xs text-red-400/60 uppercase tracking-widest mb-1">Before</p>
                  <p className="font-black text-white/20 line-through" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
                    Legacy
                  </p>
                </div>
                <span className="text-accent/40 font-mono text-2xl">→</span>
                <div className="text-center">
                  <p className="font-mono text-xs text-accent uppercase tracking-widest mb-1">After</p>
                  <p className="font-black text-accent" style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}>
                    Modern
                  </p>
                </div>
              </div>
              <p className="font-mono text-[10px] text-text-dim mt-4">
                Dev time −20% · UI testing time −15% · Low-end device support unlocked
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <PhoneReveal
        src="/screenshots/digii/Group_3_Hostel_Attendance_first_compose_migration_1.jpg"
        alt="Hostel Attendance — first Jetpack Compose screen"
        label="Chapter 03 · Jetpack Compose"
        caption="Hostel Attendance. First screen shipped in Compose after the full migration. Built in 20% less time."
        variant="portrait"
        metric="Dev time −20%"
      />

      {/* Ending statement */}
      <div ref={endRef} className="min-h-screen flex items-center justify-center bg-black px-6">
        <div className="max-w-xl text-center space-y-4">
          {[
            { text: 'Systems rarely need rewriting.', muted: false },
            { text: 'But they always need evolution.', muted: false, accent: true },
          ].map((line, i) => (
            <motion.p
              key={i}
              className={`font-serif italic leading-snug ${line.accent ? 'text-accent' : 'text-white'}`}
              style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)' }}
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={endInView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: i * 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
