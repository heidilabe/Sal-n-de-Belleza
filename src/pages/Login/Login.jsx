import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { isSupabaseConfigured } from '../../lib/supabaseClient'
import Seo from '../../components/Seo/Seo'
import './Login.css'

function Login() {
  const { user, isAdmin, loading, login } = useAuth()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const destino = location.state?.from?.pathname || '/admin/galeria'

  if (loading) {
    return (
      <div className="login-loading">
        <p>Cargando...</p>
      </div>
    )
  }

  if (user && isAdmin) {
    return <Navigate to={destino} replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!isSupabaseConfigured) {
      setSubmitting(true)
      try {
        await login(email.trim() || 'admin@siemprelinda.cl', 'demo123')
      } catch (err) {
        setError(err.message)
      } finally {
        setSubmitting(false)
      }
      return
    }

    if (!email.trim()) {
      setError('Ingresa tu correo electrónico.')
      return
    }
    if (!password) {
      setError('Ingresa tu contraseña.')
      return
    }

    setSubmitting(true)
    try {
      await login(email.trim(), password)
    } catch (err) {
      if (err.message?.includes('Invalid login')) {
        setError('Correo o contraseña incorrectos.')
      } else {
        setError('Error al iniciar sesión. Intenta nuevamente.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-login">
      <Seo
        title="Acceso Administración | SALÓN DE BELLEZA SIEMPRE LINDA"
        description="Acceso al panel de administración de SALÓN DE BELLEZA SIEMPRE LINDA."
      />
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <span className="login-header__accent">S</span>ALÓN DE BELLEZA
            <span className="login-header__divider">|</span>
            <span className="login-header__tagline">Siempre Linda</span>
          </div>
          <h1 className="login-title">Panel de Administración</h1>
          <p className="login-subtitle">Ingresa con tu cuenta para acceder al panel.</p>

          {!isSupabaseConfigured && (
            <div style={{
              background: 'rgba(201, 169, 110, 0.12)',
              border: '1px solid rgba(201, 169, 110, 0.35)',
              borderRadius: 'var(--border-radius-sm)',
              padding: 'var(--space-md) var(--space-lg)',
              marginBottom: 'var(--space-lg)',
              fontSize: 'var(--text-xs)',
              lineHeight: 1.5,
              color: 'var(--color-slate-700)'
            }}>
              <strong style={{ color: 'var(--color-gold-dark)', display: 'block', marginBottom: '4px' }}>
                ℹ️ Supabase no está conectado todavía
              </strong>
              Para conectar tu proyecto real y persistir las fotos en la nube, añade las credenciales en tu archivo <code>.env</code>.
              Puedes ingresar ahora en <strong>Modo Demostración</strong> para explorar el panel y probar el CRUD de galería.
            </div>
          )}

          {error && (
            <div className="login-error" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="login-field">
              <label htmlFor="login-email">Correo electrónico</label>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@siemprelinda.cl"
                autoComplete="email"
                disabled={submitting}
              />
            </div>
            <div className="login-field">
              <label htmlFor="login-password">Contraseña</label>
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={submitting}
              />
            </div>
            <button
              type="submit"
              className="btn btn--gold login-submit"
              disabled={submitting}
            >
              {submitting ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
