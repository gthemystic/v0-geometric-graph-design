'use client'

import { useEffect, useRef } from 'react'

interface Raindrop {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
}

import { type ColorTheme, COLOR_THEMES, rgb } from '@/lib/background-config'

export function RainBackground({ theme = 'cosmic', intensity = 0.7 }: { theme?: ColorTheme; intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const raindropsRef = useRef<Raindrop[]>([])
  const ripplesRef = useRef<{ x: number; y: number; radius: number; maxRadius: number; opacity: number }[]>([])
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
      initRain()
    }

    const createRaindrop = (): Raindrop => {
      return {
        x: Math.random() * canvas.width,
        y: -20,
        length: Math.random() * 15 + 10,
        speed: Math.random() * 1.5 + 2,
        opacity: Math.random() * 0.3 + 0.5,
      }
    }

    const initRain = () => {
      const dropCount = window.innerWidth < 768 ? 150 : 300
      raindropsRef.current = []
      for (let i = 0; i < dropCount; i++) {
        const drop = createRaindrop()
        drop.y = Math.random() * canvas.height
        raindropsRef.current.push(drop)
      }
    }

    const animate = () => {
      const t = COLOR_THEMES[themeRef.current]
      const int = intensityRef.current
      ctx.fillStyle = `${t.bg} 0.1)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ripple.radius += 0.6 * int
        ripple.opacity -= 0.015

        if (ripple.opacity > 0) {
          ctx.strokeStyle = rgb(t.primary, ripple.opacity * 0.4 * int)
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
          ctx.stroke()
          return true
        }
        return false
      })

      // Update and draw raindrops
      raindropsRef.current.forEach((drop, index) => {
        drop.y += drop.speed

        // Create ripple when hitting bottom
        if (drop.y > canvas.height) {
          if (Math.random() < 0.3) {
            ripplesRef.current.push({
              x: drop.x,
              y: canvas.height,
              radius: 0,
              maxRadius: 30,
              opacity: 1,
            })
          }
          raindropsRef.current[index] = createRaindrop()
          return
        }

        const gradient = ctx.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.length)
        gradient.addColorStop(0, rgb(t.primary, 0))
        gradient.addColorStop(0.5, rgb(t.accent, drop.opacity * int))
        gradient.addColorStop(1, rgb(t.accent, drop.opacity * 1.2 * int))

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(drop.x, drop.y + drop.length)
        ctx.stroke()

        ctx.fillStyle = rgb(t.accent, drop.opacity * 0.8 * int)
        ctx.beginPath()
        ctx.arc(drop.x, drop.y + drop.length, 1.5, 0, Math.PI * 2)
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
