/**
 * Article Generator — Pipeline B
 * Genera un artículo SEO largo a partir de los datos de una clase/video.
 * Convierte la salida a Lexical JSON para Payload richText.
 *
 * Ubicación: src/lib/pipeline/article-generator.ts
 */

import { truncateTranscript } from './youtube-transcript'

interface ArticleSection {
  type: 'heading' | 'paragraph'
  text: string
}

interface ArticleDraft {
  title: string
  slug: string
  metaTitle: string
  metaDescription: string
  categories: string[]
  sections: ArticleSection[]
}

const SYSTEM_PROMPT = `Eres el redactor editorial de Ninja Poker Academy, una academia de póker online en español especializada exclusivamente en cash game.

Tu tarea: a partir de la transcripción y resumen de una clase en video, generar un ARTÍCULO SEO completo de 800-1500 palabras para publicar en /estrategia/.

REGLAS ESTRICTAS:
- Escribe "póker" con tilde en contenido editorial
- Escribe "poker" sin tilde solo en URLs y slugs
- NUNCA uses "NPA" — siempre "Ninja Poker Academy"
- El tono es profesional, directo y educativo
- La academia solo enseña cash game — nunca menciones torneos, MTTs, Spins ni PLO
- No hagas promesas de resultados económicos
- NO copies el resumen del video textualmente — el artículo debe ser contenido NUEVO y más profundo
- Menciona a "Perep" como instructor cuando sea natural
- Al final del artículo, invita a ver la clase completa en la videoteca de Ninja Poker Academy

ESTRUCTURA DEL ARTÍCULO:
- Usa entre 3 y 5 subtítulos (H2)
- Cada sección debe tener 2-4 párrafos
- Incluye keywords naturales a lo largo del texto
- El primer párrafo debe enganchar y presentar el tema
- El último párrafo debe cerrar con un CTA hacia la videoteca

FORMATO DE RESPUESTA:
Responde SOLO con JSON válido. El campo "sections" es un array de objetos con:
- type: "heading" para subtítulos H2
- type: "paragraph" para párrafos

NO uses backticks, Markdown ni explicaciones fuera del JSON.`

const USER_PROMPT = `Datos de la clase:
Título: "{title}"
Nivel: {nivel}
Modalidad: {modalidad}
Descripción corta: "{descripcionCorta}"
Resumen: "{resumen}"

Transcripción del video:
{transcript}

---

Genera un JSON con estos campos:
{
  "title": "Título editorial del artículo (puede diferir del título del video). Máximo 70 caracteres.",
  "slug": "slug-url-sin-tildes",
  "metaTitle": "Título SEO de máximo 60 caracteres.",
  "metaDescription": "Descripción SEO de máximo 150 caracteres.",
  "categories": ["slug-categoria-1", "slug-categoria-2"],
  "sections": [
    { "type": "paragraph", "text": "Párrafo introductorio..." },
    { "type": "heading", "text": "Subtítulo H2" },
    { "type": "paragraph", "text": "Contenido de la sección..." },
    { "type": "heading", "text": "Otro subtítulo H2" },
    { "type": "paragraph", "text": "Más contenido..." }
  ]
}`

/**
 * Genera un artículo SEO a partir de los datos de una clase.
 */
export async function generateArticle(
  title: string,
  nivel: string,
  modalidad: string,
  descripcionCorta: string,
  resumen: string,
  transcript: string,
): Promise<ArticleDraft> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY no configurado')

  const userPrompt = USER_PROMPT
    .replace('{title}', title)
    .replace('{nivel}', nivel)
    .replace('{modalidad}', modalidad)
    .replace('{descripcionCorta}', descripcionCorta)
    .replace('{resumen}', resumen)
    .replace('{transcript}', truncateTranscript(transcript))

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
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
  if (!textContent?.text) throw new Error('Claude API no devolvió texto')

  const cleanJson = textContent.text.replace(/```json\s?|```/g, '').trim()
  const draft: ArticleDraft = JSON.parse(cleanJson)

  // Forzar regla NPA
  const npaRegex = /\bNPA\b/g
  draft.title = draft.title.replace(npaRegex, 'Ninja Poker Academy')
  draft.metaTitle = draft.metaTitle.replace(npaRegex, 'Ninja Poker Academy')
  draft.metaDescription = draft.metaDescription.replace(npaRegex, 'Ninja Poker Academy')
  draft.sections = draft.sections.map((s) => ({
    ...s,
    text: s.text.replace(npaRegex, 'Ninja Poker Academy'),
  }))

  // Validar longitudes
  if (draft.metaTitle.length > 60) draft.metaTitle = draft.metaTitle.slice(0, 57) + '...'
  if (draft.metaDescription.length > 150) draft.metaDescription = draft.metaDescription.slice(0, 147) + '...'

  return draft
}

/**
 * Convierte sections a Lexical JSON compatible con Payload richText.
 */
export function sectionsToLexical(sections: ArticleSection[]) {
  const children = sections.map((section) => {
    if (section.type === 'heading') {
      return {
        type: 'heading',
        tag: 'h2',
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            text: section.text,
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            version: 1,
          },
        ],
      }
    }

    return {
      type: 'paragraph',
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      textFormat: 0,
      textStyle: '',
      children: [
        {
          type: 'text',
          text: section.text,
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          version: 1,
        },
      ],
    }
  })

  return {
    root: {
      type: 'root',
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      children,
    },
  }
}
