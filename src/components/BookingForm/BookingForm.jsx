import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useServices } from '../../hooks/useServices'
import { getPromotionBySlug } from '../../data/promotions'
import { BUSINESS } from '../../data/business'
import './BookingForm.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function todayISO() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mm}-${dd}`
}

function timeToMinutes(timeStr) {
  if (!timeStr) return 0
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

function minutesToTime(mins) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

const emptyForm = {
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
  servicio: '',
  fecha: '',
  hora: '',
  comentario: '',
}

function BookingForm() {
  const [searchParams] = useSearchParams()
  const { services, loading: loadingServices } = useServices()
  const [businessHours, setBusinessHours] = useState([])
  const [availableSlots, setAvailableSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [config, setConfig] = useState(BUSINESS)

  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [enviada, setEnviada] = useState(false)

  const promo = getPromotionBySlug(searchParams.get('promo'))

  // Initialize service from URL if possible
  useEffect(() => {
    if (!loadingServices && services.length > 0 && !form.servicio) {
      const servicioSlug = searchParams.get('servicio')
      if (servicioSlug) {
        const found = services.find(s => s.slug === servicioSlug)
        if (found) {
          setForm(prev => ({ ...prev, servicio: found.id }))
        }
      }
    }
  }, [loadingServices, services, searchParams])

  // Fetch Business Hours and Config
  useEffect(() => {
    const fetchConfigAndHours = async () => {
      // Hours
      const { data: hoursData } = await supabase.from('business_hours').select('*')
      if (hoursData) setBusinessHours(hoursData)
      
      // Config (WhatsApp)
      const { data: configData } = await supabase.from('business_config').select('*').eq('key', 'whatsapp_number').single()
      if (configData) {
        setConfig(prev => ({ ...prev, whatsappNumber: configData.value }))
      }
    }
    fetchConfigAndHours()
  }, [])

  // Fetch reservations and calculate available slots when date or service changes
  useEffect(() => {
    const calculateSlots = async () => {
      if (!form.fecha || !form.servicio) {
        setAvailableSlots([])
        return
      }

      setLoadingSlots(true)
      try {
        const dateObj = new Date(form.fecha + 'T12:00:00') // Avoid timezone shift
        let dayOfWeek = dateObj.getDay() // 0 = Sunday

        const dayConfig = businessHours.find(h => h.day_of_week === dayOfWeek)
        if (!dayConfig || dayConfig.is_closed) {
          setAvailableSlots([])
          setLoadingSlots(false)
          return
        }

        const selectedService = services.find(s => s.id === form.servicio)
        const duration = selectedService?.duration || 60

        // Fetch reservations for this date
        const { data: reservations } = await supabase
          .from('reservations')
          .select('reservation_time, duration')
          .eq('reservation_date', form.fecha)
          .neq('status', 'cancelada')

        const openMins = timeToMinutes(dayConfig.open_time)
        const closeMins = timeToMinutes(dayConfig.close_time)
        
        let slots = []
        for (let t = openMins; t + duration <= closeMins; t += 30) {
          // Check if this slot overlaps with any reservation
          let overlaps = false
          if (reservations) {
            for (let r of reservations) {
              const rStart = timeToMinutes(r.reservation_time)
              const rEnd = rStart + r.duration
              // (start1 < end2 && end1 > start2)
              if (t < rEnd && (t + duration) > rStart) {
                overlaps = true
                break
              }
            }
          }
          if (!overlaps) {
            slots.push(minutesToTime(t))
          }
        }

        setAvailableSlots(slots)
      } catch (err) {
        console.error('Error calculando horas:', err)
      } finally {
        setLoadingSlots(false)
      }
    }

    calculateSlots()
  }, [form.fecha, form.servicio, businessHours, services])


  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const nuevosErrores = {}

    if (!form.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.'
    if (!form.apellido.trim()) nuevosErrores.apellido = 'El apellido es obligatorio.'
    if (!form.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es obligatorio.'
    } else if (form.telefono.replace(/\D/g, '').length < 8) {
      nuevosErrores.telefono = 'Ingresa un teléfono válido.'
    }
    if (!form.email.trim()) {
      nuevosErrores.email = 'El correo electrónico es obligatorio.'
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      nuevosErrores.email = 'Ingresa un correo electrónico válido.'
    }
    if (!form.servicio) nuevosErrores.servicio = 'Selecciona un servicio.'
    if (!form.fecha) {
      nuevosErrores.fecha = 'Selecciona una fecha.'
    } else if (form.fecha < todayISO()) {
      nuevosErrores.fecha = 'La fecha no puede ser anterior a hoy.'
    }
    if (!form.hora) nuevosErrores.hora = 'Selecciona una hora.'

    setErrors(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      const selectedService = services.find(s => s.id === form.servicio)
      
      const { error } = await supabase
        .from('reservations')
        .insert([{
          client_name: `${form.nombre.trim()} ${form.apellido.trim()}`,
          client_phone: form.telefono.trim(),
          client_email: form.email.trim(),
          service_id: selectedService.id,
          service_name: selectedService.name,
          reservation_date: form.fecha,
          reservation_time: form.hora,
          duration: selectedService.duration || 60,
          status: 'pendiente',
          notes: form.comentario
        }])

      if (error) throw error

      const fechaLegible = new Date(`${form.fecha}T12:00:00`).toLocaleDateString('es-CL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })

      setEnviada({
        nombre: `${form.nombre.trim()} ${form.apellido.trim()}`,
        servicio: selectedService.name,
        fecha: fechaLegible,
        hora: form.hora,
      })
    } catch (err) {
      console.error(err)
      alert('Error al enviar la reserva. Intenta nuevamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setForm(emptyForm)
    setErrors({})
    setEnviada(false)
  }

  if (enviada) {
    const waText = encodeURIComponent(`Hola, quiero confirmar mi reserva en SALÓN DE BELLEZA SIEMPRE LINDA.\n\nNombre: ${enviada.nombre}\nServicio: ${enviada.servicio}\nFecha: ${enviada.fecha}\nHora: ${enviada.hora}`)
    const waLink = `https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}?text=${waText}`

    return (
      <div className="booking-form__success">
        <div className="booking-form__success-icon">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2 className="booking-form__success-title">Reserva Agendada</h2>
        <p className="booking-form__success-subtitle">
          Gracias, <strong>{enviada.nombre}</strong>. Hemos registrado tu cita para <strong>{enviada.servicio}</strong> el{' '}
          <strong>{enviada.fecha}</strong> a las <strong>{enviada.hora} hrs.</strong>
        </p>
        <p className="booking-form__success-note">
          Tu reserva está en estado <strong>Pendiente</strong>. Por favor, confirma tu asistencia enviándonos un mensaje por WhatsApp.
        </p>
        <div className="booking-form__success-actions" style={{ flexDirection: 'column' }}>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn--gold" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            Confirmar por WhatsApp
          </a>
          <button type="button" className="btn btn--secondary" onClick={resetForm} style={{ marginTop: '1rem' }}>
            Nueva solicitud
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      {promo && (
        <div className="booking-form__promo">
          Estás solicitando la promoción: <strong>{promo.nombre}</strong>
        </div>
      )}

      <div className="booking-form__row">
        <div className="booking-form__field">
          <label htmlFor="nombre">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: María"
            autoComplete="given-name"
            aria-invalid={errors.nombre ? 'true' : 'false'}
            disabled={submitting}
          />
          {errors.nombre && <span className="booking-form__error">{errors.nombre}</span>}
        </div>
        <div className="booking-form__field">
          <label htmlFor="apellido">Apellido *</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={form.apellido}
            onChange={handleChange}
            placeholder="Ej: Fernández"
            autoComplete="family-name"
            aria-invalid={errors.apellido ? 'true' : 'false'}
            disabled={submitting}
          />
          {errors.apellido && <span className="booking-form__error">{errors.apellido}</span>}
        </div>
      </div>

      <div className="booking-form__row">
        <div className="booking-form__field">
          <label htmlFor="telefono">Teléfono *</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="+56 9 1234 5678"
            autoComplete="tel"
            aria-invalid={errors.telefono ? 'true' : 'false'}
            disabled={submitting}
          />
          {errors.telefono && <span className="booking-form__error">{errors.telefono}</span>}
        </div>
        <div className="booking-form__field">
          <label htmlFor="email">Correo electrónico *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tu@correo.com"
            autoComplete="email"
            aria-invalid={errors.email ? 'true' : 'false'}
            disabled={submitting}
          />
          {errors.email && <span className="booking-form__error">{errors.email}</span>}
        </div>
      </div>

      <div className="booking-form__field">
        <label htmlFor="servicio">Servicio *</label>
        <select
          id="servicio"
          name="servicio"
          value={form.servicio}
          onChange={handleChange}
          aria-invalid={errors.servicio ? 'true' : 'false'}
          disabled={loadingServices || submitting}
        >
          <option value="">Selecciona un servicio</option>
          {services.filter(s => s.is_active).map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — {s.price} ({s.duration} min)
            </option>
          ))}
        </select>
        {errors.servicio && <span className="booking-form__error">{errors.servicio}</span>}
      </div>

      <div className="booking-form__row">
        <div className="booking-form__field">
          <label htmlFor="fecha">Fecha *</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            min={todayISO()}
            aria-invalid={errors.fecha ? 'true' : 'false'}
            disabled={submitting}
          />
          {errors.fecha && <span className="booking-form__error">{errors.fecha}</span>}
        </div>
        <div className="booking-form__field">
          <label htmlFor="hora">Hora *</label>
          <select
            id="hora"
            name="hora"
            value={form.hora}
            onChange={handleChange}
            aria-invalid={errors.hora ? 'true' : 'false'}
            disabled={loadingSlots || submitting || !form.fecha || !form.servicio}
          >
            <option value="">
              {!form.fecha || !form.servicio 
                ? 'Selecciona fecha y servicio primero' 
                : loadingSlots 
                  ? 'Buscando disponibilidad...' 
                  : availableSlots.length === 0 
                    ? 'No hay horas disponibles' 
                    : 'Selecciona una hora'}
            </option>
            {availableSlots.map((h) => (
              <option key={h} value={h}>
                {h} hrs
              </option>
            ))}
          </select>
          {errors.hora && <span className="booking-form__error">{errors.hora}</span>}
        </div>
      </div>

      <div className="booking-form__field">
        <label htmlFor="comentario">Comentario (opcional)</label>
        <textarea
          id="comentario"
          name="comentario"
          value={form.comentario}
          onChange={handleChange}
          rows="4"
          placeholder="Cuéntanos tus expectativas, largo de cabello o referencia a trabajar."
          disabled={submitting}
        />
      </div>

      <button type="submit" className="btn btn--gold booking-form__submit" disabled={submitting}>
        {submitting ? 'Guardando reserva...' : 'Agendar Cita'}
      </button>
    </form>
  )
}

export default BookingForm