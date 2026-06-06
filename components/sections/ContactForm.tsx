"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Send,
  AlertCircle,
  Loader2,
  MessageCircle,
  Mail,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button, ButtonLink } from "@/components/ui/Button";
import { site, whatsappLink, mailto } from "@/lib/site";
import { cn } from "@/lib/utils";

interface FormState {
  company: string;
  contactName: string;
  whatsapp: string;
  email: string;
  industry: string;
  employees: string;
  service: string;
  problem: string;
  message: string;
}

const initial: FormState = {
  company: "",
  contactName: "",
  whatsapp: "",
  email: "",
  industry: "",
  employees: "",
  service: "",
  problem: "",
  message: "",
};

// Servicios alineados con la sección Services
const services = [
  "Diagnóstico IA gratuito",
  "Agente IA WhatsApp Starter",
  "Agente IA WhatsApp Growth",
  "Automatización de tareas administrativas",
  "Asistente IA para documentos y equipo",
  "Solución IA a medida",
  "Aún no estoy seguro / Asesoría",
];

const employeeRanges = ["1-5", "6-20", "21-50", "51-200", "+200"];

function Field({
  label,
  required,
  children,
  error,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-xs font-medium text-foreground/80">
        {label}
        {required && <span className="text-accent">*</span>}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 flex items-center gap-1 text-[11px] text-red-400">
          <AlertCircle className="size-3" />
          {error}
        </span>
      )}
    </label>
  );
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const update = (key: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.company.trim()) e.company = "Ingresa el nombre de la empresa.";
    if (!form.contactName.trim()) e.contactName = "Ingresa tu nombre.";
    if (!form.whatsapp.trim()) {
      e.whatsapp = "Ingresa tu WhatsApp.";
    } else if (!/^[0-9+\s-]{7,}$/.test(form.whatsapp)) {
      e.whatsapp = "Formato no válido.";
    }
    if (!form.email.trim()) {
      e.email = "Ingresa un correo.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Correo no válido.";
    }
    if (!form.industry.trim()) e.industry = "Cuéntanos tu rubro.";
    if (!form.employees) e.employees = "Selecciona un rango.";
    if (!form.service) e.service = "Elige un servicio.";
    if (!form.problem.trim()) e.problem = "Describe el problema principal.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // POST → /api/leads. Allí está el scaffolding para Supabase/Sheets/Notion/Resend.
  // Si todavía no conectaste un backend real, el endpoint sólo loguea en consola:
  // el form igualmente sale "exitoso" pero el mensaje invita a usar WhatsApp/correo
  // como vía garantizada de respuesta.
  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          submittedAt: new Date().toISOString(),
          source: "landing-aurexolabs",
        }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section
      id="contacto"
      eyebrow="Contacto"
      title={
        <>
          Cuéntanos sobre tu empresa{" "}
          <span className="text-gradient-accent">y conversemos</span>
        </>
      }
      description="Completa el formulario y te respondemos en horario de oficina. Si prefieres, escríbenos directamente por WhatsApp o al correo."
    >
      {/* Alternativas directas — siempre visibles */}
      <div className="mx-auto mb-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
        <ButtonLink
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          variant="whatsapp"
          size="md"
          icon={<MessageCircle className="size-4" />}
        >
          WhatsApp directo
        </ButtonLink>
        <ButtonLink
          href={mailto("Contacto desde aurexolabs.com")}
          variant="secondary"
          size="md"
          icon={<Mail className="size-4" />}
        >
          {site.email}
        </ButtonLink>
      </div>

      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="glass mx-auto max-w-3xl p-6 sm:p-10"
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nombre de la empresa" required error={errors.company}>
            <input
              className={cn("input-base", errors.company && "border-red-500/50")}
              placeholder="Ej. Comercial San Martín"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              autoComplete="organization"
            />
          </Field>

          <Field label="Tu nombre" required error={errors.contactName}>
            <input
              className={cn(
                "input-base",
                errors.contactName && "border-red-500/50"
              )}
              placeholder="Ej. María Torres"
              value={form.contactName}
              onChange={(e) => update("contactName", e.target.value)}
              autoComplete="name"
            />
          </Field>

          <Field label="WhatsApp" required error={errors.whatsapp}>
            <input
              className={cn("input-base", errors.whatsapp && "border-red-500/50")}
              placeholder="+51 9XX XXX XXX"
              inputMode="tel"
              value={form.whatsapp}
              onChange={(e) => update("whatsapp", e.target.value)}
              autoComplete="tel"
            />
          </Field>

          <Field label="Correo" required error={errors.email}>
            <input
              className={cn("input-base", errors.email && "border-red-500/50")}
              placeholder="contacto@empresa.com"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              autoComplete="email"
            />
          </Field>

          <Field label="Rubro del negocio" required error={errors.industry}>
            <input
              className={cn("input-base", errors.industry && "border-red-500/50")}
              placeholder="Ej. Retail, Servicios, Educación..."
              value={form.industry}
              onChange={(e) => update("industry", e.target.value)}
            />
          </Field>

          <Field label="Cantidad de empleados" required error={errors.employees}>
            <select
              className={cn(
                "input-base appearance-none pr-10",
                errors.employees && "border-red-500/50"
              )}
              value={form.employees}
              onChange={(e) => update("employees", e.target.value)}
            >
              <option value="" disabled>
                Selecciona un rango
              </option>
              {employeeRanges.map((r) => (
                <option key={r} value={r} className="bg-elevated">
                  {r} empleados
                </option>
              ))}
            </select>
          </Field>

          <div className="sm:col-span-2">
            <Field label="Servicio de interés" required error={errors.service}>
              <select
                className={cn(
                  "input-base appearance-none pr-10",
                  errors.service && "border-red-500/50"
                )}
                value={form.service}
                onChange={(e) => update("service", e.target.value)}
              >
                <option value="" disabled>
                  Elige el servicio que más te interesa
                </option>
                {services.map((s) => (
                  <option key={s} value={s} className="bg-elevated">
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="sm:col-span-2">
            <Field
              label="Problema principal de tu negocio"
              required
              error={errors.problem}
            >
              <textarea
                className={cn(
                  "input-base min-h-[100px]",
                  errors.problem && "border-red-500/50"
                )}
                placeholder="Ej. Demoramos demasiado respondiendo en WhatsApp y perdemos ventas..."
                value={form.problem}
                onChange={(e) => update("problem", e.target.value)}
              />
            </Field>
          </div>

          <div className="sm:col-span-2">
            <Field label="Mensaje adicional (opcional)">
              <textarea
                className="input-base min-h-[80px]"
                placeholder="Cuéntanos cualquier detalle adicional relevante."
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
              />
            </Field>
          </div>
        </div>

        {/* Footer del form */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">
            Al enviar, aceptas que te contactemos sobre tu solicitud. No
            compartimos tu información.
          </p>

          <Button
            type="submit"
            disabled={status === "loading"}
            size="lg"
            iconRight={
              status === "loading" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )
            }
          >
            {status === "loading" ? "Enviando..." : "Enviar solicitud"}
          </Button>
        </div>

        {/* Status messages */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-200"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <div>
              <div className="font-medium">¡Solicitud recibida!</div>
              <div className="text-emerald-200/80">
                Te responderemos en horario de oficina. Para respuesta inmediata,
                también puedes escribirnos por WhatsApp o a {site.email}.
              </div>
            </div>
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <div>
              <div className="font-medium">No se pudo enviar la solicitud.</div>
              <div className="text-red-200/80">
                Intenta nuevamente o escríbenos directamente por WhatsApp o a{" "}
                {site.email}.
              </div>
            </div>
          </motion.div>
        )}
      </motion.form>
    </Section>
  );
}
