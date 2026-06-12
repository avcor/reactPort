import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'
import { Briefcase, Zap, Users } from 'lucide-react'

export function Resume3D() {
  const [hovered, setHovered] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), { stiffness: 150, damping: 20 })
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]),  { stiffness: 150, damping: 20 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
  }

  const handleDownload = () => {
    if (downloading) return
    setDownloading(true)
    setTimeout(() => {
      const a = document.createElement('a')
      a.href = '/resume.pdf'
      a.download = 'Abhishek_Verma_Resume.pdf'
      a.click()
      setDownloading(false)
    }, 800)
  }

  const stats = [
    { icon: Briefcase, label: '4+ Years Experience' },
    { icon: Zap,       label: 'Kotlin · Compose · MVVM' },
    { icon: Users,     label: '500K+ Users Impacted' },
  ]

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      onClick={handleDownload}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        boxShadow: hovered
          ? '0 30px 80px rgba(91,138,74,0.18), 0 8px 24px rgba(0,0,0,0.4)'
          : '0 12px 40px rgba(0,0,0,0.35)',
      }}
      animate={{
        y:     hovered ? -10 : [0, -6, 0],
        scale: downloading ? 0.97 : 1,
      }}
      transition={{
        y: hovered
          ? { duration: 0.25 }
          : { duration: 7, repeat: Infinity, ease: 'easeInOut' },
        scale: { duration: 0.15 },
        boxShadow: { duration: 0.3 },
      }}
      className="relative w-[200px] h-[280px] rounded-[24px] bg-white cursor-pointer overflow-hidden"
      role="button"
      tabIndex={0}
      aria-label={downloading ? 'Downloading resume' : 'Download resume'}
      onKeyDown={e => e.key === 'Enter' && handleDownload()}
    >
      {/* ── Page curl corner ── */}
      <motion.div
        animate={{ width: hovered ? 56 : 28, height: hovered ? 56 : 28 }}
        transition={{ duration: 0.38, ease: [0.32, 0, 0.1, 1] }}
        className="absolute top-0 right-0 z-20"
      >
        {/* Green layer underneath */}
        <div className="absolute inset-0 rounded-bl-3xl" style={{ background: '#5B8A4A' }} />
        {/* White paper fold that rotates away */}
        <motion.div
          animate={{ rotate: hovered ? -22 : 0 }}
          transition={{ duration: 0.38, ease: [0.32, 0, 0.1, 1] }}
          className="absolute inset-0 bg-white rounded-bl-3xl shadow-md origin-top-right"
        />
      </motion.div>

      {/* ── Content ── */}
      <div className="p-5 h-full flex flex-col">
        <span className="text-[10px] font-mono font-medium tracking-[0.18em] uppercase" style={{ color: '#5B8A4A' }}>
          Resume.pdf
        </span>

        <h3 className="mt-4 text-[1.35rem] font-black text-neutral-900 leading-tight tracking-tight">
          Abhishek Verma
        </h3>
        <p className="text-neutral-500 text-sm mt-1 font-medium">Android Engineer</p>

        <div className="mt-6 flex flex-col gap-3">
          {stats.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-neutral-600">
              <Icon size={13} style={{ color: '#5B8A4A', flexShrink: 0 }} strokeWidth={2.5} />
              <span className="text-xs leading-none">{label}</span>
            </div>
          ))}
        </div>

        {/* Download reveal */}
        <div className="mt-auto">
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.22 }}
            className="flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: '#5B8A4A' }}
          >
            {downloading ? 'Downloading…' : '↓ Download Resume'}
          </motion.div>
        </div>
      </div>

      {/* ── Green glow ── */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0.25 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 80%, rgba(91,138,74,0.12), transparent 70%)',
        }}
      />
    </motion.div>
  )
}
