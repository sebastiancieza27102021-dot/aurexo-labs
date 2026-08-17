# Aurexo Labs — Landing page

Sitio oficial de **Aurexo Labs**, agencia peruana de automatización con inteligencia artificial para MYPES y PYMES.

- Dominio: https://www.aurexolabs.com
- Contacto: contacto@aurexolabs.com
- WhatsApp: +51 946 004 466
- Ciudad: Lima, Perú

Stack: **Next.js 14 (App Router) · React 18 · TypeScript · TailwindCSS · Framer Motion**.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run start    # servir build
```

---

## Estructura

```
aurexo-labs/
├─ app/
│  ├─ layout.tsx               # SEO, OG, JSON-LD, favicon, fuentes
│  ├─ page.tsx                 # Composición de la landing
│  ├─ globals.css              # Tailwind + tokens de diseño
│  └─ api/leads/route.ts       # Endpoint de captura de leads
│
├─ components/
│  ├─ ui/                      # Logo, Button, Section
│  └─ sections/
│     ├─ Navbar.tsx
│     ├─ Hero.tsx
│     ├─ Services.tsx          # Asesoría gratuita + Agentes IA a medida + IA Excel/CRM + WhatsApp + más
│     ├─ WhyUs.tsx             # Por qué elegir Aurexo Labs
│     ├─ Process.tsx           # Cómo trabajamos (4 pasos)
│     ├─ UseCases.tsx          # Industrias + ejemplos concretos
│     ├─ Diagnostico.tsx       # Asesoría gratuita de 45 min — Google Calendar + WhatsApp
│     ├─ ContactForm.tsx       # Formulario empresarial
│     ├─ FAQ.tsx
│     ├─ Footer.tsx
│     └─ WhatsAppButton.tsx
│
├─ lib/
│  ├─ site.ts                  # Single source of truth — contacto, redes, links, meetingLink
│  └─ utils.ts                 # cn() helper
│
└─ public/logo-aurexo.png, favicon.ico, icon.png, apple-touch-icon.png, og.png
```

---

## Personalización

Toda la información de contacto, redes y links está en `lib/site.ts`. Edita un solo archivo para actualizar todo el sitio.

- `email`, `whatsappNumber`, `whatsappDisplay`, `city`, `hours`
- `social.instagram` → visible
- `social.linkedin` → vacío → oculto automáticamente en UI
- `meetingLink` → vacío → el botón de "Agendar en Google Calendar" no se muestra y el CTA cae de vuelta a WhatsApp/correo

Cuando publiques LinkedIn real, sólo agrega la URL en `site.ts` y aparecerá sola en el Footer.

### Agendamiento de la asesoría gratuita (45 min por Meet)

1. En Google Calendar, crea una página de **"Programación de citas"** (Appointment schedule) de 45 min.
2. Copia el link público que te da Google Calendar.
3. Pégalo en `lib/site.ts` → `meetingLink`.

Con eso, cada vez que alguien reserve un horario, Google Calendar crea el
Google Meet automáticamente y te notifica por correo a tu cuenta de Aurexo —
no requiere backend propio.

---

## Captura de leads en producción

El endpoint `/api/leads` viene listo con scaffolding (comentado) para:

| Opción | Cuándo usar |
| --- | --- |
| **Resend** | Quieres email directo a tu bandeja. La más rápida. |
| **Formspree** | Cero código backend. Lo configuras desde su panel. |
| **Supabase** | Necesitas almacenar y consultar leads. |
| **Google Sheets** | Tu equipo ya trabaja sobre Sheets. |

Pasos:
1. Copia `.env.example` a `.env.local` y llena las variables que vayas a usar.
2. Abre `app/api/leads/route.ts` y descomenta el bloque correspondiente.
3. Instala la librería (`npm i resend` / `@supabase/supabase-js`) si aplica.

> Mientras no haya backend real, el form igual responde 200 pero su mensaje
> de éxito invita explícitamente a usar WhatsApp o correo. No "simula" envío.

---

## SEO y metadata

- Title, description y keywords optimizados (`app/layout.tsx`).
- Open Graph + Twitter Card.
- Canonical apuntando a `https://www.aurexolabs.com`.
- JSON-LD `Organization` con email, teléfono y ubicación.
- Favicon, icon, apple-touch-icon y og.png generados a partir del logo oficial.

---

## Diseño

- Paleta: negro profundo (`#05060A`), grises oscuros, blanco, azul eléctrico (`#2F6BFF`) y violeta tecnológico (`#7C3AED`) — tomados del degradado del logo.
- Tipografía: Inter (Google Fonts).
- Estética: SaaS startup 2026 — inspirado en Vercel, Stripe, Notion, Linear, Framer.
- Glassmorphism ligero, sombras suaves, animaciones discretas con Framer Motion.
- Responsive premium, mobile menu nativo.

---

## Comandos útiles

```bash
npm run dev      # desarrollo
npm run build    # build de producción
npm run start    # servir build
npm run lint     # linter
```

---

## Pendientes (cuando los tengas listos)

- Conectar `/api/leads` a Resend, Supabase o Sheets (ver sección anterior).
- Crear la página de "Programación de citas" en Google Calendar y agregar el
  link en `lib/site.ts` → `meetingLink` (ver sección de agendamiento arriba).
- Publicar URL de LinkedIn y agregarla en `lib/site.ts`.
