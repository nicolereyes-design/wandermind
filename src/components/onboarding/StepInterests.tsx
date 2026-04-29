'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mountain, Utensils, Landmark, Leaf, Waves, Building2, Sparkles, Camera, Music, ShoppingBag } from 'lucide-react'
import { useOnboardingStore } from '@/store/onboardingStore'
import { OnboardingShell } from './OnboardingShell'
import { OptionTile } from './OptionTile'
import { StepNavigation } from './StepNavigation'
import type { Interest } from '@/types/profile'

const INTEREST_OPTIONS: Array<{ value: Interest; label: string; icon: React.ReactNode }> = [
  { value: 'adventure', label: 'Aventure', icon: <Mountain size={22} /> },
  { value: 'gastronomy', label: 'Gastronomie', icon: <Utensils size={22} /> },
  { value: 'culture', label: 'Culture', icon: <Landmark size={22} /> },
  { value: 'nature', label: 'Nature', icon: <Leaf size={22} /> },
  { value: 'beach', label: 'Plage', icon: <Waves size={22} /> },
  { value: 'city', label: 'Vie urbaine', icon: <Building2 size={22} /> },
  { value: 'wellness', label: 'Bien-être', icon: <Sparkles size={22} /> },
  { value: 'photography', label: 'Photographie', icon: <Camera size={22} /> },
  { value: 'nightlife', label: 'Vie nocturne', icon: <Music size={22} /> },
  { value: 'shopping', label: 'Shopping', icon: <ShoppingBag size={22} /> },
]

export default function StepInterests() {
  const router = useRouter()
  const { profile, updateProfile, stepDirection } = useOnboardingStore()

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
        initial={{ opacity: 0, x: stepDirection * 32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="font-bold mb-2" style={{ fontSize: '32px', lineHeight: 'var(--leading-snug)', letterSpacing: '-0.015em' }}>
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
