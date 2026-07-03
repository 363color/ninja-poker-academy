/**
 * Pipeline C: Keyword + tema → Artículo /estrategia/
 *
 * POST desde admin UI o GET con secret (curl)
 */

import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sectionsToLexical } from '@/lib/pipeline/article-generator'
import { createArticleDraft } from '@/lib/pipeline/payload-draft'
import { notifyNewDraft } from '@/lib/pipeline/telegram-notify'
import { truncateTranscript } from '@/lib/pipeline/youtube-transcript'

const PIPELINE_SECRET = process.env.PIPELINE_SECRET || ''
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || ''

export const maxDuration = 60

// GET: curl
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  if (searchParams.get('secret') !== PIPELINE_SECRET) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const keyword = searchParams.get('keyword')
  const topic = searchParams.get('topic') || ''
  const category = searchParams.get('category') || 'fundamentos'

  if (!keyword) {
    return NextResponse.json({ error: 'Falta keyword' }, { status: 400 })
  }

  return generateFromKeyword(keyword, topic, category)
}

// POST: admin UI
export async function POST(request: Request) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
  }

  const body = await request.json()
  if (!body.keyword) {
    return NextResponse.json({ error: 'Falta keyword' }, { status: 400 })
  }

  return generateFromKeyword(body.keyword, body.topic || '', body.category || 'fundamentos')
}

async function generateFromKeyword(keyword: string, topic: string, category: string) {
  try {
    console.log(`[Pipeline C] Keyword: "${keyword}" | Tema: "${topic}" | Cat: ${category}`)

    const SYSTEM_PROMPT = `Eres el redactor editorial de Ninja Poker Academy, una academia de póker online en español especializada exclusivamente en cash game.

Tu tarea: generar un ARTÍCULO SEO completo de 1000-1500 palabras optimizado para la keyword proporcionada.

REGLAS ESTRICTAS:
- Escribe "póker" con tilde en contenido editorial
- Escribe "poker" sin tilde solo en URLs y slugs
- NUNCA uses "NPA" — siempre "Ninja Poker Academy"
- El tono es profesional, directo y educativo
- La academia solo enseña cash game — nunca menciones torneos, MTTs, Spins ni PLO
- No hagas promesas de resultados económicos
- Incluye la keyword principal de forma natural en el primer párrafo, en al menos un subtítulo y en la conclusión
- Menciona a Ninja Poker Academy como recurso educativo de forma natural (no forzada) al menos una vez
- Al final, invita al lector a explorar las clases gratuitas en la videoteca de Ninja Poker Academy

ESTRUCTURA:
- Título H1 optimizado para la keyword (máximo 70 chars)
- 4-6 subtítulos H2
- Cada sección: 2-4 párrafos
- Primer párrafo: gancho + keyword
- Último párrafo: CTA a la videoteca

FORMATO: Responde SOLO con JSON válido, sin backticks.`

    const userPrompt = `Keyword principal: "${keyword}"
${topic ? `Tema / contexto adicional: "${topic}"` : ''}
Categoría: ${category}

Genera un JSON con estos campos:
{
  "title": "Título H1 optimizado. Máximo 70 caracteres.",
  "slug": "slug-url-sin-tildes",
  "metaTitle": "Máximo 60 caracteres.",
  "metaDescription": "Máximo 150 caracteres.",
  "categories": ["${category}"],
  "sections": [
    { "type": "paragraph", "text": "Párrafo introductorio con keyword..." },
    { "type": "heading", "text": "Subtítulo H2" },
    { "type": "paragraph", "text": "Contenido..." },
    ...más secciones...
  ]
}`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4000,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Claude API ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    const textContent = data.content?.find((b: { type: string }) => b.type === 'text')
    if (!textContent?.text) throw new Error('Claude no devolvió texto')

    const cleanJson = textContent.text.replace(/```json\s?|```/g, '').trim()
    const article = JSON.parse(cleanJson)

    // Forzar regla NPA
    const npaRegex = /\bNPA\b/g
    article.title = article.title.replace(npaRegex, 'Ninja Poker Academy')
    article.metaTitle = article.metaTitle.replace(npaRegex, 'Ninja Poker Academy')
    article.metaDescription = article.metaDescription.replace(npaRegex, 'Ninja Poker Academy')
    article.sections = article.sections.map((s: { type: string; text: string }) => ({
      ...s,
      text: s.text.replace(npaRegex, 'Ninja Poker Academy'),
    }))

    if (article.metaTitle.length > 60) article.metaTitle = article.metaTitle.slice(0, 57) + '...'
    if (article.metaDescription.length > 150) article.metaDescription = article.metaDescription.slice(0, 147) + '...'

    // Crear en Payload
    const lexicalContent = sectionsToLexical(article.sections)
    const postDoc = await createArticleDraft({
      title: article.title,
      slug: article.slug,
      content: lexicalContent,
      categorySlugs: article.categories || [category],
      metaTitle: article.metaTitle,
      metaDescription: article.metaDescription,
    })

    // Notificar
    await notifyNewDraft({
      type: 'articulo',
      title: article.title,
      slug: article.slug,
      nivel: 'todos',
      modalidad: category,
      videoUrl: '',
    })

    console.log(`[Pipeline C] ✅ Artículo ${postDoc.id}: "${postDoc.title}"`)

    return NextResponse.json({
      message: 'Artículo generado',
      article: {
        id: postDoc.id,
        title: postDoc.title,
        slug: postDoc.slug,
        keyword,
        categories: article.categories,
      },
    })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    console.error('[Pipeline C] Error:', errorMsg)
    return NextResponse.json({ error: errorMsg }, { status: 500 })
  }
}
