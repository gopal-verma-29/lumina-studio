import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../utils/gsap'
import { processSteps } from '../../data/process'
import LazyImage from '../common/LazyImage'

export default function Process() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const pinRef     = useRef(null)
  const stRef      = useRef(null)

  const buildHScroll = () => {
    const track = trackRef.current
    const pin   = pinRef.current
    if (!track || !pin) return

    if (stRef.current) { stRef.current.kill(); stRef.current = null }

    // Force layout recalc
    track.style.transform = 'translateX(0px)'
    const totalWidth = track.scrollWidth - window.innerWidth

    if (totalWidth <= 0) return   // too narrow (mobile) — skip pin

    const anim = gsap.to(track, {
      x: -totalWidth, ease: 'none', paused: true,
    })

    stRef.current = ScrollTrigger.create({
      trigger: pin,
      start: 'top top',
      end: () => `+=${totalWidth}`,
      pin: true,
      anticipatePin: 1,
      scrub: 1.1,
      animation: anim,
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.process-header'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )

      const t = setTimeout(buildHScroll, 200)

      let rTimer
      const onResize = () => {
        clearTimeout(rTimer)
        rTimer = setTimeout(() => { buildHScroll(); ScrollTrigger.refresh() }, 250)
      }
      window.addEventListener('resize', onResize)

      return () => {
        clearTimeout(t)
        clearTimeout(rTimer)
        window.removeEventListener('resize', onResize)
        if (stRef.current) stRef.current.kill()
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={sectionRef} className="pt-20 md:pt-32 pb-0" style={{ background: '#0D0B09' }}>
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 mb-12">
        <div className="process-header flex flex-col md:flex-row md:items-end justify-between gap-6 opacity-0">
          <div>
            <span className="section-label">How we work</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', fontSize: 'clamp(2.2rem,5.5vw,5rem)', lineHeight: 1.05 }}>
              Six phases to an<br /><em>extraordinary space</em>.
            </h2>
          </div>
          <p style={{ fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.42)', fontSize: '0.88rem', lineHeight: 1.75, maxWidth: '280px' }}>
            From brief to final key — every step considered, every decision documented.
          </p>
        </div>
      </div>

      {/* Desktop: pinned horizontal — Mobile: vertical stack */}
      <div className="hidden md:block">
        <div ref={pinRef} className="overflow-hidden" style={{ height: '85vh' }}>
          <div ref={trackRef} className="flex items-stretch h-full" style={{ width: 'max-content' }}>
            {processSteps.map((step) => (
              <div key={step.number}
                className="process-card flex-shrink-0 flex flex-col justify-between mx-2 first:ml-[6vw] last:mr-[6vw] group"
                style={{ width: 'clamp(280px, 34vw, 440px)', height: '100%', background: '#131109', border: '1px solid #2A2518', padding: '2.5rem' }}>
                <div>
                  <div className="flex items-start justify-between mb-7">
                    <span style={{ fontFamily: '"Cormorant Garamond"', fontSize: '4.5rem', fontWeight: 300, color: 'rgba(200,169,109,0.1)', lineHeight: 1, transition: 'color 0.4s' }}
                      onMouseEnter={e => e.target.style.color = 'rgba(200,169,109,0.22)'}
                      onMouseLeave={e => e.target.style.color = 'rgba(200,169,109,0.1)'}>
                      {step.number}
                    </span>
                    <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.56rem', color: 'rgba(245,239,230,0.22)', letterSpacing: '0.14em', border: '1px solid #2A2518', padding: '0.28rem 0.6rem' }}>
                      {step.duration}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: '"Cormorant Garamond"', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 300, color: '#F5EFE6', lineHeight: 1.1, marginBottom: '0.4rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: '"DM Sans"', fontSize: '0.72rem', color: '#C8A96D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    {step.subtitle}
                  </p>
                  <p style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.48)', lineHeight: 1.72 }}>
                    {step.description}
                  </p>
                </div>
                <div>
                  <LazyImage src={step.image} alt={step.title}
                    className="relative overflow-hidden mt-5 mb-5"
                    style={{ height: '120px' }}
                    imgClassName="group-hover:scale-105 transition-transform duration-700 object-cover" />
                  <div style={{ borderTop: '1px solid #2A2518', paddingTop: '1.1rem' }}>
                    <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.54rem', color: 'rgba(245,239,230,0.22)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Deliverables</p>
                    <div className="flex flex-wrap gap-1.5">
                      {step.deliverables.map(d => (
                        <span key={d} style={{ fontFamily: '"DM Sans"', fontSize: '0.7rem', color: 'rgba(200,169,109,0.55)', border: '1px solid rgba(200,169,109,0.12)', padding: '0.15rem 0.55rem' }}>{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* End CTA card */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center px-10 mr-[6vw]" style={{ minWidth: '280px' }}>
              <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '2.4rem', fontWeight: 300, color: '#F5EFE6', textAlign: 'center', marginBottom: '0.9rem', lineHeight: 1.2 }}>Ready to begin?</p>
              <p style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.38)', textAlign: 'center', marginBottom: '1.75rem', lineHeight: 1.65 }}>Every great space starts with a single conversation.</p>
              <button className="btn-gold" onClick={() => document.querySelector('#enquiry')?.scrollIntoView({ behavior: 'smooth' })}>
                Begin your project
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
          <div className="absolute bottom-5 right-8 hidden lg:flex items-center gap-2 opacity-25" style={{ position: 'absolute' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#C8A96D" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.55rem', color: 'rgba(245,239,230,0.38)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
          </div>
        </div>
      </div>

      {/* Mobile: horizontal snap-scroll */}
      <div className="md:hidden pb-16">
        <div
          className="process-mobile-track"
          style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            paddingBottom: '1.25rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {processSteps.map((step) => (
            <div key={step.number} className="process-card flex-shrink-0 flex flex-col justify-between"
              style={{
                width: '82vw',
                maxWidth: '340px',
                scrollSnapAlign: 'center',
                background: '#131109',
                border: '1px solid #2A2518',
                padding: '1.5rem',
              }}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span style={{ fontFamily: '"Cormorant Garamond"', fontSize: '2.8rem', fontWeight: 300, color: 'rgba(200,169,109,0.18)', lineHeight: 1 }}>{step.number}</span>
                  <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.54rem', color: 'rgba(245,239,230,0.22)', letterSpacing: '0.12em', border: '1px solid #2A2518', padding: '0.22rem 0.55rem' }}>{step.duration}</span>
                </div>
                <h3 style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.8rem', fontWeight: 300, color: '#F5EFE6', marginBottom: '0.3rem' }}>{step.title}</h3>
                <p style={{ fontFamily: '"DM Sans"', fontSize: '0.7rem', color: '#C8A96D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{step.subtitle}</p>
                <p style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.48)', lineHeight: 1.7 }}>{step.description}</p>
              </div>
              <div>
                <LazyImage src={step.image} alt={step.title}
                  className="relative overflow-hidden mt-4 mb-4"
                  style={{ height: '100px' }}
                  imgClassName="object-cover" />
                <div style={{ borderTop: '1px solid #2A2518', paddingTop: '0.85rem' }}>
                  <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.52rem', color: 'rgba(245,239,230,0.22)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Deliverables</p>
                  <div className="flex flex-wrap gap-1">
                    {step.deliverables.map(d => (
                      <span key={d} style={{ fontFamily: '"DM Sans"', fontSize: '0.65rem', color: 'rgba(200,169,109,0.55)', border: '1px solid rgba(200,169,109,0.12)', padding: '0.12rem 0.45rem' }}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* End CTA card */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center"
            style={{
              width: '82vw',
              maxWidth: '340px',
              scrollSnapAlign: 'center',
              padding: '2rem 1.5rem',
            }}>
            <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '2rem', fontWeight: 300, color: '#F5EFE6', textAlign: 'center', marginBottom: '0.8rem', lineHeight: 1.2 }}>Ready to begin?</p>
            <p style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.38)', textAlign: 'center', marginBottom: '1.5rem', lineHeight: 1.65 }}>Every great space starts with a single conversation.</p>
            <button className="btn-gold" onClick={() => document.querySelector('#enquiry')?.scrollIntoView({ behavior: 'smooth' })}>
              Begin your project
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
        {/* Swipe hint */}
        <div className="flex items-center justify-center gap-2 mt-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3 }}><path d="M5 12h14M13 6l6 6-6 6" stroke="#C8A96D" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.52rem', color: 'rgba(245,239,230,0.28)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Swipe</span>
        </div>
      </div>
    </section>
  )
}
