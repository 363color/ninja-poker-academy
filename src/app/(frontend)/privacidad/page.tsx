import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Ninja Poker Academy',
  description:
    'Conoce cómo Ninja Poker Academy recopila, usa y protege tus datos personales de acuerdo con la normativa vigente.',
}

export default function PrivacidadPage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="container py-12 md:py-16 lg:py-20">
        <article className="mx-auto prose dark:prose-invert prose-headings:font-display prose-a:text-npa-red prose-a:no-underline hover:prose-a:underline">
          <h1>Política de Privacidad</h1>
          <p className="not-prose text-sm text-foreground/50">
            Última actualización: <strong>[FECHA DE ÚLTIMA ACTUALIZACIÓN]</strong>
          </p>

          <nav className="not-prose my-8 p-5 bg-card border border-border rounded-lg">
            <p className="text-xs uppercase tracking-widest font-display text-foreground/50 mb-3">
              Contenido
            </p>
            <ol className="space-y-1.5 list-decimal list-inside">
              {[
                ['#responsable', 'Responsable del tratamiento'],
                ['#datos-recopilados', 'Qué datos personales recopilamos'],
                ['#finalidad', 'Finalidad y base legal del tratamiento'],
                ['#destinatarios', 'Destinatarios de los datos'],
                ['#transferencias', 'Transferencias internacionales de datos'],
                ['#conservacion', 'Plazo de conservación'],
                ['#derechos', 'Derechos del usuario'],
                ['#cookies', 'Cookies'],
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
            En <strong>[NOMBRE DE LA EMPRESA]</strong> nos comprometemos a proteger tu privacidad y
            a tratar tus datos personales con la máxima transparencia y seguridad, en cumplimiento
            del Reglamento General de Protección de Datos (RGPD) y demás normativa aplicable en{' '}
            <strong>[PAÍS]</strong>.
          </p>

          <section id="responsable">
            <h2>1. Responsable del tratamiento</h2>
            <ul>
              <li>
                <strong>Razón social:</strong> [NOMBRE DE LA EMPRESA]
              </li>
              <li>
                <strong>Número de registro:</strong> [NÚMERO DE REGISTRO/RUC/NIT]
              </li>
              <li>
                <strong>Dirección:</strong> [DIRECCIÓN], [PAÍS]
              </li>
              <li>
                <strong>Correo electrónico:</strong>{' '}
                <a href="mailto:[EMAIL DE CONTACTO]">[EMAIL DE CONTACTO]</a>
              </li>
            </ul>
          </section>

          <section id="datos-recopilados">
            <h2>2. Qué datos personales recopilamos</h2>
            <p>Podemos recopilar las siguientes categorías de datos personales:</p>
            <ul>
              <li>
                <strong>Datos de identificación:</strong> nombre, apellidos y nombre de usuario.
              </li>
              <li>
                <strong>Datos de contacto:</strong> dirección de correo electrónico.
              </li>
              <li>
                <strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas
                visitadas y duración de la sesión, recopilados a través de cookies y herramientas de
                analítica.
              </li>
              <li>
                <strong>Datos de uso:</strong> contenido consultado, cursos accedidos e
                interacciones con la plataforma.
              </li>
              <li>
                <strong>Datos de pago:</strong> en caso de compra, los datos son procesados de forma
                segura a través de pasarelas de pago certificadas. No almacenamos números de tarjeta
                directamente.
              </li>
            </ul>
          </section>

          <section id="finalidad">
            <h2>3. Finalidad y base legal del tratamiento</h2>
            <p>Tratamos tus datos personales para los siguientes fines:</p>
            <ul>
              <li>
                <strong>Gestión de la cuenta de usuario</strong> — ejecución del contrato de
                servicio.
              </li>
              <li>
                <strong>Prestación de los servicios educativos de póker</strong> — ejecución del
                contrato.
              </li>
              <li>
                <strong>Envío de comunicaciones comerciales</strong> sobre cursos, torneos y
                novedades, únicamente con tu consentimiento expreso. Puedes retirar este
                consentimiento en cualquier momento sin que ello afecte a la licitud del tratamiento
                previo.
              </li>
              <li>
                <strong>Análisis estadístico y mejora del servicio</strong> mediante herramientas de
                analítica web — interés legítimo del responsable.
              </li>
              <li>
                <strong>Cumplimiento de obligaciones legales</strong> — obligación legal.
              </li>
              <li>
                <strong>Verificación de edad</strong> para garantizar que los usuarios tienen al
                menos <strong>18</strong> años — cumplimiento legal y protección de menores.
              </li>
            </ul>
          </section>

          <section id="destinatarios">
            <h2>4. Destinatarios de los datos</h2>
            <p>
              No vendemos ni cedemos tus datos personales a terceros con fines comerciales propios.
              Podemos compartirlos exclusivamente con encargados del tratamiento que actúan bajo
              nuestras instrucciones y con las garantías adecuadas:
            </p>
            <ul>
              <li>
                <strong>Proveedores de alojamiento web y servicios en la nube</strong> para la
                infraestructura del sitio.
              </li>
              <li>
                <strong>Plataformas de analítica</strong> (como Google Analytics) para medir el uso
                del sitio.
              </li>
              <li>
                <strong>Pasarelas de pago</strong> para el procesamiento seguro de transacciones.
              </li>
              <li>
                <strong>Herramientas de email marketing</strong> para el envío de comunicaciones,
                únicamente con tu consentimiento.
              </li>
            </ul>
            <p>
              Cuando estemos legalmente obligados, podremos compartir datos con autoridades públicas
              competentes.
            </p>
          </section>

          <section id="transferencias">
            <h2>5. Transferencias internacionales de datos</h2>
            <p>
              Algunos de nuestros proveedores pueden estar ubicados fuera del Espacio Económico
              Europeo (EEE). En tales casos, garantizamos que las transferencias se realizan con las
              salvaguardas adecuadas previstas en la normativa vigente, como las cláusulas
              contractuales tipo aprobadas por la Comisión Europea o en virtud de una decisión de
              adecuación.
            </p>
          </section>

          <section id="conservacion">
            <h2>6. Plazo de conservación</h2>
            <p>
              Conservamos tus datos durante el tiempo necesario para cumplir la finalidad para la
              que fueron recabados:
            </p>
            <ul>
              <li>
                <strong>Datos de cuenta:</strong> mientras la cuenta esté activa y durante los
                plazos legales aplicables tras su cancelación.
              </li>
              <li>
                <strong>Datos de facturación:</strong> durante el plazo exigido por la legislación
                fiscal aplicable en [PAÍS] (generalmente entre 5 y 7 años).
              </li>
              <li>
                <strong>Comunicaciones comerciales:</strong> hasta que retires tu consentimiento.
              </li>
              <li>
                <strong>Datos de navegación y cookies:</strong> según lo indicado en nuestra{' '}
                <a href="/cookies">Política de Cookies</a>.
              </li>
            </ul>
          </section>

          <section id="derechos">
            <h2>7. Derechos del usuario</h2>
            <p>
              En virtud de la normativa de protección de datos aplicable, tienes los siguientes
              derechos sobre tus datos personales:
            </p>
            <ul>
              <li>
                <strong>Acceso:</strong> obtener confirmación sobre si tratamos tus datos y acceder
                a ellos.
              </li>
              <li>
                <strong>Rectificación:</strong> corregir datos inexactos o incompletos.
              </li>
              <li>
                <strong>Supresión («derecho al olvido»):</strong> solicitar la eliminación de tus
                datos cuando ya no sean necesarios para la finalidad que motivó su recogida.
              </li>
              <li>
                <strong>Limitación del tratamiento:</strong> solicitar que suspendamos el
                tratamiento en determinadas circunstancias.
              </li>
              <li>
                <strong>Portabilidad:</strong> recibir tus datos en un formato estructurado, de uso
                común y lectura mecánica.
              </li>
              <li>
                <strong>Oposición:</strong> oponerte al tratamiento basado en interés legítimo o con
                fines de marketing directo.
              </li>
              <li>
                <strong>Decisiones automatizadas:</strong> no ser objeto de decisiones basadas
                exclusivamente en tratamiento automatizado que produzcan efectos jurídicos
                significativos.
              </li>
            </ul>
            <p>
              Para ejercer estos derechos, escríbenos a{' '}
              <a href="mailto:[EMAIL DE CONTACTO]">[EMAIL DE CONTACTO]</a> indicando tu nombre, el
              derecho que deseas ejercer y adjuntando una copia de tu documento de identidad.
              Responderemos en el plazo máximo establecido por la normativa aplicable. Si consideras
              que el tratamiento de tus datos vulnera la normativa, tienes derecho a presentar una
              reclamación ante la autoridad de control competente.
            </p>
          </section>

          <section id="cookies">
            <h2>8. Cookies</h2>
            <p>
              Utilizamos cookies y tecnologías similares. Para más información sobre los tipos de
              cookies que empleamos y cómo gestionarlas, consulta nuestra{' '}
              <a href="/cookies">Política de Cookies</a>.
            </p>
          </section>

          <section id="cambios">
            <h2>9. Cambios en esta política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en
              nuestras prácticas o en la normativa aplicable. Te notificaremos sobre cambios
              significativos mediante un aviso destacado en el sitio web o, si corresponde, por
              correo electrónico. La fecha de la última revisión aparece al inicio de este
              documento.
            </p>
          </section>

          <section id="contacto">
            <h2>10. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con esta política o con el tratamiento de tus
              datos personales, puedes dirigirte a:
            </p>
            <ul>
              <li>
                <strong>Empresa:</strong> [NOMBRE DE LA EMPRESA]
              </li>
              <li>
                <strong>Correo electrónico:</strong>{' '}
                <a href="mailto:[EMAIL DE CONTACTO]">[EMAIL DE CONTACTO]</a>
              </li>
              <li>
                <strong>Dirección postal:</strong> [DIRECCIÓN], [PAÍS]
              </li>
            </ul>
          </section>
        </article>
      </div>
    </main>
  )
}
