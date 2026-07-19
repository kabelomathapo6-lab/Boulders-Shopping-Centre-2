import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { StatusBar } from './StatusBar'

export function Layout() {
  return (
    <div className="min-h-screen bg-porcelain text-ink transition-colors dark:bg-night-900 dark:text-white">
      <StatusBar />
      <Header />
      <main><Outlet /></main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
