import { ExternalLink, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from './Container'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-bone/60 py-12 dark:border-white/10 dark:bg-night-950">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-md text-sm leading-7 text-graphite dark:text-stone-400">
              An unofficial student redesign created for Melsoft Academy. Operational information in this prototype must be verified before real-world publication.
            </p>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-brass-600 dark:text-brass-300">Explore</h2>
            <div className="mt-4 grid gap-3 text-sm text-graphite dark:text-stone-300">
              <Link className="hover:text-brass-600" to="/directory">Store directory</Link>
              <Link className="hover:text-brass-600" to="/whats-on">What’s on</Link>
              <Link className="hover:text-brass-600" to="/visit">Plan your visit</Link>
              <Link className="hover:text-brass-600" to="/leasing">Leasing</Link>
            </div>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-brass-600 dark:text-brass-300">Location</h2>
            <p className="mt-4 flex gap-2 text-sm leading-6 text-graphite dark:text-stone-300"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />Old Pretoria Road, Midrand, Gauteng</p>
            <a className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brass-600 dark:text-white" href="https://boulders.co.za/" target="_blank" rel="noreferrer">Official website <ExternalLink className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-black/10 pt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-stone-500 dark:border-white/10 dark:text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Kabelo Mathapo · Student concept</span>
          <span>React · Tailwind CSS · Vite</span>
        </div>
      </Container>
    </footer>
  )
}
