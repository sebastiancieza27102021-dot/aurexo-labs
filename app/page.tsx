import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Security } from "@/components/sections/Security";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { UseCases } from "@/components/sections/UseCases";
import { Integrations } from "@/components/sections/Integrations";
import { Diagnostico } from "@/components/sections/Diagnostico";
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppButton } from "@/components/sections/WhatsAppButton";

/**
 * Aurexo Labs — Landing page
 *
 * Orden comercial:
 *  1. Navbar
 *  2. Hero          — propuesta de valor + demo interactiva del agente
 *  3. Services      — Asesoría + Agentes IA a medida + Excel/CRM + 6 servicios
 *  4. Security      — Cómo cuidamos la información del cliente
 *  5. WhyUs         — Por qué elegir Aurexo Labs
 *  6. Process       — Cómo trabajamos (4 pasos)
 *  7. UseCases      — Industrias + ejemplos concretos
 *  8. Integrations  — Herramientas sobre las que trabajamos
 *  9. Diagnostico   — Agendar la asesoría gratuita (Calendar + WhatsApp)
 * 10. ContactForm   — Formulario empresarial + contacto directo
 * 11. FAQ           — Preguntas frecuentes
 * 12. Footer
 *
 * Plus: WhatsApp flotante en todas las páginas.
 */
export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />

      <Hero />
      <Services />
      <Security />
      <WhyUs />
      <Process />
      <UseCases />
      <Integrations />
      <Diagnostico />
      <ContactForm />
      <FAQ />

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
