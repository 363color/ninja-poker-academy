/**
 * Payload CMS Draft Creator (Local API)
 * Crea borradores con categorías y tags auto-asignados.
 * Crea categorías/tags que no existan.
 *
 * Ubicación en proyecto: src/lib/pipeline/payload-draft.ts
 */

import { getPayload } from 'payload'
import config from '@payload-config'

type PayloadInstance = Awaited<ReturnType<typeof getPayload>>

interface CreateVideoDraftInput {
  title: string
  slug: string
  youtubeUrl: string
  youtubeId: string
  descripcionCorta: string
  resumen: string
  nivel: 'basico' | 'intermedio' | 'avanzado'
  modalidad: string
  categorySlugs: string[]
  tagSlugs: string[]
  metaTitle: string
  metaDescription: string
  publishedAt: string
}

interface PayloadVideoResponse {
  id: string
  title: string
  slug: string
}

// ── Categorías ──

async function findOrCreateCategory(payload: PayloadInstance, slug: string): Promise<number> {
  const existing = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    return existing.docs[0].id as number
  }

  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  console.log(`[Pipeline A] 📂 Categoría nueva: "${title}" (${slug})`)

  const doc = await payload.create({
    collection: 'categories',
    data: { title, slug, generateSlug: false },
  })

  return doc.id as number
}

async function resolveCategoryIds(payload: PayloadInstance, slugs: string[]): Promise<number[]> {
  const ids: number[] = []
  for (const slug of slugs) {
    try {
      ids.push(await findOrCreateCategory(payload, slug))
    } catch (error) {
      console.error(`[Pipeline A] Error categoría "${slug}":`, error)
    }
  }
  return ids
}

// ── Tags ──

async function findOrCreateTag(payload: PayloadInstance, slug: string): Promise<number> {
  const existing = await payload.find({
    collection: 'tags',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    return existing.docs[0].id as number
  }

  // Tags usan "name" (no "title")
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  console.log(`[Pipeline A] 🏷️ Tag nuevo: "${name}" (${slug})`)

  const doc = await payload.create({
    collection: 'tags',
    data: { name, slug },
  })

  return doc.id as number
}

async function resolveTagIds(payload: PayloadInstance, slugs: string[]): Promise<number[]> {
  const ids: number[] = []
  for (const slug of slugs) {
    try {
      ids.push(await findOrCreateTag(payload, slug))
    } catch (error) {
      console.error(`[Pipeline A] Error tag "${slug}":`, error)
    }
  }
  return ids
}

// ── Draft Creator ──

export async function createVideoDraft(
  input: CreateVideoDraftInput,
): Promise<PayloadVideoResponse> {
  const payload = await getPayload({ config })

  const categoryIds = await resolveCategoryIds(payload, input.categorySlugs)
  const tagIds = await resolveTagIds(payload, input.tagSlugs)

  const doc = await payload.create({
    collection: 'videos',
    draft: true,
    data: {
      title: input.title,
      slug: input.slug,
      youtubeUrl: input.youtubeUrl,
      youtubeId: input.youtubeId,
      descripcionCorta: input.descripcionCorta,
      resumen: input.resumen,
      nivel: input.nivel as 'basico' | 'intermedio' | 'avanzado',
      modalidad: input.modalidad as
        | 'cash'
        | 'torneos'
        | 'mental-game'
        | 'estadisticas'
        | 'analisis-manos',
      categories: categoryIds,
      tags: tagIds,
      publishedAt: input.publishedAt,
      meta: {
        title: input.metaTitle,
        description: input.metaDescription,
      },
      _status: 'draft',
    },
  })

  return {
    id: String(doc.id),
    title: doc.title,
    slug: doc.slug,
  }
}

export async function getExistingVideoIds(): Promise<string[]> {
  const payload = await getPayload({ config })

  const ids: string[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const result = await payload.find({
      collection: 'videos',
      limit: 100,
      page,
      depth: 0,
      select: { youtubeId: true },
    })

    for (const doc of result.docs) {
      if (doc.youtubeId) ids.push(doc.youtubeId)
    }

    hasMore = result.hasNextPage
    page++
  }

  return ids
}
