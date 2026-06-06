import { NextResponse } from "next/server";

/**
 * POST /api/leads
 * ---------------------------------------------------------------
 * Recibe el formulario de contacto (components/sections/ContactForm.tsx).
 *
 * INTEGRACIONES SUGERIDAS (elige una o varias):
 *
 *  1) RESEND — recomendado para arrancar rápido:
 *     - npm i resend
 *     - .env.local: RESEND_API_KEY, SALES_INBOX
 *     - Descomenta el bloque RESEND.
 *
 *  2) FORMSPREE — cero código backend:
 *     - .env.local: FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
 *     - Descomenta el bloque FORMSPREE.
 *
 *  3) SUPABASE — almacenamiento persistente:
 *     - npm i @supabase/supabase-js
 *     - .env.local: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *     - Crea tabla `leads` con las columnas del payload.
 *     - Descomenta el bloque SUPABASE.
 *
 *  4) GOOGLE SHEETS (Apps Script Web App):
 *     - .env.local: GOOGLE_SHEETS_WEBHOOK_URL
 *     - Descomenta el bloque GOOGLE_SHEETS.
 *
 * Mientras no haya backend real, el endpoint sólo loguea el lead en consola
 * y responde 200. El formulario, en su mensaje de éxito, invita a escribir
 * por WhatsApp o correo para asegurar respuesta inmediata — así nunca se
 * "simula" un envío sin notificarte realmente.
 * --------------------------------------------------------------- */

interface LeadPayload {
  company: string;
  contactName: string;
  whatsapp: string;
  email: string;
  industry: string;
  employees: string;
  service: string;
  problem: string;
  message?: string;
  submittedAt: string;
  source: string;
}

function isValid(p: Partial<LeadPayload>): p is LeadPayload {
  return Boolean(
    p.company &&
      p.contactName &&
      p.whatsapp &&
      p.email &&
      p.industry &&
      p.employees &&
      p.service &&
      p.problem
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LeadPayload>;

    if (!isValid(body)) {
      return NextResponse.json(
        { ok: false, error: "missing_fields" },
        { status: 400 }
      );
    }

    const lead: LeadPayload = { ...body, message: body.message ?? "" };

    // -------------------------------------------------------------
    // 1) RESEND (recomendado) — email a tu bandeja
    // -------------------------------------------------------------
    /*
    if (process.env.RESEND_API_KEY && process.env.SALES_INBOX) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Aurexo Labs <leads@aurexolabs.com>",
          to: process.env.SALES_INBOX,
          subject: `Nuevo lead — ${lead.company}`,
          html: `
            <h2>${lead.company}</h2>
            <p><b>Contacto:</b> ${lead.contactName}</p>
            <p><b>WhatsApp:</b> ${lead.whatsapp}</p>
            <p><b>Correo:</b> ${lead.email}</p>
            <p><b>Rubro:</b> ${lead.industry} · <b>Empleados:</b> ${lead.employees}</p>
            <p><b>Servicio:</b> ${lead.service}</p>
            <p><b>Problema:</b><br/>${lead.problem}</p>
            <p><b>Mensaje:</b><br/>${lead.message}</p>
          `,
        }),
      });
    }
    */

    // -------------------------------------------------------------
    // 2) FORMSPREE
    // -------------------------------------------------------------
    /*
    if (process.env.FORMSPREE_ENDPOINT) {
      await fetch(process.env.FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(lead),
      });
    }
    */

    // -------------------------------------------------------------
    // 3) SUPABASE
    // -------------------------------------------------------------
    /*
    import { createClient } from "@supabase/supabase-js";
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { error } = await supabase.from("leads").insert([{
      company: lead.company,
      contact_name: lead.contactName,
      whatsapp: lead.whatsapp,
      email: lead.email,
      industry: lead.industry,
      employees: lead.employees,
      service: lead.service,
      problem: lead.problem,
      message: lead.message,
      source: lead.source,
      submitted_at: lead.submittedAt,
    }]);
    if (error) throw error;
    */

    // -------------------------------------------------------------
    // 4) GOOGLE SHEETS via Apps Script Web App
    // -------------------------------------------------------------
    /*
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    }
    */

    // Dev fallback: log para que el form funcione mientras conectas un backend real
    console.log("[Aurexo Labs] Nuevo lead:", lead);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Aurexo Labs] /api/leads error:", err);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
