import { Link } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import Seo from '../../components/Seo/Seo'
import { BUSINESS, WHATSAPP_LINK } from '../../data/business'
import './Contacto.css'

const tarjetas = [
  {
    icono: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
    titulo: 'Dirección',
    contenido: (
      <>
        {BUSINESS.address.line1}
        <br />
        {BUSINESS.address.line2}
      </>
    ),
    href: 'https://maps.google.com/?q=Av.+Providencia+1234,+Santiago',
  },
  {
    icono: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    titulo: 'Teléfono',
    contenido: BUSINESS.phoneDisplay,
    href: `tel:${BUSINESS.phone.replace(/\s/g, '')}`,
  },
  {
    icono: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    ),
    titulo: 'Correo',
    contenido: BUSINESS.email,
    href: `mailto:${BUSINESS.email}`,
  },
]

function Contacto() {
  return (
    <div className="page-contacto">
      <Seo
        title="Contacto | SALÓN DE BELLEZA SIEMPRE LINDA"
        description="Contacta con SALÓN DE BELLEZA SIEMPRE LINDA: dirección, teléfono, correo, horarios, WhatsApp y redes sociales. Te esperamos en el estudio."
      />

      <PageHeader
        subtitle="Contáctanos"
        title="Contacto"
        text="Estamos aquí para resolver tus dudas, asesorarte y ayudarte a agendar tu próxima cita. Elige el canal que prefieras."
      />

      {/* Contact cards */}
      <section className="section contacto-tarjetas">
        <div className="container">
          <div className="contacto-tarjetas__grid">
            {tarjetas.map((t) => (
              <a
                key={t.titulo}
                href={t.href}
                target={t.href.startsWith('http') ? '_blank' : undefined}
                rel={t.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="contacto-tarjeta"
              >
                <div className="contacto-tarjeta__icono">{t.icono}</div>
                <h2 className="contacto-tarjeta__titulo">{t.titulo}</h2>
                <p className="contacto-tarjeta__contenido">{t.contenido}</p>
              </a>
            ))}
            <div className="contacto-tarjeta">
              <div className="contacto-tarjeta__icono">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h2 className="contacto-tarjeta__titulo">Horario</h2>
              <p className="contacto-tarjeta__contenido">
                {BUSINESS.hours.map((h) => (
                  <span className="contacto-tarjeta__horario" key={h.day}>
                    {h.day}: {h.time}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp + redes */}
      <section className="section section--alt contacto-canales">
        <div className="container contacto-canales__inner">
          <h2 className="contacto-canales__title">Conecta con nosotros</h2>
          <p className="contacto-canales__text">
            Respuesta rápida por WhatsApp y contenido exclusivo en nuestras
            redes sociales.
          </p>
          <div className="contacto-canales__actions">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--gold"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
          </div>
          <div className="contacto-canales__social">
            <a
              href={BUSINESS.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="contacto-canales__social-link"
              aria-label="Instagram de SALÓN DE BELLEZA SIEMPRE LINDA"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <circle cx="12" cy="12" r="5"></circle>
                <circle cx="17.5" cy="6.5" r="1.5"></circle>
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href={BUSINESS.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="contacto-canales__social-link"
              aria-label="Facebook de SALÓN DE BELLEZA SIEMPRE LINDA"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span>Facebook</span>
            </a>
            <a
              href={BUSINESS.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="contacto-canales__social-link"
              aria-label="TikTok de SALÓN DE BELLEZA SIEMPRE LINDA"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              <span>TikTok</span>
            </a>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="contacto-mapa">
        <iframe
          title="Ubicación de SALÓN DE BELLEZA SIEMPRE LINDA"
          src={BUSINESS.mapEmbedUrl}
          className="contacto-mapa__frame"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* CTA */}
      <section className="section contacto-cta">
        <div className="container contacto-cta__inner">
          <h2 className="contacto-cta__title">¿Lista para tu próxima transformación?</h2>
          <p className="contacto-cta__text">
            Agenda tu cita online y reserva tu espacio en el estudio.
          </p>
          <Link to="/reservas" className="btn btn--gold">Reservar Cita</Link>
        </div>
      </section>
    </div>
  )
}

export default Contacto