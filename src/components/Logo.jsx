import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label="The Boulders home">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink font-display text-sm font-bold text-brass-300 shadow-glow transition group-hover:-rotate-3 dark:bg-brass-400 dark:text-night-950">
        B
      </span>
      <span>
        <span className="block font-display text-sm font-semibold tracking-tight text-ink dark:text-white">The Boulders</span>
        <span className="block font-mono text-[9px] uppercase tracking-[0.22em] text-stone-500 dark:text-stone-400">Midrand · Gauteng</span>
      </span>
    </Link>
  )
}
