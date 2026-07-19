import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App'
import { DirectoryPage } from './pages/DirectoryPage'
import { HomePage } from './pages/HomePage'
import { LeasingPage } from './pages/LeasingPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { VisitPage } from './pages/VisitPage'
import { WhatsOnPage } from './pages/WhatsOnPage'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    element: <App />,
    children: [
      { path: 'directory', element: <DirectoryPage /> },
      { path: 'whats-on', element: <WhatsOnPage /> },
      { path: 'visit', element: <VisitPage /> },
      { path: 'leasing', element: <LeasingPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
