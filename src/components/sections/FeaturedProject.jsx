import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../utils/gsap'
import { projects } from '../../data/projects'

const featured = projects.find(p => p.featured)

export default function FeaturedProject() {
  const sectionRef  = useRef(null)
  const pinRef      = useRef(null)
  const imgRef      = useRef(null)
  const labelRef    = useRef(null)
  const progressRef = useRef(null)
  const stRef       = useRef(null)   // keep ScrollTrigger instance for kill/refresh

  const buildPin = () => {
    if (!featured?.rooms || !pinRef.current) return

    // Kill existing before re-creating
    if (stRef.current) { stRef.current.kill(); stRef.current = null }

    const rooms = featured.rooms
    stRef.current = ScrollTrigger.create({
      trigger: pinRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * (rooms.length + 0.5)}`,
      pin: true,
      anticipatePin: 1,
      onUpdate(self) {
        const idx = Math.min(Math.floor(self.progress * rooms.length), rooms.length - 1)
        const room = rooms[idx]
        if (imgRef.current && imgRef.current.src !== room.image) {
          gsap.to(imgRef.current, { opacity: 0, duration: 0.25, onComplete: () => {
            imgRef.current.src = room.image
            gsap.to(imgRef.current, { opacity: 1, duration: 0.4 })
          }})
        }
        if (labelRef.current) labelRef.current.textContent = room.name
        if (progressRef.current) {
          progressRef.current.style.width = `${((idx + 1) / rooms.length) * 100}%`
        }
      },
    })
  }

  useEffect(() => {
    if (!featured?.rooms) return

    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.fp-header'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
      // Build pin after small settle delay
      const t = setTimeout(buildPin, 200)

      // Rebuild on resize — debounced
      let rTimer
      const onResize = () => { clearTimeout(rTimer); rTimer = setTimeout(() => { buildPin(); ScrollTrigger.refresh() }, 250) }
      window.addEventListener('resize', onResize)

      return () => {
        clearTimeout(t)
        clearTimeout(rTimer)
        window.removeEventListener('resize', onResize)
        if (stRef.current) stRef.current.kill()
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  if (!featured) return null

  return (
    <section ref={sectionRef}>
      {/* Header */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="fp-header flex flex-col md:flex-row md:items-end justify-between gap-6 opacity-0">
          <div>
            <span className="section-label">Signature project</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', fontSize: 'clamp(2.2rem,5.5vw,5rem)', lineHeight: 1.05 }}>
              {featured.title}
            </h2>
            <p style={{ fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.4)', marginTop: '0.5rem', fontSize: '0.85rem', letterSpacing: '0.04em' }}>
              {featured.location} · {featured.area} · {featured.year}
            </p>
          </div>
          <p style={{ fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.42)', fontSize: '0.88rem', lineHeight: 1.75, maxWidth: '320px' }}>
            {featured.description}
          </p>
        </div>
      </div>

      {/* Pinned viewport */}
      <div ref={pinRef} className="relative w-full overflow-hidden" style={{ height: '100vh' }}>
        <img ref={imgRef} src={featured.rooms[0].image} alt={featured.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 0 }} />

        {/* Scrim */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,11,9,0.78) 0%, rgba(13,11,9,0.15) 55%, transparent 100%)', zIndex: 1 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,11,9,0.85) 0%, transparent 45%)', zIndex: 1 }} />

        {/* Room label */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16" style={{ maxWidth: '600px' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px" style={{ background: '#C8A96D' }} />
            <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: '#C8A96D', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Scroll to explore</span>
          </div>
          <div ref={labelRef} style={{ fontFamily: '"Cormorant Garamond"', fontSize: 'clamp(3.5rem,9vw,7.5rem)', fontWeight: 300, color: '#F5EFE6', lineHeight: 1, letterSpacing: '-0.01em' }}>
            {featured.rooms[0].name}
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            {featured.tags.map(tag => (
              <span key={tag} style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.56rem', color: 'rgba(200,169,109,0.65)', border: '1px solid rgba(200,169,109,0.18)', padding: '0.28rem 0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Project specs — top right */}
        <div className="absolute top-8 right-8 md:right-14 z-10 hidden md:flex flex-col items-end gap-3">
          {[['Area', featured.area], ['Style', featured.style], ['Year', featured.year]].map(([k, v]) => (
            <div key={k} className="text-right">
              <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.5rem', color: 'rgba(245,239,230,0.28)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block' }}>{k}</span>
              <span style={{ fontFamily: '"DM Sans"', fontSize: '0.78rem', color: 'rgba(245,239,230,0.65)' }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-8 md:left-14 right-8 md:right-14 z-10">
          <div className="flex justify-between mb-1.5">
            {featured.rooms.map(r => (
              <span key={r.name} style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.5rem', color: 'rgba(245,239,230,0.25)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{r.name}</span>
            ))}
          </div>
          <div style={{ height: '1px', background: 'rgba(245,239,230,0.08)', width: '100%', position: 'relative' }}>
            <div ref={progressRef} style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: '#C8A96D', transition: 'width 0.25s ease', width: '25%' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
