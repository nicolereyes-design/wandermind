'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboardingStore } from '@/store/onboardingStore'
import { ItineraryCard } from '@/components/onboarding/ItineraryCard'
import { Logo } from '@/components/shared/Logo'
import { MOCK_ITINERARIES } from '@/lib/mockItineraries'
import { ShimmerText } from '@/components/ui/ShimmerText'
import type { Itinerary } from '@/types/itinerary'

export default function ResultsPage() {
  const router = useRouter()
  const { reset } = useOnboardingStore()
  const _hasHydrated = useOnboardingStore((s) => s._hasHydrated)
  const generatedItineraries = useOnboardingStore((s) => s.generatedItineraries)
  const [itineraries, setItineraries] = useState<Itinerary[]>(MOCK_ITINERARIES)
  const [isMock, setIsMock] = useState(true)

  useEffect(() => {
    if (!_hasHydrated) return
    if (generatedItineraries.length > 0) {
      setItineraries(generatedItineraries)
      setIsMock(false)
    }
  }, [_hasHydrated, generatedItineraries])

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: '#fafafa' }}>
      <header
        className="sticky top-0 z-10 px-4 py-3 flex items-center justify-between"
        style={{ backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--color-grey-200)' }}
      >
        <div className="max-w-[1100px] mx-auto w-full flex items-center justify-between">
          <Logo />
          <button
            onClick={() => {
              reset()
              if (typeof localStorage !== 'undefined') localStorage.removeItem('wm-session-id')
              router.push('/onboarding')
            }}
            className="text-[14px] font-medium px-4 py-2 rounded-[8px] transition-all"
            style={{ color: 'var(--color-grey-500)', border: '1px solid var(--color-grey-200)', backgroundColor: 'white' }}
          >
            ← Recommencer
          </button>
        </div>
      </header>

      <main className="px-4 pt-10 pb-8 max-w-[1100px] mx-auto">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-[12px] font-medium px-3 py-1.5 rounded-full mb-6"
            style={{
              backgroundColor: isMock ? 'var(--color-secondary)' : 'rgba(0,195,120,0.12)',
              color: isMock ? '#0a0a0a' : 'var(--color-success)',
              border: isMock ? 'none' : '1px solid rgba(0,195,120,0.25)',
            }}
          >
            {isMock ? (
              <><span>✦</span> Aperçu — données d&apos;exemple</>
            ) : (
              <><span>✓</span> Génération complète</>
            )}
          </motion.div>

          <h1
            className="font-bold mb-4 leading-tight"
            style={{ fontSize: 'clamp(36px, 6vw, 56px)' }}
          >
            Vos voyages de{' '}
            <ShimmerText color="rgba(45,57,247,0.35)" duration={3.5} delay={0.5} style={{ color: 'var(--color-primary)' }}>rêve</ShimmerText>
            ,<br />rien que pour vous.
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--color-grey-500)', maxWidth: '440px', margin: '0 auto' }}>
            3 itinéraires uniques, conçus selon votre profil voyageur.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {itineraries.map((itin, i) => (
            <ItineraryCard key={i} itinerary={itin} index={i} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8"
          style={{ borderTop: '1px solid var(--color-grey-200)' }}
        >
          <div>
            <p className="font-semibold text-[18px] mb-1">Envie de les garder ?</p>
            <p style={{ fontSize: '14px', color: 'var(--color-grey-500)' }}>
              Créez un compte pour retrouver, partager et modifier vos itinéraires.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={() => router.push('/onboarding/signup')}
              className="px-6 py-3 rounded-[8px] font-medium text-[15px] transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
            >
              Créer un compte gratuit
            </button>
            <button
              onClick={() => {
                reset()
                if (typeof localStorage !== 'undefined') localStorage.removeItem('wm-session-id')
                router.push('/onboarding')
              }}
              className="px-6 py-3 rounded-[8px] font-medium text-[15px] transition-all"
              style={{ color: 'var(--color-grey-500)', border: '1px solid var(--color-grey-200)', backgroundColor: 'white' }}
            >
              Générer d&apos;autres itinéraires
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
