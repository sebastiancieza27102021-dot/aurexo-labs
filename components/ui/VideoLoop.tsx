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
 * La reproducción se controla desde aquí en vez de con el atributo `autoplay`
 * para que sólo corra mientras está a la vista y no gaste batería ni CPU de
 * fondo.
 *
 * Sobre `prefers-reduced-motion`: este video sí se reproduce igual. Es el demo
 * del producto, dura 10 s, no tiene sonido y su movimiento es suave; dejarlo
 * congelado hacía que la sección pareciera rota. El resto de la interfaz
 * (malla 3D, rejilla, inclinaciones) sí respeta esa preferencia, que es donde
 * el movimiento puede incomodar de verdad.
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
      // `autoPlay` es el respaldo: si la llamada a play() del observer se
      // rechaza, el navegador arranca igual (silenciado siempre está
      // permitido). El observer se sigue encargando de pausarlo fuera de vista.
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      className={cn(
        "pointer-events-none h-full w-full object-cover",
        className
      )}
    />
  );
}
