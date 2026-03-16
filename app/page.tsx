'use client'

import { useState } from 'react'
import { ConstellationBackground } from '@/components/constellation-background'
import { VectorFieldBackground } from '@/components/vector-field-background'
import { QuantumGridBackground } from '@/components/quantum-grid-background'
import { SandBackground } from '@/components/sand-background'
import { RainBackground } from '@/components/rain-background'
import { AuroraBackground } from '@/components/aurora-background'
import { NeuralBackground } from '@/components/neural-background'
import { NebulaBackground } from '@/components/nebula-background'
import { FluidBackground } from '@/components/fluid-background'
import { FireflyBackground } from '@/components/firefly-background'
import { WavesBackground } from '@/components/waves-background'
import { CrystallineBackground } from '@/components/crystalline-background'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { UnifiedControls } from '@/components/unified-controls'
import { type BackgroundConfig, GRADIENT_BG } from '@/lib/background-config'

type BackgroundType = 'constellation' | 'vector' | 'quantum' | 'sand' | 'rain' | 'aurora' | 'neural' | 'nebula' | 'fluid' | 'firefly' | 'waves' | 'crystalline'

// Logo image URL
const LOGO_URL = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/current-logo-MdSO8yJIi5bkMnmoFzpNLNV8JOz3hH.png'

export default function Home() {
  const [background, setBackground] = useState<BackgroundType>('constellation')
  const [bgConfig, setBgConfig] = useState<BackgroundConfig>({ theme: 'cosmic', intensity: 0.7 })

  return (
    <div className={`relative min-h-screen bg-gradient-to-b ${GRADIENT_BG[bgConfig.theme]}`}>
      {/* All backgrounds with fade transitions */}
      <div className={`transition-opacity duration-1000 ${background === 'constellation' ? 'opacity-100' : 'opacity-0'}`}>
        <ConstellationBackground theme={bgConfig.theme} intensity={bgConfig.intensity} />
      </div>
      <div className={`transition-opacity duration-1000 ${background === 'vector' ? 'opacity-100' : 'opacity-0'}`}>
        <VectorFieldBackground theme={bgConfig.theme} intensity={bgConfig.intensity} />
      </div>
      <div className={`transition-opacity duration-1000 ${background === 'quantum' ? 'opacity-100' : 'opacity-0'}`}>
        <QuantumGridBackground theme={bgConfig.theme} intensity={bgConfig.intensity} />
      </div>
      <div className={`transition-opacity duration-1000 ${background === 'sand' ? 'opacity-100' : 'opacity-0'}`}>
        <SandBackground theme={bgConfig.theme} intensity={bgConfig.intensity} />
      </div>
      <div className={`transition-opacity duration-1000 ${background === 'rain' ? 'opacity-100' : 'opacity-0'}`}>
        <RainBackground theme={bgConfig.theme} intensity={bgConfig.intensity} />
      </div>
      <div className={`transition-opacity duration-1000 ${background === 'aurora' ? 'opacity-100' : 'opacity-0'}`}>
        <AuroraBackground theme={bgConfig.theme} intensity={bgConfig.intensity} />
      </div>
      <div className={`transition-opacity duration-1000 ${background === 'neural' ? 'opacity-100' : 'opacity-0'}`}>
        <NeuralBackground theme={bgConfig.theme} intensity={bgConfig.intensity} />
      </div>
      <div className={`transition-opacity duration-1000 ${background === 'nebula' ? 'opacity-100' : 'opacity-0'}`}>
        <NebulaBackground theme={bgConfig.theme} intensity={bgConfig.intensity} />
      </div>
      <div className={`transition-opacity duration-1000 ${background === 'fluid' ? 'opacity-100' : 'opacity-0'}`}>
        <FluidBackground theme={bgConfig.theme} intensity={bgConfig.intensity} />
      </div>
      <div className={`transition-opacity duration-1000 ${background === 'firefly' ? 'opacity-100' : 'opacity-0'}`}>
        <FireflyBackground theme={bgConfig.theme} intensity={bgConfig.intensity} />
      </div>
      <div className={`transition-opacity duration-1000 ${background === 'waves' ? 'opacity-100' : 'opacity-0'}`}>
        <WavesBackground theme={bgConfig.theme} intensity={bgConfig.intensity} />
      </div>
      <div className={`transition-opacity duration-1000 ${background === 'crystalline' ? 'opacity-100' : 'opacity-0'}`}>
        <CrystallineBackground theme={bgConfig.theme} intensity={bgConfig.intensity} />
      </div>
      
      {/* Unified Controls (bottom toolbar) */}
      <UnifiedControls
        background={background}
        onBackgroundChange={setBackground}
        config={bgConfig}
        onConfigChange={setBgConfig}
      />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-28 pt-8 md:py-12 md:pb-24">
        <div className="w-full max-w-4xl space-y-8 text-center">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative h-24 w-24 md:h-32 md:w-32">
                <Image
                  src={LOGO_URL}
                  alt="EtherealExplorer logo"
                  fill
                  className="object-contain"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl shadow-[0_0_40px_rgba(120,100,255,0.3)]" />
              </div>
            </div>
            <h1 className="text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              EtherealExplorer
            </h1>
            <p className="text-pretty text-base text-muted-foreground md:text-lg lg:text-xl">
              Agentic RAG Smart Search for Engineering
            </p>
            <p className="text-pretty text-sm text-muted-foreground/80">
              Navigate through technical knowledge across infinite dimensional space
            </p>
          </div>

          {/* Search Bar */}
          <div className="mx-auto w-full max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search engineering documentation..."
                className="h-14 w-full rounded-full border-border/50 bg-card/60 pl-12 pr-32 text-base backdrop-blur-md transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
              <Button
                size="lg"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary px-6 font-medium hover:bg-primary/90"
              >
                Explore
              </Button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">Search across:</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full bg-secondary/60 backdrop-blur-md hover:bg-secondary/80"
              >
                All Sources
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full backdrop-blur-md hover:bg-secondary/60"
              >
                Documentation
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full backdrop-blur-md hover:bg-secondary/60"
              >
                Code Examples
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full backdrop-blur-md hover:bg-secondary/60"
              >
                Tutorials
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full backdrop-blur-md hover:bg-secondary/60"
              >
                APIs
              </Button>
            </div>
          </div>



          {/* Stats/Info Cards */}
          <div className="grid gap-4 pt-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/30 bg-card/40 p-6 backdrop-blur-md transition-all hover:border-primary/50 hover:bg-card/50">
              <div className="text-3xl font-bold text-primary">10M+</div>
              <div className="mt-2 text-sm text-muted-foreground">Documents Indexed</div>
            </div>
            <div className="rounded-2xl border border-border/30 bg-card/40 p-6 backdrop-blur-md transition-all hover:border-accent/50 hover:bg-card/50">
              <div className="text-3xl font-bold text-accent">99.2%</div>
              <div className="mt-2 text-sm text-muted-foreground">Accuracy Score</div>
            </div>
            <div className="rounded-2xl border border-border/30 bg-card/40 p-6 backdrop-blur-md transition-all hover:border-primary/50 hover:bg-card/50">
              <div className="text-3xl font-bold text-primary">{'<100ms'}</div>
              <div className="mt-2 text-sm text-muted-foreground">Avg Response Time</div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid gap-4 pt-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border/20 bg-card/20 p-4 text-left backdrop-blur-sm">
              <div className="text-sm font-semibold text-primary">Smart Context</div>
              <p className="mt-1 text-xs text-muted-foreground">
                AI agents understand your query and retrieve relevant context across dimensions
              </p>
            </div>
            <div className="rounded-xl border border-border/20 bg-card/20 p-4 text-left backdrop-blur-sm">
              <div className="text-sm font-semibold text-accent">Real-time Synthesis</div>
              <p className="mt-1 text-xs text-muted-foreground">
                Generate answers by synthesizing information from multiple sources instantly
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Gradient Overlays */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,100,255,0.1),transparent_50%)]" />
    </div>
  )
}
