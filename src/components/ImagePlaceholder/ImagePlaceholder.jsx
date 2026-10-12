import './ImagePlaceholder.css'

function ImagePlaceholder({ label = 'Imagen pendiente', className = '' }) {
  return (
    <div className={`image-placeholder ${className}`.trim()}>
      <svg
        className="image-placeholder__icon"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <path d="M21 15l-5-5L5 21"></path>
      </svg>
      <span className="image-placeholder__text">{label}</span>
      <span className="image-placeholder__sub">Fotografía propia próximamente</span>
    </div>
  )
}

export default ImagePlaceholder