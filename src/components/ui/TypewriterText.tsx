import { useTypewriter } from '@/hooks/useTypewriter'

interface TypewriterTextProps {
  words: string[]
}

export function TypewriterText({ words }: TypewriterTextProps) {
  const text = useTypewriter({ words })

  return (
    <span className="font-mono text-text-primary">
      {text}
      <span className="inline-block w-0.5 h-[1.1em] bg-accent align-middle ml-0.5 animate-blink" />
    </span>
  )
}
