export type ColorTheme = 'cosmic' | 'matrix' | 'ember' | 'ocean' | 'void' | 'arctic'

export interface BackgroundConfig {
  theme: ColorTheme
  intensity: number // 0.0 to 1.0
}

export interface ThemeColors {
  primary: [number, number, number]
  secondary: [number, number, number]
  accent: [number, number, number]
  glow: [number, number, number]
  bg: string
  hueBase: number
}

export const COLOR_THEMES: Record<ColorTheme, ThemeColors> = {
  cosmic: {
    primary: [150, 180, 255],
    secondary: [120, 160, 255],
    accent: [200, 220, 255],
    glow: [100, 140, 255],
    bg: 'rgba(10, 8, 30,',
    hueBase: 220,
  },
  matrix: {
    primary: [0, 255, 120],
    secondary: [0, 200, 80],
    accent: [150, 255, 200],
    glow: [0, 180, 60],
    bg: 'rgba(0, 8, 4,',
    hueBase: 140,
  },
  ember: {
    primary: [255, 140, 50],
    secondary: [255, 100, 30],
    accent: [255, 200, 120],
    glow: [255, 80, 20],
    bg: 'rgba(20, 8, 2,',
    hueBase: 25,
  },
  ocean: {
    primary: [0, 200, 200],
    secondary: [0, 160, 180],
    accent: [120, 240, 255],
    glow: [0, 140, 160],
    bg: 'rgba(2, 10, 18,',
    hueBase: 185,
  },
  void: {
    primary: [200, 200, 220],
    secondary: [150, 150, 170],
    accent: [255, 255, 255],
    glow: [120, 120, 140],
    bg: 'rgba(5, 5, 8,',
    hueBase: 240,
  },
  arctic: {
    primary: [180, 220, 255],
    secondary: [140, 200, 255],
    accent: [220, 240, 255],
    glow: [100, 180, 255],
    bg: 'rgba(4, 8, 16,',
    hueBase: 210,
  },
}

export const THEME_LABELS: Record<ColorTheme, { label: string; dot: string }> = {
  cosmic: { label: 'Cosmic', dot: 'bg-[#96b4ff]' },
  matrix: { label: 'Matrix', dot: 'bg-[#00ff78]' },
  ember: { label: 'Ember', dot: 'bg-[#ff8c32]' },
  ocean: { label: 'Ocean', dot: 'bg-[#00c8c8]' },
  void: { label: 'Void', dot: 'bg-[#c8c8dc]' },
  arctic: { label: 'Arctic', dot: 'bg-[#b4dcff]' },
}

export const GRADIENT_BG: Record<ColorTheme, string> = {
  cosmic: 'from-[#08061a] via-[#0f0d28] to-[#1a1040]',
  matrix: 'from-[#000a04] via-[#001a0a] to-[#002010]',
  ember: 'from-[#0a0400] via-[#1a0a02] to-[#201008]',
  ocean: 'from-[#020a12] via-[#041420] to-[#061a28]',
  void: 'from-[#050508] via-[#080810] to-[#0a0a14]',
  arctic: 'from-[#040810] via-[#061018] to-[#081420]',
}

export function rgb(c: [number, number, number], alpha = 1): string {
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`
}
