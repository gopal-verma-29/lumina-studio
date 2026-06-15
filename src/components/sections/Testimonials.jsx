import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from '../../utils/gsap'
import { testimonials } from '../../data/testimonials'

const INTERVAL = 5000

export default function Testimonials() {
  const sectionRef  = useRef(null)
  const contentRef  = useRef(null)
  const timerRef    = useRef(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // Animated transition between testimonials
  const goTo = useCallback((i) => {
    const next = (i + testimonials.length) % testimonials.length
    if (next === active) return
    gsap.to(contentRef.current, {
      opacity: 0, y: 10, duration: 0.22,
      onComplete: () => {
        setActive(next)
        gsap.fromTo(contentRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
        )
      }
    })
  }, [active])

  // Auto-advance
  useEffect(() => {
    if (paused) return
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % testimonials.length
        gsap.to(contentRef.current, {
          opacity: 0, y: 10, duration: 0.22,
          onComplete: () => {
            gsap.fromTo(contentRef.current,
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
            )
          }
        })
        return next
      })
    }, INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [paused])

  // Scroll entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.test-header'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } }
      )
      gsap.fromTo(sectionRef.current.querySelectorAll('.test-selector'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.test-list'), start: 'top 82%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const t = testimonials[active]

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 md:py-32"
      style={{ background: '#0D0B09' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="test-header mb-12 md:mb-16 opacity-0">
          <span className="section-label">Client stories</span>
          <h2 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', fontSize: 'clamp(2.2rem,5vw,5rem)', lineHeight: 1.05 }}>
            What a space<br /><em>does to a life</em>.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-8 lg:gap-16 items-start">

          {/* Selector column */}
          <div className="test-list flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                className="test-selector text-left flex items-center gap-3 p-3 lg:p-4 transition-all duration-300 opacity-0 flex-shrink-0"
                style={{
                  border: `1px solid ${i === active ? 'rgba(200,169,109,0.35)' : '#2A2518'}`,
                  background: i === active ? 'rgba(200,169,109,0.05)' : 'transparent',
                  cursor: 'pointer', minWidth: '200px',
                }}
                onClick={() => { setPaused(true); goTo(i) }}
              >
                <img
                  src={item.avatar} alt={item.author}
                  className="w-9 h-9 object-cover flex-shrink-0 rounded-full"
                  style={{
                    filter: i === active ? 'none' : 'grayscale(80%)',
                    opacity: i === active ? 1 : 0.45,
                    outline: i === active ? '2px solid rgba(200,169,109,0.4)' : '2px solid transparent',
                    outlineOffset: '2px', transition: 'all 0.3s',
                  }}
                />
                <div className="min-w-0">
                  <p style={{ fontFamily: '"DM Sans"', fontWeight: 500, fontSize: '0.82rem', color: i === active ? '#F5EFE6' : 'rgba(245,239,230,0.38)', transition: 'color 0.3s', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.author.split(' & ')[0]}
                  </p>
                  <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.52rem', color: 'rgba(245,239,230,0.22)', letterSpacing: '0.08em', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.type}
                  </p>
                </div>
                {/* Active progress bar */}
                {i === active && !paused && (
                  <div className="hidden lg:block ml-auto flex-shrink-0" style={{ width: '28px', height: '1.5px', background: '#2A2518', overflow: 'hidden', position: 'relative' }}>
                    <div key={active} style={{
                      position: 'absolute', left: 0, top: 0, height: '100%', background: '#C8A96D',
                      animation: `progressFill ${INTERVAL}ms linear forwards`,
                    }} />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Quote panel */}
          <div ref={contentRef} className="flex flex-col gap-6">
            {/* Room image */}
            <div className="relative overflow-hidden w-full" style={{ aspectRatio: '16/8' }}>
              <img
                key={t.id}
                src={t.roomImage}
                alt={t.author}
                className="w-full h-full object-cover"
                style={{ transition: 'opacity 0.5s' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,11,9,0.65) 0%, transparent 55%)' }} />
              <div className="absolute bottom-4 left-4">
                <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.55rem', color: 'rgba(245,239,230,0.65)', background: 'rgba(13,11,9,0.75)', padding: '0.3rem 0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {t.role}
                </span>
              </div>
            </div>

            {/* Quote */}
            <blockquote style={{ fontFamily: '"Cormorant Garamond"', fontSize: 'clamp(1.2rem,2.2vw,1.75rem)', fontWeight: 300, color: 'rgba(245,239,230,0.85)', lineHeight: 1.6, fontStyle: 'italic', borderLeft: '2px solid rgba(200,169,109,0.25)', paddingLeft: '1.25rem' }}>
              {t.quote}
            </blockquote>

            {/* Author + metric */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.author}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  style={{ outline: '2px solid rgba(200,169,109,0.3)', outlineOffset: '2px' }} />
                <div>
                  <p style={{ fontFamily: '"DM Sans"', fontWeight: 500, color: '#F5EFE6', fontSize: '0.88rem' }}>{t.author}</p>
                  <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.55rem', color: 'rgba(245,239,230,0.32)', letterSpacing: '0.1em', marginTop: '2px' }}>{t.role}</p>
                </div>
              </div>
              <div className="sm:ml-auto inline-flex items-center gap-2 px-3 py-2"
                style={{ border: '1px solid rgba(200,169,109,0.18)', background: 'rgba(200,169,109,0.04)' }}>
                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#C8A96D' }} />
                <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.56rem', color: '#C8A96D', letterSpacing: '0.1em' }}>{t.metric}</span>
              </div>
            </div>

            {/* Nav dots */}
            <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px solid #2A2518' }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => { setPaused(true); goTo(i) }} aria-label={`Testimonial ${i + 1}`}
                  style={{ height: '1.5px', background: i === active ? '#C8A96D' : '#2A2518', width: i === active ? '28px' : '14px', border: 'none', cursor: 'pointer', transition: 'all 0.35s', padding: 0 }} />
              ))}
              <button
                onClick={() => setPaused(p => !p)}
                style={{ marginLeft: '8px', background: 'none', border: '1px solid #2A2518', color: 'rgba(245,239,230,0.3)', width: '22px', height: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,169,109,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#2A2518'}
                aria-label={paused ? 'Play' : 'Pause'}
              >
                {paused
                  ? <svg width="7" height="9" viewBox="0 0 7 9" fill="#C8A96D"><path d="M0 0l7 4.5L0 9z"/></svg>
                  : <svg width="7" height="9" viewBox="0 0 7 9" fill="#C8A96D"><rect x="0" y="0" width="2.5" height="9"/><rect x="4.5" y="0" width="2.5" height="9"/></svg>
                }
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS keyframe for progress bar */}
      <style>{`@keyframes progressFill { from { width: 0%; } to { width: 100%; } }`}</style>
    </section>
  )
}
