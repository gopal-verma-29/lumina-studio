import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsap'
import About      from '../components/sections/About'
import Stats      from '../components/sections/Stats'
import Materials  from '../components/sections/Materials'
import Enquiry    from '../components/sections/Enquiry'

function PageHero() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current.querySelectorAll('.ph-reveal'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="max-w-[1440px] mx-auto px-6 md:px-10 pt-36 pb-6">
      <div className="ph-reveal">
        <span className="section-label">The studio</span>
      </div>
      <h1 className="ph-reveal" style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', fontSize: 'clamp(3rem,7vw,7rem)', lineHeight: 1.0, marginBottom: '1.5rem' }}>
        Twelve years.<br /><em>One obsession</em>.
      </h1>
      <p className="ph-reveal" style={{ fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.42)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '420px' }}>
        LUMINA is a Mumbai-based interior design studio. We work with people who believe the spaces they inhabit should be as thoughtfully considered as the lives they lead.
      </p>
    </div>
  )
}

export default function AboutPage() {
  return (
    <main style={{ background: '#0D0B09' }}>
      <PageHero />
      {/* Studio story, philosophy, team */}
      <About />
      {/* Numbers */}
      <Stats />
      {/* Materials — makes sense contextually with studio story */}
      <Materials />
      {/* Enquiry — strong conversion at end of about page */}
      <Enquiry />
    </main>
  )

}
