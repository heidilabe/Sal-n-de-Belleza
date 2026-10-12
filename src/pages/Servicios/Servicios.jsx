import { Link } from 'react-router-dom'
import Seo from '../../components/Seo/Seo'
import './Servicios.css'

const CATEGORIAS_SERVICIOS = [
  {
    id: 'color',
    numero: '01',
    titulo: 'Color',
    descripcion: 'Balayage, babylights, highlights, color global, canas y tonalizante.',
    icono: '✦',
    items: [
      {
        nombre: 'Color completo',
        precio: 'Desde $40.000',
        descripcion: 'Coloración global personalizada para un tono uniforme y luminoso.',
        slug: 'color-completo',
      },
      {
        nombre: 'Cobertura de canas',
        precio: 'Desde $45.000',
        descripcion: 'Tratamiento focalizado para una cobertura 100% natural y duradera.',
        slug: 'cobertura-de-canas',
      },
      {
        nombre: 'Tonalizante',
        precio: 'Desde $30.000',
        descripcion: 'Baño de matiz para reavivar tonos y aportar brillo extremo.',
        slug: 'tonalizante',
      },
      {
        nombre: 'Contorno',
        precio: 'Desde $65.000',
        descripcion: 'Técnica de iluminación focalizada para enmarcar las facciones del rostro.',
        slug: 'contorno',
      },
      {
        nombre: 'Bloques',
        precio: 'Desde $70.000',
        descripcion: 'Coloración en contrastes definidos para looks modernos y definidos.',
        slug: 'bloques',
      },
      {
        nombre: 'Aclaraciones',
        precio: 'Desde $80.000',
        descripcion: 'Balayage, babylights, highlights y decoloraciones avanzadas.',
        slug: 'aclaraciones',
      },
      {
        nombre: 'Olaplex como aditivo',
        precio: 'Desde $30.000',
        descripcion: 'Protector y multiplicador de enlaces que previene el daño durante el color.',
        slug: 'olaplex-como-aditivo',
      },
    ],
  },
  {
    id: 'tratamientos',
    numero: '02',
    titulo: 'Tratamientos capilares',
    descripcion: 'Nutrición molecular, regeneración de enlaces y fórmulas icónicas para restaurar tu cabello.',
    icono: '✧',
    items: [
      {
        nombre: 'Acidic Color Gloss Redken',
        precio: '$36.000',
        descripcion: 'Tratamiento de brillo molecular con pH ácido que sella la cutícula capilar.',
        slug: 'acidic-color-gloss-redken',
      },
      {
        nombre: 'Rituales Kérastase',
        precio: 'Desde $38.000',
        descripcion: 'Experiencia sensorial de nutrición profunda con la icónica gama Kérastase.',
        slug: 'rituales-kerastase',
      },
      {
        nombre: 'Fusio Dose Kérastase',
        precio: '$40.000',
        descripcion: 'Fusión instantánea de concentrado y booster ultrapotente a tu medida.',
        slug: 'fusio-dose-kerastase',
      },
      {
        nombre: 'SOS Extreme Recovery Tigi',
        precio: '$40.000',
        descripcion: 'Rescate intensivo para cabellos dañados, devolviendo fuerza y resistencia.',
        slug: 'sos-extreme-recovery-tigi',
      },
      {
        nombre: 'Olaplex',
        precio: 'Desde $40.000',
        descripcion: 'Tratamiento reconstructor que reconecta los enlaces rotos de la fibra capilar.',
        slug: 'olaplex-tratamiento',
      },
      {
        nombre: 'Nano Botox',
        precio: 'Desde $42.000',
        descripcion: 'Relleno de masa capilar con ácido hialurónico: antifrizz y suavidad máxima.',
        slug: 'nano-botox',
      },
      {
        nombre: 'K18',
        precio: 'Desde $50.000',
        descripcion: 'Péptido bioactivo patentado que repara la queratina en solo 4 minutos.',
        slug: 'k18',
      },
      {
        nombre: 'Alisados',
        precio: 'Desde $30.000',
        descripcion: 'Alisado profesional semipermanente para un lacio sedoso y sin encrespamiento.',
        slug: 'alisados',
      },
    ],
  },
  {
    id: 'peinados',
    numero: '03',
    titulo: 'Peinados',
    descripcion: 'Lavado relajante, brushing impecable y peinados elegantes para toda ocasión.',
    icono: '✦',
    items: [
      {
        nombre: 'Lavado y secado',
        precio: 'Desde $14.000',
        descripcion: 'Lavado premium relajante finalizado con secado natural y prolijo.',
        slug: 'lavado-y-secado',
      },
      {
        nombre: 'Brushing',
        precio: 'Desde $18.000',
        descripcion: 'Modelado con cepillo térmico para volumen, movimiento o liso pulido.',
        slug: 'brushing',
      },
      {
        nombre: 'Peinado',
        precio: 'Desde $35.000',
        descripcion: 'Ondas al agua, semirrecogidos y recogidos de autor para eventos.',
        slug: 'peinado',
      },
    ],
  },
  {
    id: 'cortes',
    numero: '04',
    titulo: 'Cortes de pelo',
    descripcion: 'Diseño y corte personalizado adaptado a las facciones de tu rostro y tu textura.',
    icono: '✧',
    items: [
      {
        nombre: 'Largo escalado',
        descripcion: 'Capas que aportan movimiento al cabello largo.',
        precio: 'Consultar valor',
        slug: 'largo-escalado',
        isCorte: true,
      },
      {
        nombre: 'Shaggy',
        descripcion: 'Corte con capas marcadas, textura y estilo moderno.',
        precio: 'Consultar valor',
        slug: 'shaggy',
        isCorte: true,
      },
      {
        nombre: 'Bob',
        descripcion: 'Media melena, con acabado recto o ligeramente graduado.',
        precio: 'Consultar valor',
        slug: 'bob',
        isCorte: true,
      },
      {
        nombre: 'Midi',
        descripcion: 'Corte a media altura, versátil y adaptable a distintas texturas.',
        precio: 'Consultar valor',
        slug: 'midi',
        isCorte: true,
      },
      {
        nombre: 'Flequillo cortina',
        descripcion: 'Flequillo abierto que enmarca el rostro.',
        precio: 'Consultar valor',
        slug: 'flequillo-cortina',
        isCorte: true,
      },
    ],
  },
]

function Servicios() {
  const getBookingUrl = (item) => {
    if (item.precio === 'Consultar valor') {
      const msg = encodeURIComponent(
        `Hola, me gustaría consultar el valor del servicio de corte de pelo "${item.nombre}" en Salón de Belleza Siempre Linda.`
      )
      return `https://wa.me/56912345678?text=${msg}`
    }
    return `/reservas?servicio=${item.slug}`
  }

  return (
    <div className="servicios-page-dark">
      <Seo
        title="Nuestros servicios | SALÓN DE BELLEZA SIEMPRE LINDA"
        description="Lista completa y estructurada de servicios capilares y precios: Color, Tratamientos Capilares, Peinados y Cortes de pelo en Salón Siempre Linda."
      />

      {/* Hero Header */}
      <header className="servicios-hero">
        <div className="container">
          <div className="servicios-hero__content">
            <span className="servicios-hero__badge">Carta de Servicios & Precios</span>
            <h1 className="servicios-hero__title">Nuestros servicios</h1>
            <div className="servicios-hero__divider">
              <span className="divider-line"></span>
              <span className="divider-diamond">◆</span>
              <span className="divider-line"></span>
            </div>
            <p className="servicios-hero__subtitle">
              Belleza, color y cuidado personalizado para tu cabello.
            </p>
          </div>

          {/* Quick jump anchor links */}
          <nav className="servicios-quicknav" aria-label="Navegación de categorías">
            {CATEGORIAS_SERVICIOS.map((cat) => (
              <a
                key={cat.id}
                href={`#categoria-${cat.id}`}
                className="servicios-quicknav__link"
              >
                <span className="quicknav-num">{cat.numero}</span>
                <span className="quicknav-title">{cat.titulo}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Container con las Tarjetas de Categorías */}
      <main className="servicios-main-container">
        <div className="container">
          <div className="servicios-cards-grid">
            {CATEGORIAS_SERVICIOS.map((categoria) => (
              <section
                key={categoria.id}
                id={`categoria-${categoria.id}`}
                className="categoria-card"
              >
                {/* Header de la tarjeta */}
                <div className="categoria-card__header">
                  <div className="categoria-card__badge-row">
                    <span className="categoria-card__badge">
                      CATEGORÍA {categoria.numero}
                    </span>
                    <span className="categoria-card__icon">{categoria.icono}</span>
                  </div>
                  <h2 className="categoria-card__title">{categoria.titulo}</h2>
                  {categoria.descripcion && (
                    <p className="categoria-card__desc">{categoria.descripcion}</p>
                  )}
                  <div className="categoria-card__sep"></div>
                </div>

                {/* Lista directa y estructurada de servicios */}
                <div className="categoria-card__list">
                  {categoria.items.map((item, idx) => {
                    const isConsultar = item.precio === 'Consultar valor'
                    const actionHref = getBookingUrl(item)

                    return (
                      <article key={idx} className="servicio-item-row">
                        <div className="servicio-item-row__main">
                          <div className="servicio-item-row__info">
                            <h3 className="servicio-item-row__name">
                              {item.nombre}
                              {item.isCorte && (
                                <span className="servicio-item-row__tag">
                                  Corte & Asesoría
                                </span>
                              )}
                            </h3>
                            {item.descripcion && (
                              <p className="servicio-item-row__desc">
                                {item.descripcion}
                              </p>
                            )}
                          </div>

                          {/* Línea punteada decorativa entre nombre y precio */}
                          <div className="servicio-item-row__leader" aria-hidden="true"></div>

                          {/* Precio a la derecha */}
                          <div className="servicio-item-row__price-box">
                            <span
                              className={`servicio-item-row__price ${
                                isConsultar ? 'servicio-item-row__price--consult' : ''
                              }`}
                            >
                              {item.precio}
                            </span>
                          </div>
                        </div>

                        {/* Botón de acción */}
                        <div className="servicio-item-row__action">
                          {isConsultar ? (
                            <a
                              href={actionHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="servicio-item-row__btn servicio-item-row__btn--whatsapp"
                              title={`Consultar por WhatsApp sobre ${item.nombre}`}
                            >
                              Consultar
                            </a>
                          ) : (
                            <Link
                              to={actionHref}
                              className="servicio-item-row__btn servicio-item-row__btn--reserva"
                              title={`Reservar cita para ${item.nombre}`}
                            >
                              Reservar
                            </Link>
                          )}
                        </div>
                      </article>
                    )
                  })}
                </div>

                {/* Footer de tarjeta */}
                <div className="categoria-card__footer">
                  <Link
                    to="/reservas"
                    className="categoria-card__cta-btn"
                  >
                    <span>Agendar en {categoria.titulo}</span>
                    <span className="cta-arrow">→</span>
                  </Link>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      {/* CTA Inferior Elegante */}
      <section className="servicios-banner-cta">
        <div className="container">
          <div className="servicios-banner-cta__box">
            <span className="servicios-banner-cta__pre">Atención Exclusiva</span>
            <h2 className="servicios-banner-cta__title">
              ¿Deseas una evaluación personalizada para tu cabello?
            </h2>
            <p className="servicios-banner-cta__text">
              Nuestras profesionales te asesorarán para seleccionar el tratamiento, color o corte ideal según las necesidades de tu fibra capilar.
            </p>
            <div className="servicios-banner-cta__actions">
              <Link to="/reservas" className="servicios-cta-btn servicios-cta-btn--gold">
                Reservar Mi Cita
              </Link>
              <a
                href="https://wa.me/56912345678?text=Hola,%20deseo%20hacer%20una%20consulta%20sobre%20los%20servicios%20del%20salón."
                target="_blank"
                rel="noopener noreferrer"
                className="servicios-cta-btn servicios-cta-btn--outline"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Servicios