# WanderMind Onboarding

Flow d'onboarding voyageur en 7 écrans qui collecte un profil et génère 3 itinéraires personnalisés via IA multi-provider.

## Commandes

- `pnpm dev` — Serveur de développement (localhost:3000)
- `pnpm build` — Build production
- `pnpm lint` — ESLint

## Tech Stack

Next.js 15 (App Router) + TypeScript strict + Tailwind CSS v4 + shadcn/ui + Zustand + Supabase + Vercel AI SDK (OpenAI/Anthropic/Google) + Framer Motion + Vercel

## Architecture

### Structure clé
- `src/app/onboarding/` — Pages du flow (intro, step/[step], loading, results)
- `src/components/onboarding/` — Composants step-specific + partagés
- `src/store/onboardingStore.ts` — Zustand store — état du profil en cours
- `src/lib/ai/` — Providers IA, prompt builder, Server Action generate
- `src/lib/supabase/` — Clients browser/server

### Data Flow
1. Utilisateur complète les steps → Zustand store accumule Partial TravelerProfile
2. Step 5 soumis → POST /api/onboarding/profile → Supabase persiste le profil
3. /onboarding/loading → Server Action generateItineraries(profileId) → Vercel AI SDK → 3 providers en fallback
4. Résultats → page /onboarding/results

## Design System (BYCo)

### Couleurs
- Primary: #2d39f7
- Primary hover: #050d85
- Secondary: #ffb200
- Success: #00c378
- Error: #f84848
- Grey-200: #e3e4ea
- Grey-500: #848a97
- Disabled: #a6a6a6

## Variables d'environnement requis
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- OPENAI_API_KEY
- ANTHROPIC_API_KEY
- GOOGLE_GENERATIVE_AI_API_KEY
