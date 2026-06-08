import { Shield, TrendingUp } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { about } from '@/data/about'

const ICONS: Record<string, React.ReactNode> = {
  shield: <Shield size={20} className="text-accent" />,
  'trending-up': <TrendingUp size={20} className="text-accent" />,
}

export function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.05em] text-text-muted">
            // about
          </span>
        </ScrollReveal>

        <div className="mt-10 grid md:grid-cols-5 gap-10">
          {/* Bio — slides in from the left */}
          <div className="md:col-span-3 space-y-4">
            {about.bio.map((paragraph, i) => (
              <ScrollReveal key={i} direction="left" delay={0.06 + i * 0.07}>
                <p className="text-text-muted leading-[1.7]">{paragraph}</p>
              </ScrollReveal>
            ))}
          </div>

          {/* Interest cards — slide in from the right */}
          <div className="md:col-span-2 space-y-4">
            {about.interests.map((interest, i) => (
              <ScrollReveal key={interest.title} direction="right" delay={0.1 + i * 0.08}>
                <div className="p-5 rounded-xl border border-border bg-surface hover:border-border-hover transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    {ICONS[interest.icon]}
                    <span className="text-text-primary font-semibold text-sm">{interest.title}</span>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">{interest.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
