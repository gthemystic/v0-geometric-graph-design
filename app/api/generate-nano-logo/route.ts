import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export const maxDuration = 120

export async function POST(request: NextRequest) {
  const { prompt, conceptId } = await request.json()

  if (!process.env.REPLICATE_API_TOKEN) {
    return NextResponse.json(
      { error: 'REPLICATE_API_TOKEN not configured' },
      { status: 500 }
    )
  }

  try {
    // Create prediction using the correct model path
    const response = await fetch('https://api.replicate.com/v1/models/google/nano-banana-pro/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait',
      },
      body: JSON.stringify({
        input: {
          prompt,
          resolution: '2K',
          aspect_ratio: '1:1',
          output_format: 'jpg',
          safety_filter_level: 'block_only_high',
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Replicate API error ${response.status}: ${errorText}`)
    }

    const prediction = await response.json()

    // If Prefer: wait returned a completed prediction
    if (prediction.status === 'succeeded' && prediction.output) {
      const imageUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output
      return NextResponse.json({ success: true, imageUrl })
    }

    // Otherwise poll for completion
    let imageUrl = null
    let attempts = 0
    const maxAttempts = 60

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000))

      const statusResponse = await fetch(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`,
          }
        }
      )

      const statusData = await statusResponse.json()

      if (statusData.status === 'succeeded') {
        imageUrl = Array.isArray(statusData.output) ? statusData.output[0] : statusData.output
        break
      } else if (statusData.status === 'failed') {
        throw new Error(`Prediction failed: ${statusData.error}`)
      }

      attempts++
    }

    if (!imageUrl) {
      throw new Error('Prediction timed out after 2 minutes')
    }

    // Download and save the image locally
    let localPath = imageUrl
    if (conceptId) {
      try {
        const imageResponse = await fetch(imageUrl)
        const arrayBuffer = await imageResponse.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        
        const filename = `concept-${String(conceptId).padStart(2, '0')}-nano.jpg`
        const publicPath = path.join(process.cwd(), 'public', 'logos', filename)
        
        await writeFile(publicPath, buffer)
        localPath = `/logos/${filename}`
        
        console.log(`[v0] Saved nano logo to ${localPath}`)
      } catch (saveError) {
        console.error('[v0] Failed to save image locally:', saveError)
        // Continue with remote URL if save fails
      }
    }

    return NextResponse.json({ success: true, imageUrl: localPath })

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate logo'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
