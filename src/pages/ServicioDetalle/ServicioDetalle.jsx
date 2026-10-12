import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { getServiceBySlug } from '../../data/services'
import PageHeader from '../../components/PageHeader/PageHeader'
import Seo from '../../components/Seo/Seo'
import ImagePlaceholder from '../../components/ImagePlaceholder/ImagePlaceholder'
import { WHATSAPP_LINK } from '../../data/business'
import './ServicioDetalle.css'

function ServicioDetalle() {
  const { slug } = useParams()
  const servicio = getServiceBySlug(slug)
  const [selected, setSelected] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (!servicio) {
    return (
      <div className="page-servicio-detalle">
        <Seo
          title="Servicio no encontrado | SALÓN DE BELLEZA SIEMPRE LINDA"
          description="El servicio solicitado no existe. Revisa nuestro catálogo completo."
        />
        <PageHeader
          subtitle="Nuestros Servicios"
          title="Servicio no encontrado"
          text={`No encontramos el servicio «${slug}». Consulta nuestro catálogo completo.`}
        />
        <section className="section servicio-detalle-section">
          <div className="container">
            <div className="servicio-detalle__notfound">
              <Link to="/servicios" className="btn btn--primary">
                Ver todos los servicios
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  const fotos = Array.isArray(servicio.images) ? servicio.images : []

  return (
    <div className="page-servicio-detalle">
      <Seo
        title={`${servicio.name} | SALÓN DE BELLEZA SIEMPRE LINDA`}
        description={servicio.description}
      />

      <PageHeader
        subtitle={servicio.category}
        title={servicio.name}
        text={servicio.description}
      />

      <section className="section servicio-detalle-section">
        <div className="container">
          <div className="servicio-detalle-grid">
            <div className="servicio-detalle-info">
              <div className="servicio-detalle-meta">
                <div className="servicio-detalle-meta__item">
                  <span className="servicio-detalle-meta__label">Duración</span>
                  <span className="servicio-detalle-meta__value">
                    {servicio.duration}
                  </span>
                </div>
                <div className="servicio-detalle-meta__item">
                  <span className="servicio-detalle-meta__label">Precio</span>
                  <span className="servicio-detalle-meta__value">
                    {servicio.price}
                  </span>
                </div>
              </div>
              {servicio.nota && (
                <p className="servicio-detalle-info__nota">{servicio.nota}</p>
              )}
              <div className="servicio-detalle-info__ctas">
                <Link
                  to={`/reservas?servicio=${servicio.slug}`}
                  className="btn btn--primary"
                >
                  Reservar este servicio
                </Link>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary"
                >
                  Consultar por WhatsApp
                </a>
              </div>
              <Link to="/servicios" className="servicio-detalle-info__back">
                ← Volver a servicios
              </Link>
            </div>

            <div className="servicio-detalle-galeria">
              {fotos.length > 0 ? (
                <>
                  <button
                    type="button"
                    className="servicio-detalle-galeria__destacada"
onClick={() => {
                      setSelected(0)
                      setLightboxOpen(true)
                    }}
                    aria-label="Ampliar fotografía"
                  >
                    <img
                      src={fotos[0]}
                      alt={servicio.name}
                      className="servicio-detalle-galeria__img"
                    />
                    <span className="servicio-detalle-galeria__zoom">
                      Ampliar
                    </span>
                  </button>
                  <div className="servicio-detalle-galeria__grid">
                    {fotos.map((foto, index) => (
                      <button
                        type="button"
                        key={`${servicio.slug}-${index}`}
                        className={`servicio-detalle-galeria__thumb${
                          index === selected ? ' is-active' : ''
                        }`}
                        onClick={() => setSelected(index)}
                        aria-label={`Ver fotografía ${index + 1} de ${
                          servicio.name
                        }`}
                      >
                        <img
                          src={foto}
                          alt={`${servicio.name} - fotografía ${index + 1}`}
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <ImagePlaceholder label={servicio.name} />
              )}
            </div>
          </div>
        </div>
      </section>

      {lightboxOpen && fotos.length > 0 && (
        <div
          className="lightbox"
          onClick={() => setLightboxOpen(false)}
          role="presentation"
        >
          <button
            type="button"
            className="lightbox__close"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxOpen(false)
            }}
            aria-label="Cerrar"
          >
            ×
          </button>
          <img
            className="lightbox__img"
            src={fotos[selected]}
            alt={`${servicio.name} ampliada`}
          />
        </div>
      )}
    </div>
  )
}

export default ServicioDetalle