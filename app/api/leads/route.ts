import { NextResponse } from "next/server";

/**
 * POST /api/leads
 * ---------------------------------------------------------------
 * Recibe el formulario de contacto (components/sections/ContactForm.tsx)
 * y envía el lead por correo usando Resend.
 *
 * Variables de entorno (ver .env.example):
 *   RESEND_API_KEY  — obligatoria para que se envíe el correo.
 *   LEADS_TO        — bandeja que recibe los leads.
 *   LEADS_FROM      — remitente. Debe ser de un dominio verificado en Resend;
 *                     si no tienes dominio verificado, usa onboarding@resend.dev
 *                     (que sólo puede enviar al correo dueño de la cuenta Resend).
 *
 * Si RESEND_API_KEY no está configurada, el endpoint sólo loguea el lead en
 * consola y responde 200 — útil en desarrollo. Si está configurada y el envío
 * falla, respondemos error a propósito: es preferible que el formulario muestre
 * "no se pudo enviar, escríbenos por WhatsApp" a perder el lead en silencio.
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

/** El lead lo escribe un desconocido: nunca lo interpolamos crudo en el HTML. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Limita el tamaño de cada campo para que nadie use el form como megáfono. */
function trim(value: string, max = 2000): string {
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

function buildEmail(lead: LeadPayload) {
  const rows: [string, string][] = [
    ["Empresa", lead.company],
    ["Contacto", lead.contactName],
    ["WhatsApp", lead.whatsapp],
    ["Correo", lead.email],
    ["Rubro", lead.industry],
    ["Empleados", lead.employees],
    ["Servicio de interés", lead.service],
  ];

  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:640px">
      <h2 style="margin:0 0 4px">Nuevo lead — ${esc(trim(lead.company, 120))}</h2>
      <p style="margin:0 0 20px;color:#667">${esc(lead.service)}</p>
      <table cellpadding="6" style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                 <td style="border-bottom:1px solid #eee;color:#667;width:150px">${esc(k)}</td>
                 <td style="border-bottom:1px solid #eee"><strong>${esc(trim(v, 300))}</strong></td>
               </tr>`
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 6px;font-size:15px">Problema principal</h3>
      <p style="margin:0;white-space:pre-wrap;font-size:14px">${esc(trim(lead.problem))}</p>
      ${
        lead.message
          ? `<h3 style="margin:20px 0 6px;font-size:15px">Mensaje adicional</h3>
             <p style="margin:0;white-space:pre-wrap;font-size:14px">${esc(trim(lead.message))}</p>`
          : ""
      }
      <p style="margin:24px 0 0;color:#889;font-size:12px">
        Enviado desde ${esc(lead.source)} · ${esc(lead.submittedAt)}
      </p>
    </div>`.trim();

  const text = [
    `Nuevo lead — ${lead.company}`,
    ...rows.map(([k, v]) => `${k}: ${trim(v, 300)}`),
    "",
    `Problema principal:\n${trim(lead.problem)}`,
    lead.message ? `\nMensaje adicional:\n${trim(lead.message)}` : "",
    "",
    `Enviado desde ${lead.source} · ${lead.submittedAt}`,
  ].join("\n");

  return { html, text };
}

export async function POST(request: Request) {
  let lead: LeadPayload;

  try {
    const body = (await request.json()) as Partial<LeadPayload>;

    if (!isValid(body)) {
      return NextResponse.json(
        { ok: false, error: "missing_fields" },
        { status: 400 }
      );
    }

    lead = { ...body, message: body.message ?? "" };
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  // Sin API key configurada: modo desarrollo, sólo log.
  if (!apiKey) {
    console.log("[Aurexo Labs] Lead recibido (sin RESEND_API_KEY):", lead);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const to = process.env.LEADS_TO || "contacto@aurexolabs.com";
  const from = process.env.LEADS_FROM || "Aurexo Labs <onboarding@resend.dev>";
  const { html, text } = buildEmail(lead);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Responder al correo va directo al cliente, sin copiar y pegar.
        reply_to: lead.email,
        subject: `Nuevo lead — ${trim(lead.company, 80)} (${trim(lead.service, 60)})`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[Aurexo Labs] Resend rechazó el envío:", res.status, detail);
      // El lead igual queda en los logs del servidor por si hay que rescatarlo.
      console.error("[Aurexo Labs] Lead no entregado:", lead);
      return NextResponse.json(
        { ok: false, error: "email_failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[Aurexo Labs] /api/leads error:", err);
    console.error("[Aurexo Labs] Lead no entregado:", lead);
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500 }
    );
  }
}
