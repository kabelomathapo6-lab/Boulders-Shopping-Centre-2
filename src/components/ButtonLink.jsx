import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const styles = {
  primary: 'bg-ink text-white hover:bg-brass-600 dark:bg-brass-400 dark:text-night-950 dark:hover:bg-brass-300',
  secondary: 'border border-black/15 bg-white/40 text-ink hover:border-brass-400 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-brass-400 dark:hover:bg-white/10',
}

export function ButtonLink({ to, children, variant = 'primary', className = '' }) {
  return (
    <Link to={to} className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brass-400 focus:ring-offset-2 dark:focus:ring-offset-night-900 ${styles[variant]} ${className}`}>
      {children}<ArrowRight className="h-4 w-4" />
    </Link>
  )
}
