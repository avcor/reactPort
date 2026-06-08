import { Mail, Linkedin, Github, FileText } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.05em] text-text-muted">
            // contact
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
          <h2
            className="mt-8 text-text-primary font-bold tracking-tight"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.01em' }}
          >
            Open to full-time roles &amp; interesting problems.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <p className="mt-3 text-text-muted text-lg">Let&apos;s talk.</p>
        </ScrollReveal>

        <ScrollReveal delay={0.18}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@abhishekverma.dev"
              className="flex items-center gap-2.5 px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors active:scale-[0.97]"
            >
              <Mail size={16} /> Email me
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3 rounded-lg border border-border text-text-muted hover:border-border-hover hover:text-text-primary transition-colors active:scale-[0.97]"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3 rounded-lg border border-border text-text-muted hover:border-border-hover hover:text-text-primary transition-colors active:scale-[0.97]"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2.5 px-6 py-3 rounded-lg border border-border text-text-muted hover:border-border-hover hover:text-text-primary transition-colors active:scale-[0.97]"
            >
              <FileText size={16} /> Resume
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
