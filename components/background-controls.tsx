'use client'

import { type ColorTheme, THEME_LABELS, type BackgroundConfig } from '@/lib/background-config'
import { Button } from '@/components/ui/button'
import { Settings2, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface BackgroundControlsProps {
  config: BackgroundConfig
  onChange: (config: BackgroundConfig) => void
}

export function BackgroundControls({ config, onChange }: BackgroundControlsProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="overflow-hidden rounded-2xl border border-border/30 bg-card/70 backdrop-blur-md transition-all">
        {/* Toggle button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card/50"
        >
          <Settings2 className="h-4 w-4 text-muted-foreground" />
          <span>Customize</span>
          {expanded ? (
            <ChevronDown className="ml-auto h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronUp className="ml-auto h-3 w-3 text-muted-foreground" />
          )}
        </button>

        {expanded && (
          <div className="space-y-4 border-t border-border/20 px-4 py-4">
            {/* Color Theme */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Color Theme
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {(Object.keys(THEME_LABELS) as ColorTheme[]).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => onChange({ ...config, theme })}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs transition-all ${
                      config.theme === theme
                        ? 'bg-secondary text-foreground'
                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                    }`}
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${THEME_LABELS[theme].dot}`} />
                    {THEME_LABELS[theme].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Intensity Slider */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Intensity
                </p>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {Math.round(config.intensity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={config.intensity * 100}
                onChange={(e) =>
                  onChange({ ...config, intensity: parseInt(e.target.value) / 100 })
                }
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground/60">
                <span>Subtle</span>
                <span>Intense</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
