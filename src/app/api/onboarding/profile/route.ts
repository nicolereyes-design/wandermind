import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const body = await req.json() as Record<string, unknown>
  const { session_id, ...profile } = body

  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('traveler_profiles')
    .upsert(
      { session_id, ...profile, completed: true },
      { onConflict: 'session_id' }
    )
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ profileId: (data as { id: string }).id })
}
