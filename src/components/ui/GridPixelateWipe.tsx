'use client'

// Ported from github.com/nicolereyes-design/hyperframes
// registry/components/grid-pixelate-wipe/grid-pixelate-wipe.html
// Adapted for React + Framer Motion (no GSAP dependency)

import { useEffect, useRef } from 'react'
import { animate } from 'framer-motion'

interface GridPixelateWipeProps {
  trigger: boolean          // true = cover screen, false = reveal screen
  color?: string
  cols?: number
  rows?: number
  onCovered?: () => void    // called when fully covered (mid-transition)
  from?: 'center' | 'edges' | 'random'
}

export function GridPixelateWipe({
  trigger,
  color = '#ffffff',
  cols = 12,
  rows = 8,
  onCovered,
  from = 'center',
}: GridPixelateWipeProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cells = Array.from(grid.querySelectorAll<HTMLElement>('.hf-grid-cell'))
    if (cells.length === 0) return

    const total = cells.length

    // Compute stagger order
    const ordered = sortCells(cells, cols, rows, from)

    if (trigger) {
      // Cover: scale 0 → 1
      ordered.forEach((cell, i) => {
        const delay = (i / total) * 0.5
        animate(cell, { scaleX: 1, scaleY: 1 }, { duration: 0.25, delay, ease: [0.4, 0, 0.2, 1] })
      })
      // onCovered fires when ~half done
      if (onCovered) {
        setTimeout(onCovered, (0.5 + 0.15) * 1000)
      }
    } else {
      // Reveal: scale 1 → 0
      const reversed = [...ordered].reverse()
      reversed.forEach((cell, i) => {
        const delay = (i / total) * 0.5
        animate(cell, { scaleX: 0, scaleY: 0 }, { duration: 0.25, delay, ease: [0.4, 0, 0.2, 1] })
      })
    }
  }, [trigger, cols, rows, from, onCovered])

  const cellCount = cols * rows

  return (
    <div
      ref={gridRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none',
        zIndex: 999,
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: cellCount }).map((_, i) => (
        <div
          key={i}
          className="hf-grid-cell"
          style={{
            backgroundColor: color,
            transform: 'scale(0)',
            transformOrigin: 'center center',
          }}
        />
      ))}
    </div>
  )
}

function sortCells(
  cells: HTMLElement[],
  cols: number,
  rows: number,
  from: 'center' | 'edges' | 'random'
): HTMLElement[] {
  if (from === 'random') {
    return [...cells].sort(() => Math.random() - 0.5)
  }

  const cx = (cols - 1) / 2
  const cy = (rows - 1) / 2

  return [...cells].sort((a, b) => {
    const ai = parseInt(a.dataset.i ?? '0')
    const bi = parseInt(b.dataset.i ?? '0')
    const ax = ai % cols, ay = Math.floor(ai / cols)
    const bx = bi % cols, by = Math.floor(bi / cols)

    const distA = Math.hypot(ax - cx, ay - cy)
    const distB = Math.hypot(bx - cx, by - cy)

    return from === 'center' ? distA - distB : distB - distA
  })
}
