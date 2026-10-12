function SectionTitle({ subtitle, title, description, align = 'center' }) {
  return (
    <div className="section__header" style={{ textAlign: align }}>
      <span className="section__subtitle">{subtitle}</span>
      <h2 className="section__title">{title}</h2>
      <div className="gold-line" style={{ marginLeft: align === 'left' ? 0 : 'auto', marginRight: align === 'left' ? 0 : 'auto' }}></div>
      {description && <p className="section__description">{description}</p>}
    </div>
  )
}

export default SectionTitle