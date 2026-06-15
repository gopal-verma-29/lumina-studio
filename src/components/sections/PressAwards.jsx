import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import { pressFeatures, awards } from '../../data/testimonials'

export default function PressAwards() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.press-header'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(sectionRef.current.querySelectorAll('.press-logo'),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.press-logos'), start: 'top 82%' } }
      )
      gsap.fromTo(sectionRef.current.querySelectorAll('.award-card'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.awards-grid'), start: 'top 84%' } }
      )
      // Quote clip reveal
      gsap.fromTo(sectionRef.current.querySelector('.press-pullquote'),
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.3, ease: 'power4.inOut',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.press-pullquote'), start: 'top 82%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const featured = pressFeatures[0]

  return (
    <section id="press" ref={sectionRef} className="py-24 md:py-36" style={{ background: '#100E0C' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="press-header mb-16 opacity-0">
          <span className="section-label">Press & recognition</span>
          <h2 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', fontSize: 'clamp(2.5rem,6vw,5.5rem)', lineHeight: 1.05 }}>
            As seen in the<br /><em>world's best</em> publications.
          </h2>
        </div>

        {/* Publication logos */}
        <div className="press-logos grid grid-cols-3 md:grid-cols-5 gap-3 mb-16">
          {pressFeatures.map((pub, i) => (
            <div key={i} className="press-logo flex flex-col items-center justify-center px-4 py-6 opacity-0"
              style={{ border: '1px solid #2A2518', background: '#131109', cursor: 'default', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,169,109,0.25)'; e.currentTarget.style.background = 'rgba(200,169,109,0.03)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2518'; e.currentTarget.style.background = '#131109' }}>
              <span style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.6rem', fontWeight: 400, color: 'rgba(245,239,230,0.4)', letterSpacing: '0.05em', lineHeight: 1 }}>
                {pub.logo}
              </span>
              <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.52rem', color: 'rgba(245,239,230,0.2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '6px', textAlign: 'center' }}>
                {pub.name}
              </span>
            </div>
          ))}
        </div>

        {/* Featured pullquote */}
        <div className="press-pullquote relative py-12 px-8 md:px-16 mb-16"
          style={{ border: '1px solid rgba(200,169,109,0.15)', background: 'rgba(200,169,109,0.03)' }}>
          <div style={{ fontFamily: '"Cormorant Garamond"', fontSize: '6rem', color: 'rgba(200,169,109,0.08)', lineHeight: 0.7, position: 'absolute', top: '1.5rem', left: '2rem', userSelect: 'none' }} aria-hidden>"</div>
          <blockquote style={{ fontFamily: '"Cormorant Garamond"', fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 300, color: 'rgba(245,239,230,0.85)', lineHeight: 1.5, fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
            {featured.quote}
          </blockquote>
          <div className="flex items-center gap-3 mt-6" style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.5rem', fontWeight: 400, color: '#C8A96D' }}>{featured.logo}</span>
            <div>
              <p style={{ fontFamily: '"DM Sans"', fontWeight: 500, fontSize: '0.85rem', color: '#F5EFE6' }}>{featured.name}</p>
              <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(245,239,230,0.3)', letterSpacing: '0.12em' }}>{featured.issue}</p>
            </div>
          </div>
        </div>

        {/* Awards */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: '#C8A96D' }} />
            <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.62rem', color: '#C8A96D', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Awards</span>
          </div>
          <div className="awards-grid grid grid-cols-2 md:grid-cols-4 gap-3">
            {awards.map((award, i) => (
              <div key={i} className="award-card flex flex-col justify-between p-6 opacity-0"
                style={{ border: '1px solid #2A2518', background: '#131109', minHeight: '140px' }}>
                <div>
                  <div className="w-5 h-5 rounded-full mb-4 flex items-center justify-center"
                    style={{ border: '1px solid rgba(200,169,109,0.3)', flexShrink: 0 }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: '#C8A96D' }} />
                  </div>
                  <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.3rem', fontWeight: 300, color: '#F5EFE6', lineHeight: 1.2, marginBottom: '0.4rem' }}>{award.title}</p>
                  <p style={{ fontFamily: '"DM Sans"', fontSize: '0.75rem', color: 'rgba(245,239,230,0.4)', lineHeight: 1.5 }}>{award.subtitle}</p>
                </div>
                <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.6rem', color: 'rgba(200,169,109,0.45)', letterSpacing: '0.15em', marginTop: '1rem', display: 'block' }}>
                  {award.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
