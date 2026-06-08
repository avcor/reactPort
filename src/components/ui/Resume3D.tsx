import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Download } from 'lucide-react'

export function Resume3D() {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), { stiffness: 160, damping: 22 })
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), { stiffness: 160, damping: 22 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ perspective: 600 }}>
      <motion.a
        href="/resume.pdf"
        download="Abhishek_Verma_Resume.pdf"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative block w-28 h-40 cursor-pointer group"
      >
        {/* Resume card visual */}
        <div className="w-full h-full rounded-lg bg-surface-2 border border-border p-3 shadow-lg flex flex-col gap-2">
          {/* Header block */}
          <div className="space-y-1">
            <div className="h-2 w-3/4 rounded bg-accent/30" />
            <div className="h-1.5 w-1/2 rounded bg-text-dim/50" />
          </div>
          <div className="w-full h-px bg-border" />
          {/* Body lines */}
          <div className="space-y-1.5 flex-1">
            {[1, 0.85, 0.95, 0.7, 0.9, 0.6, 0.8, 0.75].map((w, i) => (
              <div
                key={i}
                className="h-1 rounded bg-text-dim/30"
                style={{ width: `${w * 100}%` }}
              />
            ))}
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 rounded-lg bg-accent/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2">
          <Download size={18} className="text-white" />
          <span className="text-white text-xs font-medium font-mono">Download</span>
        </div>
      </motion.a>
    </div>
  )
}
