"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  MessageCircle,
  Calculator,
  Users,
  TrendingUp,
  Megaphone,
  ListChecks,
  Bot,
} from "lucide-react";
import type { ComponentType } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { NeuralField } from "@/components/ui/NeuralField";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ---------- Fondo: grid + glows ---------- */
function HeroBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
      {/* Malla 3D animada — la capa que da la lectura "futurista" */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <NeuralField className="absolute inset-0" opacity={0.5} />
      </div>
      <div className="pointer-events-none absolute inset-x-0 -top-32 -z-10 mx-auto h-[520px] max-w-5xl rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-40 -z-10 h-72 w-72 rounded-full bg-accent-violet/20 blur-[120px]" />

      {/*
        Piso en perspectiva. El contenedor aporta la profundidad y el hijo se
        tumba 74° sobre el eje X: eso convierte una cuadrícula plana en un
        plano que se aleja hacia el horizonte.
      */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[340px] overflow-hidden"
        style={{ perspective: "340px" }}
      >
        <div
          className="perspective-grid absolute inset-x-[-50%] bottom-0 h-[620px] origin-bottom"
          style={{ transform: "rotateX(74deg)" }}
        />
      </div>
    </>
  );
}

/* ---------- Demo interactiva: agente IA respondiendo por área ---------- */
interface DeptDemo {
  key: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  question: string;
  answer: string;
}

const deptDemos: DeptDemo[] = [
  {
    key: "contabilidad",
    label: "Contabilidad",
    icon: Calculator,
    question: "¿Cómo van mis gastos operativos vs. el mes pasado?",
    answer:
      "Subieron 12%, sobre todo por logística. Aquí el detalle por categoría y el mes con el que se compara.",
  },
  {
    key: "rrhh",
    label: "RRHH",
    icon: Users,
    question: "¿Qué candidato encaja mejor con el puesto de ventas?",
    answer:
      "Según el historial de contrataciones exitosas, 2 perfiles se acercan más al que mejor rindió en los últimos 12 meses.",
  },
  {
    key: "ventas",
    label: "Ventas",
    icon: TrendingUp,
    question: "¿Qué clientes están en riesgo de dejar de comprar?",
    answer:
      "5 clientes bajaron su frecuencia de compra más de 40% en 60 días. Te dejo la lista priorizada por valor histórico.",
  },
  {
    key: "marketing",
    label: "Marketing",
    icon: Megaphone,
    question: "¿Qué campaña tuvo mejor retorno este trimestre?",
    answer:
      "“Verano IA” tuvo el mejor retorno: generó más leads calificados que las otras tres campañas juntas.",
  },
];

type Phase = "question" | "typing" | "answer";

function AgentChatDemo() {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");

  useEffect(() => {
    setPhase("question");
    const toTyping = setTimeout(() => setPhase("typing"), 600);
    const toAnswer = setTimeout(() => setPhase("answer"), 1300);
    // La respuesta queda ~4 s en pantalla: suficiente para leerla sin que el
    // panel se sienta estancado.
    const toNext = setTimeout(
      () => setActive((i) => (i + 1) % deptDemos.length),
      5400
    );
    return () => {
      clearTimeout(toTyping);
      clearTimeout(toAnswer);
      clearTimeout(toNext);
    };
  }, [active]);

  const current = deptDemos[active];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.25 }}
      className="relative w-full"
    >
      {/* Accent blobs */}
      <div className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-accent/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-accent-violet/40 blur-3xl" />

      <TiltCard
        intensity={5}
        lift={12}
        spotlightColor={null}
        innerClassName="glass glow-ring overflow-hidden p-1"
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <span className="text-[11px] font-medium text-muted">
            aurexo · agente ia · ejemplo interactivo
          </span>
          <span className="size-4" />
        </div>

        {/* Selector de área */}
        <div className="flex flex-wrap gap-1.5 border-b border-border p-3">
          {deptDemos.map((d, i) => {
            const Icon = d.icon;
            const isActive = i === active;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground/80"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="dept-active-pill"
                    className="absolute inset-0 rounded-full border border-accent/30 bg-accent/10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon className="relative size-3.5" />
                <span className="relative">{d.label}</span>
              </button>
            );
          })}
        </div>

        {/* Conversación */}
        <div className="min-h-[220px] p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="space-y-3"
            >
              {/* Pregunta del usuario */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm border border-border bg-white/[0.04] px-4 py-2.5 text-[13px] text-foreground/90"
              >
                {current.question}
              </motion.div>

              {/* Respuesta del agente */}
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                  <Bot className="size-3.5" />
                </span>

                <AnimatePresence mode="wait">
                  {phase === "typing" ? (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-border bg-white/[0.03] px-4 py-3"
                    >
                      {[0, 1, 2].map((d) => (
                        <motion.span
                          key={d}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: d * 0.15,
                          }}
                          className="size-1.5 rounded-full bg-muted"
                        />
                      ))}
                    </motion.div>
                  ) : phase === "answer" ? (
                    <motion.div
                      key="answer"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="max-w-[85%] rounded-2xl rounded-tl-sm border border-accent/20 bg-accent/5 px-4 py-2.5 text-[13px] text-foreground/90"
                    >
                      {current.answer}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </TiltCard>

      {/* Floating chat bubble */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-6 -left-4 hidden w-60 rounded-2xl border border-border bg-elevated/90 p-3 backdrop-blur-xl shadow-card sm:block"
      >
        <div className="flex items-center gap-2 text-xs">
          <span className="grid size-6 place-items-center rounded-full bg-[#25D366] text-black">
            <MessageCircle className="size-3.5" />
          </span>
          <span className="font-medium">WhatsApp · Agente IA</span>
        </div>
        <p className="mt-2 text-[11px] text-muted">
          “¡Hola! Soy el asistente del negocio. ¿Te ayudo con la cotización?”
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Hero ---------- */
const trustBadges = [
  "Agencia peruana",
  "IA entrenada con tu información",
  "Datos privados y seguros",
  "Implementación guiada",
  "Atención por WhatsApp",
  "Soporte en español",
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative scroll-mt-24 overflow-hidden pt-32 sm:pt-40"
    >
      <HeroBackground />

      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="badge"
            >
              <span className="size-1.5 rounded-full bg-accent shadow-glow" />
              Agencia peruana · Agentes de IA a medida para MYPES y PYMES
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[60px]"
            >
              Agentes de IA a medida que{" "}
              <span className="text-gradient-accent">conocen tu negocio</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 max-w-xl text-pretty text-base text-muted sm:text-lg"
            >
              Organizamos la información de tu empresa en una base de datos
              propia y creamos un agente de IA entrenado con ella — como tener
              tu propio ChatGPT o Gemini, personalizado y seguro, listo para
              responder consultas de RRHH, contabilidad, marketing, ventas u
              operaciones.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-3 max-w-xl text-sm text-muted/80"
            >
              También creamos agentes IA para WhatsApp, IA para Excel y CRM, y
              automatizaciones a medida para negocios que quieren empezar a
              usar IA de forma práctica.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
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
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                icon={<MessageCircle className="size-4" />}
              >
                Hablar por WhatsApp
              </ButtonLink>
              <ButtonLink href="#servicios" variant="ghost" size="lg" icon={<ListChecks className="size-4" />}>
                Ver servicios
              </ButtonLink>
            </motion.div>

            {/* Trust badges */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted"
              aria-label="Atributos de confianza"
            >
              {trustBadges.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  {b}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5">
            <AgentChatDemo />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
