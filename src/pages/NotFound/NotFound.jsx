import { Link } from 'react-router-dom'
import Seo from '../../components/Seo/Seo'
import './NotFound.css'

function NotFound() {
  return (
    <div className="page-404">
      <Seo
        title="Página no encontrada | SALÓN DE BELLEZA SIEMPRE LINDA"
        description="La página que buscas no existe. Vuelve al inicio de SALÓN DE BELLEZA SIEMPRE LINDA."
      />
      <div className="container page-404__inner">
        <span className="page-404__code">404</span>
        <h1 className="page-404__title">Página no encontrada</h1>
        <p className="page-404__text">
          La página que estás buscando no existe o fue movida. Vuelve al inicio
          para continuar explorando el estudio.
        </p>
        <Link to="/" className="btn btn--gold">Volver al inicio</Link>
      </div>
    </div>
  )
}

export default NotFound