"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { whatsappLink } from "@/lib/site";

/**
 * Floating WhatsApp button.
 * Appears after the user scrolls past the hero.
 * Shows a small tooltip / CTA bubble after a short delay.
 */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [openTip, setOpenTip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 380);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (visible && !dismissed) {
      const t = setTimeout(() => setOpenTip(true), 900);
      return () => clearTimeout(t);
    }
  }, [visible, dismissed]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7"
        >
          <AnimatePresence>
            {openTip && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="relative max-w-[260px] rounded-2xl border border-border bg-elevated/95 px-4 py-3 pr-9 text-xs text-foreground shadow-card backdrop-blur"
              >
                <div className="font-medium">¿Conversamos?</div>
                <div className="mt-0.5 text-muted">
                  Te respondemos por WhatsApp en horario de oficina.
                </div>
                <button
                  onClick={() => {
                    setOpenTip(false);
                    setDismissed(true);
                  }}
                  aria-label="Cerrar"
                  className="absolute right-2 top-2 grid size-5 place-items-center rounded-full text-muted hover:bg-white/[0.06] hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
            onMouseEnter={() => setOpenTip(true)}
            className="group relative grid size-14 place-items-center rounded-full bg-[#25D366] text-black shadow-[0_15px_40px_-10px_rgba(37,211,102,0.7)] transition-transform hover:scale-105 sm:size-16"
          >
            <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-50 blur-xl" />
            <MessageCircle className="size-6 sm:size-7" />
            <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
