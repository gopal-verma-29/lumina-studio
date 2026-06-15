import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../utils/gsap'
import { useNavigate, useLocation } from 'react-router-dom'

const homeLinks = [
  { label: 'Services',  href: '#services',      type: 'scroll' },
  { label: 'Work',      href: '#work',           type: 'scroll' },
  { label: 'Process',   href: '#process',        type: 'scroll' },
  { label: 'About',     href: '/about',          type: 'page'   },
  { label: 'Projects',  href: '/projects',       type: 'page'   },
]

const otherLinks = [
  { label: 'Home',      href: '/',               type: 'page' },
  { label: 'Projects',  href: '/projects',       type: 'page' },
  { label: 'About',     href: '/about',          type: 'page' },
]

export default function Navbar() {
  const navRef     = useRef(null)
  const menuRef    = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [scrollPct, setScrollPct]   = useState(0)
  const [activeSection, setActiveSection] = useState('')
  const navigate  = useNavigate()
  const location  = useLocation()
  const isHome    = location.pathname === '/'

  const navLinks = isHome ? homeLinks : otherLinks

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', delay: isHome ? 2.3 : 0.3 }
    )
  }, [isHome])

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

  useEffect(() => {
    if (!menuRef.current) return
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      gsap.fromTo(menuRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.55, ease: 'power4.inOut' }
      )
      gsap.fromTo(menuRef.current.querySelectorAll('.menu-item'),
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, delay: 0.28, duration: 0.55, ease: 'power3.out' }
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
        setTimeout(() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }), 500)
      } else {
        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
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

      <nav ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 opacity-0 ${isScrolled ? 'bg-glass' : ''}`}
        style={{ borderBottom: isScrolled ? '1px solid rgba(42,37,24,0.5)' : '1px solid transparent' }}>

        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <button onClick={() => navigate('/')}
            className="flex flex-col items-start gap-0.5"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <span style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.5rem', fontWeight: 300, letterSpacing: '0.28em', color: '#F5EFE6', lineHeight: 1, transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = '#C8A96D'}
              onMouseLeave={e => e.target.style.color = '#F5EFE6'}>
              LUMINA
            </span>
            <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.42rem', letterSpacing: '0.28em', color: 'rgba(200,169,109,0.45)', textTransform: 'uppercase', lineHeight: 1 }}>
              Interior Design
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button key={link.label} onClick={() => handleLink(link)}
                style={{
                  fontFamily: '"DM Sans"', fontSize: '0.78rem', letterSpacing: '0.07em',
                  color: isActive(link) ? '#C8A96D' : 'rgba(245,239,230,0.48)',
                  background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s', padding: '4px 0',
                  position: 'relative',
                }}
                onMouseEnter={e => { if (!isActive(link)) e.currentTarget.style.color = 'rgba(245,239,230,0.85)' }}
                onMouseLeave={e => { if (!isActive(link)) e.currentTarget.style.color = 'rgba(245,239,230,0.48)' }}>
                {link.label}
                {isActive(link) && (
                  <span style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: '#C8A96D' }} />
                )}
              </button>
            ))}
          </div>

          {/* CTA + availability + hamburger */}
          <div className="flex items-center gap-3">
            <button onClick={() => { setMenuOpen(false); navigate('/'); setTimeout(() => document.querySelector('#enquiry')?.scrollIntoView({ behavior: 'smooth' }), isHome ? 0 : 500) }}
              className="hidden md:flex btn-outline-gold"
              style={{ padding: '0.55rem 1.3rem', fontSize: '0.7rem' }}>
              Begin a project
            </button>

            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5"
              style={{ border: '1px solid rgba(200,169,109,0.18)', background: 'rgba(200,169,109,0.04)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.52rem', color: 'rgba(245,239,230,0.35)', letterSpacing: '0.14em' }}>
                ACCEPTING Q4
              </span>
            </div>

            {/* Hamburger */}
            <button className="md:hidden flex flex-col gap-1.5 p-1.5 -mr-1.5"
              onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {[0, 1, 2].map(i => (
                <span key={i} className="block h-px w-6 transition-all duration-300"
                  style={{
                    background: '#F5EFE6',
                    width: i === 1 ? (menuOpen ? '24px' : '16px') : '24px',
                    transform: menuOpen ? (i === 0 ? 'rotate(45deg) translateY(5px)' : i === 2 ? 'rotate(-45deg) translateY(-5px)' : 'none') : 'none',
                    opacity: menuOpen && i === 1 ? 0 : 1,
                  }} />
              ))}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div ref={menuRef}
        className="md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-7"
        style={{ background: '#0D0B09', clipPath: 'inset(0 0 100% 0)' }}>
        {navLinks.map(link => (
          <button key={link.label} className="menu-item opacity-0"
            onClick={() => handleLink(link)}
            style={{ fontFamily: '"Cormorant Garamond"', fontSize: '2.8rem', fontWeight: 300, color: '#F5EFE6', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.08em', transition: 'color 0.3s' }}
            onMouseEnter={e => e.target.style.color = '#C8A96D'}
            onMouseLeave={e => e.target.style.color = '#F5EFE6'}>
            {link.label}
          </button>
        ))}
        <button className="menu-item btn-gold opacity-0 mt-2"
          onClick={() => { setMenuOpen(false); navigate('/'); setTimeout(() => document.querySelector('#enquiry')?.scrollIntoView({ behavior: 'smooth' }), 600) }}>
          Begin a project
        </button>
        <div className="menu-item opacity-0 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.56rem', color: 'rgba(245,239,230,0.28)', letterSpacing: '0.18em' }}>ACCEPTING Q4 PROJECTS</span>
        </div>
      </div>
    </>
  )
}
