"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  MessageCircle,
  Sparkles,
  Cpu,
  Zap,
  BarChart3,
  ListChecks,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/site";

/* ---------- Fondo: grid + glows ---------- */
function HeroBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid" />
      <div className="pointer-events-none absolute inset-x-0 -top-32 -z-10 mx-auto h-[520px] max-w-5xl rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-40 -z-10 h-72 w-72 rounded-full bg-accent-violet/20 blur-[120px]" />
    </>
  );
}

/* ---------- Mockup del panel (vista ilustrativa del producto) ---------- */
function DashboardMockup() {
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

      <div className="glass glow-ring relative overflow-hidden p-1">
        {/* Window chrome */}
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <span className="text-[11px] font-medium text-muted">
            aurexo · panel de control · vista ilustrativa
          </span>
          <span className="size-4" />
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-5">
          {/* KPI cards (ejemplos del producto) */}
          <div className="sm:col-span-3">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Conversaciones IA", value: "—", icon: MessageCircle },
                { label: "Tareas automatizadas", value: "—", icon: Zap },
                { label: "Horas ahorradas", value: "—", icon: Cpu },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-xl border border-border bg-white/[0.02] p-3"
                >
                  <div className="flex items-center justify-between text-muted">
                    <kpi.icon className="size-3.5" />
                    <span className="text-[10px] font-medium text-muted">
                      últimos 30 días
                    </span>
                  </div>
                  <div className="mt-2 text-lg font-semibold tracking-tight">
                    {kpi.value}
                  </div>
                  <div className="text-[10px] text-muted">{kpi.label}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="mt-3 rounded-xl border border-border bg-white/[0.02] p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium">
                  <BarChart3 className="size-3.5 text-accent" />
                  Rendimiento del agente IA
                </div>
                <span className="text-[10px] text-muted">vista de ejemplo</span>
              </div>
              <svg viewBox="0 0 300 100" className="mt-2 w-full">
                <defs>
                  <linearGradient
                    id="hero-line-grad"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#5B8CFF" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                  <linearGradient
                    id="hero-fill-grad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#5B8CFF" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#5B8CFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,80 C30,70 50,40 80,45 C110,50 140,20 170,25 C200,30 230,55 260,40 L300,30 L300,100 L0,100 Z"
                  fill="url(#hero-fill-grad)"
                />
                <path
                  d="M0,80 C30,70 50,40 80,45 C110,50 140,20 170,25 C200,30 230,55 260,40 L300,30"
                  fill="none"
                  stroke="url(#hero-line-grad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Activity feed (ejemplo) */}
          <div className="rounded-xl border border-border bg-white/[0.02] p-3 sm:col-span-2">
            <div className="flex items-center gap-2 text-xs font-medium">
              <Sparkles className="size-3.5 text-accent-violet" />
              Actividad reciente
            </div>
            <ul className="mt-3 space-y-3 text-[11px]">
              {[
                {
                  who: "Agente WhatsApp",
                  what: "respondió consulta de cliente",
                },
                {
                  who: "Back-Office",
                  what: "procesó registros del día",
                },
                {
                  who: "Asistente IA",
                  what: "entregó información del catálogo",
                },
                {
                  who: "Agente WhatsApp",
                  what: "derivó conversación al equipo",
                },
              ].map((row, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent shadow-glow" />
                  <div className="min-w-0">
                    <div className="text-foreground/90">
                      <span className="font-medium">{row.who}</span> {row.what}
                    </div>
                    <div className="text-muted">ejemplo</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

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
  "Enfoque en MYPES y PYMES",
  "Implementación guiada",
  "Atención por WhatsApp",
  "Soluciones medibles",
  "Soporte en español",
];

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 sm:pt-40">
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
              Agencia peruana · IA aplicada para MYPES y PYMES
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[60px]"
            >
              Automatizamos atención, ventas y tareas repetitivas con{" "}
              <span className="text-gradient-accent">Inteligencia Artificial</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 max-w-xl text-pretty text-base text-muted sm:text-lg"
            >
              En Aurexo Labs ayudamos a MYPES y PYMES a responder más rápido,
              ordenar procesos y ahorrar tiempo usando agentes IA,
              automatizaciones y soluciones digitales a medida.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-3 max-w-xl text-sm text-muted/80"
            >
              Ideal para empresas que atienden por WhatsApp, trabajan con Excel,
              manejan pedidos, reportes o información dispersa y quieren empezar
              a usar IA de forma práctica.
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
                Agenda un diagnóstico gratuito
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
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}
