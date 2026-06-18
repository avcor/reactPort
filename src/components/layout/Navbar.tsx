import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '@/hooks/useActiveSection'

const NAV_LINKS = [
  { label: 'Performance',  href: '#ch1-performance' },
  { label: 'Reliability',  href: '#ch2-reliability' },
  { label: 'Modernizing',  href: '#ch3-modernizing' },
  { label: 'Trust',        href: '#ch4-trust' },
  { label: 'Philosophy',   href: '#philosophy' },
  { label: 'Contact',      href: '#contact' },
]

const SECTIONS = [
  'opening', 'ch1-performance', 'ch2-reliability',
  'ch3-modernizing', 'ch4-trust', 'ch5-product', 'philosophy', 'contact',
]

export function Navbar() {
  const [hidden, setHidden]     = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection           = useActiveSection(SECTIONS)

  useEffect(() => {
    let prev = 0
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 80 && y > prev)
      prev = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">

          {/* Left — monogram + tagline */}
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-accent text-lg tracking-tight">AV</span>
            <div className="hidden sm:block w-px h-6 bg-white/10" />
            <div className="hidden sm:block">
              <p className="text-[10px] font-mono text-text-dim uppercase tracking-widest leading-none">Android Engineer</p>
              <p className="text-[10px] font-mono text-text-dim uppercase tracking-widest leading-none mt-0.5">Building for 500k+ users</p>
            </div>
          </div>

          {/* Right — pill nav */}
          <div className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full border border-white/[0.12] bg-black/70 backdrop-blur-xl">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1)
              const isActive = activeSection === id
              return (
                <a
                  key={label}
                  href={href}
                  className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                    isActive
                      ? 'text-text-primary bg-white/[0.08]'
                      : 'text-text-muted hover:text-text-primary hover:bg-white/[0.05]'
                  }`}
                >
                  {label}
                </a>
              )
            })}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-text-muted hover:text-text-primary transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="text-3xl font-semibold text-text-primary hover:text-accent transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
