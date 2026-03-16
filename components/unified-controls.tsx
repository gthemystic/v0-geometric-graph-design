'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Layers,
  Palette,
  Sparkles,
  ChevronUp,
  X,
  SlidersHorizontal,
  Play,
  BookOpen,
} from 'lucide-react'
import { type ColorTheme, THEME_LABELS, type BackgroundConfig } from '@/lib/background-config'

type BackgroundType = 'constellation' | 'vector' | 'quantum' | 'sand' | 'rain' | 'aurora' | 'neural' | 'nebula' | 'fluid' | 'firefly' | 'waves' | 'crystalline'

type PanelType = 'scenes' | 'theme' | null

const BACKGROUNDS: { key: BackgroundType; label: string; icon: string }[] = [
  { key: 'constellation', label: 'Stars', icon: 'star' },
  { key: 'vector', label: 'Flow', icon: 'flow' },
  { key: 'quantum', label: 'Grid', icon: 'grid' },
  { key: 'sand', label: 'Sand', icon: 'sand' },
  { key: 'rain', label: 'Rain', icon: 'rain' },
  { key: 'aurora', label: 'Aurora', icon: 'aurora' },
  { key: 'neural', label: 'Neural', icon: 'neural' },
  { key: 'nebula', label: 'Nebula', icon: 'nebula' },
  { key: 'fluid', label: 'Fluid', icon: 'fluid' },
  { key: 'firefly', label: 'Firefly', icon: 'firefly' },
  { key: 'waves', label: 'Waves', icon: 'waves' },
  { key: 'crystalline', label: 'Crystal', icon: 'crystal' },
]

interface UnifiedControlsProps {
  background: BackgroundType
  onBackgroundChange: (bg: BackgroundType) => void
  config: BackgroundConfig
  onConfigChange: (config: BackgroundConfig) => void
}

export function UnifiedControls({
  background,
  onBackgroundChange,
  config,
  onConfigChange,
}: UnifiedControlsProps) {
  const [activePanel, setActivePanel] = useState<PanelType>(null)

  const togglePanel = (panel: PanelType) => {
    setActivePanel(activePanel === panel ? null : panel)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center pb-3 px-3 md:pb-4 md:px-4 pointer-events-none">
      {/* Expandable Panel */}
      {activePanel && (
        <div className="pointer-events-auto mb-2 w-full max-w-lg animate-in slide-in-from-bottom-4 fade-in duration-200">
          <div className="rounded-2xl border border-border/30 bg-card/80 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
            {/* Panel Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/20">
              <h3 className="text-sm font-semibold text-foreground">
                {activePanel === 'scenes' ? 'Background Scenes' : 'Theme & Intensity'}
              </h3>
              <button
                onClick={() => setActivePanel(null)}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scenes Panel */}
            {activePanel === 'scenes' && (
              <div className="p-3">
                <div className="grid grid-cols-4 gap-1.5 md:grid-cols-6">
                  {BACKGROUNDS.map((bg) => (
                    <button
                      key={bg.key}
                      onClick={() => {
                        onBackgroundChange(bg.key)
                      }}
                      className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-center transition-all ${
                        background === bg.key
                          ? 'bg-primary/20 text-primary ring-1 ring-primary/40'
                          : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          background === bg.key ? 'bg-primary' : 'bg-muted-foreground/40'
                        }`}
                      />
                      <span className="text-[11px] font-medium leading-none">{bg.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Theme Panel */}
            {activePanel === 'theme' && (
              <div className="p-4 space-y-4">
                {/* Color Themes */}
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Color
                  </p>
                  <div className="grid grid-cols-6 gap-1.5">
                    {(Object.keys(THEME_LABELS) as ColorTheme[]).map((theme) => (
                      <button
                        key={theme}
                        onClick={() => onConfigChange({ ...config, theme })}
                        className={`flex flex-col items-center gap-1.5 rounded-xl px-1 py-2.5 transition-all ${
                          config.theme === theme
                            ? 'bg-secondary ring-1 ring-primary/40'
                            : 'hover:bg-secondary/40'
                        }`}
                      >
                        <span
                          className={`h-4 w-4 rounded-full ring-2 ring-offset-1 ring-offset-background ${THEME_LABELS[theme].dot} ${
                            config.theme === theme ? 'ring-primary' : 'ring-transparent'
                          }`}
                        />
                        <span className="text-[10px] font-medium text-muted-foreground">
                          {THEME_LABELS[theme].label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Intensity */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Intensity
                    </p>
                    <span className="rounded-md bg-secondary/60 px-1.5 py-0.5 text-[10px] tabular-nums font-medium text-muted-foreground">
                      {Math.round(config.intensity * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={config.intensity * 100}
                    onChange={(e) =>
                      onConfigChange({ ...config, intensity: parseInt(e.target.value) / 100 })
                    }
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Toolbar */}
      <div className="pointer-events-auto w-full max-w-lg">
        <div className="flex items-center gap-1 rounded-2xl border border-border/30 bg-card/70 p-1.5 backdrop-blur-xl shadow-2xl shadow-black/30">
          {/* Scene Toggle */}
          <button
            onClick={() => togglePanel('scenes')}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 transition-all ${
              activePanel === 'scenes'
                ? 'bg-primary/15 text-primary'
                : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span className="text-[10px] font-medium">Scenes</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => togglePanel('theme')}
            className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 transition-all ${
              activePanel === 'theme'
                ? 'bg-primary/15 text-primary'
                : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
            }`}
          >
            <Palette className="h-4 w-4" />
            <span className="text-[10px] font-medium">Theme</span>
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-border/30" />

          {/* Quick Links */}
          <Link
            href="/animations"
            className="flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-muted-foreground transition-all hover:bg-secondary/40 hover:text-foreground"
          >
            <Sparkles className="h-4 w-4" />
            <span className="text-[10px] font-medium">Animate</span>
          </Link>

          <Link
            href="/concepts"
            className="flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-muted-foreground transition-all hover:bg-secondary/40 hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            <span className="text-[10px] font-medium">Concepts</span>
          </Link>

          <Link
            href="/marquee"
            className="flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-muted-foreground transition-all hover:bg-secondary/40 hover:text-foreground"
          >
            <Play className="h-4 w-4" />
            <span className="text-[10px] font-medium">Marquee</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
