'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

import { type ColorTheme, COLOR_THEMES } from '@/lib/background-config'

export function VectorFieldBackground({ theme = 'cosmic', intensity = 0.7 }: { theme?: ColorTheme; intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const timeRef = useRef(0)
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
    }

    const getFlowField = (x: number, y: number, time: number) => {
      const scale = 0.003
      const timeScale = 0.0005
      
      // Create flowing field using sine waves
      const angle1 = Math.sin(x * scale + time * timeScale) * Math.cos(y * scale)
      const angle2 = Math.cos(x * scale * 1.3 - time * timeScale * 0.8) * Math.sin(y * scale * 0.8)
      const angle = angle1 + angle2
      
      return {
        vx: Math.cos(angle) * 0.5,
        vy: Math.sin(angle) * 0.5,
      }
    }

    const createParticle = (): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      }
    }

    const initParticles = () => {
      const particleCount = window.innerWidth < 768 ? 500 : 1000
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle())
      }
    }

    const drawParticles = () => {
      const t = COLOR_THEMES[themeRef.current]
      const int = intensityRef.current
      ctx.fillStyle = `${t.bg} 0.08)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      timeRef.current += 1

      particlesRef.current.forEach((particle, index) => {
        // Get flow field direction
        const field = getFlowField(particle.x, particle.y, timeRef.current)
        
        // Update velocity based on flow field
        particle.vx = field.vx
        particle.vy = field.vy

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Age particle
        particle.life += 1

        // Reset if too old or out of bounds
        if (
          particle.life > particle.maxLife ||
          particle.x < -10 ||
          particle.x > canvas.width + 10 ||
          particle.y < -10 ||
          particle.y > canvas.height + 10
        ) {
          const newParticle = createParticle()
          particlesRef.current[index] = newParticle
          return
        }

        const lifeRatio = particle.life / particle.maxLife
        const opacity = Math.sin(lifeRatio * Math.PI) * 0.85 * int

        const hue = (timeRef.current * 0.1 + particle.x * 0.1) % 60 + t.hueBase
        
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, 4)
        gradient.addColorStop(0, `hsla(${hue}, 80%, 75%, ${opacity})`)
        gradient.addColorStop(0.5, `hsla(${hue}, 75%, 70%, ${opacity * 0.5})`)
        gradient.addColorStop(1, `hsla(${hue}, 70%, 65%, 0)`)
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = `hsla(${hue}, 80%, 70%, ${opacity * 0.7})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y)
        ctx.lineTo(particle.x - particle.vx * 12, particle.y - particle.vy * 12)
        ctx.stroke()
      })

      animationRef.current = requestAnimationFrame(drawParticles)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    initParticles()
    
    ctx.fillStyle = `${COLOR_THEMES[themeRef.current].bg} 1)`
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    animationRef.current = requestAnimationFrame(drawParticles)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
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
