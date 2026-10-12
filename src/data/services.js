/* ============================================
   SERVICIOS DEL SALÓN
   --------------------------------------------
   Las imágenes se detectan automáticamente desde:
   src/assets/images/servicios/<carpeta>/

   Coloca al menos 3 fotografías por servicio dentro
   de su carpeta (ej: lavado-brushing/lavado-1.jpg)
   y la web las usará automáticamente. Si no existe
   ninguna imagen, se muestra un espacio elegante de
   "Imagen pendiente".

   Formatos aceptados: jpg, jpeg, png, webp
   ============================================ */

const serviceImageModules = import.meta.glob(
  '/src/assets/images/servicios/**/*.{jpg,jpeg,png,webp}',
  { eager: true }
)

/* Resuelve la imagen por nombre base, aceptando subcarpetas y cualquier extensión */
function resolveServiceImage(stem) {
  for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
    const key = Object.keys(serviceImageModules).find((k) =>
      k.endsWith(`/${stem}.${ext}`)
    )
    if (key) {
      return serviceImageModules[key].default
    }
  }
  return null
}

/* Devuelve todas las imágenes de una carpeta dentro de servicios/ */
function getImagesForFolder(folder) {
  return Object.entries(serviceImageModules)
    .filter(([key]) => key.includes(`/servicios/${folder}/`))
    .map(([, mod]) => mod.default)
}

/* Catálogo de Servicios */
export const SERVICES = [
  // --- CATEGORÍA 1: COLOR ---
  {
    id: 1,
    slug: 'color-completo',
    category: 'Color',
    name: 'Color completo',
    description: 'Coloración global personalizada de raíz a puntas para un tono uniforme, luminoso y lleno de vida.',
    price: 'Desde $40.000',
    price_number: 40000,
    duration: 90,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('tintura-completa'),
    image: getImagesForFolder('tintura-completa')[0] || null,
    is_active: true,
  },
  {
    id: 2,
    slug: 'cobertura-de-canas',
    category: 'Color',
    name: 'Cobertura de canas',
    description: 'Tratamiento de coloración focalizado para una cobertura 100% natural, impecable y duradera.',
    price: 'Desde $45.000',
    price_number: 45000,
    duration: 75,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('tintura-raiz'),
    image: getImagesForFolder('tintura-raiz')[0] || null,
    is_active: true,
  },
  {
    id: 3,
    slug: 'tonalizante',
    category: 'Color',
    name: 'Tonalizante',
    description: 'Baño de color o matiz para reavivar tonos, neutralizar reflejos no deseados y aportar brillo extremo.',
    price: 'Desde $30.000',
    price_number: 30000,
    duration: 45,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('tintura-raiz'),
    image: getImagesForFolder('tintura-raiz')[0] || null,
    is_active: true,
  },
  {
    id: 4,
    slug: 'contorno',
    category: 'Color',
    name: 'Contorno',
    description: 'Técnica de money piece / contouring capilar para iluminar y enmarcar las facciones del rostro.',
    price: 'Desde $65.000',
    price_number: 65000,
    duration: 120,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('balayage'),
    image: getImagesForFolder('balayage')[0] || null,
    is_active: true,
  },
  {
    id: 5,
    slug: 'bloques',
    category: 'Color',
    name: 'Bloques',
    description: 'Coloración en bloques o contrastes definidos para looks modernos, atrevidos y de gran impacto visual.',
    price: 'Desde $70.000',
    price_number: 70000,
    duration: 120,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('balayage'),
    image: getImagesForFolder('balayage')[0] || null,
    is_active: true,
  },
  {
    id: 6,
    slug: 'aclaraciones',
    category: 'Color',
    name: 'Aclaraciones',
    description: 'Balayage, babylights, highlights y decoloraciones avanzadas con técnica y cuidado profesional de la fibra.',
    price: 'Desde $80.000',
    price_number: 80000,
    duration: 180,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('balayage'),
    image: getImagesForFolder('balayage')[0] || null,
    is_active: true,
  },
  {
    id: 7,
    slug: 'olaplex-como-aditivo',
    category: 'Color',
    name: 'Olaplex como aditivo',
    description: 'Protector y multiplicador de enlaces que previene el daño químico durante cualquier proceso de decoloración o tintura.',
    price: 'Desde $30.000',
    price_number: 30000,
    duration: 30,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('tratamientos'),
    image: getImagesForFolder('tratamientos')[0] || null,
    is_active: true,
  },

  // --- CATEGORÍA 2: TRATAMIENTOS CAPILARES ---
  {
    id: 8,
    slug: 'acidic-color-gloss-redken',
    category: 'Tratamientos Capilares',
    name: 'Acidic Color Gloss Redken',
    description: 'Tratamiento de brillo molecular con pH ácido que sella la cutícula y prolonga la intensidad del color.',
    price: '$36.000',
    price_number: 36000,
    duration: 45,
    nota: null,
    images: getImagesForFolder('tratamientos'),
    image: getImagesForFolder('tratamientos')[0] || null,
    is_active: true,
  },
  {
    id: 9,
    slug: 'rituales-kerastase',
    category: 'Tratamientos Capilares',
    name: 'Rituales Kérastase',
    description: 'Experiencia sensorial de nutrición profunda y diagnóstico personalizado con la icónica gama Kérastase.',
    price: 'Desde $38.000',
    price_number: 38000,
    duration: 50,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('tratamientos'),
    image: getImagesForFolder('tratamientos')[0] || null,
    is_active: true,
  },
  {
    id: 10,
    slug: 'fusio-dose-kerastase',
    category: 'Tratamientos Capilares',
    name: 'Fusio Dose Kérastase',
    description: 'Fusión instantánea de concentrado y booster ultrapotente adaptada a las necesidades exactas de tu cabello.',
    price: '$40.000',
    price_number: 40000,
    duration: 45,
    nota: null,
    images: getImagesForFolder('tratamientos'),
    image: getImagesForFolder('tratamientos')[0] || null,
    is_active: true,
  },
  {
    id: 11,
    slug: 'sos-extreme-recovery-tigi',
    category: 'Tratamientos Capilares',
    name: 'SOS Extreme Recovery Tigi',
    description: 'Rescate de emergencia para cabellos extremadamente dañados, devolviendo fuerza interna y elasticidad.',
    price: '$40.000',
    price_number: 40000,
    duration: 50,
    nota: null,
    images: getImagesForFolder('tratamientos'),
    image: getImagesForFolder('tratamientos')[0] || null,
    is_active: true,
  },
  {
    id: 12,
    slug: 'olaplex-tratamiento',
    category: 'Tratamientos Capilares',
    name: 'Olaplex',
    description: 'Tratamiento reconstructor completo en pasos que reconecta los enlaces de disulfuro rotos del cabello.',
    price: 'Desde $40.000',
    price_number: 40000,
    duration: 60,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('tratamientos'),
    image: getImagesForFolder('tratamientos')[0] || null,
    is_active: true,
  },
  {
    id: 13,
    slug: 'nano-botox',
    category: 'Tratamientos Capilares',
    name: 'Nano Botox',
    description: 'Relleno de masa capilar con nanopartículas y ácido hialurónico: adiós al frizz, máximo brillo y suavidad.',
    price: 'Desde $42.000',
    price_number: 42000,
    duration: 90,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('tratamientos'),
    image: getImagesForFolder('tratamientos')[0] || null,
    is_active: true,
  },
  {
    id: 14,
    slug: 'k18',
    category: 'Tratamientos Capilares',
    name: 'K18',
    description: 'Péptido bioactivo patentado que repara en solo 4 minutos las cadenas de queratina dañadas por químicos y calor.',
    price: 'Desde $50.000',
    price_number: 50000,
    duration: 45,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('tratamientos'),
    image: getImagesForFolder('tratamientos')[0] || null,
    is_active: true,
  },
  {
    id: 15,
    slug: 'alisados',
    category: 'Tratamientos Capilares',
    name: 'Alisados',
    description: 'Alisado profesional semipermanente para un lacio sedoso, manejable, sin volumen y libre de encrespamiento.',
    price: 'Desde $30.000',
    price_number: 30000,
    duration: 150,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('alisado'),
    image: getImagesForFolder('alisado')[0] || null,
    is_active: true,
  },

  // --- CATEGORÍA 3: PEINADOS ---
  {
    id: 16,
    slug: 'lavado-y-secado',
    category: 'Peinados',
    name: 'Lavado y secado',
    description: 'Lavado relajante con champú y acondicionador premium, finalizado con secado natural y prolijo.',
    price: 'Desde $14.000',
    price_number: 14000,
    duration: 35,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('lavado-brushing'),
    image: getImagesForFolder('lavado-brushing')[0] || null,
    is_active: true,
  },
  {
    id: 17,
    slug: 'brushing',
    category: 'Peinados',
    name: 'Brushing',
    description: 'Modelado con cepillo térmico para dar volumen, movimiento o un acabado ultra liso y pulido.',
    price: 'Desde $18.000',
    price_number: 18000,
    duration: 45,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('lavado-brushing'),
    image: getImagesForFolder('lavado-brushing')[0] || null,
    is_active: true,
  },
  {
    id: 18,
    slug: 'peinado',
    category: 'Peinados',
    name: 'Peinado',
    description: 'Peinados de fiesta, ondas al agua, semirrecogidos y recogidos elegantes para eventos especiales.',
    price: 'Desde $35.000',
    price_number: 35000,
    duration: 60,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('lavado-brushing'),
    image: getImagesForFolder('lavado-brushing')[0] || null,
    is_active: true,
  },

  // --- COMPATIBILIDAD CON SLUGS HISTÓRICOS (para enlaces directos) ---
  {
    id: 19,
    slug: 'corte-de-pelo',
    category: 'Cortes de Pelo',
    name: 'Corte de pelo',
    description: 'Corte personalizado según la forma de tu rostro, tu textura y el estilo que deseas. Incluye lavado y asesoría.',
    price: 'Consultar valor',
    price_number: 0,
    duration: 45,
    nota: 'Consultar valor',
    images: getImagesForFolder('cortes'),
    image: getImagesForFolder('cortes')[0] || null,
    is_active: true,
  },
  {
    id: 20,
    slug: 'lavado-y-brushing',
    category: 'Peinados',
    name: 'Lavado y brushing',
    description: 'Lavado con masaje relajante y secado con técnica de cepillo para un acabado liso, con cuerpo o con ondas.',
    price: 'Desde $18.000',
    price_number: 18000,
    duration: 45,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('lavado-brushing'),
    image: getImagesForFolder('lavado-brushing')[0] || null,
    is_active: false, // Oculto en listados generales para priorizar la lista oficial
  },
  {
    id: 21,
    slug: 'tintura-raiz',
    category: 'Color',
    name: 'Tintura de raíz',
    description: 'Retoque de raíz con el mismo tono de tu coloración, acabado perfecto sin marca de crecimiento.',
    price: 'Desde $45.000',
    price_number: 45000,
    duration: 60,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('tintura-raiz'),
    image: getImagesForFolder('tintura-raiz')[0] || null,
    is_active: false,
  },
  {
    id: 22,
    slug: 'tintura-completa',
    category: 'Color',
    name: 'Tintura completa',
    description: 'Coloración global con fórmula personalizada según tu tono de piel y estilo.',
    price: 'Desde $40.000',
    price_number: 40000,
    duration: 90,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('tintura-completa'),
    image: getImagesForFolder('tintura-completa')[0] || null,
    is_active: false,
  },
  {
    id: 23,
    slug: 'balayage-babylight',
    category: 'Color',
    name: 'Balayage / Babylight',
    description: 'Iluminación degradada a mano alzada o mechas ultrafinas para un efecto natural, luminoso y de bajo mantenimiento.',
    price: 'Desde $80.000',
    price_number: 80000,
    duration: 180,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('balayage'),
    image: getImagesForFolder('balayage')[0] || null,
    is_active: false,
  },
  {
    id: 24,
    slug: 'alisado-keratina',
    category: 'Tratamientos Capilares',
    name: 'Alisado de keratina',
    description: 'Alisado semipermanente que elimina el frizz, aporta brillo y facilita el peinado por varios meses.',
    price: 'Desde $30.000',
    price_number: 30000,
    duration: 150,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('alisado'),
    image: getImagesForFolder('alisado')[0] || null,
    is_active: false,
  },
  {
    id: 25,
    slug: 'tratamiento-capilar',
    category: 'Tratamientos Capilares',
    name: 'Tratamiento capilar',
    description: 'Nutrición y reparación profunda para recuperar el brillo, la suavidad y la salud del cabello.',
    price: 'Desde $36.000',
    price_number: 36000,
    duration: 60,
    nota: 'Precio inicial referencial',
    images: getImagesForFolder('tratamientos'),
    image: getImagesForFolder('tratamientos')[0] || null,
    is_active: false,
  },
]

/* ============================================
   CATEGORÍA 4: CORTES DE PELO (ESTILOS FEMENINOS)
   --------------------------------------------
   Al reservar un estilo se agenda un "Corte de pelo"
   (campo bookingSlug).
   ============================================ */
export const HAIRSTYLES = [
  {
    id: 'largo-escalado',
    slug: 'largo-escalado',
    bookingSlug: 'corte-de-pelo',
    category: 'Cortes de Pelo',
    name: 'Largo escalado',
    description: 'Capas que aportan movimiento al cabello largo.',
    price: 'Consultar valor',
    duration: '60 min',
    image: resolveServiceImage('largo-escalado') || getImagesForFolder('cortes')[0] || null,
  },
  {
    id: 'shaggy',
    slug: 'shaggy',
    bookingSlug: 'corte-de-pelo',
    category: 'Cortes de Pelo',
    name: 'Shaggy',
    description: 'Corte con capas marcadas, textura y estilo moderno.',
    price: 'Consultar valor',
    duration: '60 min',
    image: resolveServiceImage('shaggy') || getImagesForFolder('cortes')[1] || null,
  },
  {
    id: 'bob',
    slug: 'bob',
    bookingSlug: 'corte-de-pelo',
    category: 'Cortes de Pelo',
    name: 'Bob',
    description: 'Media melena, con acabado recto o ligeramente graduado.',
    price: 'Consultar valor',
    duration: '60 min',
    image: resolveServiceImage('carre-pageboy') || resolveServiceImage('wob') || getImagesForFolder('cortes')[2] || null,
  },
  {
    id: 'midi',
    slug: 'midi',
    bookingSlug: 'corte-de-pelo',
    category: 'Cortes de Pelo',
    name: 'Midi',
    description: 'Corte a media altura, versátil y adaptable a distintas texturas.',
    price: 'Consultar valor',
    duration: '60 min',
    image: resolveServiceImage('midi') || getImagesForFolder('cortes')[0] || null,
  },
  {
    id: 'flequillo-cortina',
    slug: 'flequillo-cortina',
    bookingSlug: 'corte-de-pelo',
    category: 'Cortes de Pelo',
    name: 'Flequillo cortina',
    description: 'Flequillo abierto que enmarca el rostro.',
    price: 'Consultar valor',
    duration: '45 min',
    image: resolveServiceImage('flequillo-cortina') || getImagesForFolder('cortes')[1] || null,
  },
]

export function getServiceBySlug(slug) {
  const foundInServices = SERVICES.find((s) => s.slug === slug)
  if (foundInServices) return foundInServices
  const foundInHairstyles = HAIRSTYLES.find((h) => h.slug === slug)
  if (foundInHairstyles) return foundInHairstyles
  return null
}