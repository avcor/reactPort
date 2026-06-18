import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/* ─── Abstract System Diagram ─── */
const NODES = [
  { x: 60,   y: 60,  w: 130, label: 'FlutterEngine' },
  { x: 280,  y: 30,  w: 80,  label: 'DartVM' },
  { x: 500,  y: 90,  w: 130, label: 'MethodChannel' },
  { x: 760,  y: 50,  w: 120, label: 'WorkManager' },
  { x: 970,  y: 100, w: 80,  label: 'RoomDB' },
  { x: 110,  y: 270, w: 100, label: 'Coroutines' },
  { x: 360,  y: 240, w: 80,  label: 'Retrofit' },
  { x: 600,  y: 290, w: 90,  label: 'Compose' },
  { x: 820,  y: 260, w: 100, label: 'Hilt / DI' },
  { x: 1060, y: 230, w: 130, label: 'FeatureFlags' },
  { x: 200,  y: 440, w: 90,  label: 'MVVM' },
  { x: 460,  y: 470, w: 120, label: 'Clean Arch' },
  { x: 710,  y: 430, w: 100, label: 'WorkerDB' },
  { x: 930,  y: 460, w: 80,  label: 'Offline' },
]

const CONNECTIONS: [number, number][] = [
  [0, 2], [1, 2], [2, 4], [2, 5],
  [3, 4], [5, 6], [6, 7], [7, 8],
  [8, 9], [3, 8], [5, 10], [10, 11],
  [11, 12], [12, 13], [4, 12],
]

function centerOf(n: typeof NODES[number]) {
  return { cx: n.x + n.w / 2, cy: n.y + 15 }
}

function SystemDiagram() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 560"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {/* Connection lines */}
      {CONNECTIONS.map(([a, b], i) => {
        const { cx: x1, cy: y1 } = centerOf(NODES[a])
        const { cx: x2, cy: y2 } = centerOf(NODES[b])
        const mx = (x1 + x2) / 2
        const my = (y1 + y2) / 2 - 25
        return (
          <path
            key={i}
            d={`M${x1},${y1} Q${mx},${my} ${x2},${y2}`}
            stroke="white"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        )
      })}

      {/* Flow particles */}
      {CONNECTIONS.map(([a, b], i) => {
        const { cx: x1, cy: y1 } = centerOf(NODES[a])
        const { cx: x2, cy: y2 } = centerOf(NODES[b])
        return (
          <motion.circle
            key={i}
            r={1.5}
            fill="rgb(91,138,74)"
            animate={{
              cx: [x1, x2],
              cy: [y1, y2],
              opacity: [0, 0.9, 0.9, 0],
            }}
            transition={{
              duration: 2.8 + i * 0.4,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'linear',
              times: [0, 0.08, 0.92, 1],
            }}
          />
        )
      })}

      {/* Nodes */}
      {NODES.map((n, i) => (
        <g key={i} transform={`translate(${n.x},${n.y})`}>
          <rect
            width={n.w}
            height={30}
            rx={5}
            stroke="white"
            strokeOpacity="0.1"
            fill="white"
            fillOpacity="0.025"
          />
          <text
            x={n.w / 2}
            y={20}
            textAnchor="middle"
            fill="white"
            fillOpacity="0.22"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

/* ─── Opening Sequence ─── */
export function OpeningSequence() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Lines scroll in and out
  const line1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.48, 0.60], [0, 1, 1, 0])
  const line1Y       = useTransform(scrollYProgress, [0, 0.08], [40, 0])

  const line2Opacity = useTransform(scrollYProgress, [0.20, 0.30, 0.48, 0.60], [0, 1, 1, 0])
  const line2Y       = useTransform(scrollYProgress, [0.20, 0.30], [40, 0])

  const line3Opacity = useTransform(scrollYProgress, [0.38, 0.48, 0.50, 0.60], [0, 1, 1, 0])
  const line3Y       = useTransform(scrollYProgress, [0.38, 0.48], [40, 0])

  // Statement block drifts upward while fading
  const blockY       = useTransform(scrollYProgress, [0.54, 0.70], ['0%', '-22%'])
  const blockOpacity = useTransform(scrollYProgress, [0.54, 0.66], [1, 0])

  // System diagram fades in behind
  const diagramOpacity = useTransform(scrollYProgress, [0.60, 0.77], [0, 0.55])

  // Identity reveal
  const identityOpacity = useTransform(scrollYProgress, [0.80, 0.94], [0, 1])
  const identityY       = useTransform(scrollYProgress, [0.80, 0.94], [50, 0])

  // Scroll cue fades out early
  const cueOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0])

  return (
    <section ref={ref} style={{ height: '300vh' }} id="opening">
      <div className="sticky top-0 h-screen overflow-hidden bg-black flex items-center justify-center">

        {/* Abstract system diagram */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: reduced ? 0 : diagramOpacity }}
        >
          <SystemDiagram />
        </motion.div>

        {/* Vignette over diagram */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, black 80%)' }} />

        {/* Opening statement — 3 lines */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center gap-2 md:gap-3"
          style={reduced ? {} : { y: blockY, opacity: blockOpacity }}
        >
          <motion.p
            className="font-serif italic text-white leading-tight"
            style={reduced
              ? {}
              : { opacity: line1Opacity, y: line1Y, fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)' }
            }
          >
            "The best engineered products
          </motion.p>
          <motion.p
            className="font-serif italic text-white leading-tight"
            style={reduced
              ? { fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)' }
              : { opacity: line2Opacity, y: line2Y, fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)' }
            }
          >
            are the ones users never notice.
          </motion.p>
          <motion.p
            className="font-serif italic text-text-muted leading-tight"
            style={reduced
              ? { fontSize: 'clamp(1.2rem, 3vw, 2.5rem)' }
              : { opacity: line3Opacity, y: line3Y, fontSize: 'clamp(1.2rem, 3vw, 2.5rem)' }
            }
          >
            because they never get in the way."
          </motion.p>
        </motion.div>

        {/* Identity reveal */}
        <motion.div
          className="absolute z-20 text-center px-6"
          style={reduced ? {} : { opacity: identityOpacity, y: identityY }}
        >
          <p className="font-mono text-[11px] text-text-dim uppercase tracking-[0.35em] mb-6">
            Android Engineer · 500k+ users
          </p>
          <h1
            className="font-black text-text-primary uppercase leading-none"
            style={{ fontSize: 'clamp(3rem, 11vw, 9rem)', letterSpacing: '-0.04em' }}
          >
            Abhishek<br />Verma
          </h1>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-accent/40" />
            <p className="font-mono text-accent uppercase tracking-[0.25em] text-xs md:text-sm">
              The journey begins
            </p>
            <div className="h-px w-12 bg-accent/40" />
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: cueOpacity }}
        >
          <p className="font-mono text-[10px] text-text-dim uppercase tracking-[0.25em]">scroll</p>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-text-dim to-transparent"
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

      </div>
    </section>
  )
}
