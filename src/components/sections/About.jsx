import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'
import { teamMembers } from '../../data/testimonials'
import LazyImage from '../common/LazyImage'

const pillars = [
  { title: 'Spatial', icon: '◈', body: 'We think in three dimensions — volume, light, proportion, and the way a room feels when you first enter it.' },
  { title: 'Material', icon: '◆', body: 'Every finish, fabric, and fixture is touched before it is specified. We trust our hands as much as our eyes.' },
  { title: 'Lived', icon: '◌', body: 'Beautiful spaces are only as good as the life they support. We design for how people actually inhabit a room.' },
]

export default function About() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.4, ease: 'power4.inOut',
          scrollTrigger: { trigger: imageRef.current, start: 'top 78%' } }
      )
      gsap.to(imageRef.current.querySelector('img'), {
        yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      })
      gsap.fromTo(sectionRef.current.querySelectorAll('.reveal-el'),
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.13, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.about-text'), start: 'top 78%' } }
      )
      gsap.fromTo(sectionRef.current.querySelectorAll('.pillar'),
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.pillars'), start: 'top 82%' } }
      )
      gsap.fromTo(sectionRef.current.querySelectorAll('.team-card'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current.querySelector('.team-grid'), start: 'top 82%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-36" style={{ background: '#0D0B09' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

        {/* Headline row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="section-label">The studio</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', fontSize: 'clamp(2.5rem,6vw,5.5rem)', lineHeight: 1.05 }}>
              Space is the<br /><em>medium. Life</em> is the brief.
            </h2>
          </div>
          <p style={{ fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.45)', fontSize: '0.9rem', lineHeight: 1.8, maxWidth: '340px' }}>
            Founded in 2012, LUMINA is a Mumbai-based interior design studio working across residential, commercial, and hospitality projects worldwide.
          </p>
        </div>

        {/* Image + text grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start mb-20">
          {/* Image */}
          <div ref={imageRef} className="relative overflow-hidden" style={{ aspectRatio: '3/4', clipPath: 'inset(0 100% 0 0)' }}>
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=85&auto=format&fit=crop"
              alt="LUMINA studio atelier"
              className="w-full h-full object-cover object-center"
              style={{ transform: 'scale(1.12)' }}
            />
            <div className="absolute inset-0" style={{ background: 'rgba(13,11,9,0.18)' }} />
            <div className="absolute bottom-6 right-6 border px-4 py-3"
              style={{ borderColor: 'rgba(200,169,109,0.25)', background: 'rgba(13,11,9,0.7)' }}>
              <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(200,169,109,0.7)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Atelier · BKC, Mumbai
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="about-text flex flex-col gap-8">
            <p className="reveal-el" style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.7rem', fontWeight: 300, color: 'rgba(245,239,230,0.85)', lineHeight: 1.5, fontStyle: 'italic' }}>
              "We believe the most beautiful spaces are not designed for photographs. They are designed for the specific, irreplaceable way a particular person moves through a room at 7am."
            </p>
            <p className="reveal-el" style={{ fontFamily: '"DM Sans"', fontSize: '0.9rem', color: 'rgba(245,239,230,0.5)', lineHeight: 1.8 }}>
              — Anika Sharma, Founder & Principal Designer
            </p>

            {/* Pillars */}
            <div className="pillars flex flex-col gap-5 mt-2">
              {pillars.map((p, i) => (
                <div key={i} className="pillar flex gap-5 items-start pl-5"
                  style={{ borderLeft: '2px solid rgba(200,169,109,0.25)' }}>
                  <span style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.4rem', color: '#C8A96D', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{p.icon}</span>
                  <div>
                    <p style={{ fontFamily: '"DM Sans"', fontWeight: 600, fontSize: '0.82rem', color: '#C8A96D', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{p.title}</p>
                    <p style={{ fontFamily: '"DM Sans"', fontSize: '0.83rem', color: 'rgba(245,239,230,0.5)', lineHeight: 1.65 }}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="reveal-el flex flex-wrap gap-8 pt-6" style={{ borderTop: '1px solid #2A2518' }}>
              {[['12', 'Years'], ['180+', 'Projects'], ['2.4M', 'Sq ft'], ['12', 'Countries']].map(([val, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '2.5rem', fontWeight: 300, color: '#C8A96D', lineHeight: 1 }}>{val}</p>
                  <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(245,239,230,0.35)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '4px' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-6 h-px" style={{ background: '#C8A96D' }} />
            <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.62rem', color: '#C8A96D', letterSpacing: '0.25em', textTransform: 'uppercase' }}>The team</span>
          </div>
          <div className="team-grid grid grid-cols-2 md:grid-cols-4 gap-4">
            {teamMembers.map((member, i) => (
              <div key={i} className="team-card group opacity-0">
                <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '3/4' }}>
                  <img src={member.image} alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 transition-opacity duration-400 opacity-0 group-hover:opacity-100"
                    style={{ background: 'linear-gradient(to top, rgba(13,11,9,0.85) 0%, transparent 60%)' }}>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p style={{ fontFamily: '"DM Sans"', fontSize: '0.72rem', color: 'rgba(245,239,230,0.65)', lineHeight: 1.5 }}>{member.speciality}</p>
                    </div>
                  </div>
                </div>
                <p style={{ fontFamily: '"DM Sans"', fontWeight: 500, color: '#F5EFE6', fontSize: '0.9rem' }}>{member.name}</p>
                <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: '#C8A96D', letterSpacing: '0.1em', marginTop: '3px', textTransform: 'uppercase' }}>{member.role}</p>
                <p style={{ fontFamily: '"DM Sans"', fontSize: '0.75rem', color: 'rgba(245,239,230,0.35)', lineHeight: 1.55, marginTop: '6px' }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
