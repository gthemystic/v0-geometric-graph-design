'use client'

import { useEffect, useRef } from 'react'

interface Wave {
  points: { x: number; y: number; baseY: number; vx: number; vy: number }[]
  color: { h: number; s: number; l: number }
  speed: number
  amplitude: number
}

import { type ColorTheme, COLOR_THEMES } from '@/lib/background-config'

export function AuroraBackground({ theme = 'cosmic', intensity = 0.7 }: { theme?: ColorTheme; intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wavesRef = useRef<Wave[]>([])
  const timeRef = useRef(0)
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
      initWaves()
    }

    const initWaves = () => {
      const waveCount = 5
      wavesRef.current = []

      for (let w = 0; w < waveCount; w++) {
        const pointCount = 30
        const points = []
        const baseY = (canvas.height * (w + 1)) / (waveCount + 2)

        for (let i = 0; i < pointCount; i++) {
          points.push({
            x: (canvas.width * i) / (pointCount - 1),
            y: baseY,
            baseY: baseY,
            vx: 0,
            vy: 0,
          })
        }

        wavesRef.current.push({
          points,
          color: {
            h: 200 + w * 30,
            s: 70 + w * 5,
            l: 50 + w * 5,
          },
          speed: 0.001 + w * 0.0003,
          amplitude: 60 + w * 20,
        })
      }
    }

    const animate = () => {
      timeRef.current += 1
      const t = COLOR_THEMES[themeRef.current]
      const int = intensityRef.current

      ctx.fillStyle = `${t.bg} 0.03)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      wavesRef.current.forEach((wave, waveIndex) => {
        // Update points
        wave.points.forEach((point, i) => {
          const offset = Math.sin(timeRef.current * wave.speed + i * 0.5) * wave.amplitude
          point.y = point.baseY + offset
        })

        ctx.save()
        ctx.globalCompositeOperation = 'screen'

        const hue = t.hueBase + waveIndex * 30
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, `hsla(${hue}, ${wave.color.s}%, ${wave.color.l}%, 0)`)
        gradient.addColorStop(0.5, `hsla(${hue}, ${wave.color.s}%, ${wave.color.l}%, ${0.15 * int})`)
        gradient.addColorStop(1, `hsla(${hue}, ${wave.color.s}%, ${wave.color.l}%, ${0.05 * int})`)

        ctx.fillStyle = gradient

        ctx.beginPath()
        ctx.moveTo(wave.points[0].x, wave.points[0].y)

        // Draw smooth curve through points
        for (let i = 0; i < wave.points.length - 1; i++) {
          const xc = (wave.points[i].x + wave.points[i + 1].x) / 2
          const yc = (wave.points[i].y + wave.points[i + 1].y) / 2
          ctx.quadraticCurveTo(wave.points[i].x, wave.points[i].y, xc, yc)
        }

        // Complete the shape
        ctx.lineTo(wave.points[wave.points.length - 1].x, wave.points[wave.points.length - 1].y)
        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fill()

        ctx.strokeStyle = `hsla(${hue}, ${wave.color.s}%, ${wave.color.l + 20}%, ${0.4 * int})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(wave.points[0].x, wave.points[0].y)
        for (let i = 0; i < wave.points.length - 1; i++) {
          const xc = (wave.points[i].x + wave.points[i + 1].x) / 2
          const yc = (wave.points[i].y + wave.points[i + 1].y) / 2
          ctx.quadraticCurveTo(wave.points[i].x, wave.points[i].y, xc, yc)
        }
        ctx.stroke()

        ctx.restore()
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
