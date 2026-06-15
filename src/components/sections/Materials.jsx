import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import { materials, palettes } from '../../data/process'

export default function Materials() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.mat-header'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(sectionRef.current.querySelectorAll('.swatch-item'),
        { y: 30, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.swatches-grid'), start: 'top 82%' } }
      )
      gsap.fromTo(sectionRef.current.querySelectorAll('.palette-strip'),
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.1, stagger: 0.15, ease: 'power4.inOut',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.palettes-section'), start: 'top 82%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="materials" ref={sectionRef} className="py-24 md:py-36" style={{ background: '#100E0C' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="mat-header flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 opacity-0">
          <div>
            <span className="section-label">Materiality</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', fontSize: 'clamp(2.5rem,6vw,5.5rem)', lineHeight: 1.05 }}>
              Texture, tone,<br /><em>and intention</em>.
            </h2>
          </div>
          <p style={{ fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.45)', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: '320px' }}>
            Every material we specify has been touched, tested, and considered in context. This is our palette.
          </p>
        </div>

        {/* Swatches grid */}
        <div className="swatches-grid grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 mb-20">
          {materials.map((mat, i) => (
            <div key={i} className="swatch-item group opacity-0" style={{ cursor: 'default' }}>
              <div className="material-swatch" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '1' }}>
                <img src={mat.image} alt={mat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="swatch-overlay absolute inset-0 flex flex-col justify-end p-2"
                  style={{ background: 'linear-gradient(to top, rgba(13,11,9,0.95) 0%, rgba(13,11,9,0.2) 60%, transparent 100%)', opacity: 0, transition: 'opacity 0.35s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                  <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.5rem', color: '#C8A96D', letterSpacing: '0.1em', lineHeight: 1.3 }}>{mat.use}</p>
                </div>
              </div>
              <div className="mt-2 px-0.5">
                <p style={{ fontFamily: '"DM Sans"', fontSize: '0.72rem', color: 'rgba(245,239,230,0.7)', fontWeight: 500, lineHeight: 1.3 }}>{mat.name}</p>
                <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.5rem', color: 'rgba(245,239,230,0.25)', letterSpacing: '0.08em', marginTop: '2px' }}>{mat.origin}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Signature palettes */}
        <div className="palettes-section">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-px" style={{ background: '#C8A96D' }} />
            <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.62rem', color: '#C8A96D', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              Signature palettes
            </span>
          </div>
          <div className="flex flex-col gap-8">
            {palettes.map((palette, i) => (
              <div key={i} className="palette-strip" style={{ opacity: 0 }}>
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                  <div style={{ minWidth: '180px' }}>
                    <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.35rem', fontWeight: 300, color: '#F5EFE6', marginBottom: '0.25rem' }}>{palette.name}</p>
                    <p style={{ fontFamily: '"DM Sans"', fontSize: '0.75rem', color: 'rgba(245,239,230,0.4)', lineHeight: 1.5 }}>{palette.description}</p>
                  </div>
                  <div className="flex flex-1 h-12 overflow-hidden" style={{ borderRadius: 0 }}>
                    {palette.colors.map((color, ci) => (
                      <div key={ci} className="flex-1 transition-all duration-300 hover:flex-[2]" style={{ background: color }} title={color} />
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap md:max-w-[200px]">
                    {palette.colors.map((color, ci) => (
                      <span key={ci} style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.55rem', color: 'rgba(245,239,230,0.3)', letterSpacing: '0.08em' }}>{color}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
