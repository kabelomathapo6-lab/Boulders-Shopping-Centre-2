import { Clock3, MapPin } from 'lucide-react'
import { Container } from './Container'
import { useSastTime } from '../hooks/useSastTime'

const getCentreStatus = (dayIndex, minutes) => {
  const hours = dayIndex === 0 ? [9 * 60, 16 * 60] : dayIndex === 6 ? [9 * 60, 17 * 60] : [9 * 60, 19 * 60]
  return {
    open: minutes >= hours[0] && minutes < hours[1],
    closing: `${String(Math.floor(hours[1] / 60)).padStart(2, '0')}:00`,
  }
}

export function StatusBar() {
  const { time, minutes, dayIndex } = useSastTime()
  const status = getCentreStatus(dayIndex, minutes)

  return (
    <div className="border-b border-black/10 bg-ink text-white dark:border-white/10 dark:bg-night-950">
      <Container className="flex min-h-9 items-center justify-between gap-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] sm:text-[11px]">
        <div className="flex min-w-0 items-center gap-2">
          <span className={`h-2 w-2 shrink-0 rounded-full ${status.open ? 'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]' : 'bg-amber-400'}`} />
          <span className="truncate">{status.open ? `Open now · closes ${status.closing}` : 'Closed now · opens 09:00'}</span>
        </div>
        <div className="hidden items-center gap-5 text-stone-300 sm:flex">
          <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />Old Pretoria Road</span>
          <span className="inline-flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" />{time} SAST</span>
        </div>
      </Container>
    </div>
  )
}
