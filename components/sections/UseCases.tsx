"use client";

import { motion } from "framer-motion";
import {
  Utensils,
  Store,
  Briefcase,
  GraduationCap,
  Truck,
  Building2,
  ShoppingBag,
  Package,
  Stethoscope,
  Users,
  CheckCircle2,
} from "lucide-react";
import type { ComponentType } from "react";
import { Section } from "@/components/ui/Section";

interface Industry {
  icon: ComponentType<{ className?: string }>;
  label: string;
}

const industries: Industry[] = [
  { icon: Utensils, label: "Restaurantes" },
  { icon: Store, label: "Tiendas y comercios" },
  { icon: Briefcase, label: "Servicios profesionales" },
  { icon: GraduationCap, label: "Educación" },
  { icon: Truck, label: "Logística" },
  { icon: Building2, label: "Inmobiliarias" },
  { icon: ShoppingBag, label: "E-commerce" },
  { icon: Package, label: "Distribuidores y mayoristas" },
  { icon: Stethoscope, label: "Clínicas y consultorios" },
  { icon: Users, label: "Empresas familiares" },
];

const examples = [
  "Responder consultas frecuentes por WhatsApp",
  "Registrar pedidos automáticamente",
  "Enviar recordatorios a clientes",
  "Ordenar leads comerciales",
  "Crear reportes automáticos",
  "Consultar documentos internos con IA",
  "Dar seguimiento a clientes inactivos",
  "Reducir tareas repetitivas en Excel",
  "Centralizar solicitudes o consultas",
  "Notificar al equipo cuando llega un lead importante",
];

export function UseCases() {
  return (
    <Section
      id="casos"
      eyebrow="Casos de uso"
      title={
        <>
          Casos de uso que{" "}
          <span className="text-gradient-accent">podemos automatizar</span>
        </>
      }
      description="Trabajamos sobre escenarios concretos. Si tu negocio comparte algo con esta lista, probablemente hay una solución de IA que te ahorra tiempo."
    >
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Industrias */}
        <div className="lg:col-span-5">
          <div className="glass p-7">
            <h3 className="text-base font-semibold tracking-tight">
              Industrias donde trabajamos
            </h3>
            <p className="mt-2 text-sm text-muted">
              Negocios con procesos repetitivos, atención por WhatsApp o
              información dispersa en documentos.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {industries.map((ind, i) => {
                const Icon = ind.icon;
                return (
                  <motion.span
                    key={ind.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-xs text-foreground/85"
                  >
                    <Icon className="size-3.5 text-accent" />
                    {ind.label}
                  </motion.span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ejemplos */}
        <div className="lg:col-span-7">
          <div className="glass p-7">
            <h3 className="text-base font-semibold tracking-tight">
              Ejemplos concretos
            </h3>
            <p className="mt-2 text-sm text-muted">
              Algunas automatizaciones típicas que implementamos. Puede ser una o
              varias de estas, según el caso.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {examples.map((ex, i) => (
                <motion.li
                  key={ex}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="flex items-start gap-2.5 text-sm"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span className="text-foreground/85">{ex}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
