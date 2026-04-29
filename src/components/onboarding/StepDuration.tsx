'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboardingStore } from '@/store/onboardingStore'
import { OnboardingShell } from './OnboardingShell'
import { StepNavigation } from './StepNavigation'

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
  unit,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  unit: string
}) {
  return (
    <div
      className="flex items-center justify-between p-4 rounded-[12px] border-[1.5px]"
      style={{ borderColor: 'var(--color-grey-200)' }}
    >
      <div>
        <div className="font-medium text-[18px]">{label}</div>
        <div className="text-[14px]" style={{ color: 'var(--color-grey-500)' }}>
          {value} {unit}{value > 1 ? 's' : ''}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-11 h-11 rounded-full border-[1.5px] flex items-center justify-center text-lg font-medium transition-all disabled:opacity-30"
          style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
        >
          −
        </button>
        <span className="w-8 text-center font-bold text-[20px]">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-medium text-white transition-all disabled:opacity-30"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default function StepDuration() {
  const router = useRouter()
  const { profile, updateProfile } = useOnboardingStore()

  const duration = profile.trip_duration_days ?? 7
  const companions = profile.companion_count ?? 1

  return (
    <OnboardingShell currentStep={4} onBack={() => router.push('/onboarding/step/3')}>
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <h1 className="font-bold mb-2" style={{ fontSize: '32px', lineHeight: 'var(--leading-snug)', letterSpacing: '-0.015em' }}>
          Durée et compagnons
        </h1>
        <p className="mb-8" style={{ fontSize: '18px', color: 'var(--color-grey-500)' }}>
          Combien de temps, avec combien de personnes ?
        </p>

        <div className="flex flex-col gap-4">
          <Stepper
            label="Durée du voyage"
            value={duration}
            min={1}
            max={30}
            onChange={(v) => updateProfile({ trip_duration_days: v })}
            unit="jour"
          />
          <Stepper
            label="Nombre de voyageurs"
            value={companions}
            min={1}
            max={10}
            onChange={(v) => updateProfile({ companion_count: v })}
            unit="personne"
          />
        </div>

        <StepNavigation
          canNext={true}
          onNext={() => router.push('/onboarding/step/5')}
        />
      </motion.div>
    </OnboardingShell>
  )
}
