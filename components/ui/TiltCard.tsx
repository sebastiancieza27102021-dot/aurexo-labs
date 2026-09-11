"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps
  extends Omit<HTMLMotionProps<"div">, "children" | "style"> {
  children?: ReactNode;
  /** Máxima rotación en grados. Sutil = premium; pasado de 10 se siente de juguete. */
  intensity?: number;
  /** Glow que sigue al cursor. `null` lo desactiva. */
  spotlightColor?: string | null;
  /** Cuánto "levanta" la tarjeta en hover (px). */
  lift?: number;
  /** Clase para la capa interna que recibe la transformación 3D. */
  innerClassName?: string;
}

/**
 * Tarjeta con inclinación 3D real (perspectiva + rotación según el cursor).
 *
 * Se usa sólo en los bloques destacados — aplicarlo a todo haría que el efecto
 * se sienta forzado. Respeta `prefers-reduced-motion`: si el usuario pidió menos
 * movimiento, la tarjeta queda plana y sólo conserva el glow.
 */
export function TiltCard({
  children,
  className,
  innerClassName,
  intensity = 6,
  spotlightColor = "rgba(47,107,255,0.16)",
  lift = 6,
  onMouseMove,
  onMouseLeave,
  ...props
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // -0.5 … 0.5 respecto del centro de la tarjeta
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const hovering = useMotionValue(0);

  const spring = { stiffness: 260, damping: 26, mass: 0.6 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const sHover = useSpring(hovering, spring);

  const rotateX = useTransform(sy, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-intensity, intensity]);
  const translateZ = useTransform(sHover, [0, 1], [0, lift]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          // El glow sigue al cursor siempre; la inclinación sólo si el usuario
          // no pidió reducir el movimiento.
          el.style.setProperty("--spot-x", `${x}px`);
          el.style.setProperty("--spot-y", `${y}px`);
          if (!reduceMotion) {
            px.set(x / rect.width - 0.5);
            py.set(y / rect.height - 0.5);
            hovering.set(1);
          }
        }
        onMouseMove?.(e);
      }}
      onMouseLeave={(e) => {
        px.set(0);
        py.set(0);
        hovering.set(0);
        onMouseLeave?.(e);
      }}
      className={cn("group relative", className)}
      style={{ perspective: 1200 }}
      {...props}
    >
      {/*
        El `style` es idéntico en servidor y cliente a propósito: los motion
        values arrancan en 0, así que el markup inicial coincide y no hay
        mismatch de hidratación. Lo que se desactiva con reduced-motion es la
        actualización de esos valores, no el estilo.
      */}
      <motion.div
        style={{ rotateX, rotateY, translateZ, transformStyle: "preserve-3d" }}
        className={cn("relative h-full w-full", innerClassName)}
      >
        {spotlightColor && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent 72%)`,
            }}
          />
        )}
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * Capa que "flota" por encima de la tarjeta cuando ésta se inclina.
 * Sólo tiene efecto dentro de un `TiltCard` (necesita `preserve-3d`).
 */
export function TiltLayer({
  children,
  depth = 40,
  className,
}: {
  children: ReactNode;
  depth?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("relative", className)}
      style={{ transform: `translateZ(${depth}px)`, transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
