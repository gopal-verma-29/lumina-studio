import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../utils/gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const barRef = useRef(null)
  const counterRef = useRef(null)
  const numRef = useRef({ val: 0 })
  const tagRef = useRef(null)
  const nameRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(nameRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0
    )
    tl.fromTo(tagRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 }, 0.3
    )
    tl.to(numRef.current, {
      val: 100, duration: 2.0, ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) counterRef.current.textContent = Math.round(numRef.current.val)
      },
    }, 0.2)
    tl.to(barRef.current, {
      scaleX: 1, duration: 2.0, ease: 'power2.inOut',
    }, 0.2)
    tl.to(loaderRef.current, {
      yPercent: -100, duration: 1.0, ease: 'power4.inOut', delay: 0.2,
      onComplete: () => { ScrollTrigger.refresh(); onComplete?.() },
    })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0D0B09' }}>

      {/* Decorative lines */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(200,169,109,0.5) 80px, rgba(200,169,109,0.5) 81px)',
      }} />

      <div ref={nameRef} className="text-center mb-12 opacity-0">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-10 h-px" style={{ background: '#C8A96D' }} />
          <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.6rem', color: '#C8A96D', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
            Interior Design Studio
          </span>
          <div className="w-10 h-px" style={{ background: '#C8A96D' }} />
        </div>
        <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: 'clamp(4rem,12vw,7rem)', fontWeight: 300, color: '#F5EFE6', letterSpacing: '0.35em', lineHeight: 1 }}>
          LUMINA
        </p>
      </div>

      <div className="flex items-end gap-1 mb-5" ref={tagRef} style={{ opacity: 0 }}>
        <span ref={counterRef} style={{ fontFamily: '"Cormorant Garamond"', fontSize: '3.5rem', fontWeight: 300, color: '#F5EFE6', lineHeight: 1, tabularNums: true }}>0</span>
        <span style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.5rem', color: '#C8A96D', marginBottom: '0.4rem' }}>%</span>
      </div>

      <div className="overflow-hidden" style={{ width: '160px', height: '1px', background: 'rgba(200,169,109,0.15)' }}>
        <div ref={barRef} className="loader-bar" />
      </div>

      <p className="absolute bottom-10" style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.6rem', color: 'rgba(245,239,230,0.2)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
        Mumbai · Dubai · London
      </p>
    </div>
  )
}
