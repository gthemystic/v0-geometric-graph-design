'use client'

import { useEffect, useRef } from 'react'
import { type ColorTheme, COLOR_THEMES, rgb } from '@/lib/background-config'

interface Star {
  x: number
  y: number
  z: number
  size: number
  vx: number
  vy: number
  opacity: number
  pulseSpeed: number
  pulsePhase: number
}

export function ConstellationBackground({ theme = 'cosmic', intensity = 0.7 }: { theme?: ColorTheme; intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()
  const themeRef = useRef(theme)
  const intensityRef = useRef(intensity)
  themeRef.current = theme
  intensityRef.current = intensity

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      const starCount = window.innerWidth < 768 ? 100 : 200
      starsRef.current = []

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 3,
          size: Math.random() * 3 + 1.5,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.4 + 0.7,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }
    }

    const drawStars = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const t = COLOR_THEMES[themeRef.current]
      const int = intensityRef.current

      starsRef.current.forEach((star) => {
        star.x += star.vx * int
        star.y += star.vy * int
        if (star.x < 0) star.x = canvas.width
        if (star.x > canvas.width) star.x = 0
        if (star.y < 0) star.y = canvas.height
        if (star.y > canvas.height) star.y = 0

        const pulse = Math.sin(time * star.pulseSpeed + star.pulsePhase)
        const currentOpacity = Math.min(star.opacity + pulse * 0.3, 1) * int

        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 5)
        gradient.addColorStop(0, rgb(t.accent, currentOpacity))
        gradient.addColorStop(0.3, rgb(t.primary, currentOpacity * 0.7))
        gradient.addColorStop(0.6, rgb(t.secondary, currentOpacity * 0.4))
        gradient.addColorStop(1, rgb(t.glow, 0))

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 5, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * 0.8, 0, Math.PI * 2)
        ctx.fill()
      })

      const maxDistance = window.innerWidth < 768 ? 150 : 220
      starsRef.current.forEach((star1, i) => {
        starsRef.current.slice(i + 1).forEach((star2) => {
          const dx = star2.x - star1.x
          const dy = star2.y - star1.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.6 * int
            const gradient = ctx.createLinearGradient(star1.x, star1.y, star2.x, star2.y)
            gradient.addColorStop(0, rgb(t.primary, opacity * star1.opacity))
            gradient.addColorStop(0.5, rgb(t.accent, opacity * ((star1.opacity + star2.opacity) / 2)))
            gradient.addColorStop(1, rgb(t.primary, opacity * star2.opacity))

            ctx.strokeStyle = gradient
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(star1.x, star1.y)
            ctx.lineTo(star2.x, star2.y)
            ctx.stroke()
          }
        })
      })

      animationRef.current = requestAnimationFrame(drawStars)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    resizeCanvas()
    animationRef.current = requestAnimationFrame(drawStars)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
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
