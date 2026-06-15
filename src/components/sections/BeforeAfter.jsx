import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../utils/gsap'
import { beforeAfterProjects } from '../../data/projects'

function BASlider({ project }) {
  const containerRef = useRef(null)
  const handleRef = useRef(null)
  const afterRef = useRef(null)
  const [pct, setPct] = useState(50)
  const dragging = useRef(false)

  const update = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect()
    const p = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98)
    setPct(p)
  }

  const onMouseDown = (e) => { dragging.current = true; e.preventDefault() }
  const onMouseMove = (e) => { if (dragging.current) update(e.clientX) }
  const onMouseUp   = () => { dragging.current = false }
  const onTouchMove = (e) => { if (dragging.current) update(e.touches[0].clientX) }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onMouseUp)
    }
  })

  return (
    <div ref={containerRef} className="ba-slider relative select-none overflow-hidden"
      style={{ aspectRatio: '16/9', cursor: 'ew-resize', background: '#1A1714' }}>

      {/* BEFORE */}
      <img src={project.before} alt="Before"
        className="absolute inset-0 w-full h-full object-cover object-center" style={{ zIndex: 1 }} />

      {/* AFTER — clipped */}
      <div ref={afterRef} className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pct}%)`, zIndex: 2 }}>
        <img src={project.after} alt="After"
          className="absolute inset-0 w-full h-full object-cover object-center" />
      </div>

      {/* Handle */}
      <div ref={handleRef} className="ba-handle absolute top-0 bottom-0"
        style={{ left: `${pct}%`, transform: 'translateX(-50%)', zIndex: 10 }}
        onMouseDown={onMouseDown}
        onTouchStart={(e) => { dragging.current = true }}>
        <div className="ba-handle-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M8 12H4m0 0l3-3M4 12l3 3M16 12h4m0 0l-3-3m3 3l-3 3" stroke="#C8A96D" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(245,239,230,0.5)', letterSpacing: '0.25em', textTransform: 'uppercase', background: 'rgba(13,11,9,0.7)', padding: '0.3rem 0.6rem' }}>Before</span>
      </div>
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: '#C8A96D', letterSpacing: '0.25em', textTransform: 'uppercase', background: 'rgba(13,11,9,0.7)', padding: '0.3rem 0.6rem' }}>After</span>
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.ba-header'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      gsap.fromTo(sectionRef.current.querySelectorAll('.ba-card'),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.ba-grid'), start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="transformations" ref={sectionRef} className="py-24 md:py-36" style={{ background: '#0D0B09' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="ba-header flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 opacity-0">
          <div>
            <span className="section-label">Transformations</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', fontSize: 'clamp(2.5rem,6vw,5.5rem)', lineHeight: 1.05 }}>
              The power of<br /><em>what changes</em>.
            </h2>
          </div>
          <p style={{ fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.45)', fontSize: '0.9rem', lineHeight: 1.75, maxWidth: '320px' }}>
            Drag the handle to reveal the transformation. Every before was someone's normal — until we made it extraordinary.
          </p>
        </div>

        <div className="ba-grid flex flex-col gap-10">
          {beforeAfterProjects.map((project, i) => (
            <div key={project.id} className="ba-card opacity-0">
              <BASlider project={project} />
              <div className="flex items-center justify-between mt-4 px-1">
                <div>
                  <p style={{ fontFamily: '"DM Sans"', fontWeight: 500, color: '#F5EFE6', fontSize: '0.95rem' }}>{project.title}</p>
                  <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(245,239,230,0.3)', letterSpacing: '0.12em', marginTop: '3px' }}>{project.location}</p>
                </div>
                <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(200,169,109,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  ← Drag →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
