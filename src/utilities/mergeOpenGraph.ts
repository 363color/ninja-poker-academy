import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Ninja Poker Academy: academia de póker online en español. Clases diarias, revisión de manos y comunidad activa para jugadores de todos los niveles.',
  images: [
    {
      url: `${getServerSideURL()}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'Ninja Poker Academy',
    },
  ],
  siteName: 'Ninja Poker Academy',
  title: 'Academia de Poker Online en Español | Ninja Poker Academy',
  locale: 'es_ES',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
