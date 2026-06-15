import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../utils/gsap'

const PROJECT_TYPES = ['Residential', 'Commercial', 'Hospitality', 'Mixed-Use']
const BUDGETS = ['₹50L – ₹1Cr', '₹1Cr – ₹3Cr', '₹3Cr – ₹7Cr', '₹7Cr+', 'To be discussed']
const TIMELINES = ['Within 3 months', '3 – 6 months', '6 – 12 months', 'Flexible']
const SIZES = ['Under 1,000 sq ft', '1,000 – 3,000 sq ft', '3,000 – 7,000 sq ft', '7,000+ sq ft']

const STEPS = ['Project', 'Space & Budget', 'Vision', 'Contact']

function StepDots({ current }) {
  return (
    <div className="flex items-center gap-0 mb-12">
      {STEPS.map((label, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-400"
              style={{
                border: `1px solid ${i <= current ? '#C8A96D' : '#2A2518'}`,
                background: i === current ? '#C8A96D' : i < current ? 'rgba(200,169,109,0.15)' : 'transparent',
              }}>
              {i < current
                ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#C8A96D" strokeWidth="1.5" strokeLinecap="round"/></svg>
                : <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.6rem', color: i === current ? '#0D0B09' : 'rgba(245,239,230,0.3)' }}>{String(i + 1).padStart(2, '0')}</span>
              }
            </div>
            <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.52rem', color: i <= current ? '#C8A96D' : 'rgba(245,239,230,0.2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '6px', whiteSpace: 'nowrap' }}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ width: 'clamp(2rem,6vw,5rem)', height: '1px', background: i < current ? '#C8A96D' : '#2A2518', marginBottom: '1.5rem', marginLeft: '4px', marginRight: '4px', transition: 'background 0.4s' }} />
          )}
        </div>
      ))}
    </div>
  )
}

function Chip({ label, selected, onClick }) {
  return (
    <button type="button" onClick={onClick}
      style={{
        fontFamily: '"DM Sans"', fontSize: '0.82rem', padding: '0.6rem 1.25rem',
        border: `1px solid ${selected ? '#C8A96D' : '#2A2518'}`,
        background: selected ? 'rgba(200,169,109,0.1)' : 'transparent',
        color: selected ? '#C8A96D' : 'rgba(245,239,230,0.5)',
        cursor: 'pointer', transition: 'all 0.25s', letterSpacing: '0.04em',
      }}>
      {label}
    </button>
  )
}

function InputField({ label, name, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div>
      <label style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.35)', display: 'block', marginBottom: '0.5rem' }}>
        {label}{required && <span style={{ color: '#C8A96D', marginLeft: '4px' }}>*</span>}
      </label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}
        className="enquiry-input"
        style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #2A2518', color: '#F5EFE6', fontFamily: '"DM Sans"', fontSize: '1rem', padding: '0.75rem 0', outline: 'none', transition: 'border-color 0.3s' }}
        onFocus={e => e.target.style.borderBottomColor = 'rgba(200,169,109,0.6)'}
        onBlur={e => e.target.style.borderBottomColor = '#2A2518'}
      />
    </div>
  )
}

export default function Enquiry() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [refNum] = useState(() => 'LUM-' + Math.random().toString(36).substring(2, 7).toUpperCase())

  const [form, setForm] = useState({
    projectType: '', size: '', location: '', budget: '', timeline: '',
    vision: '', name: '', company: '', email: '', mobile: '', how: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.enquiry-header'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } }
      )
      gsap.fromTo(formRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const animateStep = (dir) => {
    gsap.fromTo(formRef.current.querySelector('.step-content'),
      { x: dir === 'next' ? 60 : -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }
    )
  }

  const next = () => {
    const errs = validate(step)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStep(s => { animateStep('next'); return s + 1 })
  }

  const back = () => setStep(s => { animateStep('back'); return s - 1 })

  const validate = (s) => {
    const e = {}
    if (s === 0 && !form.projectType) e.projectType = 'Please select a project type'
    if (s === 2 && !form.vision.trim()) e.vision = 'Please describe your vision'
    if (s === 3) {
      if (!form.name.trim()) e.name = 'Name is required'
      if (!form.email.trim()) e.email = 'Email is required'
      if (!form.mobile.trim()) e.mobile = 'Mobile is required'
    }
    return e
  }

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(3)
    if (Object.keys(errs).length) { setErrors(errs); return }
    gsap.to(formRef.current, {
      scale: 0.97, opacity: 0, duration: 0.4, onComplete: () => setSubmitted(true)
    })
  }

  return (
    <section id="enquiry" ref={sectionRef} className="py-24 md:py-36 relative overflow-hidden" style={{ background: '#0D0B09' }}>
      {/* BG */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=60&auto=format&fit=crop')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(80%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0D0B09 0%, rgba(13,11,9,0.92) 40%, #0D0B09 100%)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(200,169,109,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="enquiry-header text-center mb-16 opacity-0">
          <span className="section-label justify-center">Begin your project</span>
          <h2 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', fontSize: 'clamp(2.5rem,6vw,5.5rem)', lineHeight: 1.05, marginBottom: '1rem' }}>
            Tell us about your <em>vision</em>.
          </h2>
          <p style={{ fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.45)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>
            Four simple steps. No obligation. We respond to every enquiry within 24 hours — personally.
          </p>
        </div>

        {/* Form panel */}
        <div ref={formRef} className="max-w-2xl mx-auto opacity-0">

          {submitted ? (
            /* Success */
            <div className="text-center py-16 px-8" style={{ border: '1px solid rgba(200,169,109,0.2)', background: 'rgba(200,169,109,0.03)' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ border: '1px solid rgba(200,169,109,0.4)', background: 'rgba(200,169,109,0.08)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L20 7" stroke="#C8A96D" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '2.5rem', fontWeight: 300, color: '#F5EFE6', marginBottom: '0.75rem' }}>
                Thank you, {form.name.split(' ')[0]}.
              </p>
              <p style={{ fontFamily: '"DM Sans"', fontSize: '0.9rem', color: 'rgba(245,239,230,0.5)', lineHeight: 1.75, marginBottom: '1.5rem', maxWidth: '380px', margin: '0 auto 1.5rem' }}>
                We've received your enquiry and will be in touch within 24 hours. Please check your email at <span style={{ color: '#C8A96D' }}>{form.email}</span>.
              </p>
              <div className="inline-flex items-center gap-3 px-5 py-2.5" style={{ border: '1px solid rgba(200,169,109,0.2)', background: 'rgba(200,169,109,0.04)' }}>
                <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(245,239,230,0.4)', letterSpacing: '0.15em' }}>Your reference:</span>
                <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.7rem', color: '#C8A96D', letterSpacing: '0.2em' }}>{refNum}</span>
              </div>
              <div className="mt-10 pt-8 grid grid-cols-3 gap-4 text-center" style={{ borderTop: '1px solid #2A2518' }}>
                {[['Next step', 'A discovery call with Anika'], ['Timeline', 'Response within 24 hours'], ['Location', 'Virtual or in-person']].map(([k, v]) => (
                  <div key={k}>
                    <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.55rem', color: 'rgba(245,239,230,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>{k}</p>
                    <p style={{ fontFamily: '"DM Sans"', fontSize: '0.8rem', color: 'rgba(245,239,230,0.6)' }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ border: '1px solid #2A2518', background: 'rgba(13,11,9,0.8)', backdropFilter: 'blur(20px)' }}>
              {/* Panel header */}
              <div className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid #2A2518' }}>
                <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(245,239,230,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Project Enquiry</span>
                <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(200,169,109,0.4)', letterSpacing: '0.15em' }}>Step {step + 1} of {STEPS.length}</span>
              </div>

              <div className="px-8 pt-8 pb-6">
                <StepDots current={step} />

                <form onSubmit={handleSubmit}>
                  <div className="step-content" style={{ minHeight: '280px' }}>

                    {/* Step 1 — Project type */}
                    {step === 0 && (
                      <div className="flex flex-col gap-6">
                        <div>
                          <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.9rem', fontWeight: 300, color: '#F5EFE6', marginBottom: '0.4rem' }}>What are we designing?</p>
                          <p style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.4)', lineHeight: 1.65 }}>Tell us the type of project so we can bring the right team to your brief.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {PROJECT_TYPES.map(t => (
                            <Chip key={t} label={t} selected={form.projectType === t} onClick={() => set('projectType', t)} />
                          ))}
                        </div>
                        {errors.projectType && <p style={{ fontFamily: '"DM Sans"', fontSize: '0.75rem', color: '#e05252' }}>{errors.projectType}</p>}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {SIZES.map(s => (
                            <Chip key={s} label={s} selected={form.size === s} onClick={() => set('size', s)} />
                          ))}
                        </div>
                        <InputField label="Project location" name="location" value={form.location} onChange={e => set('location', e.target.value)} placeholder="City, neighbourhood, or address" />
                      </div>
                    )}

                    {/* Step 2 — Budget & timeline */}
                    {step === 1 && (
                      <div className="flex flex-col gap-7">
                        <div>
                          <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.9rem', fontWeight: 300, color: '#F5EFE6', marginBottom: '0.4rem' }}>Investment & timing</p>
                          <p style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.4)', lineHeight: 1.65 }}>Honest answers here help us propose the right scope and team for your project.</p>
                        </div>
                        <div>
                          <p className="enquiry-input-label" style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.35)', marginBottom: '0.75rem', display: 'block' }}>Estimated budget</p>
                          <div className="flex flex-wrap gap-2">
                            {BUDGETS.map(b => <Chip key={b} label={b} selected={form.budget === b} onClick={() => set('budget', b)} />)}
                          </div>
                        </div>
                        <div>
                          <p className="enquiry-input-label" style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.35)', marginBottom: '0.75rem', display: 'block' }}>Ideal start timeline</p>
                          <div className="flex flex-wrap gap-2">
                            {TIMELINES.map(t => <Chip key={t} label={t} selected={form.timeline === t} onClick={() => set('timeline', t)} />)}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3 — Vision */}
                    {step === 2 && (
                      <div className="flex flex-col gap-6">
                        <div>
                          <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.9rem', fontWeight: 300, color: '#F5EFE6', marginBottom: '0.4rem' }}>Describe your vision</p>
                          <p style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.4)', lineHeight: 1.65 }}>Don't sanitise it. Tell us the ambitious version — how you want to feel in this space.</p>
                        </div>
                        <div>
                          <label style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,239,230,0.35)', display: 'block', marginBottom: '0.5rem' }}>
                            Your vision <span style={{ color: '#C8A96D' }}>*</span>
                          </label>
                          <textarea value={form.vision} onChange={e => set('vision', e.target.value)}
                            placeholder="Tell us about the space, the feeling you're after, any inspirations — references welcome..."
                            rows={5} required
                            style={{ width: '100%', background: 'transparent', border: '1px solid #2A2518', color: '#F5EFE6', fontFamily: '"DM Sans"', fontSize: '0.9rem', padding: '0.85rem 1rem', outline: 'none', resize: 'vertical', lineHeight: 1.65, transition: 'border-color 0.3s' }}
                            onFocus={e => e.target.style.borderColor = 'rgba(200,169,109,0.5)'}
                            onBlur={e => e.target.style.borderColor = '#2A2518'}
                          />
                          {errors.vision && <p style={{ fontFamily: '"DM Sans"', fontSize: '0.75rem', color: '#e05252', marginTop: '4px' }}>{errors.vision}</p>}
                        </div>
                        <InputField label="Styles or references you love (optional)" name="styles" value={form.how} onChange={e => set('how', e.target.value)} placeholder="e.g. Japandi, Art Deco, Biophilic, @accountname..." />
                      </div>
                    )}

                    {/* Step 4 — Contact */}
                    {step === 3 && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.9rem', fontWeight: 300, color: '#F5EFE6', marginBottom: '0.4rem' }}>How do we reach you?</p>
                          <p style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.4)', lineHeight: 1.65 }}>Your details are confidential. We will never share or sell your information.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <InputField label="Full name" name="name" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" required />
                          <InputField label="Company / firm" name="company" value={form.company} onChange={e => set('company', e.target.value)} placeholder="Optional" />
                          <InputField label="Email address" name="email" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" required />
                          <InputField label="Mobile number" name="mobile" type="tel" value={form.mobile} onChange={e => set('mobile', e.target.value)} placeholder="+91 XXXXX XXXXX" required />
                        </div>
                        {(errors.name || errors.email || errors.mobile) && (
                          <p style={{ fontFamily: '"DM Sans"', fontSize: '0.75rem', color: '#e05252' }}>Please fill in all required fields.</p>
                        )}
                        <div style={{ background: 'rgba(200,169,109,0.04)', border: '1px solid rgba(200,169,109,0.12)', padding: '0.85rem 1rem', marginTop: '0.5rem' }}>
                          <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.56rem', color: 'rgba(245,239,230,0.3)', letterSpacing: '0.12em', lineHeight: 1.7 }}>
                            By submitting, you agree that LUMINA may contact you regarding your project enquiry. Your information will not be shared with third parties.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Nav buttons */}
                  <div className="flex items-center justify-between mt-10 pt-6" style={{ borderTop: '1px solid #2A2518' }}>
                    {step > 0 ? (
                      <button type="button" onClick={back} className="btn-ghost">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Back
                      </button>
                    ) : <div />}

                    {step < STEPS.length - 1 ? (
                      <button type="button" onClick={next} className="btn-gold">
                        Continue
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    ) : (
                      <button type="submit" className="btn-gold">
                        Send enquiry
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
