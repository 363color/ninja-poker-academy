import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from '../access/isAdmin'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'status', 'createdAt'],
    hidden: ({ user }) => user?.role !== 'admin',
  },
  access: {
    read: isAdmin,
    create: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Estado',
      defaultValue: 'active',
      options: [
        { label: 'Activo', value: 'active' },
        { label: 'Inactivo', value: 'inactive' },
        { label: 'Baja', value: 'unsubscribed' },
      ],
    },
    {
      name: 'source',
      type: 'select',
      label: 'Origen',
      options: [
        { label: 'Web', value: 'web' },
        { label: 'YouTube', value: 'youtube' },
        { label: 'Discord', value: 'discord' },
        { label: 'Manual', value: 'manual' },
      ],
    },
  ],
}
