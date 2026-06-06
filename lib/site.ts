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
  tagline: "Automatizamos atención, ventas y tareas repetitivas con IA",
  description:
    "Agencia peruana de automatización con IA para MYPES y PYMES. Agentes IA para WhatsApp, automatizaciones administrativas, asistentes internos y soluciones a medida.",
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

  social: {
    instagram: "https://www.instagram.com/aurexolabs.ia/",
    // Aún sin publicar — dejar como string vacío para ocultar en UI:
    linkedin: "",
    calendly: "",
  },
} as const;

/** Mensajes pre-redactados para distintos CTAs de WhatsApp */
export const whatsappMessages = {
  default:
    "Hola, quiero agendar un diagnóstico gratuito para automatizar procesos en mi empresa.",
  diagnostico:
    "Hola, quiero agendar un diagnóstico gratuito para mi empresa.",
  agenteWhatsapp:
    "Hola, quiero información sobre el Agente IA para WhatsApp de Aurexo Labs.",
  agenteStarter:
    "Hola, me interesa el plan Starter del Agente IA para WhatsApp.",
  agenteGrowth:
    "Hola, me interesa el plan Growth del Agente IA para WhatsApp.",
  automatizacion:
    "Hola, quiero automatizar tareas repetitivas en mi empresa.",
  asistente:
    "Hola, quiero información sobre el Asistente IA para documentos y equipo.",
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
