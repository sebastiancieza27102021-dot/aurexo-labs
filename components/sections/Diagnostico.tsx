"use client";

import { motion } from "framer-motion";
import {
  CalendarClock,
  MessageCircle,
  Video,
  Sparkles,
  Mail,
  Clock,
  CheckCircle2,
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

/** Lo que ocurre solo cuando el cliente confirma su hora. */
const afterBooking = [
  { icon: CalendarClock, text: "Queda agendado al instante" },
  { icon: Video, text: "Se crea el link de Meet" },
  { icon: Mail, text: "Te llega el correo con todo" },
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

            <div className="my-7 divider" />

            <div className="rounded-xl border border-border bg-white/[0.02] p-4">
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
          </motion.div>
        </div>

        {/* Agendar */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass glow-ring relative flex h-full flex-col overflow-hidden p-4 sm:p-6"
          >
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
                <CalendarClock className="size-5" />
              </span>
              <div>
                <h3 className="text-xl font-semibold tracking-tight">
                  Reserva tu asesoría gratuita
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {hasMeetingLink
                    ? "Elige el horario que te acomode. La cita y el link de Meet te llegan al correo al instante."
                    : "Coordinemos por WhatsApp o por correo el mejor horario. Te responde una persona real, no un bot."}
                </p>
              </div>
            </div>

            {hasMeetingLink && (
              <>
                {/* Qué pasa al confirmar */}
                <ul className="relative mt-5 grid gap-2 sm:grid-cols-3">
                  {afterBooking.map((s) => {
                    const Icon = s.icon;
                    return (
                      <li
                        key={s.text}
                        className="flex items-center gap-2 rounded-xl border border-border bg-white/[0.02] px-3 py-2.5 text-xs text-foreground/85"
                      >
                        <Icon className="size-3.5 shrink-0 text-accent" />
                        {s.text}
                      </li>
                    );
                  })}
                </ul>

                {/* Calendario */}
                <div className="relative mt-4 overflow-hidden rounded-xl border border-border bg-white">
                  <iframe
                    src={site.meetingEmbedUrl}
                    title="Agenda tu asesoría gratuita de 45 minutos con Aurexo Labs"
                    loading="lazy"
                    className="h-[600px] w-full"
                    style={{ border: 0 }}
                  />
                </div>
              </>
            )}

            {/*
              Salida de emergencia siempre visible. Si el calendario no ofrece
              horarios — porque se llenó, porque el visitante mira un fin de
              semana o porque Google falla — el cliente no se queda sin camino.
            */}
            <div className="relative mt-4 rounded-xl border border-accent/25 bg-accent/[0.06] p-4">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    ¿No ves un horario que te sirva?
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Escríbenos y coordinamos uno a tu medida, incluso fuera del
                    horario publicado. Te responde una persona, no un bot.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2.5">
                    <ButtonLink
                      href={whatsappLink(whatsappMessages.asesoria)}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="whatsapp"
                      size="sm"
                      icon={<MessageCircle className="size-4" />}
                    >
                      Coordinar por WhatsApp
                    </ButtonLink>
                    <ButtonLink
                      href={mailto("Asesoría gratuita · Aurexo Labs")}
                      variant="secondary"
                      size="sm"
                      icon={<Mail className="size-4" />}
                    >
                      Escribir por correo
                    </ButtonLink>
                    {hasMeetingLink && (
                      <ButtonLink
                        href={site.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="ghost"
                        size="sm"
                        icon={<CalendarClock className="size-4" />}
                      >
                        Abrir calendario aparte
                      </ButtonLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
