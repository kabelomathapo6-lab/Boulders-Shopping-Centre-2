import { Clock3, MapPin, Search, SlidersHorizontal, Store } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Container } from '../components/Container'
import { PageHero } from '../components/PageHero'
import { PrototypeNotice } from '../components/PrototypeNotice'
import { tenantCategories, tenants } from '../data/tenants'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useSastTime } from '../hooks/useSastTime'

const timeToMinutes = (value) => {
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}

const isTenantOpen = (tenant, minutes) => minutes >= timeToMinutes(tenant.open) && minutes < timeToMinutes(tenant.close)

export function DirectoryPage() {
  useDocumentMeta('Store Directory · The Boulders', 'Search and filter the concept store directory for The Boulders Shopping Centre redesign.')
  const { minutes, time } = useSastTime()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [floor, setFloor] = useState('All')
  const [openOnly, setOpenOnly] = useState(false)
  const [sort, setSort] = useState('name')

  const filteredTenants = useMemo(() => {
    const query = search.trim().toLowerCase()
    const list = tenants.filter((tenant) => {
      const matchesSearch = !query || [tenant.name, tenant.category, tenant.unit].some((value) => value.toLowerCase().includes(query))
      const matchesCategory = category === 'All' || tenant.category === category
      const matchesFloor = floor === 'All' || tenant.floor === floor
      const matchesOpen = !openOnly || isTenantOpen(tenant, minutes)
      return matchesSearch && matchesCategory && matchesFloor && matchesOpen
    })

    return [...list].sort((a, b) => {
      if (sort === 'category') return a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
      if (sort === 'floor') return a.floor.localeCompare(b.floor) || a.name.localeCompare(b.name)
      return a.name.localeCompare(b.name)
    })
  }, [category, floor, minutes, openOnly, search, sort])

  const resetFilters = () => {
    setSearch('')
    setCategory('All')
    setFloor('All')
    setOpenOnly(false)
    setSort('name')
  }

  return (
    <>
      <PageHero eyebrow="Directory · concept data" title={<>Every store,<br /><span className="text-brass-600 dark:text-brass-300">sorted.</span></>} description="Find a brand quickly instead of scrolling through one long static list. Search by name, category, level, unit, or open status.">
        <div className="grid grid-cols-3 divide-x divide-black/10 rounded-3xl border border-black/10 bg-white/55 p-5 text-center shadow-soft backdrop-blur dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
          <div><strong className="block font-display text-2xl">{tenants.length}</strong><span className="text-xs text-stone-500">Tenants</span></div>
          <div><strong className="block font-display text-2xl">{tenantCategories.length}</strong><span className="text-xs text-stone-500">Categories</span></div>
          <div><strong className="block font-display text-2xl">2</strong><span className="text-xs text-stone-500">Levels</span></div>
        </div>
      </PageHero>

      <section className="py-10 sm:py-14">
        <Container>
          <PrototypeNotice>The tenant names, units, and hours are demonstration data used to show the directory functionality. Confirm the live tenant list with centre management.</PrototypeNotice>

          <div className="sticky top-28 z-30 mt-8 rounded-3xl border border-black/10 bg-porcelain/95 p-4 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-night-900/95 sm:p-5">
            <div className="grid gap-3 lg:grid-cols-[1.8fr_1fr_1fr_1fr_auto]">
              <label className="relative">
                <span className="sr-only">Search tenants</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-500" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search store, category, or unit" className="h-12 w-full rounded-2xl border border-black/10 bg-white/70 pl-12 pr-4 text-sm outline-none transition focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-white/5" />
              </label>
              <label>
                <span className="sr-only">Category</span>
                <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-12 w-full rounded-2xl border border-black/10 bg-white/70 px-4 text-sm outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-night-800">
                  <option value="All">All categories</option>
                  {tenantCategories.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
              <label>
                <span className="sr-only">Floor</span>
                <select value={floor} onChange={(event) => setFloor(event.target.value)} className="h-12 w-full rounded-2xl border border-black/10 bg-white/70 px-4 text-sm outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-night-800">
                  <option value="All">All levels</option>
                  <option value="GF">Ground floor</option>
                  <option value="L1">Level 1</option>
                </select>
              </label>
              <label>
                <span className="sr-only">Sort directory</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-12 w-full rounded-2xl border border-black/10 bg-white/70 px-4 text-sm outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-night-800">
                  <option value="name">Sort: A–Z</option>
                  <option value="category">Sort: category</option>
                  <option value="floor">Sort: level</option>
                </select>
              </label>
              <button type="button" onClick={() => setOpenOnly((current) => !current)} aria-pressed={openOnly} className={`h-12 rounded-2xl px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brass-400 ${openOnly ? 'bg-ink text-white dark:bg-brass-400 dark:text-night-950' : 'border border-black/10 bg-white/70 text-ink dark:border-white/10 dark:bg-white/5 dark:text-white'}`}>Open now</button>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-4 text-sm dark:border-white/10">
              <span className="inline-flex items-center gap-2 text-graphite dark:text-stone-300"><SlidersHorizontal className="h-4 w-4" />Showing <strong>{filteredTenants.length}</strong> of {tenants.length} · {time} SAST</span>
              <button type="button" onClick={resetFilters} className="font-semibold text-brass-600 hover:underline dark:text-brass-300">Reset filters</button>
            </div>
          </div>

          {filteredTenants.length === 0 ? (
            <div className="mt-10 rounded-3xl border border-dashed border-black/20 py-20 text-center dark:border-white/20">
              <Store className="mx-auto h-10 w-10 text-stone-400" />
              <h2 className="mt-4 font-display text-2xl font-semibold">Nothing matches that search.</h2>
              <p className="mt-2 text-graphite dark:text-stone-400">Try another name or reset the filters.</p>
              <button type="button" onClick={resetFilters} className="mt-5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white dark:bg-brass-400 dark:text-night-950">Reset filters</button>
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-4 md:hidden">
                {filteredTenants.map((tenant) => {
                  const open = isTenantOpen(tenant, minutes)
                  return (
                    <article key={`${tenant.name}-${tenant.unit}`} className="rounded-3xl border border-black/10 bg-white/55 p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-ink font-display text-xs font-semibold text-brass-300 dark:bg-brass-400 dark:text-night-950">{tenant.name.slice(0, 2).toUpperCase()}</span>
                          <div><h2 className="font-display text-base font-semibold">{tenant.name}</h2><p className="mt-1 text-xs text-stone-500">{tenant.category}</p></div>
                        </div>
                        <span className={`rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] ${open ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-stone-500/10 text-stone-500'}`}>{open ? 'Open' : 'Closed'}</span>
                      </div>
                      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-black/10 pt-4 text-xs dark:border-white/10">
                        <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-brass-600" />{tenant.floor} · {tenant.unit}</span>
                        <span className="inline-flex items-center justify-end gap-2"><Clock3 className="h-4 w-4 text-brass-600" />{tenant.open}–{tenant.close}</span>
                      </div>
                    </article>
                  )
                })}
              </div>

              <div className="mt-8 hidden overflow-hidden rounded-3xl border border-black/10 bg-white/45 shadow-sm dark:border-white/10 dark:bg-white/5 md:block">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-ink text-white dark:bg-night-950">
                    <tr className="font-mono text-[10px] uppercase tracking-[0.15em]">
                      <th className="px-6 py-4 font-medium">Store</th><th className="px-6 py-4 font-medium">Category</th><th className="px-6 py-4 font-medium">Location</th><th className="px-6 py-4 font-medium">Hours</th><th className="px-6 py-4 text-right font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10 dark:divide-white/10">
                    {filteredTenants.map((tenant) => {
                      const open = isTenantOpen(tenant, minutes)
                      return (
                        <tr key={`${tenant.name}-${tenant.unit}`} className="transition hover:bg-brass-300/10">
                          <td className="px-6 py-4 font-semibold">{tenant.name}</td>
                          <td className="px-6 py-4 text-sm text-graphite dark:text-stone-300">{tenant.category}</td>
                          <td className="px-6 py-4 font-mono text-xs">{tenant.floor} · {tenant.unit}</td>
                          <td className="px-6 py-4 font-mono text-xs">{tenant.open}–{tenant.close}</td>
                          <td className="px-6 py-4 text-right"><span className={`rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.12em] ${open ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-stone-500/10 text-stone-500'}`}>{open ? 'Open' : 'Closed'}</span></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </Container>
      </section>
    </>
  )
}
