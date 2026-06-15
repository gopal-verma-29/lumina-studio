import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../../utils/gsap'

const slides = [
  { image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=90&auto=format&fit=crop', label: 'Living' },
  { image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=90&auto=format&fit=crop', label: 'Hospitality' },
  { image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1920&q=90&auto=format&fit=crop', label: 'Bedroom' },
  { image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1920&q=90&auto=format&fit=crop', label: 'Dining' },
]

function SplitWords({ text, className = '' }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i, arr) => (
        <span key={i} className="word-split">
          <span className="inner">{w}</span>
          {i < arr.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const heroRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const slidesRef = useRef([])
  const metaRef = useRef(null)
  const cueRef = useRef(null)
  const orbRef = useRef(null)
  const intervalRef = useRef(null)

  const goTo = (idx) => {
    setPrev(current)
    setCurrent(idx)
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent(c => {
        setPrev(c)
        return (c + 1) % slides.length
      })
    }, 5500)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.1 })

      tl.fromTo(heroRef.current.querySelectorAll('.word-split .inner'),
        { y: '115%' },
        { y: '0%', duration: 1.15, ease: 'power4.out', stagger: 0.055 }, 0
      )
      tl.fromTo(metaRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.7
      )
      tl.fromTo(cueRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }, 1.4
      )
      tl.fromTo(orbRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 2.5, ease: 'power2.out' }, 0
      )

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: self => {
          if (orbRef.current) gsap.set(orbRef.current, { y: self.progress * -50 })
        }
      })

      // Mouse parallax
      const onMouse = (e) => {
        const dx = (e.clientX / window.innerWidth - 0.5)
        const dy = (e.clientY / window.innerHeight - 0.5)
        gsap.to(orbRef.current, { x: dx * 35, y: dy * 25, duration: 2.5, ease: 'power2.out' })
      }
      window.addEventListener('mousemove', onMouse)
      return () => window.removeEventListener('mousemove', onMouse)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Slide images */}
      {slides.map((slide, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-[1800ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}>
          <img src={slide.image} alt={slide.label} className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,11,9,0.92) 0%, rgba(13,11,9,0.6) 50%, rgba(13,11,9,0.45) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,11,9,0.7) 0%, transparent 50%)' }} />
        </div>
      ))}

      {/* Gold orb */}
      <div ref={orbRef} className="orb-float absolute top-1/3 right-1/4 pointer-events-none opacity-0"
        style={{ width: '500px', height: '500px', borderRadius: '50%', zIndex: 2, background: 'radial-gradient(circle, rgba(200,169,109,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 pt-28">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-px" style={{ background: '#C8A96D' }} />
          <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.62rem', color: '#C8A96D', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            Est. 2012 · Mumbai · Dubai · London
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, lineHeight: 1.0, color: '#F5EFE6', overflow: 'hidden', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: 'clamp(3.2rem,9.5vw,9rem)', overflow: 'hidden' }}>
            <SplitWords text="We design" />
          </div>
          <div style={{ fontSize: 'clamp(3.2rem,9.5vw,9rem)', overflow: 'hidden', fontStyle: 'italic' }}>
            <SplitWords text="spaces that" />
          </div>
          <div style={{ fontSize: 'clamp(3.2rem,9.5vw,9rem)', overflow: 'hidden' }}>
            <SplitWords text="feel inevitable." />
          </div>
        </h1>

        {/* Meta row */}
        <div ref={metaRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 opacity-0">
          <p style={{ fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.52)', fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.7, maxWidth: '420px' }}>
            Interior architecture, spatial design, and FF&E — crafted for those who refuse to live in ordinary spaces.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="btn-gold" onClick={() => document.querySelector('#enquiry')?.scrollIntoView({ behavior: 'smooth' })}>
              Begin your project
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="btn-outline-gold" onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}>
              View portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Slide indicators + room labels */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col gap-4">
        {slides.map((slide, i) => (
          <button key={i} onClick={() => goTo(i)}
            className="flex items-center gap-3 group" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <span style={{
              fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
              color: i === current ? '#C8A96D' : 'rgba(245,239,230,0.2)', transition: 'color 0.3s'
            }}>
              {slide.label}
            </span>
            <div style={{ width: i === current ? '24px' : '12px', height: '1px', background: i === current ? '#C8A96D' : 'rgba(245,239,230,0.2)', transition: 'all 0.4s' }} />
          </button>
        ))}
      </div>

      {/* Scroll cue */}
      <div ref={cueRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 z-10 cursor-pointer"
        onClick={() => document.querySelector('#marquee')?.scrollIntoView({ behavior: 'smooth' })}>
        <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(245,239,230,0.25)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Explore</span>
        <div className="w-px h-14 scroll-cue" style={{ background: 'linear-gradient(to bottom, rgba(200,169,109,0.6), transparent)' }} />
      </div>

      {/* Project counter */}
      <div className="absolute bottom-10 left-8 z-10 hidden md:block">
        <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(245,239,230,0.2)', letterSpacing: '0.2em' }}>
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}
