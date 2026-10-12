import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { BUSINESS } from '../../data/business'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/servicios', label: 'Servicios' },
  { path: '/nosotros', label: 'Nosotros' },
  { path: '/galeria', label: 'Galería' },
  { path: '/promociones', label: 'Promociones' },
  { path: '/contacto', label: 'Contacto' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-accent">S</span>ALÓN DE BELLEZA
          <span className="navbar__logo-divider">|</span>
          <span className="navbar__logo-tagline">Siempre Linda</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__nav" id="main-navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              end={link.path === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button */}
        <Link to="/reservas" className="navbar__cta btn btn--gold">
          Reservar Cita
        </Link>

        {/* Mobile Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          id="mobile-menu-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`navbar__overlay ${menuOpen ? 'navbar__overlay--open' : ''}`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Menu */}
      <nav
        className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}
        id="mobile-navigation"
      >
        <div className="navbar__mobile-header">
          <Link to="/" className="navbar__logo" onClick={closeMenu}>
            <span className="navbar__logo-accent">S</span>ALÓN DE BELLEZA
            <span className="navbar__logo-divider">|</span>
            <span className="navbar__logo-tagline">Siempre Linda</span>
          </Link>
        </div>

        <div className="navbar__mobile-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
              }
              end={link.path === '/'}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/reservas"
          className="navbar__mobile-cta btn btn--gold"
          onClick={closeMenu}
        >
          Reservar Cita
        </Link>

        <div className="navbar__mobile-info">
          <p>{BUSINESS.hours[0].day}: {BUSINESS.hours[0].time}</p>
          <p>{BUSINESS.phoneDisplay}</p>
        </div>
      </nav>
    </header>
  )
}

export default Navbar