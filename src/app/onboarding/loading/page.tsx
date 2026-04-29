'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useOnboardingStore } from '@/store/onboardingStore'
import { MOCK_ITINERARIES } from '@/lib/mockItineraries'
import { generateItineraries } from '@/lib/ai/generate'
import { ShimmerText } from '@/components/ui/ShimmerText'

const MESSAGES = [
  'Analyse de votre profil voyageur...',
  'Recherche des meilleures destinations...',
  'Création de vos itinéraires sur mesure...',
  'Finalisation des recommandations...',
]

export default function LoadingPage() {
  const router = useRouter()
  const setGeneratedItineraries = useOnboardingStore((s) => s.setGeneratedItineraries)
  const [messageIndex, setMessageIndex] = useState(0)

  // Rotate messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  // Main logic — read profileId from sessionStorage (synchronous, no hydration wait)
  useEffect(() => {
    const profileId = sessionStorage.getItem('wm-profile-id')

    if (!profileId) {
      router.replace('/onboarding')
      return
    }

    if (profileId === 'demo') {
      // Demo mode: show animation then display mock itineraries
      const timer = setTimeout(() => {
        setGeneratedItineraries(MOCK_ITINERARIES)
        router.push('/onboarding/results')
      }, 3500)
      return () => clearTimeout(timer)
    }

    // Real mode: call AI server action
    generateItineraries(profileId)
      .then((itineraries) => {
        setGeneratedItineraries(itineraries)
        router.push('/onboarding/results')
      })
      .catch(() => {
        // Fallback to mock on AI error
        setGeneratedItineraries(MOCK_ITINERARIES)
        router.push('/onboarding/results')
      })
  }, [router, setGeneratedItineraries])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: 'var(--color-dark-bg)', position: 'relative' }}
    >
      <div className="text-center max-w-[400px]">
        {/* Wandering path SVG — animated stroke draw */}
        <div className="mx-auto mb-10" style={{ width: 80, height: 80 }}>
          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            {/* Outer ring */}
            <motion.circle
              cx="40" cy="40" r="36"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
            />
            {/* Animated arc */}
            <motion.circle
              cx="40" cy="40" r="36"
              stroke="rgba(45,57,247,0.9)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              animate={{ strokeDashoffset: [0, -1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
              style={{ strokeDashoffset: 0.75 }}
            />
            {/* Inner pin — destination dot */}
            <motion.circle
              cx="40" cy="40" r="5"
              fill="white"
              animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Cross hairs */}
            <motion.line x1="40" y1="22" x2="40" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
            <motion.line x1="40" y1="50" x2="40" y2="58" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
            <motion.line x1="22" y1="40" x2="30" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
            <motion.line x1="50" y1="40" x2="58" y2="40" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
          </motion.svg>
        </div>

        {/* Thin progress track — replaces bouncing dots */}
        <div
          className="mx-auto mb-8 rounded-full overflow-hidden"
          style={{ width: 120, height: 2, backgroundColor: 'rgba(255,255,255,0.08)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: 'rgba(45,57,247,0.8)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Shimmer rotating messages — from hyperframes/shimmer-sweep */}
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 6 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(8px)', y: -6 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <ShimmerText
              color="rgba(255,255,255,0.3)"
              width="50%"
              duration={1.8}
              style={{ color: 'rgba(255,255,255,0.7)', fontSize: '17px', fontWeight: '500' }}
            >
              {MESSAGES[messageIndex]}
            </ShimmerText>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
