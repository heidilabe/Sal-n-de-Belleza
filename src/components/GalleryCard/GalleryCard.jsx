import './GalleryCard.css'

function GalleryCard({ foto, onOpen, index = 0 }) {
  const imageUrl = foto.image_url || foto.src
  const imageAlt = foto.title || foto.alt || foto.descripcion || 'Trabajo de galería'
  const category = foto.category || foto.categoria
  const title = foto.title || foto.descripcion

  return (
    <figure className="galeria-item" style={{ animationDelay: `${index * 0.06}s` }}>
      <button
        type="button"
        className="galeria-item__frame"
        onClick={() => onOpen(index)}
        aria-label={`Ampliar imagen: ${imageAlt}`}
      >
        <img
          src={imageUrl}
          alt={imageAlt}
          className="galeria-item__image"
          loading="lazy"
        />
        <figcaption className="galeria-item__caption">
          <span className="galeria-item__categoria">{category}</span>
          <span className="galeria-item__titulo">{title}</span>
        </figcaption>
      </button>
    </figure>
  )
}

export default GalleryCard