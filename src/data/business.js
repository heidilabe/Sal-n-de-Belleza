/* ============================================
   DATOS CENTRALES DEL NEGOCIO
   --------------------------------------------
   Toda la información editable del salón vive aquí.
   Para reemplazar los datos reales del negocio,
   modifica únicamente este archivo.
   ============================================ */

export const BUSINESS = {
  name: 'SALÓN DE BELLEZA',
  tagline: 'SIEMPRE LINDA',
  fullName: 'SALÓN DE BELLEZA SIEMPRE LINDA',
  slogan: 'Salón de Belleza de Alta Gama',

  // Dirección ficticia (editable)
  address: {
    line1: 'Av. Providencia 1234, Local 5',
    line2: 'Providencia, Santiago — Chile',
  },
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Av.%20Providencia%201234,%20Santiago&t=&z=15&ie=UTF8&iwloc=&output=embed',

  // Teléfono y correo ficticios (editable)
  phone: '+56 9 1234 5678',
  phoneDisplay: '+56 9 1234 5678',
  email: 'contacto@siemprelinda.cl',

  /* ============================================
     WHATSAPP
     --------------------------------------------
     REEMPLAZAR "whatsappNumber" con el número real
     en formato internacional SIN "+" ni espacios.
     Ejemplo: +56 9 1234 5678  →  "56912345678"
     ============================================ */
  whatsappNumber: '56912345678',
  whatsappMessage:
    'Hola, quisiera consultar por los servicios y disponibilidad para reservar una cita.',

  // Horarios de atención (editable)
  hours: [
    { day: 'Lun — Vier', time: '9:00 — 20:00' },
    { day: 'Sábado', time: '9:00 — 18:00' },
    { day: 'Domingo', time: 'Cerrado' },
  ],

  // Redes sociales (enlaces demo preparados para reemplazar)
  social: {
    instagram: 'https://www.instagram.com/siemprelindasalon',
    facebook: 'https://www.facebook.com/siemprelindasalon',
    tiktok: 'https://www.tiktok.com/@siemprelindasalon',
  },
}

export const WHATSAPP_LINK = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(
  BUSINESS.whatsappMessage
)}`