import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useServices } from '../../hooks/useServices'

function AdminServicios() {
  const { services, refetch, loading: loadingServices } = useServices()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const defaultForm = {
    name: '',
    slug: '',
    description: '',
    category: 'Cabello',
    price: '',
    price_number: 0,
    duration: 60,
    nota: '',
    is_active: true,
    sort_order: 0,
  }

  const [form, setForm] = useState(defaultForm)

  const openModal = (service = null) => {
    setMessage(null)
    if (service) {
      setEditingService(service)
      setForm({
        name: service.name || '',
        slug: service.slug || '',
        description: service.description || '',
        category: service.category || 'Cabello',
        price: service.price || '',
        price_number: service.price_number || 0,
        duration: service.duration || 60,
        nota: service.nota || '',
        is_active: service.is_active ?? true,
        sort_order: service.sort_order || 0,
      })
    } else {
      setEditingService(null)
      setForm(defaultForm)
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingService(null)
    setForm(defaultForm)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    let finalValue = value
    if (type === 'checkbox') finalValue = checked
    if (type === 'number') finalValue = parseInt(value, 10) || 0
    setForm(prev => ({ ...prev, [name]: finalValue }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (editingService) {
        const { error } = await supabase
          .from('services')
          .update(form)
          .eq('id', editingService.id)

        if (error) throw error
        setMessage({ type: 'success', text: 'Servicio actualizado correctamente.' })
      } else {
        const { error } = await supabase
          .from('services')
          .insert([form])

        if (error) throw error
        setMessage({ type: 'success', text: 'Servicio creado correctamente.' })
      }

      await refetch()
      setTimeout(() => closeModal(), 1500)
    } catch (error) {
      console.error(error)
      setMessage({ type: 'error', text: 'Error al guardar el servicio.' })
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (service) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_active: !service.is_active })
        .eq('id', service.id)

      if (error) throw error
      await refetch()
    } catch (error) {
      console.error('Error toggling status', error)
      alert('Error al cambiar el estado del servicio.')
    }
  }

  if (loadingServices) return <div className="admin-loading">Cargando servicios...</div>

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h1 className="admin-page-title">Servicios</h1>
          <p className="admin-page-subtitle">Administra los servicios ofrecidos en el salón.</p>
        </div>
        <button className="admin-btn admin-btn--primary" onClick={() => openModal()}>
          + Nuevo Servicio
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Duración</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {services.map((servicio) => (
              <tr key={servicio.id || servicio.slug}>
                <td><strong>{servicio.name}</strong></td>
                <td>{servicio.category}</td>
                <td>{servicio.price}</td>
                <td>{servicio.duration} min</td>
                <td>
                  <span className={`admin-badge admin-badge--${servicio.is_active !== false ? 'active' : 'inactive'}`}>
                    {servicio.is_active !== false ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="admin-actions">
                    <button 
                      className="admin-btn admin-btn--ghost"
                      onClick={() => openModal(servicio)}
                      disabled={!servicio.id} // Disable if it's fallback data without DB ID
                    >
                      Editar
                    </button>
                    {servicio.id && (
                      <button 
                        className={`admin-btn ${servicio.is_active ? 'admin-btn--danger' : 'admin-btn--success'}`}
                        onClick={() => toggleActive(servicio)}
                      >
                        {servicio.is_active ? 'Desactivar' : 'Activar'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h2 className="admin-modal__title">
                {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
              </h2>
              <button className="admin-modal__close" onClick={closeModal}>×</button>
            </div>
            
            <div className="admin-modal__body">
              {message && (
                <div className={`admin-message admin-message--${message.type}`}>
                  {message.text}
                </div>
              )}
              
              <form id="serviceForm" className="admin-form" onSubmit={handleSubmit} style={{boxShadow:'none', padding: 0, border: 'none'}}>
                <div className="admin-form__row">
                  <div className="admin-form__field">
                    <label htmlFor="name">Nombre *</label>
                    <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="admin-form__field">
                    <label htmlFor="slug">Slug (URL) *</label>
                    <input type="text" id="slug" name="slug" value={form.slug} onChange={handleChange} required placeholder="ej: corte-de-pelo" />
                  </div>
                </div>
                
                <div className="admin-form__row">
                  <div className="admin-form__field">
                    <label htmlFor="category">Categoría *</label>
                    <select id="category" name="category" value={form.category} onChange={handleChange} required>
                      <option value="Color">Color</option>
                      <option value="Tratamientos Capilares">Tratamientos Capilares</option>
                      <option value="Peinados">Peinados</option>
                      <option value="Cortes de Pelo">Cortes de Pelo</option>
                      <option value="Cabello">Cabello</option>
                      <option value="Uñas">Uñas</option>
                      <option value="Maquillaje">Maquillaje</option>
                    </select>
                  </div>
                  <div className="admin-form__field">
                    <label htmlFor="duration">Duración (minutos) *</label>
                    <input type="number" id="duration" name="duration" value={form.duration} onChange={handleChange} required min="15" step="15" />
                  </div>
                </div>

                <div className="admin-form__row">
                  <div className="admin-form__field">
                    <label htmlFor="price">Precio (Texto) *</label>
                    <input type="text" id="price" name="price" value={form.price} onChange={handleChange} required placeholder="ej: $15.000 o Valor según largo" />
                  </div>
                  <div className="admin-form__field">
                    <label htmlFor="price_number">Precio (Numérico para cálculos)</label>
                    <input type="number" id="price_number" name="price_number" value={form.price_number} onChange={handleChange} min="0" />
                  </div>
                </div>

                <div className="admin-form__field">
                  <label htmlFor="description">Descripción *</label>
                  <textarea id="description" name="description" value={form.description} onChange={handleChange} required rows="3"></textarea>
                </div>
                
                <div className="admin-form__field">
                  <label htmlFor="nota">Nota adicional (opcional)</label>
                  <input type="text" id="nota" name="nota" value={form.nota} onChange={handleChange} placeholder="ej: Valor según largo y volumen" />
                </div>

                <div className="admin-form__field" style={{flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}>
                  <input type="checkbox" id="is_active" name="is_active" checked={form.is_active} onChange={handleChange} style={{width: 'auto'}} />
                  <label htmlFor="is_active" style={{marginBottom: 0}}>Servicio Activo (visible al público)</label>
                </div>
              </form>
            </div>
            
            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--ghost" onClick={closeModal} type="button">Cancelar</button>
              <button className="admin-btn admin-btn--primary" form="serviceForm" type="submit" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar Servicio'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminServicios
