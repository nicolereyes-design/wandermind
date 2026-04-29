'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { Logo } from '@/components/shared/Logo'
import { useOnboardingStore } from '@/store/onboardingStore'
import { ShimmerText } from '@/components/ui/ShimmerText'
import { FlightMap } from '@/components/ui/FlightMap'

const MAGNETIC_RADIUS = 160
const MAGNETIC_MAX = 18

export default function OnboardingIntroPage() {
  const router = useRouter()
  const { updateProfile, reset, setStepDirection } = useOnboardingStore()
  const reducedMotion = useReducedMotion()

  // --- Magnetic CTA ---
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [inRange, setInRange] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springX = useSpring(rawX, { stiffness: 220, damping: 22 })
  const springY = useSpring(rawY, { stiffness: 220, damping: 22 })

  // Session setup
  useEffect(() => {
    let sessionId = localStorage.getItem('wm-session-id')
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      localStorage.setItem('wm-session-id', sessionId)
      reset()
    }
    updateProfile({ session_id: sessionId })
  }, [updateProfile, reset])

  // Magnetic tracking
  useEffect(() => {
    if (reducedMotion) return

    let cx = 0
    let cy = 0

    const updateCenter = () => {
      if (!buttonRef.current) return
      const rect = buttonRef.current.getBoundingClientRect()
      cx = rect.left + rect.width / 2
      cy = rect.top + rect.height / 2
    }

    // Wait a tick for layout before measuring
    const timeout = setTimeout(updateCenter, 100)
    window.addEventListener('resize', updateCenter)

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)

      if (dist < MAGNETIC_RADIUS && dist > 0) {
        const strength = Math.pow(1 - dist / MAGNETIC_RADIUS, 1.5)
        rawX.set((dx / dist) * strength * MAGNETIC_MAX)
        rawY.set((dy / dist) * strength * MAGNETIC_MAX)
        setInRange(true)
      } else {
        rawX.set(0)
        rawY.set(0)
        setInRange(false)
      }
    }

    window.addEventListener('mousemove', onMove)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', updateCenter)
    }
  }, [reducedMotion, rawX, rawY])

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Animated flight routes — decorative background */}
      <FlightMap
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
        }}
      />

      <header className="px-4 py-4 max-w-[640px] mx-auto w-full" style={{ position: 'relative', zIndex: 1 }}>
        <Logo />
      </header>

      <main className="flex-1 flex flex-col justify-center px-4 pb-16 max-w-[640px] mx-auto w-full" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-block text-xs font-medium px-3 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: 'var(--color-secondary)', color: '#0a0a0a' }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          >
            IA multi-provider
          </motion.div>

          <h1
            className="font-bold mb-4"
            style={{ fontSize: 'clamp(36px, 8vw, 56px)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.025em' }}
          >
            Vos voyages de{' '}
            <ShimmerText
              color="rgba(45,57,247,0.4)"
              duration={3}
              delay={0.8}
              style={{ color: 'var(--color-primary)' }}
            >
              rêve
            </ShimmerText>
            ,{' '}
            planifiés en 3 minutes.
          </h1>

          <p
            className="mb-10 leading-relaxed"
            style={{ fontSize: '18px', color: 'var(--color-grey-500)' }}
          >
            Répondez à 5 questions. Recevez 3 itinéraires personnalisés générés
            par IA, basés sur votre style, vos intérêts et votre budget.
          </p>

          {/* Magnetic CTA */}
          <motion.div
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mb-12"
          >
            <ShimmerText
              color="rgba(255,255,255,0.45)"
              width="40%"
              duration={2}
              delay={1.2}
              style={{ display: 'block' }}
            >
              <motion.button
                ref={buttonRef}
                onClick={() => { setStepDirection(1); router.push('/onboarding/step/1') }}
                animate={{ scale: inRange ? 1.015 : 1 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 px-8 rounded-[8px] font-medium text-[18px] text-white"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Découvrir mes itinéraires →
              </motion.button>
            </ShimmerText>
          </motion.div>

          <p style={{ fontSize: '14px', color: 'var(--color-grey-500)', letterSpacing: '0.01em' }}>
            5 questions · 3 itinéraires · généré en moins de 3 minutes
          </p>
        </motion.div>
      </main>
    </div>
  )
}
