import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion, type MotionValue } from 'framer-motion'

function usePin(height = '220vh') {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return { ref, p: scrollYProgress, height }
}

/* ─── status dot ─── */
function StatusDot({ status }: { status: 'ok' | 'fail' | 'pending' | 'retry' }) {
  const colors = {
    ok:      'bg-accent shadow-[0_0_8px_rgb(91,138,74)]',
    fail:    'bg-red-500 shadow-[0_0_8px_rgb(239,68,68)]',
    pending: 'bg-white/20',
    retry:   'bg-yellow-500 shadow-[0_0_8px_rgb(234,179,8)]',
  }
  return (
    <motion.div
      className={`w-2.5 h-2.5 rounded-full ${colors[status]}`}
      animate={status === 'retry' ? { scale: [1, 1.4, 1] } : {}}
      transition={{ duration: 1, repeat: Infinity }}
    />
  )
}

/* ═══════════════════════════════════════════════
   SCENE 1 — ECG Offline Upload
═══════════════════════════════════════════════ */
function Scene1ECG() {
  const { ref, p, height } = usePin('280vh')
  const reduced = useReducedMotion()

  // Phase opacities
  const phase1Op = useTransform(p, [0, 0.06, 0.18, 0.26], [0, 1, 1, 0])  // Capture
  const phase2Op = useTransform(p, [0.22, 0.32, 0.44, 0.52], [0, 1, 1, 0]) // Network loss
  const phase3Op = useTransform(p, [0.48, 0.58, 0.72, 0.80], [0, 1, 1, 0]) // Queue + DB
  const phase4Op = useTransform(p, [0.76, 0.88], [0, 1])                    // Recovery

  const ECGPath = 'M0,50 L20,50 L25,20 L30,80 L35,10 L40,60 L45,50 L80,50 L85,25 L90,75 L95,15 L100,55 L105,50 L140,50'

  return (
    <div ref={ref} style={{ height }} id="ch2-ecg">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black">

        {/* Phase 1: ECG captured */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={reduced ? {} : { opacity: phase1Op }}
        >
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center mx-auto mb-6">
              <svg width="60" height="40" viewBox="0 0 140 80">
                <motion.path
                  d={ECGPath}
                  stroke="rgb(91,138,74)"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              </svg>
            </div>
            <p className="font-mono text-[11px] text-text-dim uppercase tracking-[0.25em] mb-2">ECG captured</p>
            <p className="font-serif italic text-white text-xl">Upload begins.</p>
          </div>
        </motion.div>

        {/* Phase 2: Network disappears */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={reduced ? {} : { opacity: phase2Op }}
        >
          <div className="text-center max-w-md">
            <motion.div
              className="text-6xl mb-6"
              animate={{ opacity: [1, 0, 1, 0, 1, 0] }}
              transition={{ duration: 2, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
            >
              <span className="font-mono text-red-500/80">✕</span>
            </motion.div>
            <p className="font-mono text-[11px] text-text-dim uppercase tracking-[0.25em] mb-2">Network unavailable</p>
            <p className="font-serif italic text-white text-xl mb-2">Upload fails.</p>
            <p className="font-serif italic text-white/40 text-lg">Queue grows.</p>
            <div className="mt-6 flex items-center justify-center gap-2">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-8 h-8 rounded border border-red-500/30 bg-red-500/5 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.3 }}
                >
                  <svg width="20" height="14" viewBox="0 0 140 80">
                    <path d={ECGPath} stroke="rgb(239,68,68)" strokeWidth="3" fill="none" opacity="0.5" />
                  </svg>
                </motion.div>
              ))}
              <motion.div
                className="font-mono text-red-500/50 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                +more
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Phase 3: WorkManager + RoomDB */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={reduced ? {} : { opacity: phase3Op }}
        >
          <div className="w-full max-w-sm">
            <p className="font-mono text-[11px] text-text-dim uppercase tracking-[0.25em] text-center mb-8">
              Offline-first architecture
            </p>
            <div className="space-y-3">
              {[
                { label: 'RoomDB',      sub: 'ECGs persisted locally',  status: 'ok' as const },
                { label: 'WorkManager', sub: 'Queued for upload',       status: 'retry' as const },
                { label: 'Retry Logic', sub: 'Exponential backoff',     status: 'retry' as const },
                { label: 'Background', sub: 'App not needed in fg',    status: 'ok' as const },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-4 px-4 py-3 rounded-lg border border-white/[0.08] bg-white/[0.02]">
                  <StatusDot status={row.status} />
                  <div className="flex-1">
                    <p className="font-mono text-sm text-white/70">{row.label}</p>
                    <p className="font-mono text-[10px] text-white/30">{row.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Phase 4: Recovery */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={reduced ? {} : { opacity: phase4Op }}
        >
          <div className="text-center max-w-sm">
            <motion.div
              className="w-16 h-16 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center mx-auto mb-6"
              animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 0 0 rgb(91,138,74,0.4)', '0 0 0 16px rgb(91,138,74,0)', '0 0 0 0 rgb(91,138,74,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="28" height="20" viewBox="0 0 140 80">
                <path d={ECGPath} stroke="rgb(91,138,74)" strokeWidth="3" fill="none" />
              </svg>
            </motion.div>
            <p className="font-mono text-[11px] text-accent uppercase tracking-[0.25em] mb-2">Network returns</p>
            <p className="font-serif italic text-white text-xl mb-1">Queue drains.</p>
            <p className="font-serif italic text-accent text-lg">Upload succeeds.</p>
            <p className="font-mono text-[10px] text-text-dim mt-6 max-w-xs mx-auto">
              No data lost. No user intervention. Built for hospitals with unreliable networks.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SCENE 2 — Multi-Tenant Account Switching
═══════════════════════════════════════════════ */
const ROLES = [
  { label: 'Student',       color: 'text-white', border: 'border-white/20', bg: 'bg-white/[0.03]' },
  { label: 'Faculty',       color: 'text-accent', border: 'border-accent/30', bg: 'bg-accent/5' },
  { label: 'Hostel Warden', color: 'text-yellow-400', border: 'border-yellow-400/30', bg: 'bg-yellow-400/5' },
]

const SYSTEM_NODES = [
  'Token', 'Cache', 'RoomDB', 'Retrofit', 'Feature Flags', 'Screen State',
]

function Scene2MultiTenant() {
  const { ref, p, height } = usePin('260vh')
  const reduced = useReducedMotion()

  const role1Op = useTransform(p, [0, 0.06, 0.20, 0.28], [0, 1, 1, 0])
  const role2Op = useTransform(p, [0.24, 0.34, 0.46, 0.54], [0, 1, 1, 0])
  const role3Op = useTransform(p, [0.50, 0.60, 0.70, 0.78], [0, 1, 1, 0])
  const complexOp = useTransform(p, [0.74, 0.86], [0, 1])
  const complexY  = useTransform(p, [0.74, 0.86], [30, 0])

  function RoleBadge({ role, opacity }: { role: typeof ROLES[number]; opacity: MotionValue<number> }) {
    return (
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={reduced ? {} : { opacity }}
      >
        <div className="text-center">
          <p className="font-mono text-[11px] text-text-dim uppercase tracking-[0.3em] mb-8">
            Same person. Different role.
          </p>
          <div className={`inline-block px-10 py-5 rounded-2xl border ${role.border} ${role.bg}`}>
            <p className={`font-black ${role.color} uppercase tracking-tight`}
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', letterSpacing: '-0.02em' }}>
              {role.label}
            </p>
          </div>
          <p className="font-mono text-[10px] text-white/20 mt-6">
            Scroll to switch identity
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div ref={ref} style={{ height }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black">

        {ROLES.map((role, i) => (
          <RoleBadge
            key={role.label}
            role={role}
            opacity={[role1Op, role2Op, role3Op][i]}
          />
        ))}

        {/* Complexity reveal */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center px-6"
          style={reduced ? {} : { opacity: complexOp, y: complexY }}
        >
          <div className="w-full max-w-lg">
            <p className="font-serif italic text-white text-center mb-2"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>
              Changing identities is easy.
            </p>
            <p className="font-serif italic text-white/40 text-center mb-10"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}>
              Maintaining application state isn't.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {SYSTEM_NODES.map((node, i) => (
                <motion.div
                  key={node}
                  className="px-3 py-2 rounded-lg border border-white/[0.12] bg-white/[0.03] text-center"
                  initial={reduced ? {} : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <p className="font-mono text-xs text-white/60">{node}</p>
                </motion.div>
              ))}
            </div>

            <p className="font-mono text-[10px] text-white/25 text-center mt-6">
              A single failure propagates through every layer
            </p>

            {/* Cascading failure effect */}
            <motion.div
              className="mt-4 flex items-center justify-center gap-2"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {SYSTEM_NODES.map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-red-500/60"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SCENE 3 — BLE Reliability
═══════════════════════════════════════════════ */
function Scene3BLE() {
  const { ref, p, height } = usePin('200vh')
  const reduced = useReducedMotion()

  const connectOp = useTransform(p, [0, 0.06, 0.20, 0.28], [0, 1, 1, 0])
  const lostOp    = useTransform(p, [0.24, 0.34, 0.50, 0.58], [0, 1, 1, 0])
  const retryOp   = useTransform(p, [0.54, 0.64, 0.78, 0.86], [0, 1, 1, 0])
  const recovOp   = useTransform(p, [0.82, 0.94], [0, 1])

  const PHASES = [
    { label: 'Connected',          status: 'ok' as const,      op: connectOp, desc: 'BLE device paired and streaming data' },
    { label: 'Connection Lost',    status: 'fail' as const,    op: lostOp,    desc: 'Signal dropped. App detects within 2s.' },
    { label: 'Retry in progress',  status: 'retry' as const,   op: retryOp,   desc: 'Auto-reconnect with exponential backoff' },
    { label: 'Recovered',          status: 'ok' as const,      op: recovOp,   desc: '99% connection success rate achieved' },
  ]

  return (
    <div ref={ref} style={{ height }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black">
        {PHASES.map((ph) => (
          <motion.div
            key={ph.label}
            className="absolute inset-0 flex items-center justify-center"
            style={reduced ? {} : { opacity: ph.op }}
          >
            <div className="text-center max-w-sm">
              {/* BLE icon */}
              <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <motion.div
                  className={`absolute inset-0 rounded-full border ${
                    ph.status === 'ok' ? 'border-accent/30' :
                    ph.status === 'fail' ? 'border-red-500/30' : 'border-yellow-500/30'
                  }`}
                  animate={ph.status === 'retry' ? {
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 0, 0.6],
                  } : ph.status === 'ok' && ph.label === 'Recovered' ? {
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 0, 0.8],
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div className={`w-14 h-14 rounded-full border flex items-center justify-center ${
                  ph.status === 'ok' ? 'border-accent/50 bg-accent/10' :
                  ph.status === 'fail' ? 'border-red-500/50 bg-red-500/10' :
                  'border-yellow-500/50 bg-yellow-500/10'
                }`}>
                  <span className={`font-mono font-bold text-lg ${
                    ph.status === 'ok' ? 'text-accent' :
                    ph.status === 'fail' ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    BLE
                  </span>
                </div>
              </div>

              <p className={`font-mono text-[11px] uppercase tracking-[0.25em] mb-2 ${
                ph.status === 'ok' ? 'text-accent' :
                ph.status === 'fail' ? 'text-red-400' : 'text-yellow-400'
              }`}>
                {ph.label}
              </p>
              <p className="font-serif italic text-white/50 text-lg">{ph.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─── Chapter ending ─── */
function Ch2Ending() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })
  const reduced = useReducedMotion()

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center bg-black px-6">
      <div className="max-w-xl text-center space-y-4">
        {[
          { text: 'Reliable systems are defined by', muted: true },
          { text: 'failure handling.', muted: false },
          { text: 'Not success handling.', muted: false, accent: true },
        ].map((line, i) => (
          <motion.p
            key={i}
            className={`font-serif italic leading-snug ${
              line.accent ? 'text-accent' : line.muted ? 'text-white/40' : 'text-white'
            }`}
            style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)' }}
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            animate={inView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {line.text}
          </motion.p>
        ))}
      </div>
    </div>
  )
}

export function Ch2Reliability() {
  return (
    <section id="ch2-reliability">
      <div className="bg-black py-16 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-[10px] text-text-dim uppercase tracking-[0.35em] mb-3">Chapter 02</p>
          <h2
            className="font-black text-white uppercase leading-none"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
          >
            Building Reliable Systems
          </h2>
        </div>
      </div>

      <Scene1ECG />
      <Scene2MultiTenant />
      <Scene3BLE />
      <Ch2Ending />
    </section>
  )
}
