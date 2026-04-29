CREATE TABLE traveler_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  travel_style TEXT,
  budget_tier TEXT,
  budget_range_min INTEGER,
  budget_range_max INTEGER,
  interests TEXT[] DEFAULT '{}',
  trip_duration_days INTEGER,
  companion_count INTEGER DEFAULT 1,
  lodging_preference TEXT,
  destinations_visited TEXT[] DEFAULT '{}',
  destinations_wishlist TEXT[] DEFAULT '{}',
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_session ON traveler_profiles(session_id);

CREATE TABLE generated_itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES traveler_profiles(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  title TEXT NOT NULL,
  destination TEXT,
  summary TEXT,
  days JSONB DEFAULT '[]',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_itineraries_profile ON generated_itineraries(profile_id);
