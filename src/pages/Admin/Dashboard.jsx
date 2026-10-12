import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../context/AuthContext'
import './Admin.css'

function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    ventasMes: 0,
    serviciosMes: 0,
    reservasHoy: 0,
    reservasPendientes: 0,
  })
  const [reservasHoyList, setReservasHoyList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true)
        
        // 1. Obtener reservas de hoy
        const hoy = new Date().toISOString().split('T')[0]
        const { data: reservas } = await supabase
          .from('reservations')
          .select('*')
          .eq('reservation_date', hoy)
          .order('reservation_time', { ascending: true })
          .limit(5)
          
        setReservasHoyList(reservas || [])
        
        // 2. Obtener conteos rápidos (mockeados por ahora, luego se calcularán)
        // Simulando datos para la vista inicial
        setStats({
          ventasMes: 1250000,
          serviciosMes: 43,
          reservasHoy: reservas?.length || 0,
          reservasPendientes: reservas?.filter(r => r.status === 'pendiente').length || 0,
        })
        
      } catch (error) {
        console.error('Error cargando dashboard:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadDashboardData()
  }, [])

  if (loading) {
    return <div className="admin-loading">Cargando panel...</div>
  }

  return (
    <div className="admin-dashboard">
      <h1 className="admin-page-title">Bienvenida, {user?.user_metadata?.full_name || 'Administradora'}</h1>
      <p className="admin-page-subtitle">Resumen de la actividad de tu salón hoy.</p>
      
      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="admin-stat-card__label">Ventas del Mes</span>
          <span className="admin-stat-card__value">
            ${stats.ventasMes.toLocaleString('es-CL')}
          </span>
          <span className="admin-stat-card__sub">{stats.serviciosMes} servicios realizados</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-card__label">Reservas para Hoy</span>
          <span className="admin-stat-card__value">{stats.reservasHoy}</span>
          <span className="admin-stat-card__sub">
            {stats.reservasPendientes > 0 
              ? `${stats.reservasPendientes} pendientes de confirmación` 
              : 'Todo confirmado'}
          </span>
        </div>
      </div>
      
      {/* Quick Actions & Recent */}
      <div className="admin-form__row" style={{ alignItems: 'flex-start' }}>
        <div className="admin-table-wrap" style={{ flex: 2 }}>
          <div className="admin-section-header" style={{ padding: 'var(--space-xl)', marginBottom: 0 }}>
            <h3 className="admin-page-title" style={{ fontSize: 'var(--text-lg)' }}>Agenda de Hoy</h3>
            <Link to="/admin/agenda" className="admin-btn admin-btn--ghost">Ver agenda completa</Link>
          </div>
          
          {reservasHoyList.length === 0 ? (
            <div className="admin-empty">
              <svg className="admin-empty__icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <p className="admin-empty__text">No hay reservas agendadas para hoy.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {reservasHoyList.map(reserva => (
                  <tr key={reserva.id}>
                    <td><strong>{reserva.reservation_time.substring(0, 5)}</strong></td>
                    <td>{reserva.client_name}</td>
                    <td>{reserva.service_name}</td>
                    <td>
                      <span className={`admin-badge admin-badge--${reserva.status}`}>
                        {reserva.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        <div className="admin-form" style={{ flex: 1 }}>
          <h3 className="admin-page-title" style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-lg)' }}>Accesos Rápidos</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
            <Link to="/admin/ventas" className="btn btn--gold" style={{ width: '100%', textAlign: 'center' }}>
              + Registrar Venta
            </Link>
            <Link to="/admin/galeria" className="btn btn--secondary" style={{ width: '100%', textAlign: 'center' }}>
              Subir Trabajo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
