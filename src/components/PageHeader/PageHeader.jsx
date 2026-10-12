import './PageHeader.css'

function PageHeader({ subtitle, title, text }) {
  return (
    <section className="page-header">
      <div className="page-header__overlay"></div>
      <div className="container page-header__content">
        <span className="section__subtitle">{subtitle}</span>
        <h1 className="page-header__title">{title}</h1>
        <div className="gold-line"></div>
        {text && <p className="page-header__text">{text}</p>}
      </div>
    </section>
  )
}

export default PageHeader