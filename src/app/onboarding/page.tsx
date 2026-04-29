'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Logo } from '@/components/shared/Logo'
import { useOnboardingStore } from '@/store/onboardingStore'
import { ShimmerText } from '@/components/ui/ShimmerText'

export default function OnboardingIntroPage() {
  const router = useRouter()
  const { updateProfile, reset, setStepDirection } = useOnboardingStore()

  useEffect(() => {
    let sessionId = localStorage.getItem('wm-session-id')
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      localStorage.setItem('wm-session-id', sessionId)
      reset()
    }
    updateProfile({ session_id: sessionId })
  }, [updateProfile, reset])

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ position: 'relative' }}>

      <header className="px-4 py-4 max-w-[640px] mx-auto w-full">
        <Logo />
      </header>

      <main className="flex-1 flex flex-col justify-center px-4 pb-16 max-w-[640px] mx-auto w-full">
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

          {/* CTA with shimmer sweep — from hyperframes/shimmer-sweep */}
          <motion.div
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
              <button
                onClick={() => { setStepDirection(1); router.push('/onboarding/step/1') }}
                className="w-full py-4 px-8 rounded-[8px] font-medium text-[18px] text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Découvrir mes itinéraires →
              </button>
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
