import { useEffect, useRef } from 'react'

interface InteractiveBackgroundProps {
  particleCount?: number
  connectionDistance?: number
  brightness?: number
  accentColor?: string
}

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  baseVx: number
  baseVy: number
  radius: number
  depth: number
  twinkleOffset: number
  twinkleSpeed: number
  color: string
}

const STAR_COLORS = ['#dcfce7', '#86efac', '#4ade80', '#22c55e', '#5eead4']
const lerp = (from: number, to: number, amount: number) => from + (to - from) * amount

function withAlpha(hex: string, alpha: number) {
  const normalized = hex.replace('#', '')
  const fullHex = normalized.length === 3
    ? normalized.split('').map(character => character + character).join('')
    : normalized

  if (!/^[\da-f]{6}$/i.test(fullHex)) return `rgba(74, 222, 128, ${alpha})`

  const value = Number.parseInt(fullHex, 16)
  const red = (value >> 16) & 255
  const green = (value >> 8) & 255
  const blue = value & 255
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

export default function InteractiveBackground({
  particleCount = 170,
  connectionDistance = 175,
  brightness = 1,
  accentColor = '#4ade80',
}: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const cursor = { x: -9999, y: -9999, active: false }
    let stars: Star[] = []
    let width = 0
    let height = 0
    let frame = 0
    let startTime = performance.now()

    const visibleStarCount = () => Math.min(
      particleCount,
      Math.max(50, Math.min(180, Math.round((window.innerWidth * window.innerHeight) / 11000))),
    )

    const createStars = () => {
      stars = Array.from({ length: visibleStarCount() }, (_, index) => {
        const depth = Math.pow(Math.random(), 1.85)
        const speed = 0.04 + depth * 0.16
        const baseVx = (Math.random() - 0.5) * speed
        const baseVy = (Math.random() - 0.5) * speed

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          depth,
          radius: 0.3 + depth * 2.2,
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.5 + Math.random() * 0.55,
          color: index % 11 === 0 ? '#5eead4' : STAR_COLORS[Math.floor(Math.random() * (STAR_COLORS.length - 1))],
        }
      })
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      createStars()
    }

    const paintBackdrop = () => {
      const background = context.createLinearGradient(0, 0, width, height)
      background.addColorStop(0, '#161a17')
      background.addColorStop(0.5, '#111714')
      background.addColorStop(1, '#0e1311')
      context.fillStyle = background
      context.fillRect(0, 0, width, height)

      const centerGlow = context.createRadialGradient(width / 2, height * 0.46, 0, width / 2, height * 0.46, Math.max(width, height) * 0.68)
      centerGlow.addColorStop(0, withAlpha(accentColor, 0.09 * brightness))
      centerGlow.addColorStop(0.45, withAlpha(accentColor, 0.035 * brightness))
      centerGlow.addColorStop(1, withAlpha(accentColor, 0))
      context.fillStyle = centerGlow
      context.fillRect(0, 0, width, height)

      const vignette = context.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.16, width / 2, height / 2, Math.max(width, height) * 0.76)
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)')
      vignette.addColorStop(1, 'rgba(1, 5, 3, 0.48)')
      context.fillStyle = vignette
      context.fillRect(0, 0, width, height)
    }

    const draw = (now: number) => {
      const elapsed = (now - startTime) / 1000
      context.clearRect(0, 0, width, height)
      paintBackdrop()

      const cursorRange = connectionDistance * 2.45
      if (cursor.active && supportsHover && !reducedMotion) {
        const glow = context.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, 260)
        glow.addColorStop(0, withAlpha(accentColor, 0.16 * brightness))
        glow.addColorStop(0.38, withAlpha(accentColor, 0.055 * brightness))
        glow.addColorStop(1, withAlpha(accentColor, 0))
        context.fillStyle = glow
        context.fillRect(cursor.x - 260, cursor.y - 260, 520, 520)
      }

      for (let index = 0; index < stars.length; index += 1) {
        const star = stars[index]
        let cursorProximity = 0

        if (cursor.active && supportsHover && !reducedMotion) {
          const dx = cursor.x - star.x
          const dy = cursor.y - star.y
          const distance = Math.hypot(dx, dy)
          cursorProximity = Math.max(0, 1 - distance / cursorRange)
          const pull = cursorProximity * (0.3 + star.depth * 0.42)
          star.vx = lerp(star.vx, star.baseVx + (dx / Math.max(distance, 1)) * pull, 0.13)
          star.vy = lerp(star.vy, star.baseVy + (dy / Math.max(distance, 1)) * pull, 0.13)
        } else {
          star.vx = lerp(star.vx, star.baseVx, 0.025)
          star.vy = lerp(star.vy, star.baseVy, 0.025)
        }

        if (!reducedMotion) {
          star.x += star.vx
          star.y += star.vy
          if (star.x < -12) star.x = width + 12
          if (star.x > width + 12) star.x = -12
          if (star.y < -12) star.y = height + 12
          if (star.y > height + 12) star.y = -12
        }

        const twinkle = reducedMotion ? 0.75 : 0.62 + Math.sin(elapsed * star.twinkleSpeed + star.twinkleOffset) * 0.26
        const alpha = (0.07 + star.depth * 0.19 + cursorProximity * 0.5) * twinkle * brightness

        context.beginPath()
        context.arc(star.x, star.y, star.radius + cursorProximity * 0.85, 0, Math.PI * 2)
        context.fillStyle = star.color
        context.globalAlpha = alpha
        context.fill()

        // Limit pair work to the closest visual layer, preserving frame budget on larger screens.
        if (index >= 180) continue
        for (let otherIndex = index + 1; otherIndex < Math.min(stars.length, 180); otherIndex += 1) {
          const other = stars[otherIndex]
          const dx = star.x - other.x
          const dy = star.y - other.y
          const distance = Math.hypot(dx, dy)
          if (distance > connectionDistance) continue

          const nearCursor = cursor.active && supportsHover && !reducedMotion
            ? Math.max(0, 1 - Math.min(
              Math.hypot(cursor.x - star.x, cursor.y - star.y),
              Math.hypot(cursor.x - other.x, cursor.y - other.y),
            ) / cursorRange)
            : 0
          const depth = (star.depth + other.depth) / 2

          context.beginPath()
          context.moveTo(star.x, star.y)
          context.lineTo(other.x, other.y)
          context.strokeStyle = '#86efac'
          context.globalAlpha = (1 - distance / connectionDistance) * (0.09 + depth * 0.09 + nearCursor * 0.24) * brightness
          context.lineWidth = 0.6 + depth * 0.45
          context.stroke()
        }
      }

      context.globalAlpha = 1
    }

    const animate = (now: number) => {
      draw(now)
      if (!reducedMotion) frame = window.requestAnimationFrame(animate)
    }

    const handlePointerMove = (event: PointerEvent) => {
      cursor.x = event.clientX
      cursor.y = event.clientY
      cursor.active = true
    }

    const handlePointerLeave = () => {
      cursor.active = false
    }

    resize()
    window.addEventListener('resize', resize)
    if (supportsHover && !reducedMotion) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      window.addEventListener('blur', handlePointerLeave)
    }
    animate(performance.now())

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('blur', handlePointerLeave)
    }
  }, [accentColor, brightness, connectionDistance, particleCount])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0" style={{ zIndex: -1 }} />
}
