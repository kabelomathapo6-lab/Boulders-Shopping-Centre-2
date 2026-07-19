import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { Container } from './Container'
import { Logo } from './Logo'
import { useTheme } from '../hooks/useTheme'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/directory', label: 'Directory' },
  { to: '/whats-on', label: "What's on" },
  { to: '/visit', label: 'Visit' },
  { to: '/leasing', label: 'Leasing' },
]

const navClass = ({ isActive }) =>
  `rounded-full px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-brass-400 ${
    isActive
      ? 'bg-ink text-white dark:bg-brass-400 dark:text-night-950'
      : 'text-graphite hover:bg-black/5 hover:text-ink dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white'
  }`

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-porcelain/90 backdrop-blur-xl dark:border-white/10 dark:bg-night-900/90">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} className={navClass}>{link.label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/50 text-ink transition hover:border-brass-400 hover:text-brass-600 focus:outline-none focus:ring-2 focus:ring-brass-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/50 text-ink focus:outline-none focus:ring-2 focus:ring-brass-400 dark:border-white/10 dark:bg-white/5 dark:text-white lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>
      {open && (
        <nav className="border-t border-black/10 px-5 py-4 dark:border-white/10 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-2">
            {links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} className={navClass}>{link.label}</NavLink>)}
          </div>
        </nav>
      )}
    </header>
  )
}
