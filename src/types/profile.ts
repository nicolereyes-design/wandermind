export const TRAVEL_STYLES = ['solo', 'couple', 'family', 'friends'] as const
export type TravelStyle = typeof TRAVEL_STYLES[number]

export const BUDGET_TIERS = ['budget', 'comfort', 'luxury'] as const
export type BudgetTier = typeof BUDGET_TIERS[number]

export const INTERESTS = [
  'adventure',
  'gastronomy',
  'culture',
  'nature',
  'beach',
  'city',
  'wellness',
  'photography',
  'nightlife',
  'shopping',
] as const
export type Interest = typeof INTERESTS[number]

export const LODGING_PREFERENCES = [
  'hostel',
  'boutique_hotel',
  'hotel',
  'resort',
  'vacation_rental',
  'camping',
] as const
export type LodgingPreference = typeof LODGING_PREFERENCES[number]

export interface TravelerProfile {
  session_id: string
  travel_style?: TravelStyle
  budget_tier?: BudgetTier
  budget_range?: { min: number; max: number }
  interests: Interest[]
  trip_duration_days?: number
  companion_count?: number
  lodging_preference?: LodgingPreference
  destinations_visited: string[]
  destinations_wishlist: string[]
}
