/* ============================================
   GALERÍA
   --------------------------------------------
   AUTO-DETECCIÓN: cada foto colocada dentro de
   src/assets/images/galeria/<carpeta>/ aparecerá
   automáticamente en esta galería.

   Subcarpetas reconocidas:
   cortes · color · balayage · mechas · peinados · tratamientos

   El título de cada foto se genera desde el nombre
   del archivo (ej: "balayage-miel.jpg" → "Balayage miel").
   Formatos aceptados: jpg, jpeg, png, webp
   ============================================ */

const galleryImageModules = import.meta.glob(
  '/src/assets/images/galeria/**/*.{jpg,jpeg,png,webp}',
  { eager: true }
)

export const CATEGORIAS_GALERIA = [
  'Cortes',
  'Color / Tintura',
  'Balayage',
  'Mechas',
  'Peinados',
  'Tratamientos',
  'Alisados',
  'Uñas',
]

export const GALLERY_CATEGORIES = [
  'Todos',
  ...CATEGORIAS_GALERIA,
]

const CATEGORY_BY_FOLDER = {
  cortes: 'Cortes',
  color: 'Color / Tintura',
  balayage: 'Balayage',
  mechas: 'Mechas',
  peinados: 'Peinados',
  tratamientos: 'Tratamientos',
}

function humanize(filebase) {
  return filebase
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (c) => c.toUpperCase())
}

export const GALLERY = Object.entries(galleryImageModules)
  .map(([path, mod]) => {
    const parts = path.split('/').filter(Boolean)
    const filename = parts[parts.length - 1]
    const folder = parts[parts.length - 2]
    const base = filename.replace(/\.[^.]+$/, '')

    return {
      id: `${folder}-${base}`,
      src: mod.default,
      alt: humanize(base),
      categoria: CATEGORY_BY_FOLDER[folder] || humanize(folder),
      descripcion: humanize(base),
    }
  })
  .sort((a, b) => {
    return a.categoria.localeCompare(b.categoria)
  })

export function getAllCategories() {
  return GALLERY_CATEGORIES
}