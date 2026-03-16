'use client'

import { useEffect, useRef } from 'react'

interface Crystal {
  x: number
  y: number
  size: number
  rotation: number
  depth: number
}

import { type ColorTheme, COLOR_THEMES, rgb } from '@/lib/background-config'

export function CrystallineBackground({ theme = 'cosmic', intensity = 0.7 }: { theme?: ColorTheme; intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const crystalsRef = useRef<Crystal[]>([])
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

    const initCrystals = () => {
      crystalsRef.current = []
      const count = window.innerWidth < 768 ? 40 : 80
      for (let i = 0; i < count; i++) {
        crystalsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 20 + 10,
          rotation: Math.random() * Math.PI * 2,
          depth: Math.random(),
        })
      }
    }

    initCrystals()

    const drawCrystal = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)

      // Hexagon crystal shape
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const px = Math.cos(angle) * size
        const py = Math.sin(angle) * size
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()

      const t = COLOR_THEMES[themeRef.current]
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size)
      gradient.addColorStop(0, rgb(t.accent, opacity * 0.8))
      gradient.addColorStop(0.5, rgb(t.primary, opacity * 0.5))
      gradient.addColorStop(1, rgb(t.secondary, opacity * 0.2))

      ctx.fillStyle = gradient
      ctx.fill()

      ctx.strokeStyle = rgb(t.accent, opacity * 0.9)
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      timeRef.current += 0.016

      // Sort by depth
      const sorted = [...crystalsRef.current].sort((a, b) => a.depth - b.depth)

      sorted.forEach((crystal) => {
        // Gentle rotation
        crystal.rotation += 0.001 * crystal.depth

        // Distance to cursor
        const dx = crystal.x - cursorRef.current.x
        const dy = crystal.y - cursorRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Cursor influence - grows brighter when cursor nearby
        let opacity = 0.3 + crystal.depth * 0.3
        if (distance < 300) {
          const influence = (1 - distance / 300) * 0.5
          opacity += influence
        }

        // Slight bobbing
        const bob = Math.sin(timeRef.current * 0.001 + crystal.y * 0.002) * 5
        drawCrystal(crystal.x, crystal.y + bob, crystal.size, crystal.rotation, Math.min(opacity, 1))
      })

      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initCrystals()
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
