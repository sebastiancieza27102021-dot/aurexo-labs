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
    q: "¿Cuánto cuesta un proyecto con Aurexo Labs?",
    a: "Aún no publicamos una lista de precios fija: recién estamos construyendo Aurexo Labs y preferimos cotizar cada proyecto según su alcance real, en vez de forzarlo a un plan genérico. El precio se define después de conocer tu caso, directamente por WhatsApp o en la asesoría gratuita de 45 minutos.",
  },
  {
    q: "¿Cómo agendo la asesoría y qué recibo después?",
    a: "Eliges el horario directamente en el calendario de esta página. Al confirmar, la cita queda agendada automáticamente y te llega un correo con la fecha y el link de Google Meet de esa reunión — no tienes que esperar a que alguien te responda para tener tu hora reservada. Si prefieres coordinar por WhatsApp, también puedes.",
  },
  {
    q: "¿Es seguro compartir la información de mi empresa?",
    a: "Sí. Tu información se organiza en una base de datos privada de tu empresa. El agente de IA sólo responde con esos datos — no compartimos tu información con terceros ni la usamos para entrenar otros modelos.",
  },
  {
    q: "¿Cuánto demora una implementación?",
    a: "Depende del alcance. Un Agente IA para WhatsApp suele estar listo en 1 a 2 semanas. Un agente IA a medida sobre tu propia base de datos, IA para Excel/CRM o automatizaciones más complejas pueden tomar entre 2 y 4 semanas. Te entregamos un cronograma claro después de la asesoría gratuita.",
  },
  {
    q: "¿Necesito conocimientos técnicos?",
    a: "No. Nos encargamos de la parte técnica. Trabajamos contigo en lenguaje de negocio y te entregamos herramientas fáciles de usar para tu equipo.",
  },
  {
    q: "¿Trabajan también con negocios pequeños?",
    a: "Sí. Nuestro enfoque son MYPES y PYMES — emprendedores, tiendas locales y servicios profesionales, no sólo empresas grandes.",
  },
  {
    q: "¿La IA puede adaptarse a mi negocio?",
    a: "Sí. Cada implementación se personaliza con tu información, tus productos, tu tono y tus procesos. No usamos plantillas genéricas.",
  },
  {
    q: "¿Puedo empezar sólo con un servicio?",
    a: "Sí. Lo más común es empezar con el Agente IA para WhatsApp, con un agente IA a medida o con una automatización puntual. Luego puedes sumar otros servicios cuando tenga sentido.",
  },
  {
    q: "¿Qué pasa si no estoy seguro de qué necesito?",
    a: "Para eso está la asesoría gratuita de 45 minutos. Revisamos tu caso, te decimos con honestidad qué se puede automatizar y qué no, y recién entonces evaluamos una propuesta.",
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
