import { Accessibility, Bus, Car, Clock3, ExternalLink, MapPin, ShieldCheck } from 'lucide-react'
import { ButtonLink } from '../components/ButtonLink'
import { Container } from '../components/Container'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useSastTime } from '../hooks/useSastTime'

const tradingHours = [
  ['Monday–Friday', '09:00–19:00'],
  ['Saturday', '09:00–17:00'],
  ['Sunday & public holidays', '09:00–16:00'],
]

const visitCards = [
  { icon: Car, title: 'Arrive by car', text: 'Use Old Pretoria Road for the main approach. This concept places parking and entrance guidance before promotional content.' },
  { icon: Bus, title: 'Public transport', text: 'Confirm current taxi, bus, and Gautrain connection details with the relevant transport operators before travelling.' },
  { icon: Accessibility, title: 'Accessible visit', text: 'The proposed experience surfaces step-free access, accessible parking, and assistance information in one easy-to-find place.' },
  { icon: ShieldCheck, title: 'Visitor support', text: 'Security, lost property, and centre-management contact details should be confirmed and published by the real centre team.' },
]

export function VisitPage() {
  useDocumentMeta('Plan Your Visit · The Boulders', 'Plan a visit to The Boulders Shopping Centre concept: view hours, location, parking, and accessibility information.')
  const { time, minutes, dayIndex } = useSastTime()
  const close = dayIndex === 0 ? 16 * 60 : dayIndex === 6 ? 17 * 60 : 19 * 60
  const isOpen = minutes >= 9 * 60 && minutes < close

  return (
    <>
      <PageHero eyebrow="Visit · practical information" title={<>Come<br /><span className="text-brass-600 dark:text-brass-300">through.</span></>} description="The information a shopper needs before leaving home, placed in one clear, mobile-friendly page.">
        <div className="rounded-[2rem] border border-black/10 bg-white/60 p-7 shadow-soft backdrop-blur dark:border-white/10 dark:bg-white/5">
          <div className="flex items-center gap-3"><span className={`h-3 w-3 rounded-full ${isOpen ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,.6)]' : 'bg-amber-500'}`} /><span className="font-mono text-xs uppercase tracking-[0.15em]">{isOpen ? 'Centre open now' : 'Centre closed now'}</span></div>
          <p className="mt-4 font-display text-4xl font-semibold">{time}</p>
          <p className="mt-2 text-sm text-stone-500">South African Standard Time</p>
        </div>
      </PageHero>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div className="rounded-[2rem] bg-ink p-8 text-white shadow-soft dark:bg-night-950 sm:p-10">
            <Clock3 className="h-7 w-7 text-brass-300" />
            <h2 className="mt-7 font-display text-3xl font-semibold">Trading hours</h2>
            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {tradingHours.map(([day, hours]) => <div key={day} className="flex items-center justify-between gap-5 py-5"><span className="text-sm text-stone-300">{day}</span><strong className="font-mono text-xs tracking-[0.08em]">{hours}</strong></div>)}
            </div>
            <p className="mt-6 text-xs leading-6 text-stone-400">Individual tenants may trade different hours. Confirm holiday and store-specific hours before travelling.</p>
          </div>
          <div className="rounded-[2rem] border border-black/10 bg-white/55 p-8 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-10">
            <MapPin className="h-7 w-7 text-brass-600 dark:text-brass-300" />
            <h2 className="mt-7 font-display text-3xl font-semibold">Old Pretoria Road, Midrand</h2>
            <p className="mt-5 max-w-xl leading-8 text-graphite dark:text-stone-300">The redesigned visit page gives the address, opening status, and travel guidance a clear hierarchy rather than burying it inside general centre content.</p>
            <a href="https://www.google.com/maps/search/?api=1&query=The+Boulders+Shopping+Centre+Midrand" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brass-600 dark:bg-brass-400 dark:text-night-950">Open in Google Maps <ExternalLink className="h-4 w-4" /></a>
            <div className="mt-9 overflow-hidden rounded-3xl border border-black/10 bg-gradient-to-br from-brass-300/35 to-bone p-7 dark:border-white/10 dark:from-brass-600/20 dark:to-night-800">
              <div className="grid h-56 place-items-center rounded-2xl border border-dashed border-black/20 dark:border-white/20">
                <div className="text-center"><MapPin className="mx-auto h-8 w-8 text-brass-600 dark:text-brass-300" /><p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em]">Map integration area</p><p className="mt-2 text-xs text-stone-500">External map link works without an API key.</p></div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-black/10 bg-bone/55 py-16 dark:border-white/10 dark:bg-night-950/45 sm:py-20">
        <Container>
          <SectionHeading eyebrow="Before you arrive" title="A smoother visit starts with useful information." description="These sections show how the centre could present arrival and accessibility guidance. Operational detail still requires client confirmation." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {visitCards.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-3xl border border-black/10 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5"><Icon className="h-6 w-6 text-brass-600 dark:text-brass-300" /><h3 className="mt-5 font-display text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-graphite dark:text-stone-400">{text}</p></article>)}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col items-start justify-between gap-7 rounded-[2rem] bg-ink p-8 text-white dark:bg-brass-400 dark:text-night-950 sm:p-10 lg:flex-row lg:items-center">
          <div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass-300 dark:text-night-800">Know the tenant</p><h2 className="mt-3 font-display text-3xl font-semibold">Find the store before the trip.</h2></div>
          <ButtonLink to="/directory" variant="secondary" className="border-white/20 bg-white/10 text-white dark:border-night-950/20 dark:bg-night-950 dark:text-white">Open directory</ButtonLink>
        </Container>
      </section>
    </>
  )
}
