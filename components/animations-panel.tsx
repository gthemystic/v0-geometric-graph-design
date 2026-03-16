'use client'

import { Palette, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AnimationsPanel() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="overflow-hidden rounded-2xl border border-border/30 bg-card/70 backdrop-blur-md transition-all">
        {/* Toggle button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card/50"
        >
          <Palette className="h-4 w-4 text-muted-foreground" />
          <span>Animations</span>
          {expanded ? (
            <ChevronDown className="ml-auto h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronUp className="ml-auto h-3 w-3 text-muted-foreground" />
          )}
        </button>

        {expanded && (
          <div className="space-y-3 border-t border-border/20 px-4 py-4 min-w-64">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                50 Standalone Animations
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Collection of high-quality animations for web and mobile with full theme support.
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/animations" className="block">
                <Button variant="secondary" size="sm" className="w-full rounded-lg">
                  View All Animations
                </Button>
              </Link>
              <Link href="/concepts" className="block">
                <Button variant="outline" size="sm" className="w-full rounded-lg">
                  Animations in Concepts
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div className="rounded-lg bg-secondary/20 p-2">
                <div className="font-medium">5 Categories</div>
                <div className="text-xs">Loaders, Buttons, Cards...</div>
              </div>
              <div className="rounded-lg bg-secondary/20 p-2">
                <div className="font-medium">6 Themes</div>
                <div className="text-xs">Cosmic, Matrix, Ember...</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
