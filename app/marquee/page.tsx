'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Marquee, MarqueeCard } from '@/components/marquee'
import { type ColorTheme, COLOR_THEMES } from '@/lib/background-config'

const MARQUEE_ITEMS = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'WebGL',
  'Three.js',
  'Vercel',
]

const THEMES: ColorTheme[] = ['cosmic', 'matrix', 'ember', 'ocean', 'void', 'arctic']

export default function MarqueePage() {
  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>('cosmic')
  const theme = COLOR_THEMES[selectedTheme]

  const MARQUEE_ITEMS = [
    'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'WebGL', 'Three.js', 'Vercel',
  ]

  const ICON_ITEMS = [
    { icon: '⚡', label: 'Lightning' },
    { icon: '🔥', label: 'Fire' },
    { icon: '💎', label: 'Diamond' },
    { icon: '🌟', label: 'Star' },
    { icon: '🎯', label: 'Target' },
    { icon: '🚀', label: 'Rocket' },
    { icon: '🎨', label: 'Paint' },
    { icon: '🔮', label: 'Crystal' },
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background to-background/50 overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Marquee Components</h1>
              <p className="text-xs text-muted-foreground">Theme-aware scrolling content</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value as ColorTheme)}
              className="rounded-lg border border-border/40 bg-background/50 px-3 py-1.5 text-sm text-foreground backdrop-blur-sm transition-colors hover:border-primary/40 focus:border-primary focus:outline-none"
            >
              {THEMES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Horizontal Marquee - Normal Speed */}
        <section className="mb-16">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Horizontal Scroll</h2>
            <p className="text-sm text-muted-foreground">Standard left-to-right scrolling</p>
          </div>
          <div
            className="rounded-2xl border border-border/30 p-8 backdrop-blur-sm overflow-hidden"
            style={{ backgroundColor: `${theme.primary}08` }}
          >
            <Marquee theme={selectedTheme} pauseOnHover speed="normal">
              {MARQUEE_ITEMS.map((item, i) => (
                <div key={i} className="flex-shrink-0">
                  <MarqueeCard theme={selectedTheme} className="w-48 h-24 flex items-center justify-center text-lg font-semibold">
                    {item}
                  </MarqueeCard>
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        {/* Horizontal Marquee - Slow Speed */}
        <section className="mb-16">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Slow Scroll</h2>
            <p className="text-sm text-muted-foreground">Relaxed scrolling animation</p>
          </div>
          <div
            className="rounded-2xl border border-border/30 p-8 backdrop-blur-sm overflow-hidden"
            style={{ backgroundColor: `${theme.secondary}08` }}
          >
            <Marquee theme={selectedTheme} pauseOnHover speed="slow">
              {MARQUEE_ITEMS.map((item, i) => (
                <div key={i} className="flex-shrink-0">
                  <div
                    className="rounded-lg px-6 py-4 font-medium"
                    style={{
                      backgroundColor: `${theme.accent}15`,
                      color: theme.primary,
                      borderColor: theme.secondary,
                      border: `1px solid ${theme.secondary}40`,
                    }}
                  >
                    ✨ {item}
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        {/* Horizontal Marquee - Fast Speed */}
        <section className="mb-16">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Fast Scroll</h2>
            <p className="text-sm text-muted-foreground">Rapid scrolling animation</p>
          </div>
          <div
            className="rounded-2xl border border-border/30 p-8 backdrop-blur-sm overflow-hidden"
            style={{ backgroundColor: `${theme.glow}08` }}
          >
            <Marquee theme={selectedTheme} pauseOnHover speed="fast">
              {MARQUEE_ITEMS.map((item, i) => (
                <div key={i} className="flex-shrink-0">
                  <div
                    className="rounded-lg px-6 py-4 font-bold text-lg"
                    style={{
                      backgroundColor: `${theme.primary}20`,
                      color: theme.accent,
                    }}
                  >
                    → {item}
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        {/* Reversed Direction */}
        <section className="mb-16">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Reversed Direction</h2>
            <p className="text-sm text-muted-foreground">Right-to-left scrolling</p>
          </div>
          <div
            className="rounded-2xl border border-border/30 p-8 backdrop-blur-sm overflow-hidden"
            style={{ backgroundColor: `${theme.accent}08` }}
          >
            <Marquee theme={selectedTheme} reverse pauseOnHover speed="normal">
              {MARQUEE_ITEMS.map((item, i) => (
                <div key={i} className="flex-shrink-0">
                  <div
                    className="rounded-lg px-6 py-4 font-medium"
                    style={{
                      backgroundColor: `${theme.secondary}20`,
                      color: theme.primary,
                    }}
                  >
                    {item} ←
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        {/* Vertical Marquee */}
        <section className="mb-16">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Vertical Scroll</h2>
            <p className="text-sm text-muted-foreground">Vertical scrolling animation</p>
          </div>
          <div
            className="rounded-2xl border border-border/30 p-8 backdrop-blur-sm"
            style={{ backgroundColor: `${theme.primary}08` }}
          >
            <div className="h-96 overflow-hidden">
              <Marquee vertical theme={selectedTheme} pauseOnHover speed="normal">
                {MARQUEE_ITEMS.map((item, i) => (
                  <div key={i} className="flex-shrink-0">
                    <div
                      className="rounded-lg px-6 py-4 font-medium mb-4 w-64"
                      style={{
                        backgroundColor: `${theme.accent}20`,
                        color: theme.primary,
                      }}
                    >
                      ⬇️ {item}
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </section>

        {/* Advanced Examples */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">15 Advanced Variations</h2>
            <p className="text-sm text-muted-foreground">Premium marquee animations with effects</p>
          </div>

          <div className="space-y-8">
            {/* 1. Gradient Marquee */}
            <div className="rounded-2xl border border-border/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}08` }}>
              <div className="p-4 border-b border-border/20" style={{ backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span style={{ color: theme.primary }}>01</span> Gradient Marquee
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center min-h-32 overflow-hidden">
                <div className="w-full flex gap-4 animate-marquee" style={{ '--gap': '1rem' } as any}>
                  {MARQUEE_ITEMS.map((item, i) => (
                    <div key={i} className="flex-shrink-0 px-4 py-2 rounded-lg font-semibold whitespace-nowrap" style={{
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                      color: 'white'
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Bordered Marquee */}
            <div className="rounded-2xl border border-border/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}08` }}>
              <div className="p-4 border-b border-border/20" style={{ backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span style={{ color: theme.primary }}>02</span> Bordered Cards
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center min-h-32 overflow-hidden">
                <div className="w-full flex gap-4 animate-marquee" style={{ '--gap': '1rem' } as any}>
                  {MARQUEE_ITEMS.map((item, i) => (
                    <div key={i} className="flex-shrink-0 px-4 py-2 rounded-lg border-2 whitespace-nowrap font-semibold" style={{
                      borderColor: theme.primary,
                      color: theme.primary
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Shadow Marquee */}
            <div className="rounded-2xl border border-border/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}08` }}>
              <div className="p-4 border-b border-border/20" style={{ backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span style={{ color: theme.primary }}>03</span> Shadow Effect
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center min-h-32 overflow-hidden">
                <div className="w-full flex gap-4 animate-marquee" style={{ '--gap': '1rem' } as any}>
                  {MARQUEE_ITEMS.map((item, i) => (
                    <div key={i} className="flex-shrink-0 px-4 py-2 rounded-lg font-semibold whitespace-nowrap" style={{
                      backgroundColor: theme.primary,
                      color: 'white',
                      boxShadow: `0 10px 20px ${theme.primary}40`
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. Glowing Marquee */}
            <div className="rounded-2xl border border-border/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}08` }}>
              <div className="p-4 border-b border-border/20" style={{ backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span style={{ color: theme.primary }}>04</span> Glow Animation
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center min-h-32 overflow-hidden">
                <div className="w-full flex gap-4 animate-marquee" style={{ '--gap': '1rem' } as any}>
                  {MARQUEE_ITEMS.map((item, i) => (
                    <div key={i} className="flex-shrink-0 px-4 py-2 rounded-lg font-semibold whitespace-nowrap animate-pulse" style={{
                      backgroundColor: theme.primary,
                      color: 'white',
                      filter: `drop-shadow(0 0 8px ${theme.primary})`
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Icon Marquee */}
            <div className="rounded-2xl border border-border/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}08` }}>
              <div className="p-4 border-b border-border/20" style={{ backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span style={{ color: theme.primary }}>05</span> Icon Carousel
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center min-h-32 overflow-hidden">
                <div className="w-full flex gap-6 animate-marquee" style={{ '--gap': '1.5rem' } as any}>
                  {ICON_ITEMS.map((item, i) => (
                    <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2 whitespace-nowrap">
                      <div className="text-4xl">{item.icon}</div>
                      <div className="text-xs font-semibold" style={{ color: theme.primary }}>{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Double Line Marquee */}
            <div className="rounded-2xl border border-border/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}08` }}>
              <div className="p-4 border-b border-border/20" style={{ backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span style={{ color: theme.primary }}>06</span> Double Line
                </h3>
              </div>
              <div className="p-6 space-y-4 overflow-hidden">
                <div className="w-full flex gap-4 animate-marquee" style={{ '--gap': '1rem' } as any}>
                  {MARQUEE_ITEMS.map((item, i) => (
                    <div key={i} className="flex-shrink-0 px-3 py-1 rounded font-semibold whitespace-nowrap text-sm" style={{ color: theme.primary }}>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="w-full flex gap-4 animate-marquee-reverse" style={{ '--gap': '1rem' } as any}>
                  {[...MARQUEE_ITEMS].reverse().map((item, i) => (
                    <div key={i} className="flex-shrink-0 px-3 py-1 rounded font-semibold whitespace-nowrap text-sm" style={{ color: theme.secondary }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 7. Ticker Style */}
            <div className="rounded-2xl border border-border/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}08` }}>
              <div className="p-4 border-b border-border/20" style={{ backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span style={{ color: theme.primary }}>07</span> Ticker Style
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center min-h-32 overflow-hidden font-mono text-lg font-bold" style={{ color: theme.primary }}>
                <div className="w-full flex gap-8 animate-marquee" style={{ '--gap': '2rem' } as any}>
                  {MARQUEE_ITEMS.map((item, i) => (
                    <div key={i} className="flex-shrink-0 whitespace-nowrap">→ {item}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* 8. Wave Animation */}
            <div className="rounded-2xl border border-border/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}08` }}>
              <div className="p-4 border-b border-border/20" style={{ backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span style={{ color: theme.primary }}>08</span> Wave Motion
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center min-h-32 overflow-hidden">
                <div className="w-full flex gap-4 animate-marquee-wave" style={{ '--gap': '1rem' } as any}>
                  {MARQUEE_ITEMS.map((item, i) => (
                    <div key={i} className="flex-shrink-0 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all" style={{
                      backgroundColor: theme.secondary,
                      color: theme.primary
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 9. Pulsing Items */}
            <div className="rounded-2xl border border-border/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}08` }}>
              <div className="p-4 border-b border-border/20" style={{ backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span style={{ color: theme.primary }}>09</span> Pulsing Effect
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center min-h-32 overflow-hidden">
                <div className="w-full flex gap-4 animate-marquee" style={{ '--gap': '1rem' } as any}>
                  {MARQUEE_ITEMS.map((item, i) => (
                    <div key={i} className="flex-shrink-0 px-4 py-2 rounded-lg font-semibold whitespace-nowrap animate-marquee-pulse" style={{
                      backgroundColor: theme.primary,
                      color: 'white'
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 10. Rainbow Hue */}
            <div className="rounded-2xl border border-border/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}08` }}>
              <div className="p-4 border-b border-border/20" style={{ backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span style={{ color: theme.primary }}>10</span> Rainbow Hue
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center min-h-32 overflow-hidden">
                <div className="w-full flex gap-4 animate-marquee animate-marquee-rainbow" style={{ '--gap': '1rem' } as any}>
                  {MARQUEE_ITEMS.map((item, i) => (
                    <div key={i} className="flex-shrink-0 px-4 py-2 rounded-lg font-semibold whitespace-nowrap" style={{
                      backgroundColor: theme.primary,
                      color: 'white'
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 11. Flip Animation */}
            <div className="rounded-2xl border border-border/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}08` }}>
              <div className="p-4 border-b border-border/20" style={{ backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span style={{ color: theme.primary }}>11</span> 3D Flip
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center min-h-32 overflow-hidden" style={{ perspective: '1000px' }}>
                <div className="w-full flex gap-4 animate-marquee-flip" style={{ '--gap': '1rem' } as any}>
                  {MARQUEE_ITEMS.map((item, i) => (
                    <div key={i} className="flex-shrink-0 px-4 py-2 rounded-lg font-semibold whitespace-nowrap" style={{
                      backgroundColor: theme.primary,
                      color: 'white',
                      transformStyle: 'preserve-3d' as any
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 12. Scale Pulse */}
            <div className="rounded-2xl border border-border/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}08` }}>
              <div className="p-4 border-b border-border/20" style={{ backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span style={{ color: theme.primary }}>12</span> Scale Pulse
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center min-h-32 overflow-hidden">
                <div className="w-full flex gap-4 animate-marquee-scale" style={{ '--gap': '1rem' } as any}>
                  {MARQUEE_ITEMS.map((item, i) => (
                    <div key={i} className="flex-shrink-0 px-4 py-2 rounded-lg font-semibold whitespace-nowrap" style={{
                      backgroundColor: theme.secondary,
                      color: theme.primary
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 13. Skew Animation */}
            <div className="rounded-2xl border border-border/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}08` }}>
              <div className="p-4 border-b border-border/20" style={{ backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span style={{ color: theme.primary }}>13</span> Skew Motion
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center min-h-32 overflow-hidden">
                <div className="w-full flex gap-4 animate-marquee-skew" style={{ '--gap': '1rem' } as any}>
                  {MARQUEE_ITEMS.map((item, i) => (
                    <div key={i} className="flex-shrink-0 px-4 py-2 rounded-lg font-semibold whitespace-nowrap" style={{
                      backgroundColor: theme.primary,
                      color: 'white'
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 14. Neon Glow */}
            <div className="rounded-2xl border border-border/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}08` }}>
              <div className="p-4 border-b border-border/20" style={{ backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span style={{ color: theme.primary }}>14</span> Neon Glow
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center min-h-32 overflow-hidden">
                <div className="w-full flex gap-4 animate-marquee" style={{ '--gap': '1rem' } as any}>
                  {MARQUEE_ITEMS.map((item, i) => (
                    <div key={i} className="flex-shrink-0 px-4 py-2 rounded-lg font-semibold whitespace-nowrap font-mono" style={{
                      backgroundColor: 'transparent',
                      color: theme.primary,
                      border: `2px solid ${theme.primary}`,
                      boxShadow: `0 0 10px ${theme.primary}, inset 0 0 10px ${theme.primary}40`
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 15. Wiggle Animation */}
            <div className="rounded-2xl border border-border/30 overflow-hidden backdrop-blur-sm" style={{ backgroundColor: `${theme.primary}08` }}>
              <div className="p-4 border-b border-border/20" style={{ backgroundColor: `${theme.primary}05` }}>
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <span style={{ color: theme.primary }}>15</span> Wiggle Motion
                </h3>
              </div>
              <div className="p-6 flex items-center justify-center min-h-32 overflow-hidden">
                <div className="w-full flex gap-4 animate-marquee-wiggle" style={{ '--gap': '1rem' } as any}>
                  {MARQUEE_ITEMS.map((item, i) => (
                    <div key={i} className="flex-shrink-0 px-4 py-2 rounded-lg font-semibold whitespace-nowrap" style={{
                      backgroundColor: theme.secondary,
                      color: theme.primary
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-16">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Usage</h2>
            <p className="text-sm text-muted-foreground">How to use the Marquee component</p>
          </div>
          <div
            className="rounded-2xl border border-border/30 p-6 backdrop-blur-sm overflow-auto"
            style={{ backgroundColor: `${theme.secondary}08` }}
          >
            <pre className="text-sm text-muted-foreground font-mono">
              {`import { Marquee } from '@/components/marquee'

export default function Example() {
  return (
    <Marquee theme="matrix" speed="normal" pauseOnHover>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Marquee>
  )
}`}
            </pre>
          </div>
        </section>

        {/* Props Reference */}
        <section className="mb-16">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Props Reference</h2>
            <p className="text-sm text-muted-foreground">Available configuration options</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { prop: 'theme', type: 'ColorTheme', desc: 'Color theme (cosmic, matrix, ember, ocean, void, arctic)' },
              { prop: 'speed', type: 'slow | normal | fast', desc: 'Animation speed (30s, 20s, 10s)' },
              { prop: 'vertical', type: 'boolean', desc: 'Display vertically instead of horizontally' },
              { prop: 'reverse', type: 'boolean', desc: 'Reverse animation direction' },
              { prop: 'pauseOnHover', type: 'boolean', desc: 'Pause animation on hover' },
              { prop: 'repeat', type: 'number', desc: 'Number of times to repeat content (default: 4)' },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-border/30 p-4 backdrop-blur-sm"
                style={{ backgroundColor: `${theme.primary}08` }}
              >
                <div className="font-mono text-sm font-bold" style={{ color: theme.primary }}>
                  {item.prop}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{item.type}</div>
                <div className="text-sm mt-2">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
