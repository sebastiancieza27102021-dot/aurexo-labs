"use client";

import { motion } from "framer-motion";
import {
  CalendarClock,
  MessageCircle,
  Video,
  Sparkles,
  Mail,
  Clock,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { site, whatsappLink, whatsappMessages, mailto } from "@/lib/site";

const highlights = [
  {
    icon: Video,
    title: "Reunión por Google Meet",
    desc: "45 minutos, en línea. Sin compromiso, sin tecnicismos.",
  },
  {
    icon: Sparkles,
    title: "Revisión de tu caso",
    desc: "Vemos qué información tienes, qué procesos repites y dónde te ayudaría un agente de IA.",
  },
  {
    icon: CalendarClock,
    title: "Propuesta y precio a tu medida",
    desc: "Si hay encaje, te enviamos una propuesta con alcance, tiempos y precio — recién ahí.",
  },
];

export function Diagnostico() {
  const hasMeetingLink = site.meetingLink.length > 0;

  return (
    <Section
      id="diagnostico"
      eyebrow="Asesoría gratuita"
      title={
        <>
          Conversemos 45 minutos sobre{" "}
          <span className="text-gradient-accent">lo que necesita tu empresa</span>
        </>
      }
      description="No tenemos una lista de precios porque cada empresa es distinta. Cuéntanos tu caso y te decimos con honestidad qué solución te conviene — antes de cualquier propuesta o pago."
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Lo que incluye */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="glass h-full p-7"
          >
            <ul className="space-y-5">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <li key={h.title} className="flex gap-4">
                    <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-white/[0.04] text-accent">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{h.title}</div>
                      <p className="mt-1 text-sm text-muted">{h.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="my-7 divider" />

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted">Duración</span>
                <span className="font-medium">45 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Costo</span>
                <span className="font-medium">Gratis</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">Formato</span>
                <span className="font-medium">Google Meet</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cómo agendar */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass relative h-full overflow-hidden p-2"
          >
            <div className="relative grid h-full min-h-[420px] place-items-center rounded-xl border border-border bg-gradient-to-br from-elevated to-background p-8 text-center">
              <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-accent/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 right-0 h-40 w-72 rounded-full bg-accent-violet/20 blur-3xl" />

              <div className="relative w-full max-w-md">
                <div className="mx-auto grid size-14 place-items-center rounded-2xl border border-border bg-white/[0.04] text-accent">
                  <CalendarClock className="size-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight sm:text-2xl">
                  Reserva tu asesoría gratuita
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-sm text-muted">
                  {hasMeetingLink
                    ? "Elige el horario que prefieras en el calendario. Te llega la confirmación y el link de Meet automáticamente."
                    : "Coordinemos por WhatsApp o por correo el mejor horario. Te responde una persona real, no un bot."}
                </p>

                {/* Horarios */}
                <div className="mx-auto mt-6 max-w-sm rounded-xl border border-border bg-white/[0.02] p-4 text-left">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    <Clock className="size-3.5 text-accent" />
                    Horario de atención
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    <li className="flex items-center justify-between text-foreground/85">
                      <span className="text-muted">Lun – Vie</span>
                      <span>9:00 a.m. – 6:00 p.m.</span>
                    </li>
                    <li className="flex items-center justify-between text-foreground/85">
                      <span className="text-muted">Sábados</span>
                      <span>9:00 a.m. – 12:00 p.m.</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {hasMeetingLink && (
                    <ButtonLink
                      href={site.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="lg"
                      icon={<CalendarClock className="size-4" />}
                    >
                      Agendar en Google Calendar
                    </ButtonLink>
                  )}
                  <ButtonLink
                    href={whatsappLink(whatsappMessages.asesoria)}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant={hasMeetingLink ? "secondary" : "whatsapp"}
                    size="lg"
                    icon={<MessageCircle className="size-4" />}
                  >
                    Agendar por WhatsApp
                  </ButtonLink>
                  {!hasMeetingLink && (
                    <ButtonLink href="#contacto" variant="secondary" size="lg">
                      Llenar formulario
                    </ButtonLink>
                  )}
                </div>

                <a
                  href={mailto("Asesoría gratuita · Aurexo Labs")}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground"
                >
                  <Mail className="size-3.5" />
                  o escríbenos a {site.email}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
