'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TravelerProfile } from '@/types/profile'
import type { Itinerary } from '@/types/itinerary'

interface OnboardingState {
  _hasHydrated: boolean
  currentStep: number
  profile: Partial<TravelerProfile>
  generatedItineraries: Itinerary[]
  profileId: string | null
  setHasHydrated: (v: boolean) => void
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateProfile: (partial: Partial<TravelerProfile>) => void
  setGeneratedItineraries: (itineraries: Itinerary[]) => void
  setProfileId: (id: string) => void
  reset: () => void
}

const initialProfile: Partial<TravelerProfile> = {
  interests: [],
  destinations_visited: [],
  destinations_wishlist: [],
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      _hasHydrated: false,
      currentStep: 0,
      profile: initialProfile,
      generatedItineraries: [],
      profileId: null,
      setHasHydrated: (v) => set({ _hasHydrated: v }),
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),
      updateProfile: (partial) =>
        set((state) => ({ profile: { ...state.profile, ...partial } })),
      setGeneratedItineraries: (itineraries) => set({ generatedItineraries: itineraries }),
      setProfileId: (id) => set({ profileId: id }),
      reset: () => set({ currentStep: 0, profile: initialProfile, generatedItineraries: [], profileId: null }),
    }),
    {
      name: 'wm-onboarding',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
