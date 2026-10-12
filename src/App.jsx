import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import Inicio from './pages/Inicio/Inicio'
import Servicios from './pages/Servicios/Servicios'
import ServicioDetalle from './pages/ServicioDetalle/ServicioDetalle'
import Nosotros from './pages/Nosotros/Nosotros'
import Galeria from './pages/Galeria/Galeria'
import Promociones from './pages/Promociones/Promociones'
import Reservas from './pages/Reservas/Reservas'
import Contacto from './pages/Contacto/Contacto'
import NotFound from './pages/NotFound/NotFound'
import Login from './pages/Login/Login'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import AdminServicios from './pages/Admin/AdminServicios'
import AdminGaleria from './pages/Admin/AdminGaleria'
import AdminVentas from './pages/Admin/AdminVentas'
import AdminAgenda from './pages/Admin/AdminAgenda'
import AdminHorarios from './pages/Admin/AdminHorarios'
import AdminConfig from './pages/Admin/AdminConfig'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

/* Scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<PublicLayout><Inicio /></PublicLayout>} />
        <Route path="/servicios" element={<PublicLayout><Servicios /></PublicLayout>} />
        <Route path="/servicios/:slug" element={<PublicLayout><ServicioDetalle /></PublicLayout>} />
        <Route path="/nosotros" element={<PublicLayout><Nosotros /></PublicLayout>} />
        <Route path="/galeria" element={<PublicLayout><Galeria /></PublicLayout>} />
        <Route path="/promociones" element={<PublicLayout><Promociones /></PublicLayout>} />
        <Route path="/reservas" element={<PublicLayout><Reservas /></PublicLayout>} />
        <Route path="/contacto" element={<PublicLayout><Contacto /></PublicLayout>} />
        
        {/* Rutas de Autenticación */}
        <Route path="/login" element={<Login />} />

        {/* Rutas de Administración Protegidas */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="agenda" element={<AdminAgenda />} />
          <Route path="galeria" element={<AdminGaleria />} />
          <Route path="ventas" element={<AdminVentas />} />
          <Route path="servicios" element={<AdminServicios />} />
          <Route path="horarios" element={<AdminHorarios />} />
          <Route path="configuracion" element={<AdminConfig />} />
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </>
  )
}

export default App