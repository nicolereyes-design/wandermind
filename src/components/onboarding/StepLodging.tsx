'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useOnboardingStore } from '@/store/onboardingStore'
import { OnboardingShell } from './OnboardingShell'
import { OptionTile } from './OptionTile'
import { StepNavigation } from './StepNavigation'
import type { LodgingPreference } from '@/types/profile'

const LODGING_OPTIONS: Array<{ value: LodgingPreference; label: string; description: string; icon: string }> = [
  { value: 'hostel', label: 'Auberge', description: 'Social et économique', icon: '🏠' },
  { value: 'boutique_hotel', label: 'Boutique hôtel', description: 'Charme et authenticité', icon: '🏡' },
  { value: 'hotel', label: 'Hôtel classique', description: 'Confort et services', icon: '🏨' },
  { value: 'resort', label: 'Resort', description: 'Tout inclus, détente', icon: '🌴' },
  { value: 'vacation_rental', label: 'Location privée', description: 'Airbnb / appartement', icon: '🔑' },
  { value: 'camping', label: 'Camping / Glamping', description: 'Nature et aventure', icon: '⛺' },
]

export default function StepLodging() {
  const router = useRouter()
  const { profile, updateProfile, setProfileId } = useOnboardingStore()
  const [wishlistInput, setWishlistInput] = useState('')
  const [visitedInput, setVisitedInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const wishlist = profile.destinations_wishlist ?? []
  const visited = profile.destinations_visited ?? []

  const addWishlist = () => {
    const trimmed = wishlistInput.trim()
    if (trimmed && !wishlist.includes(trimmed)) {
      updateProfile({ destinations_wishlist: [...wishlist, trimmed] })
      setWishlistInput('')
    }
  }

  const addVisited = () => {
    const trimmed = visitedInput.trim()
    if (trimmed && !visited.includes(trimmed)) {
      updateProfile({ destinations_visited: [...visited, trimmed] })
      setVisitedInput('')
    }
  }

  const handleSubmit = async () => {
    if (!profile.lodging_preference) return
    setIsSubmitting(true)

    // Store in sessionStorage immediately — avoids Zustand hydration timing issues
    sessionStorage.setItem('wm-profile-id', 'demo')
    setProfileId('demo')

    // Try to persist to Supabase in background (no-op if credentials not set)
    fetch('/api/onboarding/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: profile.session_id,
        travel_style: profile.travel_style,
        budget_tier: profile.budget_tier,
        interests: profile.interests ?? [],
        trip_duration_days: profile.trip_duration_days ?? 7,
        companion_count: profile.companion_count ?? 1,
        lodging_preference: profile.lodging_preference,
        destinations_visited: profile.destinations_visited ?? [],
        destinations_wishlist: profile.destinations_wishlist ?? [],
      }),
    })
      .then((res) => res.json())
      .then((data: { profileId?: string }) => {
        if (data.profileId) {
          sessionStorage.setItem('wm-profile-id', data.profileId)
          setProfileId(data.profileId)
        }
      })
      .catch(() => {
        // Supabase unavailable — demo mode stays active
      })

    router.push('/onboarding/loading')
  }

  return (
    <OnboardingShell currentStep={5} onBack={() => router.push('/onboarding/step/4')}>
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <h1 className="font-bold mb-2" style={{ fontSize: '32px' }}>
          Hébergement &amp; destinations
        </h1>
        <p className="mb-6" style={{ fontSize: '18px', color: 'var(--color-grey-500)' }}>
          Dernière étape — où aimeriez-vous aller ?
        </p>

        <h2 className="font-medium text-[18px] mb-3">Hébergement préféré</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {LODGING_OPTIONS.map((option) => (
            <OptionTile
              key={option.value}
              label={option.label}
              description={option.description}
              icon={option.icon}
              selected={profile.lodging_preference === option.value}
              onClick={() => updateProfile({ lodging_preference: option.value })}
            />
          ))}
        </div>

        <label htmlFor="wishlist-input" className="font-medium text-[18px] mb-3 block">Destinations souhaitées</label>
        <div className="flex gap-2 mb-2">
          <input
            id="wishlist-input"
            type="text"
            value={wishlistInput}
            onChange={(e) => setWishlistInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addWishlist() }}
            placeholder="Ex: Japon, Portugal..."
            className="flex-1 px-3 py-2.5 rounded-[8px] border-[1.5px] text-[16px] outline-none"
            style={{ borderColor: 'var(--color-grey-200)' }}
          />
          <button
            type="button"
            onClick={addWishlist}
            aria-label="Ajouter une destination"
            className="px-4 py-2.5 rounded-[8px] text-white font-medium"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            +
          </button>
        </div>
        {wishlist.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {wishlist.map((dest) => (
              <button
                key={dest}
                type="button"
                className="px-3 py-1 rounded-full text-[14px] font-medium flex items-center gap-1.5"
                style={{ backgroundColor: 'var(--color-secondary)', color: '#0a0a0a' }}
                onClick={() => updateProfile({ destinations_wishlist: wishlist.filter((d) => d !== dest) })}
              >
                {dest} ×
              </button>
            ))}
          </div>
        )}

        <label htmlFor="visited-input" className="font-medium text-[18px] mb-3 block">Déjà visités <span className="font-normal text-[15px]" style={{ color: 'var(--color-grey-500)' }}>(optionnel)</span></label>
        <div className="flex gap-2 mb-2">
          <input
            id="visited-input"
            type="text"
            value={visitedInput}
            onChange={(e) => setVisitedInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') addVisited() }}
            placeholder="Ex: France, Thaïlande..."
            className="flex-1 px-3 py-2.5 rounded-[8px] border-[1.5px] text-[16px] outline-none"
            style={{ borderColor: 'var(--color-grey-200)' }}
          />
          <button
            type="button"
            onClick={addVisited}
            aria-label="Ajouter un pays déjà visité"
            className="px-4 py-2.5 rounded-[8px] text-white font-medium"
            style={{ backgroundColor: 'var(--color-grey-500)' }}
          >
            +
          </button>
        </div>
        {visited.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {visited.map((dest) => (
              <button
                key={dest}
                type="button"
                className="px-3 py-1 rounded-full text-[14px] font-medium"
                style={{ backgroundColor: 'var(--color-grey-200)', color: 'var(--color-grey-500)' }}
                onClick={() => updateProfile({ destinations_visited: visited.filter((d) => d !== dest) })}
              >
                {dest} ×
              </button>
            ))}
          </div>
        )}

        <StepNavigation
          canNext={!!profile.lodging_preference && !isSubmitting}
          onNext={handleSubmit}
          nextLabel={isSubmitting ? 'Enregistrement...' : 'Générer mes itinéraires'}
        />
      </motion.div>
    </OnboardingShell>
  )
}
