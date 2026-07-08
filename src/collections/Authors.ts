import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: { singular: 'Autor', plural: 'Autores' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nombre',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Biografía',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Avatar',
    },
    {
      name: 'socialYoutube',
      type: 'text',
      label: 'YouTube',
    },
    {
      name: 'socialTwitter',
      type: 'text',
      label: 'Twitter/X',
    },
    {
      name: 'socialInstagram',
      type: 'text',
      label: 'Instagram',
    },
  ],
}
