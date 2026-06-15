import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'

// Layout
import CustomCursor from './components/common/CustomCursor'
import Loader       from './components/common/Loader'
import Navbar       from './components/common/Navbar'
import Footer       from './components/common/Footer'
import WhatsAppFAB  from './components/common/WhatsAppFAB'

// Pages
import HomePage     from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import AboutPage    from './pages/AboutPage'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const location = useLocation()

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  // Only show loader on home page, first load
  const isHome = location.pathname === '/'

  return (
    <div style={{ background: '#0D0B09', minHeight: '100vh', position: 'relative' }}>
      <div className="grain-overlay" aria-hidden="true" />
      <CustomCursor />

      {/* Loader only on home, first visit */}
      {isHome && !loaded && <Loader onComplete={() => setLoaded(true)} />}

      <Navbar />

      <Routes>
        <Route path="/"         element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about"    element={<AboutPage />} />
      </Routes>

      <Footer />
      <WhatsAppFAB phone="919999999999" />
    </div>
  )
}
