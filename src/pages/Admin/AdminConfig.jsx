import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

function AdminConfig() {
  const [config, setConfig] = useState({
    whatsapp_number: '',
    business_name: '',
    business_phone: '',
    business_email: '',
    business_address: '',
    slot_duration: '30'
  })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const fetchConfig = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('business_config')
        .select('*')

      if (error) throw error
      
      if (data) {
        const newConfig = { ...config }
        data.forEach(item => {
          newConfig[item.key] = item.value
        })
        setConfig(newConfig)
      }
    } catch (error) {
      console.error('Error fetching config:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setConfig(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const promises = Object.entries(config).map(([key, value]) => {
        return supabase
          .from('business_config')
          .upsert({ key, value }, { onConflict: 'key' })
      })

      await Promise.all(promises)
      
      setMessage({ type: 'success', text: 'Configuración guardada correctamente.' })
    } catch (error) {
      console.error(error)
      setMessage({ type: 'error', text: 'Error al guardar la configuración.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="admin-loading">Cargando configuración...</div>

  return (
    <div>
      <div className="admin-section-header">
        <div>
          <h1 className="admin-page-title">Configuración</h1>
          <p className="admin-page-subtitle">Ajustes generales del negocio y canales de contacto.</p>
        </div>
      </div>

      {message && (
        <div className={`admin-message admin-message--${message.type}`}>
          {message.text}
        </div>
      )}

      <form className="admin-form" onSubmit={handleSave}>
        <div className="admin-form__row">
          <div className="admin-form__field">
            <label htmlFor="business_name">Nombre Oficial del Negocio *</label>
            <input 
              type="text" 
              id="business_name" 
              name="business_name" 
              value={config.business_name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="admin-form__field">
            <label htmlFor="whatsapp_number">Número de WhatsApp *</label>
            <input 
              type="text" 
              id="whatsapp_number" 
              name="whatsapp_number" 
              value={config.whatsapp_number} 
              onChange={handleChange} 
              placeholder="Ej: 56912345678"
              required 
            />
            <small style={{color: 'var(--color-slate-400)'}}>Incluir código de país sin el "+". Ej: 569...</small>
          </div>
        </div>

        <div className="admin-form__row">
          <div className="admin-form__field">
            <label htmlFor="business_phone">Teléfono Público (Visible en Contacto)</label>
            <input 
              type="text" 
              id="business_phone" 
              name="business_phone" 
              value={config.business_phone} 
              onChange={handleChange} 
            />
          </div>
          <div className="admin-form__field">
            <label htmlFor="business_email">Correo de Contacto</label>
            <input 
              type="email" 
              id="business_email" 
              name="business_email" 
              value={config.business_email} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div className="admin-form__field">
          <label htmlFor="business_address">Dirección Física del Local</label>
          <input 
            type="text" 
            id="business_address" 
            name="business_address" 
            value={config.business_address} 
            onChange={handleChange} 
          />
        </div>

        <div style={{ marginTop: 'var(--space-xl)' }}>
          <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminConfig
