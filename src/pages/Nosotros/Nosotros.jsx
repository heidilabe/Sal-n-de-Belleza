import { Link } from 'react-router-dom'
import { TEAM } from '../../data/team'
import { GALLERY } from '../../data/gallery'
import PageHeader from '../../components/PageHeader/PageHeader'
import SectionTitle from '../../components/SectionTitle/SectionTitle'
import Seo from '../../components/Seo/Seo'
import './Nosotros.css'

const pilares = [
  {
    numero: '01',
    titulo: 'Arte y Técnica',
    descripcion:
      'Cada estilo nace de un estudio anatómico del rostro y de la textura natural del cabello. La técnica es nuestro lenguaje.',
  },
  {
    numero: '02',
    titulo: 'Excelencia en el Detalle',
    descripcion:
      'Desde el diagnóstico capilar hasta el último toque de acabado, cuidamos cada milímetro de tu experiencia.',
  },
  {
    numero: '03',
    titulo: 'Confianza y Bienestar',
    descripcion:
      'Trabajamos en un ambiente tranquilo y privado donde tu tiempo y tu cabello reciben atención única e individual.',
  },
]

function Nosotros() {
  const historiaImagenes = GALLERY.slice(0, 2)

  return (
    <div className="page-nosotros">
      <Seo
        title="Nosotros | SALÓN DE BELLEZA SIEMPRE LINDA"
        description="Conoce la historia detrás de SALÓN DE BELLEZA SIEMPRE LINDA: nuestra filosofía, valores, equipo de estilistas certificados y atención personalizada."
      />

      <PageHeader
        subtitle="Nuestra Historia"
        title="Sobre Nosotros"
        text="SALÓN DE BELLEZA SIEMPRE LINDA nació de una convicción: la belleza auténtica se logra con técnica, sensibilidad y atención genuina."
      />

      {/* Historia */}
      <section className="section nosotros-historia">
        <div className="container">
          <div className={`nosotros-historia__grid ${historiaImagenes.length > 0 ? '' : 'nosotros-historia__grid--full'}`}>
            <div className="nosotros-historia__content">
              <span className="section__subtitle">Desde el corazón</span>
              <h2 className="section__title">Una historia de pasión por la belleza</h2>
              <div className="gold-line" style={{ margin: 'var(--space-md) 0 var(--space-xl)' }}></div>
              <p>
                SALÓN DE BELLEZA SIEMPRE LINDA abrió sus puertas hace más de una década como un pequeño
                estudio de barrio con una sola idea en mente: que cada mujer se
                sintiera especial al cruzar la puerta. Con el tiempo, ese
                espíritu artesanal se convirtió en un referente de la alta
                peluquería.
              </p>
              <p>
                Hoy, nuestro estudio reúne a un equipo de estilistas formados en
                las mejores academias internacionales, que combinan la
                precisión de la técnica con la sensibilidad de la atención
                humana.
              </p>
              <div className="nosotros-historia__stats">
                <div className="nosotros-historia__stat">
                  <span>10+</span>
                  <p>Años de trayectoria</p>
                </div>
                <div className="nosotros-historia__stat">
                  <span>15.000+</span>
                  <p>Clientas satisfechas</p>
                </div>
                <div className="nosotros-historia__stat">
                  <span>4.9★</span>
                  <p>Puntuación promedio</p>
                </div>
              </div>
            </div>
            {historiaImagenes.length > 0 && (
              <div className="nosotros-historia__images">
                {historiaImagenes.map((foto) => (
                  <img
                    key={foto.id}
                    src={foto.src}
                    alt={foto.alt}
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filosofía / Pilares */}
      <section className="nosotros-filosofia">
        <div className="nosotros-filosofia__overlay"></div>
        <div className="container">
          <SectionTitle
            subtitle="Nuestra Filosofía"
            title="Tres principios que nos definen"
            description="La belleza femenina se honra con respeto por la identidad de cada persona, escuchando primero y creando después."
          />
          <div className="nosotros-filosofia__grid">
            {pilares.map((p) => (
              <article className="nosotros-pilar" key={p.numero}>
                <span className="nosotros-pilar__numero">{p.numero}</span>
                <h3 className="nosotros-pilar__titulo">{p.titulo}</h3>
                <p className="nosotros-pilar__descripcion">{p.descripcion}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="section nosotros-equipo">
        <div className="container">
          <SectionTitle
            subtitle="Nuestro Equipo"
            title="Las manos detrás del arte"
            description="Estilistas certificados con formación continua en academias internacionales y una vocación genuina por su oficio."
          />
          <div className="nosotros-equipo__grid">
            {TEAM.map((m) => (
              <article className="nosotros-miembro" key={m.id}>
                <div className="nosotros-miembro__foto-wrap">
                  <img src={m.foto} alt={`${m.nombre}, ${m.cargo}`} className="nosotros-miembro__foto" loading="lazy" />
                </div>
                <h3 className="nosotros-miembro__nombre">{m.nombre}</h3>
                <span className="nosotros-miembro__cargo">{m.cargo}</span>
                <p className="nosotros-miembro__bio">{m.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Atención personalizada + CTA */}
      <section className="section section--alt nosotros-atencion">
        <div className="container">
          <div className="nosotros-atencion__inner">
            <span className="section__subtitle">Atención Personalizada</span>
            <h2 className="section__title">Tu cita comienza antes de sentarte en el sillón</h2>
            <div className="gold-line"></div>
            <p className="nosotros-atencion__text">
              Al agendar con nosotros, realizamos una breve asesoría previa para
              conocer tu rutina, tu cabello y tus expectativas. Así garantizamos
              un servicio verdaderamente a tu medida, del diagnóstico al acabado final.
            </p>
            <div className="nosotros-atencion__actions">
              <Link to="/reservas" className="btn btn--gold">Reservar Cita</Link>
              <Link to="/servicios" className="btn btn--secondary">Ver Servicios</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Nosotros