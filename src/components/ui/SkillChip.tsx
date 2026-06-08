interface SkillChipProps {
  label: string
  highlighted?: boolean
}

export function SkillChip({ label, highlighted = false }: SkillChipProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-mono
        border transition-all duration-150 cursor-default
        hover:-translate-y-0.5
        ${
          highlighted
            ? 'border-accent bg-accent-dim text-accent'
            : 'border-border text-text-muted hover:border-accent hover:text-text-primary bg-surface'
        }
      `}
    >
      {label}
    </span>
  )
}
