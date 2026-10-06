"use client";

import { useEffect, useRef } from "react";

import { secondaryButtonClasses, secondaryButtonStyle } from "./button-styles";

export interface DeleteLaunchDialogProps {
  open: boolean;
  productName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

/**
 * A minimal accessible confirmation dialog (FR-05). Built from a plain
 * div rather than the native `<dialog>` element so behaviour stays
 * predictable across browsers and the test environment.
 */
export function DeleteLaunchDialog({
  open,
  productName,
  onCancel,
  onConfirm,
}: DeleteLaunchDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCancel();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgb(13 22 38 / 0.5)" }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      {/* biome-ignore lint/a11y/useSemanticElements: a plain div (not native <dialog>) keeps open/close and focus behaviour predictable across browsers and the test environment. */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-launch-title"
        aria-describedby="delete-launch-description"
        className="w-full max-w-sm rounded-(--radius-md) border p-5"
        style={{
          borderColor: "var(--rule)",
          backgroundColor: "var(--surface)",
          boxShadow: "var(--shadow-lift)",
        }}
      >
        <h2
          id="delete-launch-title"
          className="text-[16px] font-semibold"
          style={{ color: "var(--ink)" }}
        >
          Delete this launch?
        </h2>
        <p
          id="delete-launch-description"
          className="mt-2 text-[15px] leading-relaxed"
          style={{ color: "var(--ink-muted)" }}
        >
          This permanently deletes “{productName}” and everything generated for it. This can&apos;t
          be undone.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            className={secondaryButtonClasses}
            style={secondaryButtonStyle}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-(--radius-sm) px-4 py-2 text-[14px] font-medium"
            style={{ backgroundColor: "var(--stop)", color: "var(--surface)" }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
