'use client'

import { useEffect, useRef } from 'react'

interface Neuron {
  x: number
  y: number
  vx: number
  vy: number
  connections: number[]
  activity: number
  pulsePhase: number
}

interface Pulse {
  from: number
  to: number
  progress: number
  speed: number
}

import { type ColorTheme, COLOR_THEMES, rgb } from '@/lib/background-config'

export function NeuralBackground({ theme = 'cosmic', intensity = 0.7 }: { theme?: ColorTheme; intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const neuronsRef = useRef<Neuron[]>([])
  const pulsesRef = useRef<Pulse[]>([])
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
      initNeurons()
    }

    const initNeurons = () => {
      const neuronCount = window.innerWidth < 768 ? 40 : 80
      neuronsRef.current = []

      for (let i = 0; i < neuronCount; i++) {
        neuronsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          connections: [],
          activity: Math.random(),
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }

      // Create connections
      neuronsRef.current.forEach((neuron, i) => {
        const connectionCount = Math.floor(Math.random() * 3) + 2
        for (let j = 0; j < connectionCount; j++) {
          const targetIndex = Math.floor(Math.random() * neuronsRef.current.length)
          if (targetIndex !== i && !neuron.connections.includes(targetIndex)) {
            neuron.connections.push(targetIndex)
          }
        }
      })
    }

    const animate = () => {
      timeRef.current += 1
      const t = COLOR_THEMES[themeRef.current]
      const int = intensityRef.current

      ctx.fillStyle = `${t.bg} 0.08)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Randomly trigger pulses
      if (Math.random() < 0.05 && neuronsRef.current.length > 0) {
        const fromIndex = Math.floor(Math.random() * neuronsRef.current.length)
        const neuron = neuronsRef.current[fromIndex]
        if (neuron.connections.length > 0) {
          const toIndex = neuron.connections[Math.floor(Math.random() * neuron.connections.length)]
          pulsesRef.current.push({
            from: fromIndex,
            to: toIndex,
            progress: 0,
            speed: 0.02 + Math.random() * 0.02,
          })
        }
      }

      // Update neurons
      neuronsRef.current.forEach((neuron) => {
        neuron.x += neuron.vx
        neuron.y += neuron.vy

        // Bounce off edges
        if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1
        if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1

        // Update activity
        neuron.activity = (Math.sin(timeRef.current * 0.01 + neuron.pulsePhase) + 1) / 2
      })

      // Draw connections
      neuronsRef.current.forEach((neuron, i) => {
        neuron.connections.forEach((targetIndex) => {
          const target = neuronsRef.current[targetIndex]
          const opacity = (neuron.activity + target.activity) / 2 * 0.2 * int

          const gradient = ctx.createLinearGradient(neuron.x, neuron.y, target.x, target.y)
          gradient.addColorStop(0, rgb(t.secondary, opacity))
          gradient.addColorStop(1, rgb(t.glow, opacity))

          ctx.strokeStyle = gradient
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(neuron.x, neuron.y)
          ctx.lineTo(target.x, target.y)
          ctx.stroke()
        })
      })

      // Update and draw pulses
      pulsesRef.current = pulsesRef.current.filter((pulse) => {
        pulse.progress += pulse.speed

        if (pulse.progress >= 1) return false

        const from = neuronsRef.current[pulse.from]
        const to = neuronsRef.current[pulse.to]

        const x = from.x + (to.x - from.x) * pulse.progress
        const y = from.y + (to.y - from.y) * pulse.progress

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 8)
        gradient.addColorStop(0, rgb(t.accent, 0.9 * int))
        gradient.addColorStop(0.5, rgb(t.primary, 0.5 * int))
        gradient.addColorStop(1, rgb(t.glow, 0))

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()

        return true
      })

      // Draw neurons
      neuronsRef.current.forEach((neuron) => {
        const size = 3 + neuron.activity * 3

        const gradient = ctx.createRadialGradient(neuron.x, neuron.y, 0, neuron.x, neuron.y, size * 3)
        gradient.addColorStop(0, rgb(t.primary, 0.6 * neuron.activity * int))
        gradient.addColorStop(0.5, rgb(t.secondary, 0.3 * neuron.activity * int))
        gradient.addColorStop(1, rgb(t.glow, 0))

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, size * 3, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = rgb(t.accent, (0.8 + neuron.activity * 0.2) * int)
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, size, 0, Math.PI * 2)
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
