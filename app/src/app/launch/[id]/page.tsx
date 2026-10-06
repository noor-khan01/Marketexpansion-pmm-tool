"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import { ResultsShell } from "@/components/modules/ResultsShell";
import { useLaunchBundle } from "@/components/modules/useLaunchBundle";

/**
 * Results page (route `/launch/:id`, PRD §6.3). The launch bundle comes
 * from `launch-store.ts` — a client-side, `localStorage`-backed shim
 * standing in for the real backend — so this route has to be a client
 * component itself rather than a server component that reads it once:
 * a launch created via the New Launch form only exists in the browser's
 * `localStorage`, and `useLaunchBundle` needs to react to it after hydration.
 */
export default function LaunchPage() {
  const params = useParams<{ id: string }>();
  const bundle = useLaunchBundle(params.id);

  useEffect(() => {
    if (bundle) document.title = `${bundle.launch.product_name} — Market Entry Copilot`;
  }, [bundle]);

  if (!bundle) {
    return (
      <main className="mx-auto flex max-w-[640px] flex-col items-start gap-3 px-6 py-16">
        <h1 className="text-[24px] font-semibold" style={{ color: "var(--ink)" }}>
          Launch not found
        </h1>
        <p style={{ color: "var(--ink-muted)" }}>
          This launch doesn&apos;t exist, or it was deleted.
        </p>
        <Link
          href="/"
          className="font-mono text-[11px] font-medium uppercase tracking-[0.06em] underline underline-offset-2"
          style={{ color: "var(--accent-ink)" }}
        >
          Back to My Launches
        </Link>
      </main>
    );
  }

  return <ResultsShell launch={bundle.launch} tasks={bundle.tasks} criteria={bundle.criteria} />;
}
