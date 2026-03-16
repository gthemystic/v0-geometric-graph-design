'use client'

import { useEffect, useRef } from 'react'

interface Firefly {
  x: number
  y: number
  vx: number
  vy: number
  pulsePhase: number
  targetX: number
  targetY: number
  wanderAngle: number
}

import { type ColorTheme, COLOR_THEMES, rgb } from '@/lib/background-config'

export function FireflyBackground({ theme = 'cosmic', intensity = 0.7 }: { theme?: ColorTheme; intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const firefliesRef = useRef<Firefly[]>([])
  const timeRef = useRef(0)
  const cursorRef = useRef({ x: 0, y: 0 })
  const themeRef = useRef(theme)
  const intensityRef = useRef(intensity)
  themeRef.current = theme
  intensityRef.current = intensity

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const initFireflies = () => {
      firefliesRef.current = []
      const count = window.innerWidth < 768 ? 40 : 80
      for (let i = 0; i < count; i++) {
        firefliesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: 0,
          pulsePhase: Math.random() * Math.PI * 2,
          targetX: Math.random() * canvas.width,
          targetY: Math.random() * canvas.height,
          wanderAngle: Math.random() * Math.PI * 2,
        })
      }
    }

    initFireflies()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      timeRef.current += 0.016

      firefliesRef.current.forEach((firefly) => {
        // Attraction to cursor
        const dx = cursorRef.current.x - firefly.x
        const dy = cursorRef.current.y - firefly.y
        const distanceToCursor = Math.sqrt(dx * dx + dy * dy)

        if (distanceToCursor < 300) {
          const force = (1 - distanceToCursor / 300) * 0.15
          firefly.vx += (dx / distanceToCursor) * force
          firefly.vy += (dy / distanceToCursor) * force
        } else {
          // Wander behavior
          firefly.wanderAngle += (Math.random() - 0.5) * 0.3
          const targetDx = cursorRef.current.x + Math.cos(firefly.wanderAngle) * 200 - firefly.x
          const targetDy = cursorRef.current.y + Math.sin(firefly.wanderAngle) * 200 - firefly.y
          const targetDistance = Math.sqrt(targetDx * targetDx + targetDy * targetDy)

          firefly.vx += (targetDx / targetDistance) * 0.05
          firefly.vy += (targetDy / targetDistance) * 0.05
        }

        firefly.vx *= 0.95
        firefly.vy *= 0.95

        firefly.x += firefly.vx
        firefly.y += firefly.vy

        // Wrap around
        if (firefly.x < -10) firefly.x = canvas.width + 10
        if (firefly.x > canvas.width + 10) firefly.x = -10
        if (firefly.y < -10) firefly.y = canvas.height + 10
        if (firefly.y > canvas.height + 10) firefly.y = -10

        // Pulse and draw
        firefly.pulsePhase += 0.05
        const pulse = Math.sin(firefly.pulsePhase) * 0.5 + 0.8
        const size = 3 * pulse

        const t = COLOR_THEMES[themeRef.current]
        const int = intensityRef.current
        const gradient = ctx.createRadialGradient(firefly.x, firefly.y, 0, firefly.x, firefly.y, size * 8)
        gradient.addColorStop(0, rgb(t.accent, pulse * 0.8 * int))
        gradient.addColorStop(0.5, rgb(t.primary, pulse * 0.4 * int))
        gradient.addColorStop(1, rgb(t.glow, 0))

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(firefly.x, firefly.y, size * 8, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = rgb(t.accent, pulse * int)
        ctx.beginPath()
        ctx.arc(firefly.x, firefly.y, size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw trails between nearby fireflies
      for (let i = 0; i < firefliesRef.current.length; i++) {
        for (let j = i + 1; j < Math.min(i + 5, firefliesRef.current.length); j++) {
          const f1 = firefliesRef.current[i]
          const f2 = firefliesRef.current[j]
          const dx = f2.x - f1.x
          const dy = f2.y - f1.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = (1 - distance / 100) * 0.3 * intensityRef.current
            ctx.strokeStyle = rgb(COLOR_THEMES[themeRef.current].primary, opacity)
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(f1.x, f1.y)
            ctx.lineTo(f2.x, f2.y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: 'transparent' }}
    />
  )
}
