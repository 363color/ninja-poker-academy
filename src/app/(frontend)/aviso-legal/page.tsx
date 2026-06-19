import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso Legal | Ninja Poker Academy',
  description:
    'Aviso legal de Ninja Poker Academy: datos del titular, condiciones de uso, propiedad intelectual y ley aplicable.',
}

export default function AvisoLegalPage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="container py-12 md:py-16 lg:py-20">
        <article className="mx-auto prose dark:prose-invert prose-headings:font-display prose-a:text-npa-red prose-a:no-underline hover:prose-a:underline">
          <h1>Aviso Legal</h1>
          <p className="not-prose text-sm text-foreground/50">
            Última actualización: <strong>[FECHA DE ÚLTIMA ACTUALIZACIÓN]</strong>
          </p>

          <nav className="not-prose my-8 p-5 bg-card border border-border rounded-lg">
            <p className="text-xs uppercase tracking-widest font-display text-foreground/50 mb-3">
              Contenido
            </p>
            <ol className="space-y-1.5 list-decimal list-inside">
              {[
                ['#identificacion', 'Identificación del titular'],
                ['#objeto', 'Objeto del sitio web'],
                ['#condiciones-acceso', 'Condiciones de acceso y uso'],
                ['#propiedad-intelectual', 'Propiedad intelectual y derechos de autor'],
                ['#enlaces', 'Política de enlaces externos'],
                ['#responsabilidad', 'Limitación de responsabilidad'],
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
            En cumplimiento de la normativa vigente en materia de servicios de la sociedad de la
            información y del comercio electrónico, <strong>[NOMBRE DE LA EMPRESA]</strong> pone a
            disposición de los usuarios la siguiente información legal sobre este sitio web.
          </p>

          <section id="identificacion">
            <h2>1. Identificación del titular</h2>
            <ul>
              <li>
                <strong>Denominación social:</strong> [NOMBRE DE LA EMPRESA]
              </li>
              <li>
                <strong>Número de registro / identificación fiscal:</strong>{' '}
                [NÚMERO DE REGISTRO/RUC/NIT]
              </li>
              <li>
                <strong>Domicilio social:</strong> [DIRECCIÓN], [PAÍS]
              </li>
              <li>
                <strong>Correo electrónico de contacto:</strong>{' '}
                <a href="mailto:[EMAIL DE CONTACTO]">[EMAIL DE CONTACTO]</a>
              </li>
              <li>
                <strong>Nombre comercial:</strong> Ninja Poker Academy
              </li>
              <li>
                <strong>Actividad:</strong> Plataforma educativa sobre estrategia de póker
              </li>
            </ul>
          </section>

          <section id="objeto">
            <h2>2. Objeto del sitio web</h2>
            <p>
              El presente sitio web tiene por objeto ofrecer contenido educativo e informativo
              relacionado con la estrategia, las matemáticas y la psicología del póker. La
              información publicada tiene carácter divulgativo y no constituye asesoramiento
              financiero, legal ni garantía de resultados en el juego.
            </p>
            <p>
              Este sitio no es un operador de juego en línea y no ofrece servicios de apuestas con
              dinero real. El juego de póker puede estar regulado o prohibido según el país de
              residencia del usuario; es responsabilidad de cada usuario verificar la legalidad de
              la práctica del juego en su jurisdicción.
            </p>
          </section>

          <section id="condiciones-acceso">
            <h2>3. Condiciones de acceso y uso</h2>
            <p>
              El acceso a este sitio web es libre y gratuito, salvo en lo que respecta a los
              servicios de pago. El usuario se compromete a hacer un uso adecuado del sitio,
              conforme a la ley, la moral, las buenas costumbres y el orden público.
            </p>
            <p>Queda expresamente prohibido:</p>
            <ul>
              <li>El acceso al sitio por parte de menores de <strong>[EDAD MÍNIMA LEGAL]</strong> años.</li>
              <li>
                Realizar acciones que puedan dañar, inutilizar, sobrecargar o deteriorar el sitio
                o los sistemas informáticos de terceros.
              </li>
              <li>
                Intentar acceder sin autorización a sistemas, datos o áreas restringidas del sitio.
              </li>
              <li>
                Reproducir, distribuir o comunicar públicamente el contenido del sitio sin
                autorización expresa y por escrito del titular.
              </li>
            </ul>
          </section>

          <section id="propiedad-intelectual">
            <h2>4. Propiedad intelectual y derechos de autor</h2>
            <p>
              Todos los contenidos del sitio web —incluyendo, sin carácter limitativo, textos,
              fotografías, ilustraciones, vídeos, logotipos, marcas, diseño gráfico, estructura y
              código fuente— son propiedad de <strong>[NOMBRE DE LA EMPRESA]</strong> o de sus
              cedentes, y se encuentran protegidos por la legislación vigente sobre propiedad
              intelectual e industrial.
            </p>
            <p>
              Se prohíbe expresamente la reproducción total o parcial del sitio, su comunicación
              pública, distribución, transformación o cualquier otro acto de explotación no
              autorizado por el titular. El incumplimiento de esta prohibición puede dar lugar a las
              acciones legales correspondientes.
            </p>
            <p>
              Las marcas, nombres comerciales y signos distintivos que aparecen en el sitio son
              propiedad de [NOMBRE DE LA EMPRESA] o de sus legítimos titulares. Su uso no
              autorizado está expresamente prohibido.
            </p>
          </section>

          <section id="enlaces">
            <h2>5. Política de enlaces externos</h2>
            <p>
              Este sitio puede contener hipervínculos a sitios web de terceros. Estos enlaces se
              ofrecen únicamente con fines informativos. <strong>[NOMBRE DE LA EMPRESA]</strong> no
              tiene control sobre el contenido, la política de privacidad ni las prácticas de dichos
              sitios, y no asume ninguna responsabilidad por ellos.
            </p>
            <p>
              La inclusión de un enlace a un sitio de terceros no implica ninguna relación de
              asociación, patrocinio o afiliación con el titular de dicho sitio.
            </p>
            <p>
              Si deseas enlazar a este sitio web desde el tuyo, hazlo de forma que no perjudique
              nuestra reputación ni induzca a error sobre la relación entre ambos sitios. Reservamos
              el derecho de solicitar la retirada de cualquier enlace que consideremos inapropiado.
            </p>
          </section>

          <section id="responsabilidad">
            <h2>6. Limitación de responsabilidad</h2>
            <p>
              <strong>[NOMBRE DE LA EMPRESA]</strong> no garantiza la disponibilidad y continuidad
              del funcionamiento del sitio web. Tampoco garantiza la ausencia de errores en el
              contenido ni que el sitio esté libre de virus u otros elementos que puedan causar daños
              en los sistemas informáticos de los usuarios.
            </p>
            <p>
              El titular no será responsable, en la medida máxima permitida por la ley aplicable,
              de ningún daño o perjuicio —incluyendo daños económicos, pérdida de datos o
              interrupción de actividad— derivado del acceso o uso del sitio, de la imposibilidad de
              acceder a él, o de la confianza depositada en la información contenida en el mismo.
            </p>
          </section>

          <section id="ley">
            <h2>7. Ley aplicable y jurisdicción</h2>
            <p>
              El presente Aviso Legal se rige e interpreta conforme a la legislación vigente en{' '}
              <strong>[PAÍS]</strong>. Para la resolución de cualquier litigio o controversia
              relacionada con este sitio web, las partes se someten a la jurisdicción de los
              juzgados y tribunales competentes de <strong>[PAÍS]</strong>, con renuncia expresa a
              cualquier otro fuero que pudiera corresponderles, sin perjuicio de los derechos
              reconocidos a los consumidores por la normativa aplicable.
            </p>
          </section>

          <section id="contacto">
            <h2>8. Contacto</h2>
            <p>
              Para cualquier consulta relacionada con este Aviso Legal o con la actividad del sitio
              web, puedes ponerte en contacto con nosotros a través de:
            </p>
            <ul>
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
