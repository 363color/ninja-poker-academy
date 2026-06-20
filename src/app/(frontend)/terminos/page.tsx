import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Ninja Poker Academy',
  description:
    'Lee las condiciones de uso de Ninja Poker Academy: reglas de acceso, contenido, propiedad intelectual y responsabilidades.',
}

export default function TerminosPage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="container py-12 md:py-16 lg:py-20">
        <article className="mx-auto prose dark:prose-invert prose-headings:font-display prose-a:text-npa-red prose-a:no-underline hover:prose-a:underline">
          <h1>Términos y Condiciones</h1>
          <p className="not-prose text-sm text-foreground/50">
            Última actualización: <strong>[FECHA DE ÚLTIMA ACTUALIZACIÓN]</strong>
          </p>

          <nav className="not-prose my-8 p-5 bg-card border border-border rounded-lg">
            <p className="text-xs uppercase tracking-widest font-display text-foreground/50 mb-3">
              Contenido
            </p>
            <ol className="space-y-1.5 list-decimal list-inside">
              {[
                ['#aceptacion', 'Aceptación de las condiciones'],
                ['#objeto', 'Objeto del sitio web'],
                ['#titular', 'Datos del titular'],
                ['#acceso', 'Acceso y registro'],
                ['#contenido', 'Contenido y servicios educativos'],
                ['#propiedad', 'Propiedad intelectual'],
                ['#conducta', 'Conducta del usuario'],
                ['#responsabilidad', 'Limitación de responsabilidad'],
                ['#modificaciones', 'Modificaciones'],
                ['#ley', 'Ley aplicable y jurisdicción'],
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
            Los presentes Términos y Condiciones regulan el acceso y uso del sitio web de{' '}
            <strong>[NOMBRE DE LA EMPRESA]</strong> (en adelante, «la Empresa»), así como los
            servicios educativos de póker ofrecidos a través del mismo. El acceso y uso del sitio
            implica la aceptación plena y sin reservas de estas condiciones.
          </p>

          <section id="aceptacion">
            <h2>1. Aceptación de las condiciones</h2>
            <p>
              Al acceder a este sitio web, declaras haber leído, comprendido y aceptado los
              presentes Términos y Condiciones en su versión vigente, así como nuestra{' '}
              <a href="/privacidad">Política de Privacidad</a> y nuestra{' '}
              <a href="/cookies">Política de Cookies</a>. Si no estás de acuerdo con alguno de estos
              términos, deberás abstenerte de utilizar el sitio.
            </p>
            <p>
              El acceso a este sitio está restringido a personas mayores de <strong>18</strong>{' '}
              años. Al utilizar el sitio, confirmas que cumples este requisito de edad.
            </p>
          </section>

          <section id="objeto">
            <h2>2. Objeto del sitio web</h2>
            <p>
              Ninja Poker Academy es una plataforma educativa dedicada a la formación en estrategia
              de póker. El sitio ofrece contenido didáctico (artículos, vídeos, cursos y recursos)
              con fines exclusivamente educativos. El póker involucra elementos de habilidad y azar;
              la participación en partidas reales con dinero puede estar sujeta a restricciones
              legales según el país de residencia del usuario.
            </p>
            <p>
              <strong>
                Este sitio no ofrece servicios de juego en línea con dinero real. Todo el contenido
                tiene carácter educativo e informativo.
              </strong>
            </p>
          </section>

          <section id="titular">
            <h2>3. Datos del titular</h2>
            <ul>
              <li>
                <strong>Empresa:</strong> [NOMBRE DE LA EMPRESA]
              </li>
              <li>
                <strong>Número de registro:</strong> [NÚMERO DE REGISTRO/RUC/NIT]
              </li>
              <li>
                <strong>Dirección:</strong> [DIRECCIÓN], [PAÍS]
              </li>
              <li>
                <strong>Correo de contacto:</strong>{' '}
                <a href="mailto:[EMAIL DE CONTACTO]">[EMAIL DE CONTACTO]</a>
              </li>
            </ul>
          </section>

          <section id="acceso">
            <h2>4. Acceso y registro</h2>
            <p>
              Determinados servicios o contenidos del sitio pueden requerir registro previo. Al
              registrarte, te comprometes a:
            </p>
            <ul>
              <li>Facilitar información veraz, completa y actualizada.</li>
              <li>Mantener la confidencialidad de tus credenciales de acceso.</li>
              <li>
                Notificarnos inmediatamente ante cualquier uso no autorizado de tu cuenta a través
                de <a href="mailto:[EMAIL DE CONTACTO]">[EMAIL DE CONTACTO]</a>.
              </li>
              <li>No ceder ni compartir tu cuenta con terceros.</li>
            </ul>
            <p>
              La Empresa se reserva el derecho de suspender o cancelar cuentas que incumplan estas
              condiciones.
            </p>
          </section>

          <section id="contenido">
            <h2>5. Contenido y servicios educativos</h2>
            <p>
              El contenido de Ninja Poker Academy tiene finalidad exclusivamente educativa e
              informativa. La Empresa se reserva el derecho de modificar, actualizar o retirar
              cualquier contenido sin previo aviso.
            </p>
            <p>
              En el caso de adquisición de cursos u otros productos digitales, las condiciones
              específicas de compra (precio, acceso, devoluciones) se detallarán en el proceso de
              pago. Con carácter general, los productos digitales descargados o accedidos no son
              reembolsables salvo defecto técnico imputable a la Empresa.
            </p>
          </section>

          <section id="propiedad">
            <h2>6. Propiedad intelectual</h2>
            <p>
              Todos los contenidos del sitio web (textos, imágenes, vídeos, logotipos, diseño
              gráfico, código fuente y cualquier otro elemento) son propiedad de{' '}
              <strong>[NOMBRE DE LA EMPRESA]</strong> o de sus legítimos licenciantes, y están
              protegidos por la normativa vigente en materia de propiedad intelectual e industrial.
            </p>
            <p>
              Queda expresamente prohibido reproducir, distribuir, comunicar públicamente,
              transformar o utilizar el contenido del sitio con fines comerciales sin autorización
              previa y por escrito de la Empresa. El uso personal y no comercial está permitido
              siempre que se respete la autoría.
            </p>
          </section>

          <section id="conducta">
            <h2>7. Conducta del usuario</h2>
            <p>El usuario se compromete a no utilizar el sitio para:</p>
            <ul>
              <li>
                Llevar a cabo actividades ilegales o contrarias a la moral, el orden público o la
                buena fe.
              </li>
              <li>
                Difundir contenido ofensivo, discriminatorio, difamatorio o que atente contra la
                dignidad de las personas.
              </li>
              <li>
                Intentar acceder de forma no autorizada a sistemas o bases de datos del sitio.
              </li>
              <li>Introducir virus, malware u otro software dañino.</li>
              <li>
                Realizar scraping, extracción masiva de datos o cualquier acción que pueda
                perjudicar el funcionamiento del sitio.
              </li>
            </ul>
          </section>

          <section id="responsabilidad">
            <h2>8. Limitación de responsabilidad</h2>
            <p>
              La Empresa no garantiza la disponibilidad continua e ininterrumpida del sitio, ni la
              ausencia de errores en el contenido. En la medida máxima permitida por la ley
              aplicable:
            </p>
            <ul>
              <li>
                La Empresa no será responsable de daños derivados del uso o imposibilidad de uso del
                sitio.
              </li>
              <li>
                El contenido educativo se ofrece «tal cual» y no constituye asesoramiento
                financiero, legal ni garantía de resultados en el juego.
              </li>
              <li>
                La Empresa no controla los sitios web de terceros a los que enlaza y no asume
                responsabilidad por su contenido o prácticas.
              </li>
            </ul>
          </section>

          <section id="modificaciones">
            <h2>9. Modificaciones</h2>
            <p>
              La Empresa se reserva el derecho de modificar estos Términos y Condiciones en
              cualquier momento. Los cambios serán efectivos desde su publicación en el sitio. El
              uso continuado del sitio tras la publicación de los cambios implica la aceptación de
              los nuevos términos.
            </p>
          </section>

          <section id="ley">
            <h2>10. Ley aplicable y jurisdicción</h2>
            <p>
              Los presentes Términos y Condiciones se rigen por la legislación de{' '}
              <strong>[PAÍS]</strong>. Para la resolución de cualquier controversia derivada de su
              interpretación o aplicación, las partes se someten, con renuncia expresa a cualquier
              otro fuero, a los juzgados y tribunales competentes de <strong>[PAÍS]</strong>, salvo
              que la normativa de protección al consumidor establezca otro fuero en beneficio del
              usuario.
            </p>
          </section>

          <section id="contacto">
            <h2>11. Contacto</h2>
            <p>
              Para cualquier consulta sobre estos Términos y Condiciones, puedes contactarnos en{' '}
              <a href="mailto:[EMAIL DE CONTACTO]">[EMAIL DE CONTACTO]</a> o en la dirección postal
              indicada en el <a href="/aviso-legal">Aviso Legal</a>.
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}
