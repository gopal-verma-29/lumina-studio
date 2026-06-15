import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../utils/gsap'
import { useNavigate } from 'react-router-dom'
import { projects } from '../../data/projects'
import LazyImage from '../common/LazyImage'

const FILTERS = ['All', 'Residential', 'Commercial', 'Hospitality']

function WorkCard({ project }) {
  const cardRef = useRef(null)

  const onMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(cardRef.current, {
      rotateX: y * -9, rotateY: x * 9,
      duration: 0.4, ease: 'power2.out', transformPerspective: 900,
    })
  }

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0,
      duration: 0.7, ease: 'elastic.out(1, 0.5)', transformPerspective: 900,
    })
  }

  return (
    <div
      ref={cardRef}
      className="work-card group cursor-pointer"
      style={{ transformStyle: 'preserve-3d', background: '#131109', border: '1px solid #2A2518' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <LazyImage
          src={project.image} alt={project.title}
          className="absolute inset-0"
          imgClassName="card-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
          style={{ position: 'absolute', inset: 0 }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(13,11,9,0.18)', transition: 'background 0.4s' }} />

        {/* Hover overlay */}
        <div className="overlay absolute inset-0 flex flex-col items-start justify-end p-6"
          style={{ background: 'rgba(13,11,9,0.88)' }}>
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {project.tags.map(t => (
              <span key={t} style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.52rem', border: '1px solid rgba(245,239,230,0.14)', color: 'rgba(245,239,230,0.45)', padding: '0.18rem 0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t}</span>
            ))}
          </div>
          <p style={{ fontFamily: '"DM Sans"', fontSize: '0.8rem', color: 'rgba(245,239,230,0.6)', lineHeight: 1.65 }}>{project.description}</p>
          <div className="flex items-center gap-2 mt-3.5" style={{ color: '#C8A96D' }}>
            <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>View project</span>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between px-5 py-3.5" style={{ borderTop: '1px solid #2A2518' }}>
        <div>
          <p style={{ fontFamily: '"DM Sans"', fontWeight: 500, color: '#F5EFE6', fontSize: '0.92rem' }}>{project.title}</p>
          <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.56rem', color: 'rgba(245,239,230,0.28)', letterSpacing: '0.1em', marginTop: '2px' }}>
            {project.area} · {project.location}
          </p>
        </div>
        <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.56rem', color: 'rgba(245,239,230,0.18)', letterSpacing: '0.1em' }}>{project.year}</span>
      </div>
    </div>
  )
}

export default function Work({ preview = false, showFilter = true }) {
  const sectionRef  = useRef(null)
  const gridRef     = useRef(null)
  const navigate    = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = preview
    ? projects.slice(0, 3)
    : projects.filter(p => activeFilter === 'All' || p.category === activeFilter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.work-header'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.work-card')
    gsap.fromTo(cards,
      { y: 38, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.62, stagger: 0.09, ease: 'power3.out' }
    )
  }, [filtered])

  return (
    <section id="work" ref={sectionRef} className="py-20 md:py-32" style={{ background: '#100E0C' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div className="work-header flex flex-col md:flex-row md:items-end justify-between mb-9 gap-5 opacity-0">
          <div>
            <span className="section-label">{preview ? 'Selected work' : 'Portfolio'}</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', fontSize: 'clamp(2.2rem,5.5vw,5rem)', lineHeight: 1.05 }}>
              Work that<br />moves <em>people</em>.
            </h2>
          </div>
          <p style={{ fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.42)', fontSize: '0.88rem', lineHeight: 1.75, maxWidth: '260px' }}>
            Residential, commercial, and hospitality — across India and abroad.
          </p>
        </div>

        {/* Filter tabs — full portfolio only */}
        {showFilter && !preview && (
          <div className="flex flex-wrap gap-2 mb-9">
            {FILTERS.map(f => (
              <button key={f} className={`filter-tab ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}>
                {f}
                {f !== 'All' && (
                  <span style={{ marginLeft: '5px', opacity: 0.45, fontSize: '0.52rem' }}>
                    ({projects.filter(p => p.category === f).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => <WorkCard key={p.id} project={p} />)}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          {preview ? (
            <button className="btn-gold" onClick={() => navigate('/projects')}>
              View all projects
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          ) : (
            <button className="btn-outline-gold" onClick={() => navigate('/')}>
              ← Back to home
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
