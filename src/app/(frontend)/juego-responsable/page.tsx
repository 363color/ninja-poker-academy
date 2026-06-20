import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Juego Responsable | Ninja Poker Academy',
  description:
    'Información y recursos sobre juego responsable en Ninja Poker Academy. Si necesitas ayuda, no estás solo.',
}

export default function JuegoResponsablePage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="container py-12 md:py-16 lg:py-20">
        <article className="mx-auto prose dark:prose-invert prose-headings:font-display prose-a:text-npa-red prose-a:no-underline hover:prose-a:underline">
          <h1>Juego Responsable</h1>
          <p className="not-prose text-sm text-foreground/50">
            Última actualización: <strong>[FECHA DE ÚLTIMA ACTUALIZACIÓN]</strong>
          </p>

          <nav className="not-prose my-8 p-5 bg-card border border-border rounded-lg">
            <p className="text-xs uppercase tracking-widest font-display text-foreground/50 mb-3">
              Contenido
            </p>
            <ol className="space-y-1.5 list-decimal list-inside">
              {[
                ['#compromiso', 'Nuestro compromiso'],
                ['#verificacion-edad', 'Verificación de edad'],
                ['#senales', 'Señales de advertencia'],
                ['#herramientas', 'Herramientas de autocontrol'],
                ['#ayuda', 'Organizaciones de ayuda'],
                ['#exclusion', 'Exclusión voluntaria'],
                ['#menores', 'Protección de menores'],
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
            En <strong>[NOMBRE DE LA EMPRESA]</strong> creemos que la educación sobre póker debe ir
            acompañada siempre de una cultura de juego responsable. El póker es un juego de
            habilidad y entretenimiento, pero puede volverse problemático si no se practica con
            conciencia. Esta página reúne información, señales de alerta y recursos de ayuda.
          </p>

          <section id="compromiso">
            <h2>1. Nuestro compromiso</h2>
            <p>
              Nos comprometemos a proporcionar un entorno educativo seguro y a promover activamente
              prácticas de juego responsable. Esto incluye:
            </p>
            <ul>
              <li>
                Restricción de acceso a menores de <strong>18</strong> años.
              </li>
              <li>Difusión de información sobre riesgos asociados al juego.</li>
              <li>Provisión de enlaces a recursos de ayuda profesional.</li>
              <li>
                Colaboración con organizaciones como{' '}
                <a href="https://www.gamcare.org.uk" target="_blank" rel="noopener noreferrer">
                  GamCare
                </a>{' '}
                y{' '}
                <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer">
                  BeGambleAware
                </a>
                .
              </li>
            </ul>
          </section>

          <section id="verificacion-edad">
            <h2>2. Verificación de edad</h2>
            <p>
              El acceso a este sitio está restringido a personas mayores de <strong>18</strong>{' '}
              años. Al registrarte o acceder al contenido, confirmas que cumples este requisito. Nos
              reservamos el derecho de solicitar documentación que acredite la edad en cualquier
              momento y de suspender el acceso si detectamos que un usuario es menor de edad.
            </p>
            <p>
              Si eres menor de <strong>18</strong> años, abandona este sitio inmediatamente.
            </p>
          </section>

          <section id="senales">
            <h2>3. Señales de advertencia del juego problemático</h2>
            <p>
              El juego se convierte en un problema cuando interfiere con tu vida cotidiana. Algunas
              señales de alerta son:
            </p>
            <ul>
              <li>Jugar con dinero que no puedes permitirte perder.</li>
              <li>
                Sentir la necesidad de apostar cantidades cada vez mayores para obtener la misma
                emoción.
              </li>
              <li>Intentar recuperar pérdidas apostando más («perseguir pérdidas»).</li>
              <li>Mentir a familiares o amigos sobre el tiempo o el dinero dedicado al juego.</li>
              <li>Descuidar responsabilidades laborales, familiares o sociales por el juego.</li>
              <li>Sentir ansiedad, irritabilidad o depresión relacionada con el juego.</li>
              <li>Usar el juego como forma de escapar de problemas o emociones negativas.</li>
            </ul>
            <p>
              Si reconoces alguna de estas señales en ti mismo o en alguien cercano, busca ayuda
              profesional cuanto antes.
            </p>
          </section>

          <section id="herramientas">
            <h2>4. Herramientas de autocontrol</h2>
            <p>
              Si juegas en plataformas reales de póker en línea, la mayoría de los operadores
              responsables ofrecen las siguientes herramientas:
            </p>
            <ul>
              <li>
                <strong>Límites de depósito:</strong> establece un tope máximo de dinero que puedes
                depositar en un periodo determinado (diario, semanal o mensual).
              </li>
              <li>
                <strong>Límites de pérdidas:</strong> define la cantidad máxima que estás dispuesto
                a perder en un periodo dado.
              </li>
              <li>
                <strong>Límites de tiempo de sesión:</strong> establece alertas o cortes automáticos
                cuando llevas cierto tiempo jugando.
              </li>
              <li>
                <strong>Autoexclusión temporal:</strong> pausa tu cuenta durante un periodo
                determinado (días, semanas o meses).
              </li>
              <li>
                <strong>Autoexclusión permanente:</strong> cierra tu cuenta de forma definitiva.
              </li>
              <li>
                <strong>Modo de realidad:</strong> recordatorios periódicos del tiempo transcurrido
                y del saldo de tu cuenta.
              </li>
            </ul>
            <p>
              Si utilizas alguna de estas herramientas, te recomendamos también bloquear el acceso a
              sitios de juego en tu dispositivo mediante programas de filtrado, como{' '}
              <a href="https://www.gamban.com" target="_blank" rel="noopener noreferrer">
                Gamban
              </a>
              .
            </p>
          </section>

          <section id="ayuda">
            <h2>5. Organizaciones de ayuda</h2>
            <p>
              Si tú o alguien que conoces necesita ayuda, las siguientes organizaciones ofrecen
              apoyo confidencial y gratuito:
            </p>

            <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
              <Link
                href="https://www.gamcare.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-start gap-4 p-6 bg-card border border-border rounded-lg hover:border-npa-red transition-colors group"
              >
                <Image
                  src="/media/GamCare.svg"
                  alt="GamCare"
                  width={100}
                  height={40}
                  className="h-10 w-auto"
                />
                <div>
                  <p className="font-semibold font-display text-foreground group-hover:text-npa-red transition-colors">
                    GamCare
                  </p>
                  <p className="text-sm text-foreground/60 mt-1">
                    Servicio de asesoramiento, apoyo e información para personas afectadas por el
                    juego problemático. Línea de ayuda disponible 24/7.
                  </p>
                  <p className="text-xs text-npa-red mt-2">gamcare.org.uk →</p>
                </div>
              </Link>

              <Link
                href="https://www.begambleaware.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-start gap-4 p-6 bg-card border border-border rounded-lg hover:border-npa-red transition-colors group"
              >
                <Image
                  src="/media/gambleaware_logos.svg"
                  alt="BeGambleAware"
                  width={140}
                  height={40}
                  className="h-10 w-auto"
                />
                <div>
                  <p className="font-semibold font-display text-foreground group-hover:text-npa-red transition-colors">
                    BeGambleAware
                  </p>
                  <p className="text-sm text-foreground/60 mt-1">
                    Información, recursos y herramientas para ayudarte a tomar decisiones informadas
                    sobre el juego y encontrar apoyo si lo necesitas.
                  </p>
                  <p className="text-xs text-npa-red mt-2">begambleaware.org →</p>
                </div>
              </Link>
            </div>

            <p>
              También puedes buscar servicios de atención al juego problemático específicos para tu
              país de residencia. Muchos países cuentan con líneas de atención nacionales gratuitas.
            </p>
          </section>

          <section id="exclusion">
            <h2>6. Exclusión voluntaria</h2>
            <p>
              Si deseas pausar o eliminar tu acceso a este sitio web por razones relacionadas con el
              juego responsable, contáctanos en{' '}
              <a href="mailto:[EMAIL DE CONTACTO]">[EMAIL DE CONTACTO]</a> y procesaremos tu
              solicitud de forma prioritaria y confidencial.
            </p>
          </section>

          <section id="menores">
            <h2>7. Protección de menores</h2>
            <p>
              Nos tomamos muy en serio la protección de los menores de edad. Si tienes menores en tu
              hogar, te recomendamos:
            </p>
            <ul>
              <li>
                Utilizar software de control parental para restringir el acceso a sitios de juego.
              </li>
              <li>
                Mantener tus dispositivos y cuentas protegidos con contraseñas que los menores no
                puedan conocer.
              </li>
              <li>Hablar abiertamente con los menores sobre los riesgos del juego de azar.</li>
            </ul>
            <p>
              Si detectamos que un menor ha accedido a nuestro sitio, suspenderemos su acceso de
              inmediato y eliminaremos cualquier dato asociado.
            </p>
          </section>

          <section id="contacto">
            <h2>8. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con el juego responsable o para solicitar la
              exclusión de la plataforma, escríbenos a{' '}
              <a href="mailto:[EMAIL DE CONTACTO]">[EMAIL DE CONTACTO]</a>. Tratamos estas
              solicitudes de forma confidencial y prioritaria.
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}
