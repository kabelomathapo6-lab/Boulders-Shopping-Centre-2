export function CityScene() {
  return (
    <div className="relative isolate min-h-[360px] overflow-hidden rounded-[2rem] border border-black/10 bg-gradient-to-b from-amber-100 via-stone-200 to-stone-300 shadow-soft dark:border-white/10 dark:from-slate-800 dark:via-night-800 dark:to-night-950 sm:min-h-[440px]">
      <div className="absolute left-8 top-8 rounded-full border border-black/10 bg-white/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-graphite backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-stone-200">Highveld skyline · 25.99°S</div>
      <div className="absolute right-10 top-16 h-24 w-24 rounded-full bg-brass-300/80 blur-sm dark:bg-brass-400/70" />
      <svg viewBox="0 0 800 500" className="absolute inset-x-0 bottom-0 h-auto w-full" aria-hidden="true">
        <path d="M0 290 95 235 188 274 285 195 388 260 492 205 590 244 690 180 800 230V500H0Z" fill="currentColor" className="text-stone-400/70 dark:text-slate-700" />
        <path d="M0 330 120 275 250 330 375 255 510 318 638 264 800 315V500H0Z" fill="currentColor" className="text-stone-500/60 dark:text-slate-800" />
        <g className="text-ink dark:text-night-950" fill="currentColor">
          <rect x="70" y="250" width="100" height="190" rx="3" />
          <rect x="185" y="210" width="120" height="230" rx="3" />
          <rect x="320" y="280" width="82" height="160" rx="3" />
          <rect x="416" y="235" width="135" height="205" rx="3" />
          <rect x="565" y="195" width="92" height="245" rx="3" />
          <rect x="670" y="270" width="78" height="170" rx="3" />
        </g>
        <g fill="currentColor" className="text-brass-300 dark:text-amber-300">
          {Array.from({ length: 29 }).map((_, index) => {
            const x = 88 + (index % 7) * 84
            const y = 275 + Math.floor(index / 7) * 40
            return <rect key={index} x={x} y={y} width="16" height="10" rx="2" opacity={index % 3 === 0 ? 1 : 0.55} />
          })}
        </g>
        <path d="M0 440H800V500H0Z" fill="currentColor" className="text-brass-500 dark:text-brass-600" />
        <path d="M0 456H800" stroke="currentColor" strokeWidth="3" strokeDasharray="18 18" className="text-white/70" />
      </svg>
      <div className="absolute bottom-10 left-8 right-8 grid grid-cols-3 gap-2 rounded-2xl border border-white/30 bg-white/70 p-3 shadow-lg backdrop-blur dark:border-white/10 dark:bg-night-900/75">
        {['SHOP', 'EAT', 'MEET'].map((label, index) => (
          <div key={label} className={`rounded-xl p-3 text-center font-mono text-[10px] tracking-[0.16em] ${index === 1 ? 'bg-ink text-white dark:bg-brass-400 dark:text-night-950' : 'bg-black/5 text-ink dark:bg-white/5 dark:text-white'}`}>{label}</div>
        ))}
      </div>
    </div>
  )
}
