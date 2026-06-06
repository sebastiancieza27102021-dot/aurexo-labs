import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

/** Aurexo Labs brand mark — used in Navbar and Footer. */
export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative">
        <svg
          width="28"
          height="28"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="aurexo-logo-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5B8CFF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <rect
            x="0.5"
            y="0.5"
            width="31"
            height="31"
            rx="8"
            fill="#0B0D14"
            stroke="rgba(255,255,255,0.08)"
          />
          <path
            d="M9 23 L16 8 L23 23 M12 18 H20"
            stroke="url(#aurexo-logo-grad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <span className="pointer-events-none absolute inset-0 rounded-lg shadow-glow opacity-50" />
      </div>
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-tight">
          Aurexo<span className="text-muted"> Labs</span>
        </span>
      )}
    </div>
  );
}
