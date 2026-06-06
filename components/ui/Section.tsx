import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  children: ReactNode;
  align?: "left" | "center";
}

/**
 * Section — consistent wrapper with eyebrow + title + description header
 * for every block on the landing page.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  className,
  children,
  align = "center",
}: SectionProps) {
  return (
    <section id={id} className={cn("section", className)}>
      <div className="container-page">
        {(eyebrow || title || description) && (
          <div
            className={cn(
              "mx-auto mb-16 max-w-3xl",
              align === "center" ? "text-center" : "text-left"
            )}
          >
            {eyebrow && (
              <span className="badge mb-5">
                <span className="size-1.5 rounded-full bg-accent shadow-glow" />
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-pretty text-base text-muted sm:text-lg">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
