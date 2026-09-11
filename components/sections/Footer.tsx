import {
  Mail,
  MessageCircle,
  Linkedin,
  Instagram,
  MapPin,
  Clock,
} from "lucide-react";
import type { ComponentType } from "react";
import { Logo } from "@/components/ui/Logo";
import { TikTokIcon } from "@/components/ui/TikTokIcon";
import { site, whatsappLink, mailto, navLinks } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  // Sólo mostramos redes con URL real
  const socials = [
    site.social.instagram && {
      label: "Instagram",
      href: site.social.instagram,
      icon: Instagram as ComponentType<{ className?: string }>,
      color: "text-pink-400",
    },
    site.social.tiktok && {
      label: "TikTok",
      href: site.social.tiktok,
      icon: TikTokIcon as ComponentType<{ className?: string }>,
      color: "text-foreground",
    },
    site.social.linkedin && {
      label: "LinkedIn",
      href: site.social.linkedin,
      icon: Linkedin as ComponentType<{ className?: string }>,
      color: "text-accent",
    },
  ].filter(Boolean) as {
    label: string;
    href: string;
    icon: ComponentType<{ className?: string }>;
    color: string;
  }[];

  return (
    <footer className="relative mt-12 border-t border-border bg-background">
      <div className="container-page py-16">
        <div className="grid gap-10 sm:grid-cols-12">
          {/* Brand */}
          <div className="sm:col-span-5">
            <Logo size={52} />
            <p className="mt-4 max-w-sm text-sm text-muted">
              Creamos agentes de IA a medida, entrenados con la información de
              tu empresa, para RRHH, contabilidad, ventas, marketing y
              operaciones.
            </p>

            <div className="mt-5 space-y-2 text-xs text-muted">
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-accent" />
                {site.city}
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 size-3.5 shrink-0 text-accent" />
                <div>
                  <div>{site.hours.weekdays}</div>
                  <div>{site.hours.saturday}</div>
                </div>
              </div>
            </div>

            {/* Social icons */}
            {socials.length > 0 && (
              <div className="mt-5 flex items-center gap-2">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid size-9 place-items-center rounded-full border border-border bg-white/[0.03] text-foreground/70 transition hover:bg-white/[0.06] hover:text-foreground"
                    >
                      <Icon className={`size-4 ${s.color}`} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="sm:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Navegación
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-foreground/80 transition hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#diagnostico"
                  className="text-foreground/80 transition hover:text-foreground"
                >
                  Agenda tu asesoría gratuita
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted">
              Contacto
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={mailto()}
                  className="inline-flex items-center gap-2 text-foreground/80 transition hover:text-foreground"
                >
                  <Mail className="size-4 text-accent" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-foreground/80 transition hover:text-foreground"
                >
                  <MessageCircle className="size-4 text-[#25D366]" />
                  {site.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={site.domain}
                  className="inline-flex items-center gap-2 text-muted transition hover:text-foreground"
                >
                  {site.domain.replace("https://", "")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 divider" />

        <div className="flex flex-col items-start justify-between gap-3 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. Automatización e inteligencia artificial para
            empresas.
          </p>
          <p>Hecho en Lima, Perú · Diseño minimalista, tecnología real.</p>
        </div>
      </div>
    </footer>
  );
}
