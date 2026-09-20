"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` hace que framer-motion omita las animaciones de
 * transformación (rotación, desplazamiento, escala) cuando el sistema del
 * visitante pide menos movimiento, dejando sólo las de opacidad.
 *
 * Se resuelve en el cliente después de hidratar, así que el HTML del servidor
 * y el del cliente coinciden. Ramificar el JSX con `useReducedMotion()` — que
 * devuelve `null` en el servidor y un booleano en el cliente — sí rompe la
 * hidratación; por eso la política vive aquí y no en cada componente.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
