"use client";

import { motion } from "framer-motion";
import {
  Target,
  HandHelping,
  Languages,
  Workflow,
  Gauge,
  ShieldCheck,
  MessageCircle,
  Plug,
  LifeBuoy,
} from "lucide-react";
import type { ComponentType } from "react";
import { Section } from "@/components/ui/Section";

interface Differentiator {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const items: Differentiator[] = [
  {
    icon: Target,
    title: "Enfoque en MYPES y PYMES",
    description:
      "Diseñamos soluciones pensadas para negocios reales, no para grandes corporativos.",
  },
  {
    icon: HandHelping,
    title: "Implementación guiada paso a paso",
    description:
      "Te acompañamos desde la primera reunión hasta que la solución esté funcionando.",
  },
  {
    icon: Languages,
    title: "Soporte en español",
    description:
      "Conversaciones claras, sin tecnicismos innecesarios, en tu mismo lenguaje de negocio.",
  },
  {
    icon: Workflow,
    title: "Pensado para procesos reales",
    description:
      "Trabajamos sobre tareas concretas: WhatsApp, Excel, pedidos, reportes, documentos.",
  },
  {
    icon: Gauge,
    title: "Automatizaciones medibles",
    description:
      "Sabes qué se está automatizando, qué impacto tiene y cómo va evolucionando.",
  },
  {
    icon: ShieldCheck,
    title: "Menos trabajo manual y menos errores",
    description:
      "Reducimos tareas repetitivas para que tu equipo se concentre en lo importante.",
  },
  {
    icon: MessageCircle,
    title: "Atención más rápida para tus clientes",
    description:
      "Tu negocio responde de día y de noche, incluso si tu equipo está ocupado.",
  },
  {
    icon: Plug,
    title: "Nos adaptamos a lo que ya usas",
    description:
      "Trabajamos sobre WhatsApp, Google Sheets, Excel, correo y herramientas que tu equipo conoce.",
  },
  {
    icon: LifeBuoy,
    title: "Acompañamiento después de la implementación",
    description:
      "No te dejamos solo. Seguimos ajustando y mejorando lo que entregamos.",
  },
];

export function WhyUs() {
  return (
    <Section
      eyebrow="Por qué Aurexo Labs"
      title={
        <>
          Soluciones prácticas,{" "}
          <span className="text-gradient-accent">no IA como moda</span>
        </>
      }
      description="No vendemos IA como una tendencia. Diseñamos automatizaciones para negocios que quieren ahorrar tiempo, responder mejor y ordenar sus procesos."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
              className="glass glass-hover p-6"
            >
              <div className="grid size-10 place-items-center rounded-lg border border-border bg-white/[0.04] text-accent">
                <Icon className="size-4" />
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
