"use client";

import { useState } from "react";

import { DeleteLaunchDialog } from "./DeleteLaunchDialog";
import { EmptyState } from "./EmptyState";
import { LaunchCard } from "./LaunchCard";
import { deleteLaunch, getReadiness, useLaunches } from "./launch-store";

/** My Launches grid — FR-01 through FR-06. */
export function MyLaunchesList() {
  const launches = useLaunches();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const pendingLaunch = launches.find((launch) => launch.id === pendingDeleteId) ?? null;

  if (launches.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {launches.map((launch) => (
          <li key={launch.id}>
            <LaunchCard
              launch={launch}
              readiness={getReadiness(launch.id)}
              onDeleteRequest={() => setPendingDeleteId(launch.id)}
            />
          </li>
        ))}
      </ul>
      <DeleteLaunchDialog
        open={pendingLaunch !== null}
        productName={pendingLaunch?.product_name ?? ""}
        onCancel={() => setPendingDeleteId(null)}
        onConfirm={() => {
          if (pendingDeleteId) deleteLaunch(pendingDeleteId);
          setPendingDeleteId(null);
        }}
      />
    </>
  );
}
