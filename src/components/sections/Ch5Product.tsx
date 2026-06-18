import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import { PhoneReveal } from '@/components/ui/PhoneReveal'

function usePin(height = '260vh') {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return { ref, p: scrollYProgress, height }
}

const TEAMS = [
  { label: 'Engineering',  x: '15%', y: '20%' },
  { label: 'Backend',      x: '75%', y: '15%' },
  { label: 'Design',       x: '55%', y: '70%' },
  { label: 'Product',      x: '20%', y: '72%' },
  { label: 'Stakeholders', x: '80%', y: '55%' },
]

const CONNECTIONS_5 = [
  [0, 1], [0, 3], [1, 4], [2, 3], [2, 4], [0, 2], [1, 2],
]

const PROBLEMS = [
  '"API should return everything."',
  '"User can figure it out."',
  '"Just add more screens."',
  '"No time for design review."',
]

export function Ch5Product() {
  const { ref, p, height } = usePin('300vh')
  const endRef = useRef<HTMLDivElement>(null)
  const endInView = useInView(endRef, { once: true, margin: '-20%' })
  const reduced = useReducedMotion()

  const chaosOp      = useTransform(p, [0, 0.06, 0.22, 0.32], [0, 1, 1, 0])
  const connectOp    = useTransform(p, [0.28, 0.42, 0.60, 0.70], [0, 1, 1, 0])
  const convergOp    = useTransform(p, [0.66, 0.80], [0, 1])
  const convergY     = useTransform(p, [0.66, 0.80], [30, 0])

  return (
    <section id="ch5-product">
      {/* Chapter label */}
      <div className="bg-black py-16 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-[10px] text-text-dim uppercase tracking-[0.35em] mb-3">Chapter 05</p>
          <h2
            className="font-black text-white uppercase leading-none"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
          >
            Product Engineering
          </h2>
        </div>
      </div>

      {/* Scroll-pinned section */}
      <div ref={ref} style={{ height }}>
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black">

          {/* Phase 1: Chaotic requirements */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-6"
            style={reduced ? {} : { opacity: chaosOp }}
          >
            <div className="w-full max-w-xl">
              <p className="font-mono text-[11px] text-text-dim uppercase tracking-[0.25em] text-center mb-8">
                The brief we received
              </p>
              <div className="grid grid-cols-2 gap-4">
                {PROBLEMS.map((prob, i) => (
                  <motion.div
                    key={i}
                    className="px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02]"
                    initial={reduced ? {} : { opacity: 0, rotate: (i % 2 === 0 ? -2 : 2), y: 10 }}
                    animate={{ opacity: 1, rotate: 0, y: 0 }}
                    transition={{ delay: i * 0.12 }}
                  >
                    <p className="font-serif italic text-white/40 text-sm leading-snug">{prob}</p>
                  </motion.div>
                ))}
              </div>
              <p className="font-mono text-[10px] text-white/20 text-center mt-6">
                Ambiguous. Disconnected. No shared vision.
              </p>
            </div>
          </motion.div>

          {/* Phase 2: Teams connecting */}
          <motion.div
            className="absolute inset-0"
            style={reduced ? {} : { opacity: connectOp }}
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {CONNECTIONS_5.map(([a, b], i) => {
                const ta = TEAMS[a], tb = TEAMS[b]
                const x1 = parseFloat(ta.x), y1 = parseFloat(ta.y)
                const x2 = parseFloat(tb.x), y2 = parseFloat(tb.y)
                return (
                  <motion.line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgb(91,138,74)"
                    strokeOpacity={0.25}
                    strokeWidth={0.3}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: i * 0.15 + 0.3, duration: 0.6 }}
                  />
                )
              })}
            </svg>

            {/* Team nodes */}
            {TEAMS.map((team, i) => (
              <motion.div
                key={team.label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: team.x, top: team.y }}
                initial={reduced ? {} : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="px-4 py-2 rounded-full border border-accent/30 bg-accent/5 whitespace-nowrap">
                  <p className="font-mono text-xs text-accent">{team.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Phase 3: Convergence + result */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-6"
            style={reduced ? {} : { opacity: convergOp, y: convergY }}
          >
            <div className="w-full max-w-sm">
              <p className="font-serif italic text-white/40 text-center text-xl mb-2">
                Technology alone does not create
              </p>
              <p className="font-serif italic text-white text-center text-xl mb-10">
                great experiences.
              </p>

              {/* Payments UI mockup */}
              <div className="rounded-2xl border border-white/[0.12] bg-[#111] overflow-hidden">
                {/* Header */}
                <div className="px-5 py-4 border-b border-white/[0.06]">
                  <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1">Financial Overview</p>
                  <p className="font-black text-white text-2xl">₹24,500</p>
                  <p className="font-mono text-[10px] text-accent mt-0.5">Due this semester</p>
                </div>
                {/* Items */}
                <div className="px-5 py-3 space-y-2">
                  {[
                    { label: 'Tuition Fee',   amt: '₹18,000', paid: true },
                    { label: 'Hostel Fee',    amt: '₹4,500',  paid: true },
                    { label: 'Library Fine',  amt: '₹200',    paid: false },
                    { label: 'Exam Fee',      amt: '₹1,800',  paid: false },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.paid ? 'bg-accent' : 'bg-white/20'}`} />
                        <span className="font-mono text-[11px] text-white/50">{item.label}</span>
                      </div>
                      <span className={`font-mono text-xs ${item.paid ? 'text-white/30 line-through' : 'text-white/70'}`}>
                        {item.amt}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3">
                  <div className="w-full py-2 rounded-lg bg-accent/20 border border-accent/30 text-center">
                    <span className="font-mono text-xs text-accent uppercase tracking-widest">Pay Outstanding</span>
                  </div>
                </div>
              </div>

              <p className="font-mono text-[10px] text-white/20 text-center mt-4">
                Financial status at a glance. Reduced API calls 60%.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      <PhoneReveal
        src="/screenshots/digii/Group_4_Payments_Consolidated.jpg"
        alt="Payments — consolidated dues screen"
        label="Chapter 05 · Product Engineering"
        caption="Payments. Consolidated dues at a glance. No ambiguity. Cross-team collaboration made visible."
        variant="portrait"
        metric="API calls −60%"
      />

      {/* Ending */}
      <div ref={endRef} className="min-h-screen flex items-center justify-center bg-black px-6">
        <div className="max-w-xl text-center space-y-4">
          {[
            { text: 'Engineers do not just implement requirements.', muted: true },
            { text: 'They improve them.', accent: true },
          ].map((line, i) => (
            <motion.p
              key={i}
              className={`font-serif italic leading-snug ${
                (line as { muted?: boolean }).muted ? 'text-white/40' : 'text-accent'
              }`}
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
