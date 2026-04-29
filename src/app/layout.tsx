import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WanderMind — Planification de voyages IA',
  description: 'Découvrez 3 itinéraires personnalisés basés sur votre profil voyageur',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
