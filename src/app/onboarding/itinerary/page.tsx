'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Logo } from '@/components/shared/Logo'

const PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=900&q=80',
    alt: 'Mont Fuji',
    large: true,
  },
  {
    url: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600&q=80',
    alt: 'Fushimi Inari',
    large: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
    alt: 'Arashiyama bamboo',
    large: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=80',
    alt: 'Shibuya',
    large: false,
  },
  {
    url: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80',
    alt: 'Senso-ji',
    large: false,
  },
]

const DAYS = [
  {
    num: 1,
    theme: 'Arrivée à Tokyo',
    activities: 'Quartier Shinjuku, dîner ramen dans le Golden Gai',
  },
  {
    num: 2,
    theme: 'Tokyo impérial',
    activities: 'Senso-ji temple à Asakusa, Harajuku Takeshita street, Shibuya crossing au coucher du soleil',
  },
  {
    num: 3,
    theme: 'Tokyo moderne',
    activities: 'Musée TeamLab, Akihabara, déjeuner sushi au marché Tsukiji',
  },
  {
    num: 4,
    theme: 'Route vers Kyoto',
    activities: 'Shinkansen Tokyo–Kyoto (2h15), Fushimi Inari au coucher du soleil',
  },
  {
    num: 5,
    theme: 'Kyoto traditionnel',
    activities: 'Arashiyama bamboo grove, temple Kinkaku-ji (pavillon d\'or), quartier Gion',
  },
  {
    num: 6,
    theme: 'Nara & cerfs',
    activities: 'Parc de Nara, Grand temple Tōdai-ji, retour Kyoto',
  },
  {
    num: 7,
    theme: 'Osaka & départ',
    activities: 'Château d\'Osaka, marché Kuromon, Dotonbori, vol retour',
  },
]

const CITIES = [
  { name: 'Tokyo', days: 'Jour 1–3', x: 480, y: 80 },
  { name: 'Kyoto', days: 'Jour 4–5', x: 180, y: 160 },
  { name: 'Nara', days: 'Jour 6', x: 200, y: 195 },
  { name: 'Osaka', days: 'Jour 7', x: 160, y: 220 },
]

function AccordionDay({ day }: { day: typeof DAYS[0] }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{ borderBottom: '1px solid var(--color-grey-200)' }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 py-4 text-left transition-opacity hover:opacity-80"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <div
          className="flex-shrink-0 flex items-center justify-center font-bold text-white"
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            fontSize: '13px',
          }}
        >
          {day.num}
        </div>
        <div className="flex-1">
          <span
            className="font-semibold"
            style={{ fontSize: '15px', color: '#0a0a0a' }}
          >
            Jour {day.num} — {day.theme}
          </span>
        </div>
        <span
          style={{
            fontSize: '18px',
            color: 'var(--color-grey-500)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            display: 'inline-block',
          }}
        >
          ↓
        </span>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{ overflow: 'hidden' }}
        >
          <p
            className="pb-4 pl-[50px]"
            style={{ fontSize: '14px', color: 'var(--color-grey-500)', lineHeight: '1.6' }}
          >
            {day.activities}
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default function ItineraryPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen"
      style={{ backgroundColor: '#ffffff', color: '#0a0a0a' }}
    >
      {/* Header */}
      <header
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid var(--color-grey-200)' }}
      >
        <div className="max-w-[900px] mx-auto w-full flex items-center justify-between">
          <Logo />
          <span
            className="font-medium text-[14px]"
            style={{ color: 'var(--color-grey-500)' }}
          >
            Mon compte
          </span>
        </div>
      </header>

      <main className="px-4 max-w-[900px] mx-auto">

        {/* Hero section */}
        <section className="pt-10 pb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              {/* Saved badge */}
              <div className="mb-4">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white font-semibold"
                  style={{ backgroundColor: '#00c378', fontSize: '12px' }}
                >
                  ✓ Itinéraire sauvegardé
                </span>
              </div>

              <h1
                className="font-bold mb-3 leading-tight"
                style={{ fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.5px' }}
              >
                Kyoto, Tokyo &amp; Osaka
              </h1>

              <p style={{ fontSize: '16px', color: 'var(--color-grey-500)' }}>
                7 jours · Culture · Gastronomie · Temples · Budget moyen
              </p>
            </div>

            {/* Budget badge */}
            <div
              className="flex-shrink-0 flex flex-col items-center justify-center px-5 py-3 rounded-[12px]"
              style={{
                border: '1px solid var(--color-grey-200)',
                backgroundColor: '#fafafa',
                minWidth: '120px',
              }}
            >
              <span style={{ fontSize: '11px', color: 'var(--color-grey-500)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Budget</span>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#0a0a0a', marginTop: '2px' }}>~150€</span>
              <span style={{ fontSize: '12px', color: 'var(--color-grey-500)' }}>/ jour</span>
            </div>
          </div>
        </section>

        {/* Photo gallery */}
        <section className="mb-10">
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto' }}
          >
            {/* Large photo — spans 1 col, 2 rows */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              style={{ gridColumn: '1', gridRow: '1 / 3' }}
            >
              <img
                src={PHOTOS[0].url}
                alt={PHOTOS[0].alt}
                style={{
                  width: '100%',
                  height: '460px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  display: 'block',
                }}
              />
            </motion.div>

            {/* 4 smaller photos in 2x2 */}
            {PHOTOS.slice(1).map((photo, i) => (
              <motion.div
                key={photo.url}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + (i + 1) * 0.1 }}
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    display: 'block',
                  }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Map section */}
        <section className="mb-10">
          <p
            className="mb-3 font-semibold"
            style={{
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-grey-500)',
            }}
          >
            Votre trajet
          </p>

          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid var(--color-grey-200)',
            }}
          >
            <svg
              width="100%"
              height="280"
              viewBox="0 0 600 280"
              style={{ backgroundColor: '#f5f5f7', display: 'block' }}
            >
              {/* Japan map silhouette — very faint */}
              <path
                d="M 60 50 C 100 30 180 20 250 40 C 350 60 430 50 500 70 C 540 80 560 100 550 130 C 540 160 520 180 490 190 C 460 200 440 210 420 230 C 400 250 380 260 360 255 C 320 248 300 230 280 220 C 250 205 220 200 200 210 C 170 225 150 240 130 235 C 100 228 80 210 70 190 C 55 165 45 130 60 50 Z"
                fill="rgba(0,0,0,0.04)"
                stroke="none"
              />

              {/* Route path — animated */}
              <motion.path
                d="M 480 80 C 380 100 280 120 180 160 L 200 195 L 160 220"
                stroke="#2d39f7"
                strokeWidth="2.5"
                strokeDasharray="8 5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
              />

              {/* City dots and labels */}
              {CITIES.map((city) => (
                <g key={city.name}>
                  <circle cx={city.x} cy={city.y} r={8} fill="#2d39f7" />
                  <circle cx={city.x} cy={city.y} r={3} fill="white" />
                  <text
                    x={city.x}
                    y={city.y - 15}
                    textAnchor="middle"
                    fontSize={13}
                    fontWeight={600}
                    fill="#0a0a0a"
                    fontFamily="system-ui, -apple-system, sans-serif"
                  >
                    {city.name}
                  </text>
                  <text
                    x={city.x}
                    y={city.y - 2}
                    textAnchor="middle"
                    fontSize={11}
                    fill="#848a97"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    dy={16}
                  >
                    {city.days}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </section>

        {/* 7-day itinerary accordion */}
        <section className="mb-10">
          <p
            className="mb-1 font-semibold"
            style={{
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-grey-500)',
            }}
          >
            Programme jour par jour
          </p>
          <div
            style={{ borderTop: '1px solid var(--color-grey-200)', marginTop: '12px' }}
          >
            {DAYS.map((day) => (
              <AccordionDay key={day.num} day={day} />
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          className="flex flex-col sm:flex-row gap-3 pb-16"
          style={{ paddingTop: '8px' }}
        >
          <button
            className="font-semibold transition-opacity hover:opacity-80"
            style={{
              height: '48px',
              borderRadius: '10px',
              padding: '0 28px',
              fontSize: '15px',
              backgroundColor: 'transparent',
              border: '1.5px solid var(--color-primary)',
              color: 'var(--color-primary)',
              cursor: 'pointer',
            }}
          >
            Télécharger en PDF
          </button>
          <button
            className="font-semibold transition-opacity hover:opacity-80"
            style={{
              height: '48px',
              borderRadius: '10px',
              padding: '0 28px',
              fontSize: '15px',
              backgroundColor: 'var(--color-primary)',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Partager cet itinéraire
          </button>
        </section>

      </main>
    </motion.div>
  )
}
