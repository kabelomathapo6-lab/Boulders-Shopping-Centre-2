import { CalendarDays, Clock3, MapPin, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Container } from '../components/Container'
import { PageHero } from '../components/PageHero'
import { PrototypeNotice } from '../components/PrototypeNotice'
import { eventCategories, events } from '../data/events'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function WhatsOnPage() {
  useDocumentMeta('What’s On · The Boulders', 'Browse the demonstration events programme for The Boulders Shopping Centre concept redesign.')
  const [category, setCategory] = useState('All')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const filteredEvents = useMemo(() => category === 'All' ? events : events.filter((event) => event.category === category), [category])

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    setEmail('')
  }

  return (
    <>
      <PageHero eyebrow="What’s on · programme concept" title={<>More reasons to<br /><span className="text-brass-600 dark:text-brass-300">come through.</span></>} description="A clearer programme for live music, markets, family activities, wellness, and community events.">
        <div className="rounded-[2rem] bg-ink p-7 text-white shadow-soft dark:bg-brass-400 dark:text-night-950">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass-300 dark:text-night-800">Featured concept</p>
          <h2 className="mt-4 font-display text-2xl font-semibold">{events[0].title}</h2>
          <p className="mt-3 text-sm leading-6 text-stone-300 dark:text-night-800">{events[0].schedule} · {events[0].location}</p>
        </div>
      </PageHero>

      <section className="py-12 sm:py-16">
        <Container>
          <PrototypeNotice>These events demonstrate the design and filtering experience. They are not confirmed centre events or dates.</PrototypeNotice>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter events by category">
            {eventCategories.map((item) => (
              <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`rounded-full px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brass-400 ${category === item ? 'bg-ink text-white dark:bg-brass-400 dark:text-night-950' : 'border border-black/10 bg-white/55 text-graphite hover:border-brass-400 dark:border-white/10 dark:bg-white/5 dark:text-stone-300'}`}>{item}</button>
            ))}
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event, index) => (
              <article key={event.id} className={`group flex min-h-[330px] flex-col overflow-hidden rounded-[2rem] border border-black/10 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 ${index === 0 && category === 'All' ? 'bg-ink text-white dark:bg-brass-400 dark:text-night-950' : 'bg-white/55 dark:bg-white/5'}`}>
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] ${index === 0 && category === 'All' ? 'bg-white/10 text-brass-300 dark:bg-night-950/10 dark:text-night-950' : 'bg-brass-300/15 text-brass-600 dark:text-brass-300'}`}>{event.category}</span>
                  <Sparkles className="h-5 w-5 text-brass-400" />
                </div>
                <h2 className="mt-7 font-display text-2xl font-semibold leading-tight">{event.title}</h2>
                <p className={`mt-4 text-sm leading-7 ${index === 0 && category === 'All' ? 'text-stone-300 dark:text-night-800' : 'text-graphite dark:text-stone-300'}`}>{event.description}</p>
                <div className={`mt-auto space-y-2 border-t pt-5 text-xs ${index === 0 && category === 'All' ? 'border-white/10' : 'border-black/10 dark:border-white/10'}`}>
                  <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-brass-400" />{event.schedule}</p>
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brass-400" />{event.location}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-black/10 bg-bone/55 py-16 dark:border-white/10 dark:bg-night-950/45 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass-600 dark:text-brass-300">Programme reminders</p>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-5xl">Never miss a Saturday.</h2>
            <p className="mt-5 max-w-xl leading-8 text-graphite dark:text-stone-300">This controlled form demonstrates a newsletter interaction. It does not send or store personal information.</p>
          </div>
          <form onSubmit={handleSubmit} className="rounded-3xl border border-black/10 bg-white/60 p-5 shadow-soft dark:border-white/10 dark:bg-white/5">
            <label htmlFor="event-email" className="font-mono text-[10px] uppercase tracking-[0.16em] text-stone-500">Email address</label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input id="event-email" type="email" required value={email} onChange={(event) => { setEmail(event.target.value); setSubmitted(false) }} placeholder="you@example.com" className="h-12 min-w-0 flex-1 rounded-2xl border border-black/10 bg-white px-4 outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-night-800" />
              <button type="submit" className="h-12 rounded-2xl bg-ink px-5 text-sm font-semibold text-white transition hover:bg-brass-600 focus:outline-none focus:ring-2 focus:ring-brass-400 dark:bg-brass-400 dark:text-night-950">Join list</button>
            </div>
            {submitted && <p className="mt-3 flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300"><Clock3 className="h-4 w-4" />Demo submitted successfully. No information was transmitted.</p>}
          </form>
        </Container>
      </section>
    </>
  )
}
