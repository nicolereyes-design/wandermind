'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  currentStep: number
  totalSteps?: number
  onBack?: () => void
}

export function ProgressBar({ currentStep, totalSteps = 5, onBack }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Back arrow */}
      <motion.button
        type="button"
        onClick={onBack}
        aria-label="Étape précédente"
        whileHover={onBack ? { scale: 1.08 } : {}}
        whileTap={onBack ? { scale: 0.92 } : {}}
        transition={{ duration: 0.12 }}
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity"
        style={{
          border: '1.5px solid var(--color-grey-200)',
          color: 'var(--color-grey-500)',
          opacity: onBack ? 1 : 0,
          pointerEvents: onBack ? 'auto' : 'none',
          cursor: onBack ? 'pointer' : 'default',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>

      <div className="flex items-center gap-2 flex-1" role="progressbar" aria-valuenow={currentStep} aria-valuemax={totalSteps} aria-label={`Étape ${currentStep} sur ${totalSteps}`} aria-live="polite">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const stepNumber = i + 1
        const isCompleted = stepNumber < currentStep
        const isActive = stepNumber === currentStep

        return (
          <div key={i} className="flex items-center gap-2 flex-1">
            <motion.div
              animate={isActive ? { scale: [1, 1.22, 1] } : { scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0',
                isCompleted && 'text-white',
                isActive && 'text-white',
                !isCompleted && !isActive && 'text-[var(--color-grey-500)]'
              )}
              style={{
                backgroundColor: isCompleted
                  ? 'var(--color-success)'
                  : isActive
                  ? 'var(--color-primary)'
                  : 'var(--color-grey-200)',
                transition: 'background-color 0.3s ease',
              }}
            >
              {isCompleted ? (
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                  <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                stepNumber
              )}
            </motion.div>
            {i < totalSteps - 1 && (
              <div
                className="h-[2px] flex-1 transition-all duration-300"
                style={{
                  backgroundColor: isCompleted ? 'var(--color-success)' : 'var(--color-grey-200)',
                }}
              />
            )}
          </div>
        )
      })}
      </div>
    </div>
  )
}
