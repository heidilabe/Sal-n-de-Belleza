import { Link } from 'react-router-dom'
import { PROMOTIONS } from '../../data/promotions'
import PageHeader from '../../components/PageHeader/PageHeader'
import PromotionCard from '../../components/PromotionCard/PromotionCard'
import Seo from '../../components/Seo/Seo'
import './Promociones.css'

function Promociones() {
  return (
    <div className="page-promociones">
      <Seo
        title="Promociones | SALÓN DE BELLEZA SIEMPRE LINDA"
        description="Promociones vigentes de SALÓN DE BELLEZA SIEMPRE LINDA: balayage + hidratación, corte + brushing, color + tratamiento y packs para eventos. Reserva tu cita online."
      />

      <PageHeader
        subtitle="Ofertas Especiales"
        title="Promociones"
        text="Packs de servicios seleccionados con una relación de valor excepcional. Aprovecha estas ofertas antes de que terminen."
      />

      <section className="section promociones-grid-section">
        <div className="container">
          <div className="promociones-grid">
            {PROMOTIONS.map((promocion, index) => (
              <PromotionCard key={promocion.id} promocion={promocion} index={index} />
            ))}
          </div>

          <div className="promociones-bottom-cta">
            <p>
              ¿Quieres una promoción a tu medida? Cuéntanos qué buscas y
              armaremos un pack personalizado.
            </p>
            <Link to="/contacto" className="btn btn--secondary">Consultar</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Promociones