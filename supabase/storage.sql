-- ============================================
-- SALÓN DE BELLEZA SIEMPRE LINDA
-- Supabase Storage Configuration
-- ============================================
-- Ejecutar en el SQL Editor de Supabase
-- DESPUÉS de haber ejecutado schema.sql y rls_policies.sql
-- ============================================

-- 1. Crear bucket público para galería de trabajos si no existe
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'galeria',
  'galeria',
  true,
  5242880, -- Límite de 5MB por imagen
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- ============================================
-- POLÍTICAS DE SEGURIDAD (STORAGE RLS)
-- ============================================

-- A. Lectura pública de imágenes de la galería
DROP POLICY IF EXISTS "Public can view gallery images" ON storage.objects;
CREATE POLICY "Public can view gallery images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'galeria');

-- B. Solo administradora puede subir fotografías
DROP POLICY IF EXISTS "Admin can upload gallery images" ON storage.objects;
CREATE POLICY "Admin can upload gallery images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'galeria'
    AND (
      public.is_admin()
      OR EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );

-- C. Solo administradora puede actualizar fotografías
DROP POLICY IF EXISTS "Admin can update gallery images" ON storage.objects;
CREATE POLICY "Admin can update gallery images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'galeria'
    AND (
      public.is_admin()
      OR EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );

-- D. Solo administradora puede eliminar fotografías
DROP POLICY IF EXISTS "Admin can delete gallery images" ON storage.objects;
CREATE POLICY "Admin can delete gallery images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'galeria'
    AND (
      public.is_admin()
      OR EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
      )
    )
  );
