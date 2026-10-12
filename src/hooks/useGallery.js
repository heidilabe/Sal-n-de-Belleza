import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import { GALLERY } from '../data/gallery'

export function useGallery(options = {}) {
  const { adminMode = false } = options
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      if (!isSupabaseConfigured) {
        // Modo local / demostración mientras no se configuren credenciales en .env
        const localStored = sessionStorage.getItem('siemprelinda_demo_gallery')
        const demoItems = localStored ? JSON.parse(localStored) : []
        if (adminMode) {
          setGallery(demoItems)
        } else {
          setGallery([...demoItems, ...GALLERY])
        }
        return
      }

      // Consulta a Supabase Database (tabla 'gallery')
      const { data, error: dbError } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })

      if (dbError) {
        console.warn('Error al consultar tabla gallery en Supabase:', dbError.message)
        setError(dbError.message)
        setGallery(adminMode ? [] : GALLERY)
      } else {
        const supabasePhotos = data || []
        if (adminMode) {
          // En el panel admin: se muestran exactamente las fotos administrables de la base de datos
          setGallery(supabasePhotos)
        } else {
          // En la galería pública: las fotos de la peluquera van primero (más recientes arriba)
          // y se combinan con las fotos base del salón para mantener el portafolio completo
          setGallery([...supabasePhotos, ...GALLERY])
        }
      }
    } catch (err) {
      console.warn('Excepción al cargar galería:', err)
      setError(err.message)
      setGallery(adminMode ? [] : GALLERY)
    } finally {
      setLoading(false)
    }
  }, [adminMode])

  useEffect(() => {
    fetchGallery()
  }, [fetchGallery])

  return { gallery, loading, error, refetch: fetchGallery }
}

