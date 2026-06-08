import { ScrollReveal } from './ScrollReveal'
import type { ExperienceItem } from '@/types'

interface TimelineItemProps {
  item: ExperienceItem
  index: number
}

export function TimelineItem({ item, index }: TimelineItemProps) {
  return (
    <ScrollReveal delay={index * 0.08} className="relative pl-8 md:pl-12">
      {/* Dot */}
      <div className="absolute left-0 top-1.5 flex items-center justify-center">
        {item.current ? (
          <span className="relative flex h-3 w-3">
            <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
          </span>
        ) : (
          <span className="h-3 w-3 rounded-full bg-text-dim" />
        )}
      </div>

      <div className="space-y-3">
        {/* Header */}
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-xs text-text-dim">{item.period} · {item.location}</span>
          <h3 className="text-text-primary font-semibold text-lg leading-tight">{item.company}</h3>
          <span className="text-accent text-sm font-mono">{item.role}</span>
        </div>

        {/* Chips */}
        <div className="flex flex-wrap gap-2">
          {item.chips.map((chip) => (
            <span
              key={chip}
              className="px-2.5 py-0.5 rounded-full text-xs font-mono border border-border text-text-muted bg-surface"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Bullets */}
        <ul className="space-y-2">
          {item.bullets.map((bullet, i) => (
            <li key={i} className="flex gap-3 text-text-muted text-sm leading-relaxed">
              <span className="text-accent mt-1 shrink-0">→</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  )
}
