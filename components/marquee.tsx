'use client'

import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import { type ColorTheme, COLOR_THEMES } from '@/lib/background-config'

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: React.ReactNode
  vertical?: boolean
  repeat?: number
  theme?: ColorTheme
  speed?: 'slow' | 'normal' | 'fast'
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  theme = 'cosmic',
  speed = 'normal',
  ...props
}: MarqueeProps) {
  const speedMap = {
    slow: '30s',
    normal: '20s',
    fast: '10s',
  }

  const animationName = vertical ? 'marquee-vertical' : 'marquee'

  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden [--gap:1rem] [--duration:' + speedMap[speed] + ']',
        {
          '[animation-direction:reverse]': reverse,
          'flex-col': vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn('flex shrink-0 justify-around [gap:var(--gap)]', {
              'flex-col': vertical,
              'animate-marquee group-hover:[animation-play-state:paused]': !vertical && pauseOnHover,
              'animate-marquee group-hover:[animation-play-state:paused]': vertical && pauseOnHover,
              'animate-marquee': !vertical && !pauseOnHover,
              'animate-marquee-vertical': vertical && !pauseOnHover,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  )
}

/* Themed Card for Marquee */
interface MarqueeCardProps {
  className?: string
  theme?: ColorTheme
}

export function MarqueeCard({ className, theme = 'cosmic' }: MarqueeCardProps) {
  const t = COLOR_THEMES[theme]
  const colors = [
    `${t.primary}20`,
    `${t.secondary}20`,
    `${t.accent}20`,
    `${t.glow}20`,
  ]

  return (
    <div
      className={cn(
        'rounded-lg border p-4 backdrop-blur-sm transition-all hover:shadow-lg',
        className
      )}
      style={{
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        borderColor: t.primary,
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: t.accent }}
        />
        <span className="font-semibold" style={{ color: t.primary }}>
          Featured
        </span>
      </div>
      <p className="mt-2 text-sm" style={{ color: t.glow }}>
        Seamless scrolling content
      </p>
    </div>
  )
}
