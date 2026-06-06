import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import "./globals.css";

/* =========================================================
   SEO METADATA + Open Graph
   ========================================================= */
export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default:
      "Aurexo Labs | Automatización e Inteligencia Artificial para Empresas",
    template: "%s · Aurexo Labs",
  },
  description:
    "Automatizamos atención, ventas y procesos internos para MYPES y PYMES con agentes IA para WhatsApp, automatizaciones administrativas y asistentes internos.",
  keywords: [
    "automatización empresarial Perú",
    "inteligencia artificial para empresas",
    "IA para MYPES",
    "IA para PYMES",
    "agentes IA WhatsApp",
    "automatización de procesos",
    "automatización WhatsApp",
    "agencia de IA Perú",
    "automatización con inteligencia artificial",
    "asistentes IA para empresas",
    "automatización de tareas administrativas",
    "asistentes IA para documentos",
    "automatización para negocios",
    "Aurexo Labs",
  ],
  authors: [{ name: "Aurexo Labs" }],
  creator: "Aurexo Labs",
  publisher: "Aurexo Labs",
  alternates: { canonical: site.domain },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: site.domain,
    siteName: "Aurexo Labs",
    title: "Aurexo Labs | Automatización e IA para Empresas",
    description:
      "Soluciones de inteligencia artificial y automatización para atención, ventas y operaciones de MYPES y PYMES.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Aurexo Labs — Automatización e IA para empresas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurexo Labs | Automatización e IA para Empresas",
    description:
      "Agentes IA para WhatsApp, automatizaciones administrativas y asistentes internos.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#05060A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD structured data — helps Google understand the business
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.domain,
  email: site.email,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lima",
    addressCountry: "PE",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: `+${site.whatsappNumber}`,
      contactType: "customer service",
      areaServed: "PE",
      availableLanguage: ["Spanish"],
    },
  ],
  sameAs: [site.social.instagram].filter(Boolean),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
