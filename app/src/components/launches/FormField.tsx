import type { ReactNode } from "react";

export interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}

/**
 * Label + control + inline error wrapper shared by every plain input,
 * textarea and select on the New Launch form (FR-11). `CountrySelect`
 * renders its own label/error instead, since its listbox needs ids tied
 * together in one place.
 */
export function FormField({ id, label, required, error, hint, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
        style={{ color: "var(--ink-muted)" }}
      >
        {label}
        {required ? " *" : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[13px]" style={{ color: "var(--stop)" }}>
          {error}
        </p>
      ) : hint ? (
        <p className="text-[13px]" style={{ color: "var(--ink-faint)" }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export const fieldInputClasses = "w-full rounded-(--radius-sm) border px-3 py-2 text-[15px]";

export function fieldInputStyle(hasError: boolean) {
  return {
    borderColor: hasError ? "var(--stop)" : "var(--rule-strong)",
    backgroundColor: "var(--surface)",
    color: "var(--ink)",
  };
}
