'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboardingStore } from '@/store/onboardingStore'
import { OnboardingShell } from './OnboardingShell'
import { OptionTile } from './OptionTile'
import { StepNavigation } from './StepNavigation'
import type { BudgetTier } from '@/types/profile'

const BUDGET_OPTIONS: Array<{ value: BudgetTier; label: string; description: string; icon: string }> = [
  { value: 'budget', label: 'Économique', description: 'Auberges, transports locaux, street food', icon: '💰' },
  { value: 'comfort', label: 'Confort', description: 'Hôtels 3-4★, restaurants variés', icon: '✈️' },
  { value: 'luxury', label: 'Luxe', description: 'Hôtels 5★, expériences exclusives', icon: '💎' },
]

export default function StepBudget() {
  const router = useRouter()
  const { profile, updateProfile } = useOnboardingStore()

  return (
    <OnboardingShell currentStep={2} onBack={() => router.push('/onboarding/step/1')}>
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <h1 className="font-bold mb-2" style={{ fontSize: '32px' }}>
          Quel est votre budget ?
        </h1>
        <p className="mb-8" style={{ fontSize: '18px', color: 'var(--color-grey-500)' }}>
          Pour l&apos;ensemble du voyage, hébergement inclus.
        </p>

        <div className="flex flex-col gap-3">
          {BUDGET_OPTIONS.map((option) => (
            <OptionTile
              key={option.value}
              label={option.label}
              description={option.description}
              icon={option.icon}
              selected={profile.budget_tier === option.value}
              onClick={() => updateProfile({ budget_tier: option.value })}
            />
          ))}
        </div>

        <StepNavigation
          canNext={!!profile.budget_tier}
          onNext={() => router.push('/onboarding/step/3')}
        />
      </motion.div>
    </OnboardingShell>
  )
}
