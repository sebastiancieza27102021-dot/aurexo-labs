"use client";

import { useRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps
  extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: ReactNode;
  spotlightColor?: string;
}

/**
 * Glass card that reveals a soft radial glow following the cursor on hover.
 * Drop-in replacement for a plain `motion.div` with the same className/children API.
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(47,107,255,0.16)",
  onMouseMove,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
          el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
        }
        onMouseMove?.(e);
      }}
      className={cn("group relative", className)}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(380px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${spotlightColor}, transparent 72%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
