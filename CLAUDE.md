# Abhishek Verma — Portfolio Website

## Project Overview

Personal portfolio website for Abhishek Verma, a senior Android Engineer with 4+ years of
experience. Goal: get interview calls from top-tier companies (FAANG and equivalent).

Single-page React application. Dark theme. Sharp, engineering-focused aesthetic — inspired by
Linear, Vercel, Stripe. No templates, no generic developer portfolio patterns.

---

## Tech Stack

- **Framework**: React 18 + Vite
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3
- **Fonts**: Inter (UI) + JetBrains Mono (code/accent) — via Google Fonts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Deployment**: Vercel (static export)

---

## Project Structure

```
abhishek-portfolio/
├── public/
│   ├── resume.pdf              # Abhishek's resume (placeholder — user will add)
│   └── projects/               # Project screenshots (user will add)
│       ├── project-1/
│       ├── project-2/
│       └── project-3/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Skills.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── AnimatedCounter.tsx
│   │       ├── TypewriterText.tsx
│   │       ├── ScrollReveal.tsx
│   │       ├── ProjectCard.tsx
│   │       ├── SkillChip.tsx
│   │       └── TimelineItem.tsx
│   ├── data/
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   └── skills.ts
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   ├── useActiveSection.ts
│   │   └── useTypewriter.ts
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── CLAUDE.md
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## Design System

### Color Tokens (defined in tailwind.config.ts)

```
page-bg:      #0a0a0f   (deepest dark — page background)
surface:      #111118   (card/section surfaces)
surface-2:    #1a1a24   (elevated surfaces, hover states)
border:       #ffffff14 (subtle borders — 8% white)
border-hover: #ffffff28 (hover borders — 16% white)
accent:       #378ADD   (primary accent — electric blue)
accent-dim:   #1a4a7a   (accent bg tint)
text-primary: #e8e8f0   (primary text)
text-muted:   #888799   (secondary/muted text)
text-dim:     #4a4a5a   (placeholder/dim text)
```

### Typography

```
font-sans:  'Inter', system-ui, sans-serif
font-mono:  'JetBrains Mono', monospace

Heading XL:   clamp(2.5rem, 5vw, 4rem) / weight 700 / tracking -0.02em
Heading LG:   clamp(1.5rem, 3vw, 2rem) / weight 600 / tracking -0.01em
Heading SM:   1rem / weight 600 / tracking 0.05em / uppercase / text-muted (section labels)
Body:         1rem / weight 400 / line-height 1.7 / text-muted
Mono accent:  font-mono / text-accent / text-sm (used for name badge, labels)
```

### Spacing

- Section padding: `py-32` (128px top/bottom)
- Max content width: `max-w-4xl mx-auto px-6`
- Card padding: `p-6`
- Gap between items: `gap-4` (16px) or `gap-6` (24px)

### Border Radius

- Cards: `rounded-xl` (12px)
- Chips/pills: `rounded-full`
- Buttons: `rounded-lg` (8px)

---

## Animation Specification

### Typewriter (Hero)
- Roles: `["Android Engineer", "Mobile Architect", "Kotlin Developer"]`
- Type speed: 80ms per character
- Delete speed: 40ms per character
- Pause after typed: 1800ms
- Pause after deleted: 400ms
- Blinking cursor: 2px wide, accent color, CSS `blink` keyframe

### Stat Counter Roll-up (Hero)
- Trigger: on page load after 300ms delay
- Duration: 1200ms per counter
- Easing: `easeOut`
- Stagger: 150ms between each stat
- Values: `99.92` (%), `500` (k+), `4` (+yrs), `4.5` (★)

### Scroll Reveal (all sections)
- Implementation: Framer Motion `useInView` + `motion.div`
- Initial: `{ opacity: 0, y: 24 }`
- Animate: `{ opacity: 1, y: 0 }`
- Transition: `{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }`
- `once: true` — never replays
- Child stagger: 0.06s between elements

### Navbar
- Transparent on top, `surface` bg after 60px scroll
- Hides on scroll-down (>60px from top), reappears on scroll-up
- Transition: `translateY(-100%)` / `translateY(0)` — 300ms ease

### Progress Bar
- 1px line at very top of navbar
- Width = scroll percentage of page
- Color: accent
- No transition delay — updates on every scroll event

### Active Nav Link
- IntersectionObserver on each section with `threshold: 0.5`
- Active = accent color + `border-bottom: 1px solid accent`
- Transition: 200ms

### Project Accordion
- Framer Motion `AnimatePresence` + `motion.div` with `height: "auto"`
- Chevron rotates 180° when open — 300ms ease
- First project open by default

### Timeline Dot (current role)
- CSS keyframe: `pulse-ring` — scale 1→1.8, opacity 1→0, 2s infinite
- Muted dot for past roles (no animation)

### Micro-interactions
- Nav logo hover: `rotate(5deg)` + brightness up — 200ms
- Skill chip hover: `translateY(-2px)` + border brightens to accent — 150ms
- Button press: `scale(0.97)` on mousedown — 80ms press, 200ms release
- Smooth scroll: `scroll-behavior: smooth` on `html` + JS override for precise easing

---

## Page Sections (in order)

### 1. Navbar
- Fixed top, full width
- Left: "AV" monogram in JetBrains Mono, accent color
- Right: anchor links [About, Experience, Projects, Skills, Contact]
- CTA: "Contact" styled as accent pill button
- Mobile: hamburger menu → full-screen overlay with same links
- Progress bar as 1px line at absolute top of navbar

### 2. Hero (`#hero`)
- Full viewport height (`min-h-screen`), centered content
- Layout:
  ```
  [mono badge: "abhishek verma"]
  [H1: giant name — "Abhishek Verma"]
  [Typewriter line: "Android Engineer|"]
  [One-liner: bio sentence]
  [CTA row: "View my work" (accent) | "Download CV" (outline) | GitHub icon | LinkedIn icon]
  [Stat strip: 4 metrics with animated counters]
  ```
- Scroll indicator: animated chevron-down at bottom center

### 3. About (`#about`)
- Section label: "// about"
- Two-column on desktop, stacked on mobile
- Left (60%): 3–4 sentence bio pulled from `data/about.ts`
- Right (40%): Two interest cards (MMA, Personal Investing) — each with an icon, title, and the
  original one-line description from the resume

### 4. Experience (`#experience`)
- Section label: "// experience"
- Vertical timeline — left-aligned accent line
- Each item: `TimelineItem` component
  - Year badge (mono font, muted)
  - Company + Role (bold)
  - Pulsing dot for current, static dot for past
  - Impact chips (key metrics as pills)
  - 2–3 bullet points, metric-first (pulled from `data/experience.ts`)

**Experience data:**

```ts
// Digii (formerly CollPoll), Remote — Product Engineer 3, 2023–Present
bullets: [
  "Drove crash-free session rate from 97.4% → 99.92% by resolving memory leaks, race conditions, and lifecycle issues",
  "Built mobile observability platform (Grafana + Loki) — centralised, batched, PII-redacted logs; cut debugging time by 50%",
  "Led Jetpack Compose migration — reduced feature dev time by 20%, improved support for low-end devices",
  "Architected modular Flutter integration within Android ecosystem with full CI/CD workflows",
  "Resolved 45 GB storage accumulation → ~400 MB (99% reduction) via bounded cache + automated cleanup",
  "Shipped UX improvements for 500k+ active users; contributed to 4.5★ Play Store rating",
]
chips: ["99.92% crash-free", "Grafana / Loki", "Jetpack Compose", "CI/CD", "500k users", "Flutter"]

// Dozee, Bangalore — Software Engineer 2, 2021–2023
bullets: [
  "Designed and built ECG Android app from scratch with offline-first sync for unreliable network conditions",
  "Engineered multithreaded Bluetooth communication using Coroutines + MVVM — 99% connection success rate",
  "Reduced mobile data by 2–4 MB per session via optimised REST + Room caching",
  "Fixed rendering bottlenecks in chart components — reduced load time by up to 3s for 1000+ data points",
  "Achieved 70%+ unit and integration test coverage, establishing team baseline",
]
chips: ["ECG app", "Offline-first", "Bluetooth 99%", "70%+ test coverage", "Medical grade"]
```

### 5. Projects (`#projects`)
- Section label: "// projects"
- Accordion list — 3 items
- Collapsed state: project number (mono) + name + tech stack tags + optional badge + chevron
- Expanded state (Framer Motion height animation):
  - 2-column screenshot grid (lazy-loaded `<img>` with placeholder shimmer)
  - Problem → Solution → Impact paragraph (3 sentences max)
  - Links row: GitHub (icon + text) | Play Store (icon + text)
- First project expanded by default
- **Data**: placeholders in `data/projects.ts` — user fills in names, descriptions, screenshots

```ts
// projects.ts — PLACEHOLDER structure, user fills content
export const projects = [
  {
    id: 1,
    name: "Project Name",              // User fills
    tagline: "One-line description",   // User fills
    tech: ["Kotlin", "Jetpack Compose", "Room", "Retrofit"],
    problem: "",     // User fills
    solution: "",    // User fills
    impact: "",      // User fills
    screenshots: [], // User adds to public/projects/project-1/
    github: "#",     // User fills
    playstore: "#",  // User fills
    badge: "Play Store", // or null
  },
  // ... repeat for project 2, 3
]
```

### 6. Skills (`#skills`)
- Section label: "// skills"
- 4 groups in a 2×2 grid (desktop), stacked (mobile)
- No progress bars — grouped chips only
- Groups:

```
Android:      Jetpack Compose, ViewModel, LiveData, Room, WorkManager, Dagger Hilt,
              Coroutines & Flows, Retrofit, OkHttp, Proguard
Architecture: MVVM, Clean Architecture, Offline-First, Modular Design
Cross-platform: Flutter, React Native
Tooling:      Git, GitHub Actions, CI/CD, Grafana, Loki, Firebase (Crashlytics,
              Remote Config, App Distribution), Play Store Publishing
Languages:    Kotlin (primary — visually highlighted), Java, Dart, TypeScript
```

- Kotlin chip: accent border + accent-dim background (visually distinct)
- All other chips: default muted style

### 7. Contact (`#contact`)
- Section label: "// contact"
- Centered, minimal
- Large headline: "Open to full-time roles & interesting problems."
- Sub-line: "Let's talk."
- 4 link buttons in a row:
  - Email → `mailto:` (accent, primary CTA)
  - LinkedIn → placeholder URL (outline)
  - GitHub → placeholder URL (outline)
  - Resume → `/resume.pdf` download (outline)
- No contact form

### 8. Footer
- Minimal single line
- Left: "Built by Abhishek Verma"
- Right: current year (dynamic)
- Center: tiny "Designed & developed with intent."

---

## Data Files

All content lives in `src/data/`. Never hardcode content in components.

```
src/data/
├── about.ts        # bio text, interests
├── experience.ts   # jobs, bullets, chips
├── projects.ts     # project details (mostly placeholder)
└── skills.ts       # skill groups
```

---

## Responsive Breakpoints

- Mobile: `< 768px` — single column, hamburger nav, stacked sections
- Tablet: `768px–1024px` — mostly desktop layout with adjusted spacing
- Desktop: `> 1024px` — full layout as designed

Critical mobile rules:
- Hero text scales down with `clamp()`
- Stat strip wraps to 2×2 grid
- About section stacks vertically
- Experience timeline collapses left padding
- Skills grid goes 1×4
- Contact buttons stack vertically

---

## Performance Rules

- All images: `loading="lazy"` + explicit `width` and `height`
- Fonts: `<link rel="preconnect">` + `font-display: swap`
- No animation on reduced-motion: wrap all Framer Motion with `useReducedMotion()`
- No external dependencies beyond the listed stack
- Target: Lighthouse score ≥ 95 on all metrics

---

## Code Standards

- TypeScript strict mode — no `any`, no `// @ts-ignore`
- Components: functional only, no class components
- Props: typed interfaces, not inline types
- Imports: absolute paths via `@/` alias (configured in vite.config.ts)
- No inline styles — Tailwind classes only
- File naming: PascalCase for components, camelCase for hooks and utils
- Each component in its own file
- Data separated from presentation — no hardcoded strings in JSX

---

## Commands

```bash
npm install          # install dependencies
npm run dev          # dev server at localhost:5173
npm run build        # production build to dist/
npm run preview      # preview production build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
```

---

## What to Build First (suggested order)

1. `package.json` + `vite.config.ts` + `tailwind.config.ts` + `tsconfig.json`
2. `src/styles/globals.css` — font imports, CSS variables, base resets
3. `src/data/` — all data files (placeholders OK for projects)
4. `src/types/index.ts` — shared TypeScript types
5. UI primitives: `ScrollReveal`, `TypewriterText`, `AnimatedCounter`, `SkillChip`
6. `Navbar` + `Footer`
7. Sections in order: Hero → About → Experience → Projects → Skills → Contact
8. `App.tsx` — compose all sections
9. Mobile responsiveness pass
10. Lighthouse audit + fixes

---

## Placeholders (user will fill later)

- `public/resume.pdf` — actual resume file
- `public/projects/project-{1,2,3}/` — screenshot images
- Project names, descriptions, GitHub URLs, Play Store URLs in `src/data/projects.ts`
- GitHub profile URL (currently `#`)
- LinkedIn profile URL (currently `#`)
- Email address in contact section (currently `mailto:hello@abhishekverma.dev`)

---

## Notes

- This is a single-page application. All navigation is anchor-based (`#section-id`).
- No backend, no API calls, no database. Pure static site.
- Deploy target is Vercel. `vercel.json` not needed for static React + Vite.
- The site must work without JavaScript for basic content (progressive enhancement).
- `prefers-reduced-motion` must be respected — wrap all animations.
- No third-party analytics unless user asks.
