'use client'

import { useEffect, useRef } from 'react'

// City positions normalized 0–1 (x = left→right, y = top→bottom)
// Loosely approximates world geography — optimized for aesthetic spread
const CITIES = [
  { x: 0.08, y: 0.30 }, // New York
  { x: 0.10, y: 0.47 }, // Miami
  { x: 0.05, y: 0.17 }, // Toronto
  { x: 0.20, y: 0.64 }, // Bogotá
  { x: 0.22, y: 0.82 }, // Buenos Aires
  { x: 0.40, y: 0.19 }, // London
  { x: 0.44, y: 0.23 }, // Paris
  { x: 0.50, y: 0.19 }, // Amsterdam
  { x: 0.50, y: 0.30 }, // Rome
  { x: 0.56, y: 0.19 }, // Berlin
  { x: 0.63, y: 0.16 }, // Moscow
  { x: 0.47, y: 0.44 }, // Cairo
  { x: 0.38, y: 0.56 }, // Nairobi
  { x: 0.60, y: 0.49 }, // Dubai
  { x: 0.69, y: 0.31 }, // Delhi
  { x: 0.73, y: 0.46 }, // Bangkok
  { x: 0.80, y: 0.26 }, // Beijing
  { x: 0.88, y: 0.29 }, // Tokyo
  { x: 0.83, y: 0.52 }, // Singapore
  { x: 0.90, y: 0.70 }, // Sydney
]

interface Route {
  fromIdx: number
  toIdx: number
  progress: number
  opacity: number
  phase: 'drawing' | 'holding' | 'fading'
  holdTimer: number
  drawSpeed: number
}

interface FlightMapProps {
  className?: string
  style?: React.CSSProperties
}

export function FlightMap({ className, style }: FlightMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    const resizeCanvas = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      if (w === 0 || h === 0) return
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resizeCanvas()
    const ro = new ResizeObserver(resizeCanvas)
    ro.observe(canvas)

    const routes: Route[] = []
    let animId = 0
    let lastTime = performance.now()
    let spawnTimer = 0

    const spawnRoute = () => {
      const n = CITIES.length
      let fromIdx = Math.floor(Math.random() * n)
      let toIdx = Math.floor(Math.random() * n)
      while (toIdx === fromIdx) toIdx = Math.floor(Math.random() * n)
      routes.push({
        fromIdx,
        toIdx,
        progress: 0,
        opacity: 0,
        phase: 'drawing',
        holdTimer: 0,
        drawSpeed: 0.11 + Math.random() * 0.09,
      })
    }

    // Stagger initial routes so they don't all appear simultaneously
    for (let i = 0; i < 5; i++) {
      setTimeout(() => spawnRoute(), i * 500)
    }

    const quadBezier = (
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      t: number
    ) => ({
      x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x,
      y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y,
    })

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05)
      lastTime = time

      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      if (W === 0 || H === 0) {
        animId = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, W, H)

      // City dots — always visible as anchors
      CITIES.forEach((city) => {
        ctx.beginPath()
        ctx.arc(city.x * W, city.y * H, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(45,57,247,0.14)'
        ctx.fill()
      })

      // Spawn logic
      spawnTimer += dt
      if (spawnTimer > 1.3 && routes.length < 7) {
        spawnRoute()
        spawnTimer = 0
      }

      // Update and render each route
      for (let i = routes.length - 1; i >= 0; i--) {
        const r = routes[i]
        const from = { x: CITIES[r.fromIdx].x * W, y: CITIES[r.fromIdx].y * H }
        const to = { x: CITIES[r.toIdx].x * W, y: CITIES[r.toIdx].y * H }

        // Arc control point: pull midpoint upward relative to route length
        const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 }
        const dist = Math.hypot(to.x - from.x, to.y - from.y)
        const ctrl = { x: mid.x, y: mid.y - dist * 0.28 }

        // Phase transitions
        if (r.phase === 'drawing') {
          r.progress += r.drawSpeed * dt
          r.opacity = Math.min(1, r.opacity + dt * 3.5)
          if (r.progress >= 1) {
            r.progress = 1
            r.phase = 'holding'
            r.holdTimer = 0
          }
        } else if (r.phase === 'holding') {
          r.holdTimer += dt
          if (r.holdTimer > 1.3) r.phase = 'fading'
        } else {
          r.opacity -= dt * 0.55
          if (r.opacity <= 0) {
            routes.splice(i, 1)
            continue
          }
        }

        // Draw arc up to current progress using parametric segments
        const SEGS = 50
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        for (let s = 1; s <= SEGS; s++) {
          const t = (s / SEGS) * r.progress
          const pt = quadBezier(from, ctrl, to, t)
          ctx.lineTo(pt.x, pt.y)
        }
        ctx.strokeStyle = `rgba(45,57,247,${(r.opacity * 0.11).toFixed(3)})`
        ctx.lineWidth = 1
        ctx.lineCap = 'round'
        ctx.stroke()

        // Leading dot at tip during drawing phase
        if (r.phase === 'drawing' && r.progress < 1) {
          const tip = quadBezier(from, ctrl, to, r.progress)
          ctx.beginPath()
          ctx.arc(tip.x, tip.y, 2.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(45,57,247,${(r.opacity * 0.38).toFixed(3)})`
          ctx.fill()
        }
      }

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={style}
      aria-hidden="true"
    />
  )
}
