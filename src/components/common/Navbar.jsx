import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../utils/gsap'
import { useNavigate, useLocation } from 'react-router-dom'

const homeLinks = [
  { label: 'Work',      href: '#work',      type: 'scroll' },
  { label: 'Process',   href: '#process',   type: 'scroll' },
  { label: 'About',     href: '/about',     type: 'page'   },
  { label: 'Projects',  href: '/projects',  type: 'page'   },
  { label: 'Contact',   href: '/contact',   type: 'page'   },
]

const otherLinks = [
  { label: 'Home',     href: '/',         type: 'page' },
  { label: 'Projects', href: '/projects', type: 'page' },
  { label: 'About',    href: '/about',    type: 'page' },
  { label: 'Contact',  href: '/contact',  type: 'page' },
]

// ── Magnetic link ─────────────────────────────────────────────────────────────
function MagLink({ label, active, onClick }) {
  const ref = useRef(null)
  const xTo = useRef(null)
  const yTo = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    xTo.current = gsap.quickTo(ref.current, 'x', { duration: 0.4, ease: 'power3.out' })
    yTo.current = gsap.quickTo(ref.current, 'y', { duration: 0.4, ease: 'power3.out' })
  }, [])

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    xTo.current?.((e.clientX - cx) * 0.28)
    yTo.current?.((e.clientY - cy) * 0.28)
  }
  const onLeave = () => {
    xTo.current?.(0)
    yTo.current?.(0)
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        fontFamily: '"DM Sans"', fontSize: '0.76rem', letterSpacing: '0.07em',
        color: active ? '#C8A96D' : 'rgba(245,239,230,0.45)',
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '6px 0', position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
        transition: 'color 0.3s',
        willChange: 'transform',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(245,239,230,0.9)' }}
    >
      {label}
      {/* Active indicator — pulsing dot */}
      <span style={{
        display: 'block', width: active ? '3px' : '0px', height: '3px',
        borderRadius: '50%', background: '#C8A96D',
        transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: active ? '0 0 6px rgba(200,169,109,0.6)' : 'none',
      }} />
    </button>
  )
}

// ── Navbar ────────────────────────────────────────────────────────────────────
export default function Navbar() {
  const navRef  = useRef(null)
  const menuRef = useRef(null)
  const logoRef = useRef(null)
  const [isScrolled, setIsScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]           = useState(false)
  const [scrollPct, setScrollPct]         = useState(0)
  const [activeSection, setActiveSection] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const isHome   = location.pathname === '/'
  const navLinks = isHome ? homeLinks : otherLinks

  // Entrance
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: isHome ? 2.4 : 0.3 }
    )
  }, [isHome])

  // Scroll listener + section tracker
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 70)
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setScrollPct(Math.min(pct, 1))
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    if (isHome) {
      const sections = document.querySelectorAll('section[id]')
      const io = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
        { rootMargin: '-40% 0px -55% 0px' }
      )
      sections.forEach(s => io.observe(s))
      return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
    }
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome, location.pathname])

  // Logo subtle pulse on load
  useEffect(() => {
    if (!logoRef.current) return
    gsap.fromTo(logoRef.current,
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: isHome ? 2.5 : 0.4 }
    )
  }, [isHome])

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(menuRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power4.inOut' }
      )
      gsap.fromTo(menuRef.current.querySelectorAll('.menu-item'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.07, delay: 0.3, duration: 0.6, ease: 'power3.out' }
      )
    } else {
      document.body.style.overflow = ''
      gsap.to(menuRef.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.45, ease: 'power4.in' })
    }
  }, [menuOpen])

  const handleLink = (link) => {
    setMenuOpen(false)
    if (link.type === 'page') {
      navigate(link.href)
    } else {
      if (!isHome) {
        navigate('/')
        setTimeout(() => {
          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
        }, 500)
      } else {
        setTimeout(() => {
          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
        }, 450)
      }
    }
  }

  const isActive = (link) => {
    if (link.type === 'page') return location.pathname === link.href
    return isHome && activeSection === link.href.replace('#', '')
  }

  return (
    <>
      {/* Scroll progress bar */}
      <div className="scroll-progress" style={{ width: `${scrollPct * 100}%` }} />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 opacity-0 ${isScrolled ? 'bg-glass' : ''}`}
        style={{ borderBottom: isScrolled ? '1px solid rgba(42,37,24,0.4)' : '1px solid transparent' }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">

          {/* ── Logo with geometric mark ── */}
          <button
            ref={logoRef}
            onClick={() => navigate('/')}
            className="flex items-center gap-3 opacity-0"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            {/* Geometric SVG mark — architecture-inspired */}
            <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="11" y1="0" x2="11" y2="26" stroke="rgba(200,169,109,0.5)" strokeWidth="0.5" />
              <line x1="0" y1="13" x2="22" y2="13" stroke="rgba(200,169,109,0.5)" strokeWidth="0.5" />
              <rect x="5.5" y="5.5" width="11" height="15" stroke="rgba(200,169,109,0.75)" strokeWidth="0.75" fill="none" />
              <rect x="8" y="8" width="6" height="10" stroke="rgba(200,169,109,0.4)" strokeWidth="0.5" fill="rgba(200,169,109,0.03)" />
              <circle cx="11" cy="13" r="1.5" fill="rgba(200,169,109,0.6)" />
            </svg>

            <div className="flex flex-col items-start gap-0.5">
              <span style={{
                fontFamily: '"Cormorant Garamond"', fontSize: '1.5rem', fontWeight: 300,
                letterSpacing: '0.28em', color: '#F5EFE6', lineHeight: 1, transition: 'color 0.3s'
              }}
                onMouseEnter={e => e.target.style.color = '#C8A96D'}
                onMouseLeave={e => e.target.style.color = '#F5EFE6'}
              >
                LUMINA
              </span>
              <span style={{
                fontFamily: '"JetBrains Mono"', fontSize: '0.4rem', letterSpacing: '0.32em',
                color: 'rgba(200,169,109,0.38)', textTransform: 'uppercase', lineHeight: 1
              }}>
                Interior Design
              </span>
            </div>
          </button>

          {/* ── Desktop nav — magnetic links ── */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map(link => (
              <MagLink
                key={link.label}
                label={link.label}
                active={isActive(link)}
                onClick={() => handleLink(link)}
              />
            ))}
          </div>

          {/* ── Right side controls ── */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setMenuOpen(false); navigate('/contact') }}
              className="hidden md:flex btn-outline-gold"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.68rem' }}
            >
              Begin a project
            </button>

            {/* Availability badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5" style={{
              border: '1px solid rgba(200,169,109,0.15)',
              background: 'rgba(200,169,109,0.04)',
            }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{
                background: '#4ade80',
                boxShadow: '0 0 6px rgba(74,222,128,0.6)',
                animation: 'pulse 2.5s ease-in-out infinite'
              }} />
              <span style={{
                fontFamily: '"JetBrains Mono"', fontSize: '0.5rem',
                color: 'rgba(245,239,230,0.3)', letterSpacing: '0.16em'
              }}>
                ACCEPTING Q4
              </span>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1.5 -mr-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <span key={i} className="block h-px transition-all duration-300" style={{
                  background: '#F5EFE6',
                  width: i === 1 ? (menuOpen ? '24px' : '15px') : '24px',
                  transform: menuOpen
                    ? (i === 0 ? 'rotate(45deg) translateY(5px)' : i === 2 ? 'rotate(-45deg) translateY(-5px)' : 'none')
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* ── Thin bottom accent line (visible only when not scrolled + on home) ── */}
        {!isScrolled && isHome && (
          <div style={{
            position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
            width: '60px', height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(200,169,109,0.35), transparent)'
          }} />
        )}
      </nav>

      {/* ── Mobile menu ── */}
      <div
        ref={menuRef}
        className="md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-7"
        style={{ background: '#0D0B09', clipPath: 'inset(0 0 100% 0)' }}
      >
        {/* Background particle hint — SVG pattern */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `radial-gradient(circle, #C8A96D 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }} />

        {navLinks.map(link => (
          <button key={link.label} className="menu-item opacity-0"
            onClick={() => handleLink(link)}
            style={{
              fontFamily: '"Cormorant Garamond"', fontSize: '2.6rem', fontWeight: 300,
              color: '#F5EFE6', background: 'none', border: 'none', cursor: 'pointer',
              letterSpacing: '0.08em', transition: 'color 0.3s', position: 'relative'
            }}
            onMouseEnter={e => e.target.style.color = '#C8A96D'}
            onMouseLeave={e => e.target.style.color = '#F5EFE6'}
          >
            {link.label}
          </button>
        ))}

        <button
          className="menu-item btn-gold opacity-0 mt-2"
          onClick={() => {
            setMenuOpen(false)
            navigate('/contact')
          }}
        >
          Begin a project
        </button>

        <div className="menu-item opacity-0 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,0.5)' }} />
          <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.54rem', color: 'rgba(245,239,230,0.25)', letterSpacing: '0.18em' }}>
            ACCEPTING Q4 PROJECTS
          </span>
        </div>
      </div>
    </>
  )
}
