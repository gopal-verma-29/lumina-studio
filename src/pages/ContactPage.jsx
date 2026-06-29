import { useEffect, useRef, useState } from 'react'
import { gsap } from '../utils/gsap'

// ─── DATA ────────────────────────────────────────────────────────────────────

const offices = [
  {
    city: 'Mumbai',
    tag: 'Headquarters',
    address: '14th Floor, The Platina\nBandra Kurla Complex\nMumbai 400 051',
    phone: '+91 98765 43210',
    email: 'mumbai@lumina.studio',
    hours: 'Mon – Sat · 10am – 7pm IST',
    coordinates: '19.0596° N, 72.8656° E',
    mapsUrl: 'https://maps.google.com/?q=Bandra+Kurla+Complex+Mumbai',
  },
  {
    city: 'Dubai',
    tag: 'Middle East',
    address: 'DIFC Gate Avenue\nLevel 3, South Tower\nDubai, UAE',
    phone: '+971 4 000 0000',
    email: 'dubai@lumina.studio',
    hours: 'Sun – Thu · 9am – 6pm GST',
    coordinates: '25.2048° N, 55.2708° E',
    mapsUrl: 'https://maps.google.com/?q=DIFC+Dubai',
  },
  {
    city: 'London',
    tag: 'Europe',
    address: '12 Shoreditch High Street\nFloor 4\nLondon E1 6PG',
    phone: '+44 20 0000 0000',
    email: 'london@lumina.studio',
    hours: 'Mon – Fri · 9am – 6pm GMT',
    coordinates: '51.5227° N, 0.0781° W',
    mapsUrl: 'https://maps.google.com/?q=Shoreditch+High+Street+London',
  },
]

const faqs = [
  {
    q: 'What is the minimum project size you take on?',
    a: 'We work on projects from ₹40L upwards for residential interiors, and from ₹1Cr for commercial and hospitality. What matters more than budget is ambition — we are selective about projects where great design will make a meaningful difference.',
  },
  {
    q: 'How does the first meeting work?',
    a: 'A discovery call with our principal designer, typically 45 minutes over video or in person at our Mumbai atelier. No presentation required from you — just the space, your thinking, and an honest conversation about whether we are the right fit for each other.',
  },
  {
    q: 'Do you work on projects outside India?',
    a: 'Yes. We have completed projects in Dubai, Singapore, London, and New York. Our procurement network is global and we have established relationships with contractors and suppliers in most major cities. Travel and coordination costs are factored into international project fees.',
  },
  {
    q: 'Can we visit your studio?',
    a: 'Absolutely — and we encourage it. Our BKC atelier has a curated material library with over 400 samples, and seeing materials in person changes everything. Visits are by appointment. Use the form here or WhatsApp us directly to schedule.',
  },
  {
    q: 'How long does a full residential project take?',
    a: 'A complete residential project — from discovery through to final styling and handover — typically runs 10 to 18 months depending on scale. Smaller apartments can be completed in 7 to 9 months. We do not compress timelines at the cost of quality.',
  },
  {
    q: 'Do you offer a consultation without a full project commitment?',
    a: 'Yes. We offer a 2-hour paid design consultation for ₹25,000 — a focused session with a senior designer covering layout, palette direction, key material recommendations, and a written brief summary. Many clients use this before deciding on a full engagement.',
  },
]

// ─── PAGE HERO ───────────────────────────────────────────────────────────────

function PageHero() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.querySelectorAll('.ph-reveal'),
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(13,11,9,0.84) 0%, rgba(13,11,9,0.74) 55%, #0D0B09 100%)' }}
      />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 pt-40 pb-20 md:pb-28">
        <div className="ph-reveal">
          <span className="section-label">Contact</span>
        </div>

        <h1
          className="ph-reveal"
          style={{
            fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6',
            fontSize: 'clamp(3rem,7vw,6.5rem)', lineHeight: 1.0, marginBottom: '1.25rem',
          }}
        >
          Let's talk about<br /><em>your space</em>.
        </h1>

        <p
          className="ph-reveal"
          style={{
            fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.48)',
            fontSize: '1rem', lineHeight: 1.8, maxWidth: '380px', marginBottom: '2rem',
          }}
        >
          We respond to every message personally. Usually within a few hours.
        </p>

        {/* Quick contact pills */}
        <div className="ph-reveal flex flex-wrap gap-3">
          {[
            { label: 'hello@lumina.studio', href: 'mailto:hello@lumina.studio', icon: '✉' },
            { label: '+91 98765 43210 · WhatsApp', href: 'https://wa.me/919876543210', icon: '◎' },
          ].map(item => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              style={{
                fontFamily: '"JetBrains Mono"', fontSize: '0.68rem', letterSpacing: '0.1em',
                color: '#C8A96D', border: '1px solid rgba(200,169,109,0.25)',
                background: 'rgba(200,169,109,0.06)', padding: '0.55rem 1rem',
                textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
                gap: '0.5rem', transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,169,109,0.12)'; e.currentTarget.style.borderColor = 'rgba(200,169,109,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(200,169,109,0.06)'; e.currentTarget.style.borderColor = 'rgba(200,169,109,0.25)' }}
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── CONTACT FORM ────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors]   = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const wrapRef = useRef(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Required'
    if (!form.email.trim())   e.email   = 'Required'
    if (!form.message.trim()) e.message = 'Required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    // ── Wire to EmailJS / Resend / Airtable here ──────────────────
    await new Promise(r => setTimeout(r, 1200))
    // ──────────────────────────────────────────────────────────────
    setLoading(false)
    gsap.to(wrapRef.current, {
      opacity: 0, y: -10, duration: 0.3,
      onComplete: () => setSubmitted(true),
    })
  }

  const inputStyle = (name) => ({
    width: '100%', background: 'transparent', border: 'none',
    borderBottom: `1px solid ${errors[name] ? 'rgba(192,57,43,0.55)' : '#2A2518'}`,
    color: '#F5EFE6', fontFamily: '"DM Sans"', fontSize: '0.95rem',
    padding: '0.7rem 0', outline: 'none', transition: 'border-color 0.3s',
  })

  const labelStyle = (name) => ({
    fontFamily: '"JetBrains Mono"', fontSize: '0.54rem', letterSpacing: '0.22em',
    textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem',
    color: errors[name] ? 'rgba(192,57,43,0.75)' : 'rgba(245,239,230,0.28)',
  })

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-5 py-4">
        <div
          className="flex items-center justify-center w-14 h-14 rounded-full"
          style={{ border: '1px solid rgba(200,169,109,0.35)', background: 'rgba(200,169,109,0.07)' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L20 7" stroke="#C8A96D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '2rem', fontWeight: 300, color: '#F5EFE6', marginBottom: '0.5rem' }}>
            Message received.
          </p>
          <p style={{ fontFamily: '"DM Sans"', fontSize: '0.88rem', color: 'rgba(245,239,230,0.45)', lineHeight: 1.75 }}>
            Thank you, {form.name.split(' ')[0]}. We'll be in touch at{' '}
            <span style={{ color: '#C8A96D' }}>{form.email}</span> — usually within a few hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form ref={wrapRef} onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
          {/* Name */}
          <div>
            <label style={labelStyle('name')}>
              Full name <span style={{ color: '#C8A96D' }}>*</span>
              {errors.name && <span style={{ letterSpacing: 0, textTransform: 'none', marginLeft: '6px' }}>— {errors.name}</span>}
            </label>
            <input
              type="text" value={form.name} onChange={e => set('name', e.target.value)}
              placeholder="Your full name" style={inputStyle('name')}
              onFocus={e => e.target.style.borderBottomColor = 'rgba(200,169,109,0.6)'}
              onBlur={e => e.target.style.borderBottomColor = errors.name ? 'rgba(192,57,43,0.55)' : '#2A2518'}
            />
          </div>
          {/* Email */}
          <div>
            <label style={labelStyle('email')}>
              Email <span style={{ color: '#C8A96D' }}>*</span>
              {errors.email && <span style={{ letterSpacing: 0, textTransform: 'none', marginLeft: '6px' }}>— {errors.email}</span>}
            </label>
            <input
              type="email" value={form.email} onChange={e => set('email', e.target.value)}
              placeholder="your@email.com" style={inputStyle('email')}
              onFocus={e => e.target.style.borderBottomColor = 'rgba(200,169,109,0.6)'}
              onBlur={e => e.target.style.borderBottomColor = errors.email ? 'rgba(192,57,43,0.55)' : '#2A2518'}
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label style={labelStyle('phone')}>Phone / WhatsApp (optional)</label>
          <input
            type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
            placeholder="+91 XXXXX XXXXX" style={inputStyle('phone')}
            onFocus={e => e.target.style.borderBottomColor = 'rgba(200,169,109,0.6)'}
            onBlur={e => e.target.style.borderBottomColor = '#2A2518'}
          />
        </div>

        {/* Message */}
        <div>
          <label style={labelStyle('message')}>
            How can we help? <span style={{ color: '#C8A96D' }}>*</span>
            {errors.message && <span style={{ letterSpacing: 0, textTransform: 'none', marginLeft: '6px' }}>— {errors.message}</span>}
          </label>
          <textarea
            value={form.message} onChange={e => set('message', e.target.value)}
            rows={4} placeholder="Tell us a bit about your project or question…"
            style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '100px', lineHeight: 1.65 }}
            onFocus={e => e.target.style.borderBottomColor = 'rgba(200,169,109,0.6)'}
            onBlur={e => e.target.style.borderBottomColor = errors.message ? 'rgba(192,57,43,0.55)' : '#2A2518'}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
          <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.5rem', color: 'rgba(245,239,230,0.18)', letterSpacing: '0.1em', lineHeight: 1.65, maxWidth: '220px' }}>
            Your details stay private. We don't share or sell contact information.
          </p>
          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            style={{ opacity: loading ? 0.65 : 1, minWidth: '148px', justifyContent: 'center' }}
          >
            {loading ? (
              <span className="flex items-center gap-1.5">
                <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
              </span>
            ) : (
              <>
                Send message
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

// ─── SPLIT SECTION ───────────────────────────────────────────────────────────

function ContactSplit() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.querySelectorAll('.split-reveal'),
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const hq = offices[0]

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ background: '#0D0B09' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-20">

          {/* Left — info column */}
          <div className="flex flex-col gap-7">
            <div className="split-reveal">
              <span className="section-label">Reach us</span>
              <h2 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', fontSize: 'clamp(2rem,4vw,3.5rem)', lineHeight: 1.1 }}>
                Start a conversation.<br /><em>Any way you like</em>.
              </h2>
            </div>

            {/* Contact rows */}
            {[
              { label: 'Email',        value: 'hello@lumina.studio',  href: 'mailto:hello@lumina.studio' },
              { label: 'WhatsApp',     value: '+91 98765 43210',       href: 'https://wa.me/919876543210' },
              { label: 'Phone',        value: '+91 22 4000 0000',      href: 'tel:+912240000000' },
              { label: 'Office hours', value: 'Mon – Sat · 10am – 7pm IST', href: null },
            ].map(item => (
              <div
                key={item.label}
                className="split-reveal flex flex-col gap-1 pb-5"
                style={{ borderBottom: '1px solid #2A2518' }}
              >
                <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.52rem', color: 'rgba(245,239,230,0.26)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{ fontFamily: '"DM Sans"', fontSize: '1.05rem', color: '#F5EFE6', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.target.style.color = '#C8A96D'}
                    onMouseLeave={e => e.target.style.color = '#F5EFE6'}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p style={{ fontFamily: '"DM Sans"', fontSize: '1.05rem', color: 'rgba(245,239,230,0.55)' }}>
                    {item.value}
                  </p>
                )}
              </div>
            ))}

            {/* Availability badge */}
            <div
              className="split-reveal inline-flex items-center gap-2.5 self-start px-4 py-2.5"
              style={{ border: '1px solid rgba(200,169,109,0.2)', background: 'rgba(200,169,109,0.05)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" style={{ animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.55rem', color: 'rgba(200,169,109,0.72)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                Accepting Q4 2025 projects
              </span>
            </div>

            {/* HQ address card */}
            <div className="split-reveal p-6" style={{ border: '1px solid #2A2518', background: '#131109' }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p style={{ fontFamily: '"DM Sans"', fontWeight: 500, color: '#F5EFE6', fontSize: '0.9rem' }}>{hq.city}</p>
                  <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.5rem', color: '#C8A96D', letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: '3px' }}>{hq.tag}</p>
                </div>
                <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.5rem', color: 'rgba(245,239,230,0.18)', letterSpacing: '0.08em' }}>
                  {hq.coordinates}
                </span>
              </div>
              <p style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.42)', lineHeight: 1.8, whiteSpace: 'pre-line', marginBottom: '1.1rem' }}>
                {hq.address}
              </p>
              <a
                href={hq.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ fontSize: '0.68rem' }}
              >
                Get directions
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right — form card */}
          <div
            className="split-reveal p-8 md:p-10 self-start"
            style={{ border: '1px solid #2A2518', background: '#131109' }}
          >
            <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.7rem', fontWeight: 300, color: '#F5EFE6', marginBottom: '0.35rem' }}>
              Send us a message
            </p>
            <p style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.36)', lineHeight: 1.65, marginBottom: '2rem' }}>
              Not ready for the full project brief? Just say hello — we'll take it from there.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── OFFICE LOCATIONS ────────────────────────────────────────────────────────

function OfficeLocations() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.querySelectorAll('.office-card'),
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.72, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 82%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={ref}
      className="py-16 md:py-24"
      style={{ background: '#100E0C', borderTop: '1px solid #2A2518' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-6 h-px" style={{ background: '#C8A96D' }} />
          <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: '#C8A96D', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            Our offices
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {offices.map((office, i) => (
            <div
              key={office.city}
              className="office-card opacity-0 p-7 flex flex-col gap-5 group"
              style={{ border: '1px solid #2A2518', background: '#131109', transition: 'border-color 0.35s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(200,169,109,0.25)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#2A2518'}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '2rem', fontWeight: 300, color: '#F5EFE6', lineHeight: 1 }}>
                    {office.city}
                  </p>
                  <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.5rem', color: '#C8A96D', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '4px' }}>
                    {office.tag}
                  </p>
                </div>
                {i === 0 && (
                  <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.46rem', color: 'rgba(245,239,230,0.18)', border: '1px solid #2A2518', padding: '0.2rem 0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    HQ
                  </span>
                )}
              </div>

              <p style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.4)', lineHeight: 1.8, whiteSpace: 'pre-line', flex: 1 }}>
                {office.address}
              </p>

              <div className="flex flex-col gap-2" style={{ borderTop: '1px solid #2A2518', paddingTop: '1.1rem' }}>
                <a href={`tel:${office.phone.replace(/\s/g, '')}`}
                  style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.48)', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color = '#C8A96D'}
                  onMouseLeave={e => e.target.style.color = 'rgba(245,239,230,0.48)'}>
                  {office.phone}
                </a>
                <a href={`mailto:${office.email}`}
                  style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.48)', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color = '#C8A96D'}
                  onMouseLeave={e => e.target.style.color = 'rgba(245,239,230,0.48)'}>
                  {office.email}
                </a>
                <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.5rem', color: 'rgba(245,239,230,0.2)', letterSpacing: '0.1em', marginTop: '2px' }}>
                  {office.hours}
                </p>
              </div>

              <a
                href={office.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ fontSize: '0.68rem', alignSelf: 'flex-start' }}
              >
                Get directions
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M12 4H6M12 4v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ACCORDION ───────────────────────────────────────────────────────────

function FAQAccordion() {
  const [open, setOpen] = useState(null)
  const ref = useRef(null)
  const bodyRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current.querySelector('.faq-header'),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
      )
      gsap.fromTo(ref.current.querySelectorAll('.faq-row'),
        { y: 18, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.62, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current.querySelector('.faq-list'), start: 'top 82%' },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  const toggle = (i) => {
    const el = bodyRefs.current[i]
    if (!el) return

    if (open === i) {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.32, ease: 'power3.inOut' })
      setOpen(null)
    } else {
      if (open !== null && bodyRefs.current[open]) {
        gsap.to(bodyRefs.current[open], { height: 0, opacity: 0, duration: 0.25, ease: 'power3.in' })
      }
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.38, ease: 'power3.out' }
      )
      setOpen(i)
    }
  }

  return (
    <section
      ref={ref}
      className="py-16 md:py-24"
      style={{ background: '#0D0B09', borderTop: '1px solid #2A2518' }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="faq-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 opacity-0">
          <div>
            <span className="section-label">FAQ</span>
            <h2 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', fontSize: 'clamp(2rem,4.5vw,3.8rem)', lineHeight: 1.1 }}>
              Questions we<br />hear <em>most often</em>.
            </h2>
          </div>
          <p style={{ fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.38)', fontSize: '0.88rem', lineHeight: 1.75, maxWidth: '250px' }}>
            Still have something on your mind? Use the form above or WhatsApp us directly.
          </p>
        </div>

        <div className="faq-list max-w-3xl">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq-row opacity-0"
              style={{ borderBottom: '1px solid #2A2518' }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-5 text-left"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '1.2rem 0' }}
              >
                <span style={{
                  fontFamily: '"Cormorant Garamond"', fontWeight: 300,
                  fontSize: 'clamp(1.05rem,1.8vw,1.35rem)',
                  color: open === i ? '#C8A96D' : '#F5EFE6',
                  transition: 'color 0.3s', lineHeight: 1.3,
                }}>
                  {faq.q}
                </span>
                <span style={{
                  width: '26px', height: '26px', flexShrink: 0,
                  border: `1px solid ${open === i ? 'rgba(200,169,109,0.38)' : '#2A2518'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: open === i ? '#C8A96D' : 'rgba(245,239,230,0.28)',
                  transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'all 0.3s',
                }}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>

              <div
                ref={el => bodyRefs.current[i] = el}
                style={{ height: 0, opacity: 0, overflow: 'hidden' }}
              >
                <p style={{
                  fontFamily: '"DM Sans"', fontSize: '0.88rem',
                  color: 'rgba(245,239,230,0.5)', lineHeight: 1.82,
                  paddingBottom: '1.4rem',
                }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <main style={{ background: '#0D0B09' }}>
      <PageHero />
      <ContactSplit />
      <OfficeLocations />
      <FAQAccordion />
    </main>
  )
}
