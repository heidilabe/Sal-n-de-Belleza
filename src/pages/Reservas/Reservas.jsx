import { Link } from 'react-router-dom'
import PageHeader from '../../components/PageHeader/PageHeader'
import BookingForm from '../../components/BookingForm/BookingForm'
import Seo from '../../components/Seo/Seo'
import { BUSINESS, WHATSAPP_LINK } from '../../data/business'
import './Reservas.css'

const pasos = [
  {
    numero: '1',
    titulo: 'Completa tus datos',
    descripcion: 'Cuéntanos quién eres y cómo contactarte con tranquilidad.',
  },
  {
    numero: '2',
    titulo: 'Elige servicio, fecha y hora',
    descripcion: 'Selecciona el tratamiento deseado y el momento ideal para ti.',
  },
  {
    numero: '3',
    titulo: 'Recibe la confirmación',
    descripcion: 'Te contactaremos para confirmar disponibilidad y ajustar detalles.',
  },
]

function Reservas() {
  return (
    <div className="page-reservas">
      <Seo
        title="Reservar Cita | SALÓN DE BELLEZA SIEMPRE LINDA"
        description="Reserva tu cita en SALÓN DE BELLEZA SIEMPRE LINDA. Completa el formulario y elige el servicio, fecha y hora. Te contactaremos para confirmar la disponibilidad."
      />

      <PageHeader
        subtitle="Agenda Tu Visita"
        title="Reservar Cita"
        text="Solicita tu cita en pocos minutos. Una vez enviada tu solicitud, nuestro equipo se pondrá en contacto contigo para confirmar la disponibilidad."
      />

      <section className="section reservas-section">
        <div className="container">
          <div className="reservas-grid">
            {/* Side info */}
            <aside className="reservas-aside">
              <h2 className="reservas-aside__title">Así funciona tu reserva</h2>
              <div className="reservas-pasos">
                {pasos.map((p) => (
                  <div className="reservas-paso" key={p.numero}>
                    <span className="reservas-paso__numero">{p.numero}</span>
                    <div>
                      <h3 className="reservas-paso__titulo">{p.titulo}</h3>
                      <p className="reservas-paso__descripcion">{p.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="reservas-aside__card">
                <h3 className="reservas-aside__card-title">Atención</h3>
                {BUSINESS.hours.map((h) => (
                  <p className="reservas-aside__horario" key={h.day}>
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </p>
                ))}
              </div>

              <div className="reservas-aside__card">
                <h3 className="reservas-aside__card-title">¿Prefieres escribirnos?</h3>
                <p className="reservas-aside__text">
                  Consulta disponibilidad y resuelve dudas directamente con
                  nuestro equipo por WhatsApp.
                </p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary reservas-aside__whatsapp"
                >
                  WhatsApp
                </a>
              </div>

              <div className="reservas-aside__card">
                <h3 className="reservas-aside__card-title">Contacto directo</h3>
                <p className="reservas-aside__text">{BUSINESS.phoneDisplay}</p>
                <p className="reservas-aside__text">
                  <a href={`mailto:${BUSINESS.email}`} className="reservas-aside__link">
                    {BUSINESS.email}
                  </a>
                </p>
                <Link to="/contacto" className="reservas-aside__link">
                  Ver página de contacto
                </Link>
              </div>
            </aside>

            {/* Booking form */}
            <div className="reservas-form-wrap">
              <BookingForm />
            </div>
          </div>

          {/* Acceso para Administrador */}
          <div className="reservas-admin-footer">
            <Link to="/login" className="reservas-admin-btn" id="btn-admin-access">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Administrador</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Reservas