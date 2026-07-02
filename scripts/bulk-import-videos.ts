/**
 * Bulk Import — Procesa 90 videos del CSV de YouTube Studio
 *
 * Ubicación en proyecto: scripts/bulk-import-videos.ts
 *
 * Ejecutar: npx tsx scripts/bulk-import-videos.ts
 *
 * - Filtra shorts automáticamente
 * - Obtiene transcripción de cada video
 * - Claude genera resumen + categorías + tags + metadatos
 * - Crea draft publicado en Payload
 * - Pausa entre videos para no saturar Claude API
 * - Guarda progreso en archivo JSON para poder retomar si se interrumpe
 */

import fs from 'fs'
import path from 'path'

// ── Configurar env ──
import dotenv from 'dotenv'
dotenv.config()

// ── Imports del pipeline ──
import { fetchTranscript, truncateTranscript } from '../src/lib/pipeline/youtube-transcript'

// ── Config ──
const SCRIPTS_DIR = path.dirname(new URL(import.meta.url).pathname)
const CSV_PATH = path.join(SCRIPTS_DIR, 'youtube-videos.csv')
const PROGRESS_PATH = path.join(SCRIPTS_DIR, 'bulk-import-progress.json')
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || ''
const DELAY_BETWEEN_VIDEOS_MS = 3000 // 3 segundos entre videos

// ── Types ──
interface CsvVideo {
  videoId: string
  title: string
  publishedAt: string
  durationSeconds: number
  views: number
  type: string
}

interface Progress {
  processed: string[]
  errors: Array<{ videoId: string; title: string; error: string }>
  lastRun: string
}

// ── CSV Parser ──
function parseCsv(): CsvVideo[] {
  const raw = fs.readFileSync(CSV_PATH, 'utf-8')
  const lines = raw.split('\n').filter((l) => l.trim())

  // Skip header
  const videos: CsvVideo[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].replace(/\r/g, '')

    // Handle quoted fields (dates have commas)
    const parts: string[] = []
    let current = ''
    let inQuotes = false

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        parts.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    parts.push(current.trim())

    if (parts.length >= 6) {
      videos.push({
        videoId: parts[0],
        title: parts[1],
        publishedAt: parts[2],
        durationSeconds: parseInt(parts[3], 10) || 0,
        views: parseInt(parts[4], 10) || 0,
        type: parts[5].toLowerCase(),
      })
    }
  }

  return videos
}

// ── Parse date from YouTube Studio format ──
function parsePublishDate(dateStr: string): string {
  // "Jun 22, 2026" → ISO date
  try {
    const date = new Date(dateStr)
    if (!isNaN(date.getTime())) {
      return date.toISOString()
    }
  } catch {
    // fallback
  }
  return new Date().toISOString()
}

// ── Claude API call (standalone, no import needed) ──
async function generateClassDraft(
  title: string,
  description: string,
  transcript: string,
  durationMinutes: number,
) {
  const SYSTEM_PROMPT = `Eres el asistente editorial de Ninja Poker Academy, una academia de póker online en español especializada exclusivamente en cash game.

Tu tarea: a partir de la transcripción de un video de clase, generar los metadatos, categorías Y un resumen editorial SEO para publicar la clase en la web.

REGLAS ESTRICTAS:
- Escribe "póker" con tilde en contenido editorial
- Escribe "poker" sin tilde solo en URLs y slugs
- NUNCA uses "NPA" — siempre "Ninja Poker Academy"
- El tono es profesional, directo y motivador — sin ser cursi
- La academia solo enseña cash game — nunca menciones torneos, MTTs, Spins ni PLO
- Las clases son en grupo, no coaching 1 a 1 — no prometas "personalizado" en sentido individual
- No hagas promesas de resultados económicos

MODALIDAD (elige exactamente una — el tema PRINCIPAL del video):
- cash (estrategia general de cash game: preflop, postflop, sizings, rangos, bankroll)
- analisis-manos (revisión de manos jugadas, análisis de spots específicos)
- mental-game (tilt, disciplina, hábitos, mentalidad ganadora)
- estadisticas (HUD, stats, bases de datos, tracking)

CATEGORÍAS (elige entre 1 y 3 — todos los temas que toca el video):
Categorías existentes: preflop, postflop, analisis-manos, mental-game, estadisticas, bankroll, fundamentos
Si el video cubre un tema que NO encaja en ninguna, puedes sugerir una categoría nueva con slug en minúsculas y sin tildes.

NIVELES VÁLIDOS:
- basico (conceptos fundamentales, jugadores que empiezan)
- intermedio (jugadores NL2-NL25 que ya conocen lo básico)
- avanzado (NL50+, conceptos de GTO, exploits, análisis profundo)

INSTRUCCIONES PARA EL RESUMEN:
- Escribe entre 300 y 500 palabras
- Estructura: párrafo introductorio → puntos clave cubiertos → conclusión
- Incluye keywords naturales relacionadas con el tema
- NO uses formato Markdown — solo texto plano con párrafos separados por doble salto de línea
- Menciona a "Perep" como instructor cuando sea natural
- Cierra con una frase que invite a ver el video completo

Responde SOLO con JSON válido, sin backticks ni explicaciones.`

  const userPrompt = `Título del video: "${title}"
Descripción original de YouTube: "${description}"
Duración: ${durationMinutes} minutos

Transcripción:
${truncateTranscript(transcript)}

---

Genera un JSON con estos campos exactos:
{
  "descripcionCorta": "2-3 oraciones. Máximo 300 caracteres.",
  "resumen": "Texto editorial SEO de 300-500 palabras. Solo texto plano.",
  "nivel": "basico | intermedio | avanzado",
  "modalidad": "cash | analisis-manos | mental-game | estadisticas",
  "categories": ["slug-1", "slug-2"],
  "metaTitle": "Máximo 60 caracteres.",
  "metaDescription": "Máximo 150 caracteres.",
  "suggestedSlug": "slug-url-sin-tildes",
  "tags": ["tag1", "tag2", "tag3"]
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
      max_tokens: 2000,
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
  if (!textContent?.text) throw new Error('Claude API no devolvió texto')

  const cleanJson = textContent.text.replace(/```json\s?|```/g, '').trim()
  const draft = JSON.parse(cleanJson)

  // Forzar regla: NUNCA "NPA" en contenido público
  const npaRegex = /\bNPA\b/g
  draft.descripcionCorta = draft.descripcionCorta.replace(npaRegex, 'Ninja Poker Academy')
  draft.resumen = draft.resumen.replace(npaRegex, 'Ninja Poker Academy')
  draft.metaTitle = draft.metaTitle.replace(npaRegex, 'Ninja Poker Academy')
  draft.metaDescription = draft.metaDescription.replace(npaRegex, 'Ninja Poker Academy')

  // Validaciones
  if (!['basico', 'intermedio', 'avanzado'].includes(draft.nivel)) draft.nivel = 'intermedio'
  if (!['cash', 'analisis-manos', 'mental-game', 'estadisticas'].includes(draft.modalidad))
    draft.modalidad = 'cash'
  if (!Array.isArray(draft.categories) || draft.categories.length === 0)
    draft.categories = [draft.modalidad === 'cash' ? 'postflop' : draft.modalidad]
  if (!Array.isArray(draft.tags)) draft.tags = []
  if (!draft.resumen || draft.resumen.length < 100) draft.resumen = draft.descripcionCorta
  if (draft.metaTitle?.length > 60) draft.metaTitle = draft.metaTitle.slice(0, 57) + '...'
  if (draft.metaDescription?.length > 150)
    draft.metaDescription = draft.metaDescription.slice(0, 147) + '...'

  return draft
}

// ── Payload Local API ──
async function createVideoInPayload(videoData: {
  title: string
  slug: string
  youtubeUrl: string
  youtubeId: string
  descripcionCorta: string
  resumen: string
  nivel: string
  modalidad: string
  categorySlugs: string[]
  tagSlugs: string[]
  metaTitle: string
  metaDescription: string
  publishedAt: string
}) {
  // Dynamic import to avoid loading Payload config at module level
  const { getPayload } = await import('payload')
  const config = (await import('../src/payload.config')).default

  const payload = await getPayload({ config })

  // Resolver categorías
  const categoryIds: number[] = []
  for (const slug of videoData.categorySlugs) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      categoryIds.push(existing.docs[0].id as number)
    } else {
      const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      const doc = await payload.create({
        collection: 'categories',
        data: { title, slug, generateSlug: false },
      })
      categoryIds.push(doc.id as number)
      console.log(`  📂 Categoría nueva: ${title}`)
    }
  }

  // Resolver tags
  const tagIds: number[] = []
  for (const slug of videoData.tagSlugs) {
    const tagSlug = slug.replace(/\s+/g, '-').toLowerCase()
    const existing = await payload.find({
      collection: 'tags',
      where: { slug: { equals: tagSlug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      tagIds.push(existing.docs[0].id as number)
    } else {
      const name = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      const doc = await payload.create({
        collection: 'tags',
        data: { name, slug: tagSlug },
      })
      tagIds.push(doc.id as number)
    }
  }

  // Crear video publicado directamente
  const doc = await payload.create({
    collection: 'videos',
    data: {
      title: videoData.title,
      slug: videoData.slug,
      youtubeUrl: videoData.youtubeUrl,
      youtubeId: videoData.youtubeId,
      descripcionCorta: videoData.descripcionCorta,
      resumen: videoData.resumen,
      nivel: videoData.nivel as 'basico' | 'intermedio' | 'avanzado',
      modalidad: videoData.modalidad as 'cash' | 'analisis-manos' | 'mental-game' | 'estadisticas',
      categories: categoryIds,
      tags: tagIds,
      publishedAt: videoData.publishedAt,
      status: 'published',
      meta: {
        title: videoData.metaTitle,
        description: videoData.metaDescription,
      },
    },
  })

  return doc.id
}

// ── Progress tracker ──
function loadProgress(): Progress {
  if (fs.existsSync(PROGRESS_PATH)) {
    return JSON.parse(fs.readFileSync(PROGRESS_PATH, 'utf-8'))
  }
  return { processed: [], errors: [], lastRun: '' }
}

function saveProgress(progress: Progress) {
  progress.lastRun = new Date().toISOString()
  fs.writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2))
}

// ── Delay ──
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ── Main ──
async function main() {
  console.log('🚀 Bulk Import — Ninja Poker Academy')
  console.log('=====================================\n')

  if (!ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY no configurado en .env')
    process.exit(1)
  }

  if (!fs.existsSync(CSV_PATH)) {
    console.error(`❌ CSV no encontrado: ${CSV_PATH}`)
    console.error('   Copia el CSV exportado de Google Sheets a: scripts/youtube-videos.csv')
    process.exit(1)
  }

  // Parsear CSV
  const allVideos = parseCsv()
  const videos = allVideos.filter((v) => v.type === 'video')

  console.log(`📊 Total en CSV: ${allVideos.length}`)
  console.log(`🎬 Videos (no shorts): ${videos.length}`)
  console.log(`⏭️  Shorts filtrados: ${allVideos.length - videos.length}\n`)

  // Cargar progreso
  const progress = loadProgress()
  const pending = videos.filter((v) => !progress.processed.includes(v.videoId))

  console.log(`✅ Ya procesados: ${progress.processed.length}`)
  console.log(`⏳ Pendientes: ${pending.length}\n`)

  if (pending.length === 0) {
    console.log('🎉 ¡Todos los videos ya están procesados!')
    return
  }

  // Procesar
  for (let i = 0; i < pending.length; i++) {
    const video = pending[i]
    const count = `[${i + 1}/${pending.length}]`

    console.log(`${count} 🎬 ${video.title}`)
    console.log(
      `     ID: ${video.videoId} | ${Math.round(video.durationSeconds / 60)}min | ${video.views} vistas`,
    )

    try {
      // 1. Transcripción
      let transcript: string
      let durationMinutes: number

      try {
        const result = await fetchTranscript(video.videoId)
        transcript = result.fullText
        durationMinutes = result.durationMinutes
        console.log(`     📝 Transcripción: ${transcript.length} chars`)
      } catch {
        console.log(`     ⚠️  Sin transcripción, usando solo título`)
        transcript = `[Sin transcripción]\n\nTítulo: ${video.title}`
        durationMinutes = Math.round(video.durationSeconds / 60)
      }

      // 2. Claude genera metadatos
      const draft = await generateClassDraft(video.title, '', transcript, durationMinutes)
      console.log(
        `     🤖 Claude: ${draft.nivel} | ${draft.modalidad} | cats: ${draft.categories.join(', ')}`,
      )

      // 3. Crear en Payload (publicado)
      const docId = await createVideoInPayload({
        title: video.title,
        slug: draft.suggestedSlug,
        youtubeUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
        youtubeId: video.videoId,
        descripcionCorta: draft.descripcionCorta,
        resumen: draft.resumen,
        nivel: draft.nivel,
        modalidad: draft.modalidad,
        categorySlugs: draft.categories,
        tagSlugs: draft.tags,
        metaTitle: draft.metaTitle,
        metaDescription: draft.metaDescription,
        publishedAt: parsePublishDate(video.publishedAt),
      })

      console.log(`     ✅ Publicado → ID: ${docId}`)

      // Guardar progreso
      progress.processed.push(video.videoId)
      saveProgress(progress)

      // Pausa entre videos
      if (i < pending.length - 1) {
        console.log(`     ⏳ Esperando ${DELAY_BETWEEN_VIDEOS_MS / 1000}s...\n`)
        await delay(DELAY_BETWEEN_VIDEOS_MS)
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error)
      console.error(`     ❌ Error: ${errorMsg}`)
      progress.errors.push({ videoId: video.videoId, title: video.title, error: errorMsg })
      saveProgress(progress)

      // Continuar con el siguiente
      await delay(1000)
    }
  }

  // Resumen final
  console.log('\n=====================================')
  console.log('📊 RESUMEN FINAL')
  console.log(`✅ Procesados: ${progress.processed.length}`)
  console.log(`❌ Errores: ${progress.errors.length}`)
  if (progress.errors.length > 0) {
    console.log('\nErrores:')
    for (const err of progress.errors) {
      console.log(`  - ${err.title}: ${err.error}`)
    }
  }
  console.log('\n🎉 Bulk import completado')
}

main().catch(console.error)
