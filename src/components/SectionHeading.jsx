export function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''
  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow && <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass-600 dark:text-brass-300">{eyebrow}</p>}
      <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {description && <p className="mt-5 text-base leading-8 text-graphite dark:text-stone-300 sm:text-lg">{description}</p>}
    </div>
  )
}
