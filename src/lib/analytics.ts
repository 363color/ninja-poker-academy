type GtagEvent = Record<string, string | number | boolean | undefined>

function trackEvent(eventName: string, params?: GtagEvent) {
  if (typeof window === 'undefined') return
  const gtag = (window as any).gtag
  if (typeof gtag !== 'function') return
  gtag('event', eventName, params)
}

export const analytics = {
  videoPlay: (videoTitle: string, videoId?: string) =>
    trackEvent('video_play', { video_title: videoTitle, video_id: videoId }),

  subscribeNewsletter: (location?: string) => trackEvent('subscribe_newsletter', { location }),

  discordClick: (location?: string) => trackEvent('discord_click', { location }),

  telegramClick: (location?: string) => trackEvent('telegram_click', { location }),

  articleRead: (slug: string, title?: string) =>
    trackEvent('article_read', { article_slug: slug, article_title: title }),

  filterUsed: (filterType: string, filterValue: string) =>
    trackEvent('filter_used', { filter_type: filterType, filter_value: filterValue }),
}
