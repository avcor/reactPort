import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'page-bg':      'rgb(var(--page-bg) / <alpha-value>)',
        surface:        'rgb(var(--surface) / <alpha-value>)',
        'surface-2':    'rgb(var(--surface-2) / <alpha-value>)',
        border:         'rgb(var(--border-rgb) / 0.08)',
        'border-hover': 'rgb(var(--border-rgb) / 0.16)',
        accent:         'rgb(var(--accent) / <alpha-value>)',
        'accent-dim':   'rgb(var(--accent-dim) / <alpha-value>)',
        'text-primary': 'rgb(var(--text-primary) / <alpha-value>)',
        'text-muted':   'rgb(var(--text-muted) / <alpha-value>)',
        'text-dim':     'rgb(var(--text-dim) / <alpha-value>)',
      },
      fontFamily: {
        sans:  ['Outfit', 'system-ui', 'sans-serif'],
        serif: ['nyghtSerif', 'Georgia', 'serif'],
        mono:  ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'pulse-ring': {
          '0%':   { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        'spin-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        blink:        'blink 1s step-end infinite',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
        'spin-slow':  'spin-slow 18s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
