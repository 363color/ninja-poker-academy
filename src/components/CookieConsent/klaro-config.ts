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
        title: 'Google Analytics',
        description: 'Mide el tráfico y el comportamiento de los visitantes para mejorar el sitio.',
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
      title: 'Google Analytics',
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
          'analytics_storage': 'granted'
        });
        gtag('js', new Date());
        gtag('config', 'G-S461J43CV5', { 'anonymize_ip': true });
      `,
      onDecline: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('consent', 'update', {
          'analytics_storage': 'denied'
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
