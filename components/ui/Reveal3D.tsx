"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Reveal3DProps {
  children: ReactNode;
  className?: string;
  /** Retardo en segundos, para escalonar varios elementos de una grilla. */
  delay?: number;
  /** Grados de inclinación inicial. Más de ~16 se siente exagerado. */
  angle?: number;
}

/**
 * Entrada en 3D: el elemento aparece inclinado hacia atrás y se endereza al
 * entrar en pantalla, como una carta que se acomoda.
 *
 * La perspectiva va en el contenedor y la rotación en el hijo — si se ponen
 * en el mismo nodo, el navegador aplica la perspectiva desde el centro del
 * propio elemento y el efecto se aplana.
 *
 * El respeto a `prefers-reduced-motion` lo resuelve `MotionProvider` en la
 * raíz (`reducedMotion="user"`): framer descarta la rotación y deja sólo el
 * fundido. No se ramifica aquí a propósito — hacerlo cambiaría el DOM entre
 * servidor y cliente y rompería la hidratación.
 */
export function Reveal3D({
  children,
  className,
  delay = 0,
  angle = 12,
}: Reveal3DProps) {
  return (
    <div className={cn("[perspective:1100px]", className)}>
      <motion.div
        initial={{ opacity: 0, rotateX: angle, y: 34, scale: 0.97 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d", transformOrigin: "50% 100%" }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
