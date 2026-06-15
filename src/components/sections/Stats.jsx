import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import { stats } from '../../data/process'

export default function Stats() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRef.current.querySelectorAll('.stat-card').forEach((card) => {
        const numEl = card.querySelector('.stat-num')
        const target = parseFloat(numEl.dataset.target)
        const suffix = numEl.dataset.suffix || ''
        const isDecimal = target % 1 !== 0
        const obj = { val: 0 }
        gsap.fromTo(card, { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%' } }
        )
        gsap.to(obj, {
          val: target, duration: 2.4, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
          onUpdate: () => {
            numEl.textContent = (isDecimal ? obj.val.toFixed(1) : Math.round(obj.val)) + suffix
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden"
      style={{ borderTop: '1px solid #2A2518', borderBottom: '1px solid #2A2518' }}>
      {/* BG image */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=60&auto=format&fit=crop')`,
        backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(60%)', opacity: 0.18,
      }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0D0B09 0%, rgba(13,11,9,0.85) 50%, #0D0B09 100%)' }} />
      {/* Gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: '700px', height: '300px', background: 'radial-gradient(ellipse, rgba(200,169,109,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card relative flex flex-col items-center md:items-start text-center md:text-left px-6 md:px-10 py-10 opacity-0">
              {i > 0 && <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-14" style={{ background: '#2A2518' }} />}
              <div className="stat-num font-display text-gold leading-none mb-3"
                style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, fontSize: 'clamp(3rem,6vw,5.5rem)', color: '#C8A96D', textShadow: '0 0 60px rgba(200,169,109,0.2)' }}
                data-target={stat.value} data-suffix={stat.suffix}>
                0{stat.suffix}
              </div>
              <p style={{ fontFamily: '"DM Sans"', fontWeight: 500, color: '#F5EFE6', fontSize: '0.9rem', letterSpacing: '0.03em', marginBottom: '4px' }}>{stat.label}</p>
              <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(245,239,230,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
