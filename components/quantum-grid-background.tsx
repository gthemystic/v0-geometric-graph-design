'use client'

import { useEffect, useRef } from 'react'

interface GridPoint {
  x: number
  y: number
  baseX: number
  baseY: number
  offset: number
  phase: number
  active: boolean
  activationTime: number
}

import { type ColorTheme, COLOR_THEMES, rgb } from '@/lib/background-config'

export function QuantumGridBackground({ theme = 'cosmic', intensity = 0.7 }: { theme?: ColorTheme; intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gridPointsRef = useRef<GridPoint[]>([])
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const themeRef = useRef(theme)
  const intensityRef = useRef(intensity)
  themeRef.current = theme
  intensityRef.current = intensity

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const gridSpacing = window.innerWidth < 768 ? 70 : 60
    const pointRadius = 3

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initGrid()
    }

    const initGrid = () => {
      gridPointsRef.current = []
      const cols = Math.ceil(canvas.width / gridSpacing) + 1
      const rows = Math.ceil(canvas.height / gridSpacing) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSpacing
          const y = j * gridSpacing
          gridPointsRef.current.push({
            x,
            y,
            baseX: x,
            baseY: y,
            offset: Math.random() * Math.PI * 2,
            phase: Math.random() * Math.PI * 2,
            active: Math.random() > 0.95,
            activationTime: 0,
          })
        }
      }
    }

    const draw = (time: number) => {
      const t = COLOR_THEMES[themeRef.current]
      const int = intensityRef.current
      ctx.fillStyle = `${t.bg} 0.4)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const timeSeconds = time * 0.001

      gridPointsRef.current.forEach((point, index) => {
        // Quantum wave effect
        const wave = Math.sin(timeSeconds * 0.5 + point.offset) * 3
        point.x = point.baseX + wave
        point.y = point.baseY + Math.cos(timeSeconds * 0.3 + point.phase) * 3

        // Random quantum "collapse" - points phase in and out
        if (Math.random() > 0.998) {
          point.active = !point.active
          point.activationTime = time
        }

        // Calculate opacity
        let opacity = 0.5
        if (point.active) {
          const timeSinceActivation = time - point.activationTime
          opacity = 0.85 + Math.sin(timeSinceActivation * 0.005) * 0.15
        }

        // Draw grid lines to neighbors
        const neighborIndices = [index + 1, index + Math.ceil(canvas.height / gridSpacing) + 1]
        neighborIndices.forEach((neighborIndex) => {
          const neighbor = gridPointsRef.current[neighborIndex]
          if (neighbor && Math.abs(neighbor.baseX - point.baseX) < gridSpacing * 2) {
            const dx = neighbor.x - point.x
            const dy = neighbor.y - point.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < gridSpacing * 1.5) {
              const lineOpacity = Math.min(opacity, 0.4) * int
              const gradient = ctx.createLinearGradient(point.x, point.y, neighbor.x, neighbor.y)
              gradient.addColorStop(0, rgb(t.primary, lineOpacity))
              gradient.addColorStop(0.5, rgb(t.secondary, lineOpacity * 0.8))
              gradient.addColorStop(1, rgb(t.glow, lineOpacity * 0.6))

              ctx.strokeStyle = gradient
              ctx.lineWidth = 1.2
              ctx.beginPath()
              ctx.moveTo(point.x, point.y)
              ctx.lineTo(neighbor.x, neighbor.y)
              ctx.stroke()
            }
          }
        })

        // Draw point
        if (point.active) {
          const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, pointRadius * 6)
          gradient.addColorStop(0, rgb(t.accent, opacity * int))
          gradient.addColorStop(0.3, rgb(t.primary, opacity * 0.7 * int))
          gradient.addColorStop(0.6, rgb(t.secondary, opacity * 0.4 * int))
          gradient.addColorStop(1, rgb(t.glow, 0))

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(point.x, point.y, pointRadius * 6, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = point.active 
          ? `rgba(255, 255, 255, ${opacity * int})` 
          : rgb(t.primary, opacity * int)
        ctx.beginPath()
        ctx.arc(point.x, point.y, pointRadius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      // Activate nearby points
      gridPointsRef.current.forEach((point) => {
        const dx = point.baseX - e.clientX
        const dy = point.baseY - e.clientY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          point.active = true
          point.activationTime = performance.now()
        }
      })
    }

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    resizeCanvas()

    ctx.fillStyle = `${COLOR_THEMES[themeRef.current].bg} 1)`
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    animationRef.current = requestAnimationFrame(draw)

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
