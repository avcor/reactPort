import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { MapPin, Linkedin, Github, Mail, ArrowUpRight, Check, Globe } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Resume3D } from '@/components/ui/Resume3D'

const EMAIL = 'hello@abhishekverma.dev'

/* ─── shared card shell ─── */
const card = 'rounded-2xl border border-white/[0.14] border-t-white/[0.25] bg-[#111111] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_1px_3px_rgba(0,0,0,0.6)] overflow-hidden'

/* ─── AV Monogram / clock equivalent ─── */
function AVOrb() {
  const reduced = useReducedMotion()
  return (
    <div className="relative flex items-center justify-center h-full min-h-[280px]">
      {/* Outer glow */}
      <div className="absolute w-72 h-72 rounded-full bg-accent/5 blur-3xl" />

      {/* Tick marks ring */}
      <div className="absolute w-64 h-64 rounded-full">
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-0 origin-bottom"
            style={{
              transform: `translateX(-50%) rotate(${i * 10}deg)`,
              height: '50%',
            }}
          >
            <div
              className="mx-auto rounded-full bg-white/10"
              style={{
                width: i % 3 === 0 ? '1.5px' : '1px',
                height: i % 3 === 0 ? '6px' : '4px',
              }}
            />
          </div>
        ))}
      </div>

      {/* Spinning conic ring */}
      <div
        className={`w-52 h-52 rounded-full flex items-center justify-center ${reduced ? '' : 'animate-spin-slow'}`}
        style={{
          background: 'conic-gradient(from 0deg, rgb(var(--accent)), transparent 35%, rgb(var(--accent) / 0.4) 55%, transparent 100%)',
          padding: '1.5px',
        }}
      >
        <div
          className={`w-full h-full rounded-full bg-[#111111] flex items-center justify-center ${reduced ? '' : '[animation:spin-slow_18s_linear_infinite_reverse]'}`}
        >
          <span
            className="font-mono font-bold text-accent select-none"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', letterSpacing: '-0.04em' }}
          >
            AV
          </span>
        </div>
      </div>

      {/* Cardinal labels */}
      <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/20 uppercase tracking-widest">Android</span>
      <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-white/20 uppercase tracking-widest">500k+</span>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] font-mono text-white/20 uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>4+ yrs</span>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono text-white/20 uppercase tracking-widest" style={{ writingMode: 'vertical-rl' }}>Kotlin</span>
    </div>
  )
}

/* ─── Card 1 — Identity ─── */
function CardIdentity() {
  return (
    <div className="h-full flex flex-col p-5 gap-4">
      {/* Name — mixed typography */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-2">Software Engineer</p>
        <h2 className="leading-none" style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2rem)' }}>
          <span className="font-black text-white">Abhishek </span>
          <span className="font-serif italic text-white/60">Verma</span>
        </h2>
        <div className="flex items-center gap-1.5 mt-2 text-white/40 text-xs font-mono">
          <MapPin size={11} />
          <span>Remote, IN</span>
        </div>
      </div>

      {/* Resume 3D visual */}
      <div className="flex-1 flex items-center justify-center py-2">
        <Resume3D />
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.06]" />

      {/* Social links */}
      <div className="flex items-center gap-4">
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
          className="text-white/40 hover:text-white transition-colors duration-200">
          <Linkedin size={15} />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
          className="text-white/40 hover:text-white transition-colors duration-200">
          <Github size={15} />
        </a>
        <a href={`mailto:${EMAIL}`} aria-label="Email"
          className="text-white/40 hover:text-white transition-colors duration-200">
          <Mail size={15} />
        </a>
      </div>
    </div>
  )
}

/* ─── Card 2 — Philosophy ─── */
function CardPhilosophy() {
  const tags = ['Kotlin', 'Compose', 'Offline-first', 'MVVM']

  return (
    <div className="h-full p-5 flex flex-col gap-4">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/[0.1] bg-white/[0.03]">
          <span className="w-1 h-1 rounded-full bg-accent" />
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/50">Detail-driven Android</span>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/30">Philosophy +</span>
      </div>

      {/* Headline */}
      <div className="mt-1">
        <p className="font-black text-white leading-none text-2xl md:text-3xl tracking-tight">
          Production ready
        </p>
        <p className="font-serif italic text-white/60 leading-tight mt-0.5"
          style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)' }}>
          systems you can feel.
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag, i) => (
          <span
            key={tag}
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
              i === 0
                ? 'border-accent/50 bg-accent/10 text-accent'
                : 'border-white/[0.1] text-white/40 hover:text-white/60'
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.06]" />

      {/* Philosophy copy */}
      <div className="mt-auto">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-1.5">Micro-optimisations</p>
        <p className="text-white/50 text-sm leading-relaxed">
          I build for the edge case — offline hospitals, dropped connections,
          3am crashes. The best engineering I've done is the kind no one ever notices.
        </p>
      </div>
    </div>
  )
}

/* ─── Card 3 — Contact + Availability ─── */
function CardContact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="h-full p-5 flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="w-7 h-7 rounded-full border border-white/[0.1] bg-white/[0.03] flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
          <span className="text-xs font-mono text-green-400 tracking-wide">Available for work</span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.06]" />

      {/* CTA Headline */}
      <div className="mt-1">
        <p className="font-black text-white uppercase leading-tight tracking-tight text-xl md:text-2xl">
          Let's build something
        </p>
        <p className="font-serif italic text-white/50 mt-0.5"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)' }}>
          that actually works.
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.06]" />

      {/* Email copy */}
      <button onClick={copyEmail} className="flex flex-col gap-1 text-left group" aria-label="Copy email">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full border border-white/[0.1] flex items-center justify-center text-white/40 group-hover:text-white/70 transition-colors">
            {copied ? <Check size={11} className="text-green-400" /> : <ArrowUpRight size={11} />}
          </div>
          <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">{EMAIL}</span>
        </div>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/25 ml-8.5">
          {copied ? 'Copied!' : 'Tap to copy email'}
        </p>
      </button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Role */}
      <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.15em]">
        Android · Full-time · Remote or Bangalore
      </p>

      {/* CTA Button */}
      <a
        href={`mailto:${EMAIL}`}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black text-sm font-bold uppercase tracking-[0.15em] hover:bg-white/90 transition-colors active:scale-[0.98]"
      >
        Connect now
        <ArrowUpRight size={13} />
      </a>
    </div>
  )
}

/* ─── Card 4 — Availability / Globe ─── */
function CardAvailability() {
  const zones = [
    { flag: '🇬🇧', code: 'GB', city: 'UK' },
    { flag: '🇮🇳', code: 'IN', city: 'India',  active: true },
    { flag: '🇺🇸', code: 'US', city: 'USA' },
  ]

  return (
    <div className="h-full p-5 flex flex-col justify-between gap-4">
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-2">Available Globally</p>
        <p className="font-black text-white text-xl leading-tight">
          Adaptable across<br />time zones
        </p>
      </div>

      {/* Globe placeholder */}
      <div className="relative flex-1 flex items-center justify-center min-h-[80px]">
        <div className="relative">
          <Globe size={72} className="text-white/8 stroke-[0.8]" />
          <Globe size={72} className="text-accent/20 stroke-[0.8] absolute inset-0 blur-sm" />
          {/* India dot */}
          <div className="absolute w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(55,138,221,0.8)] top-[52%] left-[67%]" />
        </div>
      </div>

      {/* Time zone chips */}
      <div className="flex flex-col gap-1.5">
        {zones.map(z => (
          <div
            key={z.code}
            className={`flex items-center justify-between px-3 py-1.5 rounded-lg border transition-colors ${
              z.active
                ? 'border-accent/30 bg-accent/8 text-white'
                : 'border-white/[0.06] text-white/40'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{z.flag}</span>
              <span className="text-xs font-mono uppercase tracking-wider">{z.code}</span>
            </div>
            <span className="text-xs text-white/40">{z.city}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Card 5 — App mocks ─── */
function CardApps() {
  const apps = [
    { label: 'Digii',  sub: 'Campus Platform',  delay: '0s' },
    { label: 'ECG',    sub: 'Medical Monitor',   delay: '0.3s' },
    { label: 'Home',   sub: 'Health Revamp',     delay: '0.6s' },
  ]

  return (
    <div className="h-full p-5 flex flex-col gap-5">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-1.5">Selected work</p>
          <p className="font-black text-white text-xl leading-tight">
            3 apps.{' '}
            <span className="font-serif italic text-white/50 font-normal text-lg">Millions of moments.</span>
          </p>
        </div>
        <a href="#projects"
          className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.15em] text-white/30 hover:text-white/60 transition-colors group">
          View all
          <ArrowUpRight size={10} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <div className="flex gap-4 justify-center">
        {apps.map((app) => (
          <a key={app.label} href="#projects"
            className="flex-1 min-w-[70px] max-w-[120px] group cursor-pointer">
            {/* Phone frame */}
            <div className="relative mx-auto w-full aspect-[9/19] rounded-[1.4rem] border border-white/[0.12] border-t-white/[0.22] group-hover:border-accent/30 bg-[#0a0a0a] overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-accent/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
              {/* Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1.5 rounded-full bg-white/10" />
              {/* Screen shimmer */}
              <div className="absolute inset-0 top-6 shimmer" style={{ animationDelay: app.delay }} />
              {/* App label */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent px-2 pb-3 pt-6">
                <p className="text-white/80 text-[10px] font-mono font-semibold text-center">{app.label}</p>
              </div>
            </div>
            <p className="text-white/30 text-[11px] text-center mt-2 font-mono">{app.sub}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

/* ─── Main Section ─── */
export function BentoSection() {
  return (
    <section id="bento" className="py-16 px-5 md:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Col 1, rows 1–2: Identity */}
          <ScrollReveal direction="left" className="md:row-span-2">
            <div className={`h-full ${card} min-h-[400px]`}>
              <CardIdentity />
            </div>
          </ScrollReveal>

          {/* Col 2, row 1: Philosophy */}
          <ScrollReveal delay={0.06}>
            <div className={card}>
              <CardPhilosophy />
            </div>
          </ScrollReveal>

          {/* Col 3, rows 1–2: Contact */}
          <ScrollReveal direction="right" className="md:row-span-2">
            <div className={`h-full ${card} min-h-[400px]`}>
              <CardContact />
            </div>
          </ScrollReveal>

          {/* Col 2, row 2: AV orb */}
          <ScrollReveal delay={0.1}>
            <div className={`${card} min-h-[280px]`}>
              <AVOrb />
            </div>
          </ScrollReveal>

          {/* Row 3 col 1: Availability */}
          <ScrollReveal delay={0.12} direction="up">
            <div className={card}>
              <CardAvailability />
            </div>
          </ScrollReveal>

          {/* Row 3 col 2–3: App mocks */}
          <ScrollReveal delay={0.14} direction="up" className="md:col-span-2">
            <div className={card}>
              <CardApps />
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
