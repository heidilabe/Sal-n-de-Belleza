-- ============================================
-- SALÓN DE BELLEZA SIEMPRE LINDA
-- Row Level Security Policies
-- ============================================
-- Ejecutar DESPUÉS de schema.sql
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_config ENABLE ROW LEVEL SECURITY;

-- ============================================
-- FUNCIÓN AUXILIAR: verificar si es admin
-- ============================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- PROFILES
-- ============================================
-- Los usuarios pueden ver su propio perfil
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Admin puede ver todos los perfiles
CREATE POLICY "Admin can view all profiles"
  ON profiles FOR SELECT
  USING (public.is_admin());

-- Admin puede actualizar perfiles
CREATE POLICY "Admin can update profiles"
  ON profiles FOR UPDATE
  USING (public.is_admin());

-- ============================================
-- SERVICES
-- ============================================
-- Lectura pública de servicios activos
CREATE POLICY "Public can view active services"
  ON services FOR SELECT
  USING (is_active = true);

-- Admin puede ver todos los servicios (incluyendo inactivos)
CREATE POLICY "Admin can view all services"
  ON services FOR SELECT
  USING (public.is_admin());

-- Admin puede crear servicios
CREATE POLICY "Admin can insert services"
  ON services FOR INSERT
  WITH CHECK (public.is_admin());

-- Admin puede editar servicios
CREATE POLICY "Admin can update services"
  ON services FOR UPDATE
  USING (public.is_admin());

-- Admin puede eliminar servicios
CREATE POLICY "Admin can delete services"
  ON services FOR DELETE
  USING (public.is_admin());

-- ============================================
-- GALLERY
-- ============================================
-- Lectura pública de galería
DROP POLICY IF EXISTS "Public can view gallery" ON gallery;
CREATE POLICY "Public can view gallery"
  ON gallery FOR SELECT
  USING (true);

-- Admin puede insertar trabajos
DROP POLICY IF EXISTS "Admin can insert gallery" ON gallery;
CREATE POLICY "Admin can insert gallery"
  ON gallery FOR INSERT
  WITH CHECK (public.is_admin());

-- Admin puede actualizar trabajos
DROP POLICY IF EXISTS "Admin can update gallery" ON gallery;
CREATE POLICY "Admin can update gallery"
  ON gallery FOR UPDATE
  USING (public.is_admin());

-- Admin puede eliminar trabajos
DROP POLICY IF EXISTS "Admin can delete gallery" ON gallery;
CREATE POLICY "Admin can delete gallery"
  ON gallery FOR DELETE
  USING (public.is_admin());

-- ============================================
-- SALES
-- ============================================
-- Solo admin puede ver ventas
CREATE POLICY "Admin can view sales"
  ON sales FOR SELECT
  USING (public.is_admin());

-- Solo admin puede registrar ventas
CREATE POLICY "Admin can insert sales"
  ON sales FOR INSERT
  WITH CHECK (public.is_admin());

-- Solo admin puede actualizar ventas
CREATE POLICY "Admin can update sales"
  ON sales FOR UPDATE
  USING (public.is_admin());

-- Solo admin puede eliminar ventas
CREATE POLICY "Admin can delete sales"
  ON sales FOR DELETE
  USING (public.is_admin());

-- ============================================
-- BUSINESS_HOURS
-- ============================================
-- Lectura pública de horarios
CREATE POLICY "Public can view business hours"
  ON business_hours FOR SELECT
  USING (true);

-- Solo admin puede modificar horarios
CREATE POLICY "Admin can insert business hours"
  ON business_hours FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update business hours"
  ON business_hours FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admin can delete business hours"
  ON business_hours FOR DELETE
  USING (public.is_admin());

-- ============================================
-- RESERVATIONS
-- ============================================
-- Las clientas pueden crear reservas (INSERT público)
CREATE POLICY "Public can create reservations"
  ON reservations FOR INSERT
  WITH CHECK (true);

-- Admin puede ver todas las reservas
CREATE POLICY "Admin can view all reservations"
  ON reservations FOR SELECT
  USING (public.is_admin());

-- Admin puede actualizar reservas (confirmar, cancelar, completar)
CREATE POLICY "Admin can update reservations"
  ON reservations FOR UPDATE
  USING (public.is_admin());

-- Admin puede eliminar reservas
CREATE POLICY "Admin can delete reservations"
  ON reservations FOR DELETE
  USING (public.is_admin());

-- Lectores públicos pueden ver reservas por fecha (para saber qué horarios están ocupados)
-- Solo devuelve campos limitados gracias a la query del frontend
CREATE POLICY "Public can view reservation times"
  ON reservations FOR SELECT
  USING (true);

-- ============================================
-- BUSINESS_CONFIG
-- ============================================
-- Lectura pública de configuración
CREATE POLICY "Public can view config"
  ON business_config FOR SELECT
  USING (true);

-- Solo admin puede modificar configuración
CREATE POLICY "Admin can insert config"
  ON business_config FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin can update config"
  ON business_config FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admin can delete config"
  ON business_config FOR DELETE
  USING (public.is_admin());
