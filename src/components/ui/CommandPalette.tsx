import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Command, Home, Briefcase, FolderOpen, Layers,
  FileText, Github, Linkedin, Mail,
} from 'lucide-react'

interface CommandItem {
  id: string
  label: string
  icon: React.ElementType
  description: string
  action: () => void
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const COMMANDS: CommandItem[] = [
  { id: 'home',       label: 'Home',            icon: Home,      description: 'Back to top',             action: () => scrollTo('hero') },
  { id: 'experience', label: 'Experience',       icon: Briefcase, description: 'Work history',            action: () => scrollTo('experience') },
  { id: 'projects',   label: 'My Work',          icon: FolderOpen,description: 'Projects & apps',        action: () => scrollTo('projects') },
  { id: 'skills',     label: 'Skills',           icon: Layers,    description: 'Tech stack',              action: () => scrollTo('skills') },
  { id: 'resume',     label: 'Download Resume',  icon: FileText,  description: 'PDF',                     action: () => { const a = document.createElement('a'); a.href = '/resume.pdf'; a.download = 'Abhishek_Verma_Resume.pdf'; a.click() } },
  { id: 'github',     label: 'GitHub',           icon: Github,    description: 'github.com',              action: () => window.open('#', '_blank') },
  { id: 'linkedin',   label: 'LinkedIn',         icon: Linkedin,  description: 'Say hi',                  action: () => window.open('#', '_blank') },
  { id: 'email',      label: 'Email me',         icon: Mail,      description: 'hello@abhishekverma.dev', action: () => { window.location.href = 'mailto:hello@abhishekverma.dev' } },
]

// Global trigger — any component can call this
const PALETTE_EVENT = 'cmd-palette:open'
export function openCommandPalette() {
  window.dispatchEvent(new Event(PALETTE_EVENT))
}

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase())
  )

  const close = useCallback(() => setOpen(false), [])

  const run = useCallback((item: CommandItem) => {
    item.action()
    close()
  }, [close])

  useEffect(() => {
    const onOpen = () => { setOpen(true); setQuery(''); setSelected(0) }
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); onOpen() }
    }
    window.addEventListener(PALETTE_EVENT, onOpen)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener(PALETTE_EVENT, onOpen)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40)
  }, [open])

  useEffect(() => { setSelected(0) }, [query])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, filtered.length - 1))
      if (e.key === 'ArrowUp')   setSelected(s => Math.max(s - 1, 0))
      if (e.key === 'Enter' && filtered[selected]) run(filtered[selected])
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, filtered, selected, run, close])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-page-bg/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={close}
          />

          <motion.div
            className="fixed z-50 left-1/2 top-[22%] -translate-x-1/2 w-full max-w-lg px-4"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rounded-2xl border border-border-hover bg-surface shadow-2xl overflow-hidden">
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
                <Command size={15} className="text-text-dim shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 bg-transparent text-text-primary placeholder:text-text-dim text-sm outline-none"
                />
                <kbd className="text-xs text-text-dim border border-border rounded px-1.5 py-0.5">esc</kbd>
              </div>

              {/* Results */}
              <div className="max-h-72 overflow-y-auto py-1.5">
                {filtered.length === 0 ? (
                  <p className="text-text-dim text-sm text-center py-8">No results for &ldquo;{query}&rdquo;</p>
                ) : (
                  filtered.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100 ${
                          i === selected
                            ? 'bg-surface-2 text-text-primary'
                            : 'text-text-muted hover:bg-surface-2 hover:text-text-primary'
                        }`}
                        onMouseEnter={() => setSelected(i)}
                        onClick={() => run(item)}
                      >
                        <span className={`shrink-0 ${i === selected ? 'text-accent' : 'text-text-dim'}`}>
                          <Icon size={14} />
                        </span>
                        <span className="text-sm flex-1">{item.label}</span>
                        <span className="text-xs text-text-dim">{item.description}</span>
                      </button>
                    )
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-border flex gap-4 text-xs text-text-dim">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>⌘K open</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
