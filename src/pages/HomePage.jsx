import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import homeCss from '../legacy/original-home.css?raw'
import homeMarkup from '../legacy/original-home-body.html?raw'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useSastTime } from '../hooks/useSastTime'

const HOME_STYLE_ID = 'boulders-original-home-styles'

const routeBindings = [
  ['nav.top .nav-links a:nth-child(1)', '/whats-on'],
  ['nav.top .nav-links a:nth-child(2)', '/directory'],
  ['nav.top .nav-links a:nth-child(3)', '/whats-on'],
  ['nav.top .nav-links a:nth-child(4)', '/visit'],
  ['nav.top .nav-cta', '/leasing'],
  ['.hero-actions .btn-primary', '/directory'],
  ['.hero-actions .btn-ghost', '/whats-on'],
  ['.visit .btn-primary', '/visit'],
]

const preservationFixes = `
:root {
  --display: 'Unbounded', system-ui, sans-serif;
  --body: 'Inter', system-ui, sans-serif;
  --mono: 'JetBrains Mono', ui-monospace, monospace;
  --max: 1440px;
  --gutter: 32px;
}
.original-home-root [data-react-route],
.original-home-root .dir-more,
.original-home-root .exp-link {
  cursor: pointer;
}
.original-home-root .dir-more:focus-visible,
.original-home-root .exp-link:focus-visible {
  outline: 2px solid var(--brass);
  outline-offset: 5px;
}
@media (max-width: 720px) {
  :root { --gutter: 20px; }
}
`

function bindRoute(element, route) {
  if (!element) return
  element.dataset.reactRoute = route
  if (element.tagName === 'A') element.setAttribute('href', route)
  if (element.tagName !== 'A') {
    element.setAttribute('role', 'link')
    element.setAttribute('tabindex', '0')
  }
}

export function HomePage() {
  const rootRef = useRef(null)
  const navigate = useNavigate()
  const { time, minutes } = useSastTime()
  const [activeCategory, setActiveCategory] = useState('All')
  const [notice, setNotice] = useState('')
  const [scene, setScene] = useState(() => {
    if (typeof window === 'undefined') return 'day'
    const saved = window.localStorage.getItem('boulders-home-scene')
    if (saved === 'day' || saved === 'night') return saved
    const hour = new Date().toLocaleTimeString('en-GB', {
      timeZone: 'Africa/Johannesburg',
      hour: '2-digit',
      hour12: false,
    })
    const numericHour = Number.parseInt(hour, 10)
    return numericHour < 6 || numericHour >= 19 ? 'night' : 'day'
  })

  useDocumentMeta(
    'The Boulders — Midrand, in motion',
    "Boulders Shopping Centre, Midrand's founding retail destination since 1997. Over a hundred stores, live events, and a new atmosphere.",
  )

  useLayoutEffect(() => {
    const existing = document.getElementById(HOME_STYLE_ID)
    if (existing) existing.remove()

    const style = document.createElement('style')
    style.id = HOME_STYLE_ID
    style.textContent = `${homeCss}\n${preservationFixes}`
    document.head.appendChild(style)

    return () => {
      style.remove()
      document.body.removeAttribute('data-scene')
    }
  }, [])

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    routeBindings.forEach(([selector, route]) => bindRoute(root.querySelector(selector), route))

    bindRoute(root.querySelector('.dir-more'), '/directory')
    root.querySelectorAll('.exp-link').forEach((element) => bindRoute(element, '/whats-on'))

    const footerRoutes = new Map([
      ['Directions', '/visit'],
      ['Trading hours', '/visit'],
      ['Parking', '/visit'],
      ['Accessibility', '/visit'],
      ['Leasing enquiries', '/leasing'],
      ['Marketing partnerships', '/leasing'],
      ['Tenant portal', '/leasing'],
      ['Media kit', '/leasing'],
    ])

    root.querySelectorAll('footer a').forEach((link) => {
      const route = footerRoutes.get(link.textContent.trim())
      if (route) bindRoute(link, route)
    })

    const handleClick = (event) => {
      const target = event.target instanceof Element ? event.target : null
      if (!target) return

      const sceneButton = target.closest('.scene-toggle button')
      if (sceneButton && root.contains(sceneButton)) {
        setScene(sceneButton.dataset.mode === 'night' ? 'night' : 'day')
        return
      }

      const chip = target.closest('.chip')
      if (chip && root.contains(chip)) {
        setActiveCategory(chip.textContent.trim())
        return
      }

      const routeTarget = target.closest('[data-react-route]')
      if (routeTarget && root.contains(routeTarget)) {
        event.preventDefault()
        navigate(routeTarget.dataset.reactRoute)
        return
      }

      const placeholderLink = target.closest('a[href="#"]')
      if (placeholderLink && root.contains(placeholderLink)) {
        event.preventDefault()
        setNotice('This external link is a placeholder in the student concept. The connected site pages are available from the main navigation.')
      }
    }

    const handleKeyDown = (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      const target = event.target instanceof Element ? event.target.closest('[data-react-route]') : null
      if (!target || !root.contains(target) || target.tagName === 'A') return
      event.preventDefault()
      navigate(target.dataset.reactRoute)
    }

    root.addEventListener('click', handleClick)
    root.addEventListener('keydown', handleKeyDown)

    return () => {
      root.removeEventListener('click', handleClick)
      root.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate])

  useEffect(() => {
    document.body.setAttribute('data-scene', scene)
    window.localStorage.setItem('boulders-home-scene', scene)

    const root = rootRef.current
    root?.querySelectorAll('.scene-toggle button').forEach((button) => {
      button.classList.toggle('on', button.dataset.mode === scene)
      button.setAttribute('aria-pressed', String(button.dataset.mode === scene))
    })
  }, [scene])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    root.querySelectorAll('.chip').forEach((chip) => {
      const selected = chip.textContent.trim() === activeCategory
      chip.classList.toggle('on', selected)
      chip.setAttribute('aria-pressed', String(selected))
    })

    root.querySelectorAll('.dir-table tbody tr').forEach((row) => {
      const category = row.querySelector('.cat')?.textContent.trim()
      row.hidden = activeCategory !== 'All' && category !== activeCategory
    })
  }, [activeCategory])

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(''), 4500)
    return () => window.clearTimeout(timer)
  }, [notice])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const clockText = `${time} SAST`
    const signalClock = root.querySelector('#sig-time')
    const refreshClock = root.querySelector('#today-refresh')
    if (signalClock) signalClock.textContent = clockText
    if (refreshClock) refreshClock.textContent = time

    const isOpen = minutes >= 9 * 60 && minutes < 20 * 60
    const signalStatus = root.querySelector('#signal-status')
    if (signalStatus) signalStatus.textContent = isOpen ? 'Signal · Trading' : 'Signal · Closed'

    const nowValue = Array.from(root.querySelectorAll('.visit-row')).find((row) =>
      row.querySelector('.label')?.textContent.trim() === 'Now',
    )?.querySelector('.val')

    if (nowValue) {
      nowValue.innerHTML = isOpen
        ? '<b>● Open</b> · closes 20:00'
        : '<span style="color: var(--dim)">● Closed</span> · opens 09:00'
    }
  }, [minutes, time])

  return (
    <>
      <div
        ref={rootRef}
        className="original-home-root"
        dangerouslySetInnerHTML={{ __html: homeMarkup }}
      />
      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-1/2 z-[100] w-[min(92vw,560px)] -translate-x-1/2 rounded-xl bg-[#14161F] px-5 py-4 text-center font-sans text-sm text-[#EDE7D8] shadow-2xl"
        >
          {notice}
        </div>
      )}
    </>
  )
}
