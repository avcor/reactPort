import type { ExperienceItem } from '@/types'

export const experience: ExperienceItem[] = [
  {
    id: 1,
    company: 'Digii (formerly CollPoll)',
    role: 'Product Engineer 3',
    period: '2023 – Present',
    location: 'Remote',
    current: true,
    bullets: [
      'Drove crash-free session rate from 97.4% → 99.92% by resolving memory leaks, race conditions, and lifecycle issues',
      'Built mobile observability platform (Grafana + Loki) — centralised, batched, PII-redacted logs; cut debugging time by 50%',
      'Led Jetpack Compose migration — reduced feature dev time by 20%, improved support for low-end devices',
      'Architected modular Flutter integration within Android ecosystem with full CI/CD workflows',
      'Resolved 45 GB storage accumulation → ~400 MB (99% reduction) via bounded cache + automated cleanup',
      'Shipped UX improvements for 500k+ active users; contributed to 4.5★ Play Store rating',
    ],
    chips: ['99.92% crash-free', 'Grafana / Loki', 'Jetpack Compose', 'CI/CD', '500k users', 'Flutter'],
  },
  {
    id: 2,
    company: 'Dozee',
    role: 'Software Engineer 2',
    period: '2021 – 2023',
    location: 'Bangalore',
    current: false,
    bullets: [
      'Designed and built ECG Android app from scratch with offline-first sync for unreliable network conditions',
      'Engineered multithreaded Bluetooth communication using Coroutines + MVVM — 99% connection success rate',
      'Reduced mobile data by 2–4 MB per session via optimised REST + Room caching',
      'Fixed rendering bottlenecks in chart components — reduced load time by up to 3s for 1000+ data points',
      'Achieved 70%+ unit and integration test coverage, establishing team baseline',
    ],
    chips: ['ECG app', 'Offline-first', 'Bluetooth 99%', '70%+ test coverage', 'Medical grade'],
  },
]
