import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useServices } from '../../hooks/useServices'

function AdminVentas() {
  const { services, loading: loadingServices } = useServices()
  const [ventas, setVentas] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [message, setMessage] = useState(null)
  
  // Resumen
  const [totalMes, setTotalMes] = useState(0)
  const [cantidadMes, setCantidadMes] = useState(0)

  const defaultForm = {
    sale_date: new Date().toISOString().split('T')[0],
    client_name: '',
    service_name: '',
    amount: '',
    payment_method: 'efectivo',
    notes: ''
  }
  
  const [form, setForm] = useState(defaultForm)

  const fetchVentas = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .order('sale_date', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) throw error
      
      setVentas(data || [])
      
      // Calcular totales del mes actual
      const now = new Date()
      const currentMonth = now.getMonth()
      const currentYear = now.getFullYear()
      
      let total = 0
      let qty = 0
      
      if (data) {
        data.forEach(v => {
          const date = new Date(v.sale_date)
          // Asumiendo timezone local
          if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
            total += v.amount
            qty += 1
          }
        })
      }
      
      setTotalMes(total)
      setCantidadMes(qty)

    } catch (error) {
      console.error('Error fetching ventas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVentas()
  }, [])

  const openModal = () => {
    setMessage(null)
    setForm(defaultForm)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setForm(defaultForm)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    
    try {
      const { error } = await supabase
        .from('sales')
        .insert([{
          ...form,
          amount: parseInt(form.amount, 10) || 0
        }])

      if (error) throw error
      
      setMessage({ type: 'success', text: 'Venta registrada correctamente.' })
      await fetchVentas()
      setTimeout(() => closeModal(), 1500)
    } catch (error) {
      console.error(error)
      setMessage({ type: 'error', text: 'Error al registrar la venta.' })
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este registro de venta?')) return
    
    try {
      const { error } = await supabase
        .from('sales')
        .delete()
        .eq('id', id)
        
      if (error) throw error
      await fetchVentas()
    } catch (error) {
      console.error(error)
      alert('Error al eliminar el registro.')
    }
  }

  // Auto-fill price when service changes
  const handleServiceSelect = (e) => {
    const serviceName = e.target.value
    setForm(prev => ({ ...prev, service_name: serviceName }))
    
    const service = services.find(s => s.name === serviceName)
    if (service && service.price_number > 0) {
      setForm(prev => ({ ...prev, amount: service.price_number }))
    }
  }

  if (loading && ventas.length === 0) return <div className="admin-loading">Cargando ventas...</div>

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h1 className="admin-page-title">Ventas e Ingresos</h1>
          <p className="admin-page-subtitle">Registro de servicios realizados e ingresos.</p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={openModal}>
          + Registrar Venta
        </button>
      </div>
      
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="admin-stat-card__label">Ingresos del Mes</span>
          <span className="admin-stat-card__value">
            ${totalMes.toLocaleString('es-CL')}
          </span>
          <span className="admin-stat-card__sub">{cantidadMes} servicios realizados</span>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Método de Pago</th>
              <th>Valor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length === 0 ? (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', padding: 'var(--space-2xl)'}}>No hay ventas registradas.</td>
              </tr>
            ) : (
              ventas.map((venta) => {
                // Format date as DD/MM/YYYY
                const [y, m, d] = venta.sale_date.split('-')
                const dateStr = `${d}/${m}/${y}`
                
                return (
                  <tr key={venta.id}>
                    <td>{dateStr}</td>
                    <td><strong>{venta.client_name}</strong></td>
                    <td>{venta.service_name}</td>
                    <td>
                      <span style={{textTransform: 'capitalize'}}>{venta.payment_method}</span>
                    </td>
                    <td><strong>${venta.amount.toLocaleString('es-CL')}</strong></td>
                    <td>
                      <button 
                        className="admin-btn admin-btn--ghost admin-btn--danger"
                        onClick={() => handleDelete(venta.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h2 className="admin-modal__title">Registrar Venta</h2>
              <button className="admin-modal__close" onClick={closeModal}>×</button>
            </div>
            
            <div className="admin-modal__body">
              {message && (
                <div className={`admin-message admin-message--${message.type}`}>
                  {message.text}
                </div>
              )}
              
              <form id="ventaForm" className="admin-form" onSubmit={handleSubmit} style={{boxShadow:'none', padding: 0, border: 'none'}}>
                <div className="admin-form__row">
                  <div className="admin-form__field">
                    <label htmlFor="sale_date">Fecha *</label>
                    <input type="date" id="sale_date" name="sale_date" value={form.sale_date} onChange={handleChange} required />
                  </div>
                  <div className="admin-form__field">
                    <label htmlFor="client_name">Nombre de Cliente *</label>
                    <input type="text" id="client_name" name="client_name" value={form.client_name} onChange={handleChange} required placeholder="ej: María Pérez" />
                  </div>
                </div>

                <div className="admin-form__field">
                  <label htmlFor="service_name">Servicio Realizado *</label>
                  {loadingServices ? (
                    <input type="text" name="service_name" value={form.service_name} onChange={handleChange} required />
                  ) : (
                    <select id="service_name" name="service_name" value={form.service_name} onChange={handleServiceSelect} required>
                      <option value="">-- Seleccionar --</option>
                      {services.filter(s => s.is_active).map(s => (
                        <option key={s.id || s.slug} value={s.name}>{s.name}</option>
                      ))}
                      <option value="Otro">Otro servicio</option>
                    </select>
                  )}
                  {form.service_name === 'Otro' && (
                    <input type="text" name="service_name" placeholder="Especificar servicio" required onChange={handleChange} style={{marginTop: 'var(--space-xs)'}} />
                  )}
                </div>

                <div className="admin-form__row">
                  <div className="admin-form__field">
                    <label htmlFor="amount">Valor ($) *</label>
                    <input type="number" id="amount" name="amount" value={form.amount} onChange={handleChange} required min="0" />
                  </div>
                  <div className="admin-form__field">
                    <label htmlFor="payment_method">Método de Pago *</label>
                    <select id="payment_method" name="payment_method" value={form.payment_method} onChange={handleChange} required>
                      <option value="efectivo">Efectivo</option>
                      <option value="transferencia">Transferencia</option>
                      <option value="tarjeta">Tarjeta (Débito/Crédito)</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form__field">
                  <label htmlFor="notes">Observaciones (opcional)</label>
                  <textarea id="notes" name="notes" value={form.notes} onChange={handleChange} rows="2"></textarea>
                </div>
              </form>
            </div>
            
            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--ghost" onClick={closeModal} type="button">Cancelar</button>
              <button className="admin-btn admin-btn--primary" form="ventaForm" type="submit">
                Guardar Venta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminVentas
