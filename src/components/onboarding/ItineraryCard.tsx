'use client'

import React, { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import { Plane, Utensils, Target, Building, Star } from 'lucide-react'
import type { Itinerary, ActivityType } from '@/types/itinerary'

const ACTIVITY_ICONS: Record<ActivityType, React.ReactNode> = {
  transport: <Plane size={16} />,
  food: <Utensils size={16} />,
  activity: <Target size={16} />,
  accommodation: <Building size={16} />,
  free: <Star size={16} />,
}

const CARD_ACCENTS = [
  { bg: '#eef0fe', dot: '#2d39f7' },
  { bg: '#fff8e6', dot: '#ffb200' },
  { bg: '#e6f9f3', dot: '#00c378' },
]

interface ItineraryCardProps {
  itinerary: Itinerary
  index: number
  onSelect?: () => void
}

export function ItineraryCard({ itinerary, index, onSelect }: ItineraryCardProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length]
  const reducedMotion = useReducedMotion()

  // --- 3D tilt via spring physics ---
  // mouseX/Y are normalized 0–1 (0.5 = center = no tilt)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rawRotateY = useTransform(mouseX, [0, 1], [-9, 9])
  const rawRotateX = useTransform(mouseY, [0, 1], [6, -6])

  const springRotateX = useSpring(rawRotateX, { stiffness: 260, damping: 26 })
  const springRotateY = useSpring(rawRotateY, { stiffness: 260, damping: 26 })

  // Specular highlight: radial gradient that tracks cursor position
  const highlight = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,255,255,0.18) 0%, transparent 62%)`
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    mouseX.set(0.5)
    mouseY.set(0.5)
    setIsHovered(false)
  }

  return (
    // Outer wrapper — owns the 3D tilt transform
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        zIndex: isHovered ? 2 : undefined,
        perspective: 1200,
        rotateX: reducedMotion ? 0 : springRotateX,
        rotateY: reducedMotion ? 0 : springRotateY,
      }}
    >
      {/* Card — entrance animation + overflow-hidden */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 + index * 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[16px] flex flex-col bg-white overflow-hidden"
        style={{
          border: '1.5px solid var(--color-grey-200)',
          boxShadow: isHovered
            ? '0 20px 60px rgba(0,0,0,0.11), 0 4px 20px rgba(0,0,0,0.06)'
            : '0 2px 16px rgba(0,0,0,0.04)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Card header — colored band */}
        <div className="px-5 pt-5 pb-4" style={{ backgroundColor: accent.bg }}>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div
              className="px-2.5 py-1 rounded-full text-[12px] font-semibold"
              style={{ backgroundColor: accent.dot, color: 'white' }}
            >
              {itinerary.destination}
            </div>
            <div
              className="text-[12px] font-medium px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: 'white',
                color: 'var(--color-grey-500)',
                border: '1px solid var(--color-grey-200)',
              }}
            >
              {itinerary.days.length}j
            </div>
          </div>

          <h3
            className="font-bold"
            style={{
              fontSize: '20px',
              lineHeight: 'var(--leading-snug)',
              letterSpacing: '-0.01em',
              color: 'var(--color-ink)',
            }}
          >
            {itinerary.title}
          </h3>
        </div>

        {/* Body */}
        <div className="px-5 py-4 flex flex-col gap-4 flex-1">
          <p style={{ fontSize: '14px', color: 'var(--color-grey-500)', lineHeight: '1.6' }}>
            {itinerary.summary}
          </p>

          {itinerary.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {itinerary.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                  style={{ backgroundColor: 'var(--color-grey-100)', color: 'var(--color-grey-500)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Days accordion */}
          <div className="flex flex-col gap-1.5">
            <p
              className="text-[11px] font-semibold uppercase tracking-widest mb-1"
              style={{ color: 'var(--color-grey-500)' }}
            >
              Programme jour par jour
            </p>

            {itinerary.days.map((day) => (
              <div
                key={day.day}
                className="rounded-[10px] overflow-hidden"
                style={{ border: '1px solid var(--color-grey-200)' }}
              >
                <button
                  type="button"
                  onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                  aria-expanded={expandedDay === day.day}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary)]"
                  style={{ backgroundColor: expandedDay === day.day ? accent.bg : 'white' }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{ backgroundColor: accent.dot, color: 'white' }}
                    >
                      {day.day}
                    </span>
                    <span className="font-medium text-[14px]">{day.theme}</span>
                  </div>
                  <svg
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    style={{
                      transform: expandedDay === day.day ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      flexShrink: 0,
                      color: 'var(--color-grey-500)',
                    }}
                  >
                    <path
                      d="M5 3l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: expandedDay === day.day ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.22s ease',
                  }}
                >
                  <div style={{ minHeight: 0, overflow: 'hidden' }}>
                    <div
                      className="px-3.5 pb-3 pt-2 flex flex-col gap-3"
                      style={{ borderTop: '1px solid var(--color-grey-200)' }}
                    >
                      {day.activities.map((activity, i) => (
                        <div key={i} className="flex gap-2.5">
                          <span
                            className="flex-shrink-0 mt-0.5 leading-none flex items-center"
                            style={{ color: 'var(--color-grey-500)' }}
                          >
                            {ACTIVITY_ICONS[activity.type]}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="font-medium text-[13px]">{activity.name}</span>
                              <span className="text-[11px]" style={{ color: 'var(--color-grey-500)' }}>
                                {activity.time}
                              </span>
                            </div>
                            <p
                              className="text-[13px] mt-0.5 leading-relaxed"
                              style={{ color: 'var(--color-grey-500)' }}
                            >
                              {activity.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-5 pb-5 pt-1">
          <motion.button
            type="button"
            onClick={onSelect}
            className="w-full py-2.5 rounded-[8px] font-medium text-[14px] flex items-center justify-center gap-1.5"
            style={{ backgroundColor: accent.dot, color: 'white' }}
            whileHover="hover"
            initial="rest"
            animate="rest"
            whileTap={{ scale: 0.97 }}
          >
            <span>Choisir cet itinéraire</span>
            <motion.span
              variants={{ rest: { x: 0 }, hover: { x: 4 } }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              →
            </motion.span>
          </motion.button>
        </div>
      </motion.div>

      {/* Specular highlight — outside overflow-hidden, tracks cursor position */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 rounded-[16px] pointer-events-none"
            style={{ background: highlight }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
