'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  mass: number
}

import { type ColorTheme, COLOR_THEMES, rgb } from '@/lib/background-config'

export function NebulaBackground({ theme = 'cosmic', intensity = 0.7 }: { theme?: ColorTheme; intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
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

    const initParticles = () => {
      particlesRef.current = []
      const count = window.innerWidth < 768 ? 150 : 300
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          size: Math.random() * 3 + 2,
          opacity: Math.random() * 0.4 + 0.3,
          mass: Math.random() * 0.8 + 0.5,
        })
      }
    }

    initParticles()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      timeRef.current += 0.016

      particlesRef.current.forEach((particle) => {
        // Attraction to cursor
        const dx = cursorRef.current.x - particle.x
        const dy = cursorRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.08
          particle.vx += (dx / distance) * force
          particle.vy += (dy / distance) * force
        }

        // Apply drift
        particle.vx += (Math.sin(timeRef.current * 0.0005 + particle.y) - 0.5) * 0.01
        particle.vy += (Math.cos(timeRef.current * 0.0005 + particle.x) - 0.5) * 0.01

        // Damping
        particle.vx *= 0.98
        particle.vy *= 0.98

        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around
        if (particle.x < -10) particle.x = canvas.width + 10
        if (particle.x > canvas.width + 10) particle.x = -10
        if (particle.y < -10) particle.y = canvas.height + 10
        if (particle.y > canvas.height + 10) particle.y = -10

        // Calculate cursor influence on opacity
        const cursorDistance = Math.sqrt(dx * dx + dy * dy)
        const cursorInfluence = Math.max(0, 1 - cursorDistance / 150)
        const currentOpacity = Math.min(particle.opacity + cursorInfluence * 0.4, 1)

        const t = COLOR_THEMES[themeRef.current]
        const int = intensityRef.current
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 8
        )
        gradient.addColorStop(0, rgb(t.primary, currentOpacity * 0.6 * int))
        gradient.addColorStop(0.5, rgb(t.secondary, currentOpacity * 0.3 * int))
        gradient.addColorStop(1, rgb(t.glow, 0))

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 8, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = rgb(t.accent, currentOpacity * int)
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.2 * intensityRef.current
            ctx.strokeStyle = rgb(COLOR_THEMES[themeRef.current].primary, opacity)
            ctx.lineWidth = 0.8
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
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
