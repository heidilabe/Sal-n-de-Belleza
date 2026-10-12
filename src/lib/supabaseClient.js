import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://tu-proyecto.supabase.co' &&
  !supabaseUrl.includes('dummy-project') &&
  supabaseAnonKey !== 'tu-anon-key-publica' &&
  supabaseAnonKey !== 'dummy-anon-key'
)

if (!isSupabaseConfigured) {
  console.warn(
    '[Supabase] Variables de entorno no configuradas o con valores de ejemplo. ' +
    'Para persistencia en la nube y subida de fotos a Storage, crea un archivo .env con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://dummy-project.supabase.co',
  supabaseAnonKey || 'dummy-anon-key'
)

