import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion, type MotionValue } from 'framer-motion'

function usePin(height = '260vh') {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return { ref, p: scrollYProgress, height }
}

const CHECKPOINTS = [
  {
    step: 'Face Detected',
    icon: '◉',
    detail: 'MLKit detects face — no photo substitution allowed',
    instruction: null,
  },
  {
    step: 'Look Left',
    icon: '←',
    detail: 'Random head turn requested',
    instruction: 'Head movement verified',
  },
  {
    step: 'Look Right',
    icon: '→',
    detail: 'Second random direction',
    instruction: 'Liveness confirmed',
  },
  {
    step: 'Blink Twice',
    icon: '◡',
    detail: 'Prevents static image bypass',
    instruction: 'No duplicates present',
  },
  {
    step: 'Verify Location',
    icon: '⊕',
    detail: 'Geolocation + static IP check via API',
    instruction: 'On campus. Identity verified.',
  },
]

/* ─── Camera frame UI ─── */
function CameraFrame() {
  return (
    <div className="relative w-64 h-80 md:w-72 md:h-96 mx-auto">
      {/* Camera border with corner marks */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 bg-black/50 overflow-hidden">
        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-accent/50"
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Face outline placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-28 h-36 md:w-32 md:h-40 rounded-full border border-accent/30 border-dashed" />
            {/* Detection glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-accent/5"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </div>

      {/* Corner marks */}
      {[
        'top-0 left-0 border-t border-l rounded-tl-lg',
        'top-0 right-0 border-t border-r rounded-tr-lg',
        'bottom-0 left-0 border-b border-l rounded-bl-lg',
        'bottom-0 right-0 border-b border-r rounded-br-lg',
      ].map((cls, i) => (
        <div key={i} className={`absolute w-4 h-4 border-accent/60 ${cls}`} />
      ))}
    </div>
  )
}

/* ─── Single checkpoint reveal ─── */
function CheckpointReveal({
  checkpoint,
  opacity,
}: {
  checkpoint: typeof CHECKPOINTS[number]
  opacity: MotionValue<number>
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6"
      style={reduced ? {} : { opacity }}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <CameraFrame />
          <div className="text-center md:text-left">
            <motion.div
              className="w-12 h-12 rounded-xl border border-accent/30 bg-accent/10 flex items-center justify-center mx-auto md:mx-0 mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-accent text-xl font-mono">{checkpoint.icon}</span>
            </motion.div>
            <p className="font-mono text-[11px] text-accent uppercase tracking-[0.25em] mb-2">
              {checkpoint.step}
            </p>
            <p className="font-serif italic text-white text-lg leading-snug">
              {checkpoint.detail}
            </p>
            {checkpoint.instruction && (
              <motion.div
                className="mt-3 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="w-4 h-4 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center">
                  <span className="text-accent text-[10px]">✓</span>
                </div>
                <span className="font-mono text-[10px] text-accent uppercase tracking-wider">
                  {checkpoint.instruction}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Ch4Trust() {
  const { ref, p, height } = usePin('320vh')
  const endRef = useRef<HTMLDivElement>(null)
  const endInView = useInView(endRef, { once: true, margin: '-20%' })
  const reduced = useReducedMotion()

  // 5 checkpoints spread across 0→0.88 of scroll — one hook per checkpoint
  const seg = 0.16, gap = 0.04
  const op0 = useTransform(p, [0*( seg+gap), 0*(seg+gap)+0.06, 0*(seg+gap)+seg-0.06, 0*(seg+gap)+seg], [0,1,1,0])
  const op1 = useTransform(p, [1*(seg+gap), 1*(seg+gap)+0.06, 1*(seg+gap)+seg-0.06, 1*(seg+gap)+seg], [0,1,1,0])
  const op2 = useTransform(p, [2*(seg+gap), 2*(seg+gap)+0.06, 2*(seg+gap)+seg-0.06, 2*(seg+gap)+seg], [0,1,1,0])
  const op3 = useTransform(p, [3*(seg+gap), 3*(seg+gap)+0.06, 3*(seg+gap)+seg-0.06, 3*(seg+gap)+seg], [0,1,1,0])
  const op4 = useTransform(p, [4*(seg+gap), 4*(seg+gap)+0.06, 4*(seg+gap)+seg-0.06, 4*(seg+gap)+seg], [0,1,1,0])
  const opacities = [op0, op1, op2, op3, op4]

  // Final identity reveal
  const finalOp = useTransform(p, [0.88, 0.97], [0, 1])
  const finalY  = useTransform(p, [0.88, 0.97], [30, 0])

  return (
    <section id="ch4-trust">
      {/* Chapter label */}
      <div className="bg-black py-16 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-[10px] text-text-dim uppercase tracking-[0.35em] mb-3">Chapter 04</p>
          <h2
            className="font-black text-white uppercase leading-none"
            style={{ fontSize: 'clamp(1.8rem, 6vw, 5.5rem)', letterSpacing: '-0.03em' }}
          >
            Trust &amp; Verification
          </h2>
        </div>
      </div>

      {/* Context statement */}
      <div className="bg-black px-6 py-12 flex items-center justify-center">
        <div className="max-w-xl text-center">
          <p className="font-serif italic text-white/40 text-xl leading-snug mb-2">
            Faculty scanning photos of colleagues.
          </p>
          <p className="font-serif italic text-white text-xl leading-snug">
            Marking attendance without being present.
          </p>
        </div>
      </div>

      {/* Scroll-pinned cinematic checkpoints */}
      <div ref={ref} style={{ height }}>
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black">

          {CHECKPOINTS.map((cp, i) => (
            <CheckpointReveal
              key={cp.step}
              checkpoint={cp}
              opacity={opacities[i]}
            />
          ))}

          {/* Final: all verified */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={reduced ? {} : { opacity: finalOp, y: finalY }}
          >
            <div className="text-center max-w-sm">
              <motion.div
                className="w-20 h-20 rounded-full border-2 border-accent/50 bg-accent/10 flex items-center justify-center mx-auto mb-6"
                animate={{
                  boxShadow: ['0 0 0 0 rgb(91,138,74,0.4)', '0 0 0 24px rgb(91,138,74,0)', '0 0 0 0 rgb(91,138,74,0)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-accent text-3xl font-mono">✓</span>
              </motion.div>
              <p className="font-mono text-[11px] text-accent uppercase tracking-[0.3em] mb-4">All checks passed</p>
              <div className="space-y-1">
                {CHECKPOINTS.map((cp) => (
                  <div key={cp.step} className="flex items-center justify-center gap-2">
                    <span className="text-accent text-xs">✓</span>
                    <span className="font-mono text-xs text-white/40">{cp.step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Ending statement */}
      <div ref={endRef} className="min-h-screen flex items-center justify-center bg-black px-6">
        <div className="max-w-xl text-center space-y-4">
          {[
            { text: 'Identity verified.', accent: false },
            { text: 'Presence verified.', accent: false },
            { text: 'Those are not the same thing.', accent: true },
          ].map((line, i) => (
            <motion.p
              key={i}
              className={`font-serif italic leading-snug ${line.accent ? 'text-accent' : 'text-white'}`}
              style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)' }}
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={endInView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: i * 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
