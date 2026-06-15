import { useState, useRef, useEffect } from 'react'

export default function LazyImage({ src, alt, className = '', style = {}, imgClassName = '' }) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { rootMargin: '200px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`lazy-img-wrapper ${className}`} style={style}>
      {!loaded && <div className="lazy-img-placeholder absolute inset-0" />}
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`lazy-img w-full h-full object-cover ${loaded ? 'loaded' : 'loading'} ${imgClassName}`}
          style={{ position: 'relative', zIndex: 1 }}
        />
      )}
    </div>
  )
}
