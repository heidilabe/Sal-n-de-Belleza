import { Link } from 'react-router-dom'
import { getServiceBySlug } from '../../data/services'
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder'
import './PromotionCard.css'

function PromotionCard({ promocion, index = 0 }) {
  const servicio = getServiceBySlug(promocion.servicioSlug)

  return (
    <article className="promo-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="promo-card__image-wrapper">
        {servicio?.image ? (
          <img
            src={servicio.image}
            alt={promocion.nombre}
            className="promo-card__image"
            loading="lazy"
          />
        ) : (
          <ImagePlaceholder label={promocion.nombre} />
        )}
        <span className="promo-card__tag">Promoción</span>
      </div>
      <div className="promo-card__body">
        <h3 className="promo-card__nombre">{promocion.nombre}</h3>
        <p className="promo-card__descripcion">{promocion.descripcion}</p>
        <div className="promo-card__precio-row">
          {promocion.precioAnterior && (
            <span className="promo-card__precio-before">{promocion.precioAnterior}</span>
          )}
          <span className="promo-card__precio">{promocion.precio}</span>
        </div>
        <span className="promo-card__vigencia">{promocion.vigencia}</span>
        <Link
          to={`/reservas?servicio=${promocion.servicioSlug}&promo=${promocion.slug}`}
          className="promo-card__cta"
        >
          Reservar
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

export default PromotionCard