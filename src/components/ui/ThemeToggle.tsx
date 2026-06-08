import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-full border border-border hover:border-border-hover flex items-center justify-center text-text-muted hover:text-text-primary transition-colors duration-200"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
      </motion.div>
    </motion.button>
  )
}
