"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";

import { SegBar } from "@/components/ui/SegBar";
import type { Phase, Task, Track } from "@/lib/types";
import { ExpandableText } from "./ExpandableText";
import { SectionLabel } from "./SectionLabel";

export interface Module9LaunchPlanProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

const TRACKS: Track[] = [
  "Product",
  "Marketing",
  "Sales",
  "Partnerships",
  "Customer Success",
  "Legal & Ops",
];

const PHASES: Phase[] = ["Validate", "Pre-launch", "Launch", "Post-launch"];

function TaskCard({ task, onToggle }: { task: Task; onToggle: () => void }) {
  const reduceMotion = useReducedMotion();
  const checkboxId = `task-${task.id}`;

  return (
    <div
      className="flex flex-col gap-1.5 rounded-(--radius-sm) border p-3"
      style={{ borderColor: "var(--rule)", backgroundColor: "var(--surface)" }}
    >
      <div className="flex items-start gap-2">
        <motion.input
          id={checkboxId}
          type="checkbox"
          checked={task.done}
          onChange={onToggle}
          className="mt-0.5 h-4 w-4 flex-shrink-0"
          style={{ accentColor: "var(--accent)" }}
          animate={reduceMotion ? undefined : { scale: task.done ? [1, 1.15, 1] : 1 }}
          transition={{ duration: 0.12 }}
        />
        <label
          htmlFor={checkboxId}
          className="text-sm font-medium leading-snug"
          style={{
            color: task.done ? "var(--ink-faint)" : "var(--ink)",
            textDecoration: task.done ? "line-through" : "none",
          }}
        >
          {task.title}
        </label>
      </div>
      <ExpandableText text={task.description} className="pl-6" />
      <span
        className="pl-6 font-mono text-[11px] uppercase tracking-[0.06em]"
        style={{ color: "var(--ink-faint)" }}
      >
        {task.owner_role}
      </span>
    </div>
  );
}

/**
 * FR-38 — Launch plan: a track × phase grid (rows = 6 tracks, columns = 4
 * phases). Each cell holds its matching tasks; each row carries its own
 * progress bar. Scrolls horizontally on narrow screens rather than
 * squeezing the grid or letting the page itself scroll sideways.
 */
export function Module9LaunchPlan({ tasks, onToggleTask }: Module9LaunchPlanProps) {
  const tasksFor = (track: Track, phase: Phase) =>
    tasks.filter((task) => task.track === track && task.phase === phase);

  return (
    <div className="overflow-x-auto">
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: "160px repeat(4, minmax(220px, 1fr))", minWidth: 1040 }}
      >
        <div />
        {PHASES.map((phase) => (
          <SectionLabel key={phase} className="px-1">
            {phase}
          </SectionLabel>
        ))}

        {TRACKS.map((track) => {
          const trackTasks = tasks.filter((task) => task.track === track);
          const done = trackTasks.filter((task) => task.done).length;
          return (
            <Fragment key={track}>
              <div className="flex flex-col gap-2 pr-2 pt-1">
                <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>
                  {track}
                </span>
                <SegBar
                  total={trackTasks.length}
                  filled={done}
                  tone="accent"
                  label={`${track}: ${done} of ${trackTasks.length}`}
                />
              </div>
              {PHASES.map((phase) => (
                <div key={`${track}-${phase}`} className="flex flex-col gap-2">
                  {tasksFor(track, phase).map((task) => (
                    <TaskCard key={task.id} task={task} onToggle={() => onToggleTask(task.id)} />
                  ))}
                </div>
              ))}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
