import { cn } from "@/lib/utils";

export interface VerificationBannerProps {
  className?: string;
}

/**
 * The module-7 (Legal, compliance & operations) banner — FR-36. Lives
 * inside the module component itself, not the page shell, so a layout
 * change elsewhere can never drop it (PRD NFR-06).
 */
export function VerificationBanner({ className }: VerificationBannerProps) {
  return (
    <div
      role="note"
      className={cn("rounded-(--radius-sm) border px-3 py-2 text-sm font-medium", className)}
      style={{
        borderColor: "var(--cond)",
        backgroundColor: "var(--cond-soft)",
        color: "var(--cond)",
      }}
    >
      Verify with local legal and tax experts before acting.
    </div>
  );
}
