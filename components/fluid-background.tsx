'use client'

import { useEffect, useRef } from 'react'

interface FluidParticle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  hue: number
  size: number
}

import { type ColorTheme, COLOR_THEMES } from '@/lib/background-config'

export function FluidBackground({ theme = 'cosmic', intensity = 0.7 }: { theme?: ColorTheme; intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<FluidParticle[]>([])
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

    const createParticle = (x: number, y: number): FluidParticle => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 1 + 0.5
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 300,
        hue: Math.random() * 60 + 200,
        size: Math.random() * 3 + 1,
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      timeRef.current += 0.016

      // Emit particles from cursor area
      if (Math.random() < 0.3) {
        const offsetX = (Math.random() - 0.5) * 60
        const offsetY = (Math.random() - 0.5) * 60
        particlesRef.current.push(createParticle(cursorRef.current.x + offsetX, cursorRef.current.y + offsetY))
      }

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.life--

        // Follow fluid dynamics
        const noiseX = Math.sin(particle.y * 0.01 + timeRef.current * 0.002) * 0.15
        const noiseY = Math.cos(particle.x * 0.01 + timeRef.current * 0.002) * 0.15

        particle.vx = particle.vx * 0.98 + noiseX
        particle.vy = particle.vy * 0.98 + noiseY
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.life <= 0) return false

        const lifeRatio = particle.life / particle.maxLife
        const opacity = Math.sin(lifeRatio * Math.PI) * 0.8

        const t = COLOR_THEMES[themeRef.current]
        const int = intensityRef.current
        const hue = (t.hueBase + particle.hue - 200 + timeRef.current * 0.5) % 360
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 4
        )
        gradient.addColorStop(0, `hsla(${hue}, 80%, 70%, ${opacity * int})`)
        gradient.addColorStop(0.6, `hsla(${hue}, 80%, 60%, ${opacity * 0.4 * int})`)
        gradient.addColorStop(1, `hsla(${hue}, 80%, 50%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
        ctx.fill()

        return true
      })

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
