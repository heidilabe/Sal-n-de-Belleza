-- ============================================
-- SALÓN DE BELLEZA SIEMPRE LINDA
-- Datos Iniciales (Seed)
-- ============================================
-- Ejecutar DESPUÉS de schema.sql y rls_policies.sql
-- ============================================

-- ============================================
-- SERVICIOS INICIALES
-- ============================================
INSERT INTO services (slug, name, description, category, price, price_number, duration, nota, is_active, sort_order) VALUES
  ('corte-de-pelo', 'Corte de pelo', 'Corte personalizado según la forma de tu rostro, tu textura y el estilo que deseas. Incluye lavado y asesoría.', 'Cabello', '$15.000', 15000, 60, NULL, true, 1),
  ('lavado-y-brushing', 'Lavado y brushing', 'Lavado con masaje relajante y secado con técnica de cepillo para un acabado liso, con cuerpo o con ondas.', 'Cabello', '$12.000', 12000, 60, NULL, true, 2),
  ('tintura-raiz', 'Tintura de raíz', 'Retoque de raíz con el mismo tono de tu coloración, acabado perfecto sin marca de crecimiento.', 'Cabello', '$22.000', 22000, 60, NULL, true, 3),
  ('tintura-completa', 'Tintura completa', 'Coloración global con fórmula personalizada según tu tono de piel y estilo. Incluye cuidado post-color.', 'Cabello', '$35.000', 35000, 120, NULL, true, 4),
  ('balayage-babylight', 'Balayage / Babylight', 'Iluminación degradada a mano alzada o mechas ultrafinas para un efecto natural, luminoso y de bajo mantenimiento.', 'Cabello', 'Valor según largo', 0, 180, 'Valor según largo y volumen del cabello', true, 5),
  ('alisado-keratina', 'Alisado de keratina', 'Alisado semipermanente que elimina el frizz, aporta brillo y facilita el peinado por varios meses.', 'Cabello', '$80.000', 80000, 180, 'Valor según largo y volumen del cabello', true, 6),
  ('manicura-unas', 'Manicura y uñas', 'Manicura completa con acabado profesional: esmaltado, hidratación y diseños de tendencia para tus manos.', 'Uñas', '$10.000', 10000, 45, NULL, true, 7),
  ('tratamiento-capilar', 'Tratamiento capilar', 'Nutrición y reparación profunda para recuperar el brillo, la suavidad y la salud del cabello.', 'Cabello', '$18.000', 18000, 60, NULL, true, 8)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- HORARIOS INICIALES
-- ============================================
-- 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
INSERT INTO business_hours (day_of_week, day_name, open_time, close_time, is_closed) VALUES
  (0, 'Domingo', NULL, NULL, true),
  (1, 'Lunes', '09:00', '18:00', false),
  (2, 'Martes', '09:00', '18:00', false),
  (3, 'Miércoles', '09:00', '18:00', false),
  (4, 'Jueves', '09:00', '20:00', false),
  (5, 'Viernes', '09:00', '20:00', false),
  (6, 'Sábado', '09:00', '14:00', false)
ON CONFLICT (day_of_week) DO NOTHING;

-- ============================================
-- CONFIGURACIÓN INICIAL
-- ============================================
INSERT INTO business_config (key, value) VALUES
  ('whatsapp_number', '56912345678'),
  ('business_name', 'SALÓN DE BELLEZA SIEMPRE LINDA'),
  ('business_phone', '+56 9 1234 5678'),
  ('business_email', 'contacto@siemprelinda.cl'),
  ('business_address', 'Av. Providencia 1234, Local 5, Providencia, Santiago — Chile'),
  ('slot_duration', '30')
ON CONFLICT (key) DO NOTHING;
