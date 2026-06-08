import { useEffect, useState, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  delay?: number
  decimals?: number
}

export function AnimatedCounter({ value, duration = 1200, delay = 0, decimals = 0 }: AnimatedCounterProps) {
  const [display, setDisplay] = useState(0)
  const reduced = useReducedMotion()
  const startTime = useRef<number | null>(null)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    if (reduced) {
      setDisplay(value)
      return
    }

    const timer = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (startTime.current === null) startTime.current = timestamp
        const elapsed = timestamp - startTime.current
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(parseFloat((eased * value).toFixed(decimals)))
        if (progress < 1) {
          rafId.current = requestAnimationFrame(animate)
        } else {
          setDisplay(value)
        }
      }
      rafId.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timer)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [value, duration, delay, decimals, reduced])

  return <>{display.toFixed(decimals)}</>
}
