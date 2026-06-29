import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppFAB() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/918878500051"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', damping: 18, stiffness: 260 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-7 right-7 z-50 w-14 h-14 rounded-full grid place-items-center no-underline"
          style={{
            background: 'linear-gradient(135deg, #c9a96e, #e8c97a)',
            color: '#0f0d0a',
            boxShadow: '0 8px 28px rgba(201,169,110,0.45)',
          }}
        >
          {/* Pulse rings */}
          <span
            className="absolute inset-0 rounded-full animate-pulse-ring"
            style={{ border: '2px solid rgba(201,169,110,0.6)' }}
          />
          <span
            className="absolute inset-0 rounded-full animate-pulse-ring [animation-delay:0.5s]"
            style={{ border: '2px solid rgba(201,169,110,0.35)' }}
          />

          <MessageCircle size={21} />
        </motion.a>
      )}
    </AnimatePresence>
  )
}