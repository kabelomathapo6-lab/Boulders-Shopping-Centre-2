import { Building2, CheckCircle2, Filter, Ruler, Send } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Container } from '../components/Container'
import { PageHero } from '../components/PageHero'
import { PrototypeNotice } from '../components/PrototypeNotice'
import { SectionHeading } from '../components/SectionHeading'
import { leasingUnits, leasingUses } from '../data/leasing'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const initialForm = { name: '', email: '', company: '', unit: '', message: '' }

export function LeasingPage() {
  useDocumentMeta('Leasing · The Boulders', 'Explore concept leasing units and the enquiry experience for The Boulders Shopping Centre redesign.')
  const [useType, setUseType] = useState('All')
  const [size, setSize] = useState('All')
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const filteredUnits = useMemo(() => leasingUnits.filter((unit) => {
    const matchesUse = useType === 'All' || unit.use === useType
    const matchesSize = size === 'All' || (size === 'small' && unit.size < 80) || (size === 'medium' && unit.size >= 80 && unit.size <= 180) || (size === 'large' && unit.size > 180)
    return matchesUse && matchesSize
  }), [size, useType])

  const updateField = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setSubmitted(false)
  }

  const chooseUnit = (unitId) => {
    setForm((current) => ({ ...current, unit: unitId }))
    document.getElementById('leasing-enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
    setForm(initialForm)
  }

  return (
    <>
      <PageHero eyebrow="Leasing · demonstration experience" title={<>Make your next<br /><span className="text-brass-600 dark:text-brass-300">move visible.</span></>} description="A professional leasing flow that lets a prospective tenant understand the opportunity, filter units, and submit a clear enquiry.">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-ink p-6 text-white dark:bg-brass-400 dark:text-night-950"><strong className="font-display text-3xl">{leasingUnits.length}</strong><span className="mt-2 block text-xs">Concept units</span></div>
          <div className="rounded-3xl border border-black/10 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5"><strong className="font-display text-3xl">4</strong><span className="mt-2 block text-xs text-stone-500">Use types</span></div>
        </div>
      </PageHero>

      <section className="py-14 sm:py-20">
        <Container>
          <PrototypeNotice>All units, sizes, availability, and leasing details on this page are concept data. They must not be treated as a real leasing schedule.</PrototypeNotice>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ['A clear opportunity', 'Lead with the tenant mix, location, access, and verified performance information instead of unsupported marketing claims.'],
              ['Useful unit discovery', 'Let prospective tenants filter by size and intended use before making contact.'],
              ['A better handover', 'Collect enough context in the enquiry so the leasing team can respond with the right information.'],
            ].map(([title, text], index) => <article key={title} className="rounded-3xl border border-black/10 bg-white/55 p-7 dark:border-white/10 dark:bg-white/5"><span className="font-mono text-xs text-brass-600 dark:text-brass-300">0{index + 1}</span><h2 className="mt-5 font-display text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-7 text-graphite dark:text-stone-400">{text}</p></article>)}
          </div>
        </Container>
      </section>

      <section className="border-y border-black/10 bg-bone/55 py-16 dark:border-white/10 dark:bg-night-950/45 sm:py-20">
        <Container>
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Concept units" title="Filter the opportunity." description="The unit list is generated from data, so counts and results stay consistent as filters change." />
            <div className="grid gap-3 sm:grid-cols-2 lg:w-[430px]">
              <label><span className="sr-only">Filter by use</span><select value={useType} onChange={(event) => setUseType(event.target.value)} className="h-12 w-full rounded-2xl border border-black/10 bg-white/80 px-4 text-sm outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-night-800">{leasingUses.map((item) => <option key={item} value={item}>{item === 'All' ? 'All use types' : item}</option>)}</select></label>
              <label><span className="sr-only">Filter by size</span><select value={size} onChange={(event) => setSize(event.target.value)} className="h-12 w-full rounded-2xl border border-black/10 bg-white/80 px-4 text-sm outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-night-800"><option value="All">All sizes</option><option value="small">Under 80 m²</option><option value="medium">80–180 m²</option><option value="large">Over 180 m²</option></select></label>
            </div>
          </div>
          <p className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500"><Filter className="h-4 w-4" />Showing {filteredUnits.length} of {leasingUnits.length} concept units</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {filteredUnits.map((unit) => (
              <article key={unit.id} className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                <div className="flex items-start justify-between gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-brass-300 dark:bg-brass-400 dark:text-night-950"><Building2 className="h-5 w-5" /></span><span className="rounded-full bg-brass-300/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-brass-600 dark:text-brass-300">{unit.use}</span></div>
                <h2 className="mt-6 font-display text-2xl font-semibold">Unit {unit.id}</h2>
                <p className="mt-2 text-sm text-stone-500">{unit.level} · {unit.wing}</p>
                <p className="mt-5 flex items-center gap-2 font-mono text-xs"><Ruler className="h-4 w-4 text-brass-600" />{unit.size} m²</p>
                <button type="button" onClick={() => chooseUnit(unit.id)} className="mt-6 w-full rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:bg-brass-600 focus:outline-none focus:ring-2 focus:ring-brass-400 dark:bg-brass-400 dark:text-night-950">Enquire about unit</button>
              </article>
            ))}
          </div>
          {filteredUnits.length === 0 && <div className="mt-8 rounded-3xl border border-dashed border-black/20 py-16 text-center dark:border-white/20"><p className="font-display text-xl font-semibold">No concept units match those filters.</p><button type="button" onClick={() => { setUseType('All'); setSize('All') }} className="mt-4 text-sm font-semibold text-brass-600 hover:underline dark:text-brass-300">Clear filters</button></div>}
        </Container>
      </section>

      <section id="leasing-enquiry" className="scroll-mt-32 py-16 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="Enquiry" title="Start with the right context." description="This local demonstration form validates required fields and confirms submission without sending personal data to a server." />
            <div className="mt-8 space-y-4 text-sm leading-7 text-graphite dark:text-stone-300">
              <p className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brass-600 dark:text-brass-300" />Choose a concept unit or leave the field open for general interest.</p>
              <p className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brass-600 dark:text-brass-300" />Explain the brand, space requirement, and preferred timing.</p>
              <p className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-brass-600 dark:text-brass-300" />A production version would connect securely to the client’s CRM or email workflow.</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-black/10 bg-white/60 p-6 shadow-soft dark:border-white/10 dark:bg-white/5 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-medium">Full name<input required name="name" value={form.name} onChange={updateField} className="mt-2 h-12 w-full rounded-2xl border border-black/10 bg-white px-4 outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-night-800" /></label>
              <label className="text-sm font-medium">Work email<input required type="email" name="email" value={form.email} onChange={updateField} className="mt-2 h-12 w-full rounded-2xl border border-black/10 bg-white px-4 outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-night-800" /></label>
              <label className="text-sm font-medium">Company or brand<input required name="company" value={form.company} onChange={updateField} className="mt-2 h-12 w-full rounded-2xl border border-black/10 bg-white px-4 outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-night-800" /></label>
              <label className="text-sm font-medium">Concept unit<select name="unit" value={form.unit} onChange={updateField} className="mt-2 h-12 w-full rounded-2xl border border-black/10 bg-white px-4 outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-night-800"><option value="">General enquiry</option>{leasingUnits.map((unit) => <option key={unit.id} value={unit.id}>Unit {unit.id} · {unit.size} m²</option>)}</select></label>
            </div>
            <label className="mt-5 block text-sm font-medium">Tell us what you need<textarea required name="message" value={form.message} onChange={updateField} rows="5" className="mt-2 w-full rounded-2xl border border-black/10 bg-white p-4 outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-night-800" /></label>
            <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-brass-600 focus:outline-none focus:ring-2 focus:ring-brass-400 dark:bg-brass-400 dark:text-night-950">Submit demo enquiry <Send className="h-4 w-4" /></button>
            {submitted && <p className="mt-4 flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="h-5 w-5" />Demo enquiry completed. No information was transmitted.</p>}
          </form>
        </Container>
      </section>
    </>
  )
}
