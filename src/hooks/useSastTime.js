import { useEffect, useMemo, useState } from 'react'

const weekdayMap = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

export function useSastTime() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  return useMemo(() => {
    const timeParts = new Intl.DateTimeFormat('en-ZA', {
      timeZone: 'Africa/Johannesburg',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(now)
    const weekday = new Intl.DateTimeFormat('en-ZA', {
      timeZone: 'Africa/Johannesburg',
      weekday: 'short',
    }).format(now)
    const hour = Number(timeParts.find((part) => part.type === 'hour')?.value ?? 0)
    const minute = Number(timeParts.find((part) => part.type === 'minute')?.value ?? 0)

    return {
      time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      minutes: hour * 60 + minute,
      weekday,
      dayIndex: weekdayMap[weekday] ?? 1,
    }
  }, [now])
}
