import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import { services } from '../../data/process'
import LazyImage from '../common/LazyImage'

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.services-header'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(sectionRef.current.querySelectorAll('.service-card'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.services-grid'), start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-36" style={{ background: '#0D0B09' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="services-header flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 opacity-0">
          <div>
            <span className="section-label">Our craft</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', fontSize: 'clamp(2.5rem,6vw,5.5rem)', lineHeight: 1.05 }}>
              Everything your space<br /><em>deserves</em>.
            </h2>
          </div>
          <p style={{ fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.45)', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: '320px' }}>
            From the first sketch to the final styling, we hold every thread of your project with the same level of obsession.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <div key={i} className="service-card group opacity-0" style={{ background: '#131109', border: '1px solid #2A2518', minHeight: '320px', position: 'relative', overflow: 'hidden', cursor: 'default', transition: 'border-color 0.4s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,169,109,0.25)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#2A2518'}>

              {/* Background image — reveals on hover */}
              <div className="absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                <LazyImage src={service.image} alt={service.title} className="absolute inset-0" imgClassName="object-cover" style={{ position: 'absolute', inset: 0 }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,11,9,0.97) 0%, rgba(13,11,9,0.75) 60%, rgba(13,11,9,0.5) 100%)' }} />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-between" style={{ minHeight: '320px' }}>
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span style={{ fontFamily: '"Cormorant Garamond"', fontSize: '2.2rem', color: '#C8A96D', lineHeight: 1, fontWeight: 300 }}>{service.icon}</span>
                    <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(245,239,230,0.2)', letterSpacing: '0.15em' }}>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.8rem', fontWeight: 300, color: '#F5EFE6', lineHeight: 1.15, marginBottom: '0.75rem' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontFamily: '"DM Sans"', fontSize: '0.83rem', color: 'rgba(245,239,230,0.5)', lineHeight: 1.7 }}>
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-6">
                  {service.tags.map(tag => (
                    <span key={tag} style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.55rem', color: 'rgba(200,169,109,0.55)', border: '1px solid rgba(200,169,109,0.15)', padding: '0.2rem 0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
