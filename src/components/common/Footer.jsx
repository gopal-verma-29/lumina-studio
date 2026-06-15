import { useState } from 'react'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Studio', href: '#about' },
  { label: 'Press', href: '#press' },
  { label: 'Enquiry', href: '#enquiry' },
]

const socials = [
  { label: 'Instagram', handle: '@lumina.interiors', href: '#' },
  { label: 'Pinterest', handle: 'Lumina Studio', href: '#' },
  { label: 'LinkedIn', handle: 'LUMINA Studio', href: '#' },
  { label: 'Houzz', handle: 'Lumina Design', href: '#' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNav = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer style={{ background: '#080706', borderTop: '1px solid #2A2518' }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">

        {/* Main footer grid */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" style={{ borderBottom: '1px solid #2A2518' }}>

          {/* Brand column */}
          <div className="lg:col-span-1">
            <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '2.5rem', fontWeight: 300, letterSpacing: '0.25em', color: '#F5EFE6', lineHeight: 1, marginBottom: '0.5rem' }}>LUMINA</p>
            <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.55rem', color: 'rgba(200,169,109,0.5)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Interior Design Studio</p>
            <p style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.38)', lineHeight: 1.75, maxWidth: '220px', marginBottom: '1.5rem' }}>
              Designing spaces that feel inevitable — since 2012.
            </p>
            {/* Address */}
            <div style={{ borderLeft: '2px solid rgba(200,169,109,0.2)', paddingLeft: '0.875rem' }}>
              <p style={{ fontFamily: '"DM Sans"', fontSize: '0.78rem', color: 'rgba(245,239,230,0.35)', lineHeight: 1.8 }}>
                14th Floor, The Platina<br />
                Bandra Kurla Complex<br />
                Mumbai 400 051, India
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(245,239,230,0.25)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Navigation</p>
            <div className="flex flex-col gap-3">
              {navLinks.map(link => (
                <button key={link.label} onClick={() => handleNav(link.href)}
                  style={{ fontFamily: '"DM Sans"', fontSize: '0.85rem', color: 'rgba(245,239,230,0.45)', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0, transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color = '#C8A96D'}
                  onMouseLeave={e => e.target.style.color = 'rgba(245,239,230,0.45)'}>
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact + Social */}
          <div>
            <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(245,239,230,0.25)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Get in touch</p>
            <div className="flex flex-col gap-3 mb-8">
              <a href="mailto:hello@lumina.studio"
                style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.3rem', fontWeight: 300, color: '#F5EFE6', transition: 'color 0.3s', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#C8A96D'}
                onMouseLeave={e => e.target.style.color = '#F5EFE6'}>
                hello@lumina.studio
              </a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.4)', transition: 'color 0.3s', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                onMouseEnter={e => e.currentTarget.style.color = '#25D366'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,239,230,0.4)'}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                +91 98765 43210 · WhatsApp preferred
              </a>
            </div>
            <div className="flex flex-col gap-2.5">
              {socials.map(s => (
                <a key={s.label} href={s.href}
                  style={{ fontFamily: '"DM Sans"', fontSize: '0.8rem', color: 'rgba(245,239,230,0.35)', transition: 'color 0.3s', textDecoration: 'none', display: 'flex', justifyContent: 'space-between' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#C8A96D'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,239,230,0.35)'}>
                  <span>{s.label}</span>
                  <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.6rem', color: 'inherit', letterSpacing: '0.05em' }}>{s.handle}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(245,239,230,0.25)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>Studio notes</p>
            <p style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.4)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              Spaces, materials, and studio notes — straight to your inbox. Joined by 4,200 design lovers.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(39,174,96,0.15)', border: '1px solid rgba(39,174,96,0.3)' }}>
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#27ae60" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <span style={{ fontFamily: '"DM Sans"', fontSize: '0.82rem', color: 'rgba(245,239,230,0.4)' }}>You're on the list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="your@email.com"
                  style={{ background: 'transparent', border: 'none', borderBottom: '1px solid #2A2518', color: '#F5EFE6', fontFamily: '"DM Sans"', fontSize: '0.88rem', padding: '0.6rem 0', outline: 'none', width: '100%', transition: 'border-color 0.3s' }}
                  onFocus={e => e.target.style.borderBottomColor = 'rgba(200,169,109,0.5)'}
                  onBlur={e => e.target.style.borderBottomColor = '#2A2518'}
                />
                <button type="submit" className="btn-outline-gold self-start" style={{ padding: '0.5rem 1.25rem', fontSize: '0.68rem' }}>
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.55rem', color: 'rgba(245,239,230,0.18)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            © {new Date().getFullYear()} LUMINA INTERIOR DESIGN STUDIO. ALL RIGHTS RESERVED.
          </p>
          <p style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.55rem', color: 'rgba(245,239,230,0.18)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            CRAFTED WITH INTENTION · VERSION 4.0
          </p>
        </div>
      </div>
    </footer>
  )
}
