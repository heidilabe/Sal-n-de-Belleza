/* ============================================
   PROMOCIONES
   --------------------------------------------
   Cada promoción:
   - slug: identificador
   - servicioSlug: servicio a preseleccionar en el formulario
     (debe coincidir con un slug de src/data/services.js)
   - precioAnterior: precio tachado (opcional, null si no aplica)
   - vigencia: período de validez

   La imagen de la promoción se toma automáticamente de
   la imagen del servicio asociado. Si el servicio no tiene
   imagen, se muestra "Imagen pendiente".
   ============================================ */

export const PROMOTIONS = [
  {
    id: 1,
    slug: 'balayage-hidratacion',
    servicioSlug: 'balayage-babylight',
    nombre: 'Balayage + Hidratación Profunda',
    descripcion:
      'Balayage a mano alzada con matización personalizada, más tratamiento sellador de brillo con ácido hialurónico.',
    precioAnterior: '$86.000',
    precio: '$69.000',
    vigencia: 'Válido hasta el 30 de septiembre',
  },
  {
    id: 2,
    slug: 'corte-brushing',
    servicioSlug: 'corte-de-pelo',
    nombre: 'Corte + Brushing',
    descripcion:
      'Corte personalizado con lavado y masaje capilar, más brushing de acabado con productos professional home-care.',
    precioAnterior: '$38.000',
    precio: '$28.000',
    vigencia: 'Válido de lunes a miércoles',
  },
  {
    id: 3,
    slug: 'color-tratamiento',
    servicioSlug: 'tintura-completa',
    nombre: 'Color + Tratamiento Capilar',
    descripcion:
      'Coloración global con fórmula personalizada más tratamiento reconstructor de fibra capilar de 40 minutos.',
    precioAnterior: '$72.000',
    precio: '$55.000',
    vigencia: 'Válido hasta el 15 de octubre',
  },
  {
    id: 4,
    slug: 'pack-evento-especial',
    servicioSlug: 'lavado-y-brushing',
    nombre: 'Pack Evento Especial',
    descripcion:
      'Peinado de evento con prueba previa, acceso prioritario al estudio y cobertura de retoque el mismo día.',
    precioAnterior: '$120.000',
    precio: '$89.000',
    vigencia: 'Sujeto a disponibilidad',
  },
]

export function getPromotionBySlug(slug) {
  return PROMOTIONS.find((p) => p.slug === slug) || null
}