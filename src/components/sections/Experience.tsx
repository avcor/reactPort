import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { TimelineItem } from '@/components/ui/TimelineItem'
import { experience } from '@/data/experience'

export function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const inView = useInView(timelineRef, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.05em] text-text-muted">
            // experience
          </span>
        </ScrollReveal>

        {/* Timeline */}
        <div ref={timelineRef} className="mt-10 relative">
          {/* Static ghost line */}
          <div className="absolute left-[5px] top-0 bottom-0 w-px bg-border" />

          {/* Animated fill line — draws downward when in view */}
          <motion.div
            className="absolute left-[5px] top-0 w-px origin-top"
            style={{ bottom: 0, background: 'linear-gradient(to bottom, #378ADD, rgba(55,138,221,0.2))' }}
            initial={{ scaleY: 0 }}
            animate={inView || reduced ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          />

          <div className="space-y-12">
            {experience.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
