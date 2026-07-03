import React from 'react'
import type { Metadata } from 'next'
import { LegalLayout } from '../_components/LegalLayout'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Ninja Poker Academy',
  description:
    'Lee las condiciones de uso de Ninja Poker Academy: reglas de acceso, contenido, propiedad intelectual y responsabilidades.',
}

const TOC: [string, string][] = [
  ['#aceptacion', 'Aceptación de las condiciones'],
  ['#objeto', 'Objeto del sitio web y modelo de acceso'],
  ['#titular', 'Datos del titular'],
  ['#acceso', 'Acceso, registro y comunidad'],
  ['#contenido', 'Contenido y servicios educativos'],
  ['#bancaje', 'Bancaje'],
  ['#propiedad', 'Propiedad intelectual'],
  ['#conducta', 'Conducta del usuario'],
  ['#afiliacion', 'Enlaces de afiliación y terceros'],
  ['#responsabilidad', 'Limitación de responsabilidad'],
  ['#modificaciones', 'Modificaciones'],
  ['#ley', 'Ley aplicable y jurisdicción'],
  ['#contacto', 'Contacto'],
]

export default function TerminosPage() {
  return (
    <LegalLayout title="Términos y Condiciones" toc={TOC}>
      <p>
        Los presentes Términos y Condiciones regulan el acceso y uso del sitio web de{' '}
        <strong>[NOMBRE DE LA EMPRESA]</strong> (en adelante, «la Empresa» o «Ninja Poker Academy»),
        así como los servicios educativos de póker ofrecidos a través del mismo. El acceso y uso del
        sitio implica la aceptación plena y sin reservas de estas condiciones.
      </p>

      <section id="aceptacion">
        <h2>1. Aceptación de las condiciones</h2>
        <p>
          Al acceder a este sitio web, declaras haber leído, comprendido y aceptado los presentes
          Términos y Condiciones en su versión vigente, así como nuestra{' '}
          <a href="/privacidad">Política de Privacidad</a> y nuestra{' '}
          <a href="/cookies">Política de Cookies</a>. Si no estás de acuerdo con alguno de estos
          términos, deberás abstenerte de utilizar el sitio.
        </p>
        <p>
          El acceso a este sitio está restringido a personas mayores de <strong>18 años</strong>. Al
          utilizar el sitio, confirmas que cumples este requisito de edad y que el juego de póker es
          legal en tu jurisdicción.
        </p>
      </section>

      <section id="objeto">
        <h2>2. Objeto del sitio web y modelo de acceso</h2>
        <p>
          Ninja Poker Academy es una plataforma educativa especializada en estrategia de cash game
          de póker. El sitio ofrece contenido didáctico (artículos, vídeos y recursos) con fines
          exclusivamente educativos.
        </p>
        <p>
          <strong>El acceso a los servicios educativos de Ninja Poker Academy es gratuito.</strong>{' '}
          No se cobra ninguna suscripción ni cuota de inscripción. La Empresa sostiene su actividad
          a través de acuerdos de afiliación con salas de póker online: cuando un alumno juega en
          las salas recomendadas por Ninja Poker Academy, la Empresa puede percibir una parte del
          rake generado por ese jugador. Este modelo es habitual en la industria de la educación de
          póker y en ningún caso supone un coste adicional para el alumno.
        </p>
        <p>
          El acceso a determinados contenidos exclusivos (material interno, sesiones grabadas,
          comunidad privada) se otorga por invitación tras un proceso de selección, y puede estar
          condicionado a que el alumno juegue en las salas de póker indicadas por la Empresa. Las
          condiciones específicas se comunicarán individualmente a cada alumno.
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
            <strong>Número de registro:</strong> [NÚMERO DE REGISTRO/RUC]
          </li>
          <li>
            <strong>Dirección:</strong> [DIRECCIÓN], Panamá
          </li>
          <li>
            <strong>Correo de contacto:</strong>{' '}
            <a href="mailto:[EMAIL DE CONTACTO]">[EMAIL DE CONTACTO]</a>
          </li>
        </ul>
      </section>

      <section id="acceso">
        <h2>4. Acceso, registro y comunidad</h2>
        <p>
          Ninja Poker Academy opera con un modelo de acceso por invitación. El proceso habitual es
          el siguiente:
        </p>
        <ol>
          <li>
            El interesado contacta con la Empresa a través de los canales disponibles (formulario
            web, Telegram, Instagram, TikTok u otras redes sociales).
          </li>
          <li>
            La Empresa evalúa el perfil del solicitante y, si procede, le comunica las condiciones
            de acceso.
          </li>
          <li>
            Si el interesado acepta las condiciones, se le facilita acceso al servidor de Discord
            privado donde se desarrolla la actividad educativa interna.
          </li>
        </ol>
        <p>Al acceder a la comunidad, el alumno se compromete a:</p>
        <ul>
          <li>Facilitar información veraz sobre su perfil de jugador.</li>
          <li>Mantener la confidencialidad de los accesos y no compartirlos con terceros.</li>
          <li>No difundir ni redistribuir el material exclusivo interno fuera de la comunidad.</li>
          <li>
            Respetar las normas de conducta de la comunidad y el código ético establecido por la
            Empresa.
          </li>
        </ul>
        <p>
          La Empresa se reserva el derecho de suspender o revocar el acceso a cualquier alumno que
          incumpla estas condiciones, sin derecho a compensación económica alguna dado que el acceso
          es gratuito.
        </p>
      </section>

      <section id="contenido">
        <h2>5. Contenido y servicios educativos</h2>

        <h3>5.1 Contenido público</h3>
        <p>
          Ninja Poker Academy publica contenido educativo de acceso libre en su canal de YouTube
          (@ninjapokeracademy), en su sitio web y en otras redes sociales. Este contenido es de
          carácter divulgativo y no requiere registro.
        </p>

        <h3>5.2 Contenido exclusivo interno</h3>
        <p>
          Los alumnos que formen parte de la comunidad tienen acceso a material adicional no
          publicado: clases en grupo en directo, revisiones de manos, análisis de estadísticas y
          seguimiento personalizado. Este material es de uso exclusivo para los miembros activos de
          la comunidad y no puede ser reproducido, distribuido ni compartido fuera de ella.
        </p>

        <h3>5.3 Grabación y uso de imagen</h3>
        <p>
          Las sesiones de grupo, revisiones de manos y tutorías pueden ser grabadas. Al participar
          en dichas sesiones, el alumno autoriza expresamente a Ninja Poker Academy a grabar, editar
          y publicar el contenido generado —incluyendo su nombre de usuario, nick, avatar o imagen—
          en el canal de YouTube, redes sociales u otros medios de la Empresa, con fines educativos
          y promocionales.
        </p>
        <p>
          Si un alumno no desea aparecer en contenido publicado, debe comunicarlo expresamente antes
          de cada sesión.
        </p>

        <h3>5.4 Sin garantía de resultados</h3>
        <p>
          El contenido educativo se ofrece con fines formativos. Ninja Poker Academy no garantiza
          resultados económicos derivados de la aplicación de las estrategias enseñadas. El póker
          involucra elementos de habilidad y azar, y los resultados individuales dependen de
          múltiples factores fuera del control de la Empresa.
        </p>
      </section>

      <section id="bancaje">
        <h2>6. Bancaje</h2>
        <p>
          El servicio de bancaje es un acuerdo opcional e independiente de la formación educativa.
          Consiste en que la Empresa financia total o parcialmente el bankroll de un alumno para que
          juegue en determinadas salas y límites, a cambio de un porcentaje de las ganancias
          acordado individualmente.
        </p>
        <p>
          Las condiciones del bancaje (porcentaje de ganancias, límites de juego, salas autorizadas,
          condiciones de salida y otros términos) se establecen mediante un acuerdo escrito entre la
          Empresa y el alumno antes del inicio del mismo. Dicho acuerdo prevalece sobre cualquier
          disposición general de estos Términos y Condiciones en lo que respecta al bancaje.
        </p>
        <p>
          El acceso al programa de bancaje no está garantizado y queda a discreción exclusiva de la
          Empresa según el perfil, historial y evolución del alumno.
        </p>
      </section>

      <section id="propiedad">
        <h2>7. Propiedad intelectual</h2>
        <p>
          Todos los contenidos del sitio web (textos, imágenes, vídeos, logotipos, diseño gráfico,
          código fuente y cualquier otro elemento) son propiedad de{' '}
          <strong>[NOMBRE DE LA EMPRESA]</strong> o de sus legítimos licenciantes, y están
          protegidos por la normativa vigente en materia de propiedad intelectual e industrial.
        </p>
        <p>
          Queda expresamente prohibido reproducir, distribuir, comunicar públicamente, transformar o
          utilizar el contenido del sitio —especialmente el material exclusivo interno— con fines
          comerciales o de difusión sin autorización previa y por escrito de la Empresa. El uso
          personal y no comercial del contenido público está permitido siempre que se respete la
          autoría.
        </p>
        <p>
          El incumplimiento de esta cláusula podrá suponer la revocación inmediata del acceso a la
          comunidad y el ejercicio de las acciones legales que correspondan.
        </p>
      </section>

      <section id="conducta">
        <h2>8. Conducta del usuario</h2>
        <p>El usuario se compromete a no utilizar el sitio ni la comunidad para:</p>
        <ul>
          <li>
            Llevar a cabo actividades ilegales o contrarias a la moral, el orden público o la buena
            fe.
          </li>
          <li>
            Difundir contenido ofensivo, discriminatorio, difamatorio o que atente contra la
            dignidad de las personas.
          </li>
          <li>Intentar acceder de forma no autorizada a sistemas o bases de datos del sitio.</li>
          <li>Introducir virus, malware u otro software dañino.</li>
          <li>
            Captar alumnos o clientes en beneficio propio aprovechando los canales de la comunidad.
          </li>
          <li>
            Compartir estrategias, materiales o información exclusiva interna fuera de la comunidad.
          </li>
          <li>
            Realizar scraping, extracción masiva de datos o cualquier acción que pueda perjudicar el
            funcionamiento del sitio.
          </li>
        </ul>
      </section>

      <section id="afiliacion">
        <h2>9. Enlaces de afiliación y terceros</h2>
        <p>
          El sitio web y los canales de Ninja Poker Academy pueden contener enlaces a salas de póker
          online y otros servicios de terceros. Algunos de estos enlaces son enlaces de afiliación,
          lo que significa que la Empresa puede percibir una comisión si el usuario se registra o
          realiza actividad a través de ellos. Esto no supone ningún coste adicional para el
          usuario.
        </p>
        <p>
          Ninja Poker Academy no es responsable del contenido, prácticas o políticas de privacidad
          de los sitios de terceros enlazados. El acceso a dichos sitios se realiza bajo la
          exclusiva responsabilidad del usuario.
        </p>
      </section>

      <section id="responsabilidad">
        <h2>10. Limitación de responsabilidad</h2>
        <p>
          La Empresa no garantiza la disponibilidad continua e ininterrumpida del sitio, ni la
          ausencia de errores en el contenido. En la medida máxima permitida por la ley aplicable:
        </p>
        <ul>
          <li>
            La Empresa no será responsable de daños derivados del uso o imposibilidad de uso del
            sitio.
          </li>
          <li>
            El contenido educativo se ofrece «tal cual» y no constituye asesoramiento financiero,
            legal ni garantía de resultados en el juego.
          </li>
          <li>
            La Empresa no asume responsabilidad por pérdidas económicas derivadas de la actividad
            del usuario en salas de póker, incluso cuando dicha actividad haya sido motivada por el
            contenido educativo de Ninja Poker Academy.
          </li>
          <li>
            La Empresa no controla los sitios web de terceros a los que enlaza y no asume
            responsabilidad por su contenido o prácticas.
          </li>
        </ul>
      </section>

      <section id="modificaciones">
        <h2>11. Modificaciones</h2>
        <p>
          La Empresa se reserva el derecho de modificar estos Términos y Condiciones en cualquier
          momento. Los cambios serán efectivos desde su publicación en el sitio. El uso continuado
          del sitio o de la comunidad tras la publicación de los cambios implica la aceptación de
          los nuevos términos.
        </p>
      </section>

      <section id="ley">
        <h2>12. Ley aplicable y jurisdicción</h2>
        <p>
          Los presentes Términos y Condiciones se rigen por la legislación de{' '}
          <strong>[PAÍS]</strong>. Para la resolución de cualquier controversia derivada de su
          interpretación o aplicación, las partes se someten, con renuncia expresa a cualquier otro
          fuero, a los juzgados y tribunales competentes de <strong>[PAÍS]</strong>, salvo que la
          normativa de protección al consumidor aplicable establezca otro fuero en beneficio del
          usuario.
        </p>
      </section>

      <section id="contacto">
        <h2>13. Contacto</h2>
        <p>
          Para cualquier consulta sobre estos Términos y Condiciones, puedes contactarnos en{' '}
          <a href="mailto:[EMAIL DE CONTACTO]">[EMAIL DE CONTACTO]</a> o a través del formulario
          disponible en <a href="/contacto">ninjapokeracademy.com/contacto</a>.
        </p>
      </section>
    </LegalLayout>
  )
}
