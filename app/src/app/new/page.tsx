import Link from "next/link";

import { NewLaunchForm } from "@/components/launches/NewLaunchForm";

interface NewLaunchPageProps {
  searchParams: Promise<{ from?: string }>;
}

/** New Launch form (route `/new`) — PRD §6.2, FR-10 through FR-14. */
export default async function NewLaunchPage({ searchParams }: NewLaunchPageProps) {
  const { from } = await searchParams;

  return (
    <main className="mx-auto flex max-w-[760px] flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-2">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.06em]"
          style={{ color: "var(--ink-muted)" }}
        >
          ← Back to My Launches
        </Link>
        <h1
          className="text-[31px] font-semibold leading-[1.1] tracking-[-0.02em]"
          style={{ color: "var(--ink)" }}
        >
          New launch
        </h1>
        <p className="max-w-[65ch] text-[16px] leading-[1.6]" style={{ color: "var(--ink-muted)" }}>
          Tell us about the product and the two markets, and we&apos;ll generate a market-specific
          entry plan.
        </p>
      </header>

      <NewLaunchForm sourceLaunchId={from} />
    </main>
  );
}
