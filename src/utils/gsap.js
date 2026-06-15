import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Default GSAP config for smooth, high-quality animations
gsap.config({
  force3D: true,
  nullTargetWarn: false,
})

gsap.defaults({
  ease: 'power3.out',
  duration: 0.9,
})

ScrollTrigger.config({
  ignoreMobileResize: true,
})

export { gsap, ScrollTrigger }

/**
 * Animate text split by words — each word flies up from below
 */
export function animateWords(selector, options = {}) {
  const elements = document.querySelectorAll(selector)
  elements.forEach(el => {
    const words = el.querySelectorAll('.word-split .inner')
    if (!words.length) return
    gsap.fromTo(
      words,
      { y: '115%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: options.duration || 1.1,
        ease: options.ease || 'power4.out',
        stagger: options.stagger || 0.08,
        delay: options.delay || 0,
        scrollTrigger: options.scrollTrigger || undefined,
      }
    )
  })
}

/**
 * Fade + slide up reveal for general elements
 */
export function revealUp(elements, options = {}) {
  return gsap.fromTo(
    elements,
    { y: options.distance || 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: options.duration || 0.9,
      ease: 'power3.out',
      stagger: options.stagger || 0,
      delay: options.delay || 0,
      scrollTrigger: options.scrollTrigger,
    }
  )
}

/**
 * Clip-path reveal from bottom
 */
export function revealClip(elements, options = {}) {
  return gsap.fromTo(
    elements,
    { clipPath: 'inset(0 0 100% 0)', opacity: 1 },
    {
      clipPath: 'inset(0 0 0% 0)',
      duration: options.duration || 1.2,
      ease: 'power4.inOut',
      stagger: options.stagger || 0.1,
      scrollTrigger: options.scrollTrigger,
    }
  )
}

/**
 * Number counter animation
 */
export function countTo(element, target, options = {}) {
  const obj = { value: 0 }
  return gsap.to(obj, {
    value: target,
    duration: options.duration || 2,
    ease: 'power2.out',
    onUpdate: () => {
      if (element) {
        element.textContent = Math.round(obj.value) + (options.suffix || '')
      }
    },
    scrollTrigger: options.scrollTrigger,
  })
}
