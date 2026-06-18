import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface PhoneRevealProps {
  src: string
  alt: string
  label: string
  caption: string
  /** 'portrait' = phone frame added. 'bare' = image shown as-is (already framed). */
  variant?: 'portrait' | 'bare'
  /** Optional metric badge overlaid on phone */
  metric?: string
}

export function PhoneReveal({
  src,
  alt,
  label,
  caption,
  variant = 'portrait',
  metric,
}: PhoneRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })
  const reduced = useReducedMotion()

  return (
    <div
      ref={ref}
      className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden"
    >
      {/* Ambient glow */}
      {!reduced && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 50% at 50% 50%, rgb(91,138,74,0.06) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Label */}
      <motion.p
        className="font-mono text-[10px] text-accent uppercase tracking-[0.35em] mb-10 text-center"
        initial={reduced ? {} : { opacity: 0 }}
        animate={inView || reduced ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {label}
      </motion.p>

      {/* Phone / image */}
      <motion.div
        className="relative z-10"
        initial={reduced ? {} : { opacity: 0, y: 40, scale: 0.94 }}
        animate={inView || reduced ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.94 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Soft glow behind device */}
        <div
          className="absolute inset-0 -z-10 scale-75 blur-[70px] rounded-full opacity-25"
          style={{ background: 'rgb(91,138,74)' }}
        />

        {variant === 'portrait' ? (
          /* ── Portrait phone frame ── */
          <div
            className="relative"
            style={{ width: 'min(248px, 55vw)', height: 'min(520px, 72vh)' }}
          >
            {/* Outer ring */}
            <div className="absolute -inset-[6px] rounded-[42px] border border-white/[0.06]" />
            {/* Device body */}
            <div
              className="absolute inset-0 rounded-[36px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)]"
              style={{ border: '1.5px solid rgba(255,255,255,0.12)' }}
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                width={248}
                height={520}
              />
            </div>
            {/* Notch overlay */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20" />
            {/* Side volume buttons */}
            <div className="absolute -left-[2px] top-24 w-[2px] h-8 rounded bg-white/10" />
            <div className="absolute -left-[2px] top-36 w-[2px] h-6 rounded bg-white/10" />
            {/* Power button */}
            <div className="absolute -right-[2px] top-28 w-[2px] h-12 rounded bg-white/10" />

            {/* Metric badge */}
            {metric && (
              <motion.div
                className="absolute -bottom-4 -right-4 px-3 py-1.5 rounded-full bg-accent text-black font-mono text-xs font-bold whitespace-nowrap shadow-lg z-30"
                initial={reduced ? {} : { opacity: 0, scale: 0.7 }}
                animate={inView || reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                transition={{ delay: 0.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {metric}
              </motion.div>
            )}
          </div>
        ) : (
          /* ── Bare image (already framed / landscape) ── */
          <div className="relative" style={{ maxWidth: 'min(620px, 88vw)', maxHeight: '72vh' }}>
            <img
              src={src}
              alt={alt}
              className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)]"
              loading="lazy"
            />
            {metric && (
              <motion.div
                className="absolute bottom-2 right-2 px-3 py-1.5 rounded-full bg-accent text-black font-mono text-xs font-bold z-10"
                initial={reduced ? {} : { opacity: 0, scale: 0.7 }}
                animate={inView || reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                {metric}
              </motion.div>
            )}
          </div>
        )}
      </motion.div>

      {/* Caption */}
      <motion.p
        className="font-serif italic text-white/40 text-center mt-10 max-w-xs leading-snug"
        style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)' }}
        initial={reduced ? {} : { opacity: 0, y: 12 }}
        animate={inView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {caption}
      </motion.p>
    </div>
  )
}
