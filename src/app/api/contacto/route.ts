import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const NIVEL_LABELS: Record<string, string> = {
  principiante: 'Principiante — no sabe jugar',
  recreativo: 'Recreativo',
  intermedio: 'Con experiencia, busca mejorar',
  semipro: 'Semi-profesional',
}

async function getGeoInfo(ip: string) {
  try {
    if (!ip || ip === '::1' || ip.startsWith('127.') || ip.startsWith('192.168.')) {
      return null
    }
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city,timezone,isp,proxy,hosting,query`,
    )
    if (!res.ok) return null
    const data = await res.json()
    if (data.status !== 'success') return null
    return data as {
      country: string
      countryCode: string
      regionName: string
      city: string
      timezone: string
      isp: string
      proxy: boolean
      hosting: boolean
      query: string
    }
  } catch {
    return null
  }
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
  ip?: string
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

  const geo = data.ip ? await getGeoInfo(data.ip) : null

  const fechaUTC = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC'

  const locationLines = geo
    ? [
        '',
        '📍 *Location*',
        `${geo.city ? geo.city + ', ' : ''}${geo.regionName ? geo.regionName + ', ' : ''}${geo.country}`,
        `IP: \`${geo.query}\``,
        `VPN/Proxy: ${geo.proxy || geo.hosting ? '⚠️ Sí' : 'No'}`,
        `Zona horaria: ${geo.timezone}`,
      ]
    : data.ip
      ? ['', `📍 IP: \`${data.ip}\` (geo no disponible)`]
      : []

  const text = [
    '🥷 *Nueva solicitud — Ninja Poker Academy*',
    '',
    `*Nombre:* ${data.nombre}`,
    `*Email:* ${data.email}`,
    `*Nivel:* ${data.nivelLabel}`,
    '',
    redes,
    data.mensaje ? `\n*Mensaje:*\n${data.mensaje}` : '',
    ...locationLines,
    '',
    `🕐 ${fechaUTC}`,
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
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      undefined

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

    // ── Telegram (notificación interna al equipo) ──
    await notifyTelegram({
      nombre,
      email,
      nivelLabel,
      telegram,
      instagram,
      tiktok,
      youtube,
      mensaje,
      ip,
    })

    // ── Email al usuario ──
    await resend.emails.send({
      from: 'Ninja Poker Academy <contacto@ninjapokeracademy.com>',
      to: [email],
      subject: 'Hemos recibido tu solicitud — Ninja Poker Academy',
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Solicitud recibida</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f0; font-family:-apple-system,Helvetica,Arial,sans-serif;">
  <div style="display:none; max-height:0; overflow:hidden;">Hemos recibido tu solicitud — te contactamos pronto por redes sociales.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f0;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#ffffff; border-radius:16px; overflow:hidden;">

          <!-- Logo header -->
          <tr>
            <td align="center" style="background-color:#0D0D0D; padding:28px 24px;">
              <img src="https://media.ninjapokeracademy.com/logo-ninja-poker-academy.png" alt="Logotipo de Ninja Poker Academy" width="56" height="56" style="display:block; margin:0 auto 10px; border-radius:50%;">
              <span style="color:#ffffff; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:.12em;">Ninja Poker Academy</span>
            </td>
          </tr>

          <!-- Hero image -->
          <tr>
            <td>
              <img src="https://media.ninjapokeracademy.com/email-bienvenida-poker-online.jpg" alt="Jugador de póker online con laptop, fichas y katana en escritorio nocturno" width="560" style="display:block; width:100%; height:auto;">
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" style="padding:32px 32px 8px;">
              <h1 style="margin:0; font-size:24px; line-height:1.3; color:#1d1d1d; font-weight:700;">¡Gracias, ${nombre}!</h1>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 32px 24px;">
              <p style="margin:0; font-size:15px; line-height:1.7; color:#575757;">
                Hemos recibido tu solicitud para unirte a Ninja Poker Academy. <strong style="color:#1d1d1d;">No te contactamos por email</strong> — nuestro equipo te escribirá por la red social que nos dejaste, así que mantente atento a tus mensajes en los próximos días.
              </p>
            </td>
          </tr>

          <!-- Prep box -->
          <tr>
            <td style="padding:0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9f9f7; border-radius:12px; border-left:3px solid #CC1A1A;">
                <tr>
                  <td style="padding:20px 22px;">
                    <p style="margin:0 0 10px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.08em; color:#CC1A1A;">Cómo prepararte para hablar con nosotros</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr><td style="padding:4px 0; font-size:14px; line-height:1.6; color:#333;">→ Piensa en tu nivel actual y a qué límite juegas</td></tr>
                      <tr><td style="padding:4px 0; font-size:14px; line-height:1.6; color:#333;">→ Ten claro cuánto tiempo puedes dedicar a estudiar cada semana</td></tr>
                      <tr><td style="padding:4px 0; font-size:14px; line-height:1.6; color:#333;">→ Si ya tienes experiencia, ten a mano alguna duda concreta</td></tr>
                    </table>
                    <p style="margin:14px 0 0; font-size:13px; line-height:1.6; color:#888;">
                      Valoramos la disciplina por encima del nivel con el que llegas — formamos jugadores desde cero tanto como ayudamos a semi-profesionales.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td align="center" style="padding:28px 32px 8px;">
              <p style="margin:0 0 18px; font-size:14px; line-height:1.7; color:#575757;">
                Mientras esperas, ya puedes empezar con nuestra videoteca gratuita.
              </p>
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:999px; background-color:#CC1A1A;">
                    <a href="https://ninjapokeracademy.com/clases" style="display:inline-block; padding:14px 32px; color:#ffffff; text-decoration:none; font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:.05em;">Ver clases gratis</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:32px 32px 0;">
              <div style="border-top:1px solid #eeeeee;"></div>
            </td>
          </tr>

          <!-- Social -->
          <tr>
            <td align="center" style="padding:24px 32px 8px;">
              <p style="margin:0 0 12px; font-size:12px; color:#999; text-transform:uppercase; letter-spacing:.06em;">Síguenos</p>
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:0 10px; font-size:13px;"><a href="https://t.me/ninjapokeracademy" style="color:#CC1A1A; text-decoration:none; font-weight:600;">Telegram</a></td>
                  <td style="padding:0 10px; font-size:13px; color:#ddd;">·</td>
                  <td style="padding:0 10px; font-size:13px;"><a href="https://www.instagram.com/ninjapokeracademy" style="color:#CC1A1A; text-decoration:none; font-weight:600;">Instagram</a></td>
                  <td style="padding:0 10px; font-size:13px; color:#ddd;">·</td>
                  <td style="padding:0 10px; font-size:13px;"><a href="https://www.youtube.com/@ninjapokeracademy" style="color:#CC1A1A; text-decoration:none; font-weight:600;">YouTube</a></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 32px 32px;">
              <p style="margin:0; font-size:11px; color:#bbb; line-height:1.6;">
                Ninja Poker Academy — Escuela de póker online en español<br>
                Recibiste este correo porque solicitaste contacto en ninjapokeracademy.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending contact form:', error)
    return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 })
  }
}
