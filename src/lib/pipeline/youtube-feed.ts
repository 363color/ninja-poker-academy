/**
 * YouTube RSS Feed Parser
 * Detecta videos nuevos del canal @ninjapokeracademy
 *
 * Ubicación en proyecto: src/lib/pipeline/youtube-feed.ts
 */

interface YouTubeVideo {
  videoId: string
  title: string
  published: string
  updated: string
  link: string
  description: string
  thumbnailUrl: string
}

// Canal de YouTube: @ninjapokeracademy
// El RSS feed de YouTube usa el Channel ID, no el handle
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || ''

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

/**
 * Obtiene los últimos 15 videos del canal desde el RSS feed público de YouTube.
 * No requiere API key.
 */
export async function fetchLatestVideos(): Promise<YouTubeVideo[]> {
  if (!CHANNEL_ID) {
    throw new Error(
      'YOUTUBE_CHANNEL_ID no configurado. ' +
        'Para obtenerlo: abre youtube.com/@ninjapokeracademy → ver código fuente → buscar "channelId"',
    )
  }

  const response = await fetch(FEED_URL, {
    next: { revalidate: 0 }, // Sin cache
  })

  if (!response.ok) {
    throw new Error(`Error al obtener el feed RSS de YouTube: ${response.status}`)
  }

  const xml = await response.text()
  return parseAtomFeed(xml)
}

/**
 * Parsea el feed Atom XML de YouTube y extrae los datos de cada video.
 * YouTube devuelve los 15 videos más recientes en su RSS feed.
 */
function parseAtomFeed(xml: string): YouTubeVideo[] {
  const videos: YouTubeVideo[] = []

  // Extraer cada <entry> del feed
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g
  let match

  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1]

    const videoId = extractTag(entry, 'yt:videoId')
    const title = extractTag(entry, 'title')
    const published = extractTag(entry, 'published')
    const updated = extractTag(entry, 'updated')
    const description = extractTag(entry, 'media:description')

    // El link está en un atributo href
    const linkMatch = entry.match(/<link[^>]+href="([^"]+)"/)
    const link = linkMatch ? linkMatch[1] : ''

    // El thumbnail está en media:thumbnail
    const thumbMatch = entry.match(/<media:thumbnail[^>]+url="([^"]+)"/)
    const thumbnailUrl = thumbMatch ? thumbMatch[1] : ''

    if (videoId && title) {
      videos.push({
        videoId,
        title: decodeHtmlEntities(title),
        published,
        updated,
        link,
        description: decodeHtmlEntities(description),
        thumbnailUrl,
      })
    }
  }

  return videos
}

/** Extrae el texto de un tag XML simple */
function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`)
  const match = xml.match(regex)
  return match ? match[1].trim() : ''
}

/** Decodifica entidades HTML básicas */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
}

/**
 * Filtra videos que ya existen en Payload comparando youtubeId.
 * Recibe los IDs que ya están en la base de datos.
 */
export function filterNewVideos(
  feedVideos: YouTubeVideo[],
  existingVideoIds: string[],
): YouTubeVideo[] {
  const existingSet = new Set(existingVideoIds)
  return feedVideos.filter(
    (video) => !existingSet.has(video.videoId) && !video.link.includes('/shorts/'),
  )
}
