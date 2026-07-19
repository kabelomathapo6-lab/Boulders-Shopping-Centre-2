import assert from 'node:assert/strict'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { Header } from '../src/components/Header.jsx'
import { Footer } from '../src/components/Footer.jsx'
import { StatusBar } from '../src/components/StatusBar.jsx'
import { DirectoryPage } from '../src/pages/DirectoryPage.jsx'
import { HomePage } from '../src/pages/HomePage.jsx'
import { LeasingPage } from '../src/pages/LeasingPage.jsx'
import { NotFoundPage } from '../src/pages/NotFoundPage.jsx'
import { VisitPage } from '../src/pages/VisitPage.jsx'
import { WhatsOnPage } from '../src/pages/WhatsOnPage.jsx'

const originalConsoleError = console.error
console.error = (...args) => {
  if (String(args[0]).includes('useLayoutEffect does nothing on the server')) return
  originalConsoleError(...args)
}

const storage = new Map()
globalThis.window = {
  localStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  },
  matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
}

const cases = [
  ['Home', HomePage, 'Midrand,'],
  ['Directory', DirectoryPage, 'Every store,'],
  ["What's On", WhatsOnPage, 'More reasons to'],
  ['Visit', VisitPage, 'Come'],
  ['Leasing', LeasingPage, 'Make your next'],
  ['Not Found', NotFoundPage, 'That page isn’t here.'],
]

for (const [name, Component, expected] of cases) {
  const html = renderToString(<MemoryRouter><Component /></MemoryRouter>)
  assert.ok(html.includes(expected), `${name} page did not render expected content`)
  const minimumLength = name === 'Home' ? 30000 : 1000
  assert.ok(html.length > minimumLength, `${name} page render was unexpectedly small`)
  console.log(`PASS ${name} (${html.length.toLocaleString()} chars)`)
}

for (const [name, Component, expected] of [
  ['Header', Header, 'The Boulders'],
  ['StatusBar', StatusBar, 'SAST'],
  ['Footer', Footer, 'Student concept'],
]) {
  const html = renderToString(<MemoryRouter><Component /></MemoryRouter>)
  assert.ok(html.includes(expected), `${name} did not render expected content`)
  console.log(`PASS ${name} (${html.length.toLocaleString()} chars)`)
}

console.log('All React smoke tests passed.')
console.error = originalConsoleError
