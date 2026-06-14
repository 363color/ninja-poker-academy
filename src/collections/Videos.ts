import type { CollectionConfig } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'youtubeId', 'status', 'publishedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'youtubeId',
      type: 'text',
      label: 'YouTube ID',
      admin: {
        description: 'El ID del video de YouTube (ej: dQw4w9WgXcQ)',
      },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube URL',
      admin: {
        description: 'URL completa del video (se extrae el ID automáticamente)',
      },
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Archivo de video (subida directa)',
      admin: {
        description: 'Solo si el video no está en YouTube',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descripción',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Miniatura',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Categorías',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Tags',
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Duración (segundos)',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado',
      defaultValue: 'draft',
      options: [
        { label: 'Borrador', value: 'draft' },
        { label: 'Publicado', value: 'published' },
        { label: 'Archivado', value: 'archived' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Fecha de publicación',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'relatedArticle',
      type: 'relationship',
      relationTo: 'posts',
      label: 'Artículo relacionado',
      admin: {
        description: 'Artículo de estrategia generado a partir de este video',
      },
    },
  ],
}
