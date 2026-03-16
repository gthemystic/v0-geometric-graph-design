'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Loader2, Film, Zap, Video, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'nano-generated-logos'

const originalConcepts = [
  {
    id: 1,
    src: '/logos/concept-01-spatial.jpg',
    title: 'Spatial Unfold',
    description: 'A translucent 3D cube unfolding into dimensional planes.',
    nanoPrompt: 'A minimal abstract logo icon for "Ethereal Dimension" AI technology company. A translucent 3D cube unfolding into dimensional planes, thin luminous edges. Deep indigo background, white and cyan linework. Clean, architectural, futuristic. No text, centered.',
    rationale: 'Bridges architecture and technology. The unfolding suggests revealing hidden dimensions.',
  },
  {
    id: 2,
    src: '/logos/concept-02-portal.jpg',
    title: 'Dimensional Gateway',
    description: 'Concentric geometric rings creating depth perspective.',
    nanoPrompt: 'A minimal abstract logo icon for frontier AI company. A circular portal gateway made of layered geometric rings creating depth perspective, glowing from within. Deep dark background, soft white and violet light. Ethereal, dimensional, elegant. No text, centered.',
    rationale: 'The gateway metaphor speaks to frontier AI crossing into new territory.',
  },
  {
    id: 3,
    src: '/logos/concept-03-tesseract.jpg',
    title: 'Tesseract',
    description: 'A 4D hypercube rendered in luminous wireframe.',
    nanoPrompt: 'A minimal abstract logo icon mark. A tesseract 4D hypercube rendered with thin glowing wireframe lines, suggesting dimensions beyond 3D space. Dark background, white and electric blue lines. Mathematical, transcendent, clean. No text, centered.',
    rationale: 'Directly embodies "Ethereal Dimension" -- a shape existing in higher dimensions.',
  },
  {
    id: 4,
    src: '/logos/concept-04-cityscape.jpg',
    title: 'City to Cloud',
    description: 'Abstract skyline dissolving into particles and data points.',
    nanoPrompt: 'A minimal abstract logo icon for smart city AI company. Abstract city skyline dissolving into particles and data points at the top, built environment transforming into digital intelligence. Dark background, teal and white glow. No text, centered.',
    rationale: 'Visually tells the company story: physical infrastructure becoming intelligent.',
  },
  {
    id: 5,
    src: '/logos/concept-05-eye.jpg',
    title: 'Vision Engine',
    description: 'A geometric eye with an iris of concentric data rings.',
    nanoPrompt: 'A minimal abstract logo icon for computer vision AI company. A stylized eye composed of geometric facets and scan lines, iris made of concentric data rings. Dark background, cyan and white glow. Technical yet mystical. No text, centered.',
    rationale: 'Represents core computer vision capabilities with a mystical quality.',
  },
  {
    id: 6,
    src: '/logos/concept-06-ed-monogram.jpg',
    title: 'ED Monogram',
    description: 'Letters E and D intertwined with luminous geometric lines.',
    nanoPrompt: 'A minimal monogram logo icon combining letters E and D intertwined with thin luminous lines forming a geometric shape. Suggests dimensions and space. Dark background, silver and soft purple glow. Premium, modern. Stylized E D, centered.',
    rationale: 'Classic monogram grounded in initials with premium geometric construction.',
  },
  {
    id: 7,
    src: '/logos/concept-07-mesh.jpg',
    title: 'Spatial Mesh',
    description: 'A 3D mesh surface scan rendered as a glowing wireframe sphere.',
    nanoPrompt: 'A minimal abstract logo icon for spatial intelligence company. A 3D mesh surface scan rendered as a glowing wireframe sphere, points of light at vertices. Dark background, blue-white luminous lines. Scientific, precise. No text, centered.',
    rationale: 'Directly references spatial scanning technology as an iconic mark.',
  },
  {
    id: 8,
    src: '/logos/concept-08-prism.jpg',
    title: 'Dimension Prism',
    description: 'A prism refracting light into multiple spectral dimensions.',
    nanoPrompt: 'A minimal abstract logo icon mark. A triangular prism refracting a single beam of light into multiple spectral dimensions. Dark background, clean white prism with spectrum of blue, purple, cyan. Elegant, premium. No text, centered.',
    rationale: 'Represents how ED reveals multiple layers of insight from raw data.',
  },
  {
    id: 9,
    src: '/logos/concept-09-wave.jpg',
    title: 'Phase Shift',
    description: 'A wave transforming from solid architectural line into particles.',
    nanoPrompt: 'A minimal abstract logo icon for AI company. An ethereal sine wave transforming from solid architectural line into dissolving particles. Dark background, white fading to cyan particles. Poetic, technological. No text, centered.',
    rationale: 'The phase shift represents the moment when built environment becomes data.',
  },
  {
    id: 10,
    src: '/logos/concept-10-infinity.jpg',
    title: 'Infinite Dimension',
    description: 'An infinity symbol constructed from blueprint lines and nodes.',
    nanoPrompt: 'A minimal abstract logo icon mark. An infinity symbol constructed from architectural blueprint lines and glowing nodes, suggesting infinite dimensions. Dark background, soft white and lavender glow. Timeless, transcendent. No text, centered.',
    rationale: 'Timeless symbol paired with architectural aesthetic suggesting infinite potential.',
  },
]

const v2Concepts = [
  {
    id: 1,
    src: '/logos/v2-01-v0.jpg',
    title: 'Geodesic Core',
    description: 'A wireframe icosahedron with teal edges and a bright core point of light.',
    nanoPrompt: 'Minimal futuristic logo on pure black background. A wireframe icosahedron (20-sided polyhedron) with thin glowing dark teal and cyan edges, subtle grid lines on each face, a bright teal point of light at center. Holographic, architectural, dark green cyan color palette. No text, centered.',
    rationale: 'The icosahedron is nature\'s most efficient shape. Its wireframe rendering echoes the current logo\'s grid aesthetic while adding geometric complexity.',
  },
  {
    id: 2,
    src: '/logos/v2-02-v0.jpg',
    title: 'Nested Cubes',
    description: 'Concentric wireframe cubes rotating at different angles in dark teal.',
    nanoPrompt: 'Minimal futuristic logo on pure black background. Nested concentric wireframe cubes rotating at different angles, each layer a slightly different shade of dark teal to cyan, with fine grid lines. 3D holographic blueprint aesthetic. No text, centered.',
    rationale: 'Extends the current cube motif into recursive depth. Each nested layer represents a dimension of intelligence -- spatial, temporal, contextual.',
  },
  {
    id: 3,
    src: '/logos/v2-03-v0.jpg',
    title: 'Dimensional Rift',
    description: 'A wireframe sphere with a glowing emerald portal slicing through center.',
    nanoPrompt: 'Minimal futuristic logo on pure black background. A wireframe sphere made of latitude and longitude grid lines in dark teal cyan, with a glowing emerald green dimensional rift slicing through the center horizontally. Holographic, scientific. No text, centered.',
    rationale: 'The rift creates visual tension -- a moment of breakthrough. Represents how ED\'s AI opens new dimensions within existing spatial data.',
  },
  {
    id: 4,
    src: '/logos/v2-04-v0.jpg',
    title: 'ED Wireframe',
    description: 'Letters E and D formed from 3D teal wireframe geometry extruded into space.',
    nanoPrompt: 'Minimal futuristic logo on pure black background. The letters E and D formed from thin teal wireframe 3D geometry, extruded into dimensional space with visible grid planes. Dark green to cyan gradient lines. Architectural monogram. Centered.',
    rationale: 'The most direct brand connection. 3D extrusion of the monogram ties it to the existing visual language while being immediately recognizable.',
  },
  {
    id: 5,
    src: '/logos/v2-05-v0.jpg',
    title: 'Hypercube',
    description: 'A tesseract with inner cube connected to outer cube by glowing cyan edges.',
    nanoPrompt: 'Minimal futuristic logo on pure black background. A tesseract (4D hypercube) rendered as thin teal wireframe with inner cube connected to outer cube by glowing cyan edges. Fine grid overlay on faces. Dark emerald green holographic glow. No text, centered.',
    rationale: 'The purest expression of "Ethereal Dimension" -- a literal 4th-dimensional shape. Strong evolution of the current cube-in-cube logo.',
  },
  {
    id: 6,
    src: '/logos/v2-06-v0.jpg',
    title: 'City Dissolve',
    description: 'A 3D wireframe building dissolving into scattered teal data particles.',
    nanoPrompt: 'Minimal futuristic logo on pure black background. A 3D wireframe building or tower dissolving upward into scattered teal data particles and grid fragments. Dark green and cyan lines. Built environment becoming digital. Architectural, ethereal. No text, centered.',
    rationale: 'Tells the company story in one mark: the built environment transforming into intelligent data. Perfect for the "frontier AI for the built environment" positioning.',
  },
  {
    id: 7,
    src: '/logos/v2-07-v0.jpg',
    title: 'Coordinate Origin',
    description: 'Three intersecting grid planes with a bright tetrahedron at the origin.',
    nanoPrompt: 'Minimal futuristic logo on pure black background. Three intersecting geometric planes forming a 3D coordinate system, each plane a translucent dark teal grid. A bright cyan tetrahedron floating at the origin point. Technical, dimensional, holographic. No text, centered.',
    rationale: 'The coordinate system is the foundation of spatial intelligence. The tetrahedron at origin represents the core AI finding its place in space.',
  },
  {
    id: 8,
    src: '/logos/v2-08-v0.jpg',
    title: 'Hex Tunnel',
    description: 'Concentric hexagons viewed from above creating an infinite tunnel effect.',
    nanoPrompt: 'Minimal futuristic logo on pure black background. A hexagonal prism viewed from above, creating concentric hexagon wireframes in dark teal and cyan with fine grid subdivisions. Looks like looking down into an infinite tunnel. Holographic depth effect. No text, centered.',
    rationale: 'Hexagons are structurally optimal and common in architecture. The tunnel creates a sense of depth and infinite dimension.',
  },
  {
    id: 9,
    src: '/logos/v2-09-v0.jpg',
    title: 'Vision Scan',
    description: 'A point cloud forming an eye shape, representing computer vision.',
    nanoPrompt: 'Minimal futuristic logo on pure black background. A point cloud forming a human eye shape made of tiny teal and cyan dots connected by faint lines, representing computer vision and spatial intelligence. Dark green holographic scan aesthetic. No text, centered.',
    rationale: 'Bridges the AI vision and spatial scanning capabilities. The point-cloud aesthetic connects directly to lidar and photogrammetry technology.',
  },
  {
    id: 10,
    src: '/logos/v2-10-v0.jpg',
    title: 'Impossible Dimension',
    description: 'A Penrose impossible triangle in teal wireframe with grid texture.',
    nanoPrompt: 'Minimal futuristic logo on pure black background. A Penrose impossible triangle rendered as glowing teal wireframe with fine grid texture on each face, creating an optical illusion of infinite dimension. Dark green to cyan edge glow. Geometric, transcendent. No text, centered.',
    rationale: 'The impossible triangle represents seeing beyond conventional perception -- the same way ED\'s AI sees dimensions humans cannot.',
  },
]

const remotionPrompts = [
  {
    title: 'Constellation Birth',
    description: 'Premium holographic star network emergence with depth',
    prompt: `Create "ConstellationBirth" at 1920x1080, 30fps, 360 frames. Background: radial gradient "#0a0515" to "#050208". Render 180 stars as SVG circles with spring({frame, from: 0, to: 2.5, config: {damping: 20, mass: 0.8}}) for radius, seeded-random positions. Each star: fill white, opacity using interpolate(frame + seed*5, [0,180,360], [0.3,1.0,0.3], {extrapolateRight:'wrap'}) for individual twinkles. Drift with transform translateX(sin((frame+seedX)*0.005)*12) translateY(cos((frame+seedY)*0.007)*10). Connection lines: compute only for pairs <200px apart, stroke linearGradient alpha mapped to distance, strokeWidth interpolate(dist,[0,200],[1.8,0.2]). Add z-depth simulation: 3 layers with different drift speeds and blur filters (filter="blur(0.5px)" on far layer). Stars pulse brighter (+0.3 opacity) when 3+ connections active. Camera subtle Ken Burns: scale from 1.0 to 1.05 over duration. Ultra-premium depth-of-field aesthetic.`,
  },
  {
    title: 'Vector Current',
    description: 'Cinematic particle flow with trailing ribbons',
    prompt: `Create "VectorCurrent" at 1920x1080, 30fps, 420 frames. Canvas 2D rendering with custom noise field. Initialize 1200 particles with: position, velocity, age, color from palette ["rgba(80,180,255,0.85)", "rgba(100,220,255,0.75)", "rgba(60,140,220,0.65)"]. Implement improved Perlin noise: noise(x,y,t) = (sin(x*0.008+t*0.3)*0.5 + sin(x*0.015+t*0.5)*0.3 + cos(y*0.011+t*0.4)*0.2) * PI. Each frame: calculate angle from noise, apply force (cos(angle)*1.2, sin(angle)*1.2) to velocity, add slight drag (vel *= 0.97). Store last 8 positions per particle, render smooth bezier curves through them with gradient stroke (alpha 0.2 to full color). Particles fade in over first 30 frames (spring), maintain state, wrap at edges. Add motion blur: composite with previous frame at 0.15 opacity before redraw. Background: radial gradient "#0f0d28" to "#08091c". Camera slow dolly: scale interpolate(frame,[0,420],[1.0,1.08]). Premium fluid dynamics aesthetic.`,
  },
  {
    title: 'Quantum Lattice',
    description: 'Multi-dimensional grid with cascading energy waves',
    prompt: `Create "QuantumLattice" at 1920x1080, 30fps, 300 frames. SVG rendering with performance optimization via React.memo and useMemo. Grid: 35x20 circles (60px spacing) centered. For each point (x,y): compute dist=sqrt((x-cx)²+(y-cy)²), waveValue=sin(dist*0.045 - frame*0.12 + noise(x,y)*0.3). Map wave to: radius spring({frame:waveValue, from:2, to:6}), opacity interpolate(waveValue,[-1,1],[0.12,0.95]), color interpolate(waveValue,[-1,0,1],["rgb(80,120,255)","rgb(140,180,255)","rgb(180,220,255)"]). Connection lines: draw <line> to 4 adjacent neighbors, strokeOpacity=average of endpoint opacities, stroke color matches brighter endpoint. Add secondary wave: smaller amplitude offset by 180°. Glow effect: <feGaussianBlur stdDeviation="2"/> + <feColorMatrix> to boost bright points. Background: "#0a0818" with subtle vignette (radial gradient overlay). Camera subtle rotation: transform rotate(interpolate(frame,[0,300],[0,2])) on root <g>. Premium scientific visualization aesthetic.`,
  },
  {
    title: 'Desert Data',
    description: 'Golden sand grains drift with wind',
    prompt: `Create a Remotion composition "DesertData". Use Canvas 2D to render 600 sand particles. Each particle: random x across width, y starts above viewport, falls at 0.2-0.4px per frame, drifts horizontally with sin(frame * 0.02 + seed) * 0.3. Color: randomize between rgb(200,170,100), rgb(180,150,80), rgb(220,190,130). Size: 1-2.5px with radial gradient glow (radius * 2). When particles pass bottom edge, reset to top with new random x. Background: dark gradient from "#0f0a18" top to "#1a1030" bottom (draw as gradient rect each frame). 1920x1080, 300 frames, 30fps. Warm, contemplative mood.`,
  },
  {
    title: 'Digital Rain',
    description: 'Slow luminous drops with gentle ripples',
    prompt: `Create a Remotion composition "DigitalRain". Canvas 2D with two systems: Raindrops - 80 lines (length 15px, color "rgba(150,200,255,0.6)", strokeWidth 1.5) falling at 2-3px/frame with slight horizontal wind sin(frame*0.01)*0.5. When a drop reaches y > canvas.height * 0.85, spawn a Ripple. Ripples - expanding circles starting at radius 2, growing 0.6px/frame, opacity decreasing from 0.4 to 0 over 60 frames. Stroke "rgba(150,200,255, opacity)", lineWidth 1.2. Remove ripples when opacity <= 0. Background: "#08061a". 1920x1080, 300 frames, 30fps.`,
  },
  {
    title: 'Aurora Cascade',
    description: 'Flowing curtains of spectral light',
    prompt: `Create a Remotion composition "AuroraCascade". Use Canvas 2D. Draw 5 layered wave bands across the screen. Each band: define 20 control points across the width, y position calculated as baseY + sin(x * frequency + frame * 0.02 + phaseOffset) * amplitude. Draw using bezierCurveTo for smooth curves. Fill with vertical gradient: transparent at top, band color at middle (greens "#00ff88", cyans "#00ccff", purples "#8844ff"), transparent at bottom. Each band has different baseY (300-600), amplitude (40-80), frequency (0.003-0.008). Use globalAlpha 0.3 for layering. Background: "#08061a". 1920x1080, 360 frames, 30fps.`,
  },
  {
    title: 'Synaptic Network',
    description: 'Neural pulses travel between nodes',
    prompt: `Create a Remotion composition "SynapticNetwork". SVG-based. Place 60 nodes at semi-random positions (use seeded random for consistency). Connect nodes within 200px with lines. Each node: circle r=3, fill "rgb(150,180,255)". Create "pulses" that travel along connections: use useCurrentFrame() to spawn a pulse every 15 frames on a random connection. The pulse is a circle (r=4, fill white, opacity animated 1->0) that interpolates its position from node A to node B over 30 frames using spring(). Resting node opacity: 0.4. Node glows brighter (opacity 0.9) when a pulse arrives. Background: "#0f0d28". 1920x1080, 300 frames, 30fps.`,
  },
  {
    title: 'Cosmic Nebula Breath',
    description: 'Dust clouds swell and contract',
    prompt: `Create a Remotion composition "NebulaBreach". Canvas 2D. Create 15 large soft circles (nebula clouds) at random positions. Each: radius 100-300px, color chosen from ["rgba(80,40,120,0.15)", "rgba(40,20,100,0.12)", "rgba(120,40,80,0.1)"]. Animate radius with breathing: radius + sin(frame * 0.015 + seed) * 30. Draw each as a radial gradient from color-center to transparent-edge. Layer them with globalCompositeOperation "screen" for additive blending. Add 200 tiny star dots (1-2px, white, random opacity 0.3-0.8 with twinkle). Background: "#08061a". 1920x1080, 360 frames, 30fps.`,
  },
  {
    title: 'Fluid Dimension',
    description: 'Ink tendrils spread through dark water',
    prompt: `Create a Remotion composition "FluidDimension". Canvas 2D. Simulate 8 metaball-like blobs. Each blob has position (animated with Lissajous curves: x = cx + sin(a*t+px)*rx, y = cy + sin(b*t+py)*ry), radius 80-150px. On each frame, for each pixel (sample every 4px for performance), calculate sum of (radius/distance) for all blobs. If sum > 1.0, color the pixel using a gradient mapped from sum value: low = "rgba(100,0,150,0.5)", high = "rgba(0,200,255,0.8)". Use imageData for pixel manipulation. Background: "#08061a". 1920x1080, 300 frames, 30fps.`,
  },
  {
    title: 'Bioluminescent Field',
    description: 'Warm orbs drift with light trails',
    prompt: `Create a Remotion composition "BioluminescentField". Canvas 2D. 40 firefly entities. Each: position animated with gentle wandering (angle += random small delta each frame, x += cos(angle)*0.5, y += sin(angle)*0.5). Draw as radial gradient: center "rgba(255,220,100,0.9)", middle "rgba(255,180,50,0.4)", edge transparent. Radius: 6px core with 25px glow. Brightness pulses: opacity *= 0.6 + sin(frame*0.03 + seed)*0.4. Store last 20 positions, draw fading trail connecting them (lineWidth 1, decreasing opacity). Background: "#08061a". 1920x1080, 300 frames, 30fps.`,
  },
  {
    title: 'Standing Waves',
    description: 'Harmonic lines creating interference',
    prompt: `Create a Remotion composition "StandingWaves". SVG-based. Render 8 horizontal wave lines. Each wave: 200 points across width. y = baseY + sin(x * frequency + frame * speed + phase) * amplitude. Different parameters per wave: frequencies [0.01, 0.015, 0.008, 0.012, 0.02, 0.007, 0.018, 0.009], amplitudes [30-60px], speeds [0.05-0.12], baseY spaced 80px apart centered vertically. Render as SVG <polyline> with stroke color interpolated from "#0088ff" to "#00ddcc" per wave. StrokeWidth 1.5, opacity 0.6. At intersection points (where waves cross), draw a bright dot (r=3, white, opacity 0.8). Background: "#08061a". 1920x1080, 300 frames, 30fps.`,
  },
  {
    title: 'Crystal Formation',
    description: 'Hexagonal crystals rotate with inner glow',
    prompt: `Create a Remotion composition "CrystalFormation". SVG-based. Create 25 hexagons at random positions. Each hexagon: 6-point polygon, radius 30-70px. Animate rotation using useCurrentFrame(): rotate(frame * rotationSpeed) where rotationSpeed varies 0.1-0.5 deg/frame. Fill: semi-transparent gradient simulated with nested hexagons at decreasing opacity from "rgba(120,140,255,0.3)" to "rgba(180,100,255,0.1)". Stroke: "rgba(150,180,255,0.5)", strokeWidth 1. On hover proximity to center: hexagons within 300px of screen center glow brighter (opacity + 0.2). Background: "#08061a". 1920x1080, 300 frames, 30fps.`,
  },
  {
    title: 'Dimensional Rift',
    description: 'A tear in space reveals light within',
    prompt: `Create a Remotion composition "DimensionalRift". Canvas 2D. Draw a vertical rift at center (x = width/2). The rift is defined by two wavy lines (left edge, right edge) with separation animated: base gap 10px + sin(frame*0.03)*20px. Wave the edges using sin(y*0.02 + frame*0.05)*15. Fill between edges with bright gradient: white center fading to "rgba(120,100,255,0.5)". Add a glow: draw the rift area 3 more times with increasing blur (shadowBlur 20,40,60) and decreasing opacity. Emit 50 particles drifting outward from the rift edges. Background: "#08061a". 1920x1080, 240 frames, 30fps.`,
  },
  {
    title: 'Topographic Pulse',
    description: 'Contour lines ripple like radar',
    prompt: `Create a Remotion composition "TopographicPulse". SVG-based. Draw 30 concentric ellipses centered on screen. Each ellipse: rx and ry slightly varied with sin(angle*3 + seed)*jitter to make them organic (not perfect circles). Animate a radial pulse: calculate each ring's distance from center, apply brightness = sin(distance*0.02 - frame*0.08). Map brightness to stroke opacity (0.1 to 0.7) and color (dark: "rgb(40,80,120)" to bright: "rgb(100,200,255)"). StrokeWidth: 1. Spacing between rings: 25px. Add slight wobble to ring positions over time. Background: "#08061a". 1920x1080, 300 frames, 30fps.`,
  },
  {
    title: 'Ethereal Convergence',
    description: 'All visual themes unified into one',
    prompt: `Create a Remotion composition "EtherealConvergence" using <Series> to sequence 5 segments, each 120 frames, with 30-frame crossfade transitions using <TransitionSeries> with fade(). Segment 1: constellation stars (40 dots + lines). Segment 2: flowing particles (200 particles with trails). Segment 3: aurora waves (3 bands). Segment 4: neural nodes with pulses (20 nodes). Segment 5: all elements combined at 50% density converging toward center point, then expanding outward. Each segment uses Canvas 2D. Background throughout: "#08061a". Total: 600 frames, 30fps, 1920x1080. Use Remotion's useCurrentFrame() and interpolate() for all animations.`,
  },
  {
    title: 'Wireframe Cube Rotation',
    description: 'Teal wireframe cube with nested tetrahedron',
    prompt: `Create a Remotion composition "WireframeCube". Use Three.js (import {useThree} from '@react-three/fiber'). Render a wireframe cube (BoxGeometry with EdgesGeometry, LineBasicMaterial color "#00ddaa") with 2-unit edges. Inside, render a wireframe tetrahedron (TetrahedronGeometry, EdgesGeometry, color "#00ffcc"). Animate both: cube rotates (rotation.x += 0.005, rotation.y += 0.008), tetrahedron rotates independently (rotation.x -= 0.01, rotation.y += 0.012). Add grid floor (GridHelper, size 10, divisions 10, color "#003344"). Camera: position [4, 3, 5], lookAt [0,0,0]. Background: "#000000". 1920x1080, 300 frames, 30fps.`,
  },
  {
    title: 'Particle Storm',
    description: 'Thousands of particles swirl in vortex',
    prompt: `Create a Remotion composition "ParticleStorm". Canvas 2D. Render 2000 tiny particles. Each particle orbits around center with: distance from center (100-600px), angular velocity varying by distance, vertical position offset sin(angle*4)*20. Calculate x = cx + cos(angle)*distance, y = cy + sin(angle)*distance + vOffset. Color: map distance to hue gradient from cyan "#00aaff" (close) to purple "#aa00ff" (far). Draw as 1px dots. Every 5 frames, add slight turbulence: angle += random(-0.05, 0.05). Background: "#000000". 1920x1080, 360 frames, 30fps.`,
  },
  {
    title: 'Holographic Interface',
    description: 'Futuristic HUD panels with data streams',
    prompt: `Create a Remotion composition "HolographicInterface". SVG-based. Render 4 rounded-rectangle panels positioned around screen edges (semi-transparent fill "rgba(0,100,120,0.08)", stroke "#00ddaa", strokeWidth 1). Inside each panel: scrolling text lines (12px monospace font, color "#00ddaa", opacity 0.6) that animate y position downward, wrapping when off-screen. Add 3 circular radar-style elements with scanning arcs (use SVG <path> for arc, stroke animated around circle, strokeDasharray). Corner brackets on each panel. Center: rotating compass/target rings. Background: "#08061a". 1920x1080, 300 frames, 30fps.`,
  },
  {
    title: 'Energy Vortex',
    description: 'Spiral of light converging to center',
    prompt: `Create a Remotion composition "EnergyVortex". Canvas 2D. Generate 12 spiral arms. Each arm: 100 points along an Archimedean spiral (r = a + b*theta). Points glow brighter near center. Draw using line segments with gradient stroke from transparent-edge to bright-center. Colors cycle through ["#00ffaa", "#00ddff", "#8844ff", "#ff00aa"]. Animate by rotating all spirals around center (angle += frame * 0.02) and pulsing brightness (opacity *= 0.5 + sin(frame*0.05)*0.5). Add radial motion blur effect (draw translucent trails). Background: "#000000". 1920x1080, 300 frames, 30fps.`,
  },
  {
    title: 'Glitch Dimension',
    description: 'Reality tears with digital artifacts',
    prompt: `Create a Remotion composition "GlitchDimension". Canvas 2D. Start with base grid pattern (thin lines, "#003344"). Every 30-60 frames (random), trigger glitch: select random rectangular region, copy imageData, apply horizontal offset (shift pixel rows by random amounts), apply color channel separation (split RGB, offset red left, blue right), add scanlines. Glitch lasts 8-15 frames then repairs. Between glitches, render floating geometric shapes (triangles, hexagons) with sharp edges, neon colors ["#00ff00", "#ff0044", "#00ffff"], rotating slowly. Background: "#0a0a12". 1920x1080, 300 frames, 30fps.`,
  },
  {
    title: 'Liquid Metal',
    description: 'Chrome-like fluid surface reflecting light',
    prompt: `Create a Remotion composition "LiquidMetal". Canvas 2D with advanced technique. Simulate reflective liquid surface using normal map approach: create height field (2D array) with values animated by summing multiple sine waves at different frequencies. Calculate surface normals from height differences. For each pixel (sample every 2px), use normal to determine reflection direction, map to color gradient from dark "rgb(20,30,40)" to bright "rgb(180,220,255)". Add specular highlights where normals point toward "light source" at top-center. Background: "#000000". 1920x1080, 240 frames, 30fps. Very cinematic.`,
  },
  {
    title: 'DNA Helix',
    description: 'Double helix rotating with glowing base pairs',
    prompt: `Create a Remotion composition "DNAHelix". SVG-based or Canvas 2D. Generate two helical curves: x1 = cos(t)*radius, y1 = t*stretch, z1 = sin(t)*radius. x2 = -x1, y2 = y1, z2 = -z1. Sample 40 points along each helix. Project 3D to 2D using simple perspective. Draw the two backbone curves (stroke "#00ddaa", strokeWidth 2). Every 4th point, draw connecting "rung" between helices (stroke "#00ffcc", strokeWidth 1). Animate rotation around y-axis. Add glow effect to rungs (shadowBlur). Background: "#08061a". 1920x1080, 300 frames, 30fps.`,
  },
  {
    title: 'Fractal Zoom',
    description: 'Mandelbrot set zoom with color cycling',
    prompt: `Create a Remotion composition "FractalZoom". Canvas 2D. Implement Mandelbrot set renderer: for each pixel, map to complex plane coordinates, iterate z = z² + c up to 50 iterations or until |z| > 2. Color based on iteration count using HSL: hue = (iterations + frame) % 360, saturation 80%, lightness 50%. Animate zoom: zoom_level = 1 + frame * 0.1, center point = (-0.5, 0). Recalculate fractal every frame. For performance, use imageData and typed arrays. Background (max iterations): "#000000". 1920x1080, 180 frames, 30fps. Compute-intensive but stunning.`,
  },
  {
    title: 'Data Particles Rising',
    description: 'Binary code streams ascending upward',
    prompt: `Create a Remotion composition "DataParticlesRising". Canvas 2D. Render 60 vertical columns of text (monospace font 10px, colors ["#00ff00", "#00ffaa", "#00ffff"]). Each column: string of random 0s and 1s, scrolling upward at varying speeds (1-3px/frame). When text scrolls off top, append new random digits at bottom. Add trailing fade effect: draw each character with decreasing opacity from bottom (1.0) to top (0.0). Background: "#000000". Occasionally (every 20 frames), flash a few characters brighter (white) for 2 frames. Matrix-style aesthetic. 1920x1080, 300 frames, 30fps.`,
  },
  {
    title: 'Portal Gateway',
    description: 'Concentric rings expanding and contracting',
    prompt: `Create a Remotion composition "PortalGateway". SVG-based. Render 20 concentric circles centered on screen. Animate radius of each ring: base_radius = ring_index * 40 + sin(frame*0.05 + ring_index*0.3)*60. Rings pulse inward/outward creating wave effect. Stroke color: interpolate from inner (bright cyan "#00ffff") to outer (deep purple "#8800ff"). StrokeWidth: 2. Add rotation: each ring rotates at different speed (ring_index * 0.2 deg/frame). Center: bright white glow (radial gradient circle). Background: "#000000". 1920x1080, 300 frames, 30fps. Hypnotic portal effect.`,
  },
]

export default function ConceptsPage() {
  const [nanoImages, setNanoImages] = useState<Record<number, string>>({})
  const [generating, setGenerating] = useState<Record<number, boolean>>({})
  const [errors, setErrors] = useState<Record<number, string>>({})
  const [generatingAll, setGeneratingAll] = useState(false)
  const [activeTab, setActiveTab] = useState<'logos' | 'remotion'>('logos')

  const allConcepts = [...originalConcepts, ...v2Concepts]

  // Load persisted nano images on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setNanoImages(JSON.parse(stored))
      } catch (error) {
        console.error('[v0] Failed to parse stored nano images:', error)
      }
    }
  }, [])

  // Persist nano images whenever they change
  useEffect(() => {
    if (Object.keys(nanoImages).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nanoImages))
    }
  }, [nanoImages])

  const generateNanoLogo = async (concept: typeof allConcepts[0]) => {
    setGenerating(prev => ({ ...prev, [concept.id]: true }))
    setErrors(prev => ({ ...prev, [concept.id]: '' }))

    try {
      const response = await fetch('/api/generate-nano-logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: concept.nanoPrompt,
          conceptId: concept.id 
        }),
      })

      const data = await response.json()

      if (data.success && data.imageUrl) {
        setNanoImages(prev => ({ ...prev, [concept.id]: data.imageUrl }))
      } else {
        setErrors(prev => ({ ...prev, [concept.id]: data.error || 'Generation failed' }))
      }
    } catch {
      setErrors(prev => ({ ...prev, [concept.id]: 'Network error. Try again.' }))
    } finally {
      setGenerating(prev => ({ ...prev, [concept.id]: false }))
    }
  }

  const generateAll = async () => {
    setGeneratingAll(true)
    for (const concept of allConcepts) {
      if (!nanoImages[concept.id]) {
        await generateNanoLogo(concept)
      }
    }
    setGeneratingAll(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#08061a] via-[#0f0d28] to-[#1a1040]">
      <header className="sticky top-0 z-50 border-b border-border/20 bg-background/60 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-bold text-foreground">Ethereal Dimension</h1>
              <p className="text-xs text-muted-foreground">
                Logo Concepts & Remotion Prompts
              </p>
            </div>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-1 rounded-full border border-border/30 bg-card/60 p-1 backdrop-blur-md">
            <Button
              size="sm"
              variant={activeTab === 'logos' ? 'secondary' : 'ghost'}
              onClick={() => setActiveTab('logos')}
              className="h-8 rounded-full text-xs"
            >
              <Sparkles className="mr-1.5 h-3 w-3" />
              Logo Concepts
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'remotion' ? 'secondary' : 'ghost'}
              onClick={() => setActiveTab('remotion')}
              className="h-8 rounded-full text-xs"
            >
              <Film className="mr-1.5 h-3 w-3" />
              Remotion Prompts
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'videos' ? 'secondary' : 'ghost'}
              onClick={() => setActiveTab('videos')}
              className="h-8 rounded-full text-xs"
            >
              <Video className="mr-1.5 h-3 w-3" />
              Video Gallery
            </Button>
            <Button
              size="sm"
              variant={activeTab === 'animations' ? 'secondary' : 'ghost'}
              onClick={() => setActiveTab('animations')}
              className="h-8 rounded-full text-xs"
            >
              <Palette className="mr-1.5 h-3 w-3" />
              Animations
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">

        {/* ===== LOGOS TAB ===== */}
        {activeTab === 'logos' && (
          <>
            {/* Current Logo Reference */}
            <div className="mb-10 overflow-hidden rounded-2xl border border-border/30 bg-card/20 p-6 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-xl bg-black">
                  <Image
                    src="/current-logo.png"
                    alt="Current Ethereal Dimension logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">Current Logo</p>
                  <h3 className="mt-1 text-lg font-bold text-foreground">Ethereal Dimension</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Dark teal wireframe 3D cube with nested tetrahedron on black. This is the reference aesthetic -- all concepts below explore variations of this dark green, holographic, architectural wireframe language.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                  Logo Exploration
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  Twenty concepts total -- 10 original abstract explorations, plus 10 new concepts in the dark teal wireframe aesthetic. Each generated by v0 and Nano-Banana-Pro side by side.
                </p>
              </div>
              <Button
                onClick={generateAll}
                disabled={generatingAll}
                className="shrink-0 rounded-full"
              >
                {generatingAll ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating All...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generate All Nano Logos
                  </>
                )}
              </Button>
            </div>

            {/* Column headers */}
            <div className="mb-4 grid grid-cols-2 gap-4 px-2">
              <div className="text-center">
                <span className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary">
                  v0
                </span>
              </div>
              <div className="text-center">
                <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent">
                  Nano-Banana-Pro
                </span>
              </div>
            </div>

            {/* Original Concepts Section */}
            <h3 className="mb-4 text-xl font-bold text-foreground">Original Concepts</h3>
            <div className="mb-12 space-y-6">
              {originalConcepts.map((concept) => (
                <div
                  key={concept.id}
                  className="overflow-hidden rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/30"
                >
                  {/* Concept header */}
                  <div className="flex items-center gap-3 border-b border-border/20 px-6 py-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                      {concept.id}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{concept.title}</h3>
                      <p className="text-xs text-muted-foreground">{concept.description}</p>
                    </div>
                  </div>

                  {/* Side by side images */}
                  <div className="grid grid-cols-2 gap-px bg-border/20">
                    {/* v0 */}
                    <div className="relative aspect-square bg-[#0a0818]">
                      <Image
                        src={concept.src}
                        alt={`${concept.title} - v0`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Nano-Banana-Pro */}
                    <div className="relative aspect-square bg-[#0a0818]">
                      {nanoImages[concept.id] ? (
                        <Image
                          src={nanoImages[concept.id]}
                          alt={`${concept.title} - Nano-Banana-Pro`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-3 p-4">
                          {errors[concept.id] ? (
                            <>
                              <p className="text-center text-xs text-destructive">{errors[concept.id]}</p>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => generateNanoLogo(concept)}
                                disabled={generating[concept.id]}
                                className="rounded-full"
                              >
                                Retry
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => generateNanoLogo(concept)}
                              disabled={generating[concept.id]}
                              className="rounded-full"
                            >
                              {generating[concept.id] ? (
                                <>
                                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <Sparkles className="mr-2 h-3 w-3" />
                                  Generate
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Rationale */}
                  <div className="border-t border-border/20 px-6 py-4">
                    <p className="text-sm text-muted-foreground">{concept.rationale}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* v2 Dark Teal Concepts Section */}
            <h3 className="mb-4 text-xl font-bold text-foreground">v2 Dark Teal Wireframe Concepts</h3>
            <div className="space-y-6">
              {v2Concepts.map((concept) => (
                <div
                  key={concept.id}
                  className="overflow-hidden rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/30"
                >
                  {/* Concept header */}
                  <div className="flex items-center gap-3 border-b border-border/20 px-6 py-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                      {concept.id}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{concept.title}</h3>
                      <p className="text-xs text-muted-foreground">{concept.description}</p>
                    </div>
                  </div>

                  {/* Side by side images */}
                  <div className="grid grid-cols-2 gap-px bg-border/20">
                    {/* v0 */}
                    <div className="relative aspect-square bg-[#0a0818]">
                      <Image
                        src={concept.src}
                        alt={`${concept.title} - v0`}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Nano-Banana-Pro */}
                    <div className="relative aspect-square bg-[#0a0818]">
                      {nanoImages[concept.id] ? (
                        <Image
                          src={nanoImages[concept.id]}
                          alt={`${concept.title} - Nano-Banana-Pro`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-3 p-4">
                          {errors[concept.id] ? (
                            <>
                              <p className="text-center text-xs text-destructive">{errors[concept.id]}</p>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => generateNanoLogo(concept)}
                                disabled={generating[concept.id]}
                                className="rounded-full"
                              >
                                Retry
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => generateNanoLogo(concept)}
                              disabled={generating[concept.id]}
                              className="rounded-full"
                            >
                              {generating[concept.id] ? (
                                <>
                                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                  Generating...
                                </>
                              ) : (
                                <>
                                  <Sparkles className="mr-2 h-3 w-3" />
                                  Generate
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Design rationale */}
                  <div className="px-6 py-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Design Rationale
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {concept.rationale}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== REMOTION PROMPTS TAB ===== */}
        {activeTab === 'remotion' && (
          <>
            <div className="mb-8 max-w-3xl">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Remotion Video Prompts
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                15 prompts optimized for Remotion. Each prompt specifies exact composition names, frame counts, animation strategies using useCurrentFrame(), interpolate(), and React Spring -- ready to paste into Remotion's AI workflows or MCP integration.
              </p>
              <div className="mt-4 rounded-xl border border-border/20 bg-card/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  How to use with Remotion MCP
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Install the Remotion MCP server via <code className="rounded bg-secondary/80 px-1.5 py-0.5 font-mono text-xs">npx @remotion/mcp@latest</code> in your editor. Then paste any prompt below into your AI chat. The MCP will help generate the correct Remotion composition code.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {remotionPrompts.map((item, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-border/20 bg-card/20 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/30"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                      {(i + 1).toString().padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                      <div className="mt-3 rounded-xl border border-border/10 bg-[#0a0818] p-4">
                        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted-foreground">
                          {item.prompt}
                        </pre>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="mt-2 rounded-full text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => {
                          navigator.clipboard.writeText(item.prompt)
                        }}
                      >
                        Copy prompt
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Video Gallery Tab */}
        {activeTab === 'videos' && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Video Gallery
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Ethereal Dimension generated videos showcasing holographic cubes, neural networks, and dimensional aesthetics.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { src: '/videos/ethe-6.mp4', title: 'Ethereal Cube 6' },
                { src: '/videos/vid-runpod-ethd.mp4', title: 'RunPod Ethereal' },
                { src: '/videos/runpod-eth-2.mp4', title: 'RunPod Eth 2' },
                { src: '/videos/eth-d-4.mp4', title: 'Ethereal Dimension 4' },
                { src: '/videos/ethd47.mp4', title: 'ETHD 47' },
                { src: '/videos/waoh-ethd.mp4', title: 'Ethereal Vision' },
                { src: '/videos/video-nueral-net.mp4', title: 'Neural Network' },
              ].map((video, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/40"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <video
                      src={video.src}
                      controls
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                      preload="metadata"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground">{video.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Dark teal holographic aesthetic with dimensional depth
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Animations Tab */}
        {activeTab === 'animations' && (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">
                Animation Library
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                50 standalone animations with full theme support. Switch between Cosmic, Matrix, Ember, Ocean, Void, and Arctic color schemes.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-border/30 bg-card/20 p-8 backdrop-blur-sm text-center">
                <Palette className="mx-auto mb-4 h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold text-foreground mb-2">50+ Animations</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  A comprehensive collection of loaders, buttons, cards, backgrounds, and text effects. All animations support real-time theme switching and are optimized for web and mobile.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                  <div className="rounded-lg bg-secondary/20 p-3">
                    <div className="text-sm font-semibold text-primary">Loaders</div>
                    <div className="text-xs text-muted-foreground">10 designs</div>
                  </div>
                  <div className="rounded-lg bg-secondary/20 p-3">
                    <div className="text-sm font-semibold text-accent">Buttons</div>
                    <div className="text-xs text-muted-foreground">10 designs</div>
                  </div>
                  <div className="rounded-lg bg-secondary/20 p-3">
                    <div className="text-sm font-semibold text-primary">Cards</div>
                    <div className="text-xs text-muted-foreground">10 designs</div>
                  </div>
                  <div className="rounded-lg bg-secondary/20 p-3">
                    <div className="text-sm font-semibold text-accent">Backgrounds</div>
                    <div className="text-xs text-muted-foreground">10 designs</div>
                  </div>
                  <div className="rounded-lg bg-secondary/20 p-3">
                    <div className="text-sm font-semibold text-primary">Text Effects</div>
                    <div className="text-xs text-muted-foreground">10 designs</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/animations">
                    <Button size="lg" className="rounded-lg">
                      <Palette className="mr-2 h-4 w-4" />
                      Open Animation Library
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
