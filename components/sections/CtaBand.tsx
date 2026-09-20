"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { whatsappLink, whatsappMessages } from "@/lib/site";

/**
 * Banda de cierre. Rompe la monotonía de tarjetas con una imagen real y deja
 * un último CTA antes del footer. El fondo se mueve más lento que el scroll
 * (parallax) para dar profundidad sin animar nada que distraiga.
 */
export function CtaBand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // El fondo recorre menos distancia que la sección: eso es el parallax.
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section className="relative py-12 sm:py-16">
      <div className="container-page">
        <div
          ref={ref}
          className="glass glow-ring relative isolate overflow-hidden px-6 py-16 sm:px-12 sm:py-20"
        >
          {/* Imagen de fondo con parallax */}
          <motion.div
            style={{ y: bgY }}
            className="pointer-events-none absolute inset-0 -z-10 scale-125"
          >
            <Image
              src="/mesh-band.png"
              alt=""
              fill
              priority={false}
              sizes="100vw"
              className="object-cover opacity-45"
            />
          </motion.div>
          {/* Velo oscuro: garantiza contraste del texto sobre la imagen */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/75 to-background/40" />

          <motion.div style={{ y: contentY }} className="relative max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="badge"
            >
              <span className="size-1.5 rounded-full bg-accent shadow-glow" />
              Primer paso, sin costo
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            >
              La IA de tu empresa empieza con{" "}
              <span className="text-gradient-accent">una conversación</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mt-5 max-w-xl text-pretty text-base text-muted sm:text-lg"
            >
              Cuéntanos cómo trabaja hoy tu negocio y te decimos con honestidad
              qué se puede automatizar y qué no. Sin compromiso y sin
              tecnicismos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <ButtonLink
                href="#diagnostico"
                variant="primary"
                size="lg"
                iconRight={<ArrowUpRight className="size-4" />}
              >
                Agenda tu asesoría gratuita
              </ButtonLink>
              <ButtonLink
                href={whatsappLink(whatsappMessages.asesoria)}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                icon={<MessageCircle className="size-4" />}
              >
                Hablar por WhatsApp
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
