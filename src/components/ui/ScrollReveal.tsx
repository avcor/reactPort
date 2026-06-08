import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export type RevealDirection = 'up' | 'left' | 'right' | 'scale'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: RevealDirection
}

function getVariants(direction: RevealDirection) {
  const hidden = {
    up:    { opacity: 0 as number, y: 28, x: 0, scale: 1 },
    left:  { opacity: 0 as number, x: -40, y: 0, scale: 1 },
    right: { opacity: 0 as number, x: 40, y: 0, scale: 1 },
    scale: { opacity: 0 as number, scale: 0.92, x: 0, y: 0 },
  }[direction]

  const visible = {
    up:    { opacity: 1 as number, y: 0, x: 0, scale: 1 },
    left:  { opacity: 1 as number, x: 0, y: 0, scale: 1 },
    right: { opacity: 1 as number, x: 0, y: 0, scale: 1 },
    scale: { opacity: 1 as number, scale: 1, x: 0, y: 0 },
  }[direction]

  return { hidden, visible }
}

export function ScrollReveal({ children, delay = 0, className, direction = 'up' }: ScrollRevealProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduced = useReducedMotion()
  const { hidden, visible } = getVariants(direction)

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : hidden}
      animate={inView || reduced ? visible : hidden}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
