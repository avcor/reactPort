import { useScroll, useTransform, motion } from 'framer-motion'
import { ThemeProvider } from '@/context/ThemeContext'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { BentoSection } from '@/components/sections/BentoSection'
import { Experience } from '@/components/sections/Experience'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'

function AmbientBackground() {
  const { scrollYProgress } = useScroll()
  const orb1Y = useTransform(scrollYProgress, [0, 1], ['0vh',  '60vh'])
  const orb2Y = useTransform(scrollYProgress, [0, 1], ['50vh', '-20vh'])
  const orb3Y = useTransform(scrollYProgress, [0, 1], ['80vh', '20vh'])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      <motion.div
        className="absolute -left-80 w-[700px] h-[700px] rounded-full blur-[140px]"
        style={{ top: orb1Y, background: 'radial-gradient(circle, rgb(var(--accent) / 0.12) 0%, transparent 70%)' }}
      />
      <motion.div
        className="absolute -right-80 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ top: orb2Y, background: 'radial-gradient(circle, rgb(var(--accent) / 0.08) 0%, transparent 70%)' }}
      />
      <motion.div
        className="absolute left-1/3 w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ top: orb3Y, background: 'radial-gradient(circle, rgb(var(--accent) / 0.06) 0%, transparent 70%)' }}
      />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="bg-page-bg min-h-screen">
        <AmbientBackground />
        <CommandPalette />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <BentoSection />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}
