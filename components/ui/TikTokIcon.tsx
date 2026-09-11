import { cn } from "@/lib/utils";

/**
 * TikTok glyph — lucide-react doesn't ship brand marks, so we inline it.
 * Inherits color via `currentColor` like every other icon in the UI.
 */
export function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("size-4", className)}
    >
      <path d="M16.5 2h-2.9v12.4a2.6 2.6 0 1 1-2.6-2.6c.2 0 .4 0 .6.1V8.9a5.7 5.7 0 1 0 5 5.6V8.2a6.6 6.6 0 0 0 3.9 1.2V6.5a3.8 3.8 0 0 1-3.9-3.7V2Z" />
    </svg>
  );
}
