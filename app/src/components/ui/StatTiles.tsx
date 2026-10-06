import type { SizeEstimate } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface StatTilesProps {
  /**
   * The full size estimate, including `assumptions`. Typed as required
   * (via `SizeEstimate`, whose `assumptions` field is itself required) so
   * it is impossible to render the tiles without also rendering the
   * assumptions block — PRD NFR-06 "numbers always ship with assumptions".
   */
  size: SizeEstimate;
  className?: string;
}

const TILES: { key: keyof Pick<SizeEstimate, "tam" | "sam" | "som">; label: string }[] = [
  { key: "tam", label: "TAM" },
  { key: "sam", label: "SAM" },
  { key: "som", label: "SOM" },
];

/**
 * TAM / SAM / SOM stat tiles. The assumptions block ships inside this
 * component by construction — see `StatTilesProps.size` above.
 */
export function StatTiles({ size, className }: StatTilesProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="grid grid-cols-3 gap-3 max-[520px]:grid-cols-1">
        {TILES.map(({ key, label }) => (
          <div
            key={key}
            className="rounded-(--radius-md) border p-4"
            style={{
              borderColor: "var(--rule)",
              backgroundColor: "var(--surface)",
              boxShadow: "var(--shadow-sit)",
            }}
          >
            <div
              className="font-mono text-[11px] font-medium uppercase tracking-[0.1em]"
              style={{ color: "var(--ink-muted)" }}
            >
              {label}
            </div>
            <div
              className="tabular-nums mt-1 font-mono text-[27px] font-semibold"
              style={{ color: "var(--ink)" }}
            >
              {size[key]}
            </div>
          </div>
        ))}
      </div>
      <ul className="flex flex-col gap-1 pl-4 text-sm" style={{ color: "var(--ink-faint)" }}>
        {size.assumptions.map((assumption) => (
          <li key={assumption} className="list-disc">
            {assumption}
          </li>
        ))}
      </ul>
    </div>
  );
}
