/**
 * Claude Article Generator
 * Genera resumen, nivel, categorías y metadatos para una clase.
 *
 * Ubicación en proyecto: src/lib/pipeline/claude-generator.ts
 */

import { truncateTranscript } from './youtube-transcript'

interface ClassDraft {
  descripcionCorta: string
  resumen: string
  nivel: 'basico' | 'intermedio' | 'avanzado'
  modalidad: string
  categories: string[]
  metaTitle: string
  metaDescription: string
  suggestedSlug: string
  tags: string[]
}

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

Nota: NUNCA uses "torneos" — la academia solo enseña cash game.

CATEGORÍAS (elige entre 1 y 3 — todos los temas que toca el video):
Categorías existentes: preflop, postflop, analisis-manos, mental-game, estadisticas, bankroll, fundamentos
Si el video cubre un tema que NO encaja en ninguna de estas, puedes sugerir una categoría nueva con slug en minúsculas y sin tildes (ej: "rangos", "3bet", "bluffing").

NIVELES VÁLIDOS:
- basico (conceptos fundamentales, jugadores que empiezan)
- intermedio (jugadores NL2-NL25 que ya conocen lo básico)
- avanzado (NL50+, conceptos de GTO, exploits, análisis profundo)

INSTRUCCIONES PARA EL RESUMEN:
- Escribe entre 300 y 500 palabras
- Estructura: párrafo introductorio → puntos clave cubiertos → conclusión con aprendizaje principal
- Incluye keywords naturales relacionadas con el tema (cash game, póker, el tema específico)
- NO uses formato Markdown (ni ##, ni **, ni bullets) — solo texto plano con párrafos separados por doble salto de línea
- Escribe como si fuera el texto de una página web que describe esta clase
- Menciona a "Perep" como instructor cuando sea natural
- Cierra con una frase que invite a ver el video completo

Responde SOLO con JSON válido, sin backticks ni explicaciones.`

const USER_PROMPT_TEMPLATE = `Título del video: "{title}"
Descripción original de YouTube: "{description}"
Duración: {duration} minutos

Transcripción:
{transcript}

---

Genera un JSON con estos campos exactos:
{
  "descripcionCorta": "2-3 oraciones que resuman el contenido. Máximo 300 caracteres.",
  "resumen": "Texto editorial SEO de 300-500 palabras. Solo texto plano con párrafos separados por doble salto de línea. Sin Markdown.",
  "nivel": "basico | intermedio | avanzado",
  "modalidad": "cash | analisis-manos | mental-game | estadisticas",
  "categories": ["slug-categoria-1", "slug-categoria-2"],
  "metaTitle": "Título SEO de máximo 60 caracteres. Incluir keyword principal.",
  "metaDescription": "Descripción SEO de máximo 150 caracteres. Incluir keyword y call-to-action.",
  "suggestedSlug": "slug-url-sin-tildes-ni-caracteres-especiales",
  "tags": ["tag1", "tag2", "tag3"]
}`

/**
 * Genera los metadatos de una clase usando Claude API.
 */
export async function generateClassDraft(
  title: string,
  description: string,
  transcript: string,
  durationMinutes: number,
): Promise<ClassDraft> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY no configurado en .env')
  }

  const truncatedTranscript = truncateTranscript(transcript)

  const userPrompt = USER_PROMPT_TEMPLATE.replace('{title}', title)
    .replace('{description}', description)
    .replace('{duration}', String(durationMinutes))
    .replace('{transcript}', truncatedTranscript)

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
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
    throw new Error(`Error de Claude API: ${response.status} — ${errorText}`)
  }

  const data = await response.json()
  const textContent = data.content?.find((block: { type: string }) => block.type === 'text')

  if (!textContent?.text) {
    throw new Error('Claude API no devolvió texto')
  }

  const cleanJson = textContent.text.replace(/```json\s?|```/g, '').trim()

  try {
    const draft: ClassDraft = JSON.parse(cleanJson)

    // Forzar regla: NUNCA "NPA" en contenido público
    const npaRegex = /\bNPA\b/g
    draft.descripcionCorta = draft.descripcionCorta.replace(npaRegex, 'Ninja Poker Academy')
    draft.resumen = draft.resumen.replace(npaRegex, 'Ninja Poker Academy')
    draft.metaTitle = draft.metaTitle.replace(npaRegex, 'Ninja Poker Academy')
    draft.metaDescription = draft.metaDescription.replace(npaRegex, 'Ninja Poker Academy')

    // Validar nivel
    if (!['basico', 'intermedio', 'avanzado'].includes(draft.nivel)) {
      draft.nivel = 'intermedio'
    }

    // Validar modalidad
    const validModalidades = ['cash', 'analisis-manos', 'mental-game', 'estadisticas']
    if (!validModalidades.includes(draft.modalidad)) {
      draft.modalidad = 'cash'
    }

    // Asegurar categories es array
    if (!Array.isArray(draft.categories) || draft.categories.length === 0) {
      draft.categories = [draft.modalidad === 'cash' ? 'postflop' : draft.modalidad]
    }

    // Validar longitudes
    if (draft.metaTitle.length > 60) {
      draft.metaTitle = draft.metaTitle.slice(0, 57) + '...'
    }
    if (draft.metaDescription.length > 150) {
      draft.metaDescription = draft.metaDescription.slice(0, 147) + '...'
    }

    // Asegurar resumen
    if (!draft.resumen || draft.resumen.length < 100) {
      draft.resumen = draft.descripcionCorta
    }

    // Asegurar tags es array
    if (!Array.isArray(draft.tags)) {
      draft.tags = []
    }

    return draft
  } catch (error) {
    throw new Error(`Error parseando JSON de Claude: ${cleanJson}. Error: ${error}`)
  }
}
