import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../utils/gsap'
import { projects } from '../../data/projects'

const featured = projects.find(p => p.featured)

export default function FeaturedProject() {
  const sectionRef  = useRef(null)
  const pinRef      = useRef(null)
  const imgARef     = useRef(null)   // active image
  const imgBRef     = useRef(null)   // staging image (crossfade pair)
  const activeSlot  = useRef('A')    // which img el is currently visible
  const labelRef    = useRef(null)
  const progressRef = useRef(null)
  const roomNumRef  = useRef(null)
  const kenRef      = useRef(null)   // ken burns wrapper
  const stRef       = useRef(null)

  // ── Clip-path crossfade between image pair ──────────────────────────────────
  const crossfadeTo = (url, name) => {
    const incoming = activeSlot.current === 'A' ? imgBRef.current : imgARef.current
    const outgoing = activeSlot.current === 'A' ? imgARef.current : imgBRef.current
    if (!incoming || !outgoing) return

    incoming.src = url
    incoming.style.clipPath = 'inset(0 100% 0 0)'
    incoming.style.zIndex   = '2'
    outgoing.style.zIndex   = '1'

    gsap.to(incoming, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.85,
      ease: 'power4.inOut',
    })

    activeSlot.current = activeSlot.current === 'A' ? 'B' : 'A'
  }

  // ── Build ScrollTrigger pin ─────────────────────────────────────────────────
  const buildPin = () => {
    if (!featured?.rooms || !pinRef.current) return
    if (stRef.current) { stRef.current.kill(); stRef.current = null }

    const rooms = featured.rooms
    let lastIdx = -1

    stRef.current = ScrollTrigger.create({
      trigger: pinRef.current,
      start: 'top top',
      end: `+=${window.innerHeight * (rooms.length + 0.5)}`,
      pin: true,
      anticipatePin: 1,
      onUpdate(self) {
        const idx = Math.min(Math.floor(self.progress * rooms.length), rooms.length - 1)
        const room = rooms[idx]

        // Only update when room actually changes
        if (idx !== lastIdx) {
          lastIdx = idx
          crossfadeTo(room.image, room.name)

          // Label — clip-path wipe up
          if (labelRef.current) {
            gsap.fromTo(labelRef.current,
              { clipPath: 'inset(0 0 100% 0)', y: 12 },
              { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.6, ease: 'power3.out' }
            )
            labelRef.current.textContent = room.name
          }

          // Room counter
          if (roomNumRef.current) {
            gsap.fromTo(roomNumRef.current,
              { opacity: 0, y: 8 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            )
            roomNumRef.current.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(rooms.length).padStart(2, '0')}`
          }
        }

        // Progress bar — smooth
        if (progressRef.current) {
          progressRef.current.style.width = `${self.progress * 100}%`
        }

        // Ken Burns — subtle scale shift per room
        if (kenRef.current) {
          const targetScale = 1 + (idx * 0.015)
          gsap.to(kenRef.current, { scale: targetScale, duration: 1.2, ease: 'power2.out' })
        }
      },
    })
  }

  useEffect(() => {
    if (!featured?.rooms) return

    // Set initial images
    if (imgARef.current) imgARef.current.src = featured.rooms[0].image
    if (imgBRef.current) imgBRef.current.src = featured.rooms[0].image

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(sectionRef.current.querySelector('.fp-header'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )

      const t = setTimeout(buildPin, 200)

      let rTimer
      const onResize = () => {
        clearTimeout(rTimer)
        rTimer = setTimeout(() => { buildPin(); ScrollTrigger.refresh() }, 250)
      }
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

      {/* ── Header ── */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="fp-header flex flex-col md:flex-row md:items-end justify-between gap-6 opacity-0">
          <div>
            <span className="section-label">Signature project</span>
            <h2 style={{
              fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6',
              fontSize: 'clamp(2.2rem,5.5vw,5rem)', lineHeight: 1.05
            }}>
              {featured.title}
            </h2>
            <p style={{
              fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.35)',
              marginTop: '0.5rem', fontSize: '0.82rem', letterSpacing: '0.04em'
            }}>
              {featured.location} · {featured.area} · {featured.year}
            </p>
          </div>
          <p style={{
            fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.38)',
            fontSize: '0.86rem', lineHeight: 1.8, maxWidth: '300px'
          }}>
            {featured.description}
          </p>
        </div>
      </div>

      {/* ── Pinned viewport ── */}
      <div ref={pinRef} className="relative w-full overflow-hidden" style={{ height: '100vh' }}>

        {/* Ken Burns wrapper — scales slightly per room */}
        <div ref={kenRef} className="absolute inset-0" style={{ willChange: 'transform', transformOrigin: 'center center' }}>
          {/* Image pair for clip-path crossfade */}
          <img ref={imgARef} alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ zIndex: 1 }} />
          <img ref={imgBRef} alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ zIndex: 0, clipPath: 'inset(0 100% 0 0)' }} />
        </div>

        {/* Scrim — left-weighted */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(105deg, rgba(13,11,9,0.88) 0%, rgba(13,11,9,0.5) 40%, rgba(13,11,9,0.1) 70%, transparent 100%)',
          zIndex: 5
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(13,11,9,0.9) 0%, rgba(13,11,9,0.1) 40%, transparent 70%)',
          zIndex: 5
        }} />

        {/* ── Room label — main ── */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center px-8 md:px-16"
          style={{ maxWidth: '640px' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px" style={{ background: '#C8A96D' }} />
            <span style={{
              fontFamily: '"JetBrains Mono"', fontSize: '0.56rem',
              color: 'rgba(200,169,109,0.7)', letterSpacing: '0.28em', textTransform: 'uppercase'
            }}>
              Scroll to explore
            </span>
          </div>

          <div ref={labelRef} style={{
            fontFamily: '"Cormorant Garamond"',
            fontSize: 'clamp(3.5rem,9vw,8rem)',
            fontWeight: 300, color: '#F5EFE6', lineHeight: 0.95,
            letterSpacing: '-0.01em',
            clipPath: 'inset(0 0 0% 0)',
          }}>
            {featured.rooms[0].name}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {featured.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: '"JetBrains Mono"', fontSize: '0.54rem',
                color: 'rgba(200,169,109,0.55)', border: '1px solid rgba(200,169,109,0.15)',
                padding: '0.28rem 0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Specs — top right ── */}
        <div className="absolute top-8 right-8 md:right-14 z-10 hidden md:flex flex-col items-end gap-4">
          {[['Area', featured.area], ['Style', featured.style], ['Year', featured.year]].map(([k, v]) => (
            <div key={k} className="text-right">
              <span style={{
                fontFamily: '"JetBrains Mono"', fontSize: '0.48rem',
                color: 'rgba(245,239,230,0.22)', letterSpacing: '0.18em',
                textTransform: 'uppercase', display: 'block', marginBottom: '2px'
              }}>{k}</span>
              <span style={{ fontFamily: '"DM Sans"', fontSize: '0.76rem', color: 'rgba(245,239,230,0.6)' }}>{v}</span>
            </div>
          ))}
        </div>

        {/* ── Room counter — top left ── */}
        <div ref={roomNumRef} className="absolute top-8 left-8 md:left-16 z-10" style={{
          fontFamily: '"JetBrains Mono"', fontSize: '0.58rem',
          color: 'rgba(200,169,109,0.5)', letterSpacing: '0.2em'
        }}>
          01 / {String(featured.rooms.length).padStart(2, '0')}
        </div>

        {/* ── Progress bar — bottom ── */}
        <div className="absolute bottom-8 left-8 md:left-14 right-8 md:right-14 z-10">
          <div className="flex justify-between mb-2">
            {featured.rooms.map(r => (
              <span key={r.name} style={{
                fontFamily: '"JetBrains Mono"', fontSize: '0.48rem',
                color: 'rgba(245,239,230,0.2)', letterSpacing: '0.18em', textTransform: 'uppercase'
              }}>{r.name}</span>
            ))}
          </div>
          {/* Track */}
          <div style={{ height: '1px', background: 'rgba(245,239,230,0.07)', width: '100%', position: 'relative' }}>
            <div ref={progressRef} style={{
              position: 'absolute', left: 0, top: 0, height: '100%',
              background: 'linear-gradient(to right, #8B7355, #C8A96D, #e8d4a8)',
              transition: 'width 0.1s linear',
              width: `${(1 / featured.rooms.length) * 100}%`,
              boxShadow: '0 0 8px rgba(200,169,109,0.4)',
            }} />
          </div>
        </div>

        {/* ── Vertical grain vignette — right edge ── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 100% at 100% 50%, rgba(13,11,9,0.35) 0%, transparent 70%)',
          zIndex: 6
        }} />

      </div>
    </section>
  )
}
