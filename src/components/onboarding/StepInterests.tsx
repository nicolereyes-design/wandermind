'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboardingStore } from '@/store/onboardingStore'
import { OnboardingShell } from './OnboardingShell'
import { OptionTile } from './OptionTile'
import { StepNavigation } from './StepNavigation'
import type { Interest } from '@/types/profile'

const INTEREST_OPTIONS: Array<{ value: Interest; label: string; icon: string }> = [
  { value: 'adventure', label: 'Aventure', icon: '🏔️' },
  { value: 'gastronomy', label: 'Gastronomie', icon: '🍽️' },
  { value: 'culture', label: 'Culture', icon: '🏛️' },
  { value: 'nature', label: 'Nature', icon: '🌿' },
  { value: 'beach', label: 'Plage', icon: '🏖️' },
  { value: 'city', label: 'Vie urbaine', icon: '🏙️' },
  { value: 'wellness', label: 'Bien-être', icon: '🧘' },
  { value: 'photography', label: 'Photographie', icon: '📸' },
  { value: 'nightlife', label: 'Vie nocturne', icon: '🎶' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
]

export default function StepInterests() {
  const router = useRouter()
  const { profile, updateProfile } = useOnboardingStore()

  const selectedInterests = profile.interests ?? []

  const toggleInterest = (interest: Interest) => {
    if (selectedInterests.includes(interest)) {
      updateProfile({ interests: selectedInterests.filter((i) => i !== interest) })
    } else {
      updateProfile({ interests: [...selectedInterests, interest] })
    }
  }

  return (
    <OnboardingShell currentStep={3} onBack={() => router.push('/onboarding/step/2')}>
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <h1 className="font-bold mb-2" style={{ fontSize: '32px' }}>
          Qu&apos;est-ce qui vous passionne ?
        </h1>
        <p className="mb-8" style={{ fontSize: '18px', color: 'var(--color-grey-500)' }}>
          Sélectionnez au moins un intérêt.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {INTEREST_OPTIONS.map((option) => (
            <OptionTile
              key={option.value}
              label={option.label}
              icon={option.icon}
              selected={selectedInterests.includes(option.value)}
              onClick={() => toggleInterest(option.value)}
            />
          ))}
        </div>

        {selectedInterests.length > 0 && (
          <p className="mt-4 text-sm" style={{ color: 'var(--color-grey-500)' }}>
            {selectedInterests.length} sélectionné{selectedInterests.length > 1 ? 's' : ''}
          </p>
        )}

        <StepNavigation
          canNext={selectedInterests.length > 0}
          onNext={() => router.push('/onboarding/step/4')}
        />
      </motion.div>
    </OnboardingShell>
  )
}
