"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  Workflow,
  Sparkles,
  Check,
  ArrowUpRight,
  Gift,
  Database,
  Brain,
  FileSpreadsheet,
  Table2,
  Users,
  Calculator,
  Megaphone,
  TrendingUp,
  ClipboardList,
  UserSearch,
  Lock,
  FileText,
  Bot,
  PhoneCall,
  ScanLine,
  GraduationCap,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { Reveal3D } from "@/components/ui/Reveal3D";
import { whatsappLink, whatsappMessages } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ============================================================
   1) Card de Asesoría — destacada y gratuita
   ============================================================ */
function AsesoriaCallout() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="glass glass-hover relative overflow-hidden p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="grid items-center gap-6 sm:grid-cols-12">
        <div className="sm:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge !text-emerald-300/90">
              <Gift className="size-3.5" />
              Asesoría gratuita · 45 min
            </span>
            <span className="text-xs text-muted">Punto de partida recomendado</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Cuéntanos qué necesitas y te proponemos la solución IA adecuada.
          </h3>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Cada negocio es distinto, por eso no tenemos una lista de precios
            fija. En una llamada por Google Meet revisamos tu caso y recién
            ahí te armamos una propuesta con alcance y precio a tu medida.
          </p>
          <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
            {[
              "Revisión de tus procesos e información",
              "Identificación de oportunidades con IA",
              "Recomendación del servicio adecuado",
              "Propuesta y precio según tu alcance",
            ].map((it) => (
              <li key={it} className="flex items-start gap-2 text-foreground/85">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                {it}
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-5">
          <div className="rounded-2xl border border-border bg-elevated/60 p-5">
            <div className="text-xs uppercase tracking-wider text-muted">
              Asesoría inicial
            </div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">
              Gratis
            </div>
            <p className="mt-2 text-xs text-muted">
              45 min por Google Meet. Sin compromiso, sin tecnicismos.
            </p>
            <ButtonLink
              href="#diagnostico"
              variant="primary"
              size="md"
              className="mt-5 w-full"
              iconRight={<ArrowUpRight className="size-4" />}
            >
              Agenda tu asesoría gratuita
            </ButtonLink>
            <ButtonLink
              href={whatsappLink(whatsappMessages.asesoria)}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="md"
              className="mt-2 w-full"
              icon={<MessageCircle className="size-4" />}
            >
              Hablar por WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   Ilustración: fuentes de información convergiendo en el agente IA
   ============================================================ */
function AgentNetworkIllustration() {
  const sources = [
    { icon: FileText, y: 20 },
    { icon: FileSpreadsheet, y: 60 },
    { icon: MessageCircle, y: 100 },
    { icon: Users, y: 140 },
  ];

  return (
    <div className="relative h-32 w-full">
      <svg
        viewBox="0 0 600 160"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="flow-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2F6BFF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {sources.map((s, i) => (
          <motion.path
            key={i}
            d={`M60,${s.y} C300,${s.y} 300,80 540,80`}
            fill="none"
            stroke="url(#flow-grad)"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.12 * i, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {sources.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={i}
            className="absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-lg border border-border bg-elevated text-muted"
            style={{ left: "10%", top: `${(s.y / 160) * 100}%` }}
          >
            <Icon className="size-3.5" />
          </div>
        );
      })}

      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-accent/40 bg-gradient-to-br from-accent to-accent-violet text-white shadow-glow"
        style={{ left: "90%", top: "50%" }}
      >
        <Bot className="size-5" />
      </motion.div>
    </div>
  );
}

/* ============================================================
   2) Servicio estrella: Agentes IA a medida (con tu propia base de datos)
   ============================================================ */
const departamentos = [
  { icon: Calculator, label: "Contabilidad y finanzas" },
  { icon: Users, label: "Recursos Humanos" },
  { icon: Megaphone, label: "Marketing" },
  { icon: TrendingUp, label: "Ventas" },
  { icon: ClipboardList, label: "Administrativo" },
  { icon: Workflow, label: "Operaciones" },
  { icon: UserSearch, label: "Captación de talento" },
];

function FlagshipAgentesMedida() {
  return (
    <TiltCard
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      intensity={4}
      lift={10}
      innerClassName="glass glow-ring glass-hover overflow-hidden p-7 sm:p-10"
    >
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-accent-violet/20 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="badge mb-4">
            <span className="size-1.5 rounded-full bg-accent shadow-glow" />
            Servicio estrella
          </span>
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Agentes IA a medida, entrenados con la información de tu empresa
          </h3>
          <p className="mt-4 text-sm text-muted sm:text-base">
            Ordenamos la información de tu negocio en una base de datos propia
            y segura, y te entregamos un agente de IA que la conoce a fondo.
            Es como tener tu propio ChatGPT o Gemini, pero personalizado con
            tu historial real — listo para responder consultas{" "}
            <span className="text-foreground/90">descriptivas</span> ("¿qué
            pasó con...?") y{" "}
            <span className="text-foreground/90">prescriptivas</span> ("¿qué
            deberíamos hacer con...?").
          </p>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Para tu equipo es como tener un asesor contable, financiero, de
            RRHH o comercial disponible todo el tiempo — que responde en base
            a la información real de tu empresa, no información genérica.
          </p>

          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted">
              Aplica a cualquier área de tu empresa
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {departamentos.map((d) => {
                const Icon = d.icon;
                return (
                  <span
                    key={d.label}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-xs text-foreground/85"
                  >
                    <Icon className="size-3.5 text-accent" />
                    {d.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-border bg-white/[0.02] p-4 text-xs text-muted">
            <Lock className="mt-0.5 size-4 shrink-0 text-accent" />
            Tu información se organiza en una base de datos privada de tu
            empresa. El agente sólo responde con esa información — no la
            compartimos ni la usamos para entrenar otros modelos.
          </div>

          <ButtonLink
            href={whatsappLink(whatsappMessages.agenteMedida)}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="md"
            className="mt-7"
            icon={<MessageCircle className="size-4" />}
          >
            Conversar sobre mi caso
          </ButtonLink>
        </div>

        <div className="lg:col-span-5">
          <div className="glass h-full p-5">
            <AgentNetworkIllustration />
            <div className="flex items-center gap-2 text-xs font-medium text-muted">
              <Brain className="size-3.5 text-accent-violet" />
              Ejemplos de consultas al agente
            </div>
            <ul className="mt-4 space-y-3">
              {[
                "¿Cuáles fueron mis clientes más rentables el último trimestre?",
                "¿Qué candidato encaja mejor con el perfil que buscamos?",
                "¿Qué campaña de marketing tuvo mejor retorno este año?",
                "¿Qué productos deberíamos reponer según la rotación histórica?",
                "¿Cómo vienen mis gastos operativos comparados con el mes pasado?",
              ].map((q) => (
                <li
                  key={q}
                  className="flex items-start gap-2.5 rounded-xl border border-border bg-white/[0.02] p-3 text-sm text-foreground/85"
                >
                  <Database className="mt-0.5 size-4 shrink-0 text-accent" />
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

/* ============================================================
   Ilustración: grilla de hoja de cálculo "tocada" por la IA
   ============================================================ */
const hotCells = new Set(["0-5", "1-2", "1-4", "2-1", "3-3"]);

function SpreadsheetIllustration() {
  const cols = 6;
  const rows = 4;

  return (
    <div className="grid grid-cols-6 gap-1.5">
      {Array.from({ length: rows }).flatMap((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const key = `${r}-${c}`;
          const isHot = hotCells.has(key);
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (r * cols + c) * 0.02 }}
              className={cn(
                "aspect-square overflow-hidden rounded-md border",
                isHot
                  ? "border-accent-violet/50 bg-accent-violet/15"
                  : "border-border bg-white/[0.02]"
              )}
            >
              {isHot && (
                <motion.div
                  animate={{ opacity: [0.35, 1, 0.35] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: (r + c) * 0.15,
                  }}
                  className="h-full w-full bg-accent-violet/40"
                />
              )}
            </motion.div>
          );
        })
      )}
    </div>
  );
}

/* ============================================================
   3) IA para Excel y CRM
   ============================================================ */
function ExcelCrmService() {
  return (
    <TiltCard
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.08 }}
      intensity={4}
      lift={10}
      spotlightColor="rgba(124,58,237,0.16)"
      innerClassName="glass glass-hover overflow-hidden p-7 sm:p-10"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent-violet/15 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="badge mb-4">
            <span className="size-1.5 rounded-full bg-accent-violet shadow-glow-violet" />
            IA dentro de tus herramientas
          </span>
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            IA para Excel y CRM
          </h3>
          <p className="mt-4 text-sm text-muted sm:text-base">
            Un copiloto de IA para tus hojas de cálculo y tu CRM — similar a
            los complementos de IA de ChatGPT o Claude para Excel. Analiza,
            modifica y crea sobre libros existentes o desde cero: fórmulas,
            reportes, cruces de información y limpieza de datos, sin que
            tengas que hacerlo manualmente.
          </p>

          <ul className="mt-6 grid gap-2.5 text-sm sm:grid-cols-2">
            {[
              "Analizar y explicar un Excel existente",
              "Crear reportes y dashboards desde cero",
              "Limpiar, ordenar y cruzar bases de datos",
              "Fórmulas y macros generadas por IA",
              "Organizar y analizar tu información en el CRM",
              "Detectar oportunidades o riesgos en tus datos",
            ].map((it) => (
              <li key={it} className="flex items-start gap-2.5 text-foreground/85">
                <Check className="mt-0.5 size-4 shrink-0 text-accent-violet" />
                {it}
              </li>
            ))}
          </ul>

          <ButtonLink
            href={whatsappLink(whatsappMessages.excelCrm)}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="md"
            className="mt-7"
            icon={<MessageCircle className="size-4" />}
          >
            Conversar sobre mi caso
          </ButtonLink>
        </div>

        <div className="lg:col-span-5">
          <div className="glass h-full p-5">
            <SpreadsheetIllustration />
            <div className="mt-5 flex items-center gap-2 text-xs font-medium text-muted">
              <Table2 className="size-3.5 text-accent-violet" />
              Ideal si tu equipo usa
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Excel / Google Sheets",
                "CRM comercial",
                "Reportes mensuales",
                "Bases de clientes",
                "Control de inventario",
                "Planillas financieras",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-xs text-foreground/85"
                >
                  <FileSpreadsheet className="size-3.5 text-accent-violet" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

/* ============================================================
   4) Otros servicios (sin precios)
   ============================================================ */
interface OtherService {
  icon: ComponentType<{ className?: string }>;
  name: string;
  tagline: string;
  description: string;
  examples: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaTarget?: string;
}

const otherServices: OtherService[] = [
  {
    icon: MessageCircle,
    name: "Agente IA para WhatsApp",
    tagline:
      "Responde clientes, captura datos y ayuda a vender incluso cuando tu equipo está ocupado.",
    description:
      "Configuramos un agente que atiende tu WhatsApp con el tono y la información de tu negocio: responde preguntas frecuentes, deriva a un humano cuando corresponde y da seguimiento a tus clientes.",
    examples: [
      "Respuestas automáticas por WhatsApp",
      "Información de productos o servicios",
      "Captura de datos y seguimiento de prospectos",
      "Derivación a un humano cuando se necesite",
    ],
    ctaLabel: "Preguntar por el agente",
    ctaHref: whatsappLink(whatsappMessages.agenteWhatsapp),
    ctaTarget: "_blank",
  },
  {
    icon: Workflow,
    name: "Automatización de tareas administrativas",
    tagline:
      "Automatizamos Excel, reportes, correos, registros, PDFs y tareas repetitivas.",
    description:
      "Creamos flujos que reducen trabajo manual en tareas administrativas, comerciales u operativas (back-office). Conectamos formularios, hojas de cálculo, correos, documentos y notificaciones.",
    examples: [
      "Formulario a Google Sheets",
      "Registro automático de pedidos",
      "Reportes y alertas automáticas",
      "Lectura o extracción de datos de PDFs",
    ],
    ctaLabel: "Solicitar propuesta",
    ctaHref: whatsappLink(whatsappMessages.automatizacion),
    ctaTarget: "_blank",
  },
  {
    icon: PhoneCall,
    name: "Agente de voz IA para llamadas",
    tagline:
      "Contesta el teléfono, responde consultas y agenda citas sin que nadie deje de atender.",
    description:
      "Un agente que atiende llamadas con voz natural en español: informa horarios y precios, toma pedidos o reservas, agenda citas en tu calendario y te pasa la llamada cuando el caso lo amerita.",
    examples: [
      "Atención telefónica fuera de horario",
      "Reserva y confirmación de citas",
      "Toma de pedidos por teléfono",
      "Derivación a una persona cuando se necesite",
    ],
    ctaLabel: "Preguntar por el agente de voz",
    ctaHref: whatsappLink(whatsappMessages.agenteVoz),
    ctaTarget: "_blank",
  },
  {
    icon: ScanLine,
    name: "Digitalización de documentos con IA",
    tagline:
      "Convierte facturas, boletas y contratos en datos listos para usar.",
    description:
      "La IA lee tus documentos —físicos o digitales— y extrae los datos a Excel, Sheets o tu sistema. Se acaba el digitado manual y los errores de transcripción.",
    examples: [
      "Facturas y boletas a Excel",
      "Lectura de guías de remisión",
      "Extracción de datos de contratos",
      "Archivos históricos en papel a base de datos",
    ],
    ctaLabel: "Solicitar propuesta",
    ctaHref: whatsappLink(whatsappMessages.documentos),
    ctaTarget: "_blank",
  },
  {
    icon: GraduationCap,
    name: "Capacitación en IA para tu equipo",
    tagline:
      "Formamos a tu gente para que use IA en su trabajo diario, sin humo.",
    description:
      "Sesiones prácticas sobre los casos reales de tu empresa: cómo escribir buenas instrucciones, qué tareas conviene delegar a la IA y cuáles no, y cómo revisar sus resultados con criterio.",
    examples: [
      "Taller práctico por área",
      "Casos de uso de tu propio negocio",
      "Buenas prácticas y límites de la IA",
      "Guía de uso para el equipo",
    ],
    ctaLabel: "Ver capacitación",
    ctaHref: whatsappLink(whatsappMessages.capacitacion),
    ctaTarget: "_blank",
  },
  {
    icon: Sparkles,
    name: "Soluciones IA a medida",
    tagline:
      "Diseñamos automatizaciones personalizadas según el proceso de tu empresa.",
    description:
      "Para empresas que necesitan algo específico: integración entre herramientas, un flujo comercial particular o un sistema interno ligero potenciado con IA.",
    examples: [
      "Integraciones entre sistemas",
      "Dashboards internos",
      "Flujos comerciales personalizados",
      "Procesos especiales de atención",
    ],
    ctaLabel: "Contarnos mi caso",
    ctaHref: whatsappLink(whatsappMessages.custom),
    ctaTarget: "_blank",
  },
];

function OtherServiceCard({
  service,
  idx,
}: {
  service: OtherService;
  idx: number;
}) {
  const Icon = service.icon;
  return (
    // Reveal3D pone la entrada inclinada; SpotlightCard, el glow en hover.
    <Reveal3D delay={idx * 0.07} className="h-full">
      <SpotlightCard
        spotlightColor="rgba(124,58,237,0.16)"
        className="glass glass-hover flex h-full flex-col p-7"
      >
      <div className="grid size-12 place-items-center rounded-xl border border-border bg-white/[0.04] text-accent-violet">
        <Icon className="size-5" />
      </div>

      <h3 className="mt-6 text-base font-semibold tracking-tight">
        {service.name}
      </h3>
      <p className="mt-2 text-sm text-foreground/85">{service.tagline}</p>
      <p className="mt-3 text-sm text-muted">{service.description}</p>

      <div className="mt-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted">
          Ejemplos
        </div>
        <ul className="mt-3 space-y-2 text-sm">
          {service.examples.map((ex) => (
            <li key={ex} className="flex items-start gap-2.5">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent-violet" />
              <span className="text-foreground/80">{ex}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-6">
        <ButtonLink
          href={service.ctaHref}
          target={service.ctaTarget}
          rel="noopener noreferrer"
          variant="secondary"
          size="sm"
          className="w-full"
          iconRight={
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          }
        >
          {service.ctaLabel}
        </ButtonLink>
        </div>
      </SpotlightCard>
    </Reveal3D>
  );
}

/* ============================================================
   Sección Services
   ============================================================ */
export function Services() {
  return (
    <Section
      id="servicios"
      eyebrow="Servicios"
      title={
        <>
          Soluciones IA para problemas{" "}
          <span className="text-gradient-accent">reales de tu negocio</span>
        </>
      }
      description="Desde una asesoría gratuita hasta agentes de IA entrenados con tu propia información. Cada servicio se cotiza según tu alcance — sin listas de precios genéricas."
    >
      <AsesoriaCallout />

      <div className="mt-16 space-y-6">
        <FlagshipAgentesMedida />
        <ExcelCrmService />
      </div>

      <div className="mt-16">
        <div className="mb-8 max-w-2xl">
          <span className="badge mb-3">
            <span className="size-1.5 rounded-full bg-accent-violet shadow-glow-violet" />
            Más servicios
          </span>
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Otras formas en que te podemos ayudar
          </h3>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Atención por WhatsApp y llamadas, papeleo que se digitaliza solo,
            tareas internas ordenadas y tu equipo entrenado para usar IA.
            Puedes empezar por uno y sumar el resto cuando tenga sentido.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherServices.map((s, i) => (
            <OtherServiceCard key={s.name} service={s} idx={i} />
          ))}
        </div>
      </div>

      {/* Nota de precios */}
      <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-muted">
        No publicamos precios fijos: recién estamos construyendo Aurexo Labs y
        cada solución depende del alcance, la información a integrar y los
        objetivos de tu empresa. Coordinamos la propuesta y el precio
        directamente por WhatsApp o en tu asesoría gratuita de 45 minutos.
      </p>
    </Section>
  );
}
