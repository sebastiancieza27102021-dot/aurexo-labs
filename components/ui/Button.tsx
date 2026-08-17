"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium transition-colors duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:bg-white/90 shadow-[0_10px_30px_-10px_rgba(255,255,255,0.25)] " +
    "hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)]",
  secondary:
    "border border-border bg-white/[0.03] text-foreground backdrop-blur " +
    "hover:bg-white/[0.06] hover:border-white/20",
  ghost: "text-muted hover:text-foreground hover:bg-white/[0.04]",
  whatsapp:
    "bg-[#25D366] text-black hover:bg-[#1ebe5b] shadow-[0_10px_30px_-10px_rgba(37,211,102,0.6)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-[15px]",
};

/** Diagonal light sweep shown on hover for the primary CTA. */
function Sheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
    />
  );
}

const tapAnimation = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring" as const, stiffness: 420, damping: 26 },
};

type ButtonProps = CommonProps & { children?: ReactNode } & Omit<
    HTMLMotionProps<"button">,
    keyof CommonProps | "children"
  >;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconRight,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        {...tapAnimation}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {variant === "primary" && <Sheen />}
        {icon && <span className="relative inline-flex shrink-0">{icon}</span>}
        <span className="relative">{children}</span>
        {iconRight && <span className="relative inline-flex shrink-0">{iconRight}</span>}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

type ButtonLinkProps = CommonProps & { children?: ReactNode } & Omit<
    HTMLMotionProps<"a">,
    keyof CommonProps | "children"
  >;

/** Link-styled button — for <a> tags that should look like our buttons. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <motion.a
      {...tapAnimation}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {variant === "primary" && <Sheen />}
      {icon && <span className="relative inline-flex shrink-0">{icon}</span>}
      <span className="relative">{children}</span>
      {iconRight && <span className="relative inline-flex shrink-0">{iconRight}</span>}
    </motion.a>
  );
}
