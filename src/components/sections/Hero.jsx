import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../../utils/gsap'

const slides = [
  { image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=85&auto=format&fit=crop', label: 'Living' },
  { image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=85&auto=format&fit=crop', label: 'Hospitality' },
  { image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=85&auto=format&fit=crop', label: 'Bedroom' },
  { image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1400&q=85&auto=format&fit=crop', label: 'Dining' },
]

// ─── Particle System ──────────────────────────────────────────────────────────
class Particle {
  constructor(w, h) { this.reset(w, h) }
  reset(w, h) {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.baseX = this.x
    this.baseY = this.y
    this.size = Math.random() * 1.6 + 0.3
    this.speedX = (Math.random() - 0.5) * 0.18
    this.speedY = (Math.random() - 0.5) * 0.12
    // gold, stone, mist palette
    const palettes = [
      `rgba(200,169,109,${Math.random() * 0.55 + 0.15})`,
      `rgba(181,160,144,${Math.random() * 0.4 + 0.1})`,
      `rgba(245,239,230,${Math.random() * 0.22 + 0.05})`,
    ]
    this.color = palettes[Math.floor(Math.random() * palettes.length)]
    this.life = Math.random() * Math.PI * 2  // phase offset
    this.lifeSpeed = Math.random() * 0.008 + 0.003
    this.mouseInfluence = Math.random() * 0.6 + 0.2
  }
  update(mx, my, w, h) {
    this.life += this.lifeSpeed
    this.x += this.speedX + Math.sin(this.life * 0.7) * 0.04
    this.y += this.speedY + Math.cos(this.life * 0.5) * 0.03

    // Mouse repulsion — subtle, organic
    const dx = this.x - mx
    const dy = this.y - my
    const dist = Math.sqrt(dx * dx + dy * dy)
    const repelRadius = 120
    if (dist < repelRadius && dist > 0) {
      const force = (1 - dist / repelRadius) * 1.8 * this.mouseInfluence
      this.x += (dx / dist) * force
      this.y += (dy / dist) * force
    }

    // Drift back to base over time
    this.x += (this.baseX - this.x) * 0.004
    this.y += (this.baseY - this.y) * 0.004

    // Wrap edges
    if (this.x < -5) this.x = w + 5
    if (this.x > w + 5) this.x = -5
    if (this.y < -5) this.y = h + 5
    if (this.y > h + 5) this.y = -5
  }
  draw(ctx) {
    const alpha = (Math.sin(this.life) * 0.4 + 0.6)
    ctx.globalAlpha = alpha
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

// ─── Mesh Blob ────────────────────────────────────────────────────────────────
class MeshBlob {
  constructor(x, y, r, colorStops, speedX, speedY) {
    this.x = x; this.y = y; this.r = r
    this.targetX = x; this.targetY = y
    this.colorStops = colorStops
    this.vx = speedX; this.vy = speedY
    this.life = Math.random() * Math.PI * 2
    this.lifeSpeed = 0.003 + Math.random() * 0.003
    this.currentX = x; this.currentY = y
  }
  update(mouseX, mouseY, w, h) {
    this.life += this.lifeSpeed
    // Organic drift
    this.targetX = this.x + Math.sin(this.life * 0.8) * w * 0.12
    this.targetY = this.y + Math.cos(this.life * 0.6) * h * 0.1
    // Lazy follow of mouse
    this.targetX += (mouseX - w * 0.5) * 0.04
    this.targetY += (mouseY - h * 0.5) * 0.025
    // Lerp
    this.currentX += (this.targetX - this.currentX) * 0.018
    this.currentY += (this.targetY - this.currentY) * 0.018
  }
  draw(ctx) {
    const grad = ctx.createRadialGradient(this.currentX, this.currentY, 0, this.currentX, this.currentY, this.r)
    this.colorStops.forEach(([stop, color]) => grad.addColorStop(stop, color))
    ctx.globalAlpha = 1
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(this.currentX, this.currentY, this.r, 0, Math.PI * 2)
    ctx.fill()
  }
}

// ─── Word Split ───────────────────────────────────────────────────────────────
function SplitWords({ text, className = '' }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i, arr) => (
        <span key={i} className="word-split">
          <span className="inner">{w}</span>
          {i < arr.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const heroRef     = useRef(null)
  const canvasRef   = useRef(null)
  const metaRef     = useRef(null)
  const cueRef      = useRef(null)
  const previewRef  = useRef(null)
  const frameRef    = useRef(null)
  const particlesRef = useRef([])
  const blobsRef    = useRef([])
  const mouseRef    = useRef({ x: -9999, y: -9999 })

  const [current, setCurrent] = useState(0)

  // Slide auto-advance
  useEffect(() => {
    const iv = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5800)
    return () => clearInterval(iv)
  }, [])

  // Canvas init + animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = 0, H = 0, raf

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight

      // Re-seed particles on resize
      const COUNT = Math.min(Math.floor((W * H) / 1100), 1800)
      particlesRef.current = Array.from({ length: COUNT }, () => new Particle(W, H))

      // Three mesh blobs
      blobsRef.current = [
        new MeshBlob(W * 0.72, H * 0.35, W * 0.38,
          [[0, 'rgba(200,169,109,0.09)'], [0.5, 'rgba(200,169,109,0.04)'], [1, 'transparent']],
          0.12, 0.08),
        new MeshBlob(W * 0.55, H * 0.65, W * 0.3,
          [[0, 'rgba(181,160,144,0.07)'], [0.6, 'rgba(181,160,144,0.02)'], [1, 'transparent']],
          -0.08, 0.1),
        new MeshBlob(W * 0.85, H * 0.55, W * 0.22,
          [[0, 'rgba(200,169,109,0.06)'], [1, 'transparent']],
          0.05, -0.06),
      ]
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Draw blobs (behind particles)
      ctx.globalCompositeOperation = 'screen'
      blobsRef.current.forEach(b => { b.update(mx, my, W, H); b.draw(ctx) })

      // Draw particles
      ctx.globalCompositeOperation = 'source-over'
      particlesRef.current.forEach(p => { p.update(mx, my, W, H); p.draw(ctx) })

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  // GSAP entrance + scroll parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 2.1 })

      tl.fromTo(heroRef.current.querySelectorAll('.word-split .inner'),
        { y: '115%' },
        { y: '0%', duration: 1.2, ease: 'power4.out', stagger: 0.06 }, 0)

      tl.fromTo(metaRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, 0.75)

      tl.fromTo(cueRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }, 1.5)

      // Preview panel entrance
      if (previewRef.current) {
        tl.fromTo(previewRef.current,
          { opacity: 0, x: 40, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power4.inOut' }, 0.3)
      }

      // Subtle canvas fade in
      tl.fromTo(canvasRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2.5, ease: 'power2.out' }, 0)

      // Scroll parallax — canvas drifts up slower than content
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 2,
        onUpdate: self => {
          if (canvasRef.current) gsap.set(canvasRef.current, { y: self.progress * -60 })
          if (previewRef.current) gsap.set(previewRef.current, { y: self.progress * -40 })
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* ── Canvas layer: particles + mesh blobs ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-0"
        style={{ zIndex: 1, pointerEvents: 'none' }}
      />

      {/* ── Deep background gradient  ── */}
      <div className="absolute inset-0" style={{ zIndex: 0,
        background: 'radial-gradient(ellipse 80% 70% at 70% 40%, rgba(26,23,20,0.95) 0%, #0D0B09 100%)'
      }} />

      {/* ── Grain texture ── */}
      <div className="grain-overlay" style={{ zIndex: 2, opacity: 0.038 }} />

      {/* ── Photo preview panel — right side ── */}
      <div
        ref={previewRef}
        className="absolute hidden lg:block"
        style={{
          right: 0, top: 0, bottom: 0,
          width: '38vw', zIndex: 3,
          clipPath: 'inset(0 0 0 0)',
          opacity: 0,
        }}
      >
        {/* Stacked slide images */}
        {slides.map((slide, i) => (
          <div key={i}
            className="absolute inset-0 transition-opacity"
            style={{
              opacity: i === current ? 1 : 0,
              transitionDuration: '1600ms',
              transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <img
              src={slide.image}
              alt={slide.label}
              className="w-full h-full object-cover object-center"
              style={{ transform: i === current ? 'scale(1.04)' : 'scale(1.0)', transition: 'transform 6s ease-out' }}
            />
            {/* Left-edge fade into dark bg */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to right, #0D0B09 0%, rgba(13,11,9,0.65) 30%, rgba(13,11,9,0.1) 100%)'
            }} />
            {/* top/bottom vignette */}
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to bottom, rgba(13,11,9,0.5) 0%, transparent 25%, transparent 75%, rgba(13,11,9,0.6) 100%)'
            }} />
          </div>
        ))}

        {/* Room label overlay — bottom right of preview */}
        <div className="absolute bottom-12 right-10 z-10 flex flex-col items-end gap-2">
          {slides.map((slide, i) => (
            <button key={i}
              onClick={() => setCurrent(i)}
              className="flex items-center gap-2.5 group"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <div style={{
                width: i === current ? '28px' : '12px', height: '1px',
                background: i === current ? '#C8A96D' : 'rgba(245,239,230,0.18)',
                transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)'
              }} />
              <span style={{
                fontFamily: '"JetBrains Mono"', fontSize: '0.56rem',
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: i === current ? '#C8A96D' : 'rgba(245,239,230,0.22)',
                transition: 'color 0.4s'
              }}>
                {slide.label}
              </span>
            </button>
          ))}
        </div>

        {/* Thin gold border line — left edge of panel */}
        <div className="absolute left-0 top-0 bottom-0" style={{
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(200,169,109,0.25) 20%, rgba(200,169,109,0.35) 50%, rgba(200,169,109,0.25) 80%, transparent)'
        }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 pt-28 lg:pr-[42vw]">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <div style={{ width: '36px', height: '1px', background: 'linear-gradient(to right, transparent, #C8A96D)' }} />
          <span style={{
            fontFamily: '"JetBrains Mono"', fontSize: '0.6rem',
            color: 'rgba(200,169,109,0.7)', letterSpacing: '0.3em', textTransform: 'uppercase'
          }}>
            Est. 2012 · Mumbai · Dubai · London
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: '"Cormorant Garamond"', fontWeight: 300,
          lineHeight: 1.0, color: '#F5EFE6', overflow: 'hidden', marginBottom: '2.5rem'
        }}>
          <div style={{ fontSize: 'clamp(3rem,8.5vw,8.5rem)', overflow: 'hidden' }}>
            <SplitWords text="We design" />
          </div>
          <div style={{ fontSize: 'clamp(3rem,8.5vw,8.5rem)', overflow: 'hidden', fontStyle: 'italic' }}>
            <SplitWords text="spaces that" />
          </div>
          <div style={{ fontSize: 'clamp(3rem,8.5vw,8.5rem)', overflow: 'hidden' }}>
            <SplitWords text="feel inevitable." />
          </div>
        </h1>

        {/* Meta row */}
        <div ref={metaRef} className="flex flex-col gap-8 opacity-0">
          <p style={{
            fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.48)',
            fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, maxWidth: '400px'
          }}>
            Interior architecture, spatial design, and FF&E — crafted for those who refuse to live in ordinary spaces.
          </p>

          {/* Stats row */}
          <div className="flex gap-8 md:gap-12">
            {[['180+', 'Projects'], ['12', 'Years'], ['3', 'Studios']].map(([num, label]) => (
              <div key={label} className="flex flex-col gap-1">
                <span style={{
                  fontFamily: '"Cormorant Garamond"', fontSize: '2rem', fontWeight: 300,
                  color: '#C8A96D', lineHeight: 1
                }}>{num}</span>
                <span style={{
                  fontFamily: '"JetBrains Mono"', fontSize: '0.52rem',
                  color: 'rgba(245,239,230,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase'
                }}>{label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="btn-gold"
              onClick={() => document.querySelector('#enquiry')?.scrollIntoView({ behavior: 'smooth' })}>
              Begin your project
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="btn-outline-gold"
              onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}>
              View portfolio
            </button>
          </div>
        </div>
      </div>

      {/* ── Slide counter — bottom left ── */}
      <div className="absolute bottom-10 left-8 z-10 hidden md:flex items-center gap-3">
        <span style={{
          fontFamily: '"JetBrains Mono"', fontSize: '0.56rem',
          color: '#C8A96D', letterSpacing: '0.2em'
        }}>
          {String(current + 1).padStart(2, '0')}
        </span>
        <div style={{ width: '32px', height: '1px', background: 'rgba(200,169,109,0.25)' }}>
          <div style={{
            height: '100%', background: '#C8A96D',
            width: `${((current + 1) / slides.length) * 100}%`,
            transition: 'width 0.5s ease'
          }} />
        </div>
        <span style={{
          fontFamily: '"JetBrains Mono"', fontSize: '0.56rem',
          color: 'rgba(245,239,230,0.2)', letterSpacing: '0.2em'
        }}>
          {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Scroll cue ── */}
      <div ref={cueRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 z-10 cursor-pointer"
        onClick={() => document.querySelector('#marquee')?.scrollIntoView({ behavior: 'smooth' })}>
        <span style={{
          fontFamily: '"JetBrains Mono"', fontSize: '0.54rem',
          color: 'rgba(245,239,230,0.2)', letterSpacing: '0.3em', textTransform: 'uppercase'
        }}>Explore</span>
        <div className="w-px h-14 scroll-cue" style={{
          background: 'linear-gradient(to bottom, rgba(200,169,109,0.5), transparent)'
        }} />
      </div>

    </section>
  )
}
