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
      style={{ backgroundColor: 'var(--color-white)' }}
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
              style={{ backgroundColor: '#ffb200', color: 'var(--color-ink)' }}
            >
              Accès gratuit
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-center font-bold mb-2"
            style={{ fontSize: '28px', color: 'var(--color-ink)', letterSpacing: '-0.5px' }}
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
              backgroundColor: 'var(--color-white)',
              border: '1px solid var(--color-grey-200)',
              fontSize: '15px',
              color: 'var(--color-ink)',
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
              backgroundColor: 'var(--color-ink)',
              border: 'none',
              fontSize: '15px',
              color: 'var(--color-white)',
              cursor: 'pointer',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z"/>
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
          <label htmlFor="email-input" className="sr-only">Adresse email</label>
          <input
            id="email-input"
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
              color: 'var(--color-ink)',
              backgroundColor: 'var(--color-white)',
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
              color: 'var(--color-white)',
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
