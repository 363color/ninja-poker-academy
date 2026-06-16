import { useCallback } from 'react'
import { analytics } from '@/lib/analytics'

export const useAnalytics = () => {
  return {
    trackVideoPlay: useCallback((title: string, videoId?: string) => {
      analytics.videoPlay(title, videoId)
    }, []),

    trackNewsletter: useCallback((location?: string) => {
      analytics.subscribeNewsletter(location)
    }, []),

    trackDiscordClick: useCallback((location?: string) => {
      analytics.discordClick(location)
    }, []),

    trackTelegramClick: useCallback((location?: string) => {
      analytics.telegramClick(location)
    }, []),

    trackArticleRead: useCallback((slug: string, title?: string) => {
      analytics.articleRead(slug, title)
    }, []),

    trackFilterUsed: useCallback((filterType: string, filterValue: string) => {
      analytics.filterUsed(filterType, filterValue)
    }, []),
  }
}
