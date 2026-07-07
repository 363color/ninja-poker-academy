import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Verificar si ya existe
    const existing = await payload.find({
      collection: 'subscribers',
      where: { email: { equals: email.toLowerCase() } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const sub = existing.docs[0]
      // Si estaba dado de baja, reactivar
      if (sub.status === 'unsubscribed' || sub.status === 'inactive') {
        await payload.update({
          collection: 'subscribers',
          id: sub.id,
          data: { status: 'active' },
        })
        return NextResponse.json({ message: 'Suscripción reactivada', reactivated: true })
      }
      return NextResponse.json({ message: 'Ya estás suscrito', existing: true })
    }

    // Crear nuevo suscriptor
    await payload.create({
      collection: 'subscribers',
      data: {
        email: email.toLowerCase(),
        status: 'active',
        source: 'web',
      },
    })

    return NextResponse.json({ message: 'Suscrito correctamente' })
  } catch (error) {
    console.error('[Newsletter] Error:', error)
    return NextResponse.json({ error: 'Error al suscribir' }, { status: 500 })
  }
}
