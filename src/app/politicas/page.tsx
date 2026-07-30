import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { JSX } from 'react'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Clic Pilates',
  description:
    'Cómo Clic Pilates recolecta, usa y protege tus datos personales en la app y el sitio.',
  alternates: { canonical: '/politicas' },
  robots: { index: true, follow: true }
}

const ULTIMA_ACTUALIZACION = '30 de julio de 2026'
const EMAIL_CONTACTO = 'info@clicpilates.com'

function Section ({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}): JSX.Element {
  return (
    <section className='mt-10'>
      <h2 className='text-xl font-semibold mb-3'>{title}</h2>
      <div className='space-y-3 text-muted-foreground leading-relaxed'>
        {children}
      </div>
    </section>
  )
}

export default function PoliticasPage (): JSX.Element {
  return (
    <main className='bg-background text-accent min-h-screen'>
      <div className='max-w-2xl mx-auto px-5 py-16'>
        <Link
          href='/'
          className='inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-colors'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Volver al inicio
        </Link>

        <h1 className='text-3xl md:text-4xl font-bold mt-8'>
          Política de Privacidad
        </h1>
        <p className='text-sm text-muted-foreground mt-2'>
          Última actualización: {ULTIMA_ACTUALIZACION}
        </p>

        <Section title='1. Responsable del tratamiento'>
          <p>
            La aplicación móvil <strong>Clic Pilates</strong> (la “App”) y este
            sitio son operados por <strong>Lucas Fradusco</strong>, CUIT
            20-35378060-4, con domicilio en Av. 12 de Octubre 2961, B1664 Manuel
            Alberti, Provincia de Buenos Aires, Argentina.
          </p>
          <p>
            Por cualquier consulta sobre esta política o sobre tus datos
            personales, escribinos a{' '}
            <a
              href={`mailto:${EMAIL_CONTACTO}`}
              className='underline hover:no-underline'
            >
              {EMAIL_CONTACTO}
            </a>
            .
          </p>
        </Section>

        <Section title='2. Qué datos recolectamos'>
          <p>
            Recolectamos únicamente los datos necesarios para prestarte el
            servicio como socio de nuestros estudios:
          </p>
          <ul className='list-disc pl-5 space-y-2'>
            <li>
              <strong>Datos de cuenta e identificación:</strong> nombre y
              apellido, email y contraseña (almacenada de forma cifrada, nunca en
              texto plano).
            </li>
            <li>
              <strong>Datos de perfil (opcionales):</strong> teléfono, documento
              (DNI), sexo, dirección, fecha de nacimiento y foto de perfil.
            </li>
            <li>
              <strong>Autorización de menores (cuando corresponde):</strong>{' '}
              datos y foto del documento del adulto responsable/tutor, a los
              efectos de la autorización legal del menor.
            </li>
            <li>
              <strong>Datos de uso y del dispositivo:</strong> identificador de
              instalación/dispositivo, eventos de uso y pantallas visitadas (a
              través de Firebase Analytics), y un identificador para el envío de
              notificaciones push.
            </li>
            <li>
              <strong>Información de pagos:</strong> mostramos tu historial de
              pagos (fecha, plan, monto, estado). La App no recolecta ni almacena
              datos de tus tarjetas; los pagos se procesan a través de Mercado
              Pago, sujeto a su propia política de privacidad.
            </li>
          </ul>
        </Section>

        <Section title='3. Con qué finalidad los usamos'>
          <ul className='list-disc pl-5 space-y-2'>
            <li>Crear y gestionar tu cuenta y tu perfil de socio.</li>
            <li>
              Permitirte reservar clases, ver tu estado de cuenta y las novedades
              de tu sede.
            </li>
            <li>Autenticarte y permitirte recuperar tu contraseña.</li>
            <li>
              Enviarte notificaciones relacionadas con tu actividad (lista de
              espera, vencimientos, novedades, cancelaciones de clases). Podés
              administrar tus preferencias desde la App.
            </li>
            <li>Gestionar la autorización de menores cuando corresponde.</li>
            <li>
              Entender de forma agregada cómo se usa la App para mejorarla.
            </li>
          </ul>
        </Section>

        <Section title='4. Base legal'>
          <p>
            Tratamos tus datos sobre la base de tu consentimiento al registrarte y
            usar la App, y en cumplimiento de la relación contractual que nos
            vincula como socio. El tratamiento se realiza conforme a la Ley 25.326
            de Protección de los Datos Personales de la República Argentina y su
            normativa complementaria.
          </p>
        </Section>

        <Section title='5. Con quién compartimos datos'>
          <p>
            No vendemos tus datos personales. Los compartimos únicamente con
            proveedores que nos permiten operar el servicio:
          </p>
          <ul className='list-disc pl-5 space-y-2'>
            <li>
              <strong>Mercado Pago</strong> — procesamiento de pagos.
            </li>
            <li>
              <strong>Google / Firebase</strong> — envío de notificaciones push y
              analítica de uso.
            </li>
            <li>
              <strong>Expo</strong> — infraestructura de envío de notificaciones
              push.
            </li>
          </ul>
          <p>
            Estos proveedores tratan los datos según sus propias políticas y solo
            para las finalidades indicadas.
          </p>
        </Section>

        <Section title='6. Conservación'>
          <p>
            Conservamos tus datos mientras mantengas tu cuenta activa y durante
            los plazos legales aplicables. Si solicitás la baja de tu cuenta,
            eliminamos o anonimizamos tus datos personales, salvo aquellos que
            debamos conservar por obligación legal (por ejemplo, registros de
            facturación).
          </p>
        </Section>

        <Section title='7. Tus derechos'>
          <p>
            Como titular de los datos, tenés derecho a acceder, rectificar,
            actualizar y suprimir tus datos personales. Para ejercerlos,
            escribinos a{' '}
            <a
              href={`mailto:${EMAIL_CONTACTO}`}
              className='underline hover:no-underline'
            >
              {EMAIL_CONTACTO}
            </a>
            .
          </p>
          <p>
            Podés eliminar tu cuenta y tus datos desde la App (Perfil →
            Configuración → Eliminar mi cuenta). También podés solicitar la baja,
            sin necesidad de la App, escribiendo a{' '}
            <a
              href={`mailto:${EMAIL_CONTACTO}`}
              className='underline hover:no-underline'
            >
              {EMAIL_CONTACTO}
            </a>
            . En ambos casos eliminamos tus datos personales y de salud, y
            desactivamos tu acceso; conservamos únicamente el historial de pagos
            de-identificado por obligación legal.
          </p>
          <p>
            La Agencia de Acceso a la Información Pública, órgano de control de la
            Ley 25.326, tiene la atribución de atender denuncias y reclamos
            relativos al incumplimiento de las normas sobre protección de datos
            personales.
          </p>
        </Section>

        <Section title='8. Menores de edad'>
          <p>
            La App puede ser utilizada por menores de edad con la autorización de
            su adulto responsable/tutor, quien provee su documento a los efectos
            legales. No recolectamos datos de menores de forma independiente al
            vínculo con su sede y su tutor.
          </p>
        </Section>

        <Section title='9. Seguridad'>
          <p>
            Aplicamos medidas técnicas y organizativas razonables para proteger
            tus datos. La comunicación entre la App y nuestros servidores se
            realiza cifrada (HTTPS) y las contraseñas se almacenan con hash.
          </p>
        </Section>

        <Section title='10. Cambios en esta política'>
          <p>
            Podemos actualizar esta política. Publicaremos la versión vigente en
            esta misma URL, indicando la fecha de última actualización.
          </p>
        </Section>

        <Section title='11. Contacto'>
          <p>
            Lucas Fradusco — CUIT 20-35378060-4 — Av. 12 de Octubre 2961, B1664
            Manuel Alberti, Provincia de Buenos Aires, Argentina —{' '}
            <a
              href={`mailto:${EMAIL_CONTACTO}`}
              className='underline hover:no-underline'
            >
              {EMAIL_CONTACTO}
            </a>
            .
          </p>
        </Section>
      </div>
    </main>
  )
}
