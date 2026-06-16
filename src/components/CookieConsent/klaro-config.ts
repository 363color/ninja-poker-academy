const klaroConfig = {
  version: 1,
  elementID: 'klaro',
  storageMethod: 'cookie',
  storageName: 'klaro',
  cookieExpiresAfterDays: 365,
  htmlTexts: false,
  embedded: false,
  groupByPurpose: true,
  mustConsent: false,
  acceptAll: true,
  hideDeclineAll: false,
  hideLearnMore: false,
  noticeAsModal: false,
  lang: 'es',
  disablePoweredBy: true,

  translations: {
    es: {
      consentNotice: {
        description:
          'Usamos cookies para analizar el tráfico y mejorar tu experiencia. Puedes aceptar todas, rechazarlas o personalizar tu elección.',
        learnMore: 'Personalizar',
      },
      consentModal: {
        title: 'Configuración de cookies',
        description:
          'Aquí puedes ver y personalizar los servicios que queremos usar en este sitio web.',
        privacyPolicy: {
          text: 'Para más información, consulta nuestra {privacyPolicy}.',
          name: 'política de privacidad',
        },
      },
      acceptAll: 'Aceptar todo',
      declineAll: 'Rechazar todo',
      acceptSelected: 'Aceptar selección',
      save: 'Guardar',
      close: 'Cerrar',
      purposes: {
        esencial: 'Esencial',
        analitica: 'Analítica',
      },
      googleAnalytics: {
        title: 'Google Analytics 4',
        description: 'Mide el tráfico y el comportamiento de los visitantes para mejorar el sitio. IP anonimizado (RGPD).',
      },
      bingAnalytics: {
        title: 'Bing Webmaster Tools',
        description: 'Analítica de búsqueda de Microsoft Bing.',
      },
    },
  },

  services: [
    {
      name: 'googleAnalytics',
      title: 'Google Analytics 4',
      purposes: ['analitica'],
      cookies: [
        [/^_ga/, '/', 'ninjapokeracademy.com'],
        [/^_gid/, '/', 'ninjapokeracademy.com'],
        [/^_gat/, '/', 'ninjapokeracademy.com'],
      ],
      onAccept: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
        gtag('config', window.GA_MEASUREMENT_ID || '', {
          'anonymize_ip': true,
          'allow_google_signals': false
        });
      `,
      onDecline: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'update', {
          'analytics_storage': 'denied',
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied'
        });
      `,
      required: false,
      optOut: false,
    },
    {
      name: 'bingAnalytics',
      title: 'Bing Webmaster Tools',
      purposes: ['analitica'],
      required: false,
      optOut: false,
    },
  ],
}

export default klaroConfig
