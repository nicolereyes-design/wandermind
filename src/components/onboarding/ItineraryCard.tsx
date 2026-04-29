'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Itinerary, ActivityType } from '@/types/itinerary'

const ACTIVITY_ICONS: Record<ActivityType, string> = {
  transport: '✈️',
  food: '🍽️',
  activity: '🎯',
  accommodation: '🏨',
  free: '🌟',
}

const CARD_ACCENTS = [
  { bg: '#eef0fe', dot: '#2d39f7' },
  { bg: '#fff8e6', dot: '#ffb200' },
  { bg: '#e6f9f3', dot: '#00c378' },
]

interface ItineraryCardProps {
  itinerary: Itinerary
  index: number
}

export function ItineraryCard({ itinerary, index }: ItineraryCardProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null)
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[16px] flex flex-col bg-white overflow-hidden"
      style={{ border: '1.5px solid var(--color-grey-200)', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
    >
      {/* Card header — colored band */}
      <div
        className="px-5 pt-5 pb-4"
        style={{ backgroundColor: accent.bg }}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className="px-2.5 py-1 rounded-full text-[12px] font-semibold"
            style={{ backgroundColor: accent.dot, color: 'white' }}
          >
            {itinerary.destination}
          </div>
          <div
            className="text-[12px] font-medium px-2.5 py-1 rounded-full"
            style={{ backgroundColor: 'white', color: 'var(--color-grey-500)', border: '1px solid var(--color-grey-200)' }}
          >
            {itinerary.days.length}j
          </div>
        </div>

        <h3 className="font-bold leading-tight" style={{ fontSize: '18px', color: '#0a0a0a' }}>
          {itinerary.title}
        </h3>
      </div>

      {/* Body */}
      <div className="px-5 py-4 flex flex-col gap-4 flex-1">
        {/* Summary */}
        <p style={{ fontSize: '14px', color: 'var(--color-grey-500)', lineHeight: '1.6' }}>
          {itinerary.summary}
        </p>

        {/* Tags */}
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
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-left transition-colors"
                style={{
                  backgroundColor: expandedDay === day.day ? accent.bg : 'white',
                }}
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
                  <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <AnimatePresence>
                {expandedDay === day.day && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      className="px-3.5 pb-3 pt-2 flex flex-col gap-3"
                      style={{ borderTop: '1px solid var(--color-grey-200)' }}
                    >
                      {day.activities.map((activity, i) => (
                        <div key={i} className="flex gap-2.5">
                          <span className="text-base flex-shrink-0 mt-0.5 leading-none">
                            {ACTIVITY_ICONS[activity.type]}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-baseline gap-2 flex-wrap">
                              <span className="font-medium text-[13px]">{activity.name}</span>
                              <span className="text-[11px]" style={{ color: 'var(--color-grey-500)' }}>{activity.time}</span>
                            </div>
                            <p className="text-[12px] mt-0.5 leading-relaxed" style={{ color: 'var(--color-grey-500)' }}>
                              {activity.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-5 pb-5 pt-1">
        <button
          type="button"
          className="w-full py-2.5 rounded-[8px] font-medium text-[14px] transition-all"
          style={{
            backgroundColor: accent.dot,
            color: 'white',
          }}
        >
          Choisir cet itinéraire →
        </button>
      </div>
    </motion.div>
  )
}
