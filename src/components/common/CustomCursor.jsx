import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Fast dot follows cursor exactly
    const xToD = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'none' })
    const yToD = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'none' })

    // Lagging ring adds character
    const xToR = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3' })
    const yToR = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3' })

    const handleMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      xToD(e.clientX)
      yToD(e.clientY)
      xToR(e.clientX)
      yToR(e.clientY)
    }

    const addHover = () => document.body.classList.add('cursor-hover')
    const removeHover = () => document.body.classList.remove('cursor-hover')
    const addActive = () => document.body.classList.add('cursor-active')
    const removeActive = () => document.body.classList.remove('cursor-active')

    const setupHoverTargets = () => {
      const targets = document.querySelectorAll('a, button, [data-cursor="hover"], input, textarea')
      targets.forEach(t => {
        t.addEventListener('mouseenter', addHover)
        t.addEventListener('mouseleave', removeHover)
      })
    }

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mousedown', addActive)
    window.addEventListener('mouseup', removeActive)

    setupHoverTargets()

    // Re-setup when DOM changes (for dynamic content)
    const observer = new MutationObserver(setupHoverTargets)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousedown', addActive)
      window.removeEventListener('mouseup', removeActive)
      observer.disconnect()
    }
  }, [])

  return (
    <div id="cursor" aria-hidden="true">
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </div>
  )
}
