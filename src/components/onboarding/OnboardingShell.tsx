'use client'

import { Logo } from '@/components/shared/Logo'
import { ProgressBar } from './ProgressBar'

interface OnboardingShellProps {
  children: React.ReactNode
  currentStep: number
  showProgress?: boolean
  onBack?: () => void
}

export function OnboardingShell({ children, currentStep, showProgress = true, onBack }: OnboardingShellProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="px-4 py-4 flex items-center justify-between max-w-[640px] mx-auto w-full">
        <Logo />
      </header>

      {showProgress && (
        <div className="px-4 pb-6 max-w-[640px] mx-auto w-full">
          <ProgressBar currentStep={currentStep} totalSteps={5} onBack={onBack} />
        </div>
      )}

      <main className="flex-1 px-4 pb-8 max-w-[640px] mx-auto w-full">
        {children}
      </main>
    </div>
  )
}
