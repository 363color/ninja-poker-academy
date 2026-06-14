import type { AccessArgs } from 'payload'

export const isAdmin = ({ req: { user } }: AccessArgs): boolean => {
  return user?.role === 'admin'
}

export const isAdminOrEditor = ({ req: { user } }: AccessArgs): boolean => {
  return user?.role === 'admin' || user?.role === 'editor'
}
