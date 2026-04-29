'use client'

import { motion } from 'framer-motion'

interface StepNavigationProps {
  onNext: () => void
  canNext: boolean
  nextLabel?: string
}

export function StepNavigation({
  onNext,
  canNext,
  nextLabel = 'Continuer',
}: StepNavigationProps) {
  return (
    <div className="mt-8">
      <motion.button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        whileHover={canNext ? { y: -1, boxShadow: '0 6px 20px rgba(45,57,247,0.25)' } : {}}
        whileTap={canNext ? { scale: 0.97 } : {}}
        transition={{ duration: 0.15 }}
        className="w-full py-3 px-6 rounded-[8px] font-medium text-[18px] text-white disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        {nextLabel}
      </motion.button>
    </div>
  )
}
