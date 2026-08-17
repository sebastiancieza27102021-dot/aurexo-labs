import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Pixel size of the circular mark (it's square). */
  size?: number;
}

/** Aurexo Labs brand mark — used in Navbar and Footer. */
export function Logo({ className, size = 40 }: LogoProps) {
  return (
    <div className={cn("relative shrink-0", className)} style={{ width: size, height: size }}>
      <Image
        src="/logo-aurexo.png"
        alt="Aurexo Labs"
        fill
        sizes={`${size}px`}
        className="object-contain"
        priority
      />
      <span className="pointer-events-none absolute inset-0 rounded-full shadow-glow opacity-40" />
    </div>
  );
}
