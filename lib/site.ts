/**
 * Site-wide configuration — single source of truth for contact details,
 * social links and external integrations.
 *
 * Convention:
 *  - Only publish links that already exist.
 *  - If a URL is empty (""), the UI hides the related button.
 */
export const site = {
  name: "Aurexo Labs",
  domain: "https://www.aurexolabs.com",
  tagline: "Agentes de IA a medida, entrenados con la información de tu empresa",
  description:
    "Agencia peruana de IA para MYPES y PYMES. Creamos agentes de IA a medida sobre la base de datos de tu empresa, IA para Excel y CRM, agentes IA para WhatsApp y automatizaciones a medida.",
  email: "contacto@aurexolabs.com",

  /** WhatsApp en formato internacional, sin "+" */
  whatsappNumber: "51946004466",
  /** Sólo para mostrar en UI */
  whatsappDisplay: "+51 946 004 466",

  city: "Lima, Perú",

  hours: {
    weekdays: "Lun – Vie · 9:00 a.m. – 6:00 p.m.",
    saturday: "Sáb · 9:00 a.m. – 12:00 p.m.",
  },

  /**
   * Link público de "Programación de citas" de Google Calendar (o Calendly)
   * para la asesoría gratuita de 45 min. Al reservar, Google Calendar crea el
   * Meet y notifica automáticamente al correo de Aurexo — sin backend propio.
   * Vacío → el CTA de agendar cae de vuelta a WhatsApp/correo.
   */
  meetingLink: "https://calendar.app.google/YBgmBo7fna6ERuxc6",

  social: {
    instagram: "https://www.instagram.com/aurexolabs.ia/",
    // Aún sin publicar — dejar como string vacío para ocultar en UI:
    linkedin: "",
  },
} as const;

/** Mensajes pre-redactados para distintos CTAs de WhatsApp */
export const whatsappMessages = {
  default:
    "Hola, quiero agendar una asesoría gratuita para ver cómo la IA puede ayudar a mi empresa.",
  asesoria:
    "Hola, quiero agendar la asesoría gratuita de 45 min para conocer cómo la IA puede ayudar a mi empresa.",
  agenteMedida:
    "Hola, quiero información sobre un Agente IA a medida entrenado con la información de mi empresa.",
  excelCrm:
    "Hola, quiero información sobre IA para Excel/CRM (analizar, modificar y crear en mis hojas de cálculo o CRM).",
  agenteWhatsapp:
    "Hola, quiero información sobre el Agente IA para WhatsApp de Aurexo Labs.",
  automatizacion:
    "Hola, quiero automatizar tareas repetitivas en mi empresa.",
  custom:
    "Hola, quiero conversar sobre una solución IA a medida para mi empresa.",
} as const;

/** Helper para construir el deep-link de WhatsApp con mensaje encodeado */
export const whatsappLink = (msg?: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    msg ?? whatsappMessages.default
  )}`;

/** Mailto helper */
export const mailto = (subject?: string) =>
  `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

/** Navegación principal */
export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Casos", href: "#casos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
] as const;
