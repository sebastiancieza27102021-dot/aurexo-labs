"use client";

import { motion } from "framer-motion";
import { Lock, KeyRound, EyeOff, Download, FileSignature } from "lucide-react";
import type { ComponentType } from "react";
import { Section } from "@/components/ui/Section";
import { TiltCard, TiltLayer } from "@/components/ui/TiltCard";
import { Reveal3D } from "@/components/ui/Reveal3D";

interface Commitment {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const commitments: Commitment[] = [
  {
    icon: Lock,
    title: "Una base de datos por empresa",
    description:
      "La información de tu negocio vive en su propio espacio. No se mezcla con la de otros clientes ni con datos públicos.",
  },
  {
    icon: EyeOff,
    title: "No entrenamos modelos con tus datos",
    description:
      "Tu información se usa para responder tus consultas y nada más. No alimenta modelos de terceros ni se comparte con nadie.",
  },
  {
    icon: KeyRound,
    title: "Tú decides quién consulta qué",
    description:
      "Definimos accesos por área o por persona: el equipo comercial no tiene por qué ver la planilla, ni RRHH los márgenes.",
  },
  {
    icon: Download,
    title: "Tus datos se pueden exportar o borrar",
    description:
      "Si un día quieres llevarte todo o eliminarlo, se hace. Sin condiciones ni letra chica que te amarre al servicio.",
  },
  {
    icon: FileSignature,
    title: "Acuerdo de confidencialidad",
    description:
      "Si tu empresa lo necesita, firmamos un NDA antes de ver un solo archivo tuyo.",
  },
];

export function Security() {
  return (
    <Section
      eyebrow="Seguridad y privacidad"
      title={
        <>
          Tu información es tuya.{" "}
          <span className="text-gradient-accent">Siempre</span>
        </>
      }
      description="Para que un agente de IA sea útil necesita conocer tu negocio — y eso exige confianza. Estas son las reglas con las que trabajamos, desde el primer archivo que nos compartes."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Visual */}
        <div className="lg:col-span-5">
          <TiltCard
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            intensity={7}
            lift={8}
            innerClassName="glass glow-ring h-full overflow-hidden p-8"
          >
            <div className="pointer-events-none absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative flex h-full min-h-[260px] flex-col items-center justify-center text-center">
              <TiltLayer depth={45}>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mx-auto grid size-20 place-items-center rounded-3xl border border-accent/40 bg-gradient-to-br from-accent to-accent-violet text-white shadow-glow"
                >
                  <Lock className="size-8" />
                </motion.div>
              </TiltLayer>

              <TiltLayer depth={25} className="mt-6">
                <div className="text-sm font-semibold">
                  Base de datos privada de tu empresa
                </div>
                <p className="mx-auto mt-2 max-w-xs text-xs text-muted">
                  El agente sólo puede leer lo que tú decidas cargar, y sólo
                  responde a quien tú autorices.
                </p>
              </TiltLayer>
            </div>
          </TiltCard>
        </div>

        {/* Compromisos */}
        <div className="lg:col-span-7">
          <ul className="grid h-full gap-3 sm:grid-cols-2">
            {commitments.map((c, i) => {
              const Icon = c.icon;
              return (
                <li key={c.title}>
                  <Reveal3D delay={i * 0.07} angle={10} className="h-full">
                    <div className="glass glass-hover flex h-full gap-3.5 p-5">
                      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-border bg-white/[0.04] text-accent">
                        <Icon className="size-4" />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold tracking-tight">
                          {c.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-muted">
                          {c.description}
                        </p>
                      </div>
                    </div>
                  </Reveal3D>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
