/**
 * Pipeline A: YouTube → /clases/ (borrador con categorías + tags)
 *
 * Ubicación en proyecto: src/app/api/pipeline/youtube-to-clases/route.ts
 */

import { NextResponse } from 'next/server'
import { fetchLatestVideos, filterNewVideos } from '@/lib/pipeline/youtube-feed'
import { fetchTranscript } from '@/lib/pipeline/youtube-transcript'
import { generateClassDraft } from '@/lib/pipeline/claude-generator'
import { createVideoDraft, getExistingVideoIds } from '@/lib/pipeline/payload-draft'
import { notifyNewDraft } from '@/lib/pipeline/telegram-notify'

const PIPELINE_SECRET = process.env.PIPELINE_SECRET || ''

export const maxDuration = 60

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const authHeader = request.headers.get('authorization')

  const isVercelCron = authHeader === `Bearer ${PIPELINE_SECRET}`
  const isManual = secret === PIPELINE_SECRET

  if (!PIPELINE_SECRET || (!isVercelCron && !isManual)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const results: {
    processed: string[]
    skipped: string[]
    errors: string[]
  } = {
    processed: [],
    skipped: [],
    errors: [],
  }

  try {
    const feedVideos = await fetchLatestVideos()
    console.log(`[Pipeline A] Feed RSS: ${feedVideos.length} videos`)

    const existingIds = await getExistingVideoIds()
    console.log(`[Pipeline A] Existentes: ${existingIds.length}`)

    const newVideos = filterNewVideos(feedVideos, existingIds)
    console.log(`[Pipeline A] Nuevos: ${newVideos.length}`)

    if (newVideos.length === 0) {
      return NextResponse.json({
        message: 'No hay videos nuevos',
        feedCount: feedVideos.length,
        existingCount: existingIds.length,
      })
    }

    const toProcess = newVideos.slice(0, 3)

    for (const video of toProcess) {
      try {
        console.log(`[Pipeline A] Procesando: ${video.title}`)

        let transcript: string
        let durationMinutes: number

        try {
          const transcriptResult = await fetchTranscript(video.videoId)
          transcript = transcriptResult.fullText
          durationMinutes = transcriptResult.durationMinutes
        } catch {
          console.warn(`[Pipeline A] Sin transcripción para ${video.videoId}`)
          transcript = `[Sin transcripción]\n\nTítulo: ${video.title}\n\nDescripción: ${video.description}`
          durationMinutes = 0
        }

        const draft = await generateClassDraft(
          video.title,
          video.description,
          transcript,
          durationMinutes,
        )

        const payloadDoc = await createVideoDraft({
          title: video.title,
          slug: draft.suggestedSlug,
          youtubeUrl: video.link,
          youtubeId: video.videoId,
          descripcionCorta: draft.descripcionCorta,
          resumen: draft.resumen,
          nivel: draft.nivel,
          modalidad: draft.modalidad,
          categorySlugs: draft.categories,
          tagSlugs: draft.tags,
          metaTitle: draft.metaTitle,
          metaDescription: draft.metaDescription,
          publishedAt: video.published,
        })

        await notifyNewDraft({
          type: 'clase',
          title: video.title,
          slug: draft.suggestedSlug,
          nivel: draft.nivel,
          modalidad: draft.modalidad,
          videoUrl: video.link,
        })

        results.processed.push(
          `✅ ${video.title} → ID: ${payloadDoc.id} | cats: ${draft.categories.join(', ')} | tags: ${draft.tags.join(', ')}`,
        )
      } catch (videoError) {
        const errorMsg = videoError instanceof Error ? videoError.message : String(videoError)
        results.errors.push(`❌ ${video.title}: ${errorMsg}`)
        console.error(`[Pipeline A] ❌ ${video.videoId}:`, errorMsg)
      }
    }

    if (newVideos.length > 3) {
      results.skipped.push(`⏳ ${newVideos.length - 3} pendientes`)
    }

    return NextResponse.json({ message: 'Pipeline A completado', ...results })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('[Pipeline A] Error fatal:', errorMsg)
    return NextResponse.json({ error: errorMsg }, { status: 500 })
  }
}
