'use client'

// Ported from github.com/nicolereyes-design/hyperframes
// registry/components/shimmer-sweep/shimmer-sweep.html
// Adapted for React + CSS animation (no GSAP dependency)

import { useEffect, useRef } from 'react'

interface ShimmerTextProps {
  children: React.ReactNode
  color?: string
  width?: string
  angle?: string
  duration?: number
  delay?: number
  className?: string
  style?: React.CSSProperties
}

export function ShimmerText({
  children,
  color = 'rgba(255,255,255,0.55)',
  width = '30%',
  angle = '120deg',
  duration = 2.4,
  delay = 0,
  className,
  style,
}: ShimmerTextProps) {
  const id = useRef(`shimmer-${Math.random().toString(36).slice(2, 7)}`)

  return (
    <>
      <span
        className={`hf-shimmer-target ${className ?? ''}`}
        data-shimmer-id={id.current}
        style={{ position: 'relative', display: 'inline-block', ...style }}
      >
        {children}
        <span
          className="hf-shimmer-mask"
          style={{
            ['--shimmer-color' as string]: color,
            ['--shimmer-width' as string]: width,
            ['--shimmer-angle' as string]: angle,
            ['--shimmer-duration' as string]: `${duration}s`,
            ['--shimmer-delay' as string]: `${delay}s`,
          }}
        />
      </span>

      <style>{`
        @keyframes hf-shimmer-sweep {
          0%   { --shimmer-pos: -20%; }
          100% { --shimmer-pos: 120%; }
        }

        @property --shimmer-pos {
          syntax: '<percentage>';
          inherits: false;
          initial-value: -20%;
        }

        .hf-shimmer-mask {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          background: linear-gradient(
            var(--shimmer-angle, 120deg),
            transparent 0%,
            transparent calc(var(--shimmer-pos, -20%) - var(--shimmer-width, 30%) / 2),
            var(--shimmer-color, rgba(255,255,255,0.55)) var(--shimmer-pos, -20%),
            transparent calc(var(--shimmer-pos, -20%) + var(--shimmer-width, 30%) / 2),
            transparent 100%
          );
          mix-blend-mode: overlay;
          animation: hf-shimmer-sweep var(--shimmer-duration, 2.4s) var(--shimmer-delay, 0s) ease-in-out infinite;
          border-radius: inherit;
        }
      `}</style>
    </>
  )
}
