import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const NIVEL_LABELS: Record<string, string> = {
  principiante: 'Principiante — no sabe jugar',
  recreativo: 'Recreativo',
  intermedio: 'Con experiencia, busca mejorar',
  semipro: 'Semi-profesional',
}

async function notifyTelegram(data: {
  nombre: string
  email: string
  nivelLabel: string
  telegram?: string
  instagram?: string
  tiktok?: string
  youtube?: string
  mensaje?: string
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  const redes = [
    data.telegram && `Telegram: ${data.telegram}`,
    data.instagram && `Instagram: ${data.instagram}`,
    data.tiktok && `TikTok: ${data.tiktok}`,
    data.youtube && `YouTube: ${data.youtube}`,
  ]
    .filter(Boolean)
    .join('\n')

  const text = [
    '🥷 *Nueva solicitud — Ninja Poker Academy*',
    '',
    `*Nombre:* ${data.nombre}`,
    `*Email:* ${data.email}`,
    `*Nivel:* ${data.nivelLabel}`,
    '',
    redes,
    data.mensaje ? `\n*Mensaje:*\n${data.mensaje}` : '',
  ]
    .filter(Boolean)
    .join('\n')

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
    })
  } catch (err) {
    console.error('Error sending Telegram notification:', err)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, email, nivel, telegram, instagram, tiktok, youtube, mensaje, rgpd } = body

    if (!nombre || !email || !nivel || !rgpd) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const tieneRedSocial = telegram || instagram || tiktok || youtube
    if (!tieneRedSocial) {
      return NextResponse.json({ error: 'Falta al menos una red social' }, { status: 400 })
    }

    const nivelLabel = NIVEL_LABELS[nivel] || nivel

    const redesRows = [
      telegram &&
        `<tr><td style="padding:4px 0;color:#888;font-size:13px;">Telegram</td><td style="padding:4px 0;font-weight:600;">${telegram}</td></tr>`,
      instagram &&
        `<tr><td style="padding:4px 0;color:#888;font-size:13px;">Instagram</td><td style="padding:4px 0;font-weight:600;">${instagram}</td></tr>`,
      tiktok &&
        `<tr><td style="padding:4px 0;color:#888;font-size:13px;">TikTok</td><td style="padding:4px 0;font-weight:600;">${tiktok}</td></tr>`,
      youtube &&
        `<tr><td style="padding:4px 0;color:#888;font-size:13px;">YouTube</td><td style="padding:4px 0;font-weight:600;">${youtube}</td></tr>`,
    ]
      .filter(Boolean)
      .join('')

    // ── Email al admin ──
    await resend.emails.send({
      from: 'Ninja Poker Academy <contacto@ninjapokeracademy.com>',
      to: ['363color@gmail.com'],
      subject: `Nueva solicitud: ${nombre} (${nivelLabel})`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
          <div style="background:#0D0D0D; padding:24px; border-radius:12px 12px 0 0;">
            <span style="color:#fff; font-weight:700; font-size:14px; text-transform:uppercase; letter-spacing:.08em;">Nueva solicitud — Ninja Poker Academy</span>
          </div>
          <div style="border:1px solid #e7e6e6; border-top:none; padding:24px; border-radius:0 0 12px 12px;">
            <table style="width:100%; border-collapse:collapse;">
              <tr><td style="padding:6px 0;color:#888;font-size:13px;">Nombre</td><td style="padding:6px 0;font-weight:600;">${nombre}</td></tr>
              <tr><td style="padding:6px 0;color:#888;font-size:13px;">Email</td><td style="padding:6px 0;font-weight:600;">${email}</td></tr>
              <tr><td style="padding:6px 0;color:#888;font-size:13px;">Nivel</td><td style="padding:6px 0;font-weight:600;">${nivelLabel}</td></tr>
              ${redesRows}
            </table>
            ${mensaje ? `<div style="margin-top:16px; padding:16px; background:#f4f4f4; border-radius:8px;"><p style="margin:0; color:#888; font-size:12px; text-transform:uppercase; letter-spacing:.06em;">Mensaje</p><p style="margin:6px 0 0; white-space:pre-wrap;">${mensaje}</p></div>` : ''}
          </div>
        </div>
      `,
    })

    // ── Telegram ──
    await notifyTelegram({
      nombre,
      email,
      nivelLabel,
      telegram,
      instagram,
      tiktok,
      youtube,
      mensaje,
    })

    // ── Email al usuario ──
    await resend.emails.send({
      from: 'Ninja Poker Academy <contacto@ninjapokeracademy.com>',
      to: [email],
      subject: 'Hemos recibido tu solicitud — Ninja Poker Academy',
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
          <div style="background:#0D0D0D; padding:40px 32px; text-align:center;">
            <div style="font-size:36px; margin-bottom:12px;">🥷</div>
            <h1 style="color:#fff; font-size:22px; margin:0;">¡Gracias, ${nombre}!</h1>
          </div>
          <div style="padding:32px;">
            <p style="font-size:15px; line-height:1.7; color:#333;">
              Hemos recibido tu solicitud para unirte a Ninja Poker Academy. <strong>No te contactamos por email</strong> — nuestro equipo te escribirá directamente por la red social que nos dejaste, así que mantente atento a tus mensajes en los próximos días.
            </p>

            <div style="background:#f9f9f7; border-radius:10px; padding:20px; margin:24px 0;">
              <p style="margin:0 0 10px; font-weight:700; font-size:13px; text-transform:uppercase; letter-spacing:.06em; color:#CC1A1A;">Cómo prepararte para hablar con nosotros</p>
              <ul style="margin:0; padding-left:18px; font-size:14px; line-height:1.8; color:#333;">
                <li>Piensa en tu nivel actual y a qué límite juegas (o si aún no juegas con dinero real)</li>
                <li>Ten claro cuánto tiempo puedes dedicar a estudiar cada semana</li>
                <li>Si ya tienes experiencia, ten a mano alguna duda concreta sobre tu juego</li>
              </ul>
              <p style="margin:14px 0 0; font-size:13px; color:#666;">
                Valoramos la disciplina y las ganas de mejorar por encima del nivel con el que llegas — formamos jugadores desde cero tanto como ayudamos a semi-profesionales.
              </p>
            </div>

            <p style="font-size:14px; line-height:1.7; color:#333;">
              Mientras esperas, puedes empezar ya mismo con nuestra videoteca gratuita o leer cómo funciona la comunidad por dentro.
            </p>

            <div style="text-align:center; margin:28px 0;">
              <a href="https://ninjapokeracademy.com/clases" style="display:inline-block; background:#CC1A1A; color:#fff; text-decoration:none; padding:14px 28px; border-radius:999px; font-size:13px; font-weight:600; text-transform:uppercase; letter-spacing:.05em;">Ver clases gratis</a>
            </div>

            <p style="font-size:13px; color:#888; text-align:center; margin:0 0 8px;">Síguenos mientras tanto:</p>
            <div style="text-align:center;">
              <a href="https://t.me/ninjapokeracademy" style="color:#CC1A1A; text-decoration:none; font-size:13px; margin:0 8px;">Telegram</a>·
              <a href="https://www.instagram.com/ninjapokeracademy" style="color:#CC1A1A; text-decoration:none; font-size:13px; margin:0 8px;">Instagram</a>·
              <a href="https://www.youtube.com/@ninjapokeracademy" style="color:#CC1A1A; text-decoration:none; font-size:13px; margin:0 8px;">YouTube</a>
            </div>

            <p style="margin-top:32px; color:#aaa; font-size:12px; text-align:center;">Ninja Poker Academy — Escuela de póker online en español</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending contact form:', error)
    return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 })
  }
}
