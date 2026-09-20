"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface VideoLoopProps {
  src: string;
  poster?: string;
  className?: string;
}

/**
 * Video en bucle que se comporta como una animación, no como un reproductor:
 * sin controles, sin sonido y sin capturar clics (`pointer-events-none`), así
 * que no aparece el menú contextual de video ni se puede pausar por error.
 *
 * La reproducción se controla desde aquí en vez de con el atributo `autoplay`:
 *  - sólo corre mientras está a la vista, para no gastar batería ni CPU,
 *  - si el visitante pidió menos movimiento, se queda en el póster.
 *
 * Va marcado como decorativo: el texto que lo acompaña ya explica el servicio,
 * y el video no tiene audio ni subtítulos que aporten algo a un lector de
 * pantalla.
 */
export function VideoLoop({ src, poster, className }: VideoLoopProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // se queda en el póster, quieto
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Puede rechazarse por política de autoplay del navegador; si pasa,
          // el póster queda visible y no rompe nada.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      className={cn(
        "pointer-events-none h-full w-full object-cover",
        className
      )}
    />
  );
}
