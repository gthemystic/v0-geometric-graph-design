'use client'

import { useEffect, useRef } from 'react'

interface Wave {
  y: number
  amplitude: number
  frequency: number
  phase: number
}

import { type ColorTheme, COLOR_THEMES } from '@/lib/background-config'

export function WavesBackground({ theme = 'cosmic', intensity = 0.7 }: { theme?: ColorTheme; intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wavesRef = useRef<Wave[]>([])
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

    const initWaves = () => {
      wavesRef.current = [
        { y: canvas.height * 0.3, amplitude: 30, frequency: 0.01, phase: 0 },
        { y: canvas.height * 0.5, amplitude: 25, frequency: 0.008, phase: Math.PI * 0.3 },
        { y: canvas.height * 0.7, amplitude: 35, frequency: 0.012, phase: Math.PI * 0.6 },
      ]
    }

    initWaves()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      timeRef.current += 0.016

      wavesRef.current.forEach((wave, index) => {
        const t = COLOR_THEMES[themeRef.current]
        const int = intensityRef.current
        const hue = t.hueBase + index * 30

        // Draw wave
        ctx.beginPath()
        ctx.moveTo(0, wave.y)

        for (let x = 0; x <= canvas.width; x += 5) {
          // Wave distortion from cursor
          const dx = x - cursorRef.current.x
          const dy = wave.y - cursorRef.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const distortion = Math.max(0, 1 - distance / 200) * 40

          const sine =
            Math.sin(x * wave.frequency + timeRef.current * 0.002 + wave.phase) * wave.amplitude +
            Math.sin(distance * 0.02) * distortion

          ctx.lineTo(x, wave.y + sine)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        const gradient = ctx.createLinearGradient(0, wave.y - 50, 0, wave.y + 100)
        gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, ${0.4 * int})`)
        gradient.addColorStop(0.5, `hsla(${hue}, 100%, 45%, ${0.2 * int})`)
        gradient.addColorStop(1, `hsla(${hue}, 100%, 40%, 0)`)

        ctx.fillStyle = gradient
        ctx.fill()

        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${0.6 * int})`
        ctx.lineWidth = 2
        ctx.stroke()

        // Update wave
        wave.phase += 0.01
      })

      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initWaves()
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
