import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'

const isAdmin = ({ req: { user } }: any) => {
  return user?.role === 'admin'
}

const isAdminOrSelf = ({ req: { user }, id }: any) => {
  if (user?.role === 'admin') return true
  return user?.id === id
}

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuario', plural: 'Usuarios' },
  access: {
    admin: authenticated,
    create: isAdmin,
    delete: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
    hidden: ({ user }) => user?.role !== 'admin',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nombre',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        update: isAdmin,
      },
    },
  ],
  timestamps: true,
}
