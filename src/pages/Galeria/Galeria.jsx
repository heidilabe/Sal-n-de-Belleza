import { useState, useEffect, useCallback } from 'react'
import { GALLERY_CATEGORIES } from '../../data/gallery'
import { useGallery } from '../../hooks/useGallery'
import PageHeader from '../../components/PageHeader/PageHeader'
import GalleryCard from '../../components/GalleryCard/GalleryCard'
import Seo from '../../components/Seo/Seo'
import './Galeria.css'

function Galeria() {
  const { gallery, loading } = useGallery()
  const [filtro, setFiltro] = useState('Todos')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const fotos = filtro === 'Todos'
    ? gallery
    : gallery.filter((f) => {
        const cat = (f.category || f.categoria || '').trim()
        if (filtro === 'Color / Tintura' && (cat === 'Color' || cat === 'Color / Tintura' || cat.toLowerCase() === 'color')) return true
        if (filtro === 'Color' && (cat === 'Color' || cat === 'Color / Tintura')) return true
        return cat.toLowerCase() === filtro.toLowerCase()
      })

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const navigate = useCallback((direccion) => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev
      return (prev + direccion + fotos.length) % fotos.length
    })
  }, [fotos.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, closeLightbox, navigate])

  const fotoActual = lightboxIndex !== null ? fotos[lightboxIndex] : null

  return (
    <div className="page-galeria">
      <Seo
        title="Galería | SALÓN DE BELLEZA SIEMPRE LINDA"
        description="Galería de trabajos de SALÓN DE BELLEZA SIEMPRE LINDA: cortes, coloración, balayage, mechas, peinados y tratamientos capilares."
      />

      <PageHeader
        subtitle="Nuestro Portafolio"
        title="Galería"
        text="Un vistazo a nuestro espacio, nuestro equipo y el arte que creamos día a día en SALÓN DE BELLEZA SIEMPRE LINDA."
      />

      {/* Filter Bar */}
      <section className="galeria-filter">
        <div className="container">
          <div className="galeria-filter__bar" aria-label="Filtrar galería por categoría">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                aria-pressed={filtro === cat}
                className={`galeria-filter__btn ${filtro === cat ? 'galeria-filter__btn--active' : ''}`}
                onClick={() => { setFiltro(cat); setLightboxIndex(null) }}
                id={`gallery-filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section galeria-section">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-4xl)' }}>
              <p>Cargando galería...</p>
            </div>
          ) : fotos.length === 0 ? (
            <p className="galeria-empty">No hay imágenes en esta categoría.</p>
          ) : (
            <div className="galeria-grid">
              {fotos.map((foto, index) => (
                <GalleryCard
                  key={foto.id}
                  foto={foto}
                  index={index}
                  onOpen={() => setLightboxIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {fotoActual && (
        <div
          className="galeria-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada: ${fotoActual.alt}`}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="galeria-lightbox__close"
            onClick={closeLightbox}
            aria-label="Cerrar imagen ampliada"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <button
            type="button"
            className="galeria-lightbox__nav galeria-lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); navigate(-1) }}
            aria-label="Imagen anterior"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <figure className="galeria-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={fotoActual.image_url || fotoActual.src} 
              alt={fotoActual.title || fotoActual.alt || fotoActual.descripcion} 
              className="galeria-lightbox__image" 
            />
            <figcaption className="galeria-lightbox__caption">
              <span className="galeria-lightbox__categoria">{fotoActual.category || fotoActual.categoria}</span>
              <span className="galeria-lightbox__titulo">{fotoActual.title || fotoActual.descripcion}</span>
            </figcaption>
          </figure>

          <button
            type="button"
            className="galeria-lightbox__nav galeria-lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); navigate(1) }}
            aria-label="Imagen siguiente"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default Galeria