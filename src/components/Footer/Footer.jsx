import { Link } from 'react-router-dom'
import { BUSINESS, WHATSAPP_LINK } from '../../data/business'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      {/* Top decorative line */}
      <div className="footer__accent-line"></div>

      <div className="footer__main container">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-accent">S</span>ALÓN DE BELLEZA
              <span className="footer__logo-divider">|</span>
              <span className="footer__logo-tagline">Siempre Linda</span>
            </Link>
            <p className="footer__brand-text">
              Un espacio dedicado a la belleza contemporánea, donde la
              sofisticación se encuentra con la expertise profesional para
              transformar tu imagen con elegancia.
            </p>
            <div className="footer__social">
              <a
                href={BUSINESS.social.instagram}
                className="footer__social-link"
                aria-label="Instagram de SALÓN DE BELLEZA SIEMPRE LINDA"
                target="_blank"
                rel="noopener noreferrer"
                id="social-instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <circle cx="12" cy="12" r="5"></circle>
                  <circle cx="17.5" cy="6.5" r="1.5"></circle>
                </svg>
              </a>
              <a
                href={BUSINESS.social.facebook}
                className="footer__social-link"
                aria-label="Facebook de SALÓN DE BELLEZA SIEMPRE LINDA"
                target="_blank"
                rel="noopener noreferrer"
                id="social-facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href={BUSINESS.social.tiktok}
                className="footer__social-link"
                aria-label="TikTok de SALÓN DE BELLEZA SIEMPRE LINDA"
                target="_blank"
                rel="noopener noreferrer"
                id="social-tiktok"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href={WHATSAPP_LINK}
                className="footer__social-link"
                aria-label="Escríbenos por WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                id="social-whatsapp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__column">
            <h4 className="footer__column-title">Navegación</h4>
            <nav className="footer__links" aria-label="Enlaces de navegación">
              <Link to="/" className="footer__link">Inicio</Link>
              <Link to="/servicios" className="footer__link">Servicios</Link>
              <Link to="/nosotros" className="footer__link">Nosotros</Link>
              <Link to="/galeria" className="footer__link">Galería</Link>
              <Link to="/promociones" className="footer__link">Promociones</Link>
              <Link to="/reservas" className="footer__link">Reservar Cita</Link>
            </nav>
          </div>

          {/* Services */}
          <div className="footer__column">
            <h4 className="footer__column-title">Servicios</h4>
            <nav className="footer__links" aria-label="Servicios destacados">
              <Link to="/servicios" className="footer__link">Cortes de Cabello</Link>
              <Link to="/servicios" className="footer__link">Coloración Premium</Link>
              <Link to="/servicios" className="footer__link">Balayage y Mechas</Link>
              <Link to="/servicios" className="footer__link">Tratamientos Capilares</Link>
              <Link to="/servicios" className="footer__link">Peinados y Recogidos</Link>
              <Link to="/servicios" className="footer__link">Manicura y Pedicura</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="footer__column">
            <h4 className="footer__column-title">Contacto</h4>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{BUSINESS.address.line1}<br />{BUSINESS.address.line2}</span>
              </div>
              <div className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>{BUSINESS.phoneDisplay}</span>
              </div>
              <div className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>
                  {BUSINESS.hours.map((h) => (
                    <span key={h.day}>{h.day}: {h.time}<br /></span>
                  ))}
                </span>
              </div>
              <div className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a href={`mailto:${BUSINESS.email}`} className="footer__link footer__link--inline">
                  {BUSINESS.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">
            © {currentYear} {BUSINESS.fullName}. Todos los derechos reservados.
          </p>
          <p className="footer__disclaimer">
            Sitio web demostrativo — Proyecto de portafolio profesional.
            {' | '}
            <Link to="/login" className="footer__link footer__link--inline">Acceso Administrador</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer