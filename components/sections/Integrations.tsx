"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  FileSpreadsheet,
  Mail,
  CalendarDays,
  FolderOpen,
  Database,
  ShoppingCart,
  Users,
  FileText,
  Phone,
  Instagram,
  Workflow,
} from "lucide-react";
import type { ComponentType } from "react";
import { Section } from "@/components/ui/Section";

interface Tool {
  icon: ComponentType<{ className?: string }>;
  label: string;
}

const tools: Tool[] = [
  { icon: MessageCircle, label: "WhatsApp" },
  { icon: FileSpreadsheet, label: "Excel" },
  { icon: FileSpreadsheet, label: "Google Sheets" },
  { icon: Mail, label: "Gmail / Outlook" },
  { icon: CalendarDays, label: "Google Calendar" },
  { icon: FolderOpen, label: "Drive / OneDrive" },
  { icon: Database, label: "Bases de datos" },
  { icon: ShoppingCart, label: "E-commerce" },
  { icon: Users, label: "Tu CRM" },
  { icon: FileText, label: "PDFs y documentos" },
  { icon: Phone, label: "Central telefónica" },
  { icon: Instagram, label: "Redes sociales" },
  { icon: Workflow, label: "ERP / sistema interno" },
];

function Row({
  reverse = false,
  duration = 46,
}: {
  reverse?: boolean;
  duration?: number;
}) {
  // Duplicamos la lista para que el loop del marquee sea continuo
  const items = [...tools, ...tools];

  return (
    <div
      className="animate-marquee flex w-max gap-3"
      style={{
        ["--marquee-duration" as string]: `${duration}s`,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      {items.map((t, i) => {
        const Icon = t.icon;
        return (
          <span
            key={`${t.label}-${i}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-white/[0.03] px-4 py-2 text-sm text-foreground/85 backdrop-blur"
          >
            <Icon className="size-4 text-accent" />
            {t.label}
          </span>
        );
      })}
    </div>
  );
}

export function Integrations() {
  return (
    <Section
      eyebrow="Integraciones"
      title={
        <>
          Trabajamos sobre las herramientas{" "}
          <span className="text-gradient-accent">que ya usas</span>
        </>
      }
      description="No te pedimos cambiar de sistema ni comprar software nuevo. La IA se conecta a lo que tu equipo ya conoce — y si usas algo que no está en esta lista, lo revisamos en la asesoría."
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="marquee-mask space-y-3 overflow-hidden py-2"
      >
        <Row duration={52} />
        <Row reverse duration={64} />
      </motion.div>
    </Section>
  );
}
