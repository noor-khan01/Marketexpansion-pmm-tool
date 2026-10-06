import Link from "next/link";

import { MyLaunchesList } from "@/components/launches/MyLaunchesList";
import { primaryButtonClasses, primaryButtonStyle } from "@/components/launches/button-styles";

/** My Launches (route `/`) — PRD §6.1, FR-01 through FR-06. */
export default function MyLaunchesPage() {
  return (
    <main className="mx-auto flex max-w-[1040px] flex-col gap-8 px-6 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1
            className="text-[31px] font-semibold leading-[1.1] tracking-[-0.02em]"
            style={{ color: "var(--ink)" }}
          >
            My launches
          </h1>
          <p className="mt-1 text-[16px]" style={{ color: "var(--ink-muted)" }}>
            Market-specific go-to-market plans you&apos;ve generated or are working on.
          </p>
        </div>
        <Link href="/new" className={primaryButtonClasses} style={primaryButtonStyle}>
          New launch
        </Link>
      </header>

      <MyLaunchesList />
    </main>
  );
}
