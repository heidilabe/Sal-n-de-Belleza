import { Link } from 'react-router-dom'
import { getServiceBySlug } from '../../data/services'
import { GALLERY } from '../../data/gallery'
import { FEATURED_SLUGS, TESTIMONIALS, VALUES } from '../../data/home'
import Seo from '../../components/Seo/Seo'
import ImagePlaceholder from '../../components/ImagePlaceholder/ImagePlaceholder'
import salaSalon from '../../assets/images/experience/sala-salon.jpg'
import './Inicio.css'

const VALUE_ICONS = {
  star: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  award: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="6"></circle>
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"></path>
    </svg>
  ),
  sparkle: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2z" />
      <path d="M19 15l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9L19 15z" />
    </svg>
  ),
  vip: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
      <line x1="6" y1="1" x2="6" y2="4"></line>
      <line x1="10" y1="1" x2="10" y2="4"></line>
      <line x1="14" y1="1" x2="14" y2="4"></line>
    </svg>
  ),
}

function Inicio() {
  const serviciosDestacados = FEATURED_SLUGS
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean)

  const galeriaDestacada = GALLERY.slice(0, 6)

  return (
    <div className="page-inicio">
      <Seo
        title="SALÓN DE BELLEZA SIEMPRE LINDA | Salón de Belleza"
        description="SALÓN DE BELLEZA SIEMPRE LINDA, salón de belleza femenino de alta gama. Cortes, coloración, balayage, tratamientos capilares y peinados para eventos. Reserva tu cita online."
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero__overlay"></div>
        <div className="hero__content container">
          <span className="hero__badge">Salón de Belleza de Alta Gama</span>
          <h1 className="hero__title">
            Donde la belleza<br />
            se convierte en <em>arte</em>
          </h1>
          <p className="hero__subtitle">
            Descubre una experiencia exclusiva de belleza y bienestar diseñada
            solo para ti. Nuestros estilistas expertos transforman tu imagen con
            elegancia, precisión y sofisticación.
          </p>
          <div className="hero__actions">
            <Link to="/reservas" className="btn btn--gold">Reservar Cita</Link>
            <Link to="/servicios" className="btn btn--secondary hero__btn-secondary">
              Nuestros Servicios
            </Link>
          </div>
        </div>
        <div className="hero__scroll-indicator">
          <span>Scroll</span>
          <div className="hero__scroll-line"></div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-bar__grid">
            <div className="stats-bar__item">
              <span className="stats-bar__number">10+</span>
              <span className="stats-bar__label">Años de Trayectoria</span>
            </div>
            <div className="stats-bar__divider"></div>
            <div className="stats-bar__item">
              <span className="stats-bar__number">15.000+</span>
              <span className="stats-bar__label">Clientas Satisfechas</span>
            </div>
            <div className="stats-bar__divider"></div>
            <div className="stats-bar__item">
              <span className="stats-bar__number">100%</span>
              <span className="stats-bar__label">Garantía de Calidad</span>
            </div>
            <div className="stats-bar__divider"></div>
            <div className="stats-bar__item">
              <span className="stats-bar__number">4.9 ★</span>
              <span className="stats-bar__label">Puntuación Promedio</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="section featured-services">
        <div className="container">
          <div className="section__header">
            <span className="section__subtitle">Nuestras Especialidades</span>
            <h2 className="section__title">Servicios Destacados</h2>
            <div className="gold-line"></div>
            <p className="section__description">
              Tratamientos diseñados a medida con técnicas vanguardistas y los
              estándares más exigentes del estilismo profesional.
            </p>
          </div>

          <div className="featured-services__grid">
            {serviciosDestacados.map((item) => (
              <article className="featured-card" key={item.id}>
                <div className="featured-card__image-wrap">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="featured-card__image" loading="lazy" />
                  ) : (
                    <ImagePlaceholder label={item.name} />
                  )}
                  <span className="featured-card__badge">{item.category}</span>
                </div>
                <div className="featured-card__body">
                  <h3 className="featured-card__title">{item.name}</h3>
                  <p className="featured-card__desc">{item.description}</p>
                  <div className="featured-card__footer">
                    <span className="featured-card__price">{item.price}</span>
                    <Link to={`/reservas?servicio=${item.slug}`} className="featured-card__link">
                      Reservar
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="featured-services__more">
            <Link to="/servicios" className="btn btn--secondary">
              Ver Catálogo Completo de Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* The Experience Section */}
      <section className="section section--alt experience-section">
        <div className="container">
          <div className="experience-grid">
            <div className="experience-image-col">
              <div className="experience-image-card">
                <img
                  src={salaSalon}
                  alt="Espacio SALÓN DE BELLEZA SIEMPRE LINDA"
                  className="experience-image"
                />
                <div className="experience-badge-card">
                  <span className="experience-badge-number">100%</span>
                  <span className="experience-badge-text">Atención Premium y Personalizada</span>
                </div>
              </div>
            </div>

            <div className="experience-content-col">
              <span className="section__subtitle">La Experiencia Siempre Linda</span>
              <h2 className="section__title" style={{ textAlign: 'left' }}>
                Un santuario de belleza concebido para tu bienestar
              </h2>
              <div className="gold-line" style={{ margin: 'var(--space-md) 0 var(--space-xl)' }}></div>
              <p className="experience-lead">
                En SALÓN DE BELLEZA SIEMPRE LINDA transformamos cada cita en un ritual de
                autocuidado sensorial. Cada detalle de nuestro salón ha sido
                diseñado para ofrecer confort, privacidad y excelencia técnica.
              </p>

              <div className="experience-features">
                {VALUES.map((v) => (
                  <div className="experience-feature-item" key={v.titulo}>
                    <div className="experience-feature-icon">{VALUE_ICONS[v.icono]}</div>
                    <div>
                      <h4 className="experience-feature-title">{v.titulo}</h4>
                      <p className="experience-feature-desc">{v.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="experience-cta">
                <Link to="/nosotros" className="btn btn--primary">Conoce Nuestro Espacio</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Highlight Banner */}
      <section className="promo-banner">
        <div className="promo-banner__overlay"></div>
        <div className="container promo-banner__inner">
          <div className="promo-banner__content">
            <span className="promo-banner__tag">Promoción Especial del Mes</span>
            <h2 className="promo-banner__title">
              Balayage + Tratamiento Nutritivo de Alta Gama
            </h2>
            <p className="promo-banner__text">
              Reserva tu cita online durante esta semana y disfruta de un{' '}
              <strong>20% de descuento</strong> exclusivo con lavado exfoliante
              y secado couture de cortesía.
            </p>
            <div className="promo-banner__actions">
              <Link
                to="/reservas?servicio=balayage-babylight&promo=balayage-hidratacion"
                className="btn btn--gold"
              >
                Aprovechar Oferta
              </Link>
              <Link to="/promociones" className="btn btn--secondary" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>
                Ver Todas las Promociones
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section home-gallery-section">
        <div className="container">
          <div className="section__header">
            <span className="section__subtitle">Nuestro Trabajo</span>
            <h2 className="section__title">Galería Destacada</h2>
            <div className="gold-line"></div>
            <p className="section__description">
              Una mirada a los resultados reales de nuestros estilistas.
            </p>
          </div>

          {galeriaDestacada.length > 0 ? (
            <>
              <div className="home-gallery-grid">
                {galeriaDestacada.map((foto) => (
                  <Link to="/galeria" className="home-gallery-item" key={foto.id}>
                    <img
                      src={foto.src}
                      alt={foto.alt}
                      className="home-gallery-item__image"
                      loading="lazy"
                    />
                    <div className="home-gallery-item__overlay">
                      <span className="home-gallery-item__categoria">{foto.categoria}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="featured-services__more">
                <Link to="/galeria" className="btn btn--secondary">
                  Ver Galería Completa
                </Link>
              </div>
            </>
          ) : (
            <div className="home-gallery-empty">
              <ImagePlaceholder label="Galería próximamente" />
              <p className="home-gallery-empty__text">
                Muy pronto compartiremos aquí nuestras mejores creaciones.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section__header">
            <span className="section__subtitle">Voces de Confianza</span>
            <h2 className="section__title">Lo Que Dicen Nuestras Clientas</h2>
            <div className="gold-line"></div>
            <p className="section__description">
              La satisfacción y el brillo en la mirada de quienes confían en
              nuestras manos son nuestro mayor orgullo.
            </p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div className="testimonial-card" key={t.id}>
                <div className="testimonial-card__stars">
                  {'★'.repeat(t.estrellas)}
                </div>
                <p className="testimonial-card__quote">"{t.comentario}"</p>
                <div className="testimonial-card__author">
                  <img src={t.foto} alt={t.nombre} className="testimonial-card__avatar" />
                  <div>
                    <h4 className="testimonial-card__name">{t.nombre}</h4>
                    <span className="testimonial-card__service">{t.servicio}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-box__content">
              <span className="section__subtitle" style={{ color: 'var(--color-gold-light)' }}>Agenda Tu Cita</span>
              <h2 className="cta-box__title">¿Lista para vivir la transformación Siempre Linda?</h2>
              <p className="cta-box__desc">
                Reserva en pocos segundos o escríbenos directamente por WhatsApp
                para resolver cualquier consulta previa.
              </p>
              <div className="cta-box__actions">
                <Link to="/reservas" className="btn btn--gold">Reservar Turno Online</Link>
                <Link to="/contacto" className="btn btn--secondary" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>
                  Contáctanos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Inicio