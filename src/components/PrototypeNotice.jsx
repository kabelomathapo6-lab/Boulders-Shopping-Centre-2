import { Info } from 'lucide-react'

export function PrototypeNotice({ children = 'This page uses demonstration content. Confirm operational information with centre management before publication.' }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-brass-400/40 bg-brass-300/10 p-4 text-sm leading-6 text-graphite dark:text-stone-300">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-brass-600 dark:text-brass-300" />
      <p>{children}</p>
    </div>
  )
}
