/* ============================================
   CONTENIDO DE LA PÁGINA DE INICIO
   --------------------------------------------
   - featuredSlugs: servicios destacados (referencias a services.js)
   - testimonials: opiniones ficticias de demostración
   - values: ventajas del estudio (icono: 'star' | 'award' | 'sparkle' | 'vip')
   ============================================ */

export const FEATURED_SLUGS = [
  'balayage-babylight',
  'corte-de-pelo',
  'tintura-completa',
  'alisado-keratina',
]

export const TESTIMONIALS = [
  {
    id: 1,
    nombre: 'Elena Martens',
    servicio: 'Balayage Premium & Tratamiento',
    comentario:
      'La atención en SALÓN DE BELLEZA SIEMPRE LINDA es simplemente inigualable. Lograron exactamente el tono rubio mantequilla que siempre soñé sin dañar mi cabello.',
    estrellas: 5,
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 2,
    nombre: 'Sofía Carvajal',
    servicio: 'Corte Couture & Spa Capilar',
    comentario:
      'Un oasis de relajación. El masaje capilar durante el lavado es de otro nivel y el corte quedó con un movimiento increíble.',
    estrellas: 5,
    foto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 3,
    nombre: 'Valentina Ross',
    servicio: 'Peinado para Evento',
    comentario:
      'Contraté el servicio para un evento especial y quedé fascinada. La puntualidad y delicadeza del equipo fue perfecta.',
    estrellas: 5,
    foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
  },
]

export const VALUES = [
  {
    icono: 'star',
    titulo: 'Productos de Alta Gama',
    descripcion:
      'Trabajamos exclusivamente con marcas internacionales de prestigio como Kérastase Paris, Olaplex, L’Oréal Professionnel y OPI.',
  },
  {
    icono: 'award',
    titulo: 'Estilistas Certificados',
    descripcion:
      'Nuestro equipo cuenta con formación continua en academias internacionales de alta peluquería.',
  },
  {
    icono: 'sparkle',
    titulo: 'Diagnóstico Personalizado',
    descripcion:
      'Cada sesión inicia con una evaluación capilar y dérmica detallada para garantizar resultados impecables y seguros.',
  },
  {
    icono: 'vip',
    titulo: 'Experiencia VIP & Confort',
    descripcion:
      'Disfruta de nuestra carta de café de especialidad, té herbal, espumante de bienvenida y Wi-Fi en cabinas privadas.',
  },
]