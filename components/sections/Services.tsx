"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  Workflow,
  Bot,
  Sparkles,
  Check,
  ArrowUpRight,
  Gift,
  Star,
} from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { whatsappLink, whatsappMessages } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ============================================================
   1) Card de Diagnóstico — destacada y gratuita
   ============================================================ */
function DiagnosticoCallout() {
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
              Diagnóstico IA gratuito
            </span>
            <span className="text-xs text-muted">Punto de partida recomendado</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Descubre qué tareas de tu negocio se pueden automatizar.
          </h3>
          <p className="mt-3 text-sm text-muted sm:text-base">
            Analizamos tus procesos, canales de atención y tareas repetitivas
            para detectar oportunidades reales de automatización con IA. Ideal
            si quieres empezar con IA pero no sabes por dónde.
          </p>
          <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
            {[
              "Revisión inicial de procesos",
              "Identificación de tareas repetitivas",
              "Recomendación de soluciones aplicables",
              "Priorización de oportunidades",
              "Propuesta inicial según el alcance",
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
              Inversión
            </div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">
              Gratis
            </div>
            <p className="mt-2 text-xs text-muted">
              30–45 min, en línea. Sin compromiso, sin tecnicismos.
            </p>
            <ButtonLink
              href="#diagnostico"
              variant="primary"
              size="md"
              className="mt-5 w-full"
              iconRight={<ArrowUpRight className="size-4" />}
            >
              Agenda un diagnóstico gratuito
            </ButtonLink>
            <ButtonLink
              href={whatsappLink(whatsappMessages.diagnostico)}
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
   2) Servicio principal: Agente IA para WhatsApp (2 planes)
   ============================================================ */
interface WAPlan {
  name: string;
  tagline: string;
  setup: string;
  monthly: string;
  features: string[];
  ideal: string[];
  popular?: boolean;
  msg: string;
}

const waPlans: WAPlan[] = [
  {
    name: "Starter",
    tagline:
      "Para negocios que quieren automatizar respuestas frecuentes y mejorar su atención inicial.",
    setup: "S/ 700",
    monthly: "S/ 250 / mes",
    features: [
      "Respuestas automáticas por WhatsApp",
      "Preguntas frecuentes del negocio",
      "Información de productos o servicios",
      "Captura básica de datos del cliente",
      "Derivación a humano cuando se necesite",
      "Dashboard básico de conversaciones",
      "Configuración inicial del prompt del negocio",
      "Pruebas iniciales y ajustes básicos",
    ],
    ideal: [
      "Tiendas y comercios",
      "Restaurantes",
      "Servicios profesionales",
      "Consultorios",
      "Negocios locales",
      "Emprendedores",
    ],
    msg: whatsappMessages.agenteStarter,
  },
  {
    name: "Growth",
    tagline:
      "Para empresas que quieren usar WhatsApp como canal real de ventas, seguimiento y gestión comercial.",
    setup: "S/ 1,500",
    monthly: "S/ 450 / mes",
    features: [
      "Todo lo del plan Starter",
      "Seguimiento de prospectos",
      "Registro de clientes y conversaciones",
      "Campañas u ofertas controladas",
      "Etiquetas o clasificación de clientes",
      "Memoria básica por cliente",
      "Reporte de conversaciones, leads o consultas",
      "Mayor personalización del flujo comercial",
      "Mejoras y ajustes mensuales del agente",
    ],
    ideal: [
      "Distribuidores y mayoristas",
      "Inmobiliarias",
      "Clínicas",
      "Empresas con equipo comercial",
      "E-commerce",
      "Negocios con alto volumen en WhatsApp",
    ],
    popular: true,
    msg: whatsappMessages.agenteGrowth,
  },
];

function PlanCard({ plan, idx }: { plan: WAPlan; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      className={cn(
        "glass glass-hover relative flex h-full flex-col p-7",
        plan.popular && "glow-ring border-accent/30"
      )}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-medium text-accent backdrop-blur">
          <Star className="size-3" /> Más popular
        </span>
      )}
      <div className="flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl border border-border bg-white/[0.04] text-accent">
          <MessageCircle className="size-4" />
        </span>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted">
            Agente IA WhatsApp
          </div>
          <div className="text-base font-semibold tracking-tight">
            Plan {plan.name}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">{plan.tagline}</p>

      <div className="mt-6 rounded-xl border border-border bg-white/[0.02] p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-muted">Implementación desde</span>
          <span className="text-base font-semibold tracking-tight">
            {plan.setup}
          </span>
        </div>
        <div className="mt-1 flex items-baseline justify-between">
          <span className="text-xs text-muted">Mantenimiento desde</span>
          <span className="text-base font-semibold tracking-tight">
            {plan.monthly}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted">
          Incluye
        </div>
        <ul className="mt-3 space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-white/[0.05] text-accent">
                <Check className="size-3" />
              </span>
              <span className="text-foreground/85">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="my-6 divider" />

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted">
          Ideal para
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {plan.ideal.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-[11px] text-foreground/80"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <ButtonLink
        href={whatsappLink(plan.msg)}
        target="_blank"
        rel="noopener noreferrer"
        variant={plan.popular ? "primary" : "secondary"}
        size="md"
        className="mt-7 w-full"
        icon={<MessageCircle className="size-4" />}
      >
        Hablar por WhatsApp
      </ButtonLink>
    </motion.div>
  );
}

function FeaturedWhatsApp() {
  return (
    <div className="mt-16">
      <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <span className="badge mb-3">
            <span className="size-1.5 rounded-full bg-accent shadow-glow" />
            Servicio principal
          </span>
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Agente IA para WhatsApp
          </h3>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Responde clientes, captura datos y ayuda a vender incluso cuando tu
            equipo está ocupado. Dos planes para que empieces donde mejor te
            convenga.
          </p>
        </div>
        <ButtonLink
          href={whatsappLink(whatsappMessages.agenteWhatsapp)}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="sm"
          iconRight={<ArrowUpRight className="size-4" />}
        >
          Preguntar por planes
        </ButtonLink>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {waPlans.map((p, i) => (
          <PlanCard key={p.name} plan={p} idx={i} />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   3) Otros servicios (3 cards)
   ============================================================ */
interface OtherService {
  icon: ComponentType<{ className?: string }>;
  name: string;
  tagline: string;
  description: string;
  examples: string[];
  pricing: ReactNode;
  ctaHref: string;
  ctaTarget?: string;
}

const otherServices: OtherService[] = [
  {
    icon: Workflow,
    name: "Automatización de tareas administrativas",
    tagline:
      "Automatizamos Excel, reportes, correos, registros, PDFs y tareas repetitivas.",
    description:
      "Creamos flujos que reducen trabajo manual en tareas administrativas, comerciales u operativas (back-office). Conectamos formularios, hojas de cálculo, correos, documentos y notificaciones para que la información fluya ordenada.",
    examples: [
      "Formulario a Google Sheets",
      "Registro automático de pedidos",
      "Reportes semanales",
      "Alertas internas por correo",
      "Lectura o extracción de datos de PDFs",
      "Recordatorios automáticos",
    ],
    pricing: (
      <>
        Desde <span className="font-semibold text-foreground">S/ 1,000</span> por flujo
        <span className="block text-xs text-muted">+ S/ 350 / mes de mantenimiento</span>
      </>
    ),
    ctaHref: whatsappLink(whatsappMessages.automatizacion),
    ctaTarget: "_blank",
  },
  {
    icon: Bot,
    name: "Asistente IA para documentos y equipo",
    tagline:
      "Tu equipo consulta catálogos, precios, políticas o manuales en segundos.",
    description:
      "Creamos asistentes internos que responden usando información propia de la empresa: documentos, catálogos, políticas, manuales, PDFs, Excels, procesos internos o bases de conocimiento.",
    examples: [
      "Asistente para equipo comercial",
      "Consulta de catálogo y precios",
      "Asistente para políticas internas",
      "Procedimientos operativos",
      "Onboarding y capacitación interna",
      "Búsqueda de documentos frecuentes",
    ],
    pricing: (
      <>
        Desde <span className="font-semibold text-foreground">S/ 1,800</span> implementación
        <span className="block text-xs text-muted">+ S/ 600 / mes de mantenimiento</span>
      </>
    ),
    ctaHref: whatsappLink(whatsappMessages.asistente),
    ctaTarget: "_blank",
  },
  {
    icon: Sparkles,
    name: "Soluciones IA a medida",
    tagline:
      "Diseñamos automatizaciones personalizadas según el proceso de tu empresa.",
    description:
      "Para empresas que necesitan una solución específica: integración entre herramientas, dashboard interno, flujo personalizado o un sistema ligero con IA.",
    examples: [
      "Integraciones entre sistemas",
      "Dashboards internos",
      "Flujos comerciales personalizados",
      "Sistemas internos ligeros",
      "Procesos especiales de atención",
      "Automatizaciones operativas con IA",
    ],
    pricing: (
      <>
        <span className="font-semibold text-foreground">Cotización</span> según alcance
      </>
    ),
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
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      className="glass glass-hover group flex h-full flex-col p-7"
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

      <div className="my-6 divider" />

      <div className="mt-auto space-y-4">
        <div className="text-sm text-muted">{service.pricing}</div>
        <ButtonLink
          href={service.ctaHref}
          target={service.ctaTarget}
          rel="noopener noreferrer"
          variant="secondary"
          size="sm"
          className="w-full"
          iconRight={<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
        >
          Solicitar propuesta
        </ButtonLink>
      </div>
    </motion.div>
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
      description="Desde un diagnóstico gratuito hasta soluciones a medida. Cada servicio resuelve un problema concreto, con precios claros y alcance definido."
    >
      <DiagnosticoCallout />

      <FeaturedWhatsApp />

      <div className="mt-16">
        <div className="mb-8 max-w-2xl">
          <span className="badge mb-3">
            <span className="size-1.5 rounded-full bg-accent-violet shadow-glow-violet" />
            Más servicios
          </span>
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Más allá de WhatsApp
          </h3>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Si lo que necesitas es ordenar tareas internas o consultar
            información dispersa, tenemos servicios pensados para eso.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {otherServices.map((s, i) => (
            <OtherServiceCard key={s.name} service={s} idx={i} />
          ))}
        </div>
      </div>

      {/* Nota de precios */}
      <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-muted">
        Los precios mostrados son referenciales y pueden variar según el alcance,
        integraciones, volumen de uso, cantidad de usuarios, canales conectados y
        complejidad del proceso. El precio final se define después del diagnóstico.
      </p>
    </Section>
  );
}
