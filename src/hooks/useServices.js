import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { SERVICES as fallbackServices, HAIRSTYLES as fallbackHairstyles } from '../data/services'

export function useServices() {
  const [services, setServices] = useState([])
  const [hairstyles, setHairstyles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchServices = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) {
        // If Supabase fails (e.g. not configured yet), use fallback
        console.warn('Usando servicios locales debido a un error de Supabase:', error.message)
        setServices(fallbackServices)
        setHairstyles(fallbackHairstyles)
      } else if (data && data.length > 0) {
        setServices(data)
        // For now, hairstyles remain local as they are static categories of cuts
        setHairstyles(fallbackHairstyles)
      } else {
        // Database is empty, use fallback
        setServices(fallbackServices)
        setHairstyles(fallbackHairstyles)
      }
    } catch (err) {
      console.warn('Usando servicios locales debido a una excepción:', err)
      setServices(fallbackServices)
      setHairstyles(fallbackHairstyles)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  return { services, hairstyles, loading, error, refetch: fetchServices }
}
