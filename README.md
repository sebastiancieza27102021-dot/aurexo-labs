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
│     ├─ Services.tsx          # Diagnóstico + WhatsApp Starter/Growth + 3 servicios
│     ├─ WhyUs.tsx             # Por qué elegir Aurexo Labs
│     ├─ Process.tsx           # Cómo trabajamos (4 pasos)
│     ├─ UseCases.tsx          # Industrias + ejemplos concretos
│     ├─ Diagnostico.tsx       # Agenda + horarios + WhatsApp
│     ├─ ContactForm.tsx       # Formulario empresarial
│     ├─ FAQ.tsx
│     ├─ Footer.tsx
│     └─ WhatsAppButton.tsx
│
├─ lib/
│  ├─ site.ts                  # Single source of truth — contacto, redes, links
│  └─ utils.ts                 # cn() helper
│
└─ public/favicon.svg
```

---

## Personalización

Toda la información de contacto, redes y links está en `lib/site.ts`. Edita un solo archivo para actualizar todo el sitio.

- `email`, `whatsappNumber`, `whatsappDisplay`, `city`, `hours`
- `social.instagram` → visible
- `social.linkedin`, `social.calendly` → vacíos → ocultos automáticamente en UI

Cuando publiques LinkedIn o Calendly reales, sólo agrega la URL en `site.ts` y aparecerán solos en Footer, Hero y Diagnostico.

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
- Favicon SVG (escalable, brand-colored).

Para una imagen OG real, agrega `public/og.png` (1200×630). El build no se rompe si no existe.

---

## Diseño

- Paleta: negro profundo (`#05060A`), grises oscuros, blanco, azul eléctrico (`#5B8CFF`) y violeta tecnológico (`#8B5CF6`).
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
- Publicar URL de LinkedIn y Calendly y agregarlas en `lib/site.ts`.
- Agregar `public/og.png` (1200×630) para mejorar las redes sociales.
- Subir `public/apple-touch-icon.png` para iOS.
