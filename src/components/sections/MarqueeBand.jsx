import { services } from '../../data/process'
import { clients } from '../../data/projects'

const itemsA = [...services, ...services]
const itemsB = [...clients, ...clients].map((c, i) => ({ title: c, icon: '◇' }))

export default function MarqueeBand() {
  return (
    <div id="marquee" className="py-5 overflow-hidden marquee-wrap" style={{ borderTop: '1px solid #2A2518', borderBottom: '1px solid #2A2518', background: '#100E0C' }}>
      <div className="relative">
        {/* Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #100E0C, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #100E0C, transparent)' }} />

        {/* Row 1 — services LTR */}
        <div className="marquee-track mb-3">
          {itemsA.map((s, i) => (
            <div key={i} className="flex items-center gap-3 mx-8 shrink-0">
              <span style={{ color: '#C8A96D', fontSize: '0.7rem' }}>{s.icon}</span>
              <span style={{ fontFamily: '"DM Sans"', fontSize: '0.75rem', color: 'rgba(245,239,230,0.35)', whiteSpace: 'nowrap', letterSpacing: '0.06em' }}>{s.title}</span>
            </div>
          ))}
        </div>

        {/* Row 2 — clients RTL */}
        <div className="marquee-track-rev">
          {itemsB.map((s, i) => (
            <div key={i} className="flex items-center gap-3 mx-8 shrink-0">
              <span style={{ color: 'rgba(200,169,109,0.35)', fontSize: '0.6rem' }}>{s.icon}</span>
              <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.62rem', color: 'rgba(245,239,230,0.2)', whiteSpace: 'nowrap', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
