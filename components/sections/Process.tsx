"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Search, FileText, Cpu, LineChart } from "lucide-react";
import type { ComponentType } from "react";
import { Section } from "@/components/ui/Section";

interface Step {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: Search,
    title: "Asesoría gratuita",
    description:
      "Revisamos tu información, procesos y principales tareas repetitivas. Sin tecnicismos, en lenguaje de negocio.",
  },
  {
    icon: FileText,
    title: "Propuesta clara",
    description:
      "Definimos qué se puede automatizar, el alcance, los tiempos y el precio. Todo por escrito y simple de entender.",
  },
  {
    icon: Cpu,
    title: "Implementación guiada",
    description:
      "Configuramos el agente, automatización o asistente con la información real de tu negocio. Te acompañamos paso a paso.",
  },
  {
    icon: LineChart,
    title: "Mejora continua",
    description:
      "Monitoreamos resultados, ajustamos respuestas y optimizamos el flujo para que la solución mejore con el tiempo.",
  },
];

export function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <Section
      id="proceso"
      eyebrow="Cómo trabajamos"
      title={
        <>
          Un proceso{" "}
          <span className="text-gradient-accent">simple y predecible</span>
        </>
      }
      description="Cuatro pasos claros, desde la primera conversación hasta la optimización continua. Sin sorpresas, con entregables medibles en cada etapa."
    >
      <div ref={trackRef} className="relative">
        <div className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-white/10 md:block" />
        <motion.div
          style={{ scaleX: lineScale }}
          className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px origin-left bg-gradient-to-r from-accent to-accent-violet md:block"
        />

        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div className="relative grid size-12 place-items-center rounded-xl border border-border bg-elevated text-accent">
                    <Icon className="size-5" />
                    <span className="pointer-events-none absolute inset-0 rounded-xl shadow-glow opacity-50" />
                  </div>
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </div>

                <div className="mt-5">
                  <h3 className="text-base font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
