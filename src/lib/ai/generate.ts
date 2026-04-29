'use server'

import { generateObject } from 'ai'
import { z } from 'zod'
import { providers } from './providers'
import { buildPrompt } from './prompt'
import { createServerClient } from '@/lib/supabase/server'
import type { Itinerary } from '@/types/itinerary'

const itinerarySchema = z.object({
  itineraries: z.array(
    z.object({
      title: z.string(),
      destination: z.string(),
      summary: z.string(),
      tags: z.array(z.string()),
      days: z.array(
        z.object({
          day: z.number(),
          theme: z.string(),
          activities: z.array(
            z.object({
              time: z.string(),
              name: z.string(),
              description: z.string(),
              type: z.enum(['transport', 'food', 'activity', 'accommodation', 'free']),
            })
          ),
        })
      ),
    })
  ),
})

interface GenerateResult {
  object: {
    itineraries: Array<{
      title: string
      destination: string
      summary: string
      tags: string[]
      days: Array<{
        day: number
        theme: string
        activities: Array<{
          time: string
          name: string
          description: string
          type: 'transport' | 'food' | 'activity' | 'accommodation' | 'free'
        }>
      }>
    }>
  }
}

export async function generateItineraries(profileId: string): Promise<Itinerary[]> {
  const supabase = createServerClient()

  const { data: profileData, error } = await supabase
    .from('traveler_profiles')
    .select('*')
    .eq('id', profileId)
    .single()

  if (error || !profileData) {
    throw new Error('Profile not found')
  }

  const prompt = buildPrompt(profileData)

  let result: GenerateResult | null = null
  const providerNames = ['openai', 'anthropic', 'google']
  let usedProvider = providerNames[0]

  for (let i = 0; i < providers.length; i++) {
    try {
      usedProvider = providerNames[i]
      result = await generateObject({
        model: providers[i],
        schema: itinerarySchema,
        prompt,
      }) as GenerateResult
      break
    } catch {
      if (i === providers.length - 1) {
        throw new Error('All AI providers failed')
      }
    }
  }

  if (!result) throw new Error('No result from AI')

  const itineraries = result.object.itineraries as Itinerary[]

  await Promise.all(
    itineraries.map((itin) =>
      supabase.from('generated_itineraries').insert({
        profile_id: profileId,
        provider: usedProvider,
        title: itin.title,
        destination: itin.destination,
        summary: itin.summary,
        days: itin.days,
        tags: itin.tags,
      })
    )
  )

  return itineraries
}
