import type { CollectionConfig } from 'payload'

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'nivel', 'modalidad', 'status', 'publishedAt'],
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
      name: 'slug',
      type: 'text',
      label: 'Slug',
      admin: {
        description: 'Se genera automáticamente desde el título. Puedes editarlo manualmente.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'URL de YouTube',
      admin: {
        description: 'Pega la URL completa del video de YouTube',
      },
    },
    {
      name: 'youtubeId',
      type: 'text',
      label: 'YouTube ID',
      admin: {
        description: 'Se extrae automáticamente de la URL. También puedes escribirlo manualmente.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (data?.youtubeUrl) {
              const url = data.youtubeUrl
              const match = url.match(
                /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
              )
              if (match) return match[1]
            }
            return value
          },
        ],
      },
    },
    {
      name: 'descripcionCorta',
      type: 'textarea',
      label: 'Descripción corta',
      admin: {
        description: 'Máximo 160 caracteres. Aparece en listados y cards.',
      },
    },
    {
      name: 'transcripcion',
      type: 'richText',
      label: 'Transcripción',
      admin: {
        description:
          'Transcripción completa del video. Usada por el pipeline de Claude para generar artículos SEO.',
      },
    },
    {
      name: 'nivel',
      type: 'select',
      label: 'Nivel',
      options: [
        { label: 'Básico', value: 'basico' },
        { label: 'Intermedio', value: 'intermedio' },
        { label: 'Avanzado', value: 'avanzado' },
      ],
    },
    {
      name: 'modalidad',
      type: 'select',
      label: 'Modalidad',
      options: [
        { label: 'Cash Game', value: 'cash' },
        { label: 'Torneos', value: 'torneos' },
        { label: 'Mental Game', value: 'mental-game' },
        { label: 'Estadísticas', value: 'estadisticas' },
        { label: 'Análisis de Manos', value: 'analisis-manos' },
      ],
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
      name: 'articuloRelacionado',
      type: 'relationship',
      relationTo: 'posts',
      label: 'Artículo relacionado',
      admin: {
        description: 'Artículo SEO generado a partir de este video',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Thumbnail',
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
  ],
}
