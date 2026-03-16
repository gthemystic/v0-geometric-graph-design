'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Copy, Check, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type ColorTheme, COLOR_THEMES } from '@/lib/background-config'

type Animation = {
  id: number
  category: string
  name: string
  component: (theme: any) => JSX.Element
}

const createAnimations = (): Animation[] => [
  // LOADERS (1-10)
  {
    id: 1,
    category: 'Loaders',
    name: 'Pulse Ring',
    component: (t) => (
      <div className="flex items-center justify-center">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-ping rounded-full opacity-75" style={{ backgroundColor: t.primary }} />
          <div className="relative h-16 w-16 rounded-full" style={{ backgroundColor: t.primary }} />
        </div>
      </div>
    ),
  },
  {
    id: 2,
    category: 'Loaders',
    name: 'Spinner Dots',
    component: (t) => (
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-3 w-3 animate-bounce rounded-full"
            style={{ backgroundColor: t.primary, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    ),
  },
  {
    id: 3,
    category: 'Loaders',
    name: 'Rotating Square',
    component: (t) => (
      <div className="h-12 w-12 animate-spin rounded-md border-4 border-t-transparent" style={{ borderColor: t.primary, borderTopColor: 'transparent' }} />
    ),
  },
  {
    id: 4,
    category: 'Loaders',
    name: 'Wave Bars',
    component: (t) => (
      <div className="flex items-end gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-2 animate-pulse"
            style={{
              backgroundColor: t.primary,
              animationDelay: `${i * 0.1}s`,
              height: `${20 + (i * 8)}px`,
            }}
          />
        ))}
      </div>
    ),
  },
  {
    id: 5,
    category: 'Loaders',
    name: 'Orbit Dots',
    component: (t) => (
      <div className="relative h-16 w-16 animate-spin">
        <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full" style={{ backgroundColor: t.primary }} />
        <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full" style={{ backgroundColor: t.secondary }} />
      </div>
    ),
  },
  {
    id: 6,
    category: 'Loaders',
    name: 'Pulse Grid',
    component: (t) => (
      <div className="grid grid-cols-3 gap-2">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="h-3 w-3 animate-pulse rounded-sm"
            style={{ backgroundColor: t.primary, animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    ),
  },
  {
    id: 7,
    category: 'Loaders',
    name: 'Flip Card',
    component: (t) => (
      <div className="h-16 w-16 animate-[flip_1s_ease-in-out_infinite] rounded-lg" style={{ backgroundColor: t.primary }} />
    ),
  },
  {
    id: 8,
    category: 'Loaders',
    name: 'DNA Helix',
    component: (t) => (
      <div className="relative h-20 w-12">
        <div className="absolute left-0 top-0 h-4 w-4 animate-[dna1_2s_ease-in-out_infinite] rounded-full" style={{ backgroundColor: t.primary }} />
        <div className="absolute right-0 top-0 h-4 w-4 animate-[dna2_2s_ease-in-out_infinite] rounded-full" style={{ backgroundColor: t.secondary }} />
      </div>
    ),
  },
  {
    id: 9,
    category: 'Loaders',
    name: 'Progress Arc',
    component: (t) => (
      <svg className="h-16 w-16 animate-spin">
        <circle cx="32" cy="32" r="28" fill="none" stroke={t.primary} strokeWidth="4" strokeDasharray="175" strokeDashoffset="50" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 10,
    category: 'Loaders',
    name: 'Breathing Circle',
    component: (t) => (
      <div className="h-16 w-16 animate-[breathe_2s_ease-in-out_infinite] rounded-full" style={{ backgroundColor: t.primary }} />
    ),
  },

  // BUTTONS (11-20)
  {
    id: 11,
    category: 'Buttons',
    name: 'Shimmer Button',
    component: (t) => (
      <button className="relative overflow-hidden rounded-lg px-6 py-3 font-semibold text-white" style={{ backgroundColor: t.primary }}>
        <span className="relative z-10">Shimmer</span>
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </button>
    ),
  },
  {
    id: 12,
    category: 'Buttons',
    name: 'Ripple Effect',
    component: (t) => (
      <button className="relative overflow-hidden rounded-lg px-6 py-3 font-semibold text-white" style={{ backgroundColor: t.primary }}>
        <span className="relative z-10">Click Me</span>
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 animate-[ripple_1s_ease-out_infinite] rounded-full" style={{ backgroundColor: t.accent }} />
      </button>
    ),
  },
  {
    id: 13,
    category: 'Buttons',
    name: 'Glow Pulse',
    component: (t) => (
      <button className="animate-[glow_2s_ease-in-out_infinite] rounded-lg px-6 py-3 font-semibold text-white" style={{ backgroundColor: t.primary }}>
        Glow
      </button>
    ),
  },
  {
    id: 14,
    category: 'Buttons',
    name: 'Slide Border',
    component: (t) => (
      <button className="group relative overflow-hidden rounded-lg border-2 px-6 py-3 font-semibold" style={{ borderColor: t.primary, color: t.primary }}>
        <span className="relative z-10">Hover Me</span>
        <div className="absolute inset-0 -translate-y-full bg-opacity-20 transition-transform duration-300 group-hover:translate-y-0" style={{ backgroundColor: t.primary }} />
      </button>
    ),
  },
  {
    id: 15,
    category: 'Buttons',
    name: 'Shake on Hover',
    component: (t) => (
      <button className="rounded-lg px-6 py-3 font-semibold text-white transition-all hover:animate-[shake_0.5s] " style={{ backgroundColor: t.primary }}>
        Shake
      </button>
    ),
  },
  {
    id: 16,
    category: 'Buttons',
    name: 'Scale Pop',
    component: (t) => (
      <button className="rounded-lg px-6 py-3 font-semibold text-white transition-transform hover:scale-110 active:scale-95" style={{ backgroundColor: t.primary }}>
        Pop
      </button>
    ),
  },
  {
    id: 17,
    category: 'Buttons',
    name: 'Morphing Shape',
    component: (t) => (
      <button className="animate-[morph_3s_ease-in-out_infinite] px-6 py-3 font-semibold text-white" style={{ backgroundColor: t.primary }}>
        Morph
      </button>
    ),
  },
  {
    id: 18,
    category: 'Buttons',
    name: 'Float Hover',
    component: (t) => (
      <button className="rounded-lg px-6 py-3 font-semibold text-white transition-all hover:animate-[float_1s_ease-in-out_infinite]" style={{ backgroundColor: t.primary }}>
        Float
      </button>
    ),
  },
  {
    id: 19,
    category: 'Buttons',
    name: 'Gradient Shift',
    component: (t) => (
      <button className="animate-[gradient_3s_ease_infinite] rounded-lg bg-gradient-to-r px-6 py-3 font-semibold text-white" style={{ backgroundImage: `linear-gradient(90deg, ${t.primary}, ${t.secondary}, ${t.primary})`, backgroundSize: '200% 100%' }}>
        Gradient
      </button>
    ),
  },
  {
    id: 20,
    category: 'Buttons',
    name: 'Wiggle',
    component: (t) => (
      <button className="animate-[wiggle_1s_ease-in-out_infinite] rounded-lg px-6 py-3 font-semibold text-white" style={{ backgroundColor: t.primary }}>
        Wiggle
      </button>
    ),
  },

  // CARDS (21-30)
  {
    id: 21,
    category: 'Cards',
    name: 'Slide Up Card',
    component: (t) => (
      <div className="h-32 w-40 animate-[slideUp_1s_ease-out] rounded-xl p-4 shadow-lg" style={{ backgroundColor: t.primary }}>
        <p className="text-sm font-semibold text-white">Slide Up</p>
      </div>
    ),
  },
  {
    id: 22,
    category: 'Cards',
    name: 'Scale In Card',
    component: (t) => (
      <div className="h-32 w-40 animate-[scaleIn_0.5s_ease-out] rounded-xl p-4 shadow-lg" style={{ backgroundColor: t.primary }}>
        <p className="text-sm font-semibold text-white">Scale In</p>
      </div>
    ),
  },
  {
    id: 23,
    category: 'Cards',
    name: 'Fade Blur Card',
    component: (t) => (
      <div className="h-32 w-40 animate-[fadeBlur_1s_ease-out] rounded-xl p-4 shadow-lg" style={{ backgroundColor: t.primary }}>
        <p className="text-sm font-semibold text-white">Fade Blur</p>
      </div>
    ),
  },
  {
    id: 24,
    category: 'Cards',
    name: 'Flip Card',
    component: (t) => (
      <div className="group h-32 w-40 [perspective:1000px]">
        <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div className="absolute inset-0 rounded-xl p-4 shadow-lg [backface-visibility:hidden]" style={{ backgroundColor: t.primary }}>
            <p className="text-sm font-semibold text-white">Front</p>
          </div>
          <div className="absolute inset-0 rounded-xl p-4 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]" style={{ backgroundColor: t.secondary }}>
            <p className="text-sm font-semibold text-white">Back</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 25,
    category: 'Cards',
    name: 'Tilt Hover',
    component: (t) => (
      <div className="h-32 w-40 rounded-xl p-4 shadow-lg transition-transform hover:[transform:rotateX(5deg)_rotateY(5deg)]" style={{ backgroundColor: t.primary }}>
        <p className="text-sm font-semibold text-white">Tilt Me</p>
      </div>
    ),
  },
  {
    id: 26,
    category: 'Cards',
    name: 'Expand Card',
    component: (t) => (
      <div className="h-32 w-40 rounded-xl p-4 shadow-lg transition-all hover:h-40 hover:w-48" style={{ backgroundColor: t.primary }}>
        <p className="text-sm font-semibold text-white">Expand</p>
      </div>
    ),
  },
  {
    id: 27,
    category: 'Cards',
    name: 'Glow Card',
    component: (t) => (
      <div className="h-32 w-40 rounded-xl p-4 transition-shadow hover:shadow-2xl" style={{ backgroundColor: t.primary, boxShadow: `0 0 20px ${t.primary}` }}>
        <p className="text-sm font-semibold text-white">Glow</p>
      </div>
    ),
  },
  {
    id: 28,
    category: 'Cards',
    name: 'Slide Left',
    component: (t) => (
      <div className="h-32 w-40 animate-[slideLeft_1s_ease-out] rounded-xl p-4 shadow-lg" style={{ backgroundColor: t.primary }}>
        <p className="text-sm font-semibold text-white">Slide Left</p>
      </div>
    ),
  },
  {
    id: 29,
    category: 'Cards',
    name: 'Bounce In',
    component: (t) => (
      <div className="h-32 w-40 animate-[bounceIn_1s_ease-out] rounded-xl p-4 shadow-lg" style={{ backgroundColor: t.primary }}>
        <p className="text-sm font-semibold text-white">Bounce In</p>
      </div>
    ),
  },
  {
    id: 30,
    category: 'Cards',
    name: 'Shimmer Border',
    component: (t) => (
      <div className="h-32 w-40 rounded-xl p-4 shadow-lg" style={{ background: `linear-gradient(${t.primary}, ${t.primary}) padding-box, linear-gradient(90deg, ${t.primary}, ${t.accent}, ${t.primary}) border-box`, border: '2px solid transparent' }}>
        <p className="text-sm font-semibold text-white">Shimmer</p>
      </div>
    ),
  },

  // BACKGROUNDS (31-40)
  {
    id: 31,
    category: 'Backgrounds',
    name: 'Gradient Flow',
    component: (t) => (
      <div className="h-32 w-48 animate-[gradient_3s_ease_infinite] rounded-xl" style={{ background: `linear-gradient(90deg, ${t.primary}, ${t.secondary}, ${t.glow})`, backgroundSize: '200% 100%' }} />
    ),
  },
  {
    id: 32,
    category: 'Backgrounds',
    name: 'Pulse Grid',
    component: (t) => (
      <div className="h-32 w-48 rounded-xl" style={{ background: `repeating-linear-gradient(0deg, ${t.primary}20 0px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, ${t.primary}20 0px, transparent 1px, transparent 20px)` }} />
    ),
  },
  {
    id: 33,
    category: 'Backgrounds',
    name: 'Dots Pattern',
    component: (t) => (
      <div className="h-32 w-48 rounded-xl" style={{ backgroundImage: `radial-gradient(circle, ${t.primary} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
    ),
  },
  {
    id: 34,
    category: 'Backgrounds',
    name: 'Wave Pattern',
    component: (t) => (
      <div className="h-32 w-48 animate-[wave_3s_ease-in-out_infinite] rounded-xl" style={{ backgroundColor: t.primary }} />
    ),
  },
  {
    id: 35,
    category: 'Backgrounds',
    name: 'Scan Line',
    component: (t) => (
      <div className="relative h-32 w-48 overflow-hidden rounded-xl" style={{ backgroundColor: t.primary }}>
        <div className="absolute inset-x-0 h-8 animate-[scan_2s_linear_infinite]" style={{ background: `linear-gradient(transparent, ${t.accent}, transparent)` }} />
      </div>
    ),
  },
  {
    id: 36,
    category: 'Backgrounds',
    name: 'Falling Stars',
    component: (t) => (
      <div className="relative h-32 w-48 overflow-hidden rounded-xl bg-black">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 animate-[fall_3s_linear_infinite] rounded-full"
            style={{
              backgroundColor: t.accent,
              left: `${20 + i * 30}%`,
              animationDelay: `${i * 1}s`,
            }}
          />
        ))}
      </div>
    ),
  },
  {
    id: 37,
    category: 'Backgrounds',
    name: 'Aurora',
    component: (t) => (
      <div className="relative h-32 w-48 overflow-hidden rounded-xl bg-black">
        <div className="absolute inset-0 animate-[aurora_5s_ease-in-out_infinite] opacity-50" style={{ background: `radial-gradient(ellipse at center, ${t.primary}, transparent)` }} />
      </div>
    ),
  },
  {
    id: 38,
    category: 'Backgrounds',
    name: 'Mesh Gradient',
    component: (t) => (
      <div className="h-32 w-48 rounded-xl" style={{ background: `radial-gradient(at 20% 30%, ${t.primary} 0px, transparent 50%), radial-gradient(at 80% 70%, ${t.secondary} 0px, transparent 50%), radial-gradient(at 50% 50%, ${t.glow} 0px, transparent 50%)` }} />
    ),
  },
  {
    id: 39,
    category: 'Backgrounds',
    name: 'Diagonal Stripes',
    component: (t) => (
      <div className="h-32 w-48 rounded-xl" style={{ background: `repeating-linear-gradient(45deg, ${t.primary}, ${t.primary} 10px, ${t.secondary} 10px, ${t.secondary} 20px)` }} />
    ),
  },
  {
    id: 40,
    category: 'Backgrounds',
    name: 'Spotlight',
    component: (t) => (
      <div className="h-32 w-48 rounded-xl" style={{ background: `radial-gradient(circle at center, ${t.accent}, ${t.primary})` }} />
    ),
  },

  // TEXT EFFECTS (41-50)
  {
    id: 41,
    category: 'Text',
    name: 'Typing Effect',
    component: (t) => (
      <div className="overflow-hidden whitespace-nowrap font-mono">
        <p className="animate-[typing_4s_steps(20)_infinite] border-r-2" style={{ color: t.accent, borderColor: t.accent }}>
          Typing animation...
        </p>
      </div>
    ),
  },
  {
    id: 42,
    category: 'Text',
    name: 'Gradient Text',
    component: (t) => (
      <h2 className="bg-clip-text text-4xl font-bold text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${t.primary}, ${t.accent})` }}>
        Gradient
      </h2>
    ),
  },
  {
    id: 43,
    category: 'Text',
    name: 'Glitch Text',
    component: (t) => (
      <h2 className="animate-[glitch_1s_infinite] text-4xl font-bold" style={{ color: t.primary }}>
        Glitch
      </h2>
    ),
  },
  {
    id: 44,
    category: 'Text',
    name: 'Wave Text',
    component: (t) => (
      <div className="flex gap-1">
        {'WAVE'.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block animate-[wave_1s_ease-in-out_infinite] text-2xl font-bold"
            style={{ color: t.primary, animationDelay: `${i * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: 45,
    category: 'Text',
    name: 'Shimmer Text',
    component: (t) => (
      <h2 className="relative overflow-hidden text-4xl font-bold" style={{ color: t.primary }}>
        Shimmer
        <span className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      </h2>
    ),
  },
  {
    id: 46,
    category: 'Text',
    name: 'Bounce Letters',
    component: (t) => (
      <div className="flex gap-1">
        {'BOUNCE'.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block animate-bounce text-2xl font-bold"
            style={{ color: t.primary, animationDelay: `${i * 0.1}s` }}
          >
            {char}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: 47,
    category: 'Text',
    name: 'Fade In Text',
    component: (t) => (
      <h2 className="animate-[fadeIn_2s_ease-in] text-4xl font-bold" style={{ color: t.primary }}>
        Fade In
      </h2>
    ),
  },
  {
    id: 48,
    category: 'Text',
    name: 'Scale Pulse Text',
    component: (t) => (
      <h2 className="animate-[scalePulse_2s_ease-in-out_infinite] text-4xl font-bold" style={{ color: t.primary }}>
        Pulse
      </h2>
    ),
  },
  {
    id: 49,
    category: 'Text',
    name: 'Rainbow Text',
    component: (t) => (
      <h2 className="animate-[rainbow_3s_linear_infinite] text-4xl font-bold" style={{ color: t.primary }}>
        Rainbow
      </h2>
    ),
  },
  {
    id: 50,
    category: 'Text',
    name: 'Slide In Text',
    component: (t) => (
      <h2 className="animate-[slideIn_1s_ease-out] text-4xl font-bold" style={{ color: t.primary }}>
        Slide In
      </h2>
    ),
  },
]

export default function AnimationsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [theme, setTheme] = useState<ColorTheme>('cosmic')
  
  const currentTheme = COLOR_THEMES[theme]
  const animations = createAnimations()
  const categories = ['All', 'Loaders', 'Buttons', 'Cards', 'Backgrounds', 'Text']

  const filteredAnimations = activeCategory === 'All'
    ? animations
    : animations.filter(anim => anim.category === activeCategory)

  const copyCode = (id: number) => {
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#08061a] via-[#0f0d28] to-[#1a1040]">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Animation Library</h1>
                <p className="text-sm text-muted-foreground">50 standalone themed animations for web & mobile</p>
              </div>
            </div>
            
            {/* Theme Selector */}
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as ColorTheme)}
                className="rounded-lg border border-border/40 bg-background/50 px-3 py-1.5 text-sm text-foreground backdrop-blur-sm transition-colors hover:border-primary/40 focus:border-primary focus:outline-none"
              >
                <option value="cosmic">Cosmic (Blue/Purple)</option>
                <option value="matrix">Matrix (Green)</option>
                <option value="ember">Ember (Orange/Red)</option>
                <option value="ocean">Ocean (Cyan/Teal)</option>
                <option value="void">Void (Black/Gray)</option>
                <option value="arctic">Arctic (Ice Blue)</option>
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className="rounded-full text-xs"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Animations Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAnimations.map((anim) => (
            <div
              key={anim.id}
              className="group relative overflow-hidden rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/40"
            >
              {/* Preview Area */}
              <div className="flex h-48 items-center justify-center border-b border-border/20 bg-gradient-to-br from-background/50 to-muted/30 p-8">
                {anim.component(currentTheme)}
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {anim.category}
                    </p>
                    <h3 className="mt-1 font-semibold text-foreground">{anim.name}</h3>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => copyCode(anim.id)}
                  >
                    {copiedId === anim.id ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">#{anim.id}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
