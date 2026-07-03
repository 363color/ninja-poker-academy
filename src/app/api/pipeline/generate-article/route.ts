/**
 * Pipeline B: Clase → Artículo /estrategia/
 *
 * Auth:
 * - GET con ?secret= (curl)
 * - POST con cookie de Payload admin (botón en dashboard)
 */

import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { fetchTranscript } from '@/lib/pipeline/youtube-transcript'
import { generateArticle, sectionsToLexical } from '@/lib/pipeline/article-generator'
import { createArticleDraft } from '@/lib/pipeline/payload-draft'
import { notifyNewDraft } from '@/lib/pipeline/telegram-notify'

const PIPELINE_SECRET = process.env.PIPELINE_SECRET || ''

export const maxDuration = 60

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const videoId = searchParams.get('videoId')

  if (secret !== PIPELINE_SECRET) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  if (!videoId) {
    return NextResponse.json({ error: 'Falta videoId' }, { status: 400 })
  }

  return generateArticleFromVideo(Number(videoId))
}

export async function POST(request: Request) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const body = await request.json()
  if (!body.videoId) {
    return NextResponse.json({ error: 'Falta videoId' }, { status: 400 })
  }

  return generateArticleFromVideo(Number(body.videoId))
}

async function generateArticleFromVideo(videoId: number) {
  try {
    const payload = await getPayload({ config })
    const video = await payload.findByID({ collection: 'videos', id: videoId })

    if (!video) {
      return NextResponse.json({ error: `Video ${videoId} no encontrado` }, { status: 404 })
    }

    if (video.articuloRelacionado) {
      const relId = typeof video.articuloRelacionado === 'object'
        ? video.articuloRelacionado.id
        : video.articuloRelacionado
      return NextResponse.json(
        { error: `Este video ya tiene artículo relacionado (ID: ${relId})` },
        { status: 409 },
      )
    }

    console.log(`[Pipeline B] Generando artículo desde: ${video.title}`)

    let transcript = ''
    if (video.youtubeId) {
      try {
        const result = await fetchTranscript(video.youtubeId)
        transcript = result.fullText
      } catch {
        transcript = video.resumen || video.descripcionCorta || ''
      }
    }

    const article = await generateArticle(
      video.title,
      video.nivel || 'intermedio',
      video.modalidad || 'cash',
      video.descripcionCorta || '',
      video.resumen || '',
      transcript,
    )

    const lexicalContent = sectionsToLexical(article.sections)

    const postDoc = await createArticleDraft({
      title: article.title,
      slug: article.slug,
      content: lexicalContent,
      categorySlugs: article.categories,
      metaTitle: article.metaTitle,
      metaDescription: article.metaDescription,
      videoId,
    })

    await notifyNewDraft({
      type: 'articulo',
      title: article.title,
      slug: article.slug,
      nivel: video.nivel || 'intermedio',
      modalidad: video.modalidad || 'cash',
      videoUrl: video.youtubeUrl || '',
    })

    console.log(`[Pipeline B] ✅ Artículo ${postDoc.id}`)

    return NextResponse.json({
      message: 'Artículo generado',
      article: {
        id: postDoc.id,
        title: postDoc.title,
        slug: postDoc.slug,
        categories: article.categories,
      },
      sourceVideo: { id: videoId, title: video.title },
    })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('[Pipeline B] Error:', errorMsg)
    return NextResponse.json({ error: errorMsg }, { status: 500 })
  }
}
