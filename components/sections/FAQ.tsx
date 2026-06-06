"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

interface Item {
  q: string;
  a: string;
}

const items: Item[] = [
  {
    q: "¿Cuánto demora una implementación?",
    a: "Depende del alcance. Un Agente IA Starter para WhatsApp suele estar listo en 1 a 2 semanas. Las automatizaciones administrativas o asistentes de documentos pueden tomar entre 2 y 4 semanas. Te entregamos un cronograma claro después del diagnóstico.",
  },
  {
    q: "¿Necesito conocimientos técnicos?",
    a: "No. Nos encargamos de la parte técnica. Trabajamos contigo en lenguaje de negocio y te entregamos herramientas fáciles de usar para tu equipo.",
  },
  {
    q: "¿Trabajan también con negocios pequeños?",
    a: "Sí. Nuestro enfoque son MYPES y PYMES. Tenemos planes pensados para emprendedores, tiendas locales y servicios profesionales — no sólo para empresas grandes.",
  },
  {
    q: "¿La IA puede adaptarse a mi negocio?",
    a: "Sí. Cada implementación se personaliza con tus productos, tu tono, tus procesos y tu información. No usamos plantillas genéricas.",
  },
  {
    q: "¿Qué incluye el mantenimiento mensual?",
    a: "Monitoreo del agente, ajustes de prompt, mejoras según el uso real, soporte en español, pequeñas optimizaciones del flujo y reporte simple del desempeño.",
  },
  {
    q: "¿Puedo empezar sólo con un servicio?",
    a: "Sí. Lo más común es empezar con el Agente IA para WhatsApp o con una automatización puntual. Luego puedes sumar otros servicios cuando tenga sentido.",
  },
  {
    q: "¿Qué pasa si no estoy seguro de qué necesito?",
    a: "Para eso está el diagnóstico gratuito. Revisamos tus procesos, te decimos con honestidad qué se puede automatizar y qué no, y recién entonces evaluamos una propuesta.",
  },
];

function FAQItem({
  item,
  open,
  onToggle,
}: {
  item: Item;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white/[0.02] backdrop-blur">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-foreground sm:text-base">
          {item.q}
        </span>
        <span
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full border border-border bg-white/[0.04] text-muted transition-transform",
            open && "rotate-45 text-accent"
          )}
        >
          <Plus className="size-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-sm text-muted">{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Section
      eyebrow="Preguntas frecuentes"
      title={
        <>
          Lo que más nos preguntan{" "}
          <span className="text-gradient-accent">antes de empezar</span>
        </>
      }
      description="Si tienes otra duda, escríbenos por WhatsApp o al correo. Te respondemos rápido y en lenguaje de negocio."
    >
      <div className="mx-auto grid max-w-3xl gap-3">
        {items.map((item, i) => (
          <FAQItem
            key={item.q}
            item={item}
            open={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </div>
    </Section>
  );
}
