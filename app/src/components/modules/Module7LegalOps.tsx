import { SeverityRow } from "@/components/ui/SeverityRow";
import { VerificationBanner } from "@/components/ui/VerificationBanner";
import type { LegalOps, Severity } from "@/lib/types";

export interface Module7LegalOpsProps {
  data: LegalOps;
}

const SEVERITY_ORDER: Record<Severity, number> = { High: 0, Medium: 1, Low: 2 };

/**
 * FR-36 — Legal, compliance & operations. The verification banner always
 * renders first, inside this module (NFR-06), followed by items sorted
 * High → Low severity.
 */
export function Module7LegalOps({ data }: Module7LegalOpsProps) {
  const sortedItems = [...data.items].sort(
    (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity],
  );

  return (
    <div className="flex flex-col gap-4">
      <VerificationBanner />
      <div className="flex flex-col">
        {sortedItems.map((item) => (
          <div
            key={item.title}
            className="border-b last:border-b-0"
            style={{ borderColor: "var(--rule)" }}
          >
            <SeverityRow
              title={item.title}
              detail={item.detail}
              area={item.area}
              severity={item.severity}
              ownerRole={item.owner_role}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
