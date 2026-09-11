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
│  ├─ ui/                      # Logo, Button, Section, TiltCard (3D), SpotlightCard, ScrollProgress, TikTokIcon
│  └─ sections/
│     ├─ Navbar.tsx            # Scroll-spy + menú móvil
│     ├─ Hero.tsx              # Demo interactiva del agente (chat por área)
│     ├─ Services.tsx          # Asesoría + Agentes IA a medida + IA Excel/CRM + 6 servicios
│     ├─ Security.tsx          # Compromisos de privacidad de datos
│     ├─ WhyUs.tsx             # Por qué elegir Aurexo Labs
│     ├─ Process.tsx           # Cómo trabajamos (4 pasos)
│     ├─ UseCases.tsx          # Industrias + ejemplos concretos
│     ├─ Integrations.tsx      # Marquee de herramientas compatibles
│     ├─ Diagnostico.tsx       # Calendario de Google incrustado + WhatsApp
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
- `social.instagram`, `social.tiktok` → visibles
- `social.linkedin` → vacío → oculto automáticamente en UI
- `meetingLink` / `meetingEmbedUrl` → vacíos → el calendario no se muestra y el CTA cae de vuelta a WhatsApp/correo

Cuando publiques LinkedIn real, sólo agrega la URL en `site.ts` y aparecerá sola en el Footer.

### Agendamiento automático de la asesoría (45 min por Meet)

El calendario de Google va **incrustado en la propia página** (sección
"Asesoría gratuita"). El cliente elige su horario sin salir del sitio y, al
confirmar, Google Calendar hace todo solo:

1. crea el evento en el calendario de Aurexo,
2. genera el link de Google Meet de esa cita,
3. envía al cliente el correo de confirmación con la fecha y el link de Meet,
4. notifica a Aurexo por correo.

No hace falta backend propio, credenciales ni variables de entorno.

Dos campos en `lib/site.ts` lo controlan:

| Campo | Para qué sirve |
| --- | --- |
| `meetingLink` | Link corto (`calendar.app.google/...`) — botón "Abrir calendario aparte" |
| `meetingEmbedUrl` | Link largo con `?gv=true` — es el que se incrusta en el iframe |

Si algún día cambias la página de citas en Google Calendar, actualiza **ambos**.
Para obtener el link largo a partir del corto:

```bash
curl -s -L -o /dev/null -w "%{url_effective}\n" "https://calendar.app.google/TU_CODIGO"
```

Luego agrégale `?gv=true` al final (es el modo embed de Google).

---

## Captura de leads

El endpoint `/api/leads` envía cada lead del formulario por correo usando
**Resend**. No requiere instalar dependencias (usa `fetch` contra su API).

### Configuración

1. Copia `.env.example` a `.env.local` y llena `RESEND_API_KEY`, `LEADS_TO` y
   `LEADS_FROM`.
2. En Vercel, agrega esas mismas tres variables en
   **Settings → Environment Variables** (entorno *Production*) y vuelve a
   desplegar. Sin esto, en producción el formulario no envía nada.

> **El remitente importa.** Sin un dominio verificado en Resend sólo puedes
> usar `onboarding@resend.dev`, y Resend únicamente entrega al correo dueño de
> la cuenta. Para recibir en `contacto@aurexolabs.com` verifica el dominio
> `aurexolabs.com` en Resend y usa `leads@aurexolabs.com` como `LEADS_FROM`.

### Comportamiento

| Situación | Respuesta | Qué ve el visitante |
| --- | --- | --- |
| `RESEND_API_KEY` sin configurar | `200 {ok:true, delivered:false}` | Éxito (sólo se loguea el lead) |
| Correo enviado | `200 {ok:true, delivered:true}` | Éxito |
| Resend rechaza el envío | `502 {error:"email_failed"}` | Error, con invitación a usar WhatsApp |

El endpoint responde error a propósito cuando el correo falla: es preferible
pedirle al visitante que escriba por WhatsApp a perder el lead en silencio.
Ante un fallo, el lead igual queda escrito en los logs del servidor.

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

- Cargar `RESEND_API_KEY`, `LEADS_TO` y `LEADS_FROM` en las variables de
  entorno de Vercel (en local ya funcionan vía `.env.local`).
- Verificar el dominio `aurexolabs.com` en Resend para poder enviar desde
  `leads@aurexolabs.com` y recibir en `contacto@aurexolabs.com`.
- Publicar URL de LinkedIn y agregarla en `lib/site.ts`.
