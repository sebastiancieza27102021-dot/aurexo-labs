import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { UseCases } from "@/components/sections/UseCases";
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
 *  2. Hero          — propuesta de valor + 3 CTAs + badges de confianza
 *  3. Services      — Diagnóstico + Agente IA WhatsApp (Starter/Growth) + 3 servicios
 *  4. WhyUs         — Por qué elegir Aurexo Labs
 *  5. Process       — Cómo trabajamos (4 pasos)
 *  6. UseCases      — Industrias + ejemplos concretos
 *  7. Diagnostico   — Agendar diagnóstico gratuito (WhatsApp + form)
 *  8. ContactForm   — Formulario empresarial + contacto directo
 *  9. FAQ           — Preguntas frecuentes
 * 10. Footer
 *
 * Plus: WhatsApp flotante en todas las páginas.
 */
export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />

      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <UseCases />
      <Diagnostico />
      <ContactForm />
      <FAQ />

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
