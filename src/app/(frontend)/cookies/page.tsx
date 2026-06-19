import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Cookies | Ninja Poker Academy',
  description:
    'Información sobre las cookies que utiliza Ninja Poker Academy, para qué sirven y cómo puedes gestionarlas.',
}

export default function CookiesPage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="container py-12 md:py-16 lg:py-20">
        <article className="mx-auto prose dark:prose-invert prose-headings:font-display prose-a:text-npa-red prose-a:no-underline hover:prose-a:underline">
          <h1>Política de Cookies</h1>
          <p className="not-prose text-sm text-foreground/50">
            Última actualización: <strong>[FECHA DE ÚLTIMA ACTUALIZACIÓN]</strong>
          </p>

          <nav className="not-prose my-8 p-5 bg-card border border-border rounded-lg">
            <p className="text-xs uppercase tracking-widest font-display text-foreground/50 mb-3">
              Contenido
            </p>
            <ol className="space-y-1.5 list-decimal list-inside">
              {[
                ['#que-son', 'Qué son las cookies'],
                ['#tipos', 'Tipos de cookies que utilizamos'],
                ['#tecnicas', 'Cookies técnicas y funcionales'],
                ['#analiticas', 'Cookies analíticas'],
                ['#terceros', 'Cookies de terceros'],
                ['#gestion', 'Cómo gestionar tus preferencias'],
                ['#cambios', 'Cambios en esta política'],
                ['#contacto', 'Contacto'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-sm text-foreground/70 hover:text-npa-red transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <p>
            Este sitio web, operado por <strong>[NOMBRE DE LA EMPRESA]</strong>, utiliza cookies y
            tecnologías similares para mejorar la experiencia de usuario, analizar el tráfico y, en
            su caso, mostrar contenido personalizado. En esta página te explicamos qué cookies
            usamos, para qué sirven y cómo puedes controlarlas.
          </p>

          <section id="que-son">
            <h2>1. Qué son las cookies</h2>
            <p>
              Las cookies son pequeños archivos de texto que un sitio web guarda en tu dispositivo
              (ordenador, tableta o móvil) cuando lo visitas. Permiten que el sitio recuerde tus
              acciones y preferencias durante un tiempo determinado, de modo que no tengas que
              volver a introducirlas cada vez que regreses.
            </p>
            <p>
              Además de las cookies, podemos utilizar tecnologías similares como píxeles de
              seguimiento o almacenamiento local del navegador, que funcionan de manera análoga.
            </p>
          </section>

          <section id="tipos">
            <h2>2. Tipos de cookies que utilizamos</h2>
            <p>Clasificamos las cookies según su finalidad:</p>
            <ul>
              <li>
                <strong>Cookies técnicas/esenciales:</strong> imprescindibles para el funcionamiento
                básico del sitio. Sin ellas, servicios como la autenticación o las preferencias de
                tema no funcionarían. No requieren consentimiento.
              </li>
              <li>
                <strong>Cookies analíticas:</strong> nos permiten entender cómo los visitantes
                interactúan con el sitio (páginas visitadas, tiempo de sesión, fuente de tráfico).
                Requieren tu consentimiento.
              </li>
              <li>
                <strong>Cookies de terceros:</strong> instaladas por servicios externos integrados
                en el sitio (como reproductores de vídeo o plataformas sociales). Requieren tu
                consentimiento.
              </li>
            </ul>
          </section>

          <section id="tecnicas">
            <h2>3. Cookies técnicas y funcionales</h2>
            <p>
              Estas cookies son estrictamente necesarias para el funcionamiento del sitio y no
              pueden desactivarse:
            </p>
            <div className="not-prose overflow-x-auto my-4">
              <table className="w-full text-sm border-collapse border border-border">
                <thead>
                  <tr className="bg-card">
                    <th className="border border-border px-4 py-2 text-left font-semibold">
                      Nombre
                    </th>
                    <th className="border border-border px-4 py-2 text-left font-semibold">
                      Finalidad
                    </th>
                    <th className="border border-border px-4 py-2 text-left font-semibold">
                      Duración
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-2 font-mono text-xs">
                      payload-token
                    </td>
                    <td className="border border-border px-4 py-2">Autenticación de sesión</td>
                    <td className="border border-border px-4 py-2">Sesión</td>
                  </tr>
                  <tr className="bg-card/50">
                    <td className="border border-border px-4 py-2 font-mono text-xs">theme</td>
                    <td className="border border-border px-4 py-2">
                      Preferencia de tema visual (claro/oscuro)
                    </td>
                    <td className="border border-border px-4 py-2">1 año</td>
                  </tr>
                  <tr>
                    <td className="border border-border px-4 py-2 font-mono text-xs">
                      klaro-consent
                    </td>
                    <td className="border border-border px-4 py-2">
                      Almacena tus preferencias de consentimiento de cookies
                    </td>
                    <td className="border border-border px-4 py-2">1 año</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="analiticas">
            <h2>4. Cookies analíticas</h2>
            <p>
              Con tu consentimiento, utilizamos <strong>Google Analytics</strong> para recopilar
              datos estadísticos sobre el uso del sitio. Estos datos se procesan de forma agregada y
              seudónima, lo que significa que no te identifican directamente como persona.
            </p>
            <div className="not-prose overflow-x-auto my-4">
              <table className="w-full text-sm border-collapse border border-border">
                <thead>
                  <tr className="bg-card">
                    <th className="border border-border px-4 py-2 text-left font-semibold">
                      Nombre
                    </th>
                    <th className="border border-border px-4 py-2 text-left font-semibold">
                      Proveedor
                    </th>
                    <th className="border border-border px-4 py-2 text-left font-semibold">
                      Finalidad
                    </th>
                    <th className="border border-border px-4 py-2 text-left font-semibold">
                      Duración
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border px-4 py-2 font-mono text-xs">_ga</td>
                    <td className="border border-border px-4 py-2">Google Analytics</td>
                    <td className="border border-border px-4 py-2">
                      Distingue usuarios únicos
                    </td>
                    <td className="border border-border px-4 py-2">2 años</td>
                  </tr>
                  <tr className="bg-card/50">
                    <td className="border border-border px-4 py-2 font-mono text-xs">_ga_*</td>
                    <td className="border border-border px-4 py-2">Google Analytics (GA4)</td>
                    <td className="border border-border px-4 py-2">Mantiene el estado de la sesión</td>
                    <td className="border border-border px-4 py-2">2 años</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Puedes consultar la política de privacidad de Google en{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                policies.google.com/privacy
              </a>
              .
            </p>
          </section>

          <section id="terceros">
            <h2>5. Cookies de terceros</h2>
            <p>
              Algunos servicios de terceros integrados en el sitio (por ejemplo, vídeos de YouTube
              o widgets sociales) pueden instalar sus propias cookies cuando interactúas con ellos.
              No controlamos estas cookies directamente; te recomendamos consultar las políticas de
              privacidad de cada proveedor.
            </p>
          </section>

          <section id="gestion">
            <h2>6. Cómo gestionar tus preferencias de cookies</h2>
            <p>
              Puedes gestionar tus preferencias de cookies en cualquier momento a través de las
              siguientes opciones:
            </p>
            <ul>
              <li>
                <strong>Panel de preferencias de este sitio:</strong> haz clic en el botón
                «Personalizar cookies» en el pie de página o en el banner de consentimiento que
                aparece al visitar el sitio por primera vez.
              </li>
              <li>
                <strong>Configuración del navegador:</strong> la mayoría de navegadores te permiten
                bloquear o eliminar cookies directamente desde sus ajustes:
                <ul>
                  <li>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Safari
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Microsoft Edge
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <p>
              Ten en cuenta que deshabilitar ciertas cookies puede afectar a la funcionalidad del
              sitio.
            </p>
          </section>

          <section id="cambios">
            <h2>7. Cambios en esta política de cookies</h2>
            <p>
              Podemos actualizar esta política periódicamente para reflejar cambios en las cookies
              que utilizamos o en la normativa aplicable. La fecha de la última revisión aparece al
              inicio de este documento. Si realizamos cambios significativos, te lo notificaremos
              mediante un aviso en el sitio.
            </p>
          </section>

          <section id="contacto">
            <h2>8. Contacto</h2>
            <p>
              Para cualquier pregunta sobre nuestra política de cookies, puedes escribirnos a{' '}
              <a href="mailto:[EMAIL DE CONTACTO]">[EMAIL DE CONTACTO]</a> o dirigirte a{' '}
              <strong>[NOMBRE DE LA EMPRESA]</strong>, [DIRECCIÓN], [PAÍS].
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}
