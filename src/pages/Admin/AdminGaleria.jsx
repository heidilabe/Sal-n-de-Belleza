import { useState, useMemo } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient'
import { useGallery } from '../../hooks/useGallery'
import { CATEGORIAS_GALERIA } from '../../data/gallery'
import './AdminGaleria.css'

function AdminGaleria() {
  const { gallery, refetch, loading: loadingGallery } = useGallery({ adminMode: true })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [deleteConfirmItem, setDeleteConfirmItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  // Filtros en la vista de administración
  const [busqueda, setBusqueda] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState('Todas')

  // Estado del formulario
  const defaultForm = {
    title: '',
    description: '',
    category: 'Cortes',
  }
  const [form, setForm] = useState(defaultForm)
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  // Abrir modal para crear
  const openCreateModal = () => {
    setMessage(null)
    setEditingItem(null)
    setFile(null)
    setPreviewUrl(null)
    setForm(defaultForm)
    setIsModalOpen(true)
  }

  // Abrir modal para editar
  const openEditModal = (item) => {
    setMessage(null)
    setEditingItem(item)
    setFile(null)
    setPreviewUrl(item.image_url || item.src || null)
    setForm({
      title: item.title || item.descripcion || '',
      description: item.description || '',
      category: item.category || item.categoria || 'Cortes',
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingItem(null)
    setFile(null)
    setPreviewUrl(null)
    setForm(defaultForm)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']

      if (!validTypes.includes(selectedFile.type)) {
        setMessage({ type: 'error', text: 'Formato no válido. Solo se permiten imágenes JPG, PNG o WEBP.' })
        e.target.value = null
        return
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'La imagen excede el límite de 5MB. Por favor selecciona una imagen más liviana.' })
        e.target.value = null
        return
      }

      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
      setMessage(null)
    }
  }

  const removeSelectedFile = () => {
    setFile(null)
    if (editingItem) {
      setPreviewUrl(editingItem.image_url || editingItem.src || null)
    } else {
      setPreviewUrl(null)
    }
  }

  // Guardar (Crear o Editar)
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.title.trim()) {
      setMessage({ type: 'error', text: 'El título del trabajo es obligatorio.' })
      return
    }

    if (!editingItem && !file) {
      setMessage({ type: 'error', text: 'Debes seleccionar una fotografía para subir.' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      if (!isSupabaseConfigured) {
        // === MODO DEMO / LOCAL (Supabase desconectado) ===
        let imageUrl = previewUrl
        if (file) {
          imageUrl = await new Promise((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.readAsDataURL(file)
          })
        }

        const currentDemo = JSON.parse(sessionStorage.getItem('siemprelinda_demo_gallery') || '[]')

        if (editingItem) {
          const updated = currentDemo.map(item => {
            if (item.id === editingItem.id) {
              return {
                ...item,
                title: form.title.trim(),
                description: form.description.trim(),
                category: form.category,
                image_url: imageUrl || item.image_url,
                updated_at: new Date().toISOString(),
              }
            }
            return item
          })
          sessionStorage.setItem('siemprelinda_demo_gallery', JSON.stringify(updated))
          setMessage({ type: 'success', text: '¡Fotografía actualizada con éxito!' })
        } else {
          const newItem = {
            id: 'demo-' + Date.now(),
            title: form.title.trim(),
            description: form.description.trim(),
            category: form.category,
            image_url: imageUrl,
            storage_path: null,
            created_at: new Date().toISOString(),
          }
          currentDemo.unshift(newItem)
          sessionStorage.setItem('siemprelinda_demo_gallery', JSON.stringify(currentDemo))
          setMessage({ type: 'success', text: '¡Fotografía agregada con éxito a la galería!' })
        }

        await refetch()
        setTimeout(() => closeModal(), 1200)
        return
      }

      // === MODO PRODUCCIÓN (Supabase Storage & Database) ===
      let publicUrl = editingItem?.image_url
      let filePath = editingItem?.storage_path

      // Si se seleccionó un nuevo archivo, subirlo a Supabase Storage
      if (file) {
        const fileExt = file.name.split('.').pop()
        const cleanCategory = form.category.toLowerCase().replace(/ \/ | /g, '-')
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]/g, '_').substring(0, 20)
        const newFileName = `${Date.now()}_${sanitizedName}.${fileExt}`
        const newFilePath = `fotos/${cleanCategory}/${newFileName}`

        const { error: uploadError } = await supabase.storage
          .from('galeria')
          .upload(newFilePath, file, { cacheControl: '3600', upsert: false })

        if (uploadError) throw new Error(`Error al subir imagen a Storage: ${uploadError.message}`)

        const { data: urlData } = supabase.storage
          .from('galeria')
          .getPublicUrl(newFilePath)

        publicUrl = urlData.publicUrl

        // Si es una edición y ya existía una imagen anterior en Storage, eliminar la anterior
        if (editingItem && editingItem.storage_path && editingItem.storage_path !== newFilePath) {
          await supabase.storage.from('galeria').remove([editingItem.storage_path])
        }

        filePath = newFilePath
      }

      if (editingItem) {
        // ACTUALIZAR (UPDATE)
        const updatePayload = {
          title: form.title.trim(),
          description: form.description?.trim() || null,
          category: form.category,
        }
        if (publicUrl) updatePayload.image_url = publicUrl
        if (filePath) updatePayload.storage_path = filePath

        const { error: updateError } = await supabase
          .from('gallery')
          .update(updatePayload)
          .eq('id', editingItem.id)

        if (updateError) throw updateError
        setMessage({ type: 'success', text: '¡Fotografía actualizada con éxito!' })
      } else {
        // CREAR (INSERT)
        const { error: insertError } = await supabase
          .from('gallery')
          .insert([{
            title: form.title.trim(),
            description: form.description?.trim() || null,
            category: form.category,
            image_url: publicUrl,
            storage_path: filePath,
          }])

        if (insertError) throw insertError
        setMessage({ type: 'success', text: '¡Fotografía agregada con éxito a la galería!' })
      }

      await refetch()
      setTimeout(() => closeModal(), 1200)
    } catch (error) {
      console.error('Error al guardar fotografía:', error)
      setMessage({
        type: 'error',
        text: error.message || 'Ocurrió un error al procesar la fotografía. Verifica tus permisos o conexión.',
      })
    } finally {
      setLoading(false)
    }
  }

  // Eliminar fotografía
  const handleConfirmDelete = async () => {
    if (!deleteConfirmItem) return
    setLoading(true)

    try {
      if (!isSupabaseConfigured) {
        // Modo demo
        const currentDemo = JSON.parse(sessionStorage.getItem('siemprelinda_demo_gallery') || '[]')
        const filtered = currentDemo.filter(item => item.id !== deleteConfirmItem.id)
        sessionStorage.setItem('siemprelinda_demo_gallery', JSON.stringify(filtered))
        setDeleteConfirmItem(null)
        await refetch()
        return
      }

      // Eliminar de Storage si existe storage_path
      if (deleteConfirmItem.storage_path) {
        const { error: storageError } = await supabase.storage
          .from('galeria')
          .remove([deleteConfirmItem.storage_path])
        if (storageError) {
          console.warn('Advertencia al remover de Storage:', storageError.message)
        }
      }

      // Eliminar de Database
      const { error: dbError } = await supabase
        .from('gallery')
        .delete()
        .eq('id', deleteConfirmItem.id)

      if (dbError) throw dbError

      setDeleteConfirmItem(null)
      await refetch()
    } catch (error) {
      console.error('Error al eliminar fotografía:', error)
      alert(`Error al eliminar: ${error.message || 'Intenta nuevamente.'}`)
    } finally {
      setLoading(false)
    }
  }

  // Filtrado de fotos en la tabla/grid de admin
  const fotosFiltradas = useMemo(() => {
    return gallery.filter(foto => {
      const titulo = (foto.title || foto.descripcion || '').toLowerCase()
      const desc = (foto.description || '').toLowerCase()
      const cat = (foto.category || foto.categoria || '').toLowerCase()
      const matchesText = titulo.includes(busqueda.toLowerCase()) || desc.includes(busqueda.toLowerCase())

      if (filtroCategoria === 'Todas') return matchesText
      return matchesText && cat === filtroCategoria.toLowerCase()
    })
  }, [gallery, busqueda, filtroCategoria])

  return (
    <div className="admin-galeria-container">
      {/* Encabezado */}
      <div className="admin-section-header">
        <div>
          <h1 className="admin-page-title">Galería de Trabajos</h1>
          <p className="admin-page-subtitle">
            Administra las fotografías de tu portafolio profesional: sube fotos, edita títulos o categorías y elimina trabajos.
          </p>
        </div>
        <button className="btn btn--gold" onClick={openCreateModal} id="btn-nuevo-trabajo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Subir Fotografía
        </button>
      </div>

      {/* Banner de estado Supabase */}
      {!isSupabaseConfigured && (
        <div className="admin-supabase-banner" role="status">
          <div className="admin-supabase-banner__icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div className="admin-supabase-banner__content">
            <h4>Modo Vista Previa Local (Supabase sin conectar)</h4>
            <p>
              Actualmente el proyecto no tiene credenciales en su archivo <code>.env</code>.
              Las fotografías que agregues o edites funcionarán de manera interactiva en memoria durante tu sesión.
              Para guardarlas permanentemente en <strong>Supabase Storage</strong> y <strong>Database</strong>,
              configura <code>VITE_SUPABASE_URL</code> y <code>VITE_SUPABASE_ANON_KEY</code>.
            </p>
          </div>
        </div>
      )}

      {/* Barra de Búsqueda y Filtros */}
      <div className="admin-galeria-toolbar">
        <div className="admin-galeria-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Buscar por título o descripción..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
            <button
              type="button"
              onClick={() => setBusqueda('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-slate-400)' }}
            >
              ×
            </button>
          )}
        </div>

        <div className="admin-galeria-filter-group">
          <select
            className="admin-galeria-filter-select"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <option value="Todas">Todas las Categorías</option>
            {CATEGORIAS_GALERIA.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <span className="admin-galeria-counter">
            {fotosFiltradas.length} {fotosFiltradas.length === 1 ? 'fotografía' : 'fotografías'}
          </span>
        </div>
      </div>

      {/* Lista de Fotografías */}
      {loadingGallery ? (
        <div className="admin-loading">
          <p>Cargando fotografías de la galería...</p>
        </div>
      ) : fotosFiltradas.length === 0 ? (
        <div className="admin-empty">
          <svg className="admin-empty__icon" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <p className="admin-empty__text" style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-md)' }}>
            {busqueda || filtroCategoria !== 'Todas'
              ? 'No se encontraron fotografías con los filtros aplicados.'
              : 'Aún no has agregado fotografías a la galería.'}
          </p>
          <button className="btn btn--gold" onClick={openCreateModal}>
            + Agregar Primer Trabajo
          </button>
        </div>
      ) : (
        <div className="admin-gallery-grid">
          {fotosFiltradas.map((trabajo) => {
            const imgUrl = trabajo.image_url || trabajo.src
            const titulo = trabajo.title || trabajo.descripcion || 'Sin título'
            const categoria = trabajo.category || trabajo.categoria || 'General'
            const fecha = trabajo.created_at
              ? new Date(trabajo.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })
              : null

            return (
              <div key={trabajo.id} className="admin-galeria-card">
                <div className="admin-galeria-card__image-wrap">
                  <img
                    src={imgUrl}
                    alt={titulo}
                    className="admin-galeria-card__image"
                    loading="lazy"
                  />
                  <span className="admin-galeria-card__badge">{categoria}</span>
                </div>

                <div className="admin-galeria-card__body">
                  <h4 className="admin-galeria-card__title">{titulo}</h4>
                  {trabajo.description && (
                    <p className="admin-galeria-card__desc">{trabajo.description}</p>
                  )}
                  {fecha && (
                    <span className="admin-galeria-card__date">Subida: {fecha}</span>
                  )}
                </div>

                <div className="admin-galeria-card__actions">
                  <button
                    className="admin-btn admin-btn--ghost"
                    onClick={() => openEditModal(trabajo)}
                    title="Editar información o foto"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Editar
                  </button>

                  <button
                    className="admin-btn admin-btn--danger"
                    onClick={() => setDeleteConfirmItem(trabajo)}
                    title="Eliminar trabajo"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal CREAR / EDITAR */}
      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__header">
              <h2 className="admin-modal__title">
                {editingItem ? 'Editar Trabajo' : 'Subir Nueva Fotografía'}
              </h2>
              <button className="admin-modal__close" onClick={closeModal} aria-label="Cerrar">×</button>
            </div>

            <div className="admin-modal__body">
              {message && (
                <div className={`admin-message admin-message--${message.type}`}>
                  {message.text}
                </div>
              )}

              <form id="galleryForm" className="admin-form" onSubmit={handleSubmit} style={{ boxShadow: 'none', padding: 0, border: 'none' }}>
                {/* Zona de Fotografía */}
                <div className="admin-form__field">
                  <label>
                    {editingItem ? 'Fotografía (Opcional si deseas cambiarla)' : 'Fotografía *'}
                  </label>

                  {previewUrl ? (
                    <div className="admin-upload-preview">
                      <img src={previewUrl} alt="Vista previa" />
                      <div className="admin-upload-preview__overlay">
                        <span>{file ? file.name : 'Imagen actual'}</span>
                        <button
                          type="button"
                          className="admin-upload-preview__remove"
                          onClick={removeSelectedFile}
                        >
                          {editingItem ? 'Revertir a original' : 'Quitar imagen'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="admin-upload-dropzone">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileChange}
                        required={!editingItem}
                      />
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-gold)', margin: '0 auto 8px' }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-slate-800)', margin: '0 0 4px' }}>
                        Selecciona o arrastra una fotografía
                      </p>
                      <small style={{ color: 'var(--color-slate-400)' }}>
                        Formatos: JPG, PNG o WEBP (máx. 5MB)
                      </small>
                    </div>
                  )}

                  {editingItem && previewUrl && (
                    <div style={{ marginTop: '8px' }}>
                      <label style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)', cursor: 'pointer' }}>
                        <span>📷 ¿Deseas reemplazar por otra foto?</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleFileChange}
                          style={{ display: 'block', marginTop: '4px', fontSize: '11px' }}
                        />
                      </label>
                    </div>
                  )}
                </div>

                {/* Categoría */}
                <div className="admin-form__field">
                  <label htmlFor="gallery-category">Categoría *</label>
                  <select
                    id="gallery-category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                  >
                    {CATEGORIAS_GALERIA.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Título */}
                <div className="admin-form__field">
                  <label htmlFor="gallery-title">Título del Trabajo *</label>
                  <input
                    type="text"
                    id="gallery-title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    placeholder="ej: Balayage Caramelo Luminoso"
                  />
                </div>

                {/* Descripción */}
                <div className="admin-form__field">
                  <label htmlFor="gallery-description">Descripción (opcional)</label>
                  <textarea
                    id="gallery-description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Detalles del procedimiento, técnica o tono aplicado..."
                  ></textarea>
                </div>
              </form>
            </div>

            <div className="admin-modal__footer">
              <button className="admin-btn admin-btn--ghost" onClick={closeModal} type="button" disabled={loading}>
                Cancelar
              </button>
              <button className="btn btn--gold" form="galleryForm" type="submit" disabled={loading}>
                {loading ? 'Guardando...' : editingItem ? 'Actualizar Trabajo' : 'Guardar Trabajo'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación de Eliminación */}
      {deleteConfirmItem && (
        <div className="admin-modal-overlay" onClick={() => !loading && setDeleteConfirmItem(null)}>
          <div className="admin-modal" style={{ maxWidth: 440 }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__body">
              <div className="admin-delete-confirm">
                <div className="admin-delete-confirm__icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </div>
                <h3 className="admin-delete-confirm__title">¿Eliminar esta fotografía?</h3>
                <p className="admin-delete-confirm__text">
                  Estás a punto de borrar <strong>"{deleteConfirmItem.title || deleteConfirmItem.descripcion}"</strong>.
                  Esta acción eliminará la imagen permanentemente de tu galería.
                </p>

                <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center' }}>
                  <button
                    className="admin-btn admin-btn--ghost"
                    onClick={() => setDeleteConfirmItem(null)}
                    disabled={loading}
                    type="button"
                  >
                    Cancelar
                  </button>
                  <button
                    className="admin-btn admin-btn--danger"
                    onClick={handleConfirmDelete}
                    disabled={loading}
                    type="button"
                    style={{ padding: '8px 20px' }}
                  >
                    {loading ? 'Eliminando...' : 'Sí, Eliminar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminGaleria
