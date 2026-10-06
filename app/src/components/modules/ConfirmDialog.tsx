"use client";

import { useEffect, useRef } from "react";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * A minimal, accessible confirmation dialog — used before regenerating
 * module 9 (launch plan) or module 10 (KPIs/risks), since regenerating
 * either loses ticked state (FR-43). Confirm is focused on open; Escape
 * or the backdrop cancels.
 */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Regenerate",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onCancel}
        className="absolute inset-0 h-full w-full cursor-default"
        style={{ backgroundColor: "rgb(13 22 38 / .45)" }}
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-message"
        className="relative flex w-full max-w-sm flex-col gap-3 rounded-(--radius-md) border p-5"
        style={{
          borderColor: "var(--rule)",
          backgroundColor: "var(--surface)",
          boxShadow: "var(--shadow-lift)",
        }}
      >
        <h2
          id="confirm-dialog-title"
          className="text-[16px] font-semibold"
          style={{ color: "var(--ink)" }}
        >
          {title}
        </h2>
        <p id="confirm-dialog-message" className="text-sm" style={{ color: "var(--ink-muted)" }}>
          {message}
        </p>
        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-(--radius-sm) border px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
            style={{ borderColor: "var(--rule-strong)", color: "var(--ink-muted)" }}
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={onConfirm}
            className="rounded-(--radius-sm) border px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
            style={{ borderColor: "var(--stop)", color: "var(--stop)" }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
