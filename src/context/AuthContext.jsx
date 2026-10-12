import { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const AuthContext = createContext({
  user: null,
  isAdmin: false,
  loading: true,
  isConfigured: false,
  login: async () => {},
  logout: async () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  /* Verificar rol admin en la tabla profiles */
  async function checkAdmin(userId) {
    if (!isSupabaseConfigured) return false
    try {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single()
      return data?.role === 'admin'
    } catch {
      return false
    }
  }

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Si Supabase no está configurado todavía, verificar si hay sesión demo previa
      const demoAdmin = sessionStorage.getItem('siemprelinda_demo_admin')
      if (demoAdmin) {
        setUser({
          id: 'demo-admin-id',
          email: 'admin@siemprelinda.cl',
          user_metadata: { full_name: 'Peluquera Administradora' },
        })
        setIsAdmin(true)
      }
      setLoading(false)
      return
    }

    /* Obtener sesión actual con Supabase real */
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        const admin = await checkAdmin(session.user.id)
        setIsAdmin(admin)
      }
      setLoading(false)
    })

    /* Escuchar cambios de sesión */
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          const admin = await checkAdmin(session.user.id)
          setIsAdmin(admin)
        } else {
          setUser(null)
          setIsAdmin(false)
        }
        setLoading(false)
      }
    )

    return () => subscription?.unsubscribe()
  }, [])

  async function login(email, password) {
    if (!isSupabaseConfigured) {
      // Modo demostración local mientras el usuario configura Supabase
      const demoUser = {
        id: 'demo-admin-id',
        email: email.trim() || 'admin@siemprelinda.cl',
        user_metadata: { full_name: 'Peluquera Administradora' },
      }
      sessionStorage.setItem('siemprelinda_demo_admin', 'true')
      setUser(demoUser)
      setIsAdmin(true)
      return { user: demoUser }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  }

  async function logout() {
    sessionStorage.removeItem('siemprelinda_demo_admin')
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut()
      } catch (err) {
        console.error('Error al cerrar sesión:', err)
      }
    }
    setUser(null)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, isConfigured: isSupabaseConfigured, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}

export default AuthContext
