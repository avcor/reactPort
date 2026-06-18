import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion, type MotionValue } from 'framer-motion'
import { PhoneReveal } from '@/components/ui/PhoneReveal'

/* ─── helpers ─── */
function usePin(height = '220vh') {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return { ref, p: scrollYProgress, height }
}

/* ─── Architecture node box ─── */
function Node({
  label,
  sub,
  accent = false,
  className = '',
}: {
  label: string
  sub?: string
  accent?: boolean
  className?: string
}) {
  return (
    <div
      className={`px-4 py-2.5 rounded-lg border text-center ${
        accent
          ? 'border-accent/50 bg-accent/10 text-accent'
          : 'border-white/10 bg-white/[0.03] text-white/50'
      } ${className}`}
    >
      <p className={`font-mono text-xs font-semibold ${accent ? 'text-accent' : 'text-white/60'}`}>{label}</p>
      {sub && <p className="font-mono text-[10px] text-white/30 mt-0.5">{sub}</p>}
    </div>
  )
}

/* ─── Connecting arrow ─── */
function Arrow({ vertical = false, animated = false }: { vertical?: boolean; animated?: boolean }) {
  return (
    <div className={`flex items-center justify-center ${vertical ? 'flex-col' : ''}`}>
      <div className={`${vertical ? 'w-px h-6' : 'h-px w-6'} bg-white/20`} />
      {animated ? (
        <motion.div
          className={`${vertical ? 'w-1.5 h-1.5' : 'w-1.5 h-1.5'} rounded-full bg-accent`}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      ) : (
        <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
      )}
      <div className={`${vertical ? 'w-px h-6' : 'h-px w-6'} bg-white/20`} />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SCENE 1 — Flutter Engine (4s → Instant)
═══════════════════════════════════════════════ */
function Scene1Flutter() {
  const { ref, p, height } = usePin('240vh')

  // Tension: "4 Seconds" fills screen
  const tensionOp = useTransform(p, [0, 0.06, 0.22, 0.32], [0, 1, 1, 0])
  const tensionScale = useTransform(p, [0, 0.06], [1.15, 1])

  // Architecture diagram
  const archOp  = useTransform(p, [0.28, 0.40, 0.62, 0.72], [0, 1, 1, 0])
  const archY   = useTransform(p, [0.28, 0.40], [30, 0])

  // Timeline
  const timelineOp = useTransform(p, [0.52, 0.64, 0.75, 0.82], [0, 1, 1, 0])

  // Result
  const resultOp = useTransform(p, [0.82, 0.92], [0, 1])
  const resultY  = useTransform(p, [0.82, 0.92], [40, 0])

  const reduced = useReducedMotion()

  const TIMELINE = [
    { step: 'App Launch',       status: 'done' },
    { step: 'Home Screen',      status: 'done' },
    { step: 'Engine Warmup',    status: 'active' },
    { step: 'User Taps Screen', status: 'pending' },
    { step: 'Instant Display',  status: 'result' },
  ]

  return (
    <div ref={ref} style={{ height }} id="ch1-flutter">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black">

        {/* Tension number */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={reduced ? {} : { opacity: tensionOp }}
        >
          <div className="text-center">
            <motion.p
              className="font-black text-white leading-none select-none"
              style={reduced ? { fontSize: '20vw' } : { fontSize: '20vw', scale: tensionScale }}
            >
              4
            </motion.p>
            <p className="font-mono text-text-muted uppercase tracking-[0.3em] text-sm mt-4">
              Seconds to first frame
            </p>
            <p className="font-mono text-text-dim text-xs mt-2">
              Flutter inside a native Android app
            </p>
          </div>
        </motion.div>

        {/* Architecture diagram */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={reduced ? {} : { opacity: archOp, y: archY }}
        >
          <div className="w-full max-w-2xl">
            <p className="font-mono text-[11px] text-text-dim uppercase tracking-[0.25em] text-center mb-8">
              Two runtimes communicating
            </p>
            <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
              {/* Android stack */}
              <div className="flex flex-col items-center gap-2">
                <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1">Android</p>
                <Node label="Activity" />
                <Arrow vertical />
                <Node label="Service" />
                <Arrow vertical />
                <Node label="MethodChannel" accent />
              </div>

              {/* Center flow */}
              <div className="flex flex-col items-center gap-1">
                {['tokens', 'user info', 'auth state'].map((d) => (
                  <div key={d} className="flex items-center gap-2">
                    <motion.div
                      className="w-12 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                      animate={{ opacity: [0.2, 0.8, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                    />
                    <span className="font-mono text-[9px] text-accent/50 uppercase tracking-wider">{d}</span>
                    <motion.div
                      className="w-12 h-px bg-gradient-to-l from-transparent via-accent to-transparent"
                      animate={{ opacity: [0.2, 0.8, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 + 0.5 }}
                    />
                  </div>
                ))}
              </div>

              {/* Flutter stack */}
              <div className="flex flex-col items-center gap-2">
                <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1">Flutter</p>
                <Node label="FlutterEngine" accent />
                <Arrow vertical />
                <Node label="DartVM" />
                <Arrow vertical />
                <Node label="Widget Tree" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={reduced ? {} : { opacity: timelineOp }}
        >
          <div className="w-full max-w-xl">
            <p className="font-mono text-[11px] text-text-dim uppercase tracking-[0.25em] text-center mb-10">
              Engine lifecycle — with warmup
            </p>
            <div className="flex flex-col gap-0">
              {TIMELINE.map((t, i) => (
                <div key={t.step} className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <motion.div
                      className={`w-2.5 h-2.5 rounded-full border ${
                        t.status === 'active'
                          ? 'border-accent bg-accent shadow-[0_0_8px_rgb(91,138,74)]'
                          : t.status === 'result'
                          ? 'border-accent bg-accent'
                          : 'border-white/20 bg-white/5'
                      }`}
                      animate={t.status === 'active' ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    {i < TIMELINE.length - 1 && (
                      <div className="w-px h-8 bg-white/10 my-1" />
                    )}
                  </div>
                  <p className={`font-mono text-sm ${
                    t.status === 'active' || t.status === 'result'
                      ? 'text-accent'
                      : 'text-white/40'
                  }`}>
                    {t.step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Result: 4s → Instant */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={reduced ? {} : { opacity: resultOp, y: resultY }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-6 md:gap-10">
              <div className="text-center">
                <p
                  className="font-black text-white/20 line-through leading-none"
                  style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}
                >
                  4s
                </p>
                <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest mt-2">Before</p>
              </div>
              <div className="text-accent/40 font-mono text-2xl">→</div>
              <div className="text-center">
                <p
                  className="font-black text-accent leading-none"
                  style={{ fontSize: 'clamp(3rem, 10vw, 7rem)' }}
                >
                  ≈0
                </p>
                <p className="font-mono text-[10px] text-accent uppercase tracking-widest mt-2">After warmup</p>
              </div>
            </div>
            <p className="font-mono text-text-dim text-xs mt-8 max-w-sm mx-auto">
              Engine warms up in background on Home Page.<br />User opens screen — already loaded.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SCENE 2 — CI/CD Pipeline (90 → 18 min)
═══════════════════════════════════════════════ */
const STAGES_BEFORE = [
  { label: 'Checkout',        mins: 3,  w: 8 },
  { label: 'Setup Flutter',   mins: 12, w: 24 },
  { label: 'Flutter Build',   mins: 28, w: 48 },
  { label: 'Android Build',   mins: 22, w: 38 },
  { label: 'Package',         mins: 15, w: 26 },
  { label: 'Deploy',          mins: 10, w: 18 },
]
const STAGES_AFTER = [
  { label: 'Checkout',        mins: 3,  w: 8 },
  { label: 'Android (AAR)',   mins: 7,  w: 14 },
  { label: 'Deploy',          mins: 8,  w: 16 },
]

function PipelineBar({
  label,
  mins,
  widthPct,
  delay,
  accent = false,
}: {
  label: string
  mins: number
  widthPct: number
  delay: number
  accent?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  return (
    <div ref={ref} className="flex items-center gap-3 mb-2">
      <p className="font-mono text-[11px] text-white/40 w-28 shrink-0 text-right">{label}</p>
      <div className="flex-1 h-7 bg-white/5 rounded overflow-hidden relative">
        <motion.div
          className={`h-full rounded ${accent ? 'bg-accent/60' : 'bg-white/15'}`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${widthPct}%` } : { width: 0 }}
          transition={{ duration: accent ? 0.5 : 1.8, delay, ease: accent ? 'easeOut' : [0.16, 1, 0.3, 1] }}
        />
        <span className="absolute left-2 top-1/2 -translate-y-1/2 font-mono text-[10px] text-white/30">
          {mins}m
        </span>
      </div>
    </div>
  )
}

function Scene2CICD() {
  const { ref, p, height } = usePin('220vh')

  const tensionOp  = useTransform(p, [0, 0.06, 0.20, 0.30], [0, 1, 1, 0])
  const beforeOp   = useTransform(p, [0.26, 0.38, 0.56, 0.66], [0, 1, 1, 0])
  const afterOp    = useTransform(p, [0.62, 0.74, 0.88, 0.95], [0, 1, 1, 0])
  const resultOp   = useTransform(p, [0.88, 0.96], [0, 1])

  const reduced = useReducedMotion()

  return (
    <div ref={ref} style={{ height }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black">

        {/* Tension */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={reduced ? {} : { opacity: tensionOp }}
        >
          <div className="text-center">
            <p
              className="font-black text-white leading-none select-none"
              style={{ fontSize: 'clamp(4rem, 18vw, 14rem)' }}
            >
              90
            </p>
            <p className="font-mono text-text-muted uppercase tracking-[0.3em] text-sm mt-4">
              minutes per build
            </p>
            <p className="font-mono text-text-dim text-xs mt-2">
              Two build systems — Android + Flutter — sequential
            </p>
          </div>
        </motion.div>

        {/* Before pipeline */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={reduced ? {} : { opacity: beforeOp }}
        >
          <div className="w-full max-w-xl">
            <div className="flex items-center justify-between mb-6">
              <p className="font-mono text-[11px] text-text-dim uppercase tracking-[0.25em]">Build pipeline — before</p>
              <span className="font-mono text-xs text-white/30">90 min total</span>
            </div>
            {STAGES_BEFORE.map((s, i) => (
              <PipelineBar
                key={s.label}
                label={s.label}
                mins={s.mins}
                widthPct={s.w}
                delay={i * 0.15}
              />
            ))}
            <p className="font-mono text-[10px] text-white/20 mt-4 pl-32">
              Flutter build blocks every Android deploy
            </p>
          </div>
        </motion.div>

        {/* After pipeline */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={reduced ? {} : { opacity: afterOp }}
        >
          <div className="w-full max-w-xl">
            <div className="flex items-center justify-between mb-6">
              <p className="font-mono text-[11px] text-accent uppercase tracking-[0.25em]">After — pre-built AAR</p>
              <span className="font-mono text-xs text-accent">18 min total</span>
            </div>
            {STAGES_AFTER.map((s, i) => (
              <PipelineBar
                key={s.label}
                label={s.label}
                mins={s.mins}
                widthPct={s.w}
                delay={i * 0.15}
                accent
              />
            ))}
            <p className="font-mono text-[10px] text-accent/40 mt-4 pl-32">
              Flutter compiled once, shared as library artifact
            </p>

            {/* Result reveal within this view */}
            <motion.div
              className="mt-10 flex items-center justify-center gap-8"
              style={reduced ? {} : { opacity: resultOp }}
            >
              <p className="font-black text-white/20 line-through" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>90m</p>
              <span className="text-accent/40 font-mono text-xl">→</span>
              <p className="font-black text-accent" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>18m</p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SCENE 3 — Chart Optimization
═══════════════════════════════════════════════ */
function ScatterPoint({ x, y, targetX, targetY, p }: {
  x: number; y: number; targetX: number; targetY: number; delay: number; p: MotionValue<number>
}) {
  const cx = useTransform(p, [0.2, 0.7], [x, targetX])
  const cy = useTransform(p, [0.2, 0.7], [y, targetY])
  return <motion.circle r={2} fill="rgb(91,138,74)" fillOpacity={0.6} cx={cx} cy={cy} />
}

// Generate noisy points that converge to a sine-like curve
function buildPoints(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = i / count
    const cleanX = t * 540 + 30
    const cleanY = 100 - Math.sin(t * Math.PI * 3) * 60
    return {
      x: Math.random() * 600,
      y: Math.random() * 200,
      targetX: cleanX,
      targetY: cleanY + (Math.random() - 0.5) * 8,
    }
  })
}

const POINTS = buildPoints(80)

function Scene3Charts() {
  const { ref, p, height } = usePin('200vh')

  const titleOp   = useTransform(p, [0, 0.06, 0.22, 0.32], [0, 1, 1, 0])
  const chartOp   = useTransform(p, [0.28, 0.40], [0, 1])
  const smoothOp  = useTransform(p, [0.65, 0.80], [0, 1])
  const resultOp  = useTransform(p, [0.82, 0.94], [0, 1])

  const reduced = useReducedMotion()

  return (
    <div ref={ref} style={{ height }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black">

        {/* Title */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={reduced ? {} : { opacity: titleOp }}
        >
          <div className="text-center px-6">
            <p
              className="font-black text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
            >
              9,000+
            </p>
            <p className="font-mono text-text-muted uppercase tracking-[0.25em] text-sm mt-4">data points per session</p>
            <p className="font-mono text-text-dim text-xs mt-2">4 readings/minute × 8hr sleep = chaos</p>
          </div>
        </motion.div>

        {/* Scatter → curve */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          style={reduced ? {} : { opacity: chartOp }}
        >
          <p className="font-mono text-[11px] text-text-dim uppercase tracking-[0.25em] mb-6 text-center">
            Filtering, smoothing, persisting
          </p>
          <svg width="600" height="200" viewBox="0 0 600 200" className="max-w-full">
            {/* Axes */}
            <line x1="30" y1="10" x2="30" y2="190" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
            <line x1="30" y1="190" x2="580" y2="190" stroke="white" strokeOpacity="0.1" strokeWidth="1" />

            {/* Data points animating to smooth curve */}
            {POINTS.map((pt, i) => (
              <ScatterPoint
                key={i}
                x={pt.x}
                y={pt.y}
                targetX={pt.targetX}
                targetY={pt.targetY}
                delay={i * 0.01}
                p={p}
              />
            ))}

            {/* Smooth curve overlaid */}
            <motion.path
              d="M30,100 C80,40 130,160 200,100 C270,40 320,140 390,90 C450,50 510,130 570,80"
              stroke="rgb(91,138,74)"
              strokeWidth="2"
              fill="none"
              strokeOpacity={0.8}
              style={{ opacity: smoothOp }}
            />
          </svg>

          {/* Result */}
          <motion.div
            className="mt-8 text-center"
            style={reduced ? {} : { opacity: resultOp }}
          >
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <p className="font-black text-white/30 line-through" style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)' }}>5s</p>
                <p className="font-mono text-[10px] text-white/20 uppercase tracking-wider mt-1">chart load</p>
              </div>
              <span className="text-accent/40 font-mono text-xl">→</span>
              <div className="text-center">
                <p className="font-black text-accent" style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)' }}>&lt;2s</p>
                <p className="font-mono text-[10px] text-accent uppercase tracking-wider mt-1">WatermelonDB cache</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   Chapter 1 ending statement
═══════════════════════════════════════════════ */
function Ch1Ending() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const reduced = useReducedMotion()

  const lines = [
    'Performance is not one problem.',
    'It appears everywhere.',
    'Different products. Same principle.',
    'Remove latency.',
  ]

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center justify-center bg-black px-6"
    >
      <div className="max-w-xl text-center space-y-3">
        {lines.map((line, i) => (
          <motion.p
            key={line}
            className={`font-serif italic leading-snug ${
              i === lines.length - 1
                ? 'text-accent mt-6'
                : i === 0 ? 'text-white' : 'text-white/50'
            }`}
            style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)' }}
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={inView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   EXPORT
═══════════════════════════════════════════════ */
export function Ch1Performance() {
  return (
    <section id="ch1-performance">
      {/* Chapter label */}
      <div className="bg-black py-16 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-[10px] text-text-dim uppercase tracking-[0.35em] mb-3">Chapter 01</p>
          <h2
            className="font-black text-white uppercase leading-none"
            style={{ fontSize: 'clamp(2rem, 7vw, 6rem)', letterSpacing: '-0.03em' }}
          >
            Making Systems Faster
          </h2>
        </div>
      </div>

      <Scene1Flutter />

      <PhoneReveal
        src="/screenshots/digii/Group_1_Access_Management_Dasboard_flutter_1.jpg"
        alt="Access Management Dashboard — Flutter inside Android"
        label="Chapter 01 · Flutter Integration"
        caption="Access Management Dashboard. Flutter module inside a native Android app. Now loads instantly."
        variant="portrait"
        metric="4s → ≈0"
      />

      <Scene2CICD />
      <Scene3Charts />

      <PhoneReveal
        src="/screenshots/dozee-home/group_1_chart_1.png"
        alt="Respiration Rate chart — Dozee Home"
        label="Chapter 01 · Chart Optimization"
        caption="Respiration Rate. 9,000+ nightly data points filtered, smoothed, and rendered in under 2 seconds."
        variant="bare"
        metric="<2s load"
      />

      <Ch1Ending />
    </section>
  )
}
