"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for the section currently in view
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/60 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#inicio" className="shrink-0" aria-label="Aurexo Labs">
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm transition",
                active === l.href
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              )}
            >
              {active === l.href && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full border border-border bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-2 md:flex">
          <ButtonLink
            href="#diagnostico"
            variant="primary"
            size="sm"
            iconRight={<ArrowUpRight className="size-4" />}
          >
            Asesoría gratuita
          </ButtonLink>
        </div>

        {/* Mobile trigger */}
        <button
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-white/[0.03] text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <nav className="container-page flex flex-col gap-1 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base text-foreground/90 hover:bg-white/[0.04]"
                >
                  {l.label}
                </a>
              ))}
              <ButtonLink
                href="#diagnostico"
                onClick={() => setOpen(false)}
                variant="primary"
                size="md"
                className="mt-3 w-full"
                iconRight={<ArrowUpRight className="size-4" />}
              >
                Agenda tu asesoría gratuita
              </ButtonLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
