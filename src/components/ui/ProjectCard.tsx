import { useState } from 'react'
import { ChevronDown, Github, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  defaultOpen?: boolean
}

export function ProjectCard({ project, defaultOpen = false }: ProjectCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const reduced = useReducedMotion()

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-surface hover:border-border-hover transition-colors duration-200">
      {/* Header */}
      <button
        className="w-full flex items-center gap-4 p-6 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="font-mono text-text-dim text-sm shrink-0">
          {String(project.id).padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-text-primary font-semibold">{project.name}</span>
            {project.badge && (
              <span className="px-2 py-0.5 rounded-full text-xs font-mono border border-accent text-accent bg-accent-dim">
                {project.badge}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tech.map((t) => (
              <span key={t} className="text-xs font-mono text-text-dim">
                {t}
              </span>
            ))}
          </div>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-text-muted"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      {/* Expanded */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5 border-t border-border pt-5">
              {/* Screenshots */}
              {project.screenshots.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {project.screenshots.map((src, i) => (
                    <div key={i} className="rounded-lg overflow-hidden bg-surface-2 aspect-video">
                      <img
                        src={src}
                        alt={`${project.name} screenshot ${i + 1}`}
                        loading="lazy"
                        width={480}
                        height={270}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              {(project.problem || project.solution || project.impact) && (
                <div className="space-y-2 text-sm text-text-muted leading-relaxed">
                  {project.problem && <p><span className="text-text-primary font-medium">Problem: </span>{project.problem}</p>}
                  {project.solution && <p><span className="text-text-primary font-medium">Solution: </span>{project.solution}</p>}
                  {project.impact && <p><span className="text-text-primary font-medium">Impact: </span>{project.impact}</p>}
                </div>
              )}

              {/* Links */}
              <div className="flex gap-4">
                {project.github && project.github !== '#' && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    <Github size={15} />
                    GitHub
                  </a>
                )}
                {project.playstore && project.playstore !== '#' && (
                  <a
                    href={project.playstore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
                  >
                    <ExternalLink size={15} />
                    Play Store
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
