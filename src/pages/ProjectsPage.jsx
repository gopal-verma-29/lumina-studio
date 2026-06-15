import { useEffect, useRef } from 'react'
import { gsap } from '../utils/gsap'
import Work         from '../components/sections/Work'
import BeforeAfter  from '../components/sections/BeforeAfter'
import PressAwards  from '../components/sections/PressAwards'
import CTABanner    from '../components/sections/CTABanner'

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
    <div ref={ref} className="max-w-[1440px] mx-auto px-6 md:px-10 pt-36 pb-12">
      <div className="ph-reveal">
        <span className="section-label">Portfolio</span>
      </div>
      <h1 className="ph-reveal" style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', fontSize: 'clamp(3rem,7vw,7rem)', lineHeight: 1.0, marginBottom: '1.5rem' }}>
        Every project.<br /><em>Every space</em>.
      </h1>
      <p className="ph-reveal" style={{ fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.42)', fontSize: '1rem', lineHeight: 1.8, maxWidth: '440px' }}>
        Six years of work across residential homes, commercial spaces, and hospitality projects — in India and abroad.
      </p>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <main style={{ background: '#0D0B09' }}>
      <PageHero />
      {/* Full portfolio with filters */}
      <Work preview={false} showFilter={true} />
      {/* Before/after — lives here, not on home */}
      <BeforeAfter />
      {/* Press recognition — lives here */}
      <PressAwards />
      <CTABanner />
    </main>
  )
}
