import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../utils/gsap'
import { sendBriefMessage, getOpeningGreeting } from '../../services/aiService'

const INTERIOR_PROMPTS = [
  'I want a Japandi-inspired living room',
  'We need our office to inspire creativity',
  'Our master suite feels cold and impersonal',
  'We\'re designing a boutique hotel lobby',
]

function TypingDots() {
  return <div className="flex items-center gap-1.5 px-4 py-3"><span className="typing-dot"/><span className="typing-dot"/><span className="typing-dot"/></div>
}

function Message({ msg }) {
  const isAI = msg.role === 'assistant'
  return (
    <div className={`flex flex-col gap-1 ${isAI ? 'items-start' : 'items-end'}`}>
      {isAI && <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.5rem', color: 'rgba(200,169,109,0.45)', letterSpacing: '0.25em', textTransform: 'uppercase', paddingLeft: '4px' }}>Lumina Studio AI</span>}
      <div style={{
        maxWidth: '88%', padding: '0.75rem 1rem', fontFamily: '"DM Sans"', fontSize: '0.85rem', lineHeight: 1.65,
        borderLeft: isAI ? '2px solid rgba(200,169,109,0.3)' : 'none',
        background: isAI ? 'rgba(245,239,230,0.03)' : 'rgba(200,169,109,0.12)',
        color: isAI ? 'rgba(245,239,230,0.8)' : '#F5EFE6',
      }}>
        {msg.content}
      </div>
    </div>
  )
}

export default function AIBrief() {
  const sectionRef = useRef(null)
  const endRef = useRef(null)
  const inputRef = useRef(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.ai-header'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' } }
      )
      gsap.fromTo(sectionRef.current.querySelector('.ai-panel'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, typing])

  const start = async () => {
    setStarted(true)
    setTyping(true)
    const greeting = await getOpeningGreeting()
    setTyping(false)
    setMessages([{ role: 'assistant', content: greeting }])
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const send = async (text) => {
    const content = (text || input).trim()
    if (!content || typing) return
    setInput('')
    const newMsgs = [...messages, { role: 'user', content }]
    setMessages(newMsgs)
    setTyping(true)
    try {
      const reply = await sendBriefMessage(newMsgs)
      setMessages(m => [...m, { role: 'assistant', content: reply }])
    } catch { setMessages(m => [...m, { role: 'assistant', content: 'Something went wrong — please email us at hello@lumina.studio.' }]) }
    finally { setTyping(false) }
  }

  return (
    <section id="style-quiz" ref={sectionRef} className="py-24 md:py-36 relative overflow-hidden" style={{ background: '#100E0C' }}>
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=50&auto=format&fit=crop')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(70%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #100E0C, rgba(16,14,12,0.9), #100E0C)' }} />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="ai-header text-center mb-14 opacity-0">
          <span className="section-label justify-center">Design Language Quiz</span>
          <h2 style={{ fontFamily: '"Cormorant Garamond"', fontWeight: 300, color: '#F5EFE6', fontSize: 'clamp(2.5rem,6vw,5.5rem)', lineHeight: 1.05, marginBottom: '1rem' }}>
            Discover your<br /><em>design language</em>.
          </h2>
          <p style={{ fontFamily: '"DM Sans"', color: 'rgba(245,239,230,0.45)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto', lineHeight: 1.75 }}>
            Chat with our AI to explore your aesthetic instincts — before your first conversation with our team.
          </p>
        </div>

        <div className="ai-panel max-w-2xl mx-auto opacity-0">
          <div style={{ border: '1px solid #2A2518', background: 'rgba(13,11,9,0.85)', backdropFilter: 'blur(20px)' }}>
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #2A2518' }}>
              <div className="flex items-center gap-3">
                <span className="relative flex w-2.5 h-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ background: '#C8A96D' }} />
                  <span className="relative inline-flex rounded-full w-2.5 h-2.5" style={{ background: '#C8A96D' }} />
                </span>
                <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.58rem', color: 'rgba(245,239,230,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Studio AI — Online</span>
              </div>
              <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.52rem', color: 'rgba(245,239,230,0.2)', letterSpacing: '0.12em' }}>Demo mode · API-ready</span>
            </div>

            {/* Messages */}
            <div className="overflow-y-auto flex flex-col gap-4 p-6" style={{ height: '380px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(200,169,109,0.15) transparent' }}>
              {!started && (
                <div className="h-full flex flex-col items-center justify-center gap-7">
                  <div className="text-center">
                    <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '3rem', color: 'rgba(200,169,109,0.1)', lineHeight: 1, marginBottom: '1rem' }}>◈</p>
                    <p style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1.4rem', fontWeight: 300, color: 'rgba(245,239,230,0.35)', fontStyle: 'italic' }}>What space are you dreaming of?</p>
                  </div>
                  <button onClick={start} className="btn-gold">
                    Begin the quiz
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              )}
              {messages.map((m, i) => <Message key={i} msg={m} />)}
              {typing && <TypingDots />}
              <div ref={endRef} />
            </div>

            {/* Input */}
            {started && (
              <div style={{ borderTop: '1px solid #2A2518' }}>
                {messages.length <= 1 && (
                  <div className="flex flex-wrap gap-2 px-6 pt-4">
                    {INTERIOR_PROMPTS.map(p => (
                      <button key={p} onClick={() => send(p)} disabled={typing}
                        style={{ fontFamily: '"DM Sans"', fontSize: '0.73rem', border: '1px solid #2A2518', color: 'rgba(245,239,230,0.4)', padding: '0.3rem 0.8rem', background: 'transparent', cursor: 'pointer', transition: 'all 0.25s', letterSpacing: '0.03em' }}
                        onMouseEnter={e => { e.target.style.borderColor = 'rgba(200,169,109,0.3)'; e.target.style.color = '#C8A96D' }}
                        onMouseLeave={e => { e.target.style.borderColor = '#2A2518'; e.target.style.color = 'rgba(245,239,230,0.4)' }}>
                        {p}
                      </button>
                    ))}
                  </div>
                )}
                <div className="flex items-end gap-4 px-6 py-4">
                  <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                    placeholder="Describe the space you're imagining..."
                    rows={1} disabled={typing}
                    className="chat-input flex-1 resize-none"
                    style={{ lineHeight: 1.6, padding: '0.5rem 0' }}
                    onInput={e => { e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 110) + 'px' }}
                  />
                  <button onClick={() => send()} disabled={!input.trim() || typing}
                    style={{ width: '38px', height: '38px', border: '1px solid rgba(200,169,109,0.3)', color: '#C8A96D', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s', flexShrink: 0 }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#C8A96D'; e.currentTarget.style.color = '#0D0B09' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#C8A96D' }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                <div className="flex justify-between px-6 pb-4">
                  <span style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.52rem', color: 'rgba(245,239,230,0.18)', letterSpacing: '0.12em' }}>↵ SEND · SHIFT+↵ NEW LINE</span>
                  <button onClick={() => document.querySelector('#enquiry')?.scrollIntoView({ behavior: 'smooth' })}
                    style={{ fontFamily: '"JetBrains Mono"', fontSize: '0.52rem', color: 'rgba(200,169,109,0.4)', letterSpacing: '0.12em', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                    Ready to enquire? →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
