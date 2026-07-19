import { Container } from './Container'

export function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="relative overflow-hidden border-b border-black/10 py-16 dark:border-white/10 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(199,154,72,.2),transparent_34%),radial-gradient(circle_at_85%_75%,rgba(169,120,47,.12),transparent_34%)]" />
      <Container className="relative grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass-600 dark:text-brass-300">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite dark:text-stone-300">{description}</p>
        </div>
        {children && <div>{children}</div>}
      </Container>
    </section>
  )
}
