export type ActivityType = 'transport' | 'food' | 'activity' | 'accommodation' | 'free'

export interface Activity {
  time: string
  name: string
  description: string
  type: ActivityType
}

export interface Day {
  day: number
  theme: string
  activities: Activity[]
}

export interface Itinerary {
  id?: string
  title: string
  destination: string
  summary: string
  tags: string[]
  days: Day[]
  provider?: string
}
