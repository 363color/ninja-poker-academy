/**
 * YouTube Transcript Fetcher
 * Extrae subtítulos auto-generados de un video de YouTube.
 *
 * Ubicación en proyecto: src/lib/pipeline/youtube-transcript.ts
 *
 * Requiere: npm install youtube-transcript
 */

import { YoutubeTranscript } from 'youtube-transcript'

interface TranscriptSegment {
  text: string
  offset: number
  duration: number
}

interface TranscriptResult {
  videoId: string
  fullText: string
  segments: TranscriptSegment[]
  language: string
  durationMinutes: number
}

/**
 * Obtiene la transcripción completa de un video de YouTube.
 * Intenta primero en español, luego en inglés, luego auto-generado.
 */
export async function fetchTranscript(videoId: string): Promise<TranscriptResult> {
  let segments: TranscriptSegment[] = []
  let language = 'es'

  try {
    // Intentar español primero
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'es' })
    segments = transcript.map((seg) => ({
      text: seg.text,
      offset: seg.offset,
      duration: seg.duration,
    }))
  } catch {
    try {
      // Fallback: cualquier idioma disponible
      const transcript = await YoutubeTranscript.fetchTranscript(videoId)
      segments = transcript.map((seg) => ({
        text: seg.text,
        offset: seg.offset,
        duration: seg.duration,
      }))
      language = 'auto'
    } catch (error) {
      throw new Error(
        `No se pudo obtener transcripción para video ${videoId}. ` +
          `Es posible que no tenga subtítulos habilitados. Error: ${error}`,
      )
    }
  }

  // Unir todo el texto, limpiando saltos innecesarios
  const fullText = segments
    .map((seg) => seg.text)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()

  // Calcular duración aproximada del video
  const lastSegment = segments[segments.length - 1]
  const durationMinutes = lastSegment
    ? Math.ceil((lastSegment.offset + lastSegment.duration) / 60000)
    : 0

  return {
    videoId,
    fullText,
    segments,
    language,
    durationMinutes,
  }
}

/**
 * Trunca la transcripción si excede el límite de tokens para Claude.
 * ~4 caracteres ≈ 1 token. Límite seguro: 30,000 chars (~7,500 tokens).
 */
export function truncateTranscript(text: string, maxChars: number = 30000): string {
  if (text.length <= maxChars) return text
  return text.slice(0, maxChars) + '\n\n[... transcripción truncada por longitud]'
}
