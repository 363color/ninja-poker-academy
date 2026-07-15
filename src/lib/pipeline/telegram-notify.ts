/**
 * Telegram Notification
 * Envía aviso al grupo cuando un borrador está listo para revisar.
 *
 * Ubicación en proyecto: src/lib/pipeline/telegram-notify.ts
 *
 * Usa el bot existente: @npa_formulario_bot
 * Chat ID del grupo: -1004394662515
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-1004394662515'

interface NotifyDraftInput {
  type: 'clase' | 'articulo'
  title: string
  slug: string
  nivel: string
  modalidad: string
  videoUrl: string
}

/**
 * Envía notificación a Telegram cuando un draft está listo.
 */
export async function notifyNewDraft(input: NotifyDraftInput): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN) {
    console.warn('TELEGRAM_BOT_TOKEN no configurado — notificación omitida')
    return false
  }

  const emoji = input.type === 'clase' ? '🎬' : '📝'

  // URL del panel admin de Payload para revisar el draft
  const adminUrl = `https://ninjapokeracademy.com/admin/collections/videos`

  const message = `${emoji} *Nuevo borrador de ${input.type} listo*

📌 *${escapeMarkdown(input.title)}*
🎯 Nivel: ${escapeMarkdown(input.nivel)}
📂 Categoría: ${escapeMarkdown(input.modalidad)}
🎥 Video: ${escapeMarkdown(input.videoUrl)}

👉 [Revisar y aprobar en el panel](${adminUrl})

_Generado automáticamente por el motor de IA\\. Revisar antes de publicar\\._`

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'MarkdownV2',
        disable_web_page_preview: true,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Error enviando notificación Telegram:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error de red en Telegram:', error)
    return false
  }
}

/** Escapa caracteres especiales para MarkdownV2 de Telegram */
function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&')
}
