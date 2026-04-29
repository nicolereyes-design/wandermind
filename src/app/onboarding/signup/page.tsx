'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Logo } from '@/components/shared/Logo'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  const handleContinue = () => {
    router.push('/onboarding/itinerary')
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Back link */}
      <div className="px-6 pt-6">
        <button
          onClick={() => router.push('/onboarding/results')}
          className="text-[14px] font-medium transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-grey-500)' }}
        >
          ← Retour aux résultats
        </button>
      </div>

      {/* Centered card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="w-full"
          style={{ maxWidth: '420px' }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Logo />
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-5">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-semibold"
              style={{ backgroundColor: '#ffb200', color: '#0a0a0a' }}
            >
              Accès gratuit
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-center font-bold mb-2"
            style={{ fontSize: '28px', color: '#0a0a0a', letterSpacing: '-0.5px' }}
          >
            Créez votre compte
          </h1>

          {/* Subtitle */}
          <p
            className="text-center mb-8"
            style={{ fontSize: '15px', color: 'var(--color-grey-500)', lineHeight: '1.55' }}
          >
            Sauvegardez vos itinéraires et planifiez votre prochain voyage.
          </p>

          {/* Google button */}
          <motion.button
            onClick={handleContinue}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 mb-3 font-medium transition-colors"
            style={{
              height: '48px',
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              border: '1px solid var(--color-grey-200)',
              fontSize: '15px',
              color: '#0a0a0a',
              cursor: 'pointer',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuer avec Google
          </motion.button>

          {/* Apple button */}
          <motion.button
            onClick={handleContinue}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 mb-6 font-medium"
            style={{
              height: '48px',
              borderRadius: '10px',
              backgroundColor: '#0a0a0a',
              border: 'none',
              fontSize: '15px',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 814 1000">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-43.4-150.3-109.7C27.5 709 0 558.1 0 413.1c0-199.5 130.3-305.5 258.7-305.5 69.5 0 127.1 43.4 170.8 43.4 42.1 0 108.5-45.8 186.9-45.8 30.1 0 108.2 2.6 168.6 76.8zm-316.9-74.7c-7.1-38.5-27.5-94.7-69.8-143.6-36.8-43.7-91.7-74-144.2-74-1.9 0-3.8 0-5.8.3 2.6 41.7 20.5 99.8 58.9 149.9 38.5 51 95.6 86.8 160.9 90.8-.2-7.4-.2-15.1-0-23.4z" fill="white"/>
            </svg>
            Continuer avec Apple
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1" style={{ height: '1px', backgroundColor: 'var(--color-grey-200)' }} />
            <span style={{ fontSize: '13px', color: 'var(--color-grey-500)', fontWeight: 500 }}>ou</span>
            <div className="flex-1" style={{ height: '1px', backgroundColor: 'var(--color-grey-200)' }} />
          </div>

          {/* Email input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            className="w-full mb-3 outline-none transition-all"
            style={{
              height: '48px',
              borderRadius: '10px',
              border: '1px solid var(--color-grey-200)',
              padding: '0 16px',
              fontSize: '15px',
              color: '#0a0a0a',
              backgroundColor: '#ffffff',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-grey-200)'
            }}
          />

          {/* Continuer button */}
          <motion.button
            onClick={handleContinue}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full font-semibold mb-6"
            style={{
              height: '48px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-primary)',
              border: 'none',
              fontSize: '15px',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            Continuer →
          </motion.button>

          {/* Legal */}
          <p
            className="text-center"
            style={{ fontSize: '12px', color: 'var(--color-grey-500)', lineHeight: '1.6' }}
          >
            En continuant, vous acceptez nos{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Conditions d&apos;utilisation</span>
            {' '}et notre{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Politique de confidentialité</span>.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
