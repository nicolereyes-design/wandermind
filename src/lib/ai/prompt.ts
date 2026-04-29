import type { TravelerProfile } from '@/types/profile'

export function buildPrompt(profile: TravelerProfile): string {
  const interests = profile.interests?.join(', ') || 'various'
  const budgetRange = profile.budget_range
    ? ` (${profile.budget_range.min}–${profile.budget_range.max} CAD)`
    : ''
  const wishlist = profile.destinations_wishlist?.join(', ') || 'open to suggestions'
  const visited = profile.destinations_visited?.join(', ') || 'none specified'
  const companions = profile.companion_count ?? 1
  const duration = profile.trip_duration_days ?? 7

  return `You are an expert travel planner. Generate exactly 3 personalized travel itineraries for this traveler.

TRAVELER PROFILE:
- Travel style: ${profile.travel_style ?? 'solo'}
- Budget: ${profile.budget_tier ?? 'comfort'}${budgetRange}
- Interests: ${interests}
- Trip duration: ${duration} days
- Companions: ${companions} person(s)
- Preferred lodging: ${profile.lodging_preference ?? 'hotel'}
- Wished destinations: ${wishlist}
- Already visited (avoid repeating): ${visited}

REQUIREMENTS:
1. Each itinerary must propose a DIFFERENT destination
2. Each itinerary must have exactly ${duration} days
3. Tailor activities to the interests and budget
4. Each day should have 3-5 activities
5. Return valid JSON matching the schema exactly

Generate 3 complete itineraries now.`
}
