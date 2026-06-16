## Google Analytics 4 Integration

### Setup Instructions

1. **Add your Google Analytics 4 Measurement ID to `.env`:**
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID from Google Analytics.

2. **Configuration**
   - ✅ Consent Mode v2 implemented (default: analytics_storage denied)
   - ✅ IP anonymization enabled (RGPD compliant)
   - ✅ Integrated with Klaro cookie consent banner
   - ✅ Cookie expiration: 365 days

### Custom Events Tracking

#### Using the `useAnalytics` Hook (Recommended for Components)

```typescript
'use client'

import { useAnalytics } from '@/hooks/useAnalytics'

export function VideoPlayer() {
  const { trackVideoPlay } = useAnalytics()

  const handlePlay = (title: string) => {
    trackVideoPlay(title, 'video_123')
  }

  return <button onClick={() => handlePlay('My Video')}>Play</button>
}
```

#### Using the `analytics` Utility Directly

```typescript
import { analytics } from '@/lib/analytics'

// Video play event
analytics.videoPlay('Video Title', 'video_123')

// Newsletter subscription
analytics.subscribeNewsletter('homepage')

// Social links
analytics.discordClick('header')
analytics.telegramClick('footer')

// Article engagement
analytics.articleRead('article-slug', 'Article Title')

// Filter usage
analytics.filterUsed('category', 'poker-strategy')
```

### Event Parameters

Each event includes automatically tracked context parameters and supports custom parameters:

| Event | Parameters |
|-------|-----------|
| `video_play` | `video_title`, `video_id` |
| `subscribe_newsletter` | `location` |
| `discord_click` | `location` |
| `telegram_click` | `location` |
| `article_read` | `article_slug`, `article_title` |
| `filter_used` | `filter_type`, `filter_value` |

### Consent Management

Users can manage their analytics preferences through the Klaro consent banner:
- **Accept all**: Analytics storage is granted (Consent Mode v2 sends `analytics_storage: 'granted'`)
- **Reject all**: Analytics storage is denied (Consent Mode v2 sends `analytics_storage: 'denied'`)
- **Custom**: Users can individually control analytics consent

When users update their preferences:
1. Klaro sends consent update to gtag
2. Google Analytics respects the user's choice via Consent Mode v2
3. No data is collected if analytics_storage is denied
4. Events are queued and only sent once consent is granted

### RGPD Compliance

- **IP Anonymization**: Enabled by default (`anonymize_ip: true`)
- **Consent Mode v2**: Default state is `denied` for all storage types
- **Allow Google Signals**: Disabled (`allow_google_signals: false`)
- **Cookie Duration**: 365 days (configurable in Klaro config)

### Files Modified/Created

- **New files:**
  - `src/components/GoogleAnalytics.tsx` - GA4 component with Consent Mode v2
  - `src/lib/analytics.ts` - Analytics tracking utilities
  - `src/hooks/useAnalytics.ts` - React hook for analytics tracking

- **Updated files:**
  - `src/app/(frontend)/layout.tsx` - Added GoogleAnalytics component
  - `src/components/CookieConsent/index.tsx` - GA measurement ID integration
  - `src/components/CookieConsent/klaro-config.ts` - Consent Mode v2 implementation
  - `.env` - Added NEXT_PUBLIC_GA_MEASUREMENT_ID
  - `.env.example` - Added NEXT_PUBLIC_GA_MEASUREMENT_ID

### Troubleshooting

**Events not showing in GA4:**
1. Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly in `.env`
2. Check browser console for "Google Analytics Measurement ID not configured" warning
3. Ensure user has accepted analytics consent in Klaro banner
4. Wait up to 24 hours for data to appear in GA4 (real-time can be seen in GA4 dashboard)

**Consent not persisting:**
- Klaro stores consent in a cookie valid for 365 days
- Check browser cookies for `klaro` cookie
- Ensure cookies are not being cleared by browser settings
