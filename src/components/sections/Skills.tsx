import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { skills } from '@/data/skills'

const chipVariants = {
  hidden: { opacity: 0, scale: 0.75, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 320, damping: 22 },
  },
}

interface SkillGroupCardProps {
  label: string
  skillList: string[]
  delay: number
}

function SkillGroupCard({ label, skillList, delay }: SkillGroupCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()

  return (
    <ScrollReveal direction="scale" delay={delay}>
      <div ref={ref} className="p-6 rounded-xl border border-border bg-surface">
        <h3 className="text-text-primary font-semibold text-sm mb-4 font-mono">{label}</h3>
        <motion.div
          className="flex flex-wrap gap-2"
          variants={reduced ? undefined : { hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
          initial={reduced ? undefined : 'hidden'}
          animate={inView || reduced ? 'show' : 'hidden'}
        >
          {skillList.map((skill) => (
            <motion.span
              key={skill}
              variants={reduced ? undefined : chipVariants}
              className={`
                inline-flex items-center px-3 py-1 rounded-full text-sm font-mono border
                transition-all duration-150 cursor-default hover:-translate-y-0.5
                ${skill === 'Kotlin'
                  ? 'border-accent bg-accent-dim text-accent'
                  : 'border-border text-text-muted hover:border-accent hover:text-text-primary bg-surface'
                }
              `}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </ScrollReveal>
  )
}

export function Skills() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.05em] text-text-muted">
            // skills
          </span>
        </ScrollReveal>

        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          {skills.map((group, gi) => (
            <SkillGroupCard
              key={group.label}
              label={group.label}
              skillList={group.skills}
              delay={gi * 0.07}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
