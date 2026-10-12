import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

function AdminAgenda() {
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('todas') // 'todas', 'hoy', 'pendientes'

  const fetchReservas = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('reservation_date', { ascending: true })
        .order('reservation_time', { ascending: true })

      if (error) throw error
      setReservas(data || [])
    } catch (error) {
      console.error('Error fetching reservas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReservas()
  }, [])

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error
      await fetchReservas()
    } catch (error) {
      console.error(error)
      alert('Error al actualizar el estado de la reserva.')
    }
  }

  const filteredReservas = reservas.filter(r => {
    if (filtro === 'todas') return true
    if (filtro === 'pendientes') return r.status === 'pendiente'
    if (filtro === 'hoy') {
      const hoy = new Date().toISOString().split('T')[0]
      return r.reservation_date === hoy
    }
    return true
  })

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h1 className="admin-page-title">Agenda de Reservas</h1>
          <p className="admin-page-subtitle">Gestiona las citas agendadas por tus clientas.</p>
        </div>
      </div>

      <div className="admin-filters">
        <label style={{fontWeight: 500, fontSize: 'var(--text-sm)'}}>Ver:</label>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)} style={{padding: '6px 12px', borderRadius: '4px'}}>
          <option value="todas">Todas las reservas</option>
          <option value="hoy">Reservas de hoy</option>
          <option value="pendientes">Pendientes de confirmación</option>
        </select>
      </div>

      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-loading">Cargando agenda...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Fecha y Hora</th>
                <th>Cliente</th>
                <th>Teléfono</th>
                <th>Servicio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservas.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center', padding: 'var(--space-2xl)'}}>No se encontraron reservas.</td>
                </tr>
              ) : (
                filteredReservas.map(reserva => {
                  const [y, m, d] = reserva.reservation_date.split('-')
                  const dateStr = `${d}/${m}/${y}`
                  const timeStr = reserva.reservation_time.substring(0, 5)

                  return (
                    <tr key={reserva.id}>
                      <td><strong>{dateStr}</strong> a las {timeStr}</td>
                      <td>
                        <strong>{reserva.client_name}</strong>
                        {reserva.client_email && <div style={{fontSize: '12px', color: '#666'}}>{reserva.client_email}</div>}
                      </td>
                      <td>
                        <a href={`https://wa.me/${reserva.client_phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{color: 'var(--color-gold-dark)'}}>
                          {reserva.client_phone}
                        </a>
                      </td>
                      <td>{reserva.service_name}</td>
                      <td>
                        <span className={`admin-badge admin-badge--${reserva.status}`}>
                          {reserva.status}
                        </span>
                      </td>
                      <td>
                        <div className="admin-actions">
                          {reserva.status === 'pendiente' && (
                            <button 
                              className="admin-btn admin-btn--success"
                              onClick={() => updateStatus(reserva.id, 'confirmada')}
                            >
                              Confirmar
                            </button>
                          )}
                          {(reserva.status === 'pendiente' || reserva.status === 'confirmada') && (
                            <button 
                              className="admin-btn admin-btn--danger"
                              onClick={() => updateStatus(reserva.id, 'cancelada')}
                            >
                              Cancelar
                            </button>
                          )}
                          {reserva.status === 'confirmada' && (
                            <button 
                              className="admin-btn admin-btn--ghost"
                              onClick={() => updateStatus(reserva.id, 'completada')}
                            >
                              Completar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AdminAgenda
