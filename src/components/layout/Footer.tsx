export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-6 px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-text-dim text-sm">
        <span>Built by Abhishek Verma</span>
        <span className="font-mono text-xs">Designed &amp; developed with intent.</span>
        <span>{year}</span>
      </div>
    </footer>
  )
}
