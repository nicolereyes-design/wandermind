'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboardingStore } from '@/store/onboardingStore'
import { OnboardingShell } from './OnboardingShell'
import { OptionTile } from './OptionTile'
import { StepNavigation } from './StepNavigation'
import type { TravelStyle } from '@/types/profile'

const STYLE_OPTIONS: Array<{ value: TravelStyle; label: string; description: string; icon: string }> = [
  { value: 'solo', label: 'Solo', description: 'Liberté totale, votre rythme', icon: '🧳' },
  { value: 'couple', label: 'En couple', description: 'Moments romantiques et complices', icon: '💑' },
  { value: 'family', label: 'En famille', description: 'Souvenirs pour tous les âges', icon: '👨‍👩‍👧‍👦' },
  { value: 'friends', label: 'Entre amis', description: "L'aventure à plusieurs", icon: '🤝' },
]

export default function StepTravelStyle() {
  const router = useRouter()
  const { profile, updateProfile } = useOnboardingStore()

  return (
    <OnboardingShell currentStep={1} onBack={() => router.push('/onboarding')}>
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <h1 className="font-bold mb-2" style={{ fontSize: '32px' }}>
          Quel est votre style de voyage ?
        </h1>
        <p className="mb-8" style={{ fontSize: '18px', color: 'var(--color-grey-500)' }}>
          Cela nous aide à adapter les activités et l&apos;ambiance.
        </p>

        <div className="flex flex-col gap-3">
          {STYLE_OPTIONS.map((option) => (
            <OptionTile
              key={option.value}
              label={option.label}
              description={option.description}
              icon={option.icon}
              selected={profile.travel_style === option.value}
              onClick={() => updateProfile({ travel_style: option.value })}
            />
          ))}
        </div>

        <StepNavigation
          canNext={!!profile.travel_style}
          onNext={() => router.push('/onboarding/step/2')}
        />
      </motion.div>
    </OnboardingShell>
  )
}
