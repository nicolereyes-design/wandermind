'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface OptionTileProps {
  label: string
  description?: string
  icon?: React.ReactNode
  selected: boolean
  onClick: () => void
  disabled?: boolean
}

export function OptionTile({
  label,
  description,
  icon,
  selected,
  onClick,
  disabled = false,
}: OptionTileProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { y: -1, boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}
      whileTap={disabled ? {} : { scale: 0.985 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'w-full min-h-[80px] p-4 rounded-[12px] border-[1.5px] text-left cursor-pointer',
        'flex items-center gap-3',
        selected
          ? 'border-[var(--color-primary)] text-[#0a0a0a]'
          : 'border-[var(--color-grey-200)] bg-white text-[#0a0a0a]',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
      style={selected ? { backgroundColor: 'rgba(45,57,247,0.05)' } : undefined}
    >
      {icon && (
        <motion.span
          className="flex-shrink-0 w-8 flex items-center justify-center"
          style={{ color: selected ? 'var(--color-primary)' : 'var(--color-grey-500)' }}
          whileHover={{ scale: 1.2, rotate: 6 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >{icon}</motion.span>
      )}
      <div className="flex-1">
        <div className="font-medium text-[18px] leading-tight">{label}</div>
        {description && (
          <div
            className="text-[14px] mt-0.5"
            style={{ color: 'var(--color-grey-500)' }}
          >
            {description}
          </div>
        )}
      </div>
      {selected && (
        <div
          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </motion.button>
  )
}
