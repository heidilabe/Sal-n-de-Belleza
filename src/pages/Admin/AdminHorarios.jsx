import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

function AdminHorarios() {
  const [horarios, setHorarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const fetchHorarios = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('business_hours')
        .select('*')
        .order('day_of_week', { ascending: true })

      if (error) throw error
      setHorarios(data || [])
    } catch (error) {
      console.error('Error fetching horarios:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHorarios()
  }, [])

  const handleChange = (index, field, value) => {
    const newHorarios = [...horarios]
    if (field === 'is_closed') {
      newHorarios[index].is_closed = value
      if (value) {
        newHorarios[index].open_time = null
        newHorarios[index].close_time = null
      }
    } else {
      newHorarios[index][field] = value
    }
    setHorarios(newHorarios)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      // Guardar todos los horarios
      const promises = horarios.map(h => 
        supabase
          .from('business_hours')
          .update({
            open_time: h.is_closed ? null : h.open_time,
            close_time: h.is_closed ? null : h.close_time,
            is_closed: h.is_closed
          })
          .eq('id', h.id)
      )

      await Promise.all(promises)
      
      setMessage({ type: 'success', text: 'Horarios actualizados correctamente.' })
      await fetchHorarios()
    } catch (error) {
      console.error(error)
      setMessage({ type: 'error', text: 'Error al actualizar horarios.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="admin-loading">Cargando horarios...</div>

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h1 className="admin-page-title">Horarios de Atención</h1>
          <p className="admin-page-subtitle">Configura los días y horarios en que el salón está abierto.</p>
        </div>
        <button 
          className="admin-btn admin-btn--primary" 
          onClick={handleSave} 
          disabled={saving}
        >
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      {message && (
        <div className={`admin-message admin-message--${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Día</th>
              <th>Estado</th>
              <th>Hora Apertura</th>
              <th>Hora Cierre</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((dia, index) => (
              <tr key={dia.id} style={{ opacity: dia.is_closed ? 0.6 : 1 }}>
                <td><strong>{dia.day_name}</strong></td>
                <td>
                  <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                    <input 
                      type="checkbox" 
                      checked={!dia.is_closed}
                      onChange={(e) => handleChange(index, 'is_closed', !e.target.checked)}
                    />
                    {dia.is_closed ? 'Cerrado' : 'Abierto'}
                  </label>
                </td>
                <td>
                  <input 
                    type="time" 
                    value={dia.open_time || ''} 
                    onChange={(e) => handleChange(index, 'open_time', e.target.value)}
                    disabled={dia.is_closed}
                    className="admin-form__field"
                    style={{padding: '8px', borderRadius: '4px', border: '1px solid #ddd'}}
                  />
                </td>
                <td>
                  <input 
                    type="time" 
                    value={dia.close_time || ''} 
                    onChange={(e) => handleChange(index, 'close_time', e.target.value)}
                    disabled={dia.is_closed}
                    className="admin-form__field"
                    style={{padding: '8px', borderRadius: '4px', border: '1px solid #ddd'}}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminHorarios
