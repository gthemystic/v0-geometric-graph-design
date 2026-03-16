'use client'

import { useEffect, useRef } from 'react'

interface Grain {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: { r: number; g: number; b: number }
  life: number
}

import { type ColorTheme, COLOR_THEMES, rgb } from '@/lib/background-config'

export function SandBackground({ theme = 'cosmic', intensity = 0.7 }: { theme?: ColorTheme; intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const grainsRef = useRef<Grain[]>([])
  const windRef = useRef({ x: 0, y: 0, target: { x: 0, y: 0 } })
  const themeRef = useRef(theme)
  const intensityRef = useRef(intensity)
  themeRef.current = theme
  intensityRef.current = intensity

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initGrains()
    }

    const createGrain = (): Grain => {
      const colors = [
        { r: 220, g: 180, b: 140 },
        { r: 210, g: 170, b: 130 },
        { r: 200, g: 160, b: 120 },
        { r: 230, g: 190, b: 150 },
      ]
      return {
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 0.3,
        vy: Math.random() * 0.3 + 0.2,
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
      }
    }

    const initGrains = () => {
      const grainCount = window.innerWidth < 768 ? 400 : 800
      grainsRef.current = []
      for (let i = 0; i < grainCount; i++) {
        const grain = createGrain()
        grain.y = Math.random() * canvas.height
        grainsRef.current.push(grain)
      }
    }

    const animate = () => {
      const t = COLOR_THEMES[themeRef.current]
      const int = intensityRef.current
      ctx.fillStyle = `${t.bg} 0.05)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update wind
      windRef.current.x += (windRef.current.target.x - windRef.current.x) * 0.02
      windRef.current.y += (windRef.current.target.y - windRef.current.y) * 0.02

      // Random wind changes
      if (Math.random() < 0.01) {
        windRef.current.target.x = (Math.random() - 0.5) * 0.3
        windRef.current.target.y = (Math.random() - 0.5) * 0.1
      }

      grainsRef.current.forEach((grain, index) => {
        // Apply gravity and wind
        grain.vy += 0.01
        grain.vx += windRef.current.x * 0.1
        grain.vy += windRef.current.y * 0.1

        // Update position
        grain.x += grain.vx
        grain.y += grain.vy

        // Decay life near bottom
        if (grain.y > canvas.height * 0.8) {
          grain.life -= 0.01
        }

        // Reset if off screen or dead
        if (grain.y > canvas.height || grain.life <= 0 || grain.x < 0 || grain.x > canvas.width) {
          grainsRef.current[index] = createGrain()
          return
        }

        const alpha = Math.min(grain.life, 0.8) * int
        
        const gradient = ctx.createRadialGradient(grain.x, grain.y, 0, grain.x, grain.y, grain.size * 2)
        gradient.addColorStop(0, rgb(t.primary, alpha * 0.5))
        gradient.addColorStop(0.5, rgb(t.secondary, alpha * 0.25))
        gradient.addColorStop(1, rgb(t.glow, 0))

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(grain.x, grain.y, grain.size * 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = rgb(t.accent, alpha)
        ctx.beginPath()
        ctx.arc(grain.x, grain.y, grain.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    animate()

    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: 'transparent' }}
    />
  )
}
