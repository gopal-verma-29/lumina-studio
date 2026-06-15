import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'

export default function CTABanner() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = sectionRef.current.querySelectorAll('.word-split .inner')
      gsap.fromTo(words,
        { y: '115%' },
        { y: '0%', duration: 1.1, ease: 'power4.out', stagger: 0.055,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' } }
      )
      gsap.fromTo(sectionRef.current.querySelector('.cta-meta'),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' } }
      )
      gsap.fromTo(sectionRef.current.querySelector('.cta-line'),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden" style={{ borderTop: '1px solid #2A2518' }}>
      {/* Full-bleed BG */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=85&auto=format&fit=crop"
          alt="Lumina interior"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(13,11,9,0.92) 0%, rgba(13,11,9,0.85) 50%, rgba(13,11,9,0.95) 100%)' }} />
      </div>

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: '80vw', height: '50vh', background: 'radial-gradient(ellipse, rgba(200,169,109,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* BG wordmark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
        <span style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, fontSize: '20vw', color: 'rgba(245,239,230,0.02)', letterSpacing: '0.2em', lineHeight: 1 }}>LUMINA</span>
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 text-center">
        <span className="section-label justify-center">Begin the conversation</span>

        <h2 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', lineHeight: 1.0, marginBottom: '2rem', overflow: 'hidden' }}>
          {['The', 'space', 'you', 'deserve', 'is', 'closer', 'than', 'you', 'think.'].map((w, i) => (
            <span key={i} className="word-split" style={{ margin: '0 0.3rem', fontSize: 'clamp(2.5rem,7vw,7.5rem)' }}>
              <span className="inner">{w}</span>
            </span>
          ))}
        </h2>

        <div className="cta-line origin-left mx-auto mb-10" style={{ width: '80px', height: '1px', background: '#C8A96D' }} />

        <div className="cta-meta flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <button onClick={() => document.querySelector('#enquiry')?.scrollIntoView({ behavior: 'smooth' })} className="btn-gold">
            Begin your project
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <a href="https://wa.me/919999999999?text=Hi%20LUMINA%2C%20I%27d%20like%20to%20discuss%20a%20project."
            target="_blank" rel="noopener noreferrer" className="btn-outline-gold">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp us
          </a>
        </div>

        <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(245,239,230,0.2)', letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '2.5rem' }}>
          Mumbai · Delhi · Dubai · London · Worldwide
        </p>
      </div>
    </section>
  )
}
