"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { COUNTRIES, flagEmoji } from "./countries";

export interface CountrySelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (name: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

/**
 * A searchable, keyboard-navigable country combobox with flag emojis
 * (UX-04). Built from scratch on the WAI-ARIA 1.2 combobox pattern
 * (role="combobox" input + role="listbox" popup) rather than a headless
 * library, per the brief.
 */
export function CountrySelect({
  id,
  label,
  value,
  onChange,
  placeholder = "Search countries…",
  required,
  error,
}: CountrySelectProps) {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = `${id}-listbox`;
  const errorId = `${id}-error`;

  // Keep the visible text in sync when `value` changes from outside this
  // component (e.g. pre-filling the form from a duplicated launch).
  useEffect(() => {
    setQuery(value);
  }, [value]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q === value.toLowerCase()) return COUNTRIES;
    return COUNTRIES.filter((country) => country.name.toLowerCase().includes(q));
  }, [query, value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery(value);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  function selectCountry(name: string) {
    onChange(name);
    setQuery(name);
    setIsOpen(false);
  }

  function handleBlur() {
    window.setTimeout(() => {
      if (rootRef.current && !rootRef.current.contains(document.activeElement)) {
        setIsOpen(false);
        setQuery(value);
      }
    }, 0);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!isOpen && ["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) {
      setIsOpen(true);
      return;
    }
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((i) => Math.min(i + 1, filtered.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        if (isOpen) {
          event.preventDefault();
          setHighlightedIndex(0);
        }
        break;
      case "End":
        if (isOpen) {
          event.preventDefault();
          setHighlightedIndex(filtered.length - 1);
        }
        break;
      case "Enter":
        if (isOpen && filtered[highlightedIndex]) {
          event.preventDefault();
          selectCountry(filtered[highlightedIndex].name);
        }
        break;
      case "Escape":
        if (isOpen) {
          event.preventDefault();
          setIsOpen(false);
          setQuery(value);
        }
        break;
      default:
        break;
    }
  }

  const selectedCountry = COUNTRIES.find((country) => country.name === value);
  const activeOption = isOpen ? filtered[highlightedIndex] : undefined;
  const activeOptionId = activeOption ? `${id}-option-${activeOption.code}` : undefined;

  return (
    <div className="flex flex-col gap-1.5" ref={rootRef}>
      <label
        htmlFor={id}
        className="font-mono text-[11px] font-medium uppercase tracking-[0.06em]"
        style={{ color: "var(--ink-muted)" }}
      >
        {label}
        {required ? " *" : null}
      </label>
      <div className="relative">
        {selectedCountry ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
          >
            {flagEmoji(selectedCountry.code)}
          </span>
        ) : null}
        <input
          id={id}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={activeOptionId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          autoComplete="off"
          value={query}
          placeholder={placeholder}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            setHighlightedIndex(0);
          }}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className={cn(
            "w-full rounded-(--radius-sm) border py-2 text-[15px]",
            selectedCountry ? "pl-9 pr-3" : "px-3",
          )}
          style={{
            borderColor: error ? "var(--stop)" : "var(--rule-strong)",
            backgroundColor: "var(--surface)",
            color: "var(--ink)",
          }}
        />
        {isOpen ? (
          <div
            id={listboxId}
            // biome-ignore lint/a11y/useSemanticElements: this is a custom searchable combobox (WAI-ARIA 1.2 combobox pattern), not a native <select> — it needs free-text filtering and flag icons a <select><option> tree can't render.
            role="listbox"
            aria-label={label}
            tabIndex={-1}
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-(--radius-sm) border py-1"
            style={{
              borderColor: "var(--rule)",
              backgroundColor: "var(--surface)",
              boxShadow: "var(--shadow-lift)",
            }}
          >
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-[14px]" style={{ color: "var(--ink-faint)" }}>
                No countries found
              </div>
            ) : (
              filtered.map((country, index) => (
                <div
                  key={country.code}
                  id={`${id}-option-${country.code}`}
                  // biome-ignore lint/a11y/useSemanticElements: see the listbox note above — this is the matching custom <option>.
                  role="option"
                  tabIndex={-1}
                  aria-selected={country.name === value}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    selectCountry(country.name);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-[14px]"
                  style={{
                    backgroundColor:
                      index === highlightedIndex ? "var(--accent-soft)" : "transparent",
                    color: "var(--ink)",
                  }}
                >
                  <span aria-hidden="true">{flagEmoji(country.code)}</span>
                  <span>{country.name}</span>
                </div>
              ))
            )}
          </div>
        ) : null}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-[13px]" style={{ color: "var(--stop)" }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
